import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * PWA manifest — keeps the site installable on mobile and gives the
 * browser the right theme + name when added to home screen.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.fullName} — ${site.role}`,
    short_name: site.fullName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f1c",
    theme_color: "#0a0f1c",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
