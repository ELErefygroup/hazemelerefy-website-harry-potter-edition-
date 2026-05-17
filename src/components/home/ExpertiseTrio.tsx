import { CastleIcon, WandIcon, ChartIcon } from "@/components/icons/HpIcons";
import { cn } from "@/lib/cn";

/**
 * Three expertise cards — the legacy "What I Can Do" section, retold in
 * HP voice. Each card lists three sub-skills with a candle-coloured tick
 * to keep the visual rhythm tight.
 *
 * Server component — no interactivity beyond the hover transitions, so
 * it stays out of the client bundle.
 */
const cards = [
  {
    id: "frontend",
    title: "Front-end Engineering",
    blurb:
      "Architecting robust, lightning-fast web applications with modern frameworks and flawless responsive behaviour.",
    bullets: [
      "React & Next.js Architecture",
      "Advanced Tailwind CSS",
      "Performance & SEO Optimisation",
    ],
    accent: "candle",
    icon: CastleIcon,
  },
  {
    id: "ai",
    title: "AI & Intelligent Automation",
    blurb:
      "Designing autonomous agents, custom deep learning models, and complex n8n workflows that breathe life into static processes.",
    bullets: [
      "Autonomous AI Agents",
      "Advanced n8n Workflows",
      "Applied Deep Learning",
    ],
    accent: "moon",
    icon: WandIcon,
  },
  {
    id: "data",
    title: "Data Analytics & ML",
    blurb:
      "Transforming complex datasets into actionable business intelligence through predictive modelling and dynamic dashboards.",
    bullets: [
      "Dynamic Power BI Dashboards",
      "Data Pipeline Automation",
      "Predictive Machine Learning",
    ],
    accent: "ember",
    icon: ChartIcon,
  },
] as const;

export function ExpertiseTrio() {
  return (
    <section
      aria-labelledby="expertise-title"
      className="relative border-t border-candle/10 px-6 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="font-display text-[10px] font-semibold uppercase tracking-[0.5em] text-candle/80">
            My Disciplines
          </p>
          <h2
            id="expertise-title"
            className="mt-4 font-display text-3xl font-bold leading-tight text-parchment md:text-5xl"
          >
            What I Can{" "}
            <span className="bg-gradient-to-br from-[#F0CB7A] via-[#E6B25E] to-[#C8853A] bg-clip-text text-transparent">
              Do
            </span>
          </h2>
          <p className="mt-4 font-heading text-base leading-relaxed text-parchment/65 md:text-lg">
            Three disciplines, taught from the foreground tomes of the banner
            above. Hover any card to see the seal break.
          </p>
        </header>

        <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => {
            const Icon = c.icon;
            const tone =
              c.accent === "candle"
                ? "border-candle/25 hover:border-candle/55 hover:shadow-[0_0_40px_rgba(230,178,94,0.18)]"
                : c.accent === "moon"
                  ? "border-moon/25 hover:border-moon/55 hover:shadow-[0_0_40px_rgba(184,197,220,0.18)]"
                  : "border-ember/25 hover:border-ember/55 hover:shadow-[0_0_40px_rgba(200,133,58,0.18)]";

            const iconTone =
              c.accent === "candle"
                ? "text-candle"
                : c.accent === "moon"
                  ? "text-moon"
                  : "text-ember";

            return (
              <li key={c.id}>
                <article
                  className={cn(
                    "group relative h-full overflow-hidden rounded-3xl border bg-night/60 p-7 backdrop-blur-md transition-all duration-500",
                    tone,
                  )}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-candle/5 blur-3xl transition-opacity duration-500 group-hover:bg-candle/15"
                  />
                  <div className={cn("relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border", tone, "bg-night/80", iconTone)}>
                    <Icon width={24} height={24} />
                  </div>
                  <h3 className={cn("relative mt-5 font-display text-xl font-bold", iconTone)}>
                    {c.title}
                  </h3>
                  <p className="relative mt-3 font-heading text-base leading-relaxed text-parchment/70">
                    {c.blurb}
                  </p>
                  <ul className="relative mt-5 space-y-2">
                    {c.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 font-heading text-sm leading-relaxed text-parchment/80">
                        <span aria-hidden="true" className={cn("mt-[7px] inline-block h-1.5 w-1.5 rounded-full", iconTone, "bg-current")} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
