import Link from "next/link";
import { OwlIcon } from "@/components/icons/HpIcons";
import { ScrollDownload } from "@/components/magic/ScrollDownload";
import { site } from "@/lib/site";

/**
 * "Send an Owl" closing CTA — the legacy global CTA, retold in HP voice
 * and given its own component so any page (Home, Portfolio) can mount it
 * verbatim. Workspace + Services have their own contact paths and skip
 * this section.
 *
 * Server component, no interactivity beyond the hover halo.
 */
export function ClosingCharm() {
  return (
    <section
      aria-labelledby="closing-title"
      className="relative isolate border-t border-candle/10 px-6 py-24 md:px-8 md:py-32"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-1/2 h-[320px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-candle/15 via-moon/10 to-ember/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-candle/25 bg-candle/8 px-4 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.36em] text-candle/90">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
          Available for new projects
        </span>

        <h2
          id="closing-title"
          className="mt-7 font-display text-4xl font-black leading-tight text-parchment md:text-6xl"
        >
          Let&rsquo;s build something{" "}
          <span className="bg-gradient-to-br from-[#F0CB7A] via-[#E6B25E] to-[#C8853A] bg-clip-text text-transparent">
            extraordinary
          </span>
          {" "}together.
        </h2>

        <p className="mt-6 font-heading text-lg leading-relaxed text-parchment/70 md:text-xl">
          A dashboard, a data product, or an ambitious front-end build —
          drop the parchment in the post and I&rsquo;ll write back.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#E6B25E] via-[#D49B45] to-[#C8853A] px-8 py-3.5 font-display text-[12px] font-bold uppercase tracking-[0.32em] text-ink shadow-[0_0_30px_rgba(230,178,94,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(230,178,94,0.6)]"
          >
            <OwlIcon width={18} height={18} />
            Send an Owl
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <ScrollDownload variant="outline" />
        </div>
      </div>
    </section>
  );
}
