import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { cn } from "@/lib/cn";

/**
 * "Recent Projects" strip on the home page. Pulls the entries flagged
 * `surfaces: ["featured", ...]` from /content/projects.ts so this list
 * stays in lockstep with the full Portfolio gallery (Slice C).
 *
 * Server component — clicking a card navigates to /portfolio (the full
 * book modal opens there). The card itself is a `<Link>` so right-click
 * → open in new tab works as expected.
 */
export function FeaturedWork() {
  const featured = projects.filter((p) => p.surfaces.includes("featured"));

  return (
    <section
      aria-labelledby="featured-title"
      className="relative border-t border-candle/10 px-6 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="font-display text-[10px] font-semibold uppercase tracking-[0.5em] text-candle/80">
            Featured Work
          </p>
          <h2
            id="featured-title"
            className="mt-4 font-display text-3xl font-bold leading-tight text-parchment md:text-5xl"
          >
            Recent{" "}
            <span className="bg-gradient-to-br from-[#F0CB7A] via-[#E6B25E] to-[#C8853A] bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="mt-4 font-heading text-base leading-relaxed text-parchment/65 md:text-lg">
            Two featured tomes from the shelf. Open the Portfolio for the
            full curriculum.
          </p>
        </header>

        <ul className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2">
          {featured.map((p) => (
            <li key={p.id}>
              <Link
                href={`/portfolio#${p.id}`}
                className="group relative block overflow-hidden rounded-3xl border border-parchment/8 bg-night/55 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-candle/35 hover:shadow-[0_30px_70px_-30px_rgba(230,178,94,0.45)]"
              >
                <div className="aspect-[16/9] overflow-hidden rounded-t-3xl bg-twilight/60">
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={960}
                    height={540}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="relative p-6 md:p-7">
                  <div className="flex flex-wrap gap-2">
                    {p.chips.map((c) => (
                      <Chip key={c.label} tone={c.tone}>
                        {c.label}
                      </Chip>
                    ))}
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-parchment transition-colors duration-300 group-hover:text-candle md:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 font-heading text-base leading-relaxed text-parchment/65">
                    {p.blurb}
                  </p>
                  <div className="mt-5 flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-candle/70 transition-colors duration-300 group-hover:text-candle">
                    Open the Tome
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-candle/40 bg-candle/8 px-6 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-candle transition-all duration-300 hover:bg-candle/15 hover:shadow-[0_0_28px_rgba(230,178,94,0.35)]"
          >
            See the Full Tome
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Chip({
  tone,
  children,
}: {
  tone:
    | "candle"
    | "ember"
    | "moon"
    | "ravenclaw"
    | "slytherin"
    | "gryffindor";
  children: React.ReactNode;
}) {
  const map = {
    candle: "border-candle/25 bg-candle/10 text-candle",
    ember: "border-ember/25 bg-ember/10 text-ember",
    moon: "border-moon/25 bg-moon/10 text-moon",
    ravenclaw: "border-[#3a5a96]/30 bg-[#3a5a96]/15 text-[#9bb6e6]",
    slytherin: "border-[#2e6b48]/30 bg-[#2e6b48]/15 text-[#7ec39a]",
    gryffindor: "border-[#9a3640]/30 bg-[#9a3640]/15 text-[#e2939c]",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-display text-[9px] font-bold uppercase tracking-[0.18em]",
        map[tone],
      )}
    >
      {children}
    </span>
  );
}
