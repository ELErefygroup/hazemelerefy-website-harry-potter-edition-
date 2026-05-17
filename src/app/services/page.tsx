import type { Metadata } from "next";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { PlatformsGrid } from "@/components/services/PlatformsGrid";
import { OwlForm } from "@/components/services/OwlForm";
import { platforms } from "@/content/platforms";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Available for hire — analytics dashboards, ML work, and front-end builds. Hire across Upwork, Freelancer, PeoplePerHour, Mostaql, and Khamsat.",
};

export default function ServicesPage() {
  const trackCount = new Set(services.map((service) => service.category)).size;

  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="services-title"
        className="relative pt-32 pb-12 md:pt-40 md:pb-16"
      >
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <div className="relative overflow-hidden rounded-[32px] border border-candle/15 bg-gradient-to-br from-night/80 via-night/72 to-[#0d121d]/90 px-6 py-10 text-center shadow-[0_30px_80px_-35px_rgba(0,0,0,0.95)] backdrop-blur-md md:px-10 md:py-14">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-50 mix-blend-soft-light bg-parchment-noise"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-candle/45 to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-candle/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-moon/10 blur-3xl"
            />

            <div className="relative">
              <p className="font-display text-[10px] font-semibold uppercase tracking-[0.5em] text-candle/80">
                Available for Hire
              </p>
              <h1
                id="services-title"
                className="mt-4 font-display text-4xl font-black leading-tight text-parchment md:text-6xl lg:text-7xl"
              >
                Professional{" "}
                <span className="bg-gradient-to-br from-[#F0CB7A] via-[#E6B25E] to-[#C8853A] bg-clip-text text-transparent">
                  Services
                </span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl font-heading text-base leading-relaxed text-parchment/65 md:text-lg">
                From pixel-perfect dashboards to full-stack web experiences —
                let&rsquo;s turn your vision into a premium digital reality.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <HeroStat
                  value={String(trackCount)}
                  label="Service Tracks"
                  detail="Analytics + Frontend"
                />
                <HeroStat
                  value={String(platforms.length)}
                  label="Hiring Platforms"
                  detail="Global + Arabic-market profiles"
                />
                <HeroStat
                  value="24h"
                  label="Reply Window"
                  detail="Most briefs answered within a day"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid (Analytics / Frontend tabs) */}
      <section
        aria-labelledby="deliver-title"
        className="px-6 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-7xl text-center">
          <h2
            id="deliver-title"
            className="font-display text-3xl font-bold text-parchment md:text-5xl"
          >
            What I{" "}
            <span className="bg-gradient-to-br from-[#F0CB7A] via-[#E6B25E] to-[#C8853A] bg-clip-text text-transparent">
              Deliver
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-heading text-base leading-relaxed text-parchment/62 md:text-lg">
            Two focused tracks, each shaped around concrete deliverables
            rather than vague service promises.
          </p>
          <div className="mt-12">
            <ServicesGrid />
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section
        aria-labelledby="platforms-title"
        className="border-t border-candle/10 px-6 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <header className="mx-auto max-w-2xl text-center">
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.5em] text-candle/80">
              Hire Across Platforms
            </p>
            <h2
              id="platforms-title"
              className="mt-3 font-display text-3xl font-bold text-parchment md:text-4xl"
            >
              Where to{" "}
              <span className="bg-gradient-to-br from-[#F0CB7A] via-[#E6B25E] to-[#C8853A] bg-clip-text text-transparent">
                find me
              </span>
            </h2>
            <p className="mt-4 font-heading text-base leading-relaxed text-parchment/65 md:text-lg">
              Five rookeries — pick the one that suits your engagement.
            </p>
          </header>
          <div className="mt-10">
            <PlatformsGrid />
          </div>
        </div>
      </section>

      {/* Request form */}
      <section
        aria-labelledby="brief-title"
        className="border-t border-candle/10 px-6 py-20 md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.5em] text-candle/80">
              Send a Brief
            </p>
            <h2
              id="brief-title"
              className="mt-3 font-display text-3xl font-bold text-parchment md:text-4xl"
            >
              Send the{" "}
              <span className="bg-gradient-to-br from-[#F0CB7A] via-[#E6B25E] to-[#C8853A] bg-clip-text text-transparent">
                Owl
              </span>
            </h2>
            <p className="mt-4 font-heading text-base leading-relaxed text-parchment/65 md:text-lg">
              Sketch the project, hit send. I read every letter — usually
              reply within 24 hours.
            </p>
          </header>

          <div className="mt-10 rounded-3xl border border-candle/15 bg-night/55 p-6 backdrop-blur-md md:p-10">
            <OwlForm />
          </div>
        </div>
      </section>
    </>
  );
}

function HeroStat({
  value,
  label,
  detail,
}: {
  value: string;
  label: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-parchment/10 bg-night/45 px-4 py-4 backdrop-blur-sm">
      <div className="font-display text-2xl font-black text-candle">{value}</div>
      <div className="mt-1 font-display text-[10px] font-semibold uppercase tracking-[0.32em] text-parchment/72">
        {label}
      </div>
      <p className="mt-2 font-heading text-sm leading-relaxed text-parchment/55">
        {detail}
      </p>
    </div>
  );
}
