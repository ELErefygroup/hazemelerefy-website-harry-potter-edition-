import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Static sitemap covering every routed page. New routes should be added
 * here so search engines pick them up; the build pipeline writes
 * `/sitemap.xml` automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${site.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/portfolio`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/workspace`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/services`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
