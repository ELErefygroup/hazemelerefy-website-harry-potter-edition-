/**
 * GitHub repository catalogue for the Workspace page. Mirrors the legacy
 * workspace view's two tabs (Frontend / Analytics).
 *
 * The catalogue is static (no live GitHub API calls) so the page stays
 * fully static-prerendered on Vercel free-tier — no rate limits, no
 * server roundtrips on every visit.
 */
export type Repo = {
  /** GitHub `owner/name` for display + sub-link metadata. */
  slug: string;
  /** Pretty title for the card. */
  title: string;
  /** One-paragraph blurb shown on the card. */
  description: string;
  /** Stack label (Next.js, Power BI, etc.). */
  stack: string;
  /** Card category — drives which tab the card appears under. */
  category: "frontend" | "analytics";
  /** Accent palette key. */
  accent: "ravenclaw" | "candle" | "moon" | "slytherin" | "ember" | "gryffindor";
  /** Public GitHub URL. */
  href: string;
  /** Optional language tag in the footer ("DAX", "TypeScript", etc.). */
  language?: string;
};

export const repos: Repo[] = [
  /* ── Frontend ───────────────────────────────────────────────────── */
  {
    slug: "hazemelerefey/jobpulse",
    title: "JobPulse",
    description:
      "Premium job-market intelligence dashboard — role demand, salary signals, and skill momentum through a polished product experience.",
    stack: "Next.js",
    category: "frontend",
    accent: "moon",
    href: "https://github.com/hazemelerefey/jobpulse",
    language: "TypeScript",
  },
  {
    slug: "hazemelerefey/frontend-ecommerce-dashboard",
    title: "Ecommerce Dashboard",
    description:
      "Operator console for an e-commerce stack — orders, inventory, customers, and refunds in one calm, keyboard-first room.",
    stack: "Next.js",
    category: "frontend",
    accent: "candle",
    href: "https://github.com/hazemelerefey/frontend-ecommerce-dashboard",
    language: "TypeScript",
  },
  {
    slug: "hazemelerefey/frontend-kanban-board",
    title: "Kanban Board",
    description:
      "Drag-and-drop kanban with realtime card updates, optimistic mutations, and keyboard nudges across lanes.",
    stack: "React",
    category: "frontend",
    accent: "ravenclaw",
    href: "https://github.com/hazemelerefey/frontend-kanban-board",
    language: "TypeScript",
  },
  {
    slug: "hazemelerefey/frontend-realestate-finder",
    title: "Real Estate Finder",
    description:
      "Map-driven property finder with smart filters, school overlays, and saved-search alerts.",
    stack: "Next.js",
    category: "frontend",
    accent: "slytherin",
    href: "https://github.com/hazemelerefey/frontend-realestate-finder",
    language: "TypeScript",
  },

  /* ── Analytics ──────────────────────────────────────────────────── */
  {
    slug: "hazemelerefey/healthcare-operations-waitlist-dashboard",
    title: "Healthcare Waitlist",
    description:
      "Executive decision-support dashboard revealing service bottlenecks, specialty backlog patterns, and critical operational healthcare priorities.",
    stack: "Power BI",
    category: "analytics",
    accent: "slytherin",
    href: "https://github.com/hazemelerefey/healthcare-operations-waitlist-dashboard",
    language: "DAX",
  },
  {
    slug: "hazemelerefey/global-ecommerce-sales-tracker",
    title: "Global Sales Tracker",
    description:
      "Executive Power BI dashboard for global market performance — geographic drill-downs, financial mapping, and KPI clarity.",
    stack: "Power BI",
    category: "analytics",
    accent: "candle",
    href: "https://github.com/hazemelerefey/global-ecommerce-sales-tracker",
    language: "DAX",
  },
  {
    slug: "hazemelerefey/analytics-churn-prediction",
    title: "Churn Prophecy",
    description:
      "Customer-churn ML model surfaced through an analyst-friendly dashboard with cohort drilldowns and feature-importance bars.",
    stack: "Python · ML",
    category: "analytics",
    accent: "ember",
    href: "https://github.com/hazemelerefey/analytics-churn-prediction",
    language: "Python",
  },
];
