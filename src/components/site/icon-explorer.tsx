"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { ICON_CATEGORIES, type IconDef } from "@/lib/icons"
import { ALL_MOTION_KINDS, motionCss } from "@/lib/icon-motion"
import {
  dataUri,
  downloadBlob,
  icoBlob,
  iconComponentName,
  jsxSnippet,
  pdfBlob,
  ICON_VARIANTS,
  isColourful,
  rasterBlob,
  svgBody,
  svgMarkup,
  type IconStyle,
  type IconVariant,
} from "@/lib/icon-export"

const SIZES = [16, 24, 32, 48, 64, 128, 256, 512]
const COLORS = [
  { value: "currentColor", label: "Text colour" },
  { value: "#0a0a0a", label: "Black" },
  { value: "#ffffff", label: "White" },
  { value: "#7c3aed", label: "Violet" },
  { value: "#2563eb", label: "Blue" },
  { value: "#059669", label: "Green" },
  { value: "#e11d48", label: "Red" },
  { value: "#f59e0b", label: "Amber" },
]
const BACKGROUNDS = [
  { value: null, label: "None" },
  { value: "#ffffff", label: "White" },
  { value: "#0a0a0a", label: "Black" },
]
const MOTION_CSS = motionCss(ALL_MOTION_KINDS, "page")
const CHECKERBOARD = "bg-[conic-gradient(var(--muted)_25%,transparent_0_50%,var(--muted)_0_75%,transparent_0)] bg-size-[16px_16px]"

/** Draws one of our icons inline, in any style. */
export function IconGlyph({
  icon,
  variant = "outline",
  paint = "currentColor",
  strokeWidth = 2,
  className,
  ...props
}: { icon: IconDef; variant?: IconVariant; paint?: string; strokeWidth?: number } & Omit<React.ComponentProps<"svg">, "children" | "dangerouslySetInnerHTML">) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "")
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-6", className)}
      // The markup comes from our own icon data, never from user input.
      dangerouslySetInnerHTML={{ __html: svgBody(icon, variant, paint, `i${id}`).join("") }}
      {...props}
    />
  )
}

interface ExplorerProps {
  icons: IconDef[]
  initialIcon?: string | null
  initialQuery?: string
  initialVariant?: IconVariant
}

/** Reads `?icon=` and `?q=` so a link can open a specific icon or search. */
export function IconExplorerFromUrl({ icons }: { icons: IconDef[] }) {
  const params = useSearchParams()
  const variant = ICON_VARIANTS.find((item) => item.value === params.get("style"))?.value
  return <IconExplorer icons={icons} initialIcon={params.get("icon")} initialQuery={params.get("q") ?? ""} initialVariant={variant} />
}

export function IconExplorer({ icons, initialIcon = null, initialQuery = "", initialVariant = "outline" }: ExplorerProps) {
  const [query, setQuery] = React.useState(initialQuery)
  const [category, setCategory] = React.useState<string>("All")
  const [selected, setSelected] = React.useState(() => icons.find((icon) => icon.name === initialIcon) ?? icons[0])
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [style, setStyle] = React.useState<Omit<IconStyle, "resolvedColor">>({ variant: initialVariant, size: 64, color: "currentColor", strokeWidth: 2, background: null })

  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const shown = icons.filter((icon) => {
    if (category !== "All" && icon.category !== category) return false
    const haystack = `${icon.name} ${icon.title} ${icon.category} ${icon.tags.join(" ")}`.toLowerCase()
    return words.every((word) => haystack.includes(word))
  })
  const counts = Object.fromEntries(ICON_CATEGORIES.map((name) => [name, icons.filter((icon) => icon.category === name).length]))

  const remember = (key: string, value: string | null) => {
    const url = new URL(window.location.href)
    if (value) url.searchParams.set(key, value)
    else url.searchParams.delete(key)
    window.history.replaceState(null, "", url)
  }

  const choose = (icon: IconDef) => {
    setSelected(icon)
    remember("icon", icon.name)
    if (!window.matchMedia("(min-width: 1024px)").matches) setSheetOpen(true)
  }

  const chooseVariant = (variant: IconVariant) => {
    setStyle((current) => ({ ...current, variant }))
    remember("style", variant === "outline" ? null : variant)
  }

  return (
    <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
      {/* Motions for the Animated style, loaded once; they play on hover, focus or in the preview. */}
      <style>{MOTION_CSS}</style>
      <div className="min-w-0">
        <div role="radiogroup" aria-label="Icon style" className="mb-4 flex w-fit max-w-full overflow-x-auto rounded-lg bg-muted p-1 [scrollbar-width:none]">
          {ICON_VARIANTS.map((item) => (
            <button
              key={item.value}
              type="button"
              role="radio"
              aria-checked={style.variant === item.value}
              tabIndex={style.variant === item.value ? 0 : -1}
              onClick={() => chooseVariant(item.value)}
              onKeyDown={(event) => {
                const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0
                if (!step) return
                event.preventDefault()
                const index = ICON_VARIANTS.findIndex((variant) => variant.value === style.variant)
                const next = ICON_VARIANTS[(index + step + ICON_VARIANTS.length) % ICON_VARIANTS.length]
                chooseVariant(next.value)
                const group = event.currentTarget.parentElement
                requestAnimationFrame(() => group?.querySelector<HTMLButtonElement>("[aria-checked=true]")?.focus())
              }}
              className="vi-hover flex shrink-0 items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-foreground/70 outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-checked:bg-background aria-checked:text-foreground aria-checked:shadow-sm"
            >
              <IconGlyph icon={selected} variant={item.value} className="size-4 max-sm:hidden" />
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search icons</span>
            <SearchGlyph icons={icons} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${icons.length} icons`}
              className="h-10 w-full rounded-lg border bg-background pr-3 pl-9 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </label>
          <p aria-live="polite" className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
            {shown.length} {shown.length === 1 ? "icon" : "icons"}
          </p>
        </div>

        <div role="group" aria-label="Category" className="mt-4 flex flex-wrap gap-1.5">
          {["All", ...ICON_CATEGORIES].map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
              className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background"
            >
              {name}
              <span className="ml-1.5 tabular-nums">{name === "All" ? icons.length : counts[name]}</span>
            </button>
          ))}
        </div>

        {shown.length ? (
          <ul className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(5.75rem,1fr))] gap-2">
            {shown.map((icon) => (
              <li key={icon.name}>
                <button
                  type="button"
                  aria-pressed={selected.name === icon.name}
                  aria-label={icon.title}
                  onClick={() => choose(icon)}
                  className="group vi-hover flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-xl border bg-card p-2 text-card-foreground outline-none transition-colors hover:border-foreground/30 focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:border-foreground aria-pressed:ring-1 aria-pressed:ring-foreground"
                >
                  <IconGlyph icon={icon} variant={style.variant} paint={isColourful(style.variant) ? style.color : "currentColor"} strokeWidth={style.strokeWidth} className="size-7 transition-transform group-hover:scale-110 motion-reduce:transition-none" />
                  <span className="w-full truncate text-center text-[11px] text-muted-foreground">{icon.name}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
            No icons match “{query}”.{" "}
            <button type="button" onClick={() => { setQuery(""); setCategory("All") }} className="text-foreground underline underline-offset-4">
              Show all
            </button>
          </div>
        )}
      </div>

      <aside aria-label={`${selected.title} icon`} className="max-lg:hidden lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-xl border bg-card p-5 text-card-foreground">
          <Inspector icon={selected} style={style} onStyleChange={setStyle} />
        </div>
      </aside>

      <Dialog open={sheetOpen} onOpenChange={setSheetOpen}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto">
          <DialogHeader className="sr-only">
            <DialogTitle>{selected.title} icon</DialogTitle>
            <DialogDescription>Customize, copy or download this icon.</DialogDescription>
          </DialogHeader>
          <Inspector icon={selected} style={style} onStyleChange={setStyle} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

function SearchGlyph({ icons }: { icons: IconDef[] }) {
  const search = icons.find((icon) => icon.name === "search")
  return search ? <IconGlyph icon={search} className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" /> : null
}

interface InspectorProps {
  icon: IconDef
  style: Omit<IconStyle, "resolvedColor">
  onStyleChange: React.Dispatch<React.SetStateAction<Omit<IconStyle, "resolvedColor">>>
}

function Inspector({ icon, style, onStyleChange }: InspectorProps) {
  const preview = React.useRef<HTMLDivElement>(null)
  const [status, setStatus] = React.useState("")
  const [busy, setBusy] = React.useState<string | null>(null)
  const id = React.useId()
  const set = <K extends keyof typeof style>(key: K, value: (typeof style)[K]) => onStyleChange((current) => ({ ...current, [key]: value }))

  const fullStyle = (): IconStyle => ({ ...style, resolvedColor: preview.current ? getComputedStyle(preview.current).color : "#0a0a0a" })
  const file = (ext: string) => `venusui-${icon.name}${style.variant === "outline" ? "" : `-${style.variant}`}.${ext}`

  const copy = async (label: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setStatus(`${label} copied.`)
    } catch {
      setStatus("Your browser blocked copying. Select the text and copy it instead.")
    }
  }

  const download = async (format: string) => {
    setBusy(format)
    try {
      const current = fullStyle()
      if (format === "SVG") downloadBlob(new Blob([svgMarkup(icon, current, { forImage: true })], { type: "image/svg+xml" }), file("svg"))
      if (format === "PNG") downloadBlob(await rasterBlob(icon, current, "image/png"), file("png"))
      if (format === "JPEG") downloadBlob(await rasterBlob(icon, current, "image/jpeg"), file("jpg"))
      if (format === "WebP") downloadBlob(await rasterBlob(icon, current, "image/webp"), file("webp"))
      if (format === "ICO") downloadBlob(await icoBlob(icon, current), file("ico"))
      if (format === "PDF") downloadBlob(pdfBlob(icon, current), file("pdf"))
      setStatus(`${file(format === "JPEG" ? "jpg" : format.toLowerCase())} downloaded.`)
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "That download didn’t work. Please try again.")
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <div
          ref={preview}
          className={cn("grid aspect-[4/3] place-items-center rounded-lg border", style.background ? "" : CHECKERBOARD)}
          style={{ background: style.background ?? undefined, color: style.color === "currentColor" ? undefined : style.color }}
        >
          <IconGlyph icon={icon} variant={style.variant} paint={isColourful(style.variant) ? style.color : "currentColor"} strokeWidth={style.strokeWidth} className={cn("size-28", style.variant === "animated" && "vi-live")} />
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-3">
          <h2 className="font-medium">
            {icon.title} <span className="font-normal text-muted-foreground">· {ICON_VARIANTS.find((item) => item.value === style.variant)?.label}</span>
          </h2>
          <span className="font-mono text-xs text-muted-foreground">{iconComponentName(icon)}</span>
        </div>
      </div>

      <fieldset>
        <legend className="text-xs font-medium text-muted-foreground">Colour</legend>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {COLORS.map((color) => (
            <button
              key={color.value}
              type="button"
              aria-pressed={style.color === color.value}
              aria-label={color.value === "currentColor" && isColourful(style.variant) ? "By category" : color.label}
              title={color.value === "currentColor" && isColourful(style.variant) ? "By category" : color.label}
              onClick={() => set("color", color.value)}
              className="grid size-7 place-items-center rounded-full border outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:ring-2 aria-pressed:ring-foreground aria-pressed:ring-offset-2 aria-pressed:ring-offset-background"
              style={{ background: color.value === "currentColor" ? undefined : color.value }}
            >
              {color.value === "currentColor" ? (
                <span aria-hidden="true" className={cn("text-[10px] font-semibold", isColourful(style.variant) && "bg-[conic-gradient(#7c3aed,#2563eb,#059669,#d97706,#db2777,#7c3aed)] bg-clip-text text-transparent")}>
                  {isColourful(style.variant) ? "Auto" : "Aa"}
                </span>
              ) : null}
            </button>
          ))}
          <label className="relative grid size-7 cursor-pointer place-items-center overflow-hidden rounded-full border bg-[conic-gradient(red,yellow,lime,cyan,blue,magenta,red)] has-focus-visible:ring-3 has-focus-visible:ring-ring/50" title="Custom colour">
            <span className="sr-only">Custom colour</span>
            <input type="color" value={style.color.startsWith("#") ? style.color : "#7c3aed"} onChange={(event) => set("color", event.target.value)} className="absolute inset-0 size-full cursor-pointer opacity-0" />
          </label>
        </div>
      </fieldset>

      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-1.5">
          <span className="block text-xs font-medium text-muted-foreground">Size</span>
          <select value={style.size} onChange={(event) => set("size", Number(event.target.value))} className="h-9 w-full rounded-md border bg-background px-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
            {SIZES.map((size) => (
              <option key={size} value={size}>
                {size} × {size} px
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1.5">
          <span className="flex justify-between text-xs font-medium text-muted-foreground">
            Stroke <span className="font-mono tabular-nums">{style.strokeWidth}</span>
          </span>
          <input type="range" min={1} max={3} step={0.25} value={style.strokeWidth} onChange={(event) => set("strokeWidth", Number(event.target.value))} className="h-9 w-full accent-foreground" />
        </label>
      </div>

      <fieldset>
        <legend className="text-xs font-medium text-muted-foreground">Background</legend>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {BACKGROUNDS.map((background) => (
            <label key={background.label} className="cursor-pointer">
              <input type="radio" name={`${id}-bg`} className="peer sr-only" checked={style.background === background.value} onChange={() => set("background", background.value)} />
              <span className="block rounded-md border px-2.5 py-1 text-xs peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50">{background.label}</span>
            </label>
          ))}
          <label className="cursor-pointer">
            <input
              type="radio"
              name={`${id}-bg`}
              className="peer sr-only"
              checked={Boolean(style.background && !BACKGROUNDS.some((background) => background.value === style.background))}
              onChange={() => set("background", "#ede9fe")}
            />
            <span className="block rounded-md border px-2.5 py-1 text-xs peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50">Custom</span>
          </label>
          {style.background && !BACKGROUNDS.some((background) => background.value === style.background) ? (
            <input type="color" aria-label="Custom background colour" value={style.background} onChange={(event) => set("background", event.target.value)} className="h-7 w-9 cursor-pointer rounded border bg-transparent" />
          ) : null}
        </div>
      </fieldset>

      <div>
        <p className="text-xs font-medium text-muted-foreground">Copy</p>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          <Button type="button" variant="outline" size="sm" onClick={() => copy("SVG", svgMarkup(icon, fullStyle()))}>
            SVG
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => copy("React component", jsxSnippet(icon, fullStyle()))}>
            JSX
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => copy("Data URI", dataUri(icon, fullStyle()))}>
            Data URI
          </Button>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-muted-foreground">Download</p>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {["SVG", "PNG", "JPEG", "WebP", "ICO", "PDF"].map((format) => (
            <Button key={format} type="button" size="sm" disabled={busy !== null} aria-label={`Download ${format}`} onClick={() => download(format)}>
              {format}
            </Button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {style.variant === "animated"
            ? "SVG, JSX and the data URI animate on their own. PNG, JPEG, WebP, ICO and PDF can’t move, so they save the still frame."
            : `${style.size} px. ICO holds 16, 32, 48 and 256 px. PDF is vector. JPEG gets a white background if none is set.`}
        </p>
      </div>

      <p role="status" className="min-h-4 text-xs text-muted-foreground">
        {status}
      </p>
    </div>
  )
}
