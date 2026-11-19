import type { IconDef } from "@/lib/icons"

/**
 * Turns an icon into every format the Icons page offers. SVG, JSX and data
 * URIs are strings; PNG, JPEG, WebP and ICO are drawn on a canvas in the
 * browser; PDF is written by hand as real vector paths.
 */

export interface IconStyle {
  /** Pixel size of downloads. */
  size: number
  /** CSS colour, or "currentColor" (resolved to `resolvedColor` for images). */
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

export function svgMarkup(icon: IconDef, style: IconStyle, { forImage = false } = {}) {
  const color = forImage && style.color === "currentColor" ? style.resolvedColor : style.color
  const background = style.background ? `<rect width="24" height="24" fill="${style.background}" stroke="none"/>` : ""
  const paths = icon.paths.map((d) => `<path d="${d}"/>`).join("")
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${style.size}" height="${style.size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${style.strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${background}${paths}</svg>`
}

export function jsxSnippet(icon: IconDef, style: IconStyle) {
  const name = iconComponentName(icon)
  const background = style.background ? `\n      <rect width="24" height="24" fill="${style.background}" stroke="none" />` : ""
  const paths = icon.paths.map((d) => `\n      <path d="${d}" />`).join("")
  return `export function ${name}(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={${style.size}}
      height={${style.size}}
      viewBox="0 0 24 24"
      fill="none"
      stroke="${style.color}"
      strokeWidth={${style.strokeWidth}}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >${background}${paths}
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
  // JPEG has no transparency, so it always gets a background.
  const background = style.background ?? (type === "image/jpeg" ? "#ffffff" : null)
  const svg = svgMarkup(icon, { ...style, size, background }, { forImage: true })
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
  const canvas = document.createElement("canvas").getContext("2d")
  if (!canvas) return "0 0 0"
  canvas.fillStyle = "#000"
  canvas.fillStyle = color
  const hex = canvas.fillStyle
  const match = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex)
  if (match) return match.slice(1).map((part) => (parseInt(part, 16) / 255).toFixed(3)).join(" ")
  const rgb = /rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/.exec(hex)
  return rgb ? rgb.slice(1, 4).map((part) => (Number(part) / 255).toFixed(3)).join(" ") : "0 0 0"
}

/** A one-page vector PDF of the icon, `size` points square. */
export function pdfBlob(icon: IconDef, style: IconStyle) {
  const color = style.color === "currentColor" ? style.resolvedColor : style.color
  const scale = style.size / 24
  const content = [
    "q",
    `${scale} 0 0 ${-scale} 0 ${style.size} cm`,
    ...(style.background ? [`${pdfColor(style.background)} rg`, "0 0 24 24 re", "f"] : []),
    `${pdfColor(color)} RG`,
    `${style.strokeWidth} w`,
    "1 J",
    "1 j",
    ...icon.paths.map((d) => `${toCubicPath(d)}\nS`),
    "Q",
  ].join("\n")
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${style.size} ${style.size}] /Contents 4 0 R /Resources << >> >>`,
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    `<< /Title (${icon.title} icon) /Producer (VenusUI Icons) >>`,
  ]
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
