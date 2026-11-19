"use client"

import * as React from "react"
import Link from "next/link"

import { ICON_VARIANTS, svgBody, type IconVariant } from "@/lib/icon-export"
import { motionCss, motionKinds } from "@/lib/icon-motion"
import type { IconDef } from "@/lib/icons"
import { cn } from "@/lib/utils"

function Glyph({ icon, variant }: { icon: IconDef; variant: IconVariant }) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "")
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-7"
      // The markup comes from our own icon data, never from user input.
      dangerouslySetInnerHTML={{ __html: svgBody(icon, variant, "currentColor", `h${id}`).join("") }}
    />
  )
}

/**
 * A specimen of the icon set: pick a style and all the icons redraw in it.
 * In the Animated style each one moves on hover or focus. Every icon links to
 * the Icons page with that icon and style selected.
 */
export function IconShowcase({ icons }: { icons: IconDef[] }) {
  const [variant, setVariant] = React.useState<IconVariant>("outline")
  const css = React.useMemo(() => motionCss(icons.flatMap((icon) => [...motionKinds(icon)]), "page"), [icons])

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border bg-card text-card-foreground">
      <style>{css}</style>
      <div role="radiogroup" aria-label="Icon style" className="flex overflow-x-auto border-b px-2 [scrollbar-width:none]">
        {ICON_VARIANTS.map((item, index) => {
          const checked = variant === item.value
          return (
            <button
              key={item.value}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked ? 0 : -1}
              onClick={() => setVariant(item.value)}
              onKeyDown={(event) => {
                const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0
                if (!step) return
                event.preventDefault()
                setVariant(ICON_VARIANTS[(index + step + ICON_VARIANTS.length) % ICON_VARIANTS.length].value)
                const group = event.currentTarget.parentElement
                requestAnimationFrame(() => group?.querySelector<HTMLButtonElement>("[aria-checked=true]")?.focus())
              }}
              className={cn(
                "relative shrink-0 px-3 py-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                checked ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
              {checked ? <span aria-hidden="true" className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-foreground" /> : null}
            </button>
          )
        })}
      </div>
      <ul className="grid grid-cols-4 gap-px bg-border sm:grid-cols-8 max-sm:[&>li:nth-child(n+17)]:hidden">
        {icons.map((icon) => (
          <li key={icon.name} className="bg-card">
            <Link
              href={`/icons?icon=${icon.name}${variant === "outline" ? "" : `&style=${variant}`}`}
              aria-label={`${icon.title} icon`}
              className="vi-hover group relative flex aspect-square items-center justify-center outline-none transition-colors hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
            >
              <Glyph icon={icon} variant={variant} />
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-1 bottom-1 truncate text-center text-[10px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {icon.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
