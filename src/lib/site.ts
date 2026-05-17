/**
 * Site-wide constants. Single source of truth for canonical URL, owner
 * identity, and meta defaults.
 */

export const site = {
  name: "Hazem Elerefy",
  fullName: "Hazem Elerefy",
  role: "Data Analyst · Front-End Developer",
  tagline: "A Data Analyst, charmed by the front-end.",
  email: "hazemawed53@gmail.com",
  /** Current planned production URL. Replace once a custom domain is configured. */
  url: "https://hazemelerefey.vercel.app",
  github: "https://github.com/hazemelerefey",
  /** Header copy + meta-description */
  description:
    "Personal site of Hazem Elerefy — data analytics dashboards, machine-learning work, and immersive front-end builds, presented in a Hogwarts-by-Night atmosphere.",
} as const;

export type SiteConfig = typeof site;
