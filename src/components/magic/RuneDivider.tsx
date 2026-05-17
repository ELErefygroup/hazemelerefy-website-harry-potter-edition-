import { cn } from "@/lib/cn";

/**
 * Decorative section divider in the Hogwarts banner style: a thin gold
 * filigree line with a centered crest medallion. Server component, pure SVG.
 */
export function RuneDivider({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-4 text-candle/70",
        className,
      )}
      role="separator"
      aria-label={label ?? "section divider"}
    >
      <svg
        viewBox="0 0 200 12"
        className="h-3 flex-1 text-candle/50"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        aria-hidden="true"
      >
        <path d="M0 6h60" />
        <path d="M60 6c4 0 6-4 12-4s8 8 14 8" />
        <path d="M86 6h28" />
      </svg>

      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7 text-candle"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 3l11 4v9c0 6-5 11-11 13C10 27 5 22 5 16V7z" />
        <circle cx="16" cy="14" r="3" />
        <path d="M16 3v25" />
        <path d="M5 16h22" />
      </svg>

      <svg
        viewBox="0 0 200 12"
        className="h-3 flex-1 text-candle/50"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        aria-hidden="true"
      >
        <path d="M86 6h28" />
        <path d="M114 6c6 0 8-8 14-8s8 4 12 4" />
        <path d="M140 6h60" />
      </svg>

      {label ? (
        <span className="sr-only">{label}</span>
      ) : null}
    </div>
  );
}
