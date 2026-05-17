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
      <section
        aria-labelledby="workspace-title"
        className="relative pt-32 pb-20 md:pt-40 md:pb-24"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <header className="mx-auto max-w-3xl text-center">
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.5em] text-candle/80">
              The Lab Bench · GitHub
            </p>
            <h1
              id="workspace-title"
              className="mt-4 font-display text-4xl font-black leading-tight text-parchment md:text-6xl"
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

          <div className="mt-14 text-center">
            <WorkspaceClient />
          </div>
        </div>
      </section>

      <ClosingCharm />
    </>
  );
}
