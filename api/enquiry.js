// Vercel serverless function: /api/enquiry
// For every website enquiry it:
//   1. emails the right Centurion inbox (customer or partner),
//   2. saves the lead to the Google Sheet (Apps Script web app),
//   3. emails the visitor a branded confirmation, if they left an email.
// Each step is independent, so one failing never blocks the others.
//
// Environment variables (set in Vercel > Project > Settings > Environment Variables):
//   RESEND_API_KEY        Resend API key (domain verified in Resend)
//   FROM_EMAIL            e.g. "Centurion Strategic Ventures <hello@YOURDOMAIN.in>"
//   CUSTOMER_INBOX        inbox for customer and callback leads
//   PARTNER_INBOX         inbox for partner leads
//   SHEET_WEBHOOK_URL     Google Apps Script web app URL (optional until set up)
//   SHEET_SECRET          shared secret that the sheet script checks
//   SITE_URL              e.g. https://YOURDOMAIN.in (used for the logo in emails)
//   WHATSAPP_NUMBER       e.g. 919274705844

const { customerEmail, partnerEmail, internalEmail } = require("./_emails");

function clean(v, max = 200) {
  return String(v == null ? "" : v).replace(/[<>]/g, "").trim().slice(0, max);
}

async function sendEmail({ to, subject, html, replyTo }) {
  if (!process.env.RESEND_API_KEY || !to) return { skipped: true };
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.FROM_EMAIL, to: [to], subject, html, reply_to: replyTo || undefined }),
  });
  if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
  return r.json();
}

async function saveToSheet(lead) {
  if (!process.env.SHEET_WEBHOOK_URL) return { skipped: true };
  const r = await fetch(process.env.SHEET_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ secret: process.env.SHEET_SECRET, ...lead }),
    redirect: "follow",
  });
  if (!r.ok) throw new Error(`Sheet ${r.status}`);
  return { ok: true };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") { res.status(405).json({ ok: false }); return; }
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const type = ["customer", "partner", "callback"].includes(body && body.type) ? body.type : null;
  const d = (body && body.data) || {};
  const lead = {
    type,
    name: clean(d.name, 80),
    mobile: clean(d.mobile, 10).replace(/\D/g, ""),
    email: clean(d.email, 120),
    city: clean(d.city, 60),
    need: clean(d.need, 60),
    amount: clean(d.amount, 60),
    profile: clean(d.profile, 60),
    timing: clean(d.timing, 60),
    calc: clean(d.calc, 300),
    partnerType: clean(d.type, 80),
    products: Array.isArray(d.products) ? d.products.map((p) => clean(p, 60)).join(", ") : "",
    volume: clean(d.volume, 30),
    callTime: clean(d.time, 30),
    page: clean(body && body.page, 200),
    submittedAt: new Date().toISOString(),
  };
  if (!type || !lead.name || !/^[6-9]\d{9}$/.test(lead.mobile)) { res.status(400).json({ ok: false, error: "invalid" }); return; }
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) lead.email = "";

  const ctx = {
    site: (process.env.SITE_URL || "").replace(/\/$/, ""),
    whatsapp: process.env.WHATSAPP_NUMBER || "919274705844",
  };
  const inbox = type === "partner" ? process.env.PARTNER_INBOX : process.env.CUSTOMER_INBOX;
  const internal = internalEmail(lead, ctx);
  const tasks = [
    sendEmail({ to: inbox, subject: internal.subject, html: internal.html, replyTo: lead.email }),
    saveToSheet(lead),
  ];
  if (lead.email && type !== "callback") {
    const mail = type === "partner" ? partnerEmail(lead, ctx) : customerEmail(lead, ctx);
    tasks.push(sendEmail({ to: lead.email, subject: mail.subject, html: mail.html, replyTo: inbox }));
  }
  const results = await Promise.allSettled(tasks);
  results.forEach((r, i) => { if (r.status === "rejected") console.error("enquiry task", i, r.reason && r.reason.message); });
  res.status(200).json({ ok: true });
};
