"use client"

import * as React from "react"
import { Moon, RotateCcw, Sun } from "lucide-react"

import { CopyButton } from "@/components/site/copy-button"
import { setMode, setThemeConfig, useThemeState, type Mode } from "@/components/site/theme-config"
import { ACCENTS, BASE_COLORS, DEFAULT_THEME, RADII, themeCss, type Accent, type BaseColor, type Radius } from "@/config/themes"
import { cn } from "@/lib/utils"

/** One choice in a group: a native radio styled as a pill, so arrow keys and screen readers work as usual. */
function Choice({
  name,
  value,
  checked,
  onSelect,
  swatch,
  children,
}: {
  name: string
  value: string
  checked: boolean
  onSelect: () => void
  swatch?: string
  children: React.ReactNode
}) {
  return (
    <label
      className={cn(
        "relative flex h-8 cursor-pointer items-center gap-2 rounded-md border px-2.5 text-xs text-muted-foreground transition-colors select-none hover:text-foreground",
        "has-checked:border-foreground/50 has-checked:bg-muted has-checked:text-foreground has-focus-visible:ring-3 has-focus-visible:ring-ring/50"
      )}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onSelect} className="sr-only" />
      {swatch ? <span aria-hidden="true" className="size-3.5 shrink-0 rounded-full border border-foreground/10" style={{ background: swatch }} /> : null}
      {children}
    </label>
  )
}

function Group({ legend, children, className }: { legend: string; children: React.ReactNode; className?: string }) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-xs font-medium">{legend}</legend>
      <div className={cn("grid gap-1.5", className)}>{children}</div>
    </fieldset>
  )
}

/**
 * Pick the site theme: light or dark, a base color, an accent and the corner
 * radius. Every page, preview and block follows it live, and it's remembered
 * for the next visit. "Copy CSS" gives the matching globals.css block.
 */
export function ThemeCustomizer({ className }: { className?: string }) {
  const theme = useThemeState()
  const id = React.useId()
  const isDefault =
    theme.base === DEFAULT_THEME.base && theme.accent === DEFAULT_THEME.accent && theme.radius === DEFAULT_THEME.radius

  return (
    <div data-slot="theme-customizer" className={cn("flex flex-col gap-4", className)}>
      <Group legend="Mode" className="grid-cols-2">
        {(["light", "dark"] as Mode[]).map((mode) => (
          <Choice key={mode} name={`${id}-mode`} value={mode} checked={theme.mode === mode} onSelect={() => setMode(mode)}>
            {mode === "light" ? <Sun aria-hidden="true" className="size-3.5" /> : <Moon aria-hidden="true" className="size-3.5" />}
            {mode === "light" ? "Light" : "Dark"}
          </Choice>
        ))}
      </Group>

      <Group legend="Base color" className="grid-cols-3">
        {(Object.keys(BASE_COLORS) as BaseColor[]).map((base) => (
          <Choice
            key={base}
            name={`${id}-base`}
            value={base}
            checked={theme.base === base}
            onSelect={() => setThemeConfig({ base })}
            swatch={BASE_COLORS[base].light["muted-foreground"]}
          >
            {BASE_COLORS[base].label}
          </Choice>
        ))}
      </Group>

      <Group legend="Accent" className="grid-cols-3">
        {(Object.keys(ACCENTS) as Accent[]).map((accent) => (
          <Choice
            key={accent}
            name={`${id}-accent`}
            value={accent}
            checked={theme.accent === accent}
            onSelect={() => setThemeConfig({ accent })}
            swatch={accent === "default" ? "var(--foreground)" : ACCENTS[accent].light.primary}
          >
            {ACCENTS[accent].label}
          </Choice>
        ))}
      </Group>

      <Group legend="Radius" className="grid-cols-5">
        {RADII.map((radius: Radius) => (
          <Choice key={radius} name={`${id}-radius`} value={radius} checked={theme.radius === radius} onSelect={() => setThemeConfig({ radius })}>
            <span className="w-full text-center font-mono">{radius}</span>
          </Choice>
        ))}
      </Group>

      <div className="flex items-center justify-between gap-2 border-t pt-3">
        <button
          type="button"
          onClick={() => setThemeConfig(DEFAULT_THEME)}
          disabled={isDefault}
          className="inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
        >
          <RotateCcw aria-hidden="true" className="size-3.5" />
          Reset
        </button>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          Copy CSS
          <CopyButton value={themeCss(theme)} label="Copy theme CSS for globals.css" />
        </div>
      </div>
    </div>
  )
}
