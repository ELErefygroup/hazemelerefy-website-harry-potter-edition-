"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Thin/delicate profile frame — Option A from the proposal.
 *
 * Replaces the gilded portrait of PR #1. Just a 3px conic-gradient ring
 * (candle → moon → ember → candle), a soft halo behind it, a faint
 * top-edge glint, and a small candle-rim plaque under the photo with the
 * sitter's name. No filigree, no medallion, no plaque shadow — the user
 * specifically asked for thin and delicate.
 *
 * Idle motion: a very gentle painterly drift on the photo only (the ring
 * stays still so the gradient reads cleanly). Disabled under reduced
 * motion via the `painterly-drift` keyframe in globals.css.
 */
export function ProfileFrameV2({
  src = "/images/profile.jpg",
  alt = "Hazem Elerefy",
  signature = "Hazem Elerefy",
  priority = true,
}: {
  src?: string;
  alt?: string;
  signature?: string;
  priority?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={reduced ? { duration: 0 } : { duration: 0.9, ease: [0.2, 0, 0, 1] }}
      className="relative mx-auto w-full max-w-[300px] md:max-w-[320px] lg:max-w-[360px]"
    >
      {/* Soft halo behind */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40%] bg-[radial-gradient(circle_at_center,rgba(230,178,94,0.18),rgba(184,197,220,0.08)_45%,transparent_70%)] blur-2xl"
      />

      {/* Conic-gradient ring frame */}
      <div
        className="relative aspect-[3/4] rounded-[1.75rem] p-[3px]"
        style={{
          background:
            "conic-gradient(from 215deg, #E6B25E 0deg, #B8C5DC 110deg, #C8853A 230deg, #E6B25E 360deg)",
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-night shadow-[0_30px_60px_-22px_rgba(0,0,0,0.85),0_0_0_1px_rgba(230,178,94,0.08)_inset]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 320px, 300px"
            className="object-cover transition-all duration-700 [filter:grayscale(8%)_contrast(1.02)] hover:[filter:grayscale(0%)_contrast(1.05)]"
            priority={priority}
          />

          {/* Inner top glint — a thin parchment hairline */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-3 top-2 h-px bg-gradient-to-r from-transparent via-parchment/70 to-transparent"
          />

          {/* Inner edge vignette — keeps the photo grounded against the ring */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[1.6rem]"
            style={{
              boxShadow:
                "inset 0 0 0 1px rgba(230,178,94,0.18), inset 0 -28px 60px -30px rgba(0,0,0,0.7)",
            }}
          />
        </div>
      </div>

      {/* Name plaque */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-candle/35 bg-night/95 px-4 py-1.5 backdrop-blur shadow-[0_8px_24px_-12px_rgba(0,0,0,0.9)]">
        <span className="font-display text-[9px] font-semibold uppercase tracking-[0.32em] text-candle/95 whitespace-nowrap">
          {signature}
        </span>
      </div>
    </motion.div>
  );
}
