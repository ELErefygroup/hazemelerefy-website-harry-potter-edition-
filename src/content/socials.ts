/**
 * Off-site social handles surfaced in the footer + portfolio hero.
 * Order is intentional — GitHub first because the workspace page links to it.
 */

export type Social = {
  id: string;
  label: string;
  href: string;
  /** Single-letter / minimal glyph fallback so we never depend on icon fonts. */
  glyph: string;
};

export const socials: Social[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/hazemelerefey",
    glyph: "G",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hazem-elerefy/",
    glyph: "in",
  },
  {
    id: "email",
    label: "Send Owl",
    href: "mailto:hazemawed53@gmail.com",
    glyph: "@",
  },
];
