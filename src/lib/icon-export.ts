import { animatedLines, motionCss, motionKinds } from "@/lib/icon-motion"
import { solidShapes, type IconCategory, type IconDef } from "@/lib/icons"

/**
 * Turns an icon into every format the Icons page offers. SVG, JSX and data
 * URIs are strings; PNG, JPEG, WebP and ICO are drawn on a canvas in the
 * browser; PDF is written by hand as real vector paths.
 */

export type IconVariant = "outline" | "solid" | "duotone" | "colour" | "3d" | "animated"

export const ICON_VARIANTS: { value: IconVariant; label: string }[] = [
  { value: "outline", label: "Outline" },
  { value: "solid", label: "Solid" },
  { value: "duotone", label: "Duotone" },
  { value: "colour", label: "Colour" },
  { value: "3d", label: "3D" },
  { value: "animated", label: "Animated" },
]

/** Styles that build their own palette from the chosen colour (or the icon's category). */
export const isColourful = (variant: IconVariant) => variant === "colour" || variant === "3d"

/** Opacity of the tinted fill in the Duotone style. */
export const DUOTONE_OPACITY = 0.22
const GLOSS_OPACITY = 0.24
const SHADOW_OPACITY = 0.35

export interface IconStyle {
  variant: IconVariant
  /** Pixel size of downloads. */
  size: number
  /** CSS colour, or "currentColor" (resolved to `resolvedColor` for images; "by category" in Colour and 3D). */
  color: string
  resolvedColor: string
  strokeWidth: number
  /** Solid background colour, or null for transparent. */
  background: string | null
}

const pascal = (name: string) =>
  name
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("")

export function iconComponentName(icon: IconDef) {
  return `${pascal(icon.name)}Icon`
}

// ---------------------------------------------------------------- Colour

/** Each category's base colour, used when no colour is picked. */
export const CATEGORY_COLORS: Record<IconCategory, string> = {
  Interface: "#7c3aed",
  Arrows: "#2563eb",
  Communication: "#0891b2",
  Media: "#db2777",
  Files: "#d97706",
  Commerce: "#059669",
  Weather: "#0284c7",
  Devices: "#475569",
  Everyday: "#ea580c",
  Development: "#4f46e5",
}

export interface Palette {
  /** Colour style: fill, outline and detail colours. */
  light: string
  dark: string
  accent: string
  /** 3D style: tile gradient and the edge below it. */
  top: string
  bottom: string
  depth: string
}

type Rgb = [number, number, number]

function parseHex(value: string): Rgb | null {
  const hex = value.trim().replace(/^#/, "")
  if (/^[0-9a-f]{3}$/i.test(hex)) return [0, 1, 2].map((i) => parseInt(hex[i] + hex[i], 16)) as Rgb
  if (/^[0-9a-f]{6}$/i.test(hex)) return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)) as Rgb
  return null
}

const toHex = (rgb: Rgb) => `#${rgb.map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0")).join("")}`
const mix = (a: Rgb, b: Rgb, amount: number): Rgb => [0, 1, 2].map((i) => a[i] + (b[i] - a[i]) * amount) as Rgb
const WHITE: Rgb = [255, 255, 255]
const BLACK: Rgb = [0, 0, 0]

/** A neighbouring hue for details: distinct from the outline but in harmony with it. */
function accentOf([r, g, b]: Rgb): Rgb {
  const max = Math.max(r, g, b) / 255
  const min = Math.min(r, g, b) / 255
  const l = (max + min) / 2
  const d = max - min
  let h = 0
  if (d) {
    if (max === r / 255) h = ((g - b) / 255 / d) % 6
    else if (max === g / 255) h = (b - r) / 255 / d + 2
    else h = (r - g) / 255 / d + 4
  }
  h = (h * 60 + 42 + 360) % 360
  const s = d ? 0.78 : 0
  const light = d ? 0.55 : l
  const c = (1 - Math.abs(2 * light - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = light - c / 2
  const [r1, g1, b1] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x]
  return [(r1 + m) * 255, (g1 + m) * 255, (b1 + m) * 255]
}

/** The palette for an icon: from a hex colour, or the icon's category colour otherwise. */
export function paletteFor(icon: IconDef, paint: string): Palette {
  const base = parseHex(paint) ?? (parseHex(CATEGORY_COLORS[icon.category]) as Rgb)
  return {
    light: toHex(mix(base, WHITE, 0.74)),
    dark: toHex(mix(base, BLACK, 0.18)),
    accent: toHex(accentOf(base)),
    top: toHex(mix(base, WHITE, 0.28)),
    bottom: toHex(mix(base, BLACK, 0.12)),
    depth: toHex(mix(base, BLACK, 0.45)),
  }
}

// ---------------------------------------------------------------- Shapes and SVG

const roundedRect = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 ${-r} ${r}h${-(w - 2 * r)}a${r} ${r} 0 0 1 ${-r} ${-r}v${-(h - 2 * r)}a${r} ${r} 0 0 1 ${r} ${-r}z`

/** The 3D tile, the darker edge below it and the gloss across its top. */
const TILE = roundedRect(1.5, 1.5, 21, 20.5, 5.5)
const TILE_EDGE = roundedRect(1.5, 2.7, 21, 20.5, 5.5)
const GLOSS = "M1.5 7a5.5 5.5 0 0 1 5.5-5.5h10a5.5 5.5 0 0 1 5.5 5.5v2.2c-6.5 2.4-14.5 2.4-21 0z"
/** Where the icon sits on the tile: [scale, x, y], and how far its shadow drops. */
const ON_TILE: [number, number, number] = [0.58, 5.04, 4.79]
const SHADOW_DROP = 1.2

const solidParts = (icon: IconDef) => {
  const shapes = solidShapes(icon)
  return {
    drawn: shapes.filter((shape) => shape.mode === "f" || shape.mode === "s"),
    cuts: shapes.filter((shape) => shape.mode === "c" || shape.mode === "h"),
  }
}

function maskLines(icon: IconDef, maskId: string) {
  const { cuts } = solidParts(icon)
  if (!cuts.length) return []
  return [
    `<mask id="${maskId}" maskUnits="userSpaceOnUse" x="-4" y="-4" width="32" height="32">`,
    `<rect x="-4" y="-4" width="32" height="32" fill="#fff" stroke="none"/>`,
    ...cuts.map((shape) => `<path d="${shape.d}" fill="${shape.mode === "h" ? "#000" : "none"}" stroke="#000"/>`),
    `</mask>`,
  ]
}

/** The Solid icon in one colour, masked by its cut-outs when it has any. */
function solidLines(icon: IconDef, paint: string, maskId: string, open: string[] = [], { explicitStroke = false } = {}) {
  const { drawn, cuts } = solidParts(icon)
  const stroke = explicitStroke ? ` stroke="${paint}"` : ""
  const paths = drawn.map((shape) => (shape.mode === "f" ? `<path d="${shape.d}" fill="${paint}"${stroke}/>` : `<path d="${shape.d}"${stroke}/>`))
  const groupAttrs = [...open, cuts.length ? `mask="url(#${maskId})"` : ""].filter(Boolean).join(" ")
  return groupAttrs ? [`<g ${groupAttrs}>`, ...paths, `</g>`] : paths
}

/**
 * The SVG elements inside <svg> for a style, one per line. `paint` is the icon
 * colour. `withCss` adds the Animated style's own <style> so the file plays by
 * itself (the site loads that CSS once instead).
 */
export function svgBody(icon: IconDef, variant: IconVariant, paint: string, maskId: string, { withCss = false } = {}) {
  if (variant === "outline") return icon.paths.map((d) => `<path d="${d}"/>`)
  if (variant === "animated") return [...(withCss ? [`<style>${motionCss(motionKinds(icon), "always")}</style>`] : []), ...animatedLines(icon)]
  const shapes = solidShapes(icon)
  const fills = shapes.filter((shape) => shape.mode === "f" || shape.mode === "h")

  if (variant === "duotone") {
    return [...fills.map((shape) => `<path d="${shape.d}" fill="${paint}" fill-opacity="${DUOTONE_OPACITY}" stroke="none"/>`), ...icon.paths.map((d) => `<path d="${d}"/>`)]
  }

  if (variant === "solid") return [...maskLines(icon, maskId), ...solidLines(icon, paint, maskId)]

  const palette = paletteFor(icon, paint)
  if (variant === "colour") {
    return [
      ...fills.map((shape) => `<path d="${shape.d}" fill="${palette.light}" stroke="none"/>`),
      ...icon.paths.map((d, i) => `<path d="${d}" stroke="${shapes[i].mode === "c" || shapes[i].mode === "h" ? palette.accent : palette.dark}"/>`),
    ]
  }

  // 3D: a glossy tile with the Solid icon in white and a soft shadow below it.
  const [scale, x, y] = ON_TILE
  return [
    `<linearGradient id="${maskId}-tile" x1="0" y1="0" x2="0" y2="1">`,
    `<stop offset="0" stop-color="${palette.top}"/>`,
    `<stop offset="1" stop-color="${palette.bottom}"/>`,
    `</linearGradient>`,
    ...maskLines(icon, maskId),
    `<path d="${TILE_EDGE}" fill="${palette.depth}" stroke="none"/>`,
    `<path d="${TILE}" fill="url(#${maskId}-tile)" stroke="none"/>`,
    `<path d="${GLOSS}" fill="#fff" fill-opacity="${GLOSS_OPACITY}" stroke="none"/>`,
    `<g transform="translate(${x} ${y}) scale(${scale})">`,
    ...solidLines(icon, palette.depth, maskId, [`transform="translate(0 ${SHADOW_DROP})"`, `opacity="${SHADOW_OPACITY}"`], { explicitStroke: true }),
    ...solidLines(icon, "#fff", maskId, [], { explicitStroke: true }),
    `</g>`,
  ]
}

/** `still` draws the Animated style as its resting Outline frame, for formats that can't move. */
export function svgMarkup(icon: IconDef, styleIn: IconStyle, { forImage = false, still = false } = {}) {
  const style: IconStyle = still && styleIn.variant === "animated" ? { ...styleIn, variant: "outline" } : styleIn
  const colourful = isColourful(style.variant)
  const color = forImage && style.color === "currentColor" && !colourful ? style.resolvedColor : style.color
  const stroke = colourful ? paletteFor(icon, color).dark : color
  const background = style.background ? `<rect width="24" height="24" fill="${style.background}" stroke="none"/>` : ""
  const body = svgBody(icon, style.variant, color, `venusui-${icon.name}-${style.variant}`, { withCss: true }).join("")
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${style.size}" height="${style.size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${style.strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${background}${body}</svg>`
}

const JSX_ATTRS: Record<string, string> = { "fill-opacity": "fillOpacity", "stop-color": "stopColor", "stroke-width": "strokeWidth" }

/** `style="a-b:c;--d:e"` → a React style object. */
function jsxStyle(css: string) {
  const entries = css.split(";").filter(Boolean).map((rule) => {
    const [prop, ...rest] = rule.split(":")
    const key = prop.startsWith("--") ? JSON.stringify(prop) : prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
    return `${key}: ${JSON.stringify(rest.join(":"))}`
  })
  return `style={{ ${entries.join(", ")} } as React.CSSProperties}`
}

export function jsxSnippet(icon: IconDef, style: IconStyle) {
  const suffix = style.variant === "outline" ? "" : style.variant === "3d" ? "3D" : style.variant[0].toUpperCase() + style.variant.slice(1)
  const name = `${pascal(icon.name)}${suffix}Icon`
  const lines = svgBody(icon, style.variant, style.color, "__ID__", { withCss: true })
  const usesId = lines.some((line) => line.includes("__ID__"))
  const stroke = isColourful(style.variant) ? paletteFor(icon, style.color).dark : style.color
  const background = style.background ? [`<rect width="24" height="24" fill="${style.background}" stroke="none"/>`] : []
  let depth = 3
  const body = [...background, ...lines]
    .map((line) => {
      if (line.startsWith("<style>")) {
        const out = `${"  ".repeat(depth)}<style>{\`${line.slice(7, -8)}\`}</style>`
        return out
      }
      const jsx = line
        .replace(/ class="/g, ' className="')
        .replace(/ style="([^"]*)"/g, (_, css: string) => ` ${jsxStyle(css)}`)
        .replace(/([a-z]+-[a-z]+)=/g, (match, attr: string) => (JSX_ATTRS[attr] ? `${JSX_ATTRS[attr]}=` : match))
        .replace(/(\w+)="([^"]*__ID__[^"]*)"/g, (_, attr: string, value: string) => `${attr}={\`${value.replace(/__ID__/g, "${id}")}\`}`)
        .replace(/"\/>$/, '" />')
      if (jsx.startsWith("</")) depth--
      const out = `${"  ".repeat(depth)}${jsx}`
      if (!jsx.startsWith("</") && !jsx.endsWith("/>")) depth++
      return out
    })
    .join("\n")
  return `export function ${name}(props: React.ComponentProps<"svg">) {${usesId ? "\n  const id = React.useId()" : ""}
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={${style.size}}
      height={${style.size}}
      viewBox="0 0 24 24"
      fill="none"
      stroke="${stroke}"
      strokeWidth={${style.strokeWidth}}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
${body}
    </svg>
  )
}
`
}

export function dataUri(icon: IconDef, style: IconStyle) {
  return `data:image/svg+xml,${encodeURIComponent(svgMarkup(icon, style, { forImage: true }))}`
}

export type RasterType = "image/png" | "image/jpeg" | "image/webp"

/** Draws the icon on a canvas and encodes it. Rejects if the browser can't make that format. */
export async function rasterBlob(icon: IconDef, style: IconStyle, type: RasterType, size = style.size): Promise<Blob> {
  // Images can't move: the Animated style is saved as its resting frame.
  // JPEG has no transparency, so it always gets a background.
  const background = style.background ?? (type === "image/jpeg" ? "#ffffff" : null)
  const svg = svgMarkup(icon, { ...style, size, background }, { forImage: true, still: true })
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }))
  try {
    const image = new Image()
    image.decoding = "sync"
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve()
      image.onerror = () => reject(new Error("The icon couldn’t be drawn."))
      image.src = url
    })
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext("2d")
    if (!context) throw new Error("Your browser can’t draw images.")
    context.drawImage(image, 0, 0, size, size)
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, 0.92))
    if (!blob || blob.type !== type) throw new Error(`Your browser can’t make ${type.split("/")[1].toUpperCase()} files. Try PNG instead.`)
    return blob
  } finally {
    URL.revokeObjectURL(url)
  }
}

/** A Windows/browser .ico holding PNG images at several sizes. */
export async function icoBlob(icon: IconDef, style: IconStyle, sizes = [16, 32, 48, 256]) {
  const images = await Promise.all(sizes.map(async (size) => new Uint8Array(await (await rasterBlob(icon, style, "image/png", size)).arrayBuffer())))
  const header = 6 + 16 * sizes.length
  const total = header + images.reduce((sum, image) => sum + image.length, 0)
  const buffer = new Uint8Array(total)
  const view = new DataView(buffer.buffer)
  view.setUint16(0, 0, true)
  view.setUint16(2, 1, true)
  view.setUint16(4, sizes.length, true)
  let offset = header
  sizes.forEach((size, i) => {
    const entry = 6 + i * 16
    view.setUint8(entry, size >= 256 ? 0 : size)
    view.setUint8(entry + 1, size >= 256 ? 0 : size)
    view.setUint8(entry + 2, 0)
    view.setUint8(entry + 3, 0)
    view.setUint16(entry + 4, 1, true)
    view.setUint16(entry + 6, 32, true)
    view.setUint32(entry + 8, images[i].length, true)
    view.setUint32(entry + 12, offset, true)
    buffer.set(images[i], offset)
    offset += images[i].length
  })
  return new Blob([buffer], { type: "image/x-icon" })
}

// ---------------------------------------------------------------- PDF

type Point = [number, number]

/** Parses SVG path data into absolute cubic Bézier commands. */
function toCubicPath(d: string) {
  const tokens = d.match(/[a-zA-Z]|-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/g) ?? []
  const out: string[] = []
  let i = 0
  let command = ""
  let current: Point = [0, 0]
  let start: Point = [0, 0]
  let lastControl: Point | null = null
  const num = () => Number(tokens[i++])
  const f = (value: number) => String(Math.round(value * 1000) / 1000)
  const moveTo = (p: Point) => out.push(`${f(p[0])} ${f(p[1])} m`)
  const lineTo = (p: Point) => out.push(`${f(p[0])} ${f(p[1])} l`)
  const curveTo = (c1: Point, c2: Point, p: Point) => out.push(`${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p[0])} ${f(p[1])} c`)

  while (i < tokens.length) {
    if (/[a-zA-Z]/.test(tokens[i])) command = tokens[i++]
    const relative = command === command.toLowerCase()
    const at = (x: number, y: number): Point => (relative ? [current[0] + x, current[1] + y] : [x, y])
    switch (command.toUpperCase()) {
      case "M": {
        current = at(num(), num())
        start = current
        moveTo(current)
        command = relative ? "l" : "L"
        lastControl = null
        break
      }
      case "L":
        current = at(num(), num())
        lineTo(current)
        lastControl = null
        break
      case "H": {
        const x = num()
        current = [relative ? current[0] + x : x, current[1]]
        lineTo(current)
        lastControl = null
        break
      }
      case "V": {
        const y = num()
        current = [current[0], relative ? current[1] + y : y]
        lineTo(current)
        lastControl = null
        break
      }
      case "C": {
        const c1 = at(num(), num())
        const c2 = at(num(), num())
        const p = at(num(), num())
        curveTo(c1, c2, p)
        lastControl = c2
        current = p
        break
      }
      case "S": {
        const c1: Point = lastControl ? [2 * current[0] - lastControl[0], 2 * current[1] - lastControl[1]] : current
        const c2 = at(num(), num())
        const p = at(num(), num())
        curveTo(c1, c2, p)
        lastControl = c2
        current = p
        break
      }
      case "Q": {
        const q = at(num(), num())
        const p = at(num(), num())
        curveTo([current[0] + (2 / 3) * (q[0] - current[0]), current[1] + (2 / 3) * (q[1] - current[1])], [p[0] + (2 / 3) * (q[0] - p[0]), p[1] + (2 / 3) * (q[1] - p[1])], p)
        lastControl = null
        current = p
        break
      }
      case "A": {
        const rx = num()
        const ry = num()
        const rotation = num()
        const large = num()
        const sweep = num()
        const p = at(num(), num())
        for (const [c1, c2, end] of arcToCubics(current, p, rx, ry, rotation, large === 1, sweep === 1)) curveTo(c1, c2, end)
        lastControl = null
        current = p
        break
      }
      case "Z":
        out.push("h")
        current = start
        lastControl = null
        break
      default:
        i++
    }
  }
  return out.join("\n")
}

/** SVG endpoint arc → cubic Béziers (each covering at most 90°). */
function arcToCubics(from: Point, to: Point, rxIn: number, ryIn: number, rotationDeg: number, large: boolean, sweep: boolean): [Point, Point, Point][] {
  let rx = Math.abs(rxIn)
  let ry = Math.abs(ryIn)
  if (!rx || !ry || (from[0] === to[0] && from[1] === to[1])) return [[from, to, to]]
  const phi = (rotationDeg * Math.PI) / 180
  const cos = Math.cos(phi)
  const sin = Math.sin(phi)
  const dx = (from[0] - to[0]) / 2
  const dy = (from[1] - to[1]) / 2
  const x1 = cos * dx + sin * dy
  const y1 = -sin * dx + cos * dy
  const scale = (x1 * x1) / (rx * rx) + (y1 * y1) / (ry * ry)
  if (scale > 1) {
    rx *= Math.sqrt(scale)
    ry *= Math.sqrt(scale)
  }
  const sign = large === sweep ? -1 : 1
  const numerator = rx * rx * ry * ry - rx * rx * y1 * y1 - ry * ry * x1 * x1
  const factor = sign * Math.sqrt(Math.max(0, numerator / (rx * rx * y1 * y1 + ry * ry * x1 * x1)))
  const cx1 = (factor * rx * y1) / ry
  const cy1 = (-factor * ry * x1) / rx
  const cx = cos * cx1 - sin * cy1 + (from[0] + to[0]) / 2
  const cy = sin * cx1 + cos * cy1 + (from[1] + to[1]) / 2
  const angle = (ux: number, uy: number, vx: number, vy: number) => {
    const a = Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy)
    return a
  }
  const theta1 = angle(1, 0, (x1 - cx1) / rx, (y1 - cy1) / ry)
  let delta = angle((x1 - cx1) / rx, (y1 - cy1) / ry, (-x1 - cx1) / rx, (-y1 - cy1) / ry)
  if (!sweep && delta > 0) delta -= Math.PI * 2
  if (sweep && delta < 0) delta += Math.PI * 2
  const segments = Math.ceil(Math.abs(delta) / (Math.PI / 2))
  const step = delta / segments
  const k = (4 / 3) * Math.tan(step / 4)
  const point = (t: number): Point => [cx + rx * Math.cos(t) * cos - ry * Math.sin(t) * sin, cy + rx * Math.cos(t) * sin + ry * Math.sin(t) * cos]
  const derivative = (t: number): Point => [-rx * Math.sin(t) * cos - ry * Math.cos(t) * sin, -rx * Math.sin(t) * sin + ry * Math.cos(t) * cos]
  const result: [Point, Point, Point][] = []
  for (let s = 0; s < segments; s++) {
    const t1 = theta1 + s * step
    const t2 = t1 + step
    const p1 = point(t1)
    const p2 = point(t2)
    const d1 = derivative(t1)
    const d2 = derivative(t2)
    result.push([
      [p1[0] + k * d1[0], p1[1] + k * d1[1]],
      [p2[0] - k * d2[0], p2[1] - k * d2[1]],
      s === segments - 1 ? to : p2,
    ])
  }
  return result
}

function pdfColor(color: string) {
  const parsed = parseHex(color)
  if (parsed) return parsed.map((v) => (v / 255).toFixed(3)).join(" ")
  const canvas = document.createElement("canvas").getContext("2d")
  if (!canvas) return "0 0 0"
  canvas.fillStyle = "#000"
  canvas.fillStyle = color
  const normalized = parseHex(canvas.fillStyle)
  if (normalized) return normalized.map((v) => (v / 255).toFixed(3)).join(" ")
  const rgb = /rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/.exec(canvas.fillStyle)
  return rgb ? rgb.slice(1, 4).map((part) => (Number(part) / 255).toFixed(3)).join(" ") : "0 0 0"
}

/**
 * A one-page vector PDF of the icon, `size` points square. Every layer is
 * drawn from the page's own coordinates (so soft masks line up): Solid
 * cut-outs are luminosity soft masks, tints and gloss use /ca, and the 3D
 * tile is an axial shading.
 */
export function pdfBlob(icon: IconDef, styleIn: IconStyle) {
  // PDF can't move either: Animated is drawn as its resting Outline frame.
  const style: IconStyle = styleIn.variant === "animated" ? { ...styleIn, variant: "outline" } : styleIn
  const size = style.size
  const scale = size / 24
  const base = `${scale} 0 0 ${-scale} 0 ${size} cm`
  const colourful = isColourful(style.variant)
  const paint = style.color === "currentColor" && !colourful ? style.resolvedColor : style.color
  const objects = ["", "", "", "", ""]
  const add = (body: string) => objects.push(body)
  const states: string[] = []
  const shadings: string[] = []
  const alphas = new Map<number, string>()

  const alpha = (value: number) => {
    if (!alphas.has(value)) {
      const name = `A${alphas.size}`
      states.push(`/${name} ${add(`<< /Type /ExtGState /ca ${value} /CA ${value} >>`)} 0 R`)
      alphas.set(value, name)
    }
    return alphas.get(value)!
  }

  /** A soft mask that hides the icon's cut-outs, drawn with the same transforms as the icon. */
  const cutMask = (transforms: string[]) => {
    const { cuts } = solidParts(icon)
    if (!cuts.length) return null
    const content = [base, ...transforms, "1 g", "-4 -4 32 32 re", "f", "0 G", "0 g", `${style.strokeWidth} w`, "1 J", "1 j", ...cuts.map((shape) => `${toCubicPath(shape.d)}\n${shape.mode === "h" ? "B" : "S"}`)].join("\n")
    const form = add(`<< /Type /XObject /Subtype /Form /BBox [0 0 ${size} ${size}] /Group << /S /Transparency /CS /DeviceGray >> /Resources << >> /Length ${content.length} >>\nstream\n${content}\nendstream`)
    const name = `M${form}`
    states.push(`/${name} ${add(`<< /Type /ExtGState /SMask << /Type /Mask /S /Luminosity /G ${form} 0 R >> >>`)} 0 R`)
    return name
  }

  const pen = (color: string) => [`${pdfColor(color)} RG`, `${pdfColor(color)} rg`, `${style.strokeWidth} w`, "1 J", "1 j"]
  const blocks: string[] = []
  const block = (ops: string[], { mask, opacity, transforms = [] }: { mask?: string | null; opacity?: number; transforms?: string[] } = {}) => {
    blocks.push(["q", ...(mask ? [`/${mask} gs`] : []), ...(opacity !== undefined ? [`/${alpha(opacity)} gs`] : []), base, ...transforms, ...ops, "Q"].join("\n"))
  }

  const shapes = solidShapes(icon)
  const fills = shapes.filter((shape) => shape.mode === "f" || shape.mode === "h")
  const solidOps = (color: string) => [...pen(color), ...solidParts(icon).drawn.map((shape) => `${toCubicPath(shape.d)}\n${shape.mode === "f" ? "B" : "S"}`)]
  const outlineOps = icon.paths.map((d) => `${toCubicPath(d)}\nS`)

  if (style.background) block([`${pdfColor(style.background)} rg`, "0 0 24 24 re", "f"])

  if (style.variant === "outline") block([...pen(paint), ...outlineOps])
  if (style.variant === "duotone") {
    block([`${pdfColor(paint)} rg`, ...fills.map((shape) => `${toCubicPath(shape.d)}\nf`)], { opacity: DUOTONE_OPACITY })
    block([...pen(paint), ...outlineOps])
  }
  if (style.variant === "solid") block(solidOps(paint), { mask: cutMask([]) })

  const palette = paletteFor(icon, paint)
  if (style.variant === "colour") {
    block([`${pdfColor(palette.light)} rg`, ...fills.map((shape) => `${toCubicPath(shape.d)}\nf`)])
    block([
      `${style.strokeWidth} w`,
      "1 J",
      "1 j",
      ...icon.paths.map((d, i) => `${pdfColor(shapes[i].mode === "c" || shapes[i].mode === "h" ? palette.accent : palette.dark)} RG\n${toCubicPath(d)}\nS`),
    ])
  }
  if (style.variant === "3d") {
    const shading = add(`<< /ShadingType 2 /ColorSpace /DeviceRGB /Coords [0 1.5 0 22] /Function << /FunctionType 2 /Domain [0 1] /C0 [${pdfColor(palette.top)}] /C1 [${pdfColor(palette.bottom)}] /N 1 >> /Extend [true true] >>`)
    shadings.push(`/Tile ${shading} 0 R`)
    const [s, x, y] = ON_TILE
    const onTile = `${s} 0 0 ${s} ${x} ${y} cm`
    const drop = `1 0 0 1 0 ${SHADOW_DROP} cm`
    block([`${pdfColor(palette.depth)} rg`, `${toCubicPath(TILE_EDGE)}\nf`])
    block([`${toCubicPath(TILE)}\nW n`, "/Tile sh"])
    block(["1 1 1 rg", `${toCubicPath(GLOSS)}\nf`], { opacity: GLOSS_OPACITY })
    block(solidOps(palette.depth), { mask: cutMask([onTile, drop]), opacity: SHADOW_OPACITY, transforms: [onTile, drop] })
    block(solidOps("#ffffff"), { mask: cutMask([onTile]), transforms: [onTile] })
  }

  const content = blocks.join("\n")
  const resources = [states.length ? `/ExtGState << ${states.join(" ")} >>` : "", shadings.length ? `/Shading << ${shadings.join(" ")} >>` : ""].filter(Boolean).join(" ")
  objects[0] = "<< /Type /Catalog /Pages 2 0 R >>"
  objects[1] = "<< /Type /Pages /Kids [3 0 R] /Count 1 >>"
  objects[2] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${size} ${size}] /Contents 4 0 R /Resources << ${resources} >> >>`
  objects[3] = `<< /Length ${content.length} >>\nstream\n${content}\nendstream`
  objects[4] = `<< /Title (${icon.title} icon) /Producer (VenusUI Icons) >>`

  let pdf = "%PDF-1.4\n"
  const offsets: number[] = []
  objects.forEach((body, index) => {
    offsets.push(pdf.length)
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`
  })
  const xref = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("")}`
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info 5 0 R >>\nstartxref\n${xref}\n%%EOF\n`
  return new Blob([pdf], { type: "application/pdf" })
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.append(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
