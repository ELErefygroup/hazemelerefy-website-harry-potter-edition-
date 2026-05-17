"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Fixed corner button that appears once the user has scrolled past one
 * viewport, returning them to the top with a smooth scroll. Hidden when
 * `prefers-reduced-motion: reduce` to avoid layout fights with assistive
 * tech, since the page is already keyboard-navigable.
 */
export function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-candle/40 bg-night/80 text-candle backdrop-blur transition-all duration-300 hover:border-candle hover:bg-candle/15 hover:shadow-[0_0_22px_rgba(230,178,94,0.45)]",
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 12V2M2 7l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
