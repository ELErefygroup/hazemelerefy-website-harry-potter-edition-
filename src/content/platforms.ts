/**
 * Freelance platforms shown in the footer + on /services. Order matters —
 * Upwork first since that's the user's primary platform.
 */

export type Platform = {
  id: string;
  name: string;
  href: string;
  blurb: string;
  /** Hex used by the platform's brand for hover tint. */
  brand: string;
  /** Path under /public, optional — falls back to a generic glyph. */
  logo?: string;
};

export const platforms: Platform[] = [
  {
    id: "upwork",
    name: "Upwork",
    href: "https://www.upwork.com/freelancers/~01095d37046356f7d5?mp_source=share",
    blurb: "Main platform for frontend builds, dashboards, and data work.",
    brand: "#14A800",
    logo: "/images/platforms/upwork.svg",
  },
  {
    id: "freelancer",
    name: "Freelancer.com",
    href: "https://www.freelancer.com/u/hazemawed53?frm=hazemawed53&sb=t",
    blurb: "Open to global engagements across frontend and analytics.",
    brand: "#00AEEF",
    logo: "/images/platforms/freelancer.svg",
  },
  {
    id: "mostaql",
    name: "Mostaql",
    href: "https://mostaql.com/u/zoo_ma",
    blurb: "Arabic-region freelance work and consulting.",
    brand: "#FF6A00",
    logo: "/images/platforms/mostaql.png",
  },
  {
    id: "khamsat",
    name: "Khamsat",
    href: "https://khamsat.com/user/hazem_awed",
    blurb: "Micro-engagements and quick deliverables.",
    brand: "#1B6FE8",
    logo: "/images/platforms/khamsat.svg",
  },
  {
    id: "nafezly",
    name: "Nafezly",
    href: "https://nafezly.com/u/hazemelerefy",
    blurb: "Regional freelance work for frontend and data projects.",
    brand: "#199B8A",
    logo: "/images/platforms/nafezly.png",
  },
];
