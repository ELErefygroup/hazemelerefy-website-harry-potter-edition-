"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { services, type ServiceItem } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * Services grid — Analytics / Frontend tabs, each tab a 2-column card
 * grid with a discipline title, blurb, and bulleted artefacts.
 */
type Tab = "analytics" | "frontend";

export function ServicesGrid() {
  const reduced = useReducedMotion();
  const [tab, setTab] = useState<Tab>("analytics");
  const filtered = services.filter((s) => s.category === tab);
  const meta = {
    analytics: {
      eyebrow: "Data & decision systems",
      title: "Analytics Track",
      blurb:
        "Dashboards, modelling, pipelines, and grounded AI workflows built to survive real operational use.",
    },
    frontend: {
      eyebrow: "Interface & delivery systems",
      title: "Frontend Track",
      blurb:
        "Next.js applications, premium interfaces, and admin surfaces that stay calm under complex data.",
    },
  }[tab];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Service categories"
        className="mx-auto inline-flex w-full max-w-md items-center gap-1 rounded-full border border-candle/20 bg-night/65 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(230,178,94,0.06)] backdrop-blur"
      >
        <TabButton active={tab === "analytics"} onClick={() => setTab("analytics")}>
          Analytics
        </TabButton>
        <TabButton active={tab === "frontend"} onClick={() => setTab("frontend")}>
          Frontend
        </TabButton>
      </div>

      <div className="mx-auto mt-5 max-w-3xl rounded-[28px] border border-candle/15 bg-night/45 p-5 text-left shadow-[0_20px_50px_-30px_rgba(0,0,0,0.8)] backdrop-blur-md md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.38em] text-candle/78">
              {meta.eyebrow}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-parchment md:text-3xl">
              {meta.title}
            </h3>
          </div>
          <span className="inline-flex self-start rounded-full border border-parchment/12 bg-parchment/5 px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.28em] text-parchment/68">
            {filtered.length} offers
          </span>
        </div>

        <p className="mt-4 max-w-2xl font-heading text-base leading-relaxed text-parchment/62">
          {meta.blurb}
        </p>
      </div>

      <div className="mt-12">
        <AnimatePresence mode="wait">
          <motion.ul
            key={tab}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
            transition={reduced ? { duration: 0 } : { duration: 0.4 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {filtered.map((s) => (
              <li key={s.title}>
                <ServiceCard item={s} />
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "relative flex-1 rounded-full px-6 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.28em] transition-all duration-300",
        active
          ? "bg-gradient-to-r from-[#E6B25E] via-[#D49B45] to-[#C8853A] text-ink shadow-[0_4px_18px_rgba(230,178,94,0.4)]"
          : "text-parchment/55 hover:text-parchment/85",
      )}
    >
      {children}
    </button>
  );
}

function ServiceCard({ item }: { item: ServiceItem }) {
  const palette = {
    candle: { border: "hover:border-candle/55", title: "group-hover:text-candle", glow: "bg-candle/8 group-hover:bg-candle/15", dot: "bg-candle" },
    moon: { border: "hover:border-moon/55", title: "group-hover:text-moon", glow: "bg-moon/8 group-hover:bg-moon/15", dot: "bg-moon" },
    ember: { border: "hover:border-ember/55", title: "group-hover:text-ember", glow: "bg-ember/8 group-hover:bg-ember/15", dot: "bg-ember" },
    ravenclaw: { border: "hover:border-[#5a82b8]/55", title: "group-hover:text-[#9bb6e6]", glow: "bg-[#3a5a96]/10 group-hover:bg-[#3a5a96]/18", dot: "bg-[#9bb6e6]" },
    slytherin: { border: "hover:border-[#5fa178]/55", title: "group-hover:text-[#7ec39a]", glow: "bg-[#2e6b48]/10 group-hover:bg-[#2e6b48]/18", dot: "bg-[#7ec39a]" },
  }[item.accent];

  const trackLabel = item.category === "analytics" ? "Analytics Track" : "Frontend Track";

  return (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-3xl border border-parchment/12 bg-night/55 p-7 shadow-[0_24px_60px_-34px_rgba(0,0,0,0.9)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1",
        palette.border,
      )}
    >
      <div
        aria-hidden="true"
        className={cn("pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full blur-[80px] transition-all duration-700", palette.glow)}
      />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <span className="font-display text-[10px] font-semibold uppercase tracking-[0.34em] text-parchment/46">
            {trackLabel}
          </span>
          <span aria-hidden="true" className={cn("h-2 w-2 shrink-0 rounded-full shadow-[0_0_12px_currentColor]", palette.dot)} />
        </div>

        <h3 className={cn("font-display text-2xl font-bold text-parchment transition-colors duration-300", palette.title)}>
          {item.title}
        </h3>
        <p className="mt-3 font-heading text-base leading-relaxed text-parchment/70">
          {item.blurb}
        </p>

        <div className="mt-6 h-px w-full bg-gradient-to-r from-parchment/12 via-parchment/6 to-transparent" />
        <p className="mt-5 font-display text-[10px] font-semibold uppercase tracking-[0.32em] text-parchment/48">
          Includes
        </p>

        <ul className="mt-4 space-y-2.5">
          {item.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 font-heading text-sm text-parchment/75">
              <span aria-hidden="true" className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", palette.dot)} />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
