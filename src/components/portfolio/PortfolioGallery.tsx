"use client";

import Image from "next/image";
import { useState, useEffect, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent } from "react";
import { MagicalBook } from "@/components/portfolio/MagicalBook";
import { SpellbookIcon } from "@/components/icons/HpIcons";
import {
  stage2PortfolioProjects,
  type Stage2PortfolioProject,
} from "@/content/portfolioStage2";
import { cn } from "@/lib/cn";
import { submitRating, fetchAllRatings } from "@/app/actions/rating";

/** Generate or retrieve a persistent visitor ID for rating uniqueness */
function getVisitorId(): string {
  if (typeof window === "undefined") return "ssr";
  let id = localStorage.getItem("hp_visitor_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("hp_visitor_id", id);
  }
  return id;
}

export function PortfolioGallery() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [ratingsMap, setRatingsMap] = useState<Record<string, { totalVotes: number; average: number }>>({});

  // Fetch live ratings from the database on mount
  useEffect(() => {
    fetchAllRatings().then((data) => {
      if (data && Object.keys(data).length > 0) {
        setRatingsMap(data);
      }
    });
  }, []);

  function handleRatingUpdate(projectKey: string, totalVotes: number, average: number) {
    setRatingsMap((prev) => ({
      ...prev,
      [projectKey]: { totalVotes, average },
    }));
  }

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="relative overflow-visible border-t border-white/[0.05] px-6 py-24 md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <h2 id="gallery-title" className="sr-only">
          Portfolio projects
        </h2>

        <div className="relative z-10 overflow-visible w-full">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stage2PortfolioProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                liveRating={ratingsMap[project.ratingKey]}
                onOpen={() => setActiveId(project.id)}
                onRatingUpdate={handleRatingUpdate}
              />
            ))}
          </div>
        </div>
      </div>

      <MagicalBook
        key={activeId ?? "closed"}
        projects={stage2PortfolioProjects}
        activeId={activeId}
        onClose={() => setActiveId(null)}
      />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  liveRating,
  onOpen,
  onRatingUpdate,
}: {
  project: Stage2PortfolioProject;
  index: number;
  liveRating?: { totalVotes: number; average: number };
  onOpen: () => void;
  onRatingUpdate: (projectKey: string, totalVotes: number, average: number) => void;
}) {
  const [score, setScore] = useState(0);
  const [hoverScore, setHoverScore] = useState(0);

  // Use live data from database if available, otherwise fall back to static default
  const totalVotes = liveRating?.totalVotes ?? project.rating.totalVotes;
  const average = liveRating?.average ?? project.rating.average;

  const palette =
    project.color === "gold"
      ? {
          hover: "hover:shadow-[0_0_50px_rgba(212,175,55,0.15)] hover:outline-[#d4af37]/30",
          tint: "bg-gradient-to-tr from-[#d4af37]/60 via-transparent to-transparent",
          title: "group-hover:text-[#d4af37] group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]",
          glow: "bg-[#d4af37]",
        }
      : project.color === "silver"
        ? {
            hover: "hover:shadow-[0_0_50px_rgba(226,232,240,0.15)] hover:outline-slate-300/30",
            tint: "bg-gradient-to-tr from-slate-300/60 via-transparent to-transparent",
            title: "group-hover:text-slate-300 group-hover:drop-shadow-[0_0_15px_rgba(226,232,240,0.3)]",
            glow: "bg-slate-300",
          }
        : project.color === "sapphire"
          ? {
              hover: "hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] hover:outline-indigo-500/30",
              tint: "bg-gradient-to-tr from-indigo-900/60 via-transparent to-transparent",
              title: "group-hover:text-indigo-400 group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]",
              glow: "bg-indigo-500",
            }
          : project.color === "ruby"
            ? {
                hover: "hover:shadow-[0_0_50px_rgba(244,63,94,0.15)] hover:outline-rose-500/30",
                tint: "bg-gradient-to-tr from-rose-900/60 via-transparent to-transparent",
                title: "group-hover:text-rose-400 group-hover:drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]",
                glow: "bg-rose-500",
              }
            : project.color === "obsidian"
              ? {
                  hover: "hover:shadow-[0_0_50px_rgba(31,41,55,0.15)] hover:outline-slate-700/30",
                  tint: "bg-gradient-to-tr from-slate-900/60 via-transparent to-transparent",
                  title: "group-hover:text-slate-400 group-hover:drop-shadow-[0_0_15px_rgba(156,163,175,0.3)]",
                  glow: "bg-slate-700",
                }
              : project.color === "emerald"
                ? {
                    hover: "hover:shadow-[0_0_50px_rgba(16,185,129,0.15)] hover:outline-emerald-500/30",
                    tint: "bg-gradient-to-tr from-emerald-900/60 via-transparent to-transparent",
                    title: "group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]",
                    glow: "bg-emerald-500",
                  }
                : {
                    hover: "hover:shadow-[0_0_50px_rgba(139,92,246,0.15)] hover:outline-purple-500/30",
                    tint: "bg-gradient-to-tr from-purple-900/60 via-transparent to-transparent",
                    title: "group-hover:text-purple-400 group-hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]",
                    glow: "bg-purple-500",
                  };

  function handleMouseMove(event: ReactMouseEvent<HTMLElement>) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (event.clientX - cx) / (rect.width / 2);
    const dy = (event.clientY - cy) / (rect.height / 2);
    const rx = -dy * 13;
    const ry = dx * 13;

    card.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    card.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
    card.style.setProperty("--mx", `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`);
    card.style.setProperty("--my", `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`);
    card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`;
  }

  function handleMouseLeave(event: ReactMouseEvent<HTMLElement>) {
    const card = event.currentTarget;
    card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
    setHoverScore(score);
  }

  async function handleRate(nextScore: number) {
    setScore(nextScore);
    setHoverScore(nextScore);

    const visitorId = getVisitorId();
    const result = await submitRating(project.ratingKey, nextScore, visitorId);
    if (result.success && result.totalVotes !== undefined && result.average !== undefined) {
      onRatingUpdate(project.ratingKey, result.totalVotes, result.average);
    }
  }

  function handleCardKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen();
    }
  }

  const visibleScore = hoverScore || score;

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`Open story for ${project.title}`}
      className={cn(
        "group surface-project-card card-3d motion-project-card relative h-[450px] cursor-pointer overflow-hidden rounded-[2rem] bg-[#0a0a0a] outline outline-1 outline-white/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)]",
        palette.hover,
      )}
      onClick={onOpen}
      onKeyDown={handleCardKeyDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {project.id === "jobpulse" ? (
        <div className="absolute right-5 top-5 z-20 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105">
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-white shadow-2xl backdrop-blur-md">
            Flagship
          </span>
        </div>
      ) : null}

      <div className="absolute inset-0 h-[60%]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={index < 3}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent" />
      <div className={cn("absolute inset-0 z-0 opacity-30 mix-blend-screen transition-opacity duration-700 group-hover:opacity-60", palette.tint)} />

      <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
        <div className="absolute left-5 top-5 flex flex-wrap gap-2 transition-all duration-700 group-hover:-translate-y-4 group-hover:opacity-0 group-hover:blur-sm">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-bold text-white/90 backdrop-blur-md sm:text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="translate-y-6 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-20">
          <h3 className={cn("mb-3 text-3xl font-black tracking-tight text-white", palette.title)}>
            {project.title}
          </h3>

          <div className="pointer-events-auto mb-6 flex items-center gap-2">
            <span className="text-sm font-bold text-white">{average.toFixed(1)}</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, index) => {
                const star = index + 1;
                const active = visibleScore >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    aria-label={`Rate ${project.title} ${star} star${star > 1 ? "s" : ""}`}
                    className={cn(
                      "relative z-20 text-[10px] transition-transform hover:scale-125",
                      active ? "text-amber-400" : "text-white/20",
                    )}
                    onMouseEnter={(event) => {
                      event.stopPropagation();
                      setHoverScore(star);
                    }}
                    onMouseLeave={(event) => {
                      event.stopPropagation();
                      setHoverScore(score);
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleRate(star);
                    }}
                  >
                    ★
                  </button>
                );
              })}
            </div>
            <span className="ml-1 text-xs text-white/40">({totalVotes})</span>
          </div>
        </div>

        <div className="absolute bottom-6 left-8 right-8 translate-y-8 opacity-0 blur-sm transition-all delay-75 duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onOpen();
            }}
            className="group/btn relative flex w-full items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-500 hover:border-white/30"
          >
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-0 translate-y-full opacity-20 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/btn:translate-y-0",
                palette.glow,
              )}
            />
            <span className="relative z-10 flex items-center gap-3 text-sm font-bold tracking-wide text-white">
              <SpellbookIcon width={16} height={16} className="text-white/50 transition-colors group-hover/btn:text-white" />
              Read the story
            </span>
            <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-[10px] bg-white/10 transition-transform duration-500 group-hover/btn:scale-110">
              <span aria-hidden="true" className="text-xs text-white">
                →
              </span>
            </div>
          </button>
        </div>
      </div>
    </article>
  );
}
