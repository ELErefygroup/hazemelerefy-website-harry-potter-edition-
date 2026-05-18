"use client";

import Link from "next/link";
import { Logomark } from "./Logomark";
import { footerLinks } from "@/content/nav";
import { socials } from "@/content/socials";
import { platforms } from "@/content/platforms";
import { site } from "@/lib/site";

/**
 * Site-wide footer. Mirrors the legacy footer's information density
 * (brand column / nav column / socials column / freelance platforms)
 * while staying server-rendered — every link is a plain anchor.
 *
 * The platforms grid is a smaller mirror of /services so visitors who
 * land on the home page still see where to hire me. The order matches
 * `content/platforms.ts`.
 */
export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-candle/15 bg-[#050810]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-candle/40 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6 pb-10 pt-14 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group inline-flex items-center gap-3">
              <Logomark variant="footer" />
              <span className="font-display text-[12px] uppercase tracking-[0.4em] text-parchment/65">
                Hazem Elerefy
              </span>
            </Link>
            <p className="mt-5 max-w-md font-heading text-base leading-relaxed text-parchment/55">
              {site.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-candle/25 bg-candle/5 font-display text-[11px] uppercase tracking-[0.3em] text-candle/85 transition-all duration-300 hover:border-candle/60 hover:bg-candle/15 hover:text-candle"
                >
                  {s.glyph}
                </a>
              ))}
            </div>
          </div>

          {/* Nav column */}
          <div>
            <h3 className="font-display text-[10px] uppercase tracking-[0.4em] text-candle/70">
              Wander
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="font-heading text-sm text-parchment/55 transition-colors hover:text-candle"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hire column */}
          <div>
            <h3 className="font-display text-[10px] uppercase tracking-[0.4em] text-candle/70">
              Hire
            </h3>
            <ul className="mt-4 space-y-2">
              {platforms.map((p) => (
                <li key={p.id}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-sm text-parchment/55 transition-colors hover:text-candle"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="font-heading text-sm text-parchment/55 transition-colors hover:text-candle"
                >
                  Send an Owl
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="my-10 h-px w-full bg-gradient-to-r from-transparent via-candle/15 to-transparent"
        />

        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="font-heading text-xs text-parchment/35">
            © {new Date().getFullYear()} Hazem Elerefy. Brewed by candlelight.
          </p>
          <p className="font-display text-[10px] uppercase tracking-[0.4em] text-parchment/30">
            Hogwarts-by-Night Edition
          </p>
        </div>
      </div>
    </footer>
  );
}
