"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { primaryNav } from "@/content/nav";
import { cn } from "@/lib/cn";
import { trapFocus } from "@/lib/focus";

/**
 * Mobile drawer for narrow viewports. Renders a full-height overlay with
 * the same nav links as `Header` plus a generous "Send Owl" CTA. Body
 * scroll is locked while open and focus is moved into the drawer.
 *
 * Reduced-motion users get a snap fade instead of slide-in.
 */
export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    lastFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    document.body.style.overflow = "hidden";

    const focusClose = window.requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      const dialog = dialogRef.current;
      if (dialog) trapFocus(e, dialog);
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.cancelAnimationFrame(focusClose);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);

      const lastFocused = lastFocusedRef.current;
      if (lastFocused?.isConnected) {
        window.requestAnimationFrame(() => lastFocused.focus());
      }
    };
  }, [open, onClose]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      // `inert` removes the entire subtree from tab order + assistive
      // tech when closed, which `pointer-events-none` does not — keeps
      // the backdrop button, close button, links and CTA out of the
      // keyboard tab cycle whenever the drawer is hidden.
      inert={!open}
      className={cn(
        "fixed inset-0 z-[70] md:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        tabIndex={-1}
        className={cn(
          "absolute inset-0 bg-void/85 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Sheet */}
      <div
        ref={dialogRef}
        className={cn(
          "absolute inset-x-3 top-3 rounded-3xl border border-candle/25 bg-night/95 p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] transition-all duration-300",
          open ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0",
        )}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-[11px] uppercase tracking-[0.4em] text-candle/80">
            Hazem Elerefy
          </span>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-candle/30 text-candle transition-colors hover:bg-candle/10"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <ul className="mt-7 flex flex-col gap-1">
          {primaryNav.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between rounded-2xl px-4 py-4 font-display text-sm uppercase tracking-[0.32em] transition-colors",
                  isActive(link.href)
                    ? "bg-candle/10 text-candle"
                    : "text-parchment/85 hover:bg-candle/5 hover:text-candle",
                )}
              >
                <span>{link.label}</span>
                {link.whisper && (
                  <span className="font-heading text-[11px] tracking-normal text-parchment/40">
                    {link.whisper}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-candle/15 pt-6">
          <Link
            href="mailto:hazemawed53@gmail.com"
            onClick={onClose}
            className="flex items-center justify-center gap-3 rounded-full border border-candle/55 bg-candle/12 px-6 py-4 font-display text-[12px] font-semibold uppercase tracking-[0.32em] text-candle"
          >
            Send Owl
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
