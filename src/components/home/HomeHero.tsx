"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";
import { SpellbookIcon, CrestIcon, QuillIcon } from "@/components/icons/HpIcons";

/**
 * Home hero — the very first thing a visitor sees on `/`. Mirrors the
 * legacy Home view IA: full-bleed banner.mp4 background, a small kicker
 * pill ("Data Analyst | Front-End Developer"), the full name H1
 * ("Hazem Elerefy" with a candle-gold gradient on the surname), a calm
 * intro paragraph, two pill CTAs ("Open the Tome", "View Services"), and
 * a floating cluster of three stat cards (60+ projects, 20+ clients,
 * 6+ years).
 *
 * Reduced-motion: the banner.mp4 is replaced by a still poster, and the
 * Framer reveal collapses to a one-frame opacity flip.
 */
export function HomeHero() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative isolate overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24"
    >
      {/* Background video */}
      <div className="absolute inset-0 -z-10">
        {reduced ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src="/images/portfolio-hero-poster.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/portfolio-hero-poster.jpg"
            aria-hidden="true"
            className="h-full w-full object-cover"
          >
            <source src="/video/portfolio-hero.mp4" type="video/mp4" />
          </video>
        )}
        {/* Vignette + parchment grain to settle the video into the page */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/55 to-night"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60 mix-blend-soft-light bg-parchment-noise"
        />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 text-center md:px-8">
        <motion.span
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.7 }}
          className="rounded-full border border-candle/30 bg-candle/8 px-4 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.4em] text-candle"
        >
          Data Analyst · Front-End Developer
        </motion.span>

        <motion.h1
          id="home-hero-title"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.8, delay: 0.1 }}
          className="mt-6 font-display text-5xl font-black leading-[0.95] text-parchment md:text-7xl lg:text-[88px]"
        >
          Hazem{" "}
          <span className="bg-gradient-to-br from-[#F0CB7A] via-[#E6B25E] to-[#C8853A] bg-clip-text text-transparent">
            Elerefy
          </span>
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
          className="mt-5 max-w-3xl font-heading text-lg leading-relaxed text-parchment/75 md:text-xl"
        >
          I build websites, dashboards, and digital experiences that pair
          clean front-end execution with strong data thinking. My work aims
          to feel clear, useful, and professionally presented — like a
          well-bound book opened at exactly the right page.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#E6B25E] via-[#D49B45] to-[#C8853A] px-8 py-3.5 font-display text-[12px] font-bold uppercase tracking-[0.3em] text-ink shadow-[0_0_30px_rgba(230,178,94,0.35)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(230,178,94,0.55)] hover:-translate-y-0.5"
          >
            Explore My Portfolio
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-parchment/15 bg-parchment/5 px-7 py-3.5 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-parchment/85 backdrop-blur transition-all duration-300 hover:border-candle/40 hover:bg-candle/10 hover:text-candle"
          >
            <span aria-hidden="true" className="text-candle">✦</span>
            View My Services
          </Link>
        </motion.div>

        {/* Stat cluster — three floating cards */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.9, delay: 0.45 }}
          className="mt-20 grid w-full max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3"
        >
          <StatCard
            count="60+"
            label="Projects"
            tone="candle"
            float="animate-float-1"
            icon={<SpellbookIcon width={28} height={28} />}
            reduced={reduced}
          />
          <StatCard
            count="20+"
            label="Clients"
            tone="moon"
            float="animate-float-2"
            icon={<CrestIcon width={28} height={28} />}
            reduced={reduced}
            offset="md:translate-y-3"
          />
          <StatCard
            count="6+"
            label="Years"
            tone="ember"
            float="animate-float-3"
            icon={<QuillIcon width={28} height={28} />}
            reduced={reduced}
            offset="md:-translate-y-2"
          />
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({
  count,
  label,
  tone,
  float,
  icon,
  reduced,
  offset,
}: {
  count: string;
  label: string;
  tone: "candle" | "moon" | "ember";
  float: string;
  icon: React.ReactNode;
  reduced: boolean;
  offset?: string;
}) {
  const palette = {
    candle: { ring: "border-candle/30", glow: "from-candle/10", text: "text-candle" },
    moon: { ring: "border-moon/30", glow: "from-moon/10", text: "text-moon" },
    ember: { ring: "border-ember/30", glow: "from-ember/15", text: "text-ember" },
  }[tone];

  return (
    <div className={cn(reduced ? "" : float, offset, "transform-gpu")}>
      <div
        className={cn(
          "group relative flex items-center gap-4 rounded-3xl border bg-night/60 p-5 backdrop-blur-xl transition-all duration-500",
          palette.ring,
          "hover:-translate-y-1 hover:bg-night/75",
          "shadow-[0_18px_40px_-22px_rgba(0,0,0,0.85)]",
        )}
      >
        <div
          aria-hidden="true"
          className={cn("absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500", palette.glow)}
        />
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border bg-night/40",
            palette.ring,
            palette.text,
          )}
        >
          {icon}
        </div>
        <div className="text-left">
          <div className={cn("font-display text-3xl font-black leading-none", palette.text)}>
            {count}
          </div>
          <div className="mt-1 font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-parchment/60">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}
