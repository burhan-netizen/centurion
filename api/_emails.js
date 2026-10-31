// Branded email templates for Centurion Strategic Ventures.
// Table-based HTML with inline styles so it renders well in Gmail, Outlook and phone mail apps.

const NAVY = "#0A1A36", NAVY_DEEP = "#060E1F", GOLD = "#D9A93B", GOLD_TEXT = "#86651A", INK = "#0C1830", MUTED = "#5B6579", LINE = "#E3E7EF", PAPER = "#F6F7FA";
const FONT = "'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

function esc(s) { return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function first(name) { return esc(String(name || "").trim().split(/\s+/)[0] || "there"); }
function wa(num, text) { return `https://wa.me/${num}?text=${encodeURIComponent(text)}`; }

function layout({ ctx, preheader, title, intro, summaryRows, steps, ctaLabel, ctaText }) {
  const logo = ctx.site ? `<img src="${ctx.site}/assets/logo-96.png" width="44" height="44" alt="Centurion Strategic Ventures" style="display:block;border:0;border-radius:50%">` : "";
  const rows = summaryRows.filter((r) => r[1]).map((r) => `
          <tr><td style="padding:10px 0;border-bottom:1px solid ${LINE};font:14px ${FONT};color:${MUTED};width:42%">${esc(r[0])}</td>
              <td style="padding:10px 0;border-bottom:1px solid ${LINE};font:600 14px ${FONT};color:${INK};text-align:right">${esc(r[1])}</td></tr>`).join("");
  const stepRows = steps.map((s, i) => `
          <tr><td valign="top" style="padding:0 14px 18px 0;width:36px">
                <table role="presentation" cellpadding="0" cellspacing="0" width="32" height="32" style="width:32px;height:32px;border-collapse:separate"><tr><td align="center" valign="middle" width="32" height="32" style="width:32px;height:32px;border-radius:16px;background:${NAVY};color:${GOLD};font-family:${FONT};font-size:14px;font-weight:600;line-height:32px;text-align:center;vertical-align:middle;mso-line-height-rule:exactly">${i + 1}</td></tr></table></td>
              <td valign="top" style="padding:4px 0 18px 0">
                <div style="font:600 15px ${FONT};color:${INK}">${esc(s[0])}</div>
                <div style="font:14px/1.55 ${FONT};color:${MUTED};padding-top:3px">${esc(s[1])}</div></td></tr>`).join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:${PAPER}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER}"><tr><td align="center" style="padding:28px 14px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;border:1px solid ${LINE};border-radius:16px;overflow:hidden">
    <tr><td style="background:${NAVY_DEEP};padding:22px 28px">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="padding-right:12px">${logo}</td>
        <td><div style="font:700 15px ${FONT};letter-spacing:3px;color:#FFFFFF">CENTURION</div>
            <div style="font:600 9px ${FONT};letter-spacing:3px;color:${GOLD};padding-top:3px">STRATEGIC VENTURES</div></td>
      </tr></table></td></tr>
    <tr><td style="height:3px;background:${GOLD};line-height:3px;font-size:0">&nbsp;</td></tr>
    <tr><td style="padding:32px 28px 8px 28px">
      <div style="font:700 22px/1.3 ${FONT};color:${INK}">${title}</div>
      <div style="font:15px/1.65 ${FONT};color:${MUTED};padding-top:10px">${intro}</div></td></tr>
    <tr><td style="padding:16px 28px 4px 28px">
      <div style="font:600 11px ${FONT};letter-spacing:2px;color:${GOLD_TEXT};padding-bottom:6px">YOUR REQUEST</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr>
    <tr><td style="padding:26px 28px 6px 28px">
      <div style="font:600 11px ${FONT};letter-spacing:2px;color:${GOLD_TEXT};padding-bottom:14px">WHAT HAPPENS NEXT</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${stepRows}</table></td></tr>
    <tr><td style="padding:6px 28px 30px 28px">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="border-radius:999px;background:${GOLD}"><a href="${wa(ctx.whatsapp, ctaText)}" style="display:inline-block;padding:13px 24px;font:600 14px ${FONT};color:${NAVY_DEEP};text-decoration:none;white-space:nowrap">${esc(ctaLabel)}</a></td>
      </tr></table>
      <div style="padding-top:14px;font:14px ${FONT};color:${MUTED}">Prefer to talk? Call us on <a href="tel:+919274705844" style="font-weight:600;color:${NAVY};text-decoration:none">+91 92747 05844</a></div></td></tr>
    <tr><td style="background:${PAPER};border-top:1px solid ${LINE};padding:20px 28px">
      <div style="font:600 13px ${FONT};color:${INK}">Centurion Strategic Ventures Pvt Ltd</div>
      <div style="font:12px/1.6 ${FONT};color:${MUTED};padding-top:4px">Strategic Thinking. Sustainable Growth.<br>CIN U70200GJ2026PTC178120 · GSTIN 24AANCC8584H1Z6</div>
      <div style="font:11px/1.6 ${FONT};color:${MUTED};padding-top:10px">A loan advisory and facilitation firm. All loans are subject to the lender's eligibility criteria, verification and approval. You received this email because you submitted an enquiry on our website.</div>
    </td></tr>
  </table>
</td></tr></table></body></html>`;
}

function customerEmail(l, ctx) {
  return {
    subject: `We've received your ${l.need || "funding"} enquiry`,
    html: layout({
      ctx,
      preheader: "Your advisor will call you soon. Here is what happens next.",
      title: `Thank you, ${first(l.name)}.`,
      intro: "We have received your enquiry. An experienced advisor from our team will personally look into it and get in touch with you.",
      summaryRows: [["Looking for", l.need], ["Amount", l.amount], ["Profile", l.profile], ["Timeline", l.timing], ["Mobile", l.mobile ? "+91 " + l.mobile : ""], ["City", l.city]],
      steps: [
        ["Your advisor calls you", "We call you on the number you shared to understand your needs and goals."],
        ["We review your requirement", "Your advisor studies your profile and requirement in detail."],
        ["You get the best options", "We compare 100+ banks and NBFCs and recommend the right fit for you."],
      ],
      ctaLabel: "Chat with us on WhatsApp",
      ctaText: `Hi Centurion, I'm ${l.name}. I just submitted an enquiry for ${l.need || "funding"} on your website.`,
    }),
  };
}

function partnerEmail(l, ctx) {
  return {
    subject: "Welcome. We've received your partner enquiry",
    html: layout({
      ctx,
      preheader: "Our partnerships team will call you soon. Here is what happens next.",
      title: `Thank you, ${first(l.name)}.`,
      intro: "Thank you for your interest in partnering with Centurion. Our partnerships team will review your details and get in touch with you.",
      summaryRows: [["You are", l.partnerType], ["Products", l.products], ["Monthly cases", l.volume], ["Mobile", l.mobile ? "+91 " + l.mobile : ""], ["City", l.city]],
      steps: [
        ["We call you", "Our partnerships team calls you to understand your network and the cases you handle."],
        ["We review your profile", "Our team reviews your profile, network and business potential."],
        ["You start referring", "We share our payout structure and onboarding, and assign you a dedicated relationship manager."],
      ],
      ctaLabel: "Chat with us on WhatsApp",
      ctaText: `Hi Centurion, I'm ${l.name}. I just submitted a partner enquiry on your website.`,
    }),
  };
}

function internalEmail(l, ctx) {
  const label = l.type === "partner" ? "New partner enquiry" : l.type === "callback" ? "New callback request" : "New enquiry";
  const subject = l.type === "partner"
    ? `${label}: ${l.partnerType || "Partner"}, ${l.name}`
    : l.type === "callback" ? `${label}: ${l.name} (${l.callTime || "any time"})` : `${label}: ${l.need || "Funding"}, ${l.amount || ""}, ${l.name}`;
  const rows = [
    ["Name", l.name], ["Mobile", "+91 " + l.mobile], ["Email", l.email], ["City", l.city],
    ["Looking for", l.need], ["Amount", l.amount], ["Profile", l.profile], ["Timeline", l.timing], ["Calculator", l.calc],
    ["Partner type", l.partnerType], ["Products", l.products], ["Monthly cases", l.volume], ["Preferred call time", l.callTime],
    ["Submitted", new Date(l.submittedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })],
  ].filter((r) => r[1]);
  const html = `<div style="font:14px ${FONT};color:${INK};max-width:560px">
    <div style="font:700 18px ${FONT};padding-bottom:12px">${esc(label)}</div>
    <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">${rows.map((r) => `<tr><td style="padding:8px 0;border-bottom:1px solid ${LINE};color:${MUTED};width:40%">${esc(r[0])}</td><td style="padding:8px 0;border-bottom:1px solid ${LINE};font-weight:600">${esc(r[1])}</td></tr>`).join("")}</table>
    <p style="padding-top:14px"><a href="tel:+91${l.mobile}" style="color:${NAVY};font-weight:600">Call +91 ${esc(l.mobile)}</a> · <a href="https://wa.me/91${l.mobile}" style="color:${NAVY};font-weight:600">WhatsApp</a></p></div>`;
  return { subject, html };
}

module.exports = { customerEmail, partnerEmail, internalEmail, layout };
