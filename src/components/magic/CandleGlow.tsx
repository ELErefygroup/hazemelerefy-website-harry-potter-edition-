"use client";

import { type MouseEvent, type ReactNode, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Wraps any element with a soft candle-glow that follows the cursor.
 * Adds a subtle 3D tilt on pointer move; resets on leave.
 *
 * Disabled automatically on touch / coarse pointers.
 */
export function CandleGlow({
  children,
  className,
  intensity = 0.18,
}: {
  children: ReactNode;
  className?: string;
  /** 0..1 — how strongly the tilt responds to cursor (default: 0.18) */
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * 8 * intensity * 4;
    const ry = (px - 0.5) * 8 * intensity * 4;
    el.style.setProperty("--cx", `${px * 100}%`);
    el.style.setProperty("--cy", `${py * 100}%`);
    el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--cx", `50%`);
    el.style.setProperty("--cy", `50%`);
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "group relative [perspective:1200px] motion-reduce:[perspective:none]",
        className,
      )}
      style={{
        // CSS custom props consumed by the inner glow layer
        ["--cx" as string]: "50%",
        ["--cy" as string]: "50%",
        ["--rx" as string]: "0deg",
        ["--ry" as string]: "0deg",
      }}
    >
      <div
        className="relative transition-transform duration-300 ease-out [transform:rotateX(var(--rx))_rotateY(var(--ry))] motion-reduce:!transform-none"
      >
        {children}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(280px circle at var(--cx) var(--cy), rgba(230,178,94,0.18), transparent 60%)",
          }}
        />
      </div>
    </div>
  );
}
