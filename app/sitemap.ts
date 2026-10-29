import type { MetadataRoute } from "next";
import { experience } from "@/lib/data";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    ...experience.projects.map((p) => ({ url: `${siteUrl}${p.href}`, priority: 0.7 })),
  ];
}
