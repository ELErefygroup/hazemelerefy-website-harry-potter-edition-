/**
 * Project catalogue. Source of truth for the home "featured work" strip and
 * the portfolio gallery (Slice C).
 *
 * Each entry mirrors a project from the legacy `index.html` Portfolio + Home
 * views, retitled in HP voice and tagged with both technical chips and the
 * featured / portfolio surfaces it should appear on.
 */
export type Project = {
  id: string;
  title: string;
  /** Short single-line tagline, used on the card. */
  blurb: string;
  /** Long-form paragraph for the book modal (Slice C). */
  story?: string;
  /** Hero image displayed on the card. Must live under /public. */
  image: string;
  /** Tag chips on the card — keep to 2–3 to avoid overflow. */
  chips: { label: string; tone: "candle" | "ember" | "moon" | "ravenclaw" | "slytherin" | "gryffindor" }[];
  /** Where the card should be shown. */
  surfaces: ("featured" | "portfolio")[];
  /** Optional outbound link (case study, demo, repo). */
  href?: string;
  /** Optional accent for the card halo / hover glow. */
  accent?: "candle" | "ember" | "moon" | "ravenclaw" | "slytherin";
};

export const projects: Project[] = [
  {
    id: "jobpulse",
    title: "JobPulse",
    blurb:
      "A premium hiring-intelligence product that turns role demand and salary data into readable signals.",
    story:
      "JobPulse condenses a sprawling, noisy job-market feed into a single decision-ready surface. Built in Next.js with a Python ingest layer, it tracks role demand, salary movement, skill momentum, and city-level supply/demand, then quietly tells the visitor where the wind is blowing.",
    image: "/images/jobpulse-hero.svg",
    chips: [
      { label: "Next.js", tone: "candle" },
      { label: "Intelligence", tone: "slytherin" },
      { label: "Flagship", tone: "ravenclaw" },
    ],
    surfaces: ["featured", "portfolio"],
    accent: "candle",
  },
  {
    id: "global-sales",
    title: "Global Sales Performance",
    blurb:
      "Executive Power BI dashboard for global market performance — geographic drill-downs, financial mapping, and KPI clarity.",
    story:
      "An executive cockpit for a multinational sales operation. Built in Power BI with a star-schema Tableau-style data model, it slices revenue by country, channel, and product family, then surfaces month-over-month deltas and forecast variance with one click.",
    image: "/images/global-sales-dashboard.png",
    chips: [
      { label: "Power BI", tone: "ravenclaw" },
      { label: "Finance", tone: "candle" },
    ],
    surfaces: ["featured", "portfolio"],
    accent: "ravenclaw",
  },
  {
    id: "healthcare-ops",
    title: "Healthcare Operations Overview",
    blurb:
      "Hospital command-centre dashboard tracking bed occupancy, length-of-stay, and clinic throughput in real time.",
    story:
      "A live operations cockpit for a hospital system: bed occupancy, length-of-stay, clinic throughput, and incident KPIs presented to non-technical clinicians and operations leads. Designed for the 2 AM control room, not the boardroom.",
    image: "/images/healthcare-operations-overview.png",
    chips: [
      { label: "Power BI", tone: "ravenclaw" },
      { label: "Healthcare", tone: "slytherin" },
    ],
    surfaces: ["portfolio"],
    accent: "slytherin",
  },
  {
    id: "churn-analytics",
    title: "Churn Prophecy",
    blurb:
      "Customer-churn ML model surfaced through an analyst-friendly dashboard with cohort drilldowns.",
    story:
      "A scikit-learn churn model wrapped in an analyst-friendly dashboard. Cohort drilldowns, feature-importance bars, and a 'who to call this week' shortlist that turns the score into an action.",
    image: "/images/churn-analytics.png",
    chips: [
      { label: "Python", tone: "candle" },
      { label: "ML", tone: "slytherin" },
    ],
    surfaces: ["portfolio"],
    accent: "ember",
  },
  {
    id: "ecommerce-admin",
    title: "Ecommerce Admin",
    blurb:
      "Operator console for an e-commerce stack — orders, inventory, customers, and refunds in one calm room.",
    story:
      "A back-of-house operator console for a multi-storefront e-commerce stack. Orders, inventory, customers, refunds, and product reviews in one calm, keyboard-first room. Built in Next.js + Tailwind with a TanStack Table core.",
    image: "/images/ecommerce-admin.png",
    chips: [
      { label: "Next.js", tone: "candle" },
      { label: "Operator UX", tone: "moon" },
    ],
    surfaces: ["portfolio"],
    accent: "moon",
  },
  {
    id: "kanban",
    title: "Kanban Board",
    blurb:
      "Drag-and-drop kanban with realtime card updates, optimistic mutations, and keyboard nudges.",
    story:
      "A team-scale kanban with realtime updates, optimistic mutations, keyboard nudges, and lane-level WIP limits. Powered by React Query and a thin WebSocket fan-out.",
    image: "/images/kanban-board.png",
    chips: [
      { label: "React", tone: "candle" },
      { label: "Realtime", tone: "moon" },
    ],
    surfaces: ["portfolio"],
    accent: "moon",
  },
  {
    id: "realestate",
    title: "Real Estate Finder",
    blurb:
      "Map-driven property finder with smart filters, school overlays, and saved-search alerts.",
    story:
      "A map-driven property finder with smart filters, school overlays, and saved-search alerts. Built in Next.js with a MapLibre rendering layer and a Postgres + PostGIS backend.",
    image: "/images/realestate-finder.png",
    chips: [
      { label: "Next.js", tone: "candle" },
      { label: "Maps", tone: "slytherin" },
    ],
    surfaces: ["portfolio"],
    accent: "slytherin",
  },
  {
    id: "healthcare-dashboard",
    title: "Healthcare KPIs",
    blurb:
      "Tableau-style KPI dashboard for clinical operations leadership — readmission, satisfaction, and cost trends.",
    story:
      "A KPI dashboard for clinical operations leadership tracking readmission, satisfaction, and cost trends side-by-side. Designed to read clearly on a wall TV from across a control room.",
    image: "/images/healthcare-dashboard.png",
    chips: [
      { label: "Power BI", tone: "ravenclaw" },
      { label: "Healthcare", tone: "slytherin" },
    ],
    surfaces: ["portfolio"],
    accent: "ravenclaw",
  },
];
