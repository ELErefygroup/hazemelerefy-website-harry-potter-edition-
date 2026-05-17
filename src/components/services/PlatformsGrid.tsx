"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { platforms } from "@/content/platforms";

/**
 * Platforms grid — five freelance platform cards. Each card outbound-
 * links to the user's profile on that platform, with a soft hover halo
 * tinted by the platform's brand colour.
 */
export function PlatformsGrid() {
  const reduced = useReducedMotion();

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {platforms.map((p, i) => (
        <li key={p.id}>
          <motion.a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={reduced ? { duration: 0 } : { duration: 0.5, delay: i * 0.06 }}
            aria-label={`View profile on ${p.name}`}
            className="group relative flex h-full flex-col gap-4 rounded-[26px] border border-parchment/10 bg-night/55 p-5 text-left shadow-[0_20px_55px_-35px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-candle/40"
            style={
              {
                ["--brand" as string]: p.brand,
              } as React.CSSProperties
            }
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-5 top-0 h-px"
              style={{ background: "linear-gradient(90deg, var(--brand), transparent)" }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at 50% 0%, var(--brand) 0%, transparent 60%)",
                opacity: 0.18,
              }}
            />

            <div className="relative flex items-start justify-between gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-parchment/5 ring-1 ring-parchment/10">
                {p.logo ? (
                  <Image
                    src={p.logo}
                    alt=""
                    width={48}
                    height={48}
                    className="h-10 w-10 object-contain"
                  />
                ) : (
                  <span className="font-display text-base font-bold uppercase text-candle">
                    {p.name.slice(0, 1)}
                  </span>
                )}
              </div>

              {p.id === "upwork" ? (
                <span className="inline-flex rounded-full border border-candle/20 bg-candle/10 px-2.5 py-1 font-display text-[9px] font-semibold uppercase tracking-[0.28em] text-candle">
                  Primary
                </span>
              ) : null}
            </div>

            <div className="relative">
              <h3 className="font-display text-sm font-bold text-parchment transition-colors duration-300 group-hover:text-candle">
                {p.name}
              </h3>
              <p className="mt-2 font-heading text-xs leading-relaxed text-parchment/55">
                {p.blurb}
              </p>
            </div>

            <span aria-hidden="true" className="mt-auto pt-1 font-display text-[9px] font-semibold uppercase tracking-[0.3em] text-candle/65 transition-colors duration-300 group-hover:text-candle">
              Visit Profile →
            </span>
          </motion.a>
        </li>
      ))}
    </ul>
  );
}
