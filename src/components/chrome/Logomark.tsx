import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * "HEY" wordmark. Inherits the legacy concept (gradient SVG text) but
 * retinted to the Hogwarts-by-Night palette: candle → ember → moon.
 *
 * Two sizes — a compact 44×22 for the header and a roomier 60×30 for the
 * footer / hero contexts. Renders as plain SVG so it scales crisply, has
 * no flash on hydration, and works inside server components.
 *
 * Each instance generates its own gradient `id` via `useId()` so the
 * wordmark can appear multiple times on the same page (header + footer)
 * without colliding in the DOM.
 */
export function Logomark({
  variant = "header",
  className,
  ariaLabel = "Hazem Elerefy",
}: {
  variant?: "header" | "footer";
  className?: string;
  ariaLabel?: string;
}) {
  const uid = useId();
  const gradId = `${uid}-hey-gradient`;

  const w = variant === "header" ? 44 : 60;
  const h = variant === "header" ? 22 : 30;
  const fontSize = variant === "header" ? 22 : 28;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 60 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
      className={cn(
        "transform-gpu transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(230,178,94,0.7)]",
        className,
      )}
    >
      <text
        x={0}
        y={24}
        fontFamily='"Cinzel", "Plus Jakarta Sans", serif'
        fontWeight={900}
        fontSize={fontSize}
        fill={`url(#${gradId})`}
        letterSpacing={-1}
      >
        HEY
      </text>
      <defs>
        <linearGradient
          id={gradId}
          x1="0"
          y1="0"
          x2="60"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0CB7A" />
          <stop offset="0.5" stopColor="#E6B25E" />
          <stop offset="1" stopColor="#C8853A" />
        </linearGradient>
      </defs>
    </svg>
  );
}
