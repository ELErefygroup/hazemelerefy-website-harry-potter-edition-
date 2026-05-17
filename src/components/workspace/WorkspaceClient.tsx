"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { repos, type Repo } from "@/content/repos";
import { cn } from "@/lib/cn";

/**
 * Workspace tab + grid. Client component because the tab toggle is
 * stateful, but the content list is statically baked — no GitHub API
 * call, no server roundtrip, no rate limits.
 *
 * Tabs: Frontend (Next.js / React) and Analytics (Power BI / Python ML).
 * The grid animates a soft cross-fade on tab change; on reduced motion
 * the cross-fade collapses to a one-frame swap.
 */
type Tab = "frontend" | "analytics";

export function WorkspaceClient() {
  const reduced = useReducedMotion();
  const [tab, setTab] = useState<Tab>("frontend");

  const filtered = repos.filter((r) => r.category === tab);

  return (
    <div>
      {/* Tab pill */}
      <div
        role="tablist"
        aria-label="Workspace categories"
        className="mx-auto inline-flex w-full max-w-md items-center gap-1 rounded-full border border-candle/20 bg-night/65 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(230,178,94,0.06)] backdrop-blur"
      >
        <TabButton active={tab === "frontend"} onClick={() => setTab("frontend")} icon="⌘">
          Frontend
        </TabButton>
        <TabButton active={tab === "analytics"} onClick={() => setTab("analytics")} icon="∮">
          Analytics
        </TabButton>
      </div>

      <div className="mt-12">
        <AnimatePresence mode="wait">
          <motion.ul
            key={tab}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
            transition={reduced ? { duration: 0 } : { duration: 0.4 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((r) => (
              <li key={r.slug}>
                <RepoCard repo={r} />
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "relative flex-1 rounded-full px-6 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.28em] transition-all duration-300",
        active
          ? "bg-gradient-to-r from-[#E6B25E] via-[#D49B45] to-[#C8853A] text-ink shadow-[0_4px_18px_rgba(230,178,94,0.4)]"
          : "text-parchment/55 hover:text-parchment/85",
      )}
    >
      <span aria-hidden="true" className="mr-2">
        {icon}
      </span>
      {children}
    </button>
  );
}

function RepoCard({ repo }: { repo: Repo }) {
  const accent = {
    ravenclaw: {
      border: "border-[#3a5a96]/30 hover:border-[#5a82b8]/55",
      glow: "bg-[#3a5a96]/10",
      hoverGlow: "group-hover:bg-[#3a5a96]/20",
      title: "group-hover:text-[#9bb6e6]",
      chip: "border-[#3a5a96]/40 bg-[#3a5a96]/15 text-[#9bb6e6]",
      arrow: "text-[#9bb6e6]/60 group-hover:text-[#9bb6e6]",
      line: "via-[#3a5a96]/30",
    },
    candle: {
      border: "border-candle/25 hover:border-candle/55",
      glow: "bg-candle/8",
      hoverGlow: "group-hover:bg-candle/15",
      title: "group-hover:text-candle",
      chip: "border-candle/30 bg-candle/12 text-candle",
      arrow: "text-candle/60 group-hover:text-candle",
      line: "via-candle/30",
    },
    moon: {
      border: "border-moon/25 hover:border-moon/55",
      glow: "bg-moon/8",
      hoverGlow: "group-hover:bg-moon/18",
      title: "group-hover:text-moon",
      chip: "border-moon/30 bg-moon/12 text-moon",
      arrow: "text-moon/60 group-hover:text-moon",
      line: "via-moon/30",
    },
    slytherin: {
      border: "border-[#2e6b48]/30 hover:border-[#5fa178]/55",
      glow: "bg-[#2e6b48]/10",
      hoverGlow: "group-hover:bg-[#2e6b48]/20",
      title: "group-hover:text-[#7ec39a]",
      chip: "border-[#2e6b48]/40 bg-[#2e6b48]/15 text-[#7ec39a]",
      arrow: "text-[#7ec39a]/60 group-hover:text-[#7ec39a]",
      line: "via-[#2e6b48]/30",
    },
    ember: {
      border: "border-ember/30 hover:border-ember/55",
      glow: "bg-ember/10",
      hoverGlow: "group-hover:bg-ember/20",
      title: "group-hover:text-ember",
      chip: "border-ember/40 bg-ember/15 text-ember",
      arrow: "text-ember/60 group-hover:text-ember",
      line: "via-ember/30",
    },
    gryffindor: {
      border: "border-[#9a3640]/30 hover:border-[#cb6975]/55",
      glow: "bg-[#9a3640]/10",
      hoverGlow: "group-hover:bg-[#9a3640]/20",
      title: "group-hover:text-[#e2939c]",
      chip: "border-[#9a3640]/40 bg-[#9a3640]/15 text-[#e2939c]",
      arrow: "text-[#e2939c]/60 group-hover:text-[#e2939c]",
      line: "via-[#9a3640]/30",
    },
  }[repo.accent];

  return (
    <a
      href={repo.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative block overflow-hidden rounded-3xl border bg-night/55 p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-1",
        accent.border,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full blur-[60px] transition-all duration-700",
          accent.glow,
          accent.hoverGlow,
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          accent.line,
        )}
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-parchment/12 bg-night/70 text-parchment/60 transition-colors duration-300 group-hover:text-parchment">
            <GitHubGlyph />
          </div>
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-3 py-1.5 font-display text-[9px] font-bold uppercase tracking-[0.2em]",
              accent.chip,
            )}
          >
            {repo.stack}
          </span>
        </div>

        <h3 className={cn("mt-5 font-display text-xl font-bold text-parchment transition-colors duration-300", accent.title)}>
          {repo.title}
        </h3>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-parchment/30">
          {repo.slug}
        </p>
        <p className="mt-4 font-heading text-sm leading-relaxed text-parchment/70">
          {repo.description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] text-parchment/45">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-candle/70 shadow-[0_0_6px_rgba(230,178,94,0.5)]" />
            {repo.language ?? "—"}
          </span>
          <span className={cn("inline-flex items-center gap-1.5 font-display text-[10px] font-bold uppercase tracking-[0.28em] transition-colors", accent.arrow)}>
            View Repo
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}

function GitHubGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  );
}
