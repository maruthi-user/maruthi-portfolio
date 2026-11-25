// Base URL used by sitemap.ts and robots.ts.
// On Vercel the production domain is picked up automatically; set SITE_URL to override it
// (for example when you attach a custom domain).
const configuredUrl = (
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://maruthi-portfolio-iota.vercel.app")
).replace(/\/$/, "");

const parsedUrl = new URL(configuredUrl);
if (!["http:", "https:"].includes(parsedUrl.protocol) || parsedUrl.username || parsedUrl.password) {
  throw new Error("SITE_URL must be a public http or https URL without credentials.");
}
export const siteUrl = parsedUrl.origin;
