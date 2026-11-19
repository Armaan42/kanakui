"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
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
    // On narrow screens the specimen sits above the grid: bring it into view.
    if (!window.matchMedia("(min-width: 1024px)").matches) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      document.getElementById("icon-specimen")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" })
    }
  }

  const chooseVariant = (variant: IconVariant) => {
    setStyle((current) => ({ ...current, variant }))
    remember("style", variant === "outline" ? null : variant)
  }

  return (
    <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1fr)_23rem]">
      {/* Motions for the Animated style, loaded once; they play on hover, focus or in the specimen. */}
      <style>{MOTION_CSS}</style>

      <aside id="icon-specimen" aria-label={`${selected.title} icon`} className="scroll-mt-20 lg:sticky lg:top-20 lg:order-last lg:self-start">
        <Specimen icon={selected} style={style} onStyleChange={setStyle} onVariant={chooseVariant} />
      </aside>

      <div className="min-w-0">
        <div className="flex items-center gap-3 border-b pb-3">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search icons</span>
            <SearchGlyph icons={icons} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${icons.length} icons`}
              className="h-9 w-full bg-transparent pr-2 pl-7 text-sm outline-none placeholder:text-muted-foreground focus-visible:placeholder:text-muted-foreground/60"
            />
          </label>
          <p aria-live="polite" className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
            {shown.length} {shown.length === 1 ? "icon" : "icons"}
          </p>
        </div>

        <div role="group" aria-label="Category" className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          {["All", ...ICON_CATEGORIES].map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
              className="rounded-sm py-1 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:font-medium aria-pressed:text-foreground"
            >
              {name}
              <sup className="ml-0.5 font-mono text-[10px] tabular-nums">{name === "All" ? icons.length : counts[name]}</sup>
            </button>
          ))}
        </div>

        {shown.length ? (
          <ul className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(4.5rem,1fr))] border-t border-l">
            {shown.map((icon) => (
              <li key={icon.name} className="border-r border-b">
                <button
                  type="button"
                  aria-pressed={selected.name === icon.name}
                  aria-label={icon.title}
                  onClick={() => choose(icon)}
                  className="group vi-hover relative flex aspect-square w-full items-center justify-center bg-background outline-none transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset aria-pressed:bg-muted"
                >
                  <IconGlyph icon={icon} variant={style.variant} paint={isColourful(style.variant) ? style.color : "currentColor"} strokeWidth={style.strokeWidth} className="size-6" />
                  <span aria-hidden="true" className="pointer-events-none absolute inset-x-1 bottom-1 truncate text-center text-[10px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 group-aria-pressed:text-foreground group-aria-pressed:opacity-100">
                    {icon.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-5 border border-dashed p-10 text-center text-sm text-muted-foreground">
            No icons match “{query}”.{" "}
            <button type="button" onClick={() => { setQuery(""); setCategory("All") }} className="text-foreground underline underline-offset-4">
              Show all
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function SearchGlyph({ icons }: { icons: IconDef[] }) {
  const search = icons.find((icon) => icon.name === "search")
  return search ? <IconGlyph icon={search} className="pointer-events-none absolute top-1/2 left-0.5 size-4 -translate-y-1/2 text-muted-foreground" /> : null
}

interface SpecimenProps {
  icon: IconDef
  style: Omit<IconStyle, "resolvedColor">
  onStyleChange: React.Dispatch<React.SetStateAction<Omit<IconStyle, "resolvedColor">>>
  onVariant: (variant: IconVariant) => void
}

const label = "text-[11px] font-medium tracking-wide text-muted-foreground uppercase"

/**
 * The selected icon in every style at once, like a type specimen. Picking a
 * style here sets it for the whole page; below are the controls, copy and
 * downloads.
 */
function Specimen({ icon, style, onStyleChange, onVariant }: SpecimenProps) {
  const sheet = React.useRef<HTMLDivElement>(null)
  const [status, setStatus] = React.useState("")
  const [busy, setBusy] = React.useState<string | null>(null)
  const id = React.useId()
  const set = <K extends keyof typeof style>(key: K, value: (typeof style)[K]) => onStyleChange((current) => ({ ...current, [key]: value }))

  const fullStyle = (): IconStyle => ({ ...style, resolvedColor: sheet.current ? getComputedStyle(sheet.current).color : "#0a0a0a" })
  const file = (ext: string) => `venusui-${icon.name}${style.variant === "outline" ? "" : `-${style.variant}`}.${ext}`
  const custom = Boolean(style.background && !BACKGROUNDS.some((background) => background.value === style.background))

  const copy = async (what: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setStatus(`${what} copied.`)
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
    <div className="overflow-hidden rounded-2xl border bg-card text-card-foreground">
      <div
        ref={sheet}
        role="radiogroup"
        aria-label="Icon style"
        className="grid grid-cols-3"
        style={{ color: style.color === "currentColor" ? undefined : style.color }}
      >
        {ICON_VARIANTS.map((item, index) => {
          const checked = style.variant === item.value
          return (
            <button
              key={item.value}
              type="button"
              role="radio"
              aria-checked={checked}
              aria-label={item.label}
              tabIndex={checked ? 0 : -1}
              onClick={() => onVariant(item.value)}
              onKeyDown={(event) => {
                const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0
                if (!step) return
                event.preventDefault()
                const next = ICON_VARIANTS[(index + step + ICON_VARIANTS.length) % ICON_VARIANTS.length]
                onVariant(next.value)
                const group = event.currentTarget.parentElement
                requestAnimationFrame(() => group?.querySelector<HTMLButtonElement>("[aria-checked=true]")?.focus())
              }}
              style={{ background: style.background ?? undefined }}
              className={cn(
                "group vi-hover relative flex flex-col items-center gap-3 border-b px-2 pt-6 pb-3 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                index % 3 !== 2 && "border-r",
                checked ? "bg-background" : "bg-muted/30 hover:bg-muted/60"
              )}
            >
              <IconGlyph
                icon={icon}
                variant={item.value}
                paint={isColourful(item.value) ? style.color : "currentColor"}
                strokeWidth={style.strokeWidth}
                className={cn("size-12", item.value === "animated" && "vi-live")}
              />
              <span className={cn("text-xs", checked ? "font-medium text-foreground" : "text-muted-foreground")}>{item.label}</span>
              {checked ? <span aria-hidden="true" className="absolute inset-x-5 bottom-0 h-0.5 rounded-full bg-foreground" /> : null}
            </button>
          )
        })}
      </div>

      <div className="space-y-5 p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 className="text-lg font-semibold tracking-tight">
            {icon.title} <span className="text-sm font-normal text-muted-foreground">· {ICON_VARIANTS.find((item) => item.value === style.variant)?.label}</span>
          </h2>
          <code className="font-mono text-xs text-muted-foreground">{iconComponentName(icon)}</code>
        </div>

        <fieldset>
          <legend className={label}>Colour</legend>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {COLORS.map((color) => (
              <button
                key={color.value}
                type="button"
                aria-pressed={style.color === color.value}
                aria-label={color.value === "currentColor" && isColourful(style.variant) ? "By category" : color.label}
                title={color.value === "currentColor" && isColourful(style.variant) ? "By category" : color.label}
                onClick={() => set("color", color.value)}
                className="grid size-6 place-items-center rounded-full border outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:ring-2 aria-pressed:ring-foreground aria-pressed:ring-offset-2 aria-pressed:ring-offset-card"
                style={{ background: color.value === "currentColor" ? undefined : color.value }}
              >
                {color.value === "currentColor" ? (
                  <span aria-hidden="true" className={cn("text-[9px] font-semibold", isColourful(style.variant) && "bg-[conic-gradient(#7c3aed,#2563eb,#059669,#d97706,#db2777,#7c3aed)] bg-clip-text text-transparent")}>
                    {isColourful(style.variant) ? "Auto" : "Aa"}
                  </span>
                ) : null}
              </button>
            ))}
            <label className="relative grid size-6 cursor-pointer place-items-center overflow-hidden rounded-full border bg-[conic-gradient(red,yellow,lime,cyan,blue,magenta,red)] has-focus-visible:ring-3 has-focus-visible:ring-ring/50" title="Custom colour">
              <span className="sr-only">Custom colour</span>
              <input type="color" value={style.color.startsWith("#") ? style.color : "#7c3aed"} onChange={(event) => set("color", event.target.value)} className="absolute inset-0 size-full cursor-pointer opacity-0" />
            </label>
          </div>
        </fieldset>

        <div className="grid grid-cols-2 gap-4">
          <label className="space-y-1.5">
            <span className={cn(label, "block")}>Size</span>
            <select value={style.size} onChange={(event) => set("size", Number(event.target.value))} className="h-8 w-full rounded-md border bg-background px-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
              {SIZES.map((size) => (
                <option key={size} value={size}>
                  {size} × {size} px
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1.5">
            <span className={cn(label, "flex justify-between")}>
              Stroke <span className="font-mono tabular-nums normal-case">{style.strokeWidth}</span>
            </span>
            <input type="range" min={1} max={3} step={0.25} value={style.strokeWidth} onChange={(event) => set("strokeWidth", Number(event.target.value))} className="h-8 w-full accent-foreground" />
          </label>
        </div>

        <fieldset>
          <legend className={label}>Background</legend>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
            {BACKGROUNDS.map((background) => (
              <label key={background.label} className="flex cursor-pointer items-center gap-1.5">
                <input type="radio" name={`${id}-bg`} className="accent-foreground" checked={style.background === background.value} onChange={() => set("background", background.value)} />
                {background.label}
              </label>
            ))}
            <label className="flex cursor-pointer items-center gap-1.5">
              <input type="radio" name={`${id}-bg`} className="accent-foreground" checked={custom} onChange={() => set("background", "#ede9fe")} />
              Custom
            </label>
            {custom ? (
              <input type="color" aria-label="Custom background colour" value={style.background ?? "#ede9fe"} onChange={(event) => set("background", event.target.value)} className="h-6 w-8 cursor-pointer rounded border bg-transparent" />
            ) : null}
          </div>
        </fieldset>

        <div className="space-y-3 border-t pt-4">
          <div className="flex items-center justify-between gap-3">
            <span className={label}>Copy</span>
            <div className="flex gap-1">
              <Button type="button" variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => copy("SVG", svgMarkup(icon, fullStyle()))}>
                SVG
              </Button>
              <Button type="button" variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => copy("React component", jsxSnippet(icon, fullStyle()))}>
                JSX
              </Button>
              <Button type="button" variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => copy("Data URI", dataUri(icon, fullStyle()))}>
                Data URI
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <span className={label}>Download</span>
            <div className="flex flex-wrap gap-1">
              {["SVG", "PNG", "JPEG", "WebP", "ICO", "PDF"].map((format) => (
                <Button key={format} type="button" variant="outline" size="sm" className="h-7 px-2 font-mono text-[11px]" disabled={busy !== null} aria-label={`Download ${format}`} onClick={() => download(format)}>
                  {format.toLowerCase()}
                </Button>
              ))}
            </div>
          </div>
          <p className="text-xs leading-5 text-muted-foreground">
            {style.variant === "animated"
              ? "SVG, JSX and the data URI animate on their own. PNG, JPEG, WebP, ICO and PDF can’t move, so they save the still frame."
              : `${style.size} px. ICO holds 16, 32, 48 and 256 px. PDF is vector. JPEG gets a white background if none is set.`}
          </p>
          <p role="status" className="min-h-4 text-xs text-foreground">
            {status}
          </p>
        </div>
      </div>
    </div>
  )
}
