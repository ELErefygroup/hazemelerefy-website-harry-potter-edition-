"use client";

import { useState } from "react";
import { ScrollIcon } from "@/components/icons/HpIcons";
import { cn } from "@/lib/cn";

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

  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
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
  }

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
    <button
      type="button"
      onClick={onClick}
      aria-busy={state === "saddling"}
      className={cn(base, variants, state === "saddling" && "cursor-progress opacity-90")}
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
    </button>
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
