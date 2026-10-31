# Centurion Strategic Ventures: SEO setup

## Target keywords and where they appear
| Keyword | Placement |
|---|---|
| business loan advisor India | Title, description, hero line, solutions, schema |
| home loan consultant India | Title, description, hero line, solutions, schema |
| loan against property, stress property resolution, project finance for builders, private funding | Title (property loans), description, hero, solutions, schema |
| loan advisory firm / loan consultant (Ahmedabad HQ) | About copy, FAQ, footer note, schema address |
| working capital loan, project loan, commercial property loan | Solution cards, schema services |
| professional loan for doctors, CAs, advocates | Solution card, schema |
| DSA / loan partner programme | Partner section, FAQ, schema |
| Gujarat and pan India | Hero highlights, About, FAQ, description, share image, schema areaServed |

## Included
- Title (60 chars) and meta description
- One H1, 10 H2 sections, logical H3s
- Canonical, robots meta, hreflang en-IN, geo tags, theme colour
- Open Graph and Twitter cards with a 1200x630 share image and a 1200x1200 square version
- JSON-LD: FinancialService + LocalBusiness, WebSite, WebPage, FAQPage, 8 services
- Alt text on every image, width/height on images, hero logo preloaded
- Solution cards and document list rendered in HTML (readable without JavaScript)
- robots.txt, sitemap.xml, branded 404.html (noindex)
- favicon.ico, PNG icons, apple-touch-icon, web manifest
- vercel.json: clean URLs, long caching for assets, security headers

## Before going live (replace in build_site.py CONFIG, then rebuild)
- SITE_URL (domain): used in canonical, sitemap, robots, schema, social tags
- Office street address and PIN code: schema, footer, map
- Email, CIN, GSTIN: footer and schema

## After launch
1. Add the site to Google Search Console and submit /sitemap.xml
2. Add Google Analytics 4
3. Create / verify the Google Business Profile with the same name, address and phone
4. Test with Google Rich Results Test and PageSpeed Insights
