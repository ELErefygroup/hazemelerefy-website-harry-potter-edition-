/**
 * Header + footer navigation maps. Edit here only — components consume
 * these arrays directly so adding a route is a one-line change.
 */

export type NavLink = {
  href: string;
  label: string;
  /** Short HP-flavoured tooltip, shown on hover or as aria-description. */
  whisper?: string;
};

export const primaryNav: NavLink[] = [
  { href: "/", label: "Home", whisper: "The Great Hall" },
  { href: "/portfolio", label: "Portfolio", whisper: "The Tome of Works" },
  { href: "/workspace", label: "Workspace", whisper: "The Lab Bench" },
  { href: "/services", label: "Services", whisper: "Rates & Charms" },
];

export const footerLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/workspace", label: "Workspace" },
  { href: "/services", label: "Services" },
];
