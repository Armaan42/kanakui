"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowUpRight, RotateCcw } from "lucide-react"

import { CommandBlock } from "@/components/site/command-block"
import { CopyButton } from "@/components/site/copy-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuroraBackground } from "@/registry/default/ui/aurora-background"
import { BorderBeam } from "@/registry/default/ui/border-beam"
import { SpotlightCard } from "@/registry/default/ui/spotlight-card"

const DottedGlobe = dynamic(() => import("@/registry/default/ui/dotted-globe").then((m) => m.DottedGlobe), {
  ssr: false,
  loading: () => (
    <div role="status" className="size-72 animate-pulse rounded-full bg-muted/50 motion-reduce:animate-none">
      <span className="sr-only">Loading globe</span>
    </div>
  ),
})

type Values = Record<string, number | string>

type Control =
  | { type: "range"; key: string; label: string; min: number; max: number; step: number; unit?: string }
  | { type: "swatch"; key: string; label: string; options: { label: string; value: string; preview: string }[] }

interface PlaygroundItem {
  name: string
  title: string
  component: string
  defaults: Values
  controls: Control[]
  render: (v: Values) => React.ReactNode
  /** The JSX the user would write, matching the preview exactly. */
  code: (v: Values) => string
}

const BEAM_COLORS = [
  { label: "Foreground", value: "var(--foreground)", preview: "var(--foreground)" },
  { label: "Violet", value: "oklch(0.65 0.22 290)", preview: "oklch(0.65 0.22 290)" },
  { label: "Sky", value: "oklch(0.75 0.14 230)", preview: "oklch(0.75 0.14 230)" },
  { label: "Emerald", value: "oklch(0.75 0.17 160)", preview: "oklch(0.75 0.17 160)" },
  { label: "Amber", value: "oklch(0.8 0.16 75)", preview: "oklch(0.8 0.16 75)" },
]

const AURORAS: Record<string, [string, string, string]> = {
  Northern: ["oklch(0.62 0.19 270)", "oklch(0.75 0.13 210)", "oklch(0.75 0.15 160)"],
  Sunset: ["oklch(0.68 0.2 30)", "oklch(0.78 0.15 70)", "oklch(0.62 0.22 350)"],
  Ocean: ["oklch(0.55 0.17 250)", "oklch(0.7 0.13 215)", "oklch(0.82 0.1 190)"],
  Orchid: ["oklch(0.6 0.22 310)", "oklch(0.7 0.18 340)", "oklch(0.65 0.2 280)"],
}

const SPOTLIGHTS = [
  { label: "Soft", value: "", preview: "color-mix(in oklch, var(--foreground) 35%, transparent)" },
  { label: "Violet", value: "oklch(0.65 0.22 290 / 0.3)", preview: "oklch(0.65 0.22 290)" },
  { label: "Sky", value: "oklch(0.75 0.14 230 / 0.3)", preview: "oklch(0.75 0.14 230)" },
  { label: "Emerald", value: "oklch(0.75 0.17 160 / 0.3)", preview: "oklch(0.75 0.17 160)" },
]

const ITEMS: PlaygroundItem[] = [
  {
    name: "dotted-globe",
    title: "Dotted Globe",
    component: "DottedGlobe",
    defaults: { dots: 1600, dotSize: 2, speed: 0.15 },
    controls: [
      { type: "range", key: "dots", label: "Dots", min: 300, max: 3000, step: 100 },
      { type: "range", key: "dotSize", label: "Dot size", min: 1, max: 4, step: 0.5, unit: "px" },
      { type: "range", key: "speed", label: "Speed", min: 0, max: 1, step: 0.05 },
    ],
    render: (v) => (
      <DottedGlobe dots={Number(v.dots)} dotSize={Number(v.dotSize)} speed={Number(v.speed)} className="max-w-80" />
    ),
    code: (v) => `<DottedGlobe\n  dots={${v.dots}}\n  dotSize={${v.dotSize}}\n  speed={${v.speed}}\n  className="h-96 w-full"\n/>`,
  },
  {
    name: "border-beam",
    title: "Border Beam",
    component: "BorderBeam",
    defaults: { duration: 6, color: BEAM_COLORS[0]!.value, borderWidth: 1.5, length: 12 },
    controls: [
      { type: "range", key: "duration", label: "Duration", min: 2, max: 14, step: 1, unit: "s" },
      { type: "range", key: "borderWidth", label: "Border width", min: 1, max: 4, step: 0.5, unit: "px" },
      { type: "range", key: "length", label: "Beam length", min: 4, max: 40, step: 1, unit: "%" },
      { type: "swatch", key: "color", label: "Color", options: BEAM_COLORS },
    ],
    render: (v) => (
      <div className="relative w-72 rounded-2xl border bg-card p-8">
        <p className="font-medium">Pro plan</p>
        <p className="mt-1 text-sm text-muted-foreground">A light runs around this card&apos;s border.</p>
        <BorderBeam
          duration={`${v.duration}s`}
          color={String(v.color)}
          borderWidth={Number(v.borderWidth)}
          length={Number(v.length)}
        />
      </div>
    ),
    code: (v) =>
      `<div className="relative rounded-2xl border p-8">\n  Your content\n  <BorderBeam\n    duration="${v.duration}s"\n    color="${v.color}"\n    borderWidth={${v.borderWidth}}\n    length={${v.length}}\n  />\n</div>`,
  },
  {
    name: "aurora-background",
    title: "Aurora Background",
    component: "AuroraBackground",
    defaults: { palette: "Northern", intensity: 0.35 },
    controls: [
      { type: "range", key: "intensity", label: "Intensity", min: 0.1, max: 1, step: 0.05 },
      {
        type: "swatch",
        key: "palette",
        label: "Palette",
        options: Object.entries(AURORAS).map(([label, colors]) => ({
          label,
          value: label,
          preview: `linear-gradient(135deg, ${colors.join(", ")})`,
        })),
      },
    ],
    render: (v) => (
      <AuroraBackground
        colors={AURORAS[String(v.palette)]}
        intensity={Number(v.intensity)}
        className="flex size-full items-center justify-center"
      >
        <p className="text-3xl font-semibold tracking-tight">Northern lights</p>
      </AuroraBackground>
    ),
    code: (v) =>
      `<AuroraBackground\n  colors={[\n${AURORAS[String(v.palette)]!.map((c) => `    "${c}",`).join("\n")}\n  ]}\n  intensity={${v.intensity}}\n  className="flex h-96 items-center justify-center"\n>\n  <h2>Northern lights</h2>\n</AuroraBackground>`,
  },
  {
    name: "spotlight-card",
    title: "Spotlight Card",
    component: "SpotlightCard",
    defaults: { radius: 320, spotlightColor: "" },
    controls: [
      { type: "range", key: "radius", label: "Radius", min: 100, max: 600, step: 20, unit: "px" },
      { type: "swatch", key: "spotlightColor", label: "Light", options: SPOTLIGHTS },
    ],
    render: (v) => (
      <SpotlightCard radius={Number(v.radius)} spotlightColor={String(v.spotlightColor) || undefined} className="w-80 p-6">
        <p className="font-medium">Move your pointer here</p>
        <p className="mt-1 text-sm text-muted-foreground">The light follows it across the card.</p>
      </SpotlightCard>
    ),
    code: (v) =>
      `<SpotlightCard\n  radius={${v.radius}}${v.spotlightColor ? `\n  spotlightColor="${v.spotlightColor}"` : ""}\n  className="p-6"\n>\n  Your content\n</SpotlightCard>`,
  },
]

/** Colors tags, attribute names and values; everything else stays plain. */
function HighlightedCode({ code }: { code: string }) {
  const parts = code.split(/(<\/?[A-Za-z]+|\b[a-zA-Z]+(?==)|"[^"\n]*"|\{[^{}\n]*\})/g)
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null
        const className = part.startsWith("<")
          ? "text-sky-700 dark:text-sky-300"
          : part.startsWith('"')
            ? "text-emerald-700 dark:text-emerald-300"
            : part.startsWith("{")
              ? "text-amber-700 dark:text-amber-300"
              : parts[i + 1]?.startsWith("=")
                ? "text-violet-700 dark:text-violet-300"
                : undefined
        return className ? (
          <span key={i} className={className}>
            {part}
          </span>
        ) : (
          part
        )
      })}
    </>
  )
}

function RangeControl({ control, value, onChange }: { control: Extract<Control, { type: "range" }>; value: number; onChange: (v: number) => void }) {
  const id = React.useId()
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <label htmlFor={id}>{control.label}</label>
        <output htmlFor={id} className="font-mono text-xs text-muted-foreground tabular-nums">
          {value}
          {control.unit}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={control.min}
        max={control.max}
        step={control.step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full cursor-pointer accent-foreground"
      />
    </div>
  )
}

function SwatchControl({ control, value, onChange }: { control: Extract<Control, { type: "swatch" }>; value: string; onChange: (v: string) => void }) {
  const name = React.useId()
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm">{control.label}</legend>
      <div className="flex flex-wrap gap-2 pt-2">
        {control.options.map((option) => (
          <label
            key={option.label}
            className="relative flex cursor-pointer items-center gap-2 rounded-full border px-2.5 py-1 text-xs text-muted-foreground transition-colors has-checked:border-foreground/40 has-checked:bg-muted has-checked:text-foreground has-focus-visible:ring-3 has-focus-visible:ring-ring/50"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span aria-hidden="true" className="size-3 rounded-full border" style={{ background: option.preview }} />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/** One component's preview, props, code and install command. */
function PlaygroundPanel({
  item,
  values,
  command,
  onChange,
  onReset,
}: {
  item: PlaygroundItem
  values: Values
  command: string
  onChange: (key: string, value: number | string) => void
  onReset: () => void
}) {
  const code = `import { ${item.component} } from "@/components/ui/${item.name}"\n\n${item.code(values)}`
  const isDefault = item.controls.every((c) => values[c.key] === item.defaults[c.key])

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="relative flex h-96 items-center justify-center overflow-hidden rounded-xl border bg-card">
          {item.render(values)}
        </div>

        <div className="flex flex-col gap-5 rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">{item.title} props</h3>
            <button
              type="button"
              onClick={onReset}
              disabled={isDefault}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
            >
              <RotateCcw aria-hidden="true" className="size-3" />
              Reset
            </button>
          </div>
          {item.controls.map((control) =>
            control.type === "range" ? (
              <RangeControl key={control.key} control={control} value={Number(values[control.key])} onChange={(v) => onChange(control.key, v)} />
            ) : (
              <SwatchControl key={control.key} control={control} value={String(values[control.key])} onChange={(v) => onChange(control.key, v)} />
            )
          )}
          <Link
            href={`/components/${item.name}`}
            className="mt-auto inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            {item.title} docs <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="relative min-w-0 rounded-xl border bg-muted/30">
          <CopyButton value={code} label={`Copy ${item.title} code`} className="absolute top-2 right-2" />
          <pre className="overflow-x-auto p-4 pr-12 font-mono text-[13px] leading-6">
            <code>
              <HighlightedCode code={code} />
            </code>
          </pre>
        </div>
        <div className="min-w-0 space-y-2">
          <p className="text-sm text-muted-foreground">Install it first:</p>
          <CommandBlock command={command} copyLabel={`Copy install command for ${item.title}`} />
        </div>
      </div>
    </div>
  )
}

/**
 * Pick a component, change its props, and see the live result and the exact
 * code for it. Values are kept per component while switching tabs; only the
 * open tab's preview is mounted.
 */
export function Playground({ commands }: { commands: Record<string, string> }) {
  const [values, setValues] = React.useState<Record<string, Values>>(() =>
    Object.fromEntries(ITEMS.map((item) => [item.name, { ...item.defaults }]))
  )

  return (
    <Tabs defaultValue={ITEMS[0]!.name} className="gap-4">
      <div className="max-w-full overflow-x-auto">
        <TabsList aria-label="Component to try">
          {ITEMS.map((item) => (
            <TabsTrigger key={item.name} value={item.name}>
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {ITEMS.map((item) => (
        <TabsContent key={item.name} value={item.name}>
          <PlaygroundPanel
            item={item}
            values={values[item.name] ?? item.defaults}
            command={commands[item.name] ?? ""}
            onChange={(key, value) =>
              setValues((all) => ({ ...all, [item.name]: { ...all[item.name], [key]: value } }))
            }
            onReset={() => setValues((all) => ({ ...all, [item.name]: { ...item.defaults } }))}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}
