"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ProfileFrameV2 } from "@/components/portfolio/ProfileFrameV2";
import { OwlIcon, SpellbookIcon, CrestIcon, QuillIcon } from "@/components/icons/HpIcons";
import { ScrollDownload } from "@/components/magic/ScrollDownload";
import { site } from "@/lib/site";

/**
 * Portfolio hero — the legacy IA: 2-column scene above the fold with a
 * thin/delicate profile frame on the left and a name + tagline + intro
 * + stat chips + CTAs on the right. The full-bleed banner.mp4 sits behind
 * everything and pauses when off-screen.
 *
 * Mobile: collapses to a single column, frame on top.
 *
 * Reduced motion: the video swaps to a still poster, the Framer reveal
 * collapses to a one-frame opacity flip.
 */
export function PortfolioHero({
  videoSrc = "/video/portfolio-hero.mp4",
  poster = "/images/portfolio-hero-poster.jpg",
}: {
  videoSrc?: string;
  poster?: string;
}) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [canPlay, setCanPlay] = useState(false);
  const revealed = canPlay || reduced;

  useEffect(() => {
    if (reduced) return;
    const v = videoRef.current;
    if (!v) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          void v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.05 },
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, [reduced]);

  return (
    <section
      aria-labelledby="portfolio-hero-title"
      className="relative isolate overflow-hidden flex min-h-screen items-center pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-24 lg:pb-20"
    >
      {/* Background banner */}
      <div className="absolute inset-0 -z-10">
        <Image src={poster} alt="Portfolio hero background" fill priority sizes="100vw" className="object-cover" />
        {!reduced && (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => setCanPlay(true)}
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-night/45 via-night/55 to-night"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-50 mix-blend-soft-light bg-parchment-noise"
        />
        {/* Subtle vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-8 md:gap-16 lg:grid-cols-[minmax(280px,38%)_1fr] lg:gap-20">
        {/* Profile column */}
        <motion.div
          initial={reduced ? false : { opacity: 0, x: -24 }}
          animate={{ opacity: revealed ? 1 : 0, x: revealed ? 0 : -24 }}
          transition={reduced ? { duration: 0 } : { duration: 0.9, ease: [0.2, 0, 0, 1] }}
          className="order-2 flex justify-center lg:order-1"
        >
          <ProfileFrameV2 />
        </motion.div>

        {/* Text column */}
        <div className="order-1 text-center lg:order-2 lg:text-left">
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 12 }}
            transition={reduced ? { duration: 0 } : { duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-candle/30 bg-candle/10 px-4 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.4em] text-candle"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-candle/80 shadow-[0_0_10px_rgba(230,178,94,0.7)]" />
            Data Analyst · Front-End Developer
          </motion.span>

          <motion.h1
            id="portfolio-hero-title"
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 22 }}
            transition={reduced ? { duration: 0 } : { duration: 0.9, delay: 0.2 }}
            className="mt-5 font-display text-5xl font-black leading-[0.92] text-parchment drop-shadow-[0_2px_24px_rgba(0,0,0,0.7)] md:text-6xl lg:text-[78px]"
          >
            <span className="block">Hazem Khaled</span>
            <span className="mt-2 block bg-gradient-to-br from-[#F0CB7A] via-[#E6B25E] to-[#C8853A] bg-clip-text text-transparent">
              Ezat
            </span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 16 }}
            transition={reduced ? { duration: 0 } : { duration: 0.9, delay: 0.35 }}
            className="mt-4 max-w-2xl font-heading text-xl italic leading-snug text-parchment/85 md:text-2xl mx-auto lg:mx-0"
          >
            A Data Analyst,{" "}
            <span className="bg-gradient-to-r from-[#F0CB7A] via-[#E6B25E] to-[#C8853A] bg-clip-text text-transparent">
              charmed by the front-end.
            </span>
          </motion.p>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 16 }}
            transition={reduced ? { duration: 0 } : { duration: 0.9, delay: 0.5 }}
            className="mt-5 max-w-xl font-heading text-base leading-relaxed text-parchment/65 md:text-lg mx-auto lg:mx-0"
          >
            Translating complex data into pixel-perfect dashboards and
            premium digital experiences — brewed by candlelight from a
            desk of ancient tomes.
          </motion.p>

          <motion.ul
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 16 }}
            transition={reduced ? { duration: 0 } : { duration: 0.8, delay: 0.58 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start"
          >
            {[
              "Dashboard storytelling",
              "Premium front-end systems",
              "Freelance-ready delivery",
            ].map((item) => (
              <li
                key={item}
                className="rounded-full border border-parchment/12 bg-night/45 px-3.5 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-parchment/72 backdrop-blur-sm"
              >
                {item}
              </li>
            ))}
          </motion.ul>

          {/* Stat chips */}
          <motion.ul
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 18 }}
            transition={reduced ? { duration: 0 } : { duration: 0.8, delay: 0.7 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <StatChip icon={<SpellbookIcon width={14} height={14} />} value="60+" label="Projects" tone="candle" />
            <StatChip icon={<CrestIcon width={14} height={14} />} value="20+" label="Clients" tone="moon" />
            <StatChip icon={<QuillIcon width={14} height={14} />} value="6+" label="Years" tone="ember" />
          </motion.ul>

          {/* CTAs */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: revealed ? 1 : 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.7, delay: 0.9 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start lg:justify-start"
          >
            <Link
              href="#gallery"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#E6B25E] via-[#D49B45] to-[#C8853A] px-8 py-3.5 font-display text-[12px] font-bold uppercase tracking-[0.3em] text-ink shadow-[0_0_30px_rgba(230,178,94,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(230,178,94,0.6)]"
            >
              <SpellbookIcon width={16} height={16} />
              Open the Tome
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <ScrollDownload variant="outline" />
            <Link
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 font-heading text-base text-parchment/85 underline decoration-candle/40 decoration-1 underline-offset-[6px] transition-colors hover:text-candle"
            >
              <OwlIcon width={16} height={16} />
              Send an owl
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom edge filigree */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-candle/45 to-transparent"
      />
    </section>
  );
}

function StatChip({
  icon,
  value,
  label,
  tone,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  tone: "candle" | "moon" | "ember";
}) {
  const palette = {
    candle: "border-candle/30 text-candle",
    moon: "border-moon/30 text-moon",
    ember: "border-ember/30 text-ember",
  }[tone];

  return (
    <li className={`inline-flex items-center gap-2 rounded-full border bg-night/55 px-3.5 py-1.5 backdrop-blur ${palette}`}>
      <span aria-hidden="true">{icon}</span>
      <span className="font-display text-base font-bold leading-none">
        {value}
      </span>
      <span className="font-display text-[10px] font-semibold uppercase tracking-[0.28em] text-parchment/65">
        {label}
      </span>
    </li>
  );
}
