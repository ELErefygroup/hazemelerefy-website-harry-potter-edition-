import type { Metadata } from "next";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { ExpertiseTrio } from "@/components/home/ExpertiseTrio";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { ClosingCharm } from "@/components/home/ClosingCharm";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Hogwarts-by-Night portfolio of Hazem Elerefy — data analytics, machine learning, and front-end engineering.",
};

/**
 * Portfolio route. Combined hero (banner + thin profile frame + name +
 * tagline + intro + stat chips + CTAs), then the gallery of project
 * cards that open into the magical book modal, then the global closing
 * charm CTA.
 */
export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <ExpertiseTrio />
      <PortfolioGallery />
      <ClosingCharm />
    </>
  );
}
