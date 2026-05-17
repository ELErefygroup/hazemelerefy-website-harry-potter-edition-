"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent } from "react";
import { cn } from "@/lib/cn";
import { trapFocus } from "@/lib/focus";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { Stage2PortfolioProject, Stage2ProjectColor } from "@/content/portfolioStage2";

type BookState = "front" | "open" | "back";
type TurnDirection = "next" | "prev";

type Spread = {
  left: string;
  right: string;
};

type StoryTheme = {
  accent: string;
  soft: string;
  rgb: string;
  mood: string;
  frontTop: string;
  frontMid: string;
  frontBottom: string;
  backTop: string;
  backBottom: string;
  chipBase: string;
  chipSoftBase: string;
};

type ProjectStory = {
  title: string;
  discipline: string;
  year: string;
  mood: string;
  focus: string;
  coverEdition: string;
  mode: string;
  coverImage: string;
  coverLine: string;
  coverDensity: "regular" | "compact" | "dense";
  story: string;
  challenge: string;
  decision: string;
  approach: string[];
  buildNotes: string[];
  tags: string[];
  features: string[];
  outcomes: string[];
  closing: string;
  backCover: string;
  edition: string;
  theme: StoryTheme;
  category: string;
};

const themeMap: Record<Stage2ProjectColor | "amber" | "amethyst", StoryTheme> = {
  purple: {
    accent: "#8E76BE",
    soft: "rgba(142, 118, 190, 0.16)",
    rgb: "142, 118, 190",
    mood: "aged amethyst",
    frontTop: "#241a2c",
    frontMid: "#3a2b40",
    frontBottom: "#120d15",
    backTop: "#201720",
    backBottom: "#0d0910",
    chipBase: "rgba(142, 118, 190, 0.08)",
    chipSoftBase: "rgba(142, 118, 190, 0.14)",
  },
  gold: {
    accent: "#D0B06A",
    soft: "rgba(208, 176, 106, 0.16)",
    rgb: "208, 176, 106",
    mood: "golden prosperity",
    frontTop: "#2b2014",
    frontMid: "#4f3c22",
    frontBottom: "#130d08",
    backTop: "#241a10",
    backBottom: "#100b06",
    chipBase: "rgba(208, 176, 106, 0.08)",
    chipSoftBase: "rgba(208, 176, 106, 0.14)",
  },
  silver: {
    accent: "#C7CDD4",
    soft: "rgba(199, 205, 212, 0.16)",
    rgb: "199, 205, 212",
    mood: "moonlit vellum",
    frontTop: "#211d1d",
    frontMid: "#35302d",
    frontBottom: "#0d0b0b",
    backTop: "#1a1716",
    backBottom: "#090807",
    chipBase: "rgba(199, 205, 212, 0.08)",
    chipSoftBase: "rgba(199, 205, 212, 0.14)",
  },
  emerald: {
    accent: "#6F9B76",
    soft: "rgba(111, 155, 118, 0.16)",
    rgb: "111, 155, 118",
    mood: "greenhouse hush",
    frontTop: "#162018",
    frontMid: "#263629",
    frontBottom: "#0b100c",
    backTop: "#121915",
    backBottom: "#080d09",
    chipBase: "rgba(111, 155, 118, 0.08)",
    chipSoftBase: "rgba(111, 155, 118, 0.14)",
  },
  ruby: {
    accent: "#B96C71",
    soft: "rgba(185, 108, 113, 0.16)",
    rgb: "185, 108, 113",
    mood: "oxblood embers",
    frontTop: "#2d1618",
    frontMid: "#4a2426",
    frontBottom: "#140a0b",
    backTop: "#241214",
    backBottom: "#0f0708",
    chipBase: "rgba(185, 108, 113, 0.08)",
    chipSoftBase: "rgba(185, 108, 113, 0.14)",
  },
  sapphire: {
    accent: "#7088B0",
    soft: "rgba(112, 136, 176, 0.16)",
    rgb: "112, 136, 176",
    mood: "midnight vellum",
    frontTop: "#182231",
    frontMid: "#293648",
    frontBottom: "#0b1118",
    backTop: "#141c28",
    backBottom: "#091018",
    chipBase: "rgba(112, 136, 176, 0.08)",
    chipSoftBase: "rgba(112, 136, 176, 0.14)",
  },
  obsidian: {
    accent: "#A79F93",
    soft: "rgba(167, 159, 147, 0.16)",
    rgb: "167, 159, 147",
    mood: "forbidden ash",
    frontTop: "#171514",
    frontMid: "#2a2522",
    frontBottom: "#090808",
    backTop: "#131111",
    backBottom: "#070606",
    chipBase: "rgba(167, 159, 147, 0.08)",
    chipSoftBase: "rgba(167, 159, 147, 0.14)",
  },
  amber: {
    accent: "#C78E49",
    soft: "rgba(199, 142, 73, 0.16)",
    rgb: "199, 142, 73",
    mood: "amber glow",
    frontTop: "#2a1b11",
    frontMid: "#503422",
    frontBottom: "#130b08",
    backTop: "#24160f",
    backBottom: "#0f0906",
    chipBase: "rgba(199, 142, 73, 0.08)",
    chipSoftBase: "rgba(199, 142, 73, 0.14)",
  },
  amethyst: {
    accent: "#A88CC6",
    soft: "rgba(168, 140, 198, 0.16)",
    rgb: "168, 140, 198",
    mood: "moonlit amethyst",
    frontTop: "#261b31",
    frontMid: "#3f3046",
    frontBottom: "#120d16",
    backTop: "#221924",
    backBottom: "#0d0910",
    chipBase: "rgba(168, 140, 198, 0.08)",
    chipSoftBase: "rgba(168, 140, 198, 0.14)",
  },
};

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function excerpt(text = "", max = 138) {
  const clean = String(text).trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

function getTheme(color: Stage2ProjectColor) {
  return themeMap[color] ?? themeMap.purple;
}

function getCoverDensity(title = ""): "regular" | "compact" | "dense" {
  const clean = String(title).trim();
  const words = clean.split(/\s+/).filter(Boolean).length;
  const length = clean.length;

  if (length >= 15 || words >= 3) return "dense";
  if (length >= 11 || words >= 2) return "compact";
  return "regular";
}

function getCoverLineLimit(density: ProjectStory["coverDensity"]) {
  if (density === "dense") return 36;
  if (density === "compact") return 40;
  return 44;
}

function buildProjectStory(project: Stage2PortfolioProject): ProjectStory {
  const tags = project.tags.length
    ? project.tags
    : [project.category === "frontend" ? "Frontend" : "Analytics"];

  const features = project.features.length
    ? project.features
    : [
        "Structured interface hierarchy",
        "Focused decision framing",
        "Clean product presentation",
      ];

  const story =
    project.story || `${project.title} turns a messy challenge into a clearer, more magical product story.`;
  const edition = project.category === "frontend" ? "restricted shelf edition" : "tower divination edition";
  const coverEdition = project.category === "frontend" ? "castle spellcraft" : "tower divination";
  const mode = project.category === "frontend" ? "charms & interfaces" : "omens & analysis";
  const discipline = tags.slice(0, 2).join(" · ");
  const focus = project.focus || (project.category === "frontend"
    ? "spellcrafted clarity · product direction"
    : "signal divination · decision support");
  const theme = getTheme(project.color);
  const coverDensity = getCoverDensity(project.title);

  return {
    title: project.title,
    discipline,
    year: "2026",
    mood: theme.mood,
    focus,
    coverEdition,
    mode,
    coverImage: project.image,
    coverLine: excerpt(story, getCoverLineLimit(coverDensity)),
    coverDensity,
    story,
    challenge: project.challenge || (project.category === "frontend"
      ? "The main challenge was keeping the interface magical without letting clarity disappear behind the smoke."
      : "The main challenge was turning dense signals into readable foresight without hiding the detail that matters."),
    decision: project.decision || (project.category === "frontend"
      ? "The experience was shaped around stronger hierarchy, faster scanning, and a deliberate enchanted mood."
      : "The dashboard was structured to guide the reader from omen to action with less friction."),
    approach: project.approach.length
      ? project.approach.slice(0, 3)
      : features.slice(0, 3).map((feature) => `Kept ${feature.toLowerCase()} central to the reading spell.`),
    buildNotes: project.buildNotes.length
      ? project.buildNotes.slice(0, 3)
      : features.slice(0, 3).map((feature) => `${feature} remained visible in the final casting.`),
    tags,
    features,
    outcomes: project.outcomes.length
      ? project.outcomes.slice(0, 3)
      : (project.category === "frontend"
          ? [
              "The final presentation feels closer to a real product surface than a static showcase fragment.",
              "Visual hierarchy helps the reader know where the magic lives first before exploring detail.",
              "The project reads as polished, intentional, and ready for the spotlight.",
            ]
          : [
              "The final presentation makes dense information feel more readable and more actionable.",
              "The project helps the reader scan signals faster instead of fighting a noisy dashboard wall.",
              "The result reads like a focused divination system rather than a loose data collage.",
            ]),
    closing: project.closing || (project.category === "frontend"
      ? `${project.title} shows how premium interface craft can stay clear, grounded, and quietly magical at the same time.`
      : `${project.title} shows how analytical depth can still feel calm, readable, and almost prophetic.`),
    backCover: project.backCover || `A spellbound case-study note for ${project.title}.`,
    edition,
    theme,
    category: project.category === "frontend" ? "frontend spellwork" : "analytics divination",
  };
}

function buildSpreads(projectStory: ProjectStory): Spread[] {
  const title = escapeHtml(projectStory.title);
  const coverImage = escapeHtml(projectStory.coverImage);
  const discipline = escapeHtml(projectStory.discipline);
  const focus = escapeHtml(projectStory.focus);
  const year = escapeHtml(projectStory.year);
  const story = escapeHtml(projectStory.story);
  const challenge = escapeHtml(projectStory.challenge);
  const decision = escapeHtml(projectStory.decision);
  const closing = escapeHtml(projectStory.closing);
  const archiveCode = `RS-${projectStory.title.replace(/[^A-Za-z0-9]/g, "").slice(0, 4).toUpperCase()}-${projectStory.year}`;
  const fieldTags = projectStory.tags
    .map((tag) => `<span class="class-tag">${escapeHtml(tag)}</span>`)
    .join("");

  const romanNumerals = ["I", "II", "III", "IV", "V"];

  return [
    {
      left: `
        <div class="page-card page-card--plate">
          <span class="page-kicker">restricted section · plate i</span>
          <div class="archive-plate">
            <span class="plate-crest">castle archive of works</span>
            <div class="specimen-frame">
              <img src="${coverImage}" alt="${title} interface preview" loading="eager" fetchpriority="high">
            </div>
            <div class="plate-caption">
              <strong>${title}</strong>
              <span>${escapeHtml(projectStory.coverLine)}</span>
            </div>
          </div>
          <div class="archive-ledger">
            <div class="ledger-row">
              <span>inscription</span>
              <strong>${archiveCode}</strong>
            </div>
            <div class="ledger-row">
              <span>discipline</span>
              <strong>${discipline}</strong>
            </div>
            <div class="ledger-row">
              <span>focus</span>
              <strong>${focus}</strong>
            </div>
            <div class="ledger-row">
              <span>year</span>
              <strong>${year}</strong>
            </div>
          </div>
          <div class="classification-strip">
            ${fieldTags}
          </div>
          <span class="page-folio">i</span>
        </div>
      `,
      right: `
        <div class="page-card page-card--folio">
          <span class="page-kicker">${escapeHtml(projectStory.category)}</span>
          <h2 class="chapter-title">${title}</h2>
          <hr class="editorial-hr">
          <p class="page-deck drop-cap-block">${story}</p>
          <blockquote class="page-quote">${challenge}</blockquote>
          <div class="manuscript-panel">
            <div class="detail-entry">
              <span>guiding spell</span>
              <p>${decision}</p>
            </div>
          </div>
          <span class="page-folio page-folio--right">ii</span>
        </div>
      `,
    },
    {
      left: `
        <div class="page-card page-card--folio">
          <span class="page-kicker">approach · method</span>
          <h2 class="page-title">How the spell was shaped</h2>
          <hr class="editorial-hr">
          <div class="note-stack">
            ${projectStory.approach
              .map(
                (step, index) => `
                  <article class="quill-note">
                    <span class="quill-index">${romanNumerals[index] ?? (index + 1).toString()}</span>
                    <p>${escapeHtml(step)}</p>
                  </article>
                `,
              )
              .join("")}
          </div>
          <div class="ornament-divider">✦ ✦ ✦</div>
          <ul class="archive-bullets">
            ${projectStory.outcomes.map((outcome) => `<li>${escapeHtml(outcome)}</li>`).join("")}
          </ul>
          <span class="page-folio">iii</span>
        </div>
      `,
      right: `
        <div class="page-card page-card--folio">
          <span class="page-kicker">build ledger · results</span>
          <h2 class="page-title">What mattered in the casting</h2>
          <hr class="editorial-hr">
          <div class="manuscript-panel manuscript-panel--ledger">
            ${projectStory.buildNotes
              .map(
                (note, index) => `
                  <div class="detail-entry">
                    <span>${romanNumerals[index] ?? (index + 1).toString()}</span>
                    <p>${escapeHtml(note)}</p>
                  </div>
                `,
              )
              .join("")}
          </div>
          <div class="ornament-divider">❦</div>
          <p class="page-copy">${closing}</p>
          <div class="user-signature">Hazem Elerefy</div>
          <span class="page-folio page-folio--right">iv</span>
        </div>
      `,
    },
  ];
}

function applyInkBleed(container: HTMLElement | null) {
  if (!container) return;

  const typography = container.querySelectorAll<HTMLElement>(
    "h2, p, span, li, blockquote, .user-signature, .user-signature-clear",
  );
  typography.forEach((node) => {
    node.style.filter = "url(#inkBleed)";
  });

  const images = container.querySelectorAll<HTMLImageElement>("img");
  images.forEach((image) => {
    image.style.filter = "contrast(1.05) saturate(0.9) brightness(1.02)";
  });
}

export function MagicalBook({
  projects,
  activeId,
  onClose,
}: {
  projects: Stage2PortfolioProject[];
  activeId: string | null;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const shellRef = useRef<HTMLElement | null>(null);
  const magicHaloRef = useRef<HTMLDivElement | null>(null);
  const bookCoreRef = useRef<HTMLDivElement | null>(null);
  const frontCoverRef = useRef<HTMLElement | null>(null);
  const backCoverRef = useRef<HTMLElement | null>(null);
  const openStageRef = useRef<HTMLElement | null>(null);
  const pageTurnerRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const bookStateRef = useRef<BookState>("front");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutsRef = useRef<number[]>([]);
  const rafsRef = useRef<number[]>([]);
  const actionsRef = useRef<{
    requestClose: () => void;
    openFromCover: (fromState: "front" | "back") => void;
    animateTurn: (direction: TurnDirection) => void;
  } | null>(null);
  const playbackRef = useRef<{
    clearTimers: () => void;
    clearRafs: () => void;
    cancelAnimations: () => void;
    playReveal: () => Promise<void>;
  } | null>(null);

  const open = activeId !== null;
  const project = useMemo(
    () => projects.find((entry) => entry.id === activeId) ?? null,
    [projects, activeId],
  );
  const projectStory = useMemo(
    () => (project ? buildProjectStory(project) : null),
    [project],
  );
  const spreads = useMemo(
    () => (projectStory ? buildSpreads(projectStory) : []),
    [projectStory],
  );

  const [bookState, setBookState] = useState<BookState>("front");
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPageTurning, setIsPageTurning] = useState(false);
  const [isSpellCasting, setIsSpellCasting] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isRevealing, setIsRevealing] = useState(false);
  const [turnDirection, setTurnDirection] = useState<TurnDirection | null>(null);
  const [turnFaceFrontHtml, setTurnFaceFrontHtml] = useState("");
  const [turnFaceBackHtml, setTurnFaceBackHtml] = useState("");

  const CLOSED_ROTATE_X = 15;
  const CLOSED_ROTATE_Y = 8;
  const OPEN_ROTATE_X = 9;

  const turnMidDelay = reduced ? 0 : 520;
  const turnEndDelay = reduced ? 0 : 1080;

  const themeStyle = useMemo<CSSProperties>(() => {
    const theme = projectStory?.theme ?? themeMap.purple;
    return {
      ["--cyan" as string]: theme.accent,
      ["--cyan-soft" as string]: theme.soft,
      ["--story-book-accent-rgb" as string]: theme.rgb,
      ["--cover-front-top" as string]: theme.frontTop,
      ["--cover-front-mid" as string]: theme.frontMid,
      ["--cover-front-bottom" as string]: theme.frontBottom,
      ["--cover-back-top" as string]: theme.backTop,
      ["--cover-back-bottom" as string]: theme.backBottom,
      ["--cover-chip-base" as string]: theme.chipBase,
      ["--cover-chip-soft-base" as string]: theme.chipSoftBase,
      ["--cover-border-accent" as string]: `rgba(${theme.rgb}, 0.18)`,
    };
  }, [projectStory]);

  function clearTimers() {
    timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutsRef.current = [];
  }

  function clearRafs() {
    rafsRef.current.forEach((rafId) => window.cancelAnimationFrame(rafId));
    rafsRef.current = [];
  }

  function queueTimeout(callback: () => void, delay: number) {
    const timeoutId = window.setTimeout(callback, delay);
    timeoutsRef.current.push(timeoutId);
    return timeoutId;
  }

  function queueRaf(callback: FrameRequestCallback) {
    const rafId = window.requestAnimationFrame(callback);
    rafsRef.current.push(rafId);
    return rafId;
  }

  function nextFrame() {
    return new Promise<void>((resolve) => {
      queueRaf(() => resolve());
    });
  }

  function animatedNodes() {
    return [
      backdropRef.current,
      magicHaloRef.current,
      bookCoreRef.current,
      frontCoverRef.current,
      backCoverRef.current,
      openStageRef.current,
      pageTurnerRef.current,
    ].filter(Boolean) as HTMLElement[];
  }

  function cancelAnimations() {
    animatedNodes().forEach((node) => {
      node.getAnimations().forEach((animation) => animation.cancel());
    });
  }

  function clearMotionStyles() {
    animatedNodes().forEach((node) => node.removeAttribute("style"));
  }

  function stopMotion() {
    clearTimers();
    clearRafs();
    cancelAnimations();
    clearMotionStyles();
    setIsRevealing(false);
    setTurnDirection(null);
    setTurnFaceFrontHtml("");
    setTurnFaceBackHtml("");
    setIsPageTurning(false);
    setIsSpellCasting(false);
    setIsClosing(false);
  }

  function focusBook() {
    queueRaf(() => {
      bookCoreRef.current?.focus({ preventScroll: true });
    });
  }

  function animateElement(
    node: HTMLElement | null,
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions,
  ) {
    if (!node || reduced || typeof node.animate !== "function") {
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      const animation = node.animate(keyframes, {
        fill: "forwards",
        easing: "ease-out",
        ...options,
      });

      const finish = () => resolve();
      animation.addEventListener("finish", finish, { once: true });
      animation.addEventListener("cancel", finish, { once: true });
    });
  }

  function pulseBook() {
    setIsSpellCasting(false);
    queueMicrotask(() => setIsSpellCasting(true));
    queueTimeout(() => setIsSpellCasting(false), 560);
  }

  function pulsePageTurn() {
    setIsPageTurning(false);
    queueMicrotask(() => setIsPageTurning(true));
    queueTimeout(() => setIsPageTurning(false), turnEndDelay || 1);
  }

  function playPageTurnSound(direction: TurnDirection) {
    if (reduced) return;

    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      void audio.play().catch(() => {});
    }

    const shell = shellRef.current;
    if (!shell || !projectStory) return;

    for (let index = 0; index < 18; index += 1) {
      const particle = document.createElement("div");
      particle.className = "magic-dust-particle";
      particle.style.left = "50%";
      particle.style.top = `${15 + Math.random() * 70}%`;
      particle.style.backgroundColor = projectStory.theme.accent;
      particle.style.setProperty("--tx", `${(direction === "next" ? -1 : 1) * (40 + Math.random() * 160)}px`);
      particle.style.setProperty("--ty", `${-80 + Math.random() * 160}px`);
      particle.style.width = `${2 + Math.random() * 4}px`;
      particle.style.height = particle.style.width;
      shell.appendChild(particle);
      queueTimeout(() => particle.remove(), 1200);
    }
  }

  function spawnDustMotes() {
    const shell = shellRef.current;
    if (!shell || reduced) return;

    for (let i = 0; i < 12; i++) {
      const mote = document.createElement("div");
      mote.className = "magic-mote";
      mote.style.setProperty("--mote-x", `${15 + Math.random() * 70}%`);
      mote.style.setProperty("--mote-y", `${20 + Math.random() * 60}%`);
      mote.style.setProperty("--mote-dur", `${6 + Math.random() * 8}s`);
      mote.style.setProperty("--mote-delay", `${Math.random() * 4}s`);
      mote.style.setProperty("--mote-tx", `${-40 + Math.random() * 80}px`);
      mote.style.setProperty("--mote-ty", `${-40 - Math.random() * 80}px`);
      mote.style.setProperty("--mote-tx2", `${-30 + Math.random() * 60}px`);
      mote.style.setProperty("--mote-ty2", `${-80 - Math.random() * 100}px`);
      if (projectStory) {
        mote.style.background = `rgba(${projectStory.theme.rgb}, ${0.5 + Math.random() * 0.4})`;
        mote.style.boxShadow = `0 0 ${4 + Math.random() * 6}px 2px rgba(${projectStory.theme.rgb}, 0.3)`;
      }
      shell.appendChild(mote);
    }
  }

  function clearDustMotes() {
    const shell = shellRef.current;
    if (!shell) return;
    shell.querySelectorAll(".magic-mote").forEach((el) => el.remove());
  }

  async function playReveal(initialState: "front" | "back" = "front") {
    if (spreads.length === 0) return;

    stopMotion();
    setIsHidden(false);
    setIsAnimating(true);
    setIsRevealing(true);

    const initialIndex = initialState === "back" ? Math.max(spreads.length - 1, 0) : 0;
    setSpreadIndex(initialIndex);
    setBookState(initialState);
    await nextFrame();

    if (reduced) {
      setIsRevealing(false);
      setIsAnimating(false);
      focusBook();
      return;
    }

    spawnDustMotes();

    queueTimeout(() => {
      setIsRevealing(false);
      setIsAnimating(false);
      focusBook();
    }, 1300);
  }

  async function openFromCover(fromState: "front" | "back") {
    if (isAnimating || spreads.length === 0) return;

    stopMotion();
    setIsAnimating(true);
    pulseBook();

    const targetIndex = fromState === "back" ? Math.max(spreads.length - 1, 0) : spreadIndex;
    setSpreadIndex(targetIndex);
    setBookState(fromState);
    await nextFrame();

    if (reduced) {
      setBookState("open");
      setIsAnimating(false);
      focusBook();
      return;
    }

    /* Golden glow spill animation on the book core */
    animateElement(bookCoreRef.current, [
      { boxShadow: "0 0 0 rgba(230, 178, 94, 0)" },
      { boxShadow: `0 0 100px rgba(${projectStory?.theme.rgb ?? "230,178,94"}, 0.5), 0 0 200px rgba(${projectStory?.theme.rgb ?? "230,178,94"}, 0.2)` },
      { boxShadow: "0 0 0 rgba(230, 178, 94, 0)" },
    ], {
      duration: 900,
      easing: "ease-out",
    });

    await Promise.all([
      animateElement(bookCoreRef.current, [
        {
          transform: `translate3d(0, 0, 0) scale(0.92) rotateX(${CLOSED_ROTATE_X}deg) rotateY(${fromState === "back" ? CLOSED_ROTATE_Y : -CLOSED_ROTATE_Y}deg)`,
        },
        {
          transform: `translate3d(0, -16px, 0) scale(0.98) rotateX(8deg) rotateY(${fromState === "back" ? 2 : -2}deg)`,
        },
      ], {
        duration: 350,
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      }),
      animateElement(magicHaloRef.current, [
        { transform: "translateY(18px) scale(0.96)", opacity: 0.36 },
        { transform: "translateY(-5px) scale(1.15)", opacity: 0.7 },
      ], {
        duration: 350,
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      }),
    ]);

    setBookState("open");
    await nextFrame();

    if (openStageRef.current) {
      openStageRef.current.style.opacity = "0";
      openStageRef.current.style.transform = "translateY(50px) scale(0.95)";
    }

    const activeFace = fromState === "back" ? backCoverRef.current : frontCoverRef.current;

    await Promise.all([
      animateElement(activeFace, [
        { opacity: 1, transform: "scale(1) rotateY(0deg)", filter: "blur(0px)" },
        { opacity: 0.6, transform: `scale(1.01) rotateY(${fromState === "back" ? "30deg" : "-30deg"})`, filter: "blur(2px)" },
        { opacity: 0, transform: `scale(1.035) rotateY(${fromState === "back" ? "60deg" : "-60deg"})`, filter: "blur(10px)" },
      ], {
        duration: 500,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      }),
      animateElement(openStageRef.current, [
        { opacity: 0, transform: "translateY(40px) scale(0.96)" },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ], {
        duration: 700,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      }),
      animateElement(bookCoreRef.current, [
        {
          transform: `translate3d(0, -16px, 0) scale(0.98) rotateX(8deg) rotateY(${fromState === "back" ? 2 : -2}deg)`,
        },
        {
          transform: `translate3d(0, 0, 0) scale(1) rotateX(${OPEN_ROTATE_X}deg) rotateY(0deg)`,
        },
      ], {
        duration: 700,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      }),
      animateElement(magicHaloRef.current, [
        { opacity: 0.7, transform: "translateY(-5px) scale(1.15)" },
        { opacity: 0.34, transform: "translateY(18px) scale(0.98)" },
      ], {
        duration: 800,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      }),
    ]);

    clearMotionStyles();
    setIsAnimating(false);
    focusBook();
  }

  async function closeToCover(cover: "front" | "back") {
    if (isAnimating) return;

    stopMotion();
    setIsAnimating(true);
    pulseBook();

    const targetIndex = cover === "front" ? 0 : Math.max(spreads.length - 1, 0);
    setSpreadIndex(targetIndex);
    await nextFrame();

    if (reduced) {
      setBookState(cover);
      setIsAnimating(false);
      focusBook();
      return;
    }

    await Promise.all([
      animateElement(openStageRef.current, [
        { opacity: 1, transform: "translateY(0) scale(1)" },
        { opacity: 0, transform: "translateY(34px) scale(0.95)" },
      ], {
        duration: 320,
        easing: "ease-in-out",
      }),
      animateElement(bookCoreRef.current, [
        {
          transform: `translate3d(0, 0, 0) scale(1) rotateX(${OPEN_ROTATE_X}deg) rotateY(0deg)`,
        },
        {
          transform: `translate3d(0, -6px, 0) scale(0.965) rotateX(10deg) rotateY(${cover === "back" ? 5 : -5}deg)`,
        },
      ], {
        duration: 240,
        easing: "ease-in-out",
      }),
    ]);

    setBookState(cover);
    await nextFrame();

    const coverFace = cover === "back" ? backCoverRef.current : frontCoverRef.current;
    if (coverFace) {
      coverFace.style.opacity = "0";
      coverFace.style.transform = "translateZ(18px) rotateY(0deg) scale(0.97)";
    }

    await Promise.all([
      animateElement(coverFace, [
        { opacity: 0, transform: "translateZ(18px) rotateY(0deg) scale(0.97)" },
        { opacity: 1, transform: "translateZ(14px) rotateY(0deg) scale(1)" },
      ], {
        duration: 420,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      }),
      animateElement(bookCoreRef.current, [
        {
          transform: `translate3d(0, -8px, 0) scale(0.965) rotateX(10deg) rotateY(${cover === "back" ? 5 : -5}deg)`,
        },
        {
          transform: `translate3d(0, 0, 0) scale(0.92) rotateX(${CLOSED_ROTATE_X}deg) rotateY(${cover === "back" ? CLOSED_ROTATE_Y : -CLOSED_ROTATE_Y}deg)`,
        },
      ], {
        duration: 460,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      }),
      animateElement(magicHaloRef.current, [
        { opacity: 0.34, transform: "translateY(18px) scale(0.98)" },
        { opacity: 0.5, transform: "translateY(18px) scale(1.04)" },
        { opacity: 0.34, transform: "translateY(18px) scale(0.96)" },
      ], {
        duration: 520,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      }),
    ]);

    clearMotionStyles();
    setIsAnimating(false);
    focusBook();
  }

  async function requestClose() {
    if (isClosing || !open) return;

    stopMotion();
    setIsAnimating(true);
    setIsClosing(true);

    if (reduced) {
      clearDustMotes();
      setIsHidden(true);
      setIsAnimating(false);
      setIsClosing(false);
      onClose();
      return;
    }

    const fadeAnimations: Promise<void>[] = [];
    if (bookState === "open") {
      fadeAnimations.push(
        animateElement(openStageRef.current, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 250,
          easing: "ease-in-out",
        }),
      );
    }
    if (bookState === "front") {
      fadeAnimations.push(
        animateElement(frontCoverRef.current, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 250,
          easing: "ease-in-out",
        }),
      );
    }
    if (bookState === "back") {
      fadeAnimations.push(
        animateElement(backCoverRef.current, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 250,
          easing: "ease-in-out",
        }),
      );
    }

    /* Dust shockwave burst on close */
    const shell = shellRef.current;
    if (shell) {
      const shockwave = document.createElement("div");
      shockwave.style.cssText = `position:absolute;inset:0;border-radius:50%;pointer-events:none;z-index:99;animation:dustShockwave 700ms ease-out forwards;`;
      shell.appendChild(shockwave);
      queueTimeout(() => shockwave.remove(), 800);
    }

    const initialRotateX = bookState === "open" ? OPEN_ROTATE_X : CLOSED_ROTATE_X;
    const initialRotateY = bookState === "back" ? CLOSED_ROTATE_Y : bookState === "front" ? -CLOSED_ROTATE_Y : 0;

    await Promise.all([
      ...fadeAnimations,
      animateElement(bookCoreRef.current, [
        {
          opacity: 1,
          transform: `translate3d(0, 0, 0) scale(1) rotateX(${initialRotateX}deg) rotateY(${initialRotateY}deg)`,
        },
        {
          opacity: 1,
          transform: `translate3d(0, -8px, 0) scale(1.03) rotateX(${initialRotateX + 2}deg) rotateY(${initialRotateY}deg)`,
        },
        {
          opacity: 0,
          transform: "translate3d(0, 80px, -150px) scale(0.5) rotateX(25deg) rotateY(0deg)",
        },
      ], {
        duration: 700,
        easing: "cubic-bezier(0.55, 0, 1, 0.45)",
      }),
      animateElement(backdropRef.current, [{ opacity: 1 }, { opacity: 0 }], {
        duration: 600,
        easing: "ease-in",
      }),
      animateElement(magicHaloRef.current, [
        { opacity: 0.36, transform: "translateY(18px) scale(1)" },
        { opacity: 0.6, transform: "translateY(10px) scale(1.1)" },
        { opacity: 0, transform: "translateY(60px) scale(0.5)" },
      ], {
        duration: 600,
        easing: "ease-in",
      }),
    ]);

    clearDustMotes();
    clearMotionStyles();
    setIsHidden(true);
    setIsAnimating(false);
    setIsClosing(false);
    setBookState("front");
    setSpreadIndex(0);
    onClose();
  }

  async function animateTurn(direction: TurnDirection) {
    if (isAnimating || bookState !== "open" || spreads.length === 0) return;

    if (direction === "next" && spreadIndex >= spreads.length - 1) {
      await closeToCover("back");
      return;
    }

    if (direction === "prev" && spreadIndex <= 0) {
      await closeToCover("front");
      return;
    }

    stopMotion();
    setIsAnimating(true);
    pulsePageTurn();
    playPageTurnSound(direction);

    const current = spreads[spreadIndex]!;
    const nextIndex = direction === "next" ? spreadIndex + 1 : spreadIndex - 1;
    const upcoming = spreads[nextIndex]!;

    setTurnDirection(direction);
    setTurnFaceFrontHtml(
      direction === "next"
        ? `<div class="paper-page-surface"></div>${current.right}`
        : `<div class="paper-page-surface"></div>${current.left}`,
    );
    setTurnFaceBackHtml(
      direction === "next"
        ? `<div class="paper-page-surface"></div>${upcoming.left}`
        : `<div class="paper-page-surface"></div>${upcoming.right}`,
    );

    queueTimeout(() => {
      setSpreadIndex(nextIndex);
    }, turnMidDelay);

    queueTimeout(() => {
      setTurnDirection(null);
      setTurnFaceFrontHtml("");
      setTurnFaceBackHtml("");
      setIsAnimating(false);
    }, turnEndDelay);
  }

  function isDefinitelyOutside(event: ReactMouseEvent<HTMLDivElement>) {
    const bookCore = bookCoreRef.current;
    if (!bookCore) return true;

    const rect = bookCore.getBoundingClientRect();
    const safetyBuffer = window.innerWidth < 760 ? 28 : bookState === "open" ? 110 : 64;

    return (
      event.clientX < rect.left - safetyBuffer ||
      event.clientX > rect.right + safetyBuffer ||
      event.clientY < rect.top - safetyBuffer ||
      event.clientY > rect.bottom + safetyBuffer
    );
  }

  function handleBookClick(event: ReactMouseEvent<HTMLDivElement>) {
    if (bookState === "front") {
      void openFromCover("front");
      return;
    }

    if (bookState === "back") {
      void openFromCover("back");
      return;
    }

    if (bookState !== "open" || isAnimating) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const half = rect.width / 2;

    if (x >= half) void animateTurn("next");
    else void animateTurn("prev");
  }

  function handleModalClick(event: ReactMouseEvent<HTMLDivElement>) {
    if (isAnimating || !isDefinitelyOutside(event)) return;
    void requestClose();
  }

  useLayoutEffect(() => {
    actionsRef.current = {
      requestClose,
      openFromCover,
      animateTurn,
    };

    playbackRef.current = {
      clearTimers,
      clearRafs,
      cancelAnimations,
      playReveal: () => playReveal("front"),
    };
  });

  useEffect(() => {
    bookStateRef.current = bookState;
  }, [bookState]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio("/audio/paper_turn.wav");
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    if (!open || !projectStory) return;

    playbackRef.current?.clearTimers();
    playbackRef.current?.clearRafs();
    playbackRef.current?.cancelAnimations();

    const revealRaf = queueRaf(() => {
      queueRaf(() => {
        void playbackRef.current?.playReveal();
      });
    });

    return () => {
      window.cancelAnimationFrame(revealRaf);
      playbackRef.current?.clearRafs();
    };
  }, [open, projectStory]);

  useEffect(() => {
    if (!open) {
      playbackRef.current?.clearTimers();
      playbackRef.current?.clearRafs();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    lastFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";

    const focusHandle = window.requestAnimationFrame(() => {
      bookCoreRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      const currentState = bookStateRef.current;

      if (event.key === "Escape") {
        event.preventDefault();
        void actionsRef.current?.requestClose();
        return;
      }

      if (currentState === "front" && (event.key === "Enter" || event.key === " " || event.key === "ArrowRight")) {
        event.preventDefault();
        void actionsRef.current?.openFromCover("front");
        return;
      }

      if (currentState === "back" && (event.key === "Enter" || event.key === " " || event.key === "ArrowLeft")) {
        event.preventDefault();
        void actionsRef.current?.openFromCover("back");
        return;
      }

      if (currentState === "open") {
        if (event.key === "ArrowRight" || event.key === " ") {
          event.preventDefault();
          void actionsRef.current?.animateTurn("next");
          return;
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          void actionsRef.current?.animateTurn("prev");
          return;
        }
      }

      const dialog = dialogRef.current;
      if (dialog) {
        trapFocus(event, dialog);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusHandle);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      playbackRef.current?.clearTimers();
      playbackRef.current?.clearRafs();
      playbackRef.current?.cancelAnimations();

      const lastFocused = lastFocusedRef.current;
      if (lastFocused?.isConnected) {
        window.requestAnimationFrame(() => lastFocused.focus());
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    applyInkBleed(bookCoreRef.current);
  }, [open, spreadIndex, turnFaceFrontHtml, turnFaceBackHtml, bookState]);

  if (!open || !project || !projectStory) return null;

  const currentSpread = spreads[spreadIndex] ?? { left: "", right: "" };
  const shellClassName = cn(
    "story-book-shell is-mounted",
    `state-${bookState}`,
    isRevealing && "is-revealing",
    isPageTurning && "is-page-turning",
    isSpellCasting && "is-spell-casting",
    isClosing && "is-closing",
  );
  const modalClassName = cn("book-modal", isHidden && "is-hidden", isRevealing && "is-revealing");
  const turnerClassName = cn(
    "page-turner",
    turnDirection && "is-active",
    turnDirection === "next" && "is-next",
    turnDirection === "prev" && "is-prev",
  );
  const spreadProgress = spreads.length > 1 ? spreadIndex / (spreads.length - 1) : 0;
  const leftStackStyle: CSSProperties = {
    width: `${16 + Math.round(16 * spreadProgress)}px`,
    opacity: 0.72 + spreadProgress * 0.2,
  };
  const rightStackStyle: CSSProperties = {
    width: `${16 + Math.round(16 * (1 - spreadProgress))}px`,
    opacity: 0.72 + (1 - spreadProgress) * 0.2,
  };

  return (
    <div
      ref={dialogRef}
      className={modalClassName}
      id="bookModal"
      aria-hidden={isHidden ? "true" : "false"}
      style={themeStyle}
      onClick={handleModalClick}
    >
      <div ref={backdropRef} className="book-backdrop" id="bookBackdrop" />

      <section
        ref={shellRef}
        className={shellClassName}
        id="storyBookShell"
        aria-label="Interactive project story book"
        data-cover-density={projectStory.coverDensity}
      >
        <div ref={magicHaloRef} className="magic-halo" />

        <div className="book-hit-area" id="bookHitArea">
          <div
            ref={bookCoreRef}
            className="book-core"
            id="bookCore"
            tabIndex={0}
            role="dialog"
            aria-modal="true"
            aria-label={`Interactive project story book: ${project.title}`}
            onClick={handleBookClick}
            onKeyDown={(event: ReactKeyboardEvent<HTMLDivElement>) => {
              if (event.key === "Tab") {
                trapFocus(event.nativeEvent, dialogRef.current ?? event.currentTarget);
              }
            }}
          >
            <div className="book-grain" />

            <article ref={frontCoverRef} className="book-closed-face book-closed-face--front" id="frontCoverFace">
              <div className="cover-frame cover-frame--front">
                <div className="cover-corners" aria-hidden="true">
                  <span className="cover-corner cover-corner--tl" />
                  <span className="cover-corner cover-corner--tr" />
                  <span className="cover-corner cover-corner--bl" />
                  <span className="cover-corner cover-corner--br" />
                </div>
                <div className="cover-spine-bands" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="cover-medallion" aria-hidden="true">
                  <span />
                </div>
                <div className="cover-clasp" aria-hidden="true" />
                <div className="cover-topline">
                  <span className="cover-chip" id="coverEditionChip">Restricted Section</span>
                  <span className="cover-chip cover-chip--soft" id="coverModeChip">{projectStory.mode}</span>
                </div>

                <div className="cover-visual">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={projectStory.coverImage} alt={`${project.title} preview`} className="cover-visual-image" id="coverVisualImage" loading="eager" fetchPriority="high" />
                  <div className="cover-visual-glow" />
                </div>

                <div className="cover-copy">
                  <p className="cover-kicker" id="coverKicker">{projectStory.category}</p>
                  <h1 className="cover-title" id="coverTitle" data-title={projectStory.title}>{projectStory.title}</h1>
                </div>

                <div className="cover-meta">
                  <div>
                    <span className="cover-meta-label">edition</span>
                    <strong id="coverMetaEdition">{projectStory.coverEdition}</strong>
                  </div>
                  <div>
                    <span className="cover-meta-label">year</span>
                    <strong id="coverMetaYear">{projectStory.year}</strong>
                  </div>
                  <div>
                    <span className="cover-meta-label">school</span>
                    <strong id="coverMetaMood">{projectStory.mode}</strong>
                  </div>
                </div>
                <div className="user-signature-clear cover-signature cover-signature--front">Hazem Elerefy</div>
              </div>
            </article>

            <article ref={backCoverRef} className="book-closed-face book-closed-face--back" id="backCoverFace">
              <div className="cover-frame cover-frame--back">
                <div className="cover-corners" aria-hidden="true">
                  <span className="cover-corner cover-corner--tl" />
                  <span className="cover-corner cover-corner--tr" />
                  <span className="cover-corner cover-corner--bl" />
                  <span className="cover-corner cover-corner--br" />
                </div>
                <div className="cover-spine-bands" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="back-cover-orbit" />
                <p className="cover-kicker" id="backCoverKicker">owl-post note</p>
                <h2 className="back-cover-title" id="backCoverTitle">Return me to the shelves</h2>
                <p className="back-cover-copy" id="backCoverCopy" hidden>{projectStory.backCover}</p>
                <div className="back-cover-footer">
                  <span id="backCoverFooterLeft">{projectStory.year}</span>
                  <span id="backCoverFooterRight">{projectStory.edition}</span>
                </div>
                <div className="user-signature-clear cover-signature cover-signature--back" id="backCoverSignature" hidden>Hazem Elerefy</div>
              </div>
            </article>

            <section ref={openStageRef} className="book-open-stage" id="bookOpenStage">
              <div className="book-spine-light" />
              <div className="gutter-shadow" />
              <div className="paper-shadow paper-shadow--left" />
              <div className="paper-shadow paper-shadow--right" />
              <div className="bookmark-ribbon bookmark-ribbon--left" aria-hidden="true" />
              <div className="bookmark-ribbon bookmark-ribbon--right" aria-hidden="true" />
              <div className="page-edge-stack page-edge-stack--left" aria-hidden="true" style={leftStackStyle} />
              <div className="page-edge-stack page-edge-stack--right" aria-hidden="true" style={rightStackStyle} />

              <article
                className="paper-page paper-page--left"
                id="leftPage"
                dangerouslySetInnerHTML={{
                  __html: `<div class="paper-page-surface"></div>${currentSpread.left}`,
                }}
              />
              <article
                className="paper-page paper-page--right"
                id="rightPage"
                dangerouslySetInnerHTML={{
                  __html: `<div class="paper-page-surface"></div>${currentSpread.right}`,
                }}
              />

              <div ref={pageTurnerRef} className={turnerClassName} id="pageTurner" aria-hidden="true">
                <div
                  className="turn-face turn-face--front"
                  id="turnFaceFront"
                  dangerouslySetInnerHTML={{ __html: turnFaceFrontHtml }}
                />
                <div
                  className="turn-face turn-face--back"
                  id="turnFaceBack"
                  dangerouslySetInnerHTML={{ __html: turnFaceBackHtml }}
                />
              </div>
            </section>
          </div>
        </div>
      </section>

      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="paperFiber">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves={3} result="noise" />
            <feDiffuseLighting in="noise" lightingColor="#fff" surfaceScale={1.5}>
              <feDistantLight azimuth={45} elevation={60} />
            </feDiffuseLighting>
            <feComposite in="SourceGraphic" operator="in" />
          </filter>

          <filter id="deckleEdge">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={3} seed={1} />
            <feDisplacementMap in="SourceGraphic" scale={3} xChannelSelector="R" yChannelSelector="G" />
          </filter>

          <filter id="inkBleed">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="ink"
            />
            <feComposite in="ink" in2="SourceGraphic" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
