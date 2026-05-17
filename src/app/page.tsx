import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { ExpertiseTrio } from "@/components/home/ExpertiseTrio";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { SkillsTicker } from "@/components/home/SkillsTicker";
import { ClosingCharm } from "@/components/home/ClosingCharm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: site.fullName,
  description: site.description,
};

/**
 * Home page — the marketing surface for `Hazem Elerefy`. Mirrors the
 * legacy Home view IA but expressed as composable Next.js sections so
 * each block can be edited / reordered independently.
 *
 * Sections, top → bottom: hero, expertise trio, featured work strip,
 * skills news-ticker, and the global "Send an Owl" closing CTA.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ExpertiseTrio />
      <FeaturedWork />
      <SkillsTicker />
      <ClosingCharm />
    </>
  );
}
