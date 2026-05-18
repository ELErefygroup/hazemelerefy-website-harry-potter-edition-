"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

export function ScrollIndicator({
  targetId,
  className,
  label = "Descend",
}: {
  targetId: string;
  className?: string;
  label?: string;
}) {
  const reduced = useReducedMotion();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      className={cn(
        "absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2",
        className
      )}
    >
      <a
        href={`#${targetId}`}
        onClick={handleScroll}
        className="group flex flex-col items-center focus:outline-none"
        aria-label={`Scroll down to next section: ${targetId}`}
      >
        {/* Pulsing Outer Ring */}
        <motion.div
          animate={
            reduced
              ? {}
              : {
                  y: [0, 8, 0],
                }
          }
          transition={
            reduced
              ? {}
              : {
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-candle/30 bg-night/80 backdrop-blur-md transition-all duration-300 hover:border-candle hover:shadow-[0_0_20px_rgba(230,178,94,0.4)]"
        >
          {/* Inner Glowing Aura */}
          <div className="absolute inset-0 -z-10 rounded-full bg-candle/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Golden Compass/Arrow Icon */}
          <svg
            className="h-4 w-4 text-candle transition-transform duration-300 group-hover:translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-6l-7 7-7-7" />
          </svg>

          {/* Magical Orbit Ring */}
          <span className="absolute -inset-1 rounded-full border border-dashed border-candle/15 animate-[spin_40s_linear_infinite] group-hover:border-candle/30" />
        </motion.div>

        {/* Muted Magical Text Label */}
        <span className="mt-2 font-display text-[9px] font-bold uppercase tracking-[0.45em] text-parchment/45 transition-colors duration-300 group-hover:text-candle group-hover:drop-shadow-[0_0_10px_rgba(230,178,94,0.3)]">
          {label}
        </span>
      </a>
    </div>
  );
}
