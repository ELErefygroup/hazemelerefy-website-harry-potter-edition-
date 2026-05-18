import type { Metadata } from "next";
import { WorkspaceClient } from "@/components/workspace/WorkspaceClient";
import { ClosingCharm } from "@/components/home/ClosingCharm";

export const metadata: Metadata = {
  title: "Workspace",
  description:
    "Live GitHub workspace of Hazem Elerefy — frontend builds and analytics work, organised by discipline with repository links.",
};

/**
 * Workspace route. A page-style hero, a Frontend / Analytics tab toggle,
 * a grid of GitHub repository cards (real outbound links to each repo),
 * and the global closing charm CTA.
 */
export default function WorkspacePage() {
  return (
    <>
      {/* Hero Header */}
      <section
        aria-labelledby="workspace-title"
        className="relative flex min-h-screen w-full items-center pt-32 pb-20 md:pt-40 md:pb-24"
      >
        {/* Decorative background glows */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[350px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-candle/10 via-moon/5 to-ember/10 blur-[120px] opacity-70" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <header className="mx-auto max-w-3xl text-center">
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.5em] text-candle/80">
              The Lab Bench · GitHub
            </p>
            <h1
              id="workspace-title"
              className="mt-4 font-display text-4xl font-black leading-tight text-parchment md:text-6xl lg:text-7xl"
            >
              My{" "}
              <span className="bg-gradient-to-br from-[#F0CB7A] via-[#E6B25E] to-[#C8853A] bg-clip-text text-transparent">
                Workspace
              </span>
            </h1>
            <p className="mt-5 max-w-2xl mx-auto font-heading text-base leading-relaxed text-parchment/65 md:text-lg">
              Real GitHub projects — front-end builds and analytics work,
               organised by discipline with repo-focused summaries and live
               repository links.
            </p>
          </header>
        </div>
      </section>

      {/* Lab Grid */}
      <section className="px-6 pb-20 md:px-8 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <WorkspaceClient />
        </div>
      </section>

      <ClosingCharm />
    </>
  );
}
