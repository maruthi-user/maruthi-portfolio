// Base URL used by sitemap.ts and robots.ts.
// On Vercel the production domain is picked up automatically; set SITE_URL to override it
// (for example when you attach a custom domain).
export const siteUrl = (
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
