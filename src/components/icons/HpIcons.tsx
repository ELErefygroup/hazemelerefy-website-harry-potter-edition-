/**
 * Hand-drawn / line-art icon set in the Hogwarts banner style:
 * thin gold strokes, mild filigree flourishes, no fills, optical thickness ~1.5.
 *
 * Server component (pure SVG, no interactivity). Styling via the parent's
 * `currentColor`; default stroke color is the candle gold.
 */

import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { title?: string };

function Base({
  title,
  children,
  viewBox = "0 0 32 32",
  ...rest
}: Props & { children: React.ReactNode }) {
  return (
    <svg
      role="img"
      aria-hidden={title ? undefined : true}
      aria-label={title}
      viewBox={viewBox}
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function QuillIcon(props: Props) {
  return (
    <Base title={props.title ?? "Quill"} {...props}>
      <path d="M5 27c4-2 9-7 14-12 3-3 5-7 6-10-3 1-7 3-10 6C10 16 7 21 5 27Z" />
      <path d="M9 23l4-1" />
      <path d="M5 27l3-3" />
    </Base>
  );
}

export function CandleIcon(props: Props) {
  return (
    <Base title={props.title ?? "Candle"} {...props}>
      <path d="M16 3c-1.5 1.5-2.5 3-2.5 4.5 0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5C18.5 6 17.5 4.5 16 3Z" />
      <rect x="12.5" y="11" width="7" height="14" rx="1" />
      <path d="M10 25h12l-1.5 4h-9z" />
      <path d="M16 11v14" />
    </Base>
  );
}

export function OwlIcon(props: Props) {
  return (
    <Base title={props.title ?? "Owl"} {...props}>
      <path d="M16 5c-5 0-9 3-9 9 0 6 4 12 9 12s9-6 9-12c0-6-4-9-9-9Z" />
      <circle cx="12.5" cy="13" r="2" />
      <circle cx="19.5" cy="13" r="2" />
      <circle cx="12.5" cy="13" r="0.6" fill="currentColor" />
      <circle cx="19.5" cy="13" r="0.6" fill="currentColor" />
      <path d="M14.5 17l1.5 2 1.5-2" />
      <path d="M9 8l3 3" />
      <path d="M23 8l-3 3" />
    </Base>
  );
}

export function CastleIcon(props: Props) {
  return (
    <Base title={props.title ?? "Castle"} {...props} viewBox="0 0 36 32">
      <path d="M3 28V14l3-2v-4h2v4h2v-4h2v6l3 2V8h3v4l4-2v6l3-1v-3h2v3l4 1v15" />
      <path d="M3 28h30" />
      <path d="M14 28v-6h4v6" />
      <rect x="6" y="18" width="2" height="3" />
      <rect x="22" y="18" width="2" height="3" />
      <rect x="28" y="20" width="2" height="3" />
    </Base>
  );
}

export function MoonIcon(props: Props) {
  return (
    <Base title={props.title ?? "Moon"} {...props}>
      <path d="M22 19a8 8 0 1 1-9-12 7 7 0 0 0 9 12Z" />
    </Base>
  );
}

export function SpellbookIcon(props: Props) {
  return (
    <Base title={props.title ?? "Spellbook"} {...props}>
      <path d="M5 6a2 2 0 0 1 2-2h18v22H7a2 2 0 0 1-2-2Z" />
      <path d="M5 6v18a2 2 0 0 0 2 2" />
      <path d="M11 9h10" />
      <path d="M11 13h10" />
      <path d="M11 17h7" />
    </Base>
  );
}

export function PotionIcon(props: Props) {
  return (
    <Base title={props.title ?? "Potion"} {...props}>
      <path d="M13 4h6v5l3 6c1.5 3-1 8-6 8s-7.5-5-6-8l3-6Z" />
      <path d="M11 14h10" />
      <circle cx="14" cy="19" r="0.8" fill="currentColor" />
      <circle cx="18" cy="21" r="0.6" fill="currentColor" />
      <path d="M13 4h6" strokeWidth="2.2" />
    </Base>
  );
}

export function WandIcon(props: Props) {
  return (
    <Base title={props.title ?? "Wand"} {...props}>
      <path d="M5 27l18-18" />
      <path d="M22 7l3 3" />
      <path d="M25 5l1 1" />
      <path d="M19 5l1 1" />
      <path d="M27 11l1 1" />
    </Base>
  );
}

export function ScrollIcon(props: Props) {
  return (
    <Base title={props.title ?? "Scroll"} {...props}>
      <path d="M6 7c0-2 2-3 4-3h14c-1.5 0-2 1-2 3v17c0 2-2 3-4 3H8" />
      <path d="M6 7c0 1.5 0 3 2 3h14" />
      <path d="M22 24c0 2-2 3-4 3-2 0-4-1-4-3" />
      <path d="M11 14h8" />
      <path d="M11 18h6" />
    </Base>
  );
}

export function CrestIcon(props: Props) {
  return (
    <Base title={props.title ?? "Crest"} {...props}>
      <path d="M16 3l11 4v9c0 7-5 12-11 13C10 28 5 23 5 16V7Z" />
      <path d="M16 3v25" />
      <path d="M5 16h22" />
      <circle cx="16" cy="14" r="3" />
    </Base>
  );
}

export function ChartIcon(props: Props) {
  return (
    <Base title={props.title ?? "Chart"} {...props}>
      <path d="M5 27h22" />
      <path d="M5 27V7" />
      <path d="M9 22V14" />
      <path d="M14 22V10" />
      <path d="M19 22V16" />
      <path d="M24 22V8" />
    </Base>
  );
}

export function DatabaseIcon(props: Props) {
  return (
    <Base title={props.title ?? "Database"} {...props}>
      <ellipse cx="16" cy="7" rx="10" ry="3" />
      <path d="M6 7v8c0 1.7 4.5 3 10 3s10-1.3 10-3V7" />
      <path d="M6 15v8c0 1.7 4.5 3 10 3s10-1.3 10-3v-8" />
    </Base>
  );
}
