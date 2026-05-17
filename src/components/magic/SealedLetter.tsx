import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Card surface styled as an aged parchment letter sealed with a wax stamp.
 *
 * Server component. Use for project tiles, expertise blurbs, etc.
 */
export function SealedLetter({
  title,
  eyebrow,
  children,
  seal,
  className,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  /** Two-letter monogram drawn in the wax seal. Defaults to "HE". */
  seal?: string;
  className?: string;
}) {
  const monogram = (seal ?? "HE").slice(0, 2).toUpperCase();

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-candle/15",
        "bg-twilight/80 p-7 text-parchment shadow-[var(--shadow-surface-lg)]",
        "transition-all duration-500 hover:border-candle/40 hover:-translate-y-1",
        "hover:shadow-[0_28px_72px_-20px_rgba(0,0,0,0.9),0_0_48px_-10px_rgba(230,178,94,0.35)]",
        className,
      )}
    >
      {/* Parchment glow corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-candle/15 blur-3xl transition-opacity duration-500 group-hover:opacity-80 opacity-50"
      />

      {/* Wax seal */}
      <div className="absolute right-5 top-5 z-10">
        <div
          className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gryffindor/60"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #9c2d33, #7a2128 55%, #4f1217 100%)",
            boxShadow:
              "inset 0 0 12px rgba(0,0,0,0.55), 0 4px 14px -4px rgba(0,0,0,0.6)",
          }}
          aria-hidden="true"
        >
          <span className="font-display text-[11px] font-bold tracking-widest text-candle/90">
            {monogram}
          </span>
        </div>
      </div>

      {eyebrow ? (
        <p className="mb-2 font-display text-[11px] uppercase tracking-[0.32em] text-candle/70">
          {eyebrow}
        </p>
      ) : null}

      <h3 className="mb-3 max-w-[18ch] font-display text-2xl font-semibold text-parchment">
        {title}
      </h3>

      <div className="font-heading text-base leading-relaxed text-parchment/80">
        {children}
      </div>
    </article>
  );
}
