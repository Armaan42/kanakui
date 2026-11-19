import type { IconDef } from "@/lib/icons"

/**
 * The Animated style: which parts of each icon move, and how. Motions are
 * plain CSS animations inside the SVG, so an exported file animates by itself
 * and the site needs no JavaScript to play them.
 */

export type MotionKind =
  | "ring"
  | "pop"
  | "spin"
  | "nudge"
  | "bounce"
  | "blink"
  | "lift"
  | "fall"
  | "wave"
  | "draw"
  | "float"
  | "rock"
  | "flicker"
  | "twinkle"
  | "press"
  | "turn"

export interface Motion {
  kind: MotionKind
  /** Indexes into the icon's paths. All of them when left out. */
  parts?: number[]
  /** Give each part its own group, started `stagger` seconds after the last. */
  each?: boolean
  stagger?: number
  /** Pivot in the 24 × 24 grid, or "center" for each group's own centre. */
  origin?: string
  /** Distance for "nudge", in grid units. */
  dx?: number
  dy?: number
  /** Seconds per loop, when the default for the kind doesn't suit. */
  duration?: number
}

const KINDS: Record<MotionKind, { duration: number; easing: string; keyframes: string }> = {
  ring: { duration: 1.6, easing: "ease-in-out", keyframes: "0%,60%,100%{transform:rotate(0)}10%{transform:rotate(14deg)}20%{transform:rotate(-12deg)}30%{transform:rotate(9deg)}40%{transform:rotate(-6deg)}50%{transform:rotate(3deg)}" },
  pop: { duration: 1.6, easing: "ease-out", keyframes: "0%,60%,100%{transform:scale(1)}20%{transform:scale(1.2)}35%{transform:scale(.92)}50%{transform:scale(1.05)}" },
  spin: { duration: 2.4, easing: "linear", keyframes: "from{transform:rotate(0)}to{transform:rotate(360deg)}" },
  nudge: { duration: 1.4, easing: "ease-in-out", keyframes: "0%,55%,100%{transform:translate(0,0)}25%{transform:translate(var(--dx,0px),var(--dy,0px))}" },
  bounce: { duration: 1.6, easing: "ease-in-out", keyframes: "0%,40%,60%,100%{transform:translateY(0)}20%{transform:translateY(-3px)}50%{transform:translateY(-1.2px)}" },
  blink: { duration: 2.4, easing: "ease-in-out", keyframes: "0%,16%,100%{transform:scaleY(1)}8%{transform:scaleY(.08)}" },
  lift: { duration: 1.8, easing: "ease-in-out", keyframes: "0%,60%,100%{transform:translate(0,0) rotate(0)}25%,40%{transform:translate(0,-2px) rotate(-14deg)}" },
  fall: { duration: 1.1, easing: "linear", keyframes: "0%{transform:translateY(-2px);opacity:0}30%{opacity:1}100%{transform:translateY(3px);opacity:0}" },
  wave: { duration: 1.4, easing: "ease-in-out", keyframes: "0%,100%{opacity:1}50%{opacity:.15}" },
  draw: { duration: 2, easing: "ease-in-out", keyframes: "0%{stroke-dashoffset:1}45%,100%{stroke-dashoffset:0}" },
  float: { duration: 2.6, easing: "ease-in-out", keyframes: "0%,100%{transform:translateY(0)}50%{transform:translateY(-1.5px)}" },
  rock: { duration: 1.8, easing: "ease-in-out", keyframes: "0%,70%,100%{transform:rotate(0)}20%{transform:rotate(10deg)}45%{transform:rotate(-8deg)}" },
  flicker: { duration: 0.7, easing: "ease-in-out", keyframes: "0%,100%{transform:scale(1,1)}33%{transform:scale(.94,1.08)}66%{transform:scale(1.05,.95)}" },
  twinkle: { duration: 1.8, easing: "ease-in-out", keyframes: "0%,60%,100%{transform:scale(1) rotate(0)}25%{transform:scale(.7) rotate(45deg)}45%{transform:scale(1.1) rotate(90deg)}" },
  press: { duration: 1.2, easing: "ease-in-out", keyframes: "0%,40%,100%{transform:translateY(0)}20%{transform:translateY(1px)}" },
  turn: { duration: 2.2, easing: "ease-in-out", keyframes: "0%,100%{transform:scaleX(1)}50%{transform:scaleX(-1)}" },
}

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i)

/** One motion (or more) per icon. */
export const MOTIONS: Record<string, Motion | Motion[]> = {
  search: { kind: "pop", origin: "10.5 10.5" },
  home: { kind: "bounce" },
  settings: { kind: "spin" },
  user: { kind: "bounce", parts: [0] },
  bell: { kind: "ring", origin: "12 4" },
  heart: { kind: "pop" },
  star: { kind: "twinkle" },
  check: { kind: "draw" },
  close: { kind: "pop" },
  plus: { kind: "rock", origin: "center" },
  menu: { kind: "nudge", each: true, stagger: 0.1, dx: 2 },
  trash: { kind: "lift", parts: [0, 1], origin: "4 7" },
  edit: { kind: "rock", origin: "4.5 19.5" },
  lock: { kind: "nudge", parts: [1], dy: -2 },
  eye: { kind: "blink" },
  filter: { kind: "bounce" },
  "arrow-right": { kind: "nudge", dx: 3 },
  "arrow-left": { kind: "nudge", dx: -3 },
  "arrow-up": { kind: "nudge", dy: -3 },
  "arrow-down": { kind: "nudge", dy: 3 },
  "chevron-right": { kind: "nudge", dx: 2 },
  "chevron-down": { kind: "nudge", dy: 2 },
  refresh: { kind: "spin" },
  "external-link": { kind: "nudge", parts: [0, 1], dx: 2, dy: -2 },
  download: { kind: "nudge", parts: [0, 1], dy: 2.5 },
  upload: { kind: "nudge", parts: [0, 1], dy: -2.5 },
  mail: { kind: "bounce" },
  chat: { kind: "pop" },
  phone: { kind: "ring" },
  send: { kind: "nudge", dx: 2.5, dy: -2.5 },
  "at-sign": { kind: "rock" },
  share: { kind: "pop", parts: [0, 1, 2], each: true, stagger: 0.15, origin: "center" },
  bookmark: { kind: "bounce" },
  globe: { kind: "turn", parts: [2], origin: "center" },
  play: { kind: "pop", origin: "center" },
  pause: { kind: "pop", each: true, stagger: 0.12, origin: "center" },
  music: { kind: "bounce", each: true, stagger: 0.15 },
  camera: { kind: "pop", parts: [1], origin: "center" },
  image: { kind: "bounce", parts: [1] },
  video: { kind: "nudge", parts: [1], dx: 1.5 },
  mic: { kind: "pop" },
  volume: { kind: "wave", parts: [1, 2], each: true, stagger: 0.2 },
  file: { kind: "draw" },
  folder: { kind: "pop" },
  clipboard: { kind: "draw", parts: [2, 3], each: true, stagger: 0.2 },
  copy: { kind: "nudge", parts: [0], dx: 1.5, dy: 1.5 },
  paperclip: { kind: "rock" },
  archive: { kind: "lift", parts: [0], origin: "3 6" },
  cart: { kind: "nudge", dx: 2.5 },
  bag: { kind: "rock", origin: "12 4" },
  "credit-card": { kind: "nudge", dx: 2.5 },
  tag: { kind: "rock", origin: "8 8" },
  gift: { kind: "bounce", parts: [0, 3, 4] },
  receipt: { kind: "draw", parts: [1, 2, 3], each: true, stagger: 0.15 },
  sun: { kind: "spin", parts: range(1, 8), duration: 6 },
  moon: { kind: "rock", origin: "center" },
  cloud: { kind: "float" },
  rain: { kind: "fall", parts: [1, 2, 3], each: true, stagger: 0.3 },
  lightning: { kind: "wave" },
  snowflake: { kind: "spin", duration: 8 },
  laptop: { kind: "pop" },
  smartphone: { kind: "ring" },
  monitor: { kind: "pop" },
  watch: { kind: "spin", parts: [3], duration: 3 },
  keyboard: { kind: "press", parts: range(1, 5), each: true, stagger: 0.1 },
  battery: { kind: "wave", parts: [2, 3], each: true, stagger: 0.25 },
  calendar: { kind: "bounce", parts: [2, 3], each: true, stagger: 0.12 },
  clock: { kind: "spin", parts: [1], duration: 3 },
  "map-pin": { kind: "bounce" },
  leaf: { kind: "rock", origin: "5 19" },
  flame: { kind: "flicker", origin: "12 21" },
  sparkle: [
    { kind: "twinkle", parts: [0], origin: "11 10.3" },
    { kind: "pop", parts: [1, 2], origin: "18.5 18" },
  ],
  venus: { kind: "pop", origin: "12 9" },
}

export function motionsFor(icon: IconDef): Motion[] {
  const spec = MOTIONS[icon.name] ?? { kind: "pop" }
  return Array.isArray(spec) ? spec : [spec]
}

const number = (value: number) => String(Math.round(value * 1000) / 1000)

/** The SVG elements for the Animated style: still paths first, then each moving group. */
export function animatedLines(icon: IconDef) {
  const motions = motionsFor(icon)
  const used = new Set<number>()
  const groups: string[] = []
  for (const motion of motions) {
    const parts = (motion.parts ?? icon.paths.map((_, i) => i)).filter((i) => !used.has(i))
    parts.forEach((i) => used.add(i))
    const sets = motion.each ? parts.map((i) => [i]) : [parts]
    sets.forEach((set, order) => {
      const style = [
        motion.origin === "center" ? "transform-box:fill-box;transform-origin:center" : `transform-origin:${(motion.origin ?? "12 12").split(" ").map((v) => `${v}px`).join(" ")}`,
        motion.dx ? `--dx:${number(motion.dx)}px` : "",
        motion.dy ? `--dy:${number(motion.dy)}px` : "",
        motion.duration ? `--dur:${number(motion.duration)}s` : "",
        order && motion.stagger ? `--delay:${number(order * motion.stagger)}s` : "",
      ].filter(Boolean)
      const draw = motion.kind === "draw" ? ' pathLength="1"' : ""
      groups.push(`<g class="vi-k-${motion.kind}" style="${style.join(";")}">`, ...set.map((i) => `<path d="${icon.paths[i]}"${draw}/>`), `</g>`)
    })
  }
  const still = icon.paths.filter((_, i) => !used.has(i)).map((d) => `<path d="${d}"/>`)
  return [...still, ...groups]
}

export function motionKinds(icon: IconDef) {
  return new Set(motionsFor(icon).map((motion) => motion.kind))
}

/**
 * CSS for the motions. "always" plays them on a loop (exported files);
 * "page" plays them inside `.vi-live`, or while a `.vi-hover` element is
 * hovered or focused. Both stop for people who ask for less motion.
 */
export function motionCss(kinds: Iterable<MotionKind>, mode: "always" | "page") {
  const rules: string[] = []
  for (const kind of new Set(kinds)) {
    const { duration, easing, keyframes } = KINDS[kind]
    const target = kind === "draw" ? `.vi-k-${kind} path` : `.vi-k-${kind}`
    const selectors = mode === "always" ? [target] : [`.vi-live ${target}`, `.vi-hover:hover ${target}`, `.vi-hover:focus-visible ${target}`]
    if (kind === "draw") rules.push(`${target}{stroke-dasharray:1;stroke-dashoffset:0}`)
    rules.push(`${selectors.join(",")}{animation:vi-${kind} var(--dur,${duration}s) ${easing} var(--delay,0s) infinite both}`)
    rules.push(`@keyframes vi-${kind}{${keyframes}}`)
  }
  rules.push(`@media (prefers-reduced-motion:reduce){[class*="vi-k-"],[class*="vi-k-"] path{animation:none!important}}`)
  return rules.join("")
}

/** Every kind, for the page's shared stylesheet. */
export const ALL_MOTION_KINDS = Object.keys(KINDS) as MotionKind[]
