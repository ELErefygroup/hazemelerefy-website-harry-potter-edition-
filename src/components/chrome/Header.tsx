"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logomark } from "./Logomark";
import { MobileNav } from "./MobileNav";
import { primaryNav } from "@/content/nav";
import { cn } from "@/lib/cn";

/**
 * Sticky top navigation, present on every route. Behaves like the legacy
 * Alpine nav — transparent over the hero, then condenses to a blurred
 * parchment-tone bar after a short scroll. Active route is highlighted
 * with a candle-gold gradient via `usePathname()`.
 *
 * Marked `'use client'` so the active-state + scroll-listener stay on the
 * client without forcing children to be client components.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change. Use the in-render adjust pattern so we
  // don't pay for a cascading effect render — see the React docs page on
  // "You Might Not Need an Effect".
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-candle/10 bg-night/80 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-night/60"
          : "py-5 md:py-6",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          aria-label="Home"
          className="group inline-flex items-center gap-3"
        >
          <Logomark variant="header" />
          <span className="hidden font-display text-[11px] font-semibold uppercase tracking-[0.36em] text-parchment/70 sm:inline-block">
            Hazem&nbsp;Elerefy
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
        >
          {primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              title={link.whisper}
              className={cn(
                "relative rounded-full px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.32em] transition-colors duration-300",
                isActive(link.href)
                  ? "bg-gradient-to-r from-[#F0CB7A] via-[#E6B25E] to-[#C8853A] bg-clip-text text-transparent"
                  : "text-parchment/70 hover:text-candle",
              )}
            >
              {link.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-candle to-transparent transition-transform duration-300",
                  isActive(link.href) && "scale-x-100",
                )}
              />
            </Link>
          ))}

          <Link
            href="mailto:hazemawed53@gmail.com"
            className="ml-3 inline-flex items-center gap-2 rounded-full border border-candle/55 bg-candle/12 px-5 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-candle backdrop-blur transition-all duration-300 hover:bg-candle/25 hover:shadow-[0_0_28px_rgba(230,178,94,0.45)]"
          >
            Send Owl
            <span aria-hidden="true">→</span>
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          aria-controls="mobile-nav"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-candle/30 text-candle transition-colors hover:bg-candle/10"
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
            <path d="M1 1h16M1 7h16M1 13h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
