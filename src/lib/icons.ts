/**
 * VenusUI Icons: an original outline set on a 24 × 24 grid, drawn with a
 * 2px round stroke and a 2px safe margin. Every icon is a list of SVG path
 * strings (circles and rectangles included), so the page can export them to
 * SVG, raster images and vector PDF from one source.
 */

/**
 * How a path is drawn in the Solid style:
 * - "f" filled (and stroked, so corners stay round)
 * - "s" stroked, as in the outline
 * - "c" cut: its stroke is knocked out of the filled shapes
 * - "h" hole: filled and stroked as a cut-out
 */
export type SolidMode = "f" | "s" | "c" | "h"

/** One part of the Solid version: a mode for the outline path at the same index, or a replacement shape. */
export type SolidPart = SolidMode | { d: string; mode: SolidMode }

export interface IconDef {
  name: string
  title: string
  category: IconCategory
  /** Extra words people might search for. */
  tags: string[]
  paths: string[]
  /**
   * Solid style, one entry per path. Without it, closed paths (ending in
   * "z") are filled and open ones stay as strokes.
   */
  solid?: SolidPart[]
}

export interface SolidShape {
  d: string
  mode: SolidMode
}

const isClosed = (d: string) => /z\s*$/i.test(d)

/** The Solid version of an icon as shapes with a drawing mode. */
export function solidShapes(icon: IconDef): SolidShape[] {
  return icon.paths.map((d, i) => {
    const part = icon.solid?.[i]
    if (part && typeof part === "object") return part
    return { d, mode: part ?? (isClosed(d) ? "f" : "s") }
  })
}

export const ICON_CATEGORIES = [
  "Interface",
  "Arrows",
  "Communication",
  "Media",
  "Files",
  "Commerce",
  "Weather",
  "Devices",
  "Everyday",
  "Development",
  "Finance",
  "Social",
  "Health",
  "Travel",
] as const
export type IconCategory = (typeof ICON_CATEGORIES)[number]

const n = (value: number) => String(Math.round(value * 100) / 100)

/** A circle as a path (two arcs). */
function circle(cx: number, cy: number, r: number) {
  return `M${n(cx - r)} ${n(cy)}a${n(r)} ${n(r)} 0 1 0 ${n(r * 2)} 0a${n(r)} ${n(r)} 0 1 0 ${n(-r * 2)} 0z`
}

/** A rounded rectangle as a path. */
function rect(x: number, y: number, w: number, h: number, r = 0) {
  if (!r) return `M${n(x)} ${n(y)}h${n(w)}v${n(h)}h${n(-w)}z`
  const a = `a${n(r)} ${n(r)} 0 0 1`
  return `M${n(x + r)} ${n(y)}h${n(w - 2 * r)}${a} ${n(r)} ${n(r)}v${n(h - 2 * r)}${a} ${n(-r)} ${n(r)}h${n(-(w - 2 * r))}${a} ${n(-r)} ${n(-r)}v${n(-(h - 2 * r))}${a} ${n(r)} ${n(-r)}z`
}

function line(x1: number, y1: number, x2: number, y2: number) {
  return `M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}`
}

const polar = (cx: number, cy: number, r: number, angle: number): [number, number] => [cx + r * Math.cos(angle), cy + r * Math.sin(angle)]

function polygon(points: [number, number][], closed = true) {
  return `M${points.map(([x, y]) => `${n(x)} ${n(y)}`).join("L")}${closed ? "z" : ""}`
}

function star(cx: number, cy: number, outer: number, inner: number, points = 5) {
  return polygon(Array.from({ length: points * 2 }, (_, i) => polar(cx, cy, i % 2 ? inner : outer, -Math.PI / 2 + (i * Math.PI) / points)))
}

function gear(cx: number, cy: number, outer: number, inner: number, teeth = 8) {
  const step = (Math.PI * 2) / teeth
  return polygon(
    Array.from({ length: teeth }).flatMap((_, i) => {
      const base = i * step
      return [polar(cx, cy, inner, base - step * 0.36), polar(cx, cy, outer, base - step * 0.2), polar(cx, cy, outer, base + step * 0.2), polar(cx, cy, inner, base + step * 0.36)]
    })
  )
}

function rays(cx: number, cy: number, from: number, to: number, count: number, offset = 0) {
  return Array.from({ length: count }, (_, i) => {
    const angle = offset + (i * Math.PI * 2) / count
    const [x1, y1] = polar(cx, cy, from, angle)
    const [x2, y2] = polar(cx, cy, to, angle)
    return line(x1, y1, x2, y2)
  })
}

function snowflake() {
  const paths: string[] = []
  for (let i = 0; i < 3; i++) {
    const angle = Math.PI / 2 + (i * Math.PI) / 3
    const [x1, y1] = polar(12, 12, 9, angle)
    const [x2, y2] = polar(12, 12, 9, angle + Math.PI)
    paths.push(line(x1, y1, x2, y2))
  }
  // A small V on each arm, opening outwards.
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 2 + (i * Math.PI) / 3
    const fork = polar(12, 12, 5, angle)
    paths.push(polygon([polar(fork[0], fork[1], 2.8, angle - 0.8), fork, polar(fork[0], fork[1], 2.8, angle + 0.8)], false))
  }
  return paths
}

const icon = (name: string, title: string, category: IconCategory, tags: string[], paths: string[], solid?: SolidPart[]): IconDef => ({ name, title, category, tags, paths, solid })

export const icons: IconDef[] = [
  // Interface
  icon("search", "Search", "Interface", ["find", "magnifier", "zoom"], [circle(10.5, 10.5, 6.5), line(15.2, 15.2, 20.5, 20.5)], ["s", "s"]),
  icon("home", "Home", "Interface", ["house", "start"], ["M3.5 10.5 12 3.8l8.5 6.7", "M5.8 9v11.2h12.4V9", "M10 20.2v-5.7h4v5.7"], [{ d: "M12 3.8 3.5 10.5h2.3v9.7h12.4v-9.7h2.3z", mode: "f" }, "s", { d: "M10 20.2v-5.7h4v5.7", mode: "c" }]),
  icon("settings", "Settings", "Interface", ["gear", "cog", "preferences"], [gear(12, 12, 9.2, 7, 8), circle(12, 12, 3)], ["f", "h"]),
  icon("user", "User", "Interface", ["person", "profile", "account"], [circle(12, 8, 3.8), "M4.8 20.5c.9-3.9 3.7-6 7.2-6s6.3 2.1 7.2 6"], ["f", { d: "M4.8 20.5c.9-3.9 3.7-6 7.2-6s6.3 2.1 7.2 6z", mode: "f" }]),
  icon("bell", "Bell", "Interface", ["notification", "alert"], ["M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z", "M10 21h4"]),
  icon("heart", "Heart", "Interface", ["like", "love", "favourite"], ["M12 20s-8-4.7-8-10.3a4.4 4.4 0 0 1 8-2.5 4.4 4.4 0 0 1 8 2.5C20 15.3 12 20 12 20z"]),
  icon("star", "Star", "Interface", ["rating", "favourite"], [star(12, 12.8, 9.2, 4.2)]),
  icon("check", "Check", "Interface", ["done", "tick", "success"], ["M4.8 12.6 9.4 17.2 19.2 7.2"]),
  icon("close", "Close", "Interface", ["x", "cancel", "remove"], [line(6, 6, 18, 18), line(18, 6, 6, 18)]),
  icon("plus", "Plus", "Interface", ["add", "new", "create"], [line(12, 5, 12, 19), line(5, 12, 19, 12)]),
  icon("menu", "Menu", "Interface", ["hamburger", "navigation"], [line(4, 7, 20, 7), line(4, 12, 20, 12), line(4, 17, 14, 17)]),
  icon("trash", "Trash", "Interface", ["delete", "bin", "remove"], ["M4 7h16", "M9 7V4.5h6V7", "M6 7l1 13.5h10L18 7", line(10, 11, 10, 16.5), line(14, 11, 14, 16.5)], ["s", "s", { d: "M6 7l1 13.5h10L18 7z", mode: "f" }, "c", "c"]),
  icon("edit", "Edit", "Interface", ["pencil", "write"], ["M15 4.5l4.5 4.5L9 19.5H4.5V15z", line(12.8, 6.7, 17.3, 11.2)], ["f", "c"]),
  icon("lock", "Lock", "Interface", ["secure", "password", "private"], [rect(5, 10.5, 14, 10, 2), "M8 10.5V8a4 4 0 0 1 8 0v2.5", line(12, 14.5, 12, 16.5)], ["f", "s", "c"]),
  icon("eye", "Eye", "Interface", ["view", "show", "visible"], ["M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z", circle(12, 12, 3)], ["f", "c"]),
  icon("filter", "Filter", "Interface", ["funnel", "sort"], ["M4 5h16l-6.2 7.6V19L10.2 20.5v-7.9z"]),

  // Arrows
  icon("arrow-right", "Arrow Right", "Arrows", ["next", "forward"], [line(4, 12, 20, 12), "M14 6l6 6-6 6"]),
  icon("arrow-left", "Arrow Left", "Arrows", ["back", "previous"], [line(20, 12, 4, 12), "M10 6l-6 6 6 6"]),
  icon("arrow-up", "Arrow Up", "Arrows", ["top", "rise"], [line(12, 20, 12, 4), "M6 10l6-6 6 6"]),
  icon("arrow-down", "Arrow Down", "Arrows", ["bottom", "fall"], [line(12, 4, 12, 20), "M6 14l6 6 6-6"]),
  icon("chevron-right", "Chevron Right", "Arrows", ["next", "caret"], ["M9 5.5l6.5 6.5L9 18.5"]),
  icon("chevron-down", "Chevron Down", "Arrows", ["expand", "caret", "dropdown"], ["M5.5 9l6.5 6.5L18.5 9"]),
  icon("refresh", "Refresh", "Arrows", ["reload", "sync", "repeat"], ["M19.5 12a7.5 7.5 0 1 1-2.2-5.3l2.2 2.1", "M19.5 4.3v4.5H15"]),
  icon("external-link", "External Link", "Arrows", ["open", "new tab"], ["M14 4h6v6", line(20, 4, 11, 13), "M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"]),
  icon("download", "Download", "Arrows", ["save", "get"], [line(12, 4, 12, 15), "M7 10.5l5 5 5-5", "M4.5 20h15"]),
  icon("upload", "Upload", "Arrows", ["send", "share"], [line(12, 15, 12, 4), "M7 8.5l5-5 5 5", "M4.5 20h15"]),

  // Communication
  icon("mail", "Mail", "Communication", ["email", "envelope", "inbox"], [rect(3, 5.5, 18, 13, 2), "M3.6 7.2 12 13.2l8.4-6"], ["f", "c"]),
  icon("chat", "Chat", "Communication", ["message", "comment", "bubble"], ["M5 4.5h14a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1h-8l-4.5 3.8V16H5a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1z", line(8, 9, 16, 9), line(8, 12, 13, 12)], ["f", "c", "c"]),
  icon("phone", "Phone", "Communication", ["call", "telephone"], ["M8.6 3.6 6.1 4.3A2 2 0 0 0 4.7 6.5c.9 7 6 12 12.9 12.9a2 2 0 0 0 2.2-1.4l.7-2.5-4.1-2-2 1.8a10.8 10.8 0 0 1-5-5l1.8-2z"]),
  icon("send", "Send", "Communication", ["paper plane", "submit"], ["M20.5 3.5 3.5 10.5l7 3 3 7z", line(20.5, 3.5, 10.5, 13.5)], ["f", "c"]),
  icon("at-sign", "At Sign", "Communication", ["email", "mention", "handle"], [circle(12, 12, 3.6), "M15.6 12v1.4a2.5 2.5 0 0 0 5 0V12a8.6 8.6 0 1 0-3.4 6.9"]),
  icon("share", "Share", "Communication", ["network", "connect"], [circle(17, 5.5, 2.5), circle(7, 12, 2.5), circle(17, 18.5, 2.5), line(9.2, 10.8, 14.8, 6.7), line(9.2, 13.2, 14.8, 17.3)]),
  icon("bookmark", "Bookmark", "Communication", ["save", "read later"], ["M6.5 3.5h11v17L12 16.5l-5.5 4z"]),
  icon("globe", "Globe", "Communication", ["world", "internet", "language"], [circle(12, 12, 8.6), "M3.4 12h17.2", "M12 3.4c2.4 2.4 3.6 5.3 3.6 8.6s-1.2 6.2-3.6 8.6c-2.4-2.4-3.6-5.3-3.6-8.6S9.6 5.8 12 3.4z"], ["f", "c", "c"]),

  // Media
  icon("play", "Play", "Media", ["start", "video", "audio"], ["M8 5.2v13.6L18.6 12z"]),
  icon("pause", "Pause", "Media", ["stop", "hold"], [rect(6.5, 5, 3.5, 14, 1), rect(14, 5, 3.5, 14, 1)]),
  icon("music", "Music", "Media", ["note", "song", "audio"], ["M9 18V6l11-2.5v12", circle(6.5, 18, 2.5), circle(17.5, 15.5, 2.5)]),
  icon("camera", "Camera", "Media", ["photo", "picture"], ["M4 7.8h3l1.8-2.5h6.4L17 7.8h3a1 1 0 0 1 1 1v9.9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.8a1 1 0 0 1 1-1z", circle(12, 13.2, 3.6)], ["f", "c"]),
  icon("image", "Image", "Media", ["photo", "picture", "gallery"], [rect(3.5, 4.5, 17, 15, 2), circle(9, 9.5, 1.6), "M20.5 15.5 15.5 11 6 19.5"], ["f", "h", "c"]),
  icon("video", "Video", "Media", ["film", "camera", "record"], [rect(3, 6.5, 13, 11, 2), "M16 10.5l5-3v9l-5-3"], ["f", { d: "M16 10.5l5-3v9l-5-3z", mode: "f" }]),
  icon("mic", "Microphone", "Media", ["voice", "record", "audio"], [rect(9, 3, 6, 11, 3), "M5.5 11a6.5 6.5 0 0 0 13 0", line(12, 17.5, 12, 21)]),
  icon("volume", "Volume", "Media", ["sound", "speaker", "audio"], ["M4 9.5h3.5L12 5.5v13l-4.5-4H4z", "M15.5 9a4 4 0 0 1 0 6", "M18 6.5a7.5 7.5 0 0 1 0 11"]),

  // Files
  icon("file", "File", "Files", ["document", "page"], ["M6 3.5h8l4.5 4.5v12.5H6z", "M14 3.5V8h4.5"], ["f", "c"]),
  icon("folder", "Folder", "Files", ["directory", "files"], ["M3.5 6.5a1 1 0 0 1 1-1h5l2 2.5h8a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z"]),
  icon("clipboard", "Clipboard", "Files", ["paste", "list", "notes"], [rect(5, 4.5, 14, 16.5, 2), rect(9, 3, 6, 3, 1), line(9, 11, 15, 11), line(9, 15, 13.5, 15)], ["f", "c", "c", "c"]),
  icon("copy", "Copy", "Files", ["duplicate", "clone"], [rect(8, 8, 12.5, 12.5, 2), "M16 8V5.5a2 2 0 0 0-2-2H5.5a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2H8"]),
  icon("paperclip", "Paperclip", "Files", ["attach", "attachment"], ["M19.6 11.6 12 19.2a5 5 0 0 1-7.1-7.1l8.2-8.2a3.4 3.4 0 0 1 4.8 4.8l-8 8a1.7 1.7 0 0 1-2.4-2.4l7.3-7.3"]),
  icon("archive", "Archive", "Files", ["box", "storage"], [rect(3, 4, 18, 4.5, 1), "M5 8.5v10.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5", line(10, 12.5, 14, 12.5)], ["f", { d: "M5 8.5v10.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5z", mode: "f" }, "c"]),

  // Commerce
  icon("cart", "Cart", "Commerce", ["shopping", "basket", "buy"], ["M3 4h2.5l2.2 11h10.6l2-8H6.9", circle(9, 19.5, 1.5), circle(17, 19.5, 1.5)]),
  icon("bag", "Bag", "Commerce", ["shopping", "store", "buy"], ["M5 8h14l-1 12.5H6z", "M9 10.5V7a3 3 0 0 1 6 0v3.5"]),
  icon("credit-card", "Credit Card", "Commerce", ["payment", "card", "pay"], [rect(2.5, 5.5, 19, 13, 2), line(2.5, 10, 21.5, 10), line(6, 14.5, 10, 14.5)], ["f", "c", "c"]),
  icon("tag", "Tag", "Commerce", ["price", "label", "sale"], ["M3.5 3.5H11l9.5 9.5-7.5 7.5-9.5-9.5z", circle(8, 8, 1.5)], ["f", "h"]),
  icon("gift", "Gift", "Commerce", ["present", "reward"], [rect(4, 8.5, 16, 4, 1), "M5.5 12.5V20h13v-7.5", line(12, 8.5, 12, 20), "M12 8.5C9.6 8.5 6.8 7.6 7.3 5.6S11 5 12 8.5z", "M12 8.5c2.4 0 5.2-.9 4.7-2.9S13 5 12 8.5z"], ["f", { d: "M5.5 12.5V20h13v-7.5z", mode: "f" }, "c", "f", "f"]),
  icon("receipt", "Receipt", "Commerce", ["bill", "invoice", "order"], ["M6 3.5h12v17l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5z", line(9, 8, 15, 8), line(9, 12, 15, 12), line(9, 16, 12.5, 16)], ["f", "c", "c", "c"]),

  // Weather
  icon("sun", "Sun", "Weather", ["light", "day", "bright"], [circle(12, 12, 4), ...rays(12, 12, 6.6, 9, 8)]),
  icon("moon", "Moon", "Weather", ["night", "dark mode"], ["M19.5 14.5A8 8 0 1 1 9.5 4.5a6.5 6.5 0 0 0 10 10z"]),
  icon("cloud", "Cloud", "Weather", ["overcast", "storage"], ["M7 18.5a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 10a4.3 4.3 0 0 1-.5 8.5z"]),
  icon("rain", "Rain", "Weather", ["shower", "drizzle"], ["M7 15a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 7.5a3.8 3.8 0 0 1-.5 7.5z", line(8.5, 18, 7.5, 20.5), line(12.5, 18, 11.5, 20.5), line(16.5, 18, 15.5, 20.5)]),
  icon("lightning", "Lightning", "Weather", ["bolt", "storm", "power", "fast"], ["M13.5 2.5 5 13.5h6.5l-1 8L19 10.5h-6.5z"]),
  icon("snowflake", "Snowflake", "Weather", ["snow", "winter", "cold"], snowflake()),

  // Devices
  icon("laptop", "Laptop", "Devices", ["computer", "notebook"], [rect(5, 5, 14, 10, 1.5), "M3 18.5h18l-1.5-3.5h-15z"]),
  icon("smartphone", "Smartphone", "Devices", ["mobile", "phone", "cell"], [rect(7, 2.5, 10, 19, 2.5), line(11, 18.5, 13, 18.5)], ["f", "c"]),
  icon("monitor", "Monitor", "Devices", ["screen", "desktop", "display"], [rect(3, 4, 18, 12, 1.5), line(12, 16, 12, 20), line(8, 20, 16, 20)]),
  icon("watch", "Watch", "Devices", ["smartwatch", "time"], [rect(7, 7, 10, 10, 2.5), "M9 7l.6-3.5h4.8L15 7", "M9 17l.6 3.5h4.8L15 17", "M12 9.8V12l1.6 1.1"], ["f", { d: "M9 7l.6-3.5h4.8L15 7z", mode: "f" }, { d: "M9 17l.6 3.5h4.8L15 17z", mode: "f" }, "c"]),
  icon("keyboard", "Keyboard", "Devices", ["type", "keys"], [rect(2.5, 6, 19, 12, 2), line(6, 10, 6.5, 10), line(9.5, 10, 10, 10), line(13.5, 10, 14, 10), line(17.5, 10, 18, 10), line(8, 14.2, 16, 14.2)], ["f", "c", "c", "c", "c", "c"]),
  icon("battery", "Battery", "Devices", ["power", "charge", "energy"], [rect(2.5, 7.5, 16.5, 9, 2), line(21.5, 10.5, 21.5, 13.5), line(6, 10.5, 6, 13.5), line(9, 10.5, 9, 13.5)], ["f", "s", "c", "c"]),

  // Everyday
  icon("calendar", "Calendar", "Everyday", ["date", "schedule", "event"], [rect(3.5, 5, 17, 15.5, 2), line(3.5, 9.5, 20.5, 9.5), line(8, 3, 8, 6.5), line(16, 3, 16, 6.5)], ["f", "c", "s", "s"]),
  icon("clock", "Clock", "Everyday", ["time", "hour", "watch"], [circle(12, 12, 8.6), "M12 7.5V12l3 2"], ["f", "c"]),
  icon("map-pin", "Map Pin", "Everyday", ["location", "place", "marker"], ["M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z", circle(12, 10, 2.5)], ["f", "h"]),
  icon("leaf", "Leaf", "Everyday", ["nature", "eco", "plant"], ["M5 19C5 10 10 5 19.5 4.5 19 14 14 19 5 19z", line(5, 19, 13, 11)], ["f", "c"]),
  icon("flame", "Flame", "Everyday", ["fire", "hot", "trending"], ["M12 21c-3.6 0-6-2.5-6-5.8 0-3.4 3-5.4 3.7-9.2 2 1.3 3.2 3.2 3.4 5 1-.8 1.6-2 1.7-3.4 2 1.7 3.2 4.3 3.2 7.6 0 3.3-2.4 5.8-6 5.8z"]),
  icon("sparkle", "Sparkle", "Everyday", ["magic", "ai", "new", "shine"], ["M11 3.5c.6 4.4 2.3 6.1 6.8 6.8-4.5.6-6.2 2.3-6.8 6.8-.6-4.5-2.3-6.2-6.8-6.8 4.5-.7 6.2-2.4 6.8-6.8z", line(18.5, 15.5, 18.5, 20.5), line(16, 18, 21, 18)]),
  icon("venus", "Venus", "Everyday", ["female", "symbol", "venusui"], [circle(12, 9, 5.5), line(12, 14.5, 12, 21), line(9, 18, 15, 18)], ["s", "s", "s"]),

  // Development
  icon("code", "Code", "Development", ["html", "brackets", "developer", "source"], ["M8.5 7 3.5 12l5 5", "M15.5 7l5 5-5 5", line(13.6, 5, 10.4, 19)]),
  icon("terminal", "Terminal", "Development", ["console", "command line", "shell", "cli"], [rect(2.5, 4, 19, 16, 2), "M6.5 9l3 3-3 3", line(12, 15, 17, 15)], ["f", "c", "c"]),
  icon("git-branch", "Git Branch", "Development", ["version control", "fork"], [circle(6, 5, 2.2), circle(6, 19, 2.2), circle(18, 6.5, 2.2), line(6, 7.2, 6, 16.8), "M18 8.7c0 5.3-12 3-12 8.1"]),
  icon("git-merge", "Git Merge", "Development", ["version control", "combine"], [circle(6, 5, 2.2), circle(6, 19, 2.2), circle(18, 14, 2.2), line(6, 7.2, 6, 16.8), "M6 7.2c0 4.5 3.8 6.8 9.8 6.8"]),
  icon("git-pull-request", "Pull Request", "Development", ["merge request", "review", "git"], [circle(6, 5, 2.2), circle(6, 19, 2.2), circle(18, 19, 2.2), line(6, 7.2, 6, 16.8), "M18 16.8V9a3 3 0 0 0-3-3h-4", "M13.5 3.5 11 6l2.5 2.5"]),
  icon("bug", "Bug", "Development", ["error", "debug", "issue", "insect"], ["M8 10.5a4 4 0 0 1 8 0V15a4 4 0 0 1-8 0z", "M9.5 7a2.5 2.5 0 0 1 5 0", line(12, 11, 12, 18.5), line(4, 12.5, 8, 12.5), line(16, 12.5, 20, 12.5), line(4.5, 18, 8.3, 16.3), line(19.5, 18, 15.7, 16.3), line(5, 7.5, 8.4, 9.3), line(19, 7.5, 15.6, 9.3)], ["f", "s", "c", "s", "s", "s", "s", "s", "s"]),
  icon("database", "Database", "Development", ["storage", "sql", "data"], ["M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3z", "M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6", "M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"], ["f", { d: "M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6c0 1.7-3.1 3-7 3S5 7.7 5 6z", mode: "f" }, "c"]),
  icon("server", "Server", "Development", ["hosting", "rack", "backend"], [rect(3, 4, 18, 7, 2), rect(3, 13, 18, 7, 2), line(7, 7.5, 7.5, 7.5), line(7, 16.5, 7.5, 16.5), line(11, 7.5, 17, 7.5), line(11, 16.5, 17, 16.5)], ["f", "f", "c", "c", "c", "c"]),
  icon("braces", "Braces", "Development", ["json", "api", "object", "curly"], ["M8 4H7a2 2 0 0 0-2 2v3.5A2.5 2.5 0 0 1 2.5 12 2.5 2.5 0 0 1 5 14.5V18a2 2 0 0 0 2 2h1", "M16 4h1a2 2 0 0 1 2 2v3.5a2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0-2.5 2.5V18a2 2 0 0 1-2 2h-1"]),
  icon("package", "Package", "Development", ["box", "npm", "module", "dependency"], ["M12 2.8 20 7v10l-8 4.2L4 17V7z", "M4 7l8 4.2L20 7", line(12, 11.2, 12, 21.2), line(8, 4.9, 16, 9.1)], ["f", "c", "c", "c"]),
  icon("rocket", "Rocket", "Development", ["deploy", "launch", "ship", "startup"], ["M12 2.5c3 2.2 4.5 5.5 4.5 9.5v4h-9v-4c0-4 1.5-7.3 4.5-9.5z", circle(12, 9.5, 1.8), "M7.5 12.5 5 15v4l2.5-1.5", "M16.5 12.5 19 15v4l-2.5-1.5", "M10 18.5c0 1.5 1 2.5 2 3.2 1-.7 2-1.7 2-3.2"], ["f", "h", { d: "M7.5 12.5 5 15v4l2.5-1.5z", mode: "f" }, { d: "M16.5 12.5 19 15v4l-2.5-1.5z", mode: "f" }, "s"]),
  icon("cpu", "CPU", "Development", ["chip", "processor", "hardware"], [rect(6, 6, 12, 12, 2), rect(9.5, 9.5, 5, 5, 1), line(9.5, 2.5, 9.5, 6), line(14.5, 2.5, 14.5, 6), line(9.5, 18, 9.5, 21.5), line(14.5, 18, 14.5, 21.5), line(2.5, 9.5, 6, 9.5), line(2.5, 14.5, 6, 14.5), line(18, 9.5, 21.5, 9.5), line(18, 14.5, 21.5, 14.5)], ["f", "h", "s", "s", "s", "s", "s", "s", "s", "s"]),
  icon("command", "Command", "Development", ["cmd", "mac", "shortcut", "keyboard"], ["M9 9V6.5A2.5 2.5 0 1 0 6.5 9h11A2.5 2.5 0 1 0 15 6.5v11a2.5 2.5 0 1 0 2.5-2.5h-11A2.5 2.5 0 1 0 9 17.5z"], ["s"]),
  icon("file-code", "Code File", "Development", ["source", "script", "document"], ["M6 3.5h8l4.5 4.5v12.5H6z", "M14 3.5V8h4.5", "M10.5 12.5l-2 2 2 2", "M14 12.5l2 2-2 2"], ["f", "c", "c", "c"]),
  icon("cloud-upload", "Cloud Upload", "Development", ["deploy", "sync", "backup"], ["M7 18.5a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 10a4.3 4.3 0 0 1-.5 8.5z", line(12, 17.5, 12, 11.5), "M9.5 14l2.5-2.5 2.5 2.5"], ["f", "c", "c"]),
  icon("key", "Key", "Development", ["password", "token", "auth", "secret"], [circle(8, 15.5, 4.2), line(11, 12.5, 19.5, 4), line(16, 7.5, 18.5, 10), line(18.5, 5, 21, 7.5), circle(7.2, 16.3, 1.1)], ["f", "s", "s", "s", "h"]),
  icon("shield-check", "Shield Check", "Development", ["security", "safe", "verified", "protected"], ["M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6z", "M8.8 12.2l2.2 2.2 4.4-4.6"], ["f", "c"]),
  // Finance
  icon("wallet", "Wallet", "Finance", ["money", "purse", "payment"], [rect(3, 6.5, 18, 13, 2.5), "M16 6.5V4.2a1 1 0 0 0-1.3-1L5.5 6.5", "M21 11h-3.5a2 2 0 0 0 0 4H21"], ["f", "s", "c"]),
  icon("coins", "Coins", "Finance", ["money", "cash", "savings"], [circle(9, 12, 6), "M12 6.8A6 6 0 1 1 12 17.2", circle(9, 12, 2.6)], ["f", "s", "c"]),
  icon("bank", "Bank", "Finance", ["finance", "building", "institution"], ["M3 9 12 4l9 5z", line(6, 11.5, 6, 16.5), line(10, 11.5, 10, 16.5), line(14, 11.5, 14, 16.5), line(18, 11.5, 18, 16.5), "M3.5 20h17"]),
  icon("piggy-bank", "Piggy Bank", "Finance", ["savings", "money", "save"], ["M5 11.5c0-3 2.9-5.5 7-5.5h1.5c3 0 5.5 1.7 6.3 4H21v4h-1.6c-.5 1-1.3 1.8-2.4 2.4V19h-3v-1.6h-3V19H8v-2.2A5 5 0 0 1 5 11.5z", line(10, 9, 14, 9), circle(16.6, 10.6, 0.6), "M5 11.5H3"], ["f", "c", "h", "s"]),
  icon("trend-up", "Trend Up", "Finance", ["growth", "increase", "chart", "stocks"], ["M3 17l6-6 4 4 8-8", "M15 7h6v6"]),
  icon("trend-down", "Trend Down", "Finance", ["decline", "decrease", "chart", "stocks"], ["M3 7l6 6 4-4 8 8", "M15 17h6v-6"]),
  icon("pie-chart", "Pie Chart", "Finance", ["analytics", "share", "report"], ["M11 4a8.5 8.5 0 1 0 9 9h-9z", "M14 3.2a8 8 0 0 1 6.8 6.8H14z"]),
  icon("bar-chart", "Bar Chart", "Finance", ["analytics", "stats", "report"], [rect(4, 13, 4, 7, 1), rect(10, 5, 4, 15, 1), rect(16, 9, 4, 11, 1)]),
  icon("dollar", "Dollar", "Finance", ["usd", "money", "currency", "price"], [line(12, 3, 12, 21), "M16.5 7.5c-.5-1.4-2-2.5-4.5-2.5-2.6 0-4.5 1.3-4.5 3.3 0 4.7 9 2.4 9 7.2 0 2-1.9 3.5-4.5 3.5-2.6 0-4.1-1.1-4.6-2.6"]),
  icon("euro", "Euro", "Finance", ["eur", "money", "currency"], ["M17 6.2A7 7 0 1 0 17 17.8", line(4, 10, 13, 10), line(4, 14, 13, 14)]),
  icon("exchange", "Exchange", "Finance", ["swap", "convert", "transfer"], ["M4 8h15", "M15 4l4 4-4 4", "M20 16H5", "M9 12l-4 4 4 4"]),
  icon("percent", "Percent", "Finance", ["discount", "sale", "rate"], [line(19, 5, 5, 19), circle(6.5, 6.5, 2.5), circle(17.5, 17.5, 2.5)]),

  // Social
  icon("thumbs-up", "Thumbs Up", "Social", ["like", "approve", "good"], ["M7 10.5v10H4.5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1z", "M7 10.5l3.8-6.6a1.8 1.8 0 0 1 3.3 1.3L13.4 9h5.1a2 2 0 0 1 2 2.3l-1.2 7.4a2 2 0 0 1-2 1.8H7z"]),
  icon("thumbs-down", "Thumbs Down", "Social", ["dislike", "reject", "bad"], ["M7 13.5v-10H4.5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1z", "M7 13.5l3.8 6.6a1.8 1.8 0 0 0 3.3-1.3L13.4 15h5.1a2 2 0 0 0 2-2.3l-1.2-7.4a2 2 0 0 0-2-1.8H7z"]),
  icon("comment", "Comment", "Social", ["message", "reply", "bubble", "chat"], ["M12 3.5c4.7 0 8.5 3.4 8.5 7.6s-3.8 7.6-8.5 7.6c-1.1 0-2.2-.2-3.2-.5L4 20l1.4-3.9a7.2 7.2 0 0 1-1.9-5c0-4.2 3.8-7.6 8.5-7.6z", line(8.5, 11, 8.6, 11), line(12, 11, 12.1, 11), line(15.5, 11, 15.6, 11)], ["f", "c", "c", "c"]),
  icon("repost", "Repost", "Social", ["share", "retweet", "repeat"], ["M17 3.5l3 3-3 3", "M4 11.5v-1a4 4 0 0 1 4-4h12", "M7 20.5l-3-3 3-3", "M20 12.5v1a4 4 0 0 1-4 4H4"]),
  icon("user-plus", "Add User", "Social", ["invite", "follow", "new user"], [circle(9, 8, 3.6), "M2.8 20c.8-3.6 3.3-5.6 6.2-5.6s5.4 2 6.2 5.6", line(19, 8, 19, 14), line(16, 11, 22, 11)], ["f", { d: "M2.8 20c.8-3.6 3.3-5.6 6.2-5.6s5.4 2 6.2 5.6z", mode: "f" }, "s", "s"]),
  icon("users", "Users", "Social", ["team", "group", "people", "members"], [circle(9, 8, 3.6), "M2.8 20c.8-3.6 3.3-5.6 6.2-5.6s5.4 2 6.2 5.6", "M15.5 4.6a3.5 3.5 0 0 1 0 6.8", "M17.5 14.6c2 .6 3.4 2.4 3.9 5.4"], ["f", { d: "M2.8 20c.8-3.6 3.3-5.6 6.2-5.6s5.4 2 6.2 5.6z", mode: "f" }, "s", "s"]),
  icon("hashtag", "Hashtag", "Social", ["tag", "topic", "number"], [line(9.5, 4, 7.5, 20), line(16.5, 4, 14.5, 20), line(4, 9, 20, 9), line(3.5, 15, 19.5, 15)]),
  icon("link", "Link", "Social", ["url", "chain", "connect"], ["M10 14a4.2 4.2 0 0 0 6 0l3-3a4.2 4.2 0 0 0-6-6l-1 1", "M14 10a4.2 4.2 0 0 0-6 0l-3 3a4.2 4.2 0 0 0 6 6l1-1"]),
  icon("pin", "Pin", "Social", ["pushpin", "thumbtack", "save"], ["M8.5 3.5h7", "M10 3.5v5L7 13h10l-3-4.5v-5", line(12, 13, 12, 20.5)], ["s", { d: "M10 3.5v5L7 13h10l-3-4.5v-5z", mode: "f" }, "s"]),
  icon("flag", "Flag", "Social", ["report", "mark", "milestone"], [line(5, 21, 5, 3.5), "M5 4.5h11l-2.3 4.3L16 13H5z"], ["s", "f"]),
  icon("award", "Award", "Social", ["medal", "badge", "achievement", "prize"], [circle(12, 9, 5.5), "M8.8 13.5 7.5 21l4.5-2.5 4.5 2.5-1.3-7.5", circle(12, 9, 2.2)], ["f", { d: "M8.8 13.5 7.5 21l4.5-2.5 4.5 2.5-1.3-7.5z", mode: "f" }, "h"]),
  icon("smile", "Smile", "Social", ["happy", "emoji", "face", "feedback"], [circle(12, 12, 8.6), "M8.5 14.5a4.3 4.3 0 0 0 7 0", line(9, 9.5, 9.1, 9.5), line(15, 9.5, 15.1, 9.5)], ["f", "c", "c", "c"]),

  // Health
  icon("heart-pulse", "Heart Pulse", "Health", ["heartbeat", "health", "cardio", "vital"], ["M12 20s-8-4.7-8-10.3a4.4 4.4 0 0 1 8-2.5 4.4 4.4 0 0 1 8 2.5C20 15.3 12 20 12 20z", "M3.5 12H7l1.5-2.5 3 5L13 12h7.5"], ["f", "c"]),
  icon("pill", "Pill", "Health", ["medicine", "capsule", "drug", "pharmacy"], ["M4.32 13.32 13.32 4.32A4.5 4.5 0 0 1 19.68 10.68L10.68 19.68A4.5 4.5 0 0 1 4.32 13.32z", line(8.82, 8.82, 15.18, 15.18)], ["f", "c"]),
  icon("stethoscope", "Stethoscope", "Health", ["doctor", "medical", "checkup"], ["M5.5 3.5v5a4.5 4.5 0 0 0 9 0v-5", "M10 13v2.5a4.5 4.5 0 0 0 9 0V13", circle(19, 11, 2), "M4 3.5h3", "M13 3.5h3"], ["s", "s", "f", "s", "s"]),
  icon("first-aid", "First Aid", "Health", ["medical kit", "emergency", "health"], [rect(3, 6, 18, 14, 2), "M9 6V4.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V6", line(12, 10, 12, 16), line(9, 13, 15, 13)], ["f", "s", "c", "c"]),
  icon("thermometer", "Thermometer", "Health", ["temperature", "fever", "heat"], ["M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0z", line(12, 9, 12, 17), "M15.5 6.5h2", "M15.5 9.5h2"], ["f", "c", "s", "s"]),
  icon("activity", "Activity", "Health", ["pulse", "heartbeat", "monitor", "fitness"], ["M3 12h4l2.5-6 5 12 2.5-6h4"]),
  icon("dna", "DNA", "Health", ["genetics", "science", "biology", "helix"], ["M8 3c0 4.5 8 4.5 8 9s-8 4.5-8 9", "M16 3c0 4.5-8 4.5-8 9s8 4.5 8 9", line(9, 4.8, 15, 4.8), line(9, 12, 15, 12), line(9, 19.2, 15, 19.2)]),
  icon("hospital", "Hospital", "Health", ["clinic", "medical", "building"], [rect(4, 6, 16, 15, 1.5), line(12, 9, 12, 14), line(9.5, 11.5, 14.5, 11.5), "M10 21v-3.5h4V21"], ["f", "c", "c", "c"]),

  // Travel
  icon("plane", "Plane", "Travel", ["flight", "airplane", "trip", "airport"], ["M12 2.5c.9 0 1.5.8 1.5 1.8V9l7 4.2v2.3l-7-2v4.3l2.2 1.7V21L12 20.2 8.3 21v-1.5l2.2-1.7v-4.3l-7 2v-2.3l7-4.2V4.3c0-1 .6-1.8 1.5-1.8z"]),
  icon("car", "Car", "Travel", ["vehicle", "drive", "auto", "transport"], ["M4 15v-2.7l1.6-4.5A2 2 0 0 1 7.5 6.5h9a2 2 0 0 1 1.9 1.3l1.6 4.5V15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z", line(4.6, 11.5, 19.4, 11.5), circle(7.5, 18.4, 1.8), circle(16.5, 18.4, 1.8)], ["f", "c", "f", "f"]),
  icon("train", "Train", "Travel", ["rail", "metro", "transport", "subway"], [rect(5, 3, 14, 14, 3), line(5, 10, 19, 10), line(8.5, 13.5, 8.6, 13.5), line(15.4, 13.5, 15.5, 13.5), "M8 17l-2.5 4", "M16 17l2.5 4"], ["f", "c", "c", "c", "s", "s"]),
  icon("bike", "Bike", "Travel", ["bicycle", "cycling", "ride"], [circle(5.5, 16, 3.5), circle(18.5, 16, 3.5), "M5.5 16 9 9h7l2.5 7", "M9 9l3 7 4-7", "M7.5 6.5H11", "M16 9l-.8-3H17"], ["s", "s", "s", "s", "s", "s"]),
  icon("luggage", "Luggage", "Travel", ["suitcase", "baggage", "trip"], [rect(5, 7, 14, 13, 2), "M9 7V4.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V7", line(9.5, 7, 9.5, 20), line(14.5, 7, 14.5, 20), line(8, 20, 8, 21), line(16, 20, 16, 21)], ["f", "s", "c", "c", "s", "s"]),
  icon("compass", "Compass", "Travel", ["direction", "navigation", "explore"], [circle(12, 12, 8.6), "M15.5 8.5l-2 5-5 2 2-5z"], ["f", "h"]),
  icon("map", "Map", "Travel", ["navigation", "route", "location"], ["M3.5 6.5 9 4l6 2.5L20.5 4v13.5L15 20l-6-2.5-5.5 2.5z", line(9, 4, 9, 17.5), line(15, 6.5, 15, 20)], ["f", "c", "c"]),
  icon("bed", "Bed", "Travel", ["hotel", "sleep", "stay", "room"], ["M3 19V6", "M3 15h18v4", "M21 15v-3a3 3 0 0 0-3-3h-7v6", circle(6.8, 11.6, 1.8)], ["s", "s", { d: "M21 15v-3a3 3 0 0 0-3-3h-7v6z", mode: "f" }, "f"]),
  icon("anchor", "Anchor", "Travel", ["ship", "port", "marine", "sea"], [circle(12, 5, 2), line(12, 7, 12, 21), line(8, 10.5, 16, 10.5), "M4.5 13.5a7.5 7.5 0 0 0 15 0", "M3 15.5l1.5-2 2 1.5", "M21 15.5l-1.5-2-2 1.5"], ["s", "s", "s", "s", "s", "s"]),
  icon("ticket", "Ticket", "Travel", ["pass", "event", "admission", "boarding"], ["M3 7.5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1V10a2 2 0 0 0 0 4v2.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V14a2 2 0 0 0 0-4z", line(15, 6.5, 15, 8), line(15, 11.25, 15, 12.75), line(15, 16, 15, 17.5)], ["f", "c", "c", "c"]),
]

export function getIcon(name: string) {
  return icons.find((item) => item.name === name)
}
