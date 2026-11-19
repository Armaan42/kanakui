"use client"

import Link from "next/link"
import { ArrowRight, Moon, Sun } from "lucide-react"

import { setMode, setThemeConfig, useThemeState } from "@/components/site/theme-config"
import { ACCENTS, type Accent } from "@/config/themes"
import { cn } from "@/lib/utils"

/** The chip colour for each accent: the light-mode primary, or the page text colour for Default. */
const chip = (accent: Accent) => {
  const vars: Partial<Record<string, string>> = ACCENTS[accent].light
  return vars.primary ?? "var(--foreground)"
}

/**
 * A paint-sample card on the hero desk. Picking a chip changes the accent
 * colour of the whole site, and the switch below flips light and dark. It
 * uses the same theme state as the header picker and /themes.
 */
export function ThemeCard({ className }: { className?: string }) {
  const theme = useThemeState()
  const accents = Object.keys(ACCENTS) as Accent[]

  return (
    <div className={cn("w-60 rounded-md bg-[#fbfaf6] p-3 text-neutral-900 shadow-[0_14px_24px_-14px_rgb(0_0_0/0.45)] ring-1 ring-black/10", className)}>
      <p className="font-serif text-[15px] leading-tight font-semibold">Add your own theme</p>
      <p className="mt-1 text-[11px] leading-4 text-neutral-600">Pick a colour. The whole site follows.</p>

      <div role="radiogroup" aria-label="Accent colour" className="mt-3 grid grid-cols-4 gap-1.5">
        {accents.map((accent) => {
          const checked = theme.accent === accent
          return (
            <button
              key={accent}
              type="button"
              role="radio"
              aria-checked={checked}
              aria-label={`${ACCENTS[accent].label} accent`}
              onClick={() => setThemeConfig({ accent })}
              className={cn(
                "group flex flex-col gap-1 rounded-[3px] p-0.5 text-left outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-neutral-900 motion-reduce:transition-none",
                checked && "ring-2 ring-neutral-900"
              )}
            >
              <span aria-hidden="true" className="block h-7 rounded-[2px] shadow-[inset_0_-6px_8px_-6px_rgb(0_0_0/0.25)]" style={{ background: chip(accent) }} />
              <span aria-hidden="true" className="truncate font-mono text-[8.5px] tracking-wide text-neutral-600 uppercase">
                {ACCENTS[accent].label}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-dashed border-neutral-300 pt-2.5">
        <div role="radiogroup" aria-label="Light or dark" className="flex rounded-full bg-neutral-200/80 p-0.5">
          {(["light", "dark"] as const).map((mode) => {
            const Icon = mode === "light" ? Sun : Moon
            const checked = theme.mode === mode
            return (
              <button
                key={mode}
                type="button"
                role="radio"
                aria-checked={checked}
                aria-label={mode === "light" ? "Light mode" : "Dark mode"}
                onClick={() => setMode(mode)}
                className={cn("grid size-6 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-neutral-900", checked ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500")}
              >
                <Icon aria-hidden="true" className="size-3.5" />
              </button>
            )
          })}
        </div>
        <Link href="/themes" className="inline-flex items-center gap-1 text-[11px] font-medium underline-offset-2 outline-none hover:underline focus-visible:underline">
          Make a full theme
          <ArrowRight aria-hidden="true" className="size-3" />
        </Link>
      </div>
    </div>
  )
}
