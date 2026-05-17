/**
 * Hogwarts-by-Night design tokens.
 *
 * Single source of truth for colors, type, spacing, radii, shadows and motion.
 * Values are mirrored as CSS variables in `app/globals.css` (`@theme inline`)
 * so Tailwind v4 utility classes resolve to the same values these constants
 * expose to GSAP / Framer Motion / canvas code.
 *
 * Theme inspiration: the night-time Hogwarts banner the user attached —
 * moonlit indigo sky, candlelight gold, parchment, distant village embers
 * and the burgundy of the Hogwarts Express.
 */

export const colors = {
  // Core night palette
  void: "#05070D", // deepest sky
  night: "#0A0F1C", // primary background
  twilight: "#13192A", // card / surface base
  stone: "#1F2532", // castle stone
  fog: "#2A3146", // elevated surface

  // Magic accents
  candle: "#E6B25E", // primary gold (banner candles & windows)
  ember: "#C8853A", // warm secondary
  moon: "#B8C5DC", // moonlit silver
  parchment: "#E8DBB8", // aged paper text
  parchmentDeep: "#C9B989", // parchment shadow / divider
  ink: "#0B0A07", // ink on parchment

  // House accents (used sparingly)
  gryffindor: "#7A2128", // train red
  slytherin: "#1B5E3A",
  ravenclaw: "#1F3A6B",
  hufflepuff: "#D4AF37",

  // Glow / state
  glowCandle: "rgba(230, 178, 94, 0.45)",
  glowMoon: "rgba(184, 197, 220, 0.30)",
  glowEmber: "rgba(200, 133, 58, 0.40)",
} as const;

export const typography = {
  display: '"Cinzel", "Times New Roman", serif',
  heading: '"Cormorant Garamond", Georgia, serif',
  body: '"Plus Jakarta Sans", system-ui, sans-serif',
  mono: '"Space Grotesk", ui-monospace, monospace',
  // 1.25 modular scale, rounded
  scale: {
    xs: "0.75rem", // 12
    sm: "0.875rem", // 14
    base: "1rem", // 16
    lg: "1.125rem", // 18
    xl: "1.25rem", // 20
    "2xl": "1.5rem", // 24
    "3xl": "2rem", // 32
    "4xl": "2.5rem", // 40
    "5xl": "3.5rem", // 56
    "6xl": "4.5rem", // 72
    "7xl": "6rem", // 96
  },
} as const;

export const radius = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1.25rem",
  xl: "1.75rem",
  "2xl": "2.5rem",
  pill: "9999px",
} as const;

export const shadow = {
  candleSm: "0 0 18px rgba(230, 178, 94, 0.25)",
  candleMd:
    "0 0 28px rgba(230, 178, 94, 0.30), 0 0 56px rgba(230, 178, 94, 0.12)",
  candleLg:
    "0 0 40px rgba(230, 178, 94, 0.45), 0 0 90px rgba(230, 178, 94, 0.18)",
  moonSm: "0 0 24px rgba(184, 197, 220, 0.18)",
  moonMd: "0 0 40px rgba(184, 197, 220, 0.22)",
  surfaceLg:
    "0 28px 60px -22px rgba(0, 0, 0, 0.85), 0 12px 28px -16px rgba(0, 0, 0, 0.7)",
  inset: "inset 0 1px 0 rgba(230, 178, 94, 0.12), inset 0 0 0 1px rgba(230, 178, 94, 0.06)",
} as const;

export const motion = {
  duration: {
    instant: 0.08,
    fast: 0.18,
    quick: 0.26,
    base: 0.36,
    slow: 0.55,
    cinematic: 0.9,
    scene: 1.6,
  },
  easing: {
    standard: [0.4, 0, 0.2, 1] as [number, number, number, number],
    emphasized: [0.2, 0, 0, 1] as [number, number, number, number],
    spring: [0.175, 0.885, 0.32, 1.275] as [number, number, number, number],
    magical: [0.65, 0, 0.35, 1] as [number, number, number, number],
  },
} as const;

export const z = {
  base: 0,
  raised: 10,
  nav: 60,
  overlay: 80,
  modal: 100,
  cursor: 120,
} as const;

export type ColorToken = keyof typeof colors;
export type RadiusToken = keyof typeof radius;
export type ShadowToken = keyof typeof shadow;
