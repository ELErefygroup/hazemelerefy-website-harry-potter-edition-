import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * `robots.txt` generator. Allows everything for now; sitemap pointer
 * helps crawlers find the routes from `sitemap.ts`.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
