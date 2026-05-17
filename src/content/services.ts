/**
 * Services catalogue for /services. Two categories (Analytics +
 * Frontend) — each card is a discipline I deliver, with a list of
 * concrete artefacts I produce.
 */

export type ServiceItem = {
  title: string;
  blurb: string;
  bullets: string[];
  category: "analytics" | "frontend";
  accent: "candle" | "moon" | "ember" | "ravenclaw" | "slytherin";
};

export const services: ServiceItem[] = [
  /* ── Analytics ─────────────────────────────────────────────────── */
  {
    category: "analytics",
    accent: "candle",
    title: "Executive Dashboards",
    blurb:
      "C-suite dashboards in Power BI / Tableau — clear KPIs, drilldowns, and storytelling that survives the boardroom.",
    bullets: [
      "Sales · finance · operations dashboards",
      "DAX / SQL modelling",
      "Print-ready exports & scheduled refresh",
    ],
  },
  {
    category: "analytics",
    accent: "ember",
    title: "Predictive Modelling",
    blurb:
      "Customer-churn, demand forecasting, segmentation — Python / scikit-learn pipelines wrapped in analyst-friendly UIs.",
    bullets: [
      "Feature engineering & explainability",
      "Train / tune / serve",
      "Cohort & feature-importance plots",
    ],
  },
  {
    category: "analytics",
    accent: "moon",
    title: "Data Engineering",
    blurb:
      "ETL pipelines, warehouse schemas, and reproducible data flows — built for analyst self-service downstream.",
    bullets: [
      "Snowflake · BigQuery · Postgres",
      "dbt · Airflow · GitHub Actions",
      "Documentation + lineage",
    ],
  },
  {
    category: "analytics",
    accent: "slytherin",
    title: "AI Agents & RAG",
    blurb:
      "Agentic-AI workflows for research, ops, and customer support — grounded in your own documents and data.",
    bullets: [
      "OpenAI · Anthropic · LangChain",
      "Retrieval-augmented generation",
      "Tool-use orchestration",
    ],
  },

  /* ── Frontend ──────────────────────────────────────────────────── */
  {
    category: "frontend",
    accent: "ravenclaw",
    title: "Next.js Apps",
    blurb:
      "Production-grade Next.js / React applications — App Router, server components, performance budgets, and SEO baked in.",
    bullets: [
      "Server components + RSC patterns",
      "Edge / static / ISR rendering",
      "Type-safe end-to-end",
    ],
  },
  {
    category: "frontend",
    accent: "candle",
    title: "Premium UI / UX",
    blurb:
      "Design-system scaffolding, motion choreography, and pixel-perfect screens — in a cohesive theme of your choosing.",
    bullets: [
      "Tailwind v4 · Radix UI · shadcn",
      "Framer Motion · GSAP · Lottie",
      "Accessibility-first (WCAG 2.2 AA)",
    ],
  },
  {
    category: "frontend",
    accent: "moon",
    title: "Dashboards & Admin",
    blurb:
      "Operator consoles, admin panels, and analytics UIs — built to feel calm under heavy data.",
    bullets: [
      "Tables · charts · filters · exports",
      "Realtime updates · keyboard nav",
      "Role-based access & audit",
    ],
  },
  {
    category: "frontend",
    accent: "ember",
    title: "Performance & SEO",
    blurb:
      "LCP < 1.0s, CLS < 0.05, Core Web Vitals, structured data — make Google and your users happy at the same time.",
    bullets: [
      "Lighthouse / WebPageTest audits",
      "Image · font · script optimisation",
      "Schema.org + sitemap automation",
    ],
  },
];
