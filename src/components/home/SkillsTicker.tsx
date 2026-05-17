import { skills, type Skill } from "@/content/skills";
import { cn } from "@/lib/cn";

/**
 * Infinite news-ticker style skills bar — a re-skin of the legacy
 * `animate-marquee-left` row from the home view. Each chip is a small
 * candle-rim badge with the framework's first letter as a glyph and the
 * label in Cinzel uppercase. The whole row pauses on hover or on
 * `prefers-reduced-motion` (handled in globals.css).
 *
 * The skills array is rendered TWICE back-to-back so the seamless loop
 * (translate -50% over the duration) lands at a perfect repeat point —
 * no jump at the wrap. `aria-hidden` on the duplicate keeps screen
 * readers from announcing each skill twice.
 */
export function SkillsTicker() {
  return (
    <section
      aria-labelledby="skills-title"
      className="relative overflow-hidden border-t border-candle/10 py-20 md:py-24"
    >
      <header className="mx-auto mb-12 max-w-2xl px-6 text-center">
        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.5em] text-candle/80">
          Tech Arsenal
        </p>
        <h2
          id="skills-title"
          className="mt-4 font-display text-3xl font-bold leading-tight text-parchment md:text-5xl"
        >
          Tools I{" "}
          <span className="bg-gradient-to-br from-[#F0CB7A] via-[#E6B25E] to-[#C8853A] bg-clip-text text-transparent">
            Master
          </span>
        </h2>
      </header>

      <div
        className="group relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <ul className="animate-marquee flex w-max gap-4 px-4">
          {skills.map((s, i) => (
            <SkillChip key={`a-${s.label}-${i}`} skill={s} />
          ))}
          {skills.map((s, i) => (
            <SkillChip key={`b-${s.label}-${i}`} skill={s} ariaHidden />
          ))}
        </ul>
      </div>
    </section>
  );
}

function SkillChip({ skill, ariaHidden }: { skill: Skill; ariaHidden?: boolean }) {
  const tone = {
    candle: "border-candle/30 hover:border-candle/60 hover:shadow-[0_0_24px_rgba(230,178,94,0.25)]",
    ember: "border-ember/30 hover:border-ember/60 hover:shadow-[0_0_24px_rgba(200,133,58,0.25)]",
    moon: "border-moon/30 hover:border-moon/60 hover:shadow-[0_0_24px_rgba(184,197,220,0.25)]",
    ravenclaw: "border-[#3a5a96]/40 hover:border-[#5a82b8]/70 hover:shadow-[0_0_24px_rgba(58,90,150,0.3)]",
    slytherin: "border-[#2e6b48]/40 hover:border-[#5fa178]/70 hover:shadow-[0_0_24px_rgba(46,107,72,0.3)]",
    gryffindor: "border-[#9a3640]/40 hover:border-[#cb6975]/70 hover:shadow-[0_0_24px_rgba(154,54,64,0.3)]",
    hufflepuff: "border-[#c9a44a]/40 hover:border-[#e6c374]/70 hover:shadow-[0_0_24px_rgba(201,164,74,0.3)]",
  }[skill.tone];

  const glyphTone = {
    candle: "text-candle",
    ember: "text-ember",
    moon: "text-moon",
    ravenclaw: "text-[#9bb6e6]",
    slytherin: "text-[#7ec39a]",
    gryffindor: "text-[#e2939c]",
    hufflepuff: "text-[#e6c374]",
  }[skill.tone];

  return (
    <li
      aria-hidden={ariaHidden}
      className={cn(
        "inline-flex shrink-0 items-center gap-3 rounded-2xl border bg-night/60 px-5 py-3 backdrop-blur-md transition-all duration-300",
        tone,
      )}
      title={skill.whisper}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl border bg-night/40 font-display text-base font-black",
          tone,
          glyphTone,
        )}
      >
        {skill.glyph}
      </span>
      <span className="font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-parchment/90">
        {skill.label}
      </span>
    </li>
  );
}
