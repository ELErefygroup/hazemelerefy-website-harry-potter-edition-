/**
 * Skills news-ticker content. Mirrors the legacy "Tech Arsenal" marquee
 * (HTML5 → Machine Learning) but tagged with HP-house tones so the new
 * SkillsTicker can colour each chip without leaning on the old vendor
 * brand colours from the legacy site.
 *
 * Order is intentional — alternates between "front-of-house" (markup,
 * design, frameworks) and "back-of-house" (data, ML) so the bar reads
 * like a balanced sentence as it scrolls.
 */
export type Skill = {
  label: string;
  /** Single-letter glyph rendered in a candle-rim badge. Keeps the bar
   *  brand-neutral and consistent with the HP voice. */
  glyph: string;
  /** Hover halo tone — maps to a CSS variable in globals.css. */
  tone:
    | "candle"
    | "ember"
    | "moon"
    | "ravenclaw"
    | "slytherin"
    | "gryffindor"
    | "hufflepuff";
  /** Optional whisper, shown as `title` for hover and a11y. */
  whisper?: string;
};

export const skills: Skill[] = [
  { label: "HTML5", glyph: "H", tone: "ember", whisper: "Foundation runes" },
  { label: "CSS3", glyph: "C", tone: "candle", whisper: "Visible spellwork" },
  { label: "JavaScript", glyph: "J", tone: "hufflepuff", whisper: "Animating ink" },
  { label: "TypeScript", glyph: "T", tone: "moon", whisper: "Typed incantations" },
  { label: "React", glyph: "R", tone: "candle", whisper: "Component charms" },
  { label: "Next.js", glyph: "N", tone: "moon", whisper: "App Router lore" },
  { label: "Tailwind CSS", glyph: "T", tone: "candle", whisper: "Atomic styling" },
  { label: "Framer Motion", glyph: "F", tone: "ember", whisper: "Component motion" },
  { label: "Python", glyph: "P", tone: "hufflepuff", whisper: "Notebook potions" },
  { label: "SQL", glyph: "S", tone: "candle", whisper: "Query craft" },
  { label: "Power BI", glyph: "B", tone: "ravenclaw", whisper: "Decision-ready dashboards" },
  { label: "Excel · DAX", glyph: "X", tone: "slytherin", whisper: "Modelled cells" },
  { label: "Orange ML", glyph: "O", tone: "ember", whisper: "Visual machine learning" },
  { label: "Scikit-Learn", glyph: "S", tone: "ravenclaw", whisper: "Predictive prophecy" },
  { label: "C++", glyph: "C", tone: "moon", whisper: "Systems craft" },
  { label: "Machine Learning", glyph: "M", tone: "slytherin", whisper: "The deeper arts" },
];
