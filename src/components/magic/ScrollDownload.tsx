"use client";

import { useState, useRef, useEffect } from "react";
import { ScrollIcon, OwlIcon, SpellbookIcon } from "@/components/icons/HpIcons";
import { cn } from "@/lib/cn";
import { motion, AnimatePresence } from "framer-motion";

export function ScrollDownload({
  href = "/Hazemelerefy CV.pdf",
  filename = "Hazemelerefy_CV.pdf",
  variant = "outline",
}: {
  href?: string;
  filename?: string;
  variant?: "outline" | "primary" | "ghost";
}) {
  const [state, setState] = useState<"idle" | "saddling" | "delivered">("idle");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDownload = () => {
    setIsOpen(false);
    if (state !== "idle") return;
    setState("saddling");

    const a = document.createElement("a");
    a.href = href;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    let done = false;
    const settle = () => {
      if (done) return;
      done = true;
      setState("delivered");
      window.setTimeout(() => setState("idle"), 3000);
    };
    const fallback = window.setTimeout(settle, 2400);
    const onFocus = () => {
      window.clearTimeout(fallback);
      window.setTimeout(settle, 350);
    };
    window.addEventListener("focus", onFocus, { once: true });
  };

  const handleDisplay = () => {
    setIsOpen(false);
    window.open(href, "_blank");
  };

  const base =
    "group inline-flex items-center gap-2.5 rounded-full font-display text-[11px] font-semibold uppercase tracking-[0.32em] transition-all duration-300 cursor-pointer";
  const variants = {
    outline:
      "border border-parchment/15 bg-parchment/5 px-7 py-3.5 text-parchment/85 backdrop-blur hover:border-candle/40 hover:bg-candle/10 hover:text-candle",
    primary:
      "border border-candle/55 bg-candle/15 px-7 py-3.5 text-candle backdrop-blur hover:bg-candle/25 hover:shadow-[0_0_28px_rgba(230,178,94,0.45)]",
    ghost:
      "px-3 py-2 text-parchment/85 hover:text-candle",
  }[variant];

  const label =
    state === "saddling"
      ? "Saddling the Owl…"
      : state === "delivered"
        ? "Delivered"
        : "Read the Scroll";

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-busy={state === "saddling"}
        onClick={() => {
          if (state === "idle") {
            setIsOpen(!isOpen);
          }
        }}
        className={cn(
          base,
          variants,
          state === "saddling" && "cursor-progress opacity-90",
          isOpen && "border-candle/40 text-candle bg-candle/10"
        )}
      >
        <span aria-hidden="true" className="grid h-5 w-5 place-items-center">
          {state === "saddling" ? (
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-candle/30 border-t-candle" />
          ) : state === "delivered" ? (
            <CheckGlyph />
          ) : (
            <ScrollIcon width={16} height={16} />
          )}
        </span>
        {label}
        {state === "idle" && (
          <span
            className={cn(
              "ml-1 text-[8px] transition-transform duration-300",
              isOpen ? "rotate-180 text-candle" : "text-parchment/40 group-hover:text-candle"
            )}
          >
            ▼
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ originY: 0 }}
            className="absolute left-1/2 z-50 mt-3 w-56 -translate-x-1/2 rounded-2xl border border-candle/25 bg-night/95 p-1.5 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.85),_0_0_20px_rgba(230,178,94,0.06)]"
            role="menu"
          >
            {/* Display Option */}
            <button
              type="button"
              role="menuitem"
              onClick={handleDisplay}
              className="group/item flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-left font-display text-[10px] font-bold uppercase tracking-wider text-parchment/80 transition-all duration-200 hover:bg-candle/10 hover:text-candle"
            >
              <SpellbookIcon
                width={16}
                height={16}
                className="text-candle/40 transition-colors group-hover/item:text-candle"
              />
              Display Scroll
            </button>

            <div className="my-1 h-px bg-candle/10" />

            {/* Download Option */}
            <button
              type="button"
              role="menuitem"
              onClick={handleDownload}
              className="group/item flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-left font-display text-[10px] font-bold uppercase tracking-wider text-parchment/80 transition-all duration-200 hover:bg-candle/10 hover:text-candle"
            >
              <OwlIcon
                width={16}
                height={16}
                className="text-candle/40 transition-colors group-hover/item:text-candle"
              />
              Saddle Owl
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="2.4"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12.6l4.9 4.9L20 6.5" />
    </svg>
  );
}
