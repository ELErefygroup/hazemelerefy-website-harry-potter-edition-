"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useId } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

/**
 * Hogwarts-style "moving portrait" frame.
 *
 * The picture sits inside an ornate gilded SVG frame (filigree corners,
 * beaded border, engraved name plaque) and gets a slow painterly idle —
 * a tiny scale + drift + brightness flicker that mimics the wizarding
 * world's animated portraits without ever feeling distracting.
 *
 * Reduced-motion: the idle animation is disabled and a static still is shown.
 */
export function PortraitFrame({
  src,
  alt,
  name,
  title,
  size = 320,
  className,
}: {
  src: string;
  alt: string;
  name: string;
  title?: string;
  size?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <figure
      className={cn(
        "relative inline-block select-none",
        className,
      )}
      style={{ width: size + 56 }}
    >
      {/* Outer warm halo (candlelight) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(230,178,94,0.35), transparent 70%)",
          transform: "scale(1.15)",
        }}
      />

      {/* The frame itself — ornate gilded SVG */}
      <div
        className="relative"
        style={{
          width: size + 56,
          padding: 28,
        }}
      >
        <FrameOrnament />

        {/* Inner mat (cream-tinted darker rim) */}
        <div
          className="relative overflow-hidden rounded-[6px] border border-candle/30"
          style={{
            width: size,
            height: size,
            boxShadow:
              "inset 0 0 0 6px rgba(230,178,94,0.18), inset 0 0 30px rgba(0,0,0,0.55)",
          }}
        >
          {/* The painterly portrait */}
          <motion.div
            className="absolute inset-0 will-change-transform"
            initial={false}
            animate={
              reduced
                ? { scale: 1, y: 0, filter: "brightness(1)" }
                : {
                    scale: [1, 1.02, 1],
                    y: [0, -3, 0],
                    filter: [
                      "brightness(1)",
                      "brightness(1.05)",
                      "brightness(0.98)",
                      "brightness(1)",
                    ],
                  }
            }
            transition={
              reduced
                ? { duration: 0 }
                : {
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes={`${size}px`}
              priority
              className="object-cover"
              style={{
                // sepia + slight desaturation to feel painted
                filter: "sepia(0.18) saturate(0.92) contrast(1.05)",
              }}
            />

            {/* Painterly varnish overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 mix-blend-soft-light"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, rgba(230,178,94,0.20), transparent 55%), radial-gradient(circle at 75% 80%, rgba(0,0,0,0.45), transparent 60%)",
              }}
            />

            {/* Ageing vignette */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle, transparent 55%, rgba(0,0,0,0.55) 100%)",
              }}
            />
          </motion.div>
        </div>

        {/* Engraved name plaque */}
        <div className="relative mx-auto mt-4 w-[88%]">
          <NamePlaque name={name} title={title} />
        </div>
      </div>
    </figure>
  );
}

/* --------------------------- Sub-components --------------------------- */

function FrameOrnament() {
  // Per-instance gradient IDs so multiple frames on the same page do not
  // collide in the DOM (SVG `url(#id)` references resolve document-wide).
  const uid = useId();
  const goldGrad = `${uid}-goldGrad`;
  const goldRim = `${uid}-goldRim`;

  // Layered SVG gilded frame: outer beaded rim + inner filigree corners.
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={goldGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F0CB7A" />
          <stop offset="35%" stopColor="#E6B25E" />
          <stop offset="70%" stopColor="#A07331" />
          <stop offset="100%" stopColor="#5C3D14" />
        </linearGradient>
        <linearGradient id={goldRim} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBE3A8" />
          <stop offset="50%" stopColor="#C99950" />
          <stop offset="100%" stopColor="#5C3D14" />
        </linearGradient>
      </defs>

      {/* Outer thick gold band */}
      <rect
        x="0.5"
        y="0.5"
        width="99"
        height="99"
        rx="2.5"
        ry="2.5"
        fill={`url(#${goldGrad})`}
        stroke="#3A260A"
        strokeWidth="0.6"
      />

      {/* Bevel highlight */}
      <rect
        x="2"
        y="2"
        width="96"
        height="96"
        rx="1.5"
        ry="1.5"
        fill="none"
        stroke={`url(#${goldRim})`}
        strokeWidth="0.5"
        opacity="0.85"
      />

      {/* Inner cut-out where the picture sits */}
      <rect
        x="9"
        y="9"
        width="82"
        height="82"
        rx="0.6"
        ry="0.6"
        fill="#0a0f1c"
        stroke="#3A260A"
        strokeWidth="0.5"
      />

      {/* Inner gold rim */}
      <rect
        x="9.5"
        y="9.5"
        width="81"
        height="81"
        rx="0.4"
        ry="0.4"
        fill="none"
        stroke="#E6B25E"
        strokeWidth="0.3"
      />

      {/* Filigree corners */}
      {[
        { x: 9, y: 9, sx: 1, sy: 1 },
        { x: 91, y: 9, sx: -1, sy: 1 },
        { x: 9, y: 91, sx: 1, sy: -1 },
        { x: 91, y: 91, sx: -1, sy: -1 },
      ].map((c, i) => (
        <g
          key={i}
          transform={`translate(${c.x} ${c.y}) scale(${c.sx} ${c.sy})`}
        >
          <path
            d="M0 0 L9 0 C7 0 5 1 4 3 C3 5 2 7 0 9 Z"
            fill={`url(#${goldGrad})`}
            stroke="#3A260A"
            strokeWidth="0.3"
          />
          <path
            d="M2 2 C5 2 7 4 7 7"
            fill="none"
            stroke="#FBE3A8"
            strokeWidth="0.35"
            strokeLinecap="round"
            opacity="0.9"
          />
          <circle cx="3.6" cy="3.6" r="0.6" fill="#FBE3A8" opacity="0.9" />
        </g>
      ))}

      {/* Beaded outer perimeter */}
      <g fill="#FBE3A8" opacity="0.95">
        {Array.from({ length: 18 }).map((_, i) => (
          <circle key={`top-${i}`} cx={5 + i * 5} cy="3.5" r="0.35" />
        ))}
        {Array.from({ length: 18 }).map((_, i) => (
          <circle key={`bot-${i}`} cx={5 + i * 5} cy="96.5" r="0.35" />
        ))}
        {Array.from({ length: 18 }).map((_, i) => (
          <circle key={`l-${i}`} cx="3.5" cy={5 + i * 5} r="0.35" />
        ))}
        {Array.from({ length: 18 }).map((_, i) => (
          <circle key={`r-${i}`} cx="96.5" cy={5 + i * 5} r="0.35" />
        ))}
      </g>
    </svg>
  );
}

function NamePlaque({ name, title }: { name: string; title?: string }) {
  const uid = useId();
  const plaqueGrad = `${uid}-plaqueGrad`;
  return (
    <div className="relative">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={plaqueGrad} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F0CB7A" />
            <stop offset="50%" stopColor="#A07331" />
            <stop offset="100%" stopColor="#5C3D14" />
          </linearGradient>
        </defs>
        <path
          d="M2 12 C8 6 16 4 28 4 H172 C184 4 192 6 198 12 V48 C192 54 184 56 172 56 H28 C16 56 8 54 2 48 Z"
          fill={`url(#${plaqueGrad})`}
          stroke="#3A260A"
          strokeWidth="1.2"
        />
        <path
          d="M6 14 C12 10 18 8 28 8 H172 C182 8 188 10 194 14"
          fill="none"
          stroke="#FBE3A8"
          strokeWidth="0.6"
          opacity="0.7"
        />
      </svg>
      <div className="relative px-6 py-3 text-center">
        <p className="font-display text-[15px] font-bold tracking-[0.25em] text-ink">
          {name}
        </p>
        {title ? (
          <p className="mt-0.5 font-display text-[10px] uppercase tracking-[0.32em] text-ink/75">
            {title}
          </p>
        ) : null}
      </div>
    </div>
  );
}
