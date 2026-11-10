"use client"

import * as React from "react"
import { ExternalLink, Monitor, Moon, RotateCw, Smartphone, Sun, Tablet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const VIEWPORTS = [
  { id: "desktop", label: "Desktop", width: "100%", icon: Monitor },
  { id: "tablet", label: "Tablet (768px)", width: "768px", icon: Tablet },
  { id: "mobile", label: "Mobile (375px)", width: "375px", icon: Smartphone },
] as const

type ViewportId = (typeof VIEWPORTS)[number]["id"]
type Theme = "light" | "dark"

/** Tracks the site theme (the `dark` class on <html>). The server always renders dark. */
function useSiteTheme(): Theme {
  return React.useSyncExternalStore(
    (onChange) => {
      const observer = new MutationObserver(onChange)
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
      return () => observer.disconnect()
    },
    () => (document.documentElement.classList.contains("dark") ? "dark" : "light"),
    () => "dark"
  )
}

interface PreviewFrameProps {
  name: string
  title: string
  /** Taller frame for blocks (full page sections). */
  tall?: boolean
}

/**
 * Renders the component in an iframe (/view/<name>), so CSS breakpoints react
 * to the chosen device width exactly as they would in a real page.
 */
export function PreviewFrame({ name, title, tall = false }: PreviewFrameProps) {
  const siteTheme = useSiteTheme()
  const [viewport, setViewport] = React.useState<ViewportId>("desktop")
  const [themeOverride, setThemeOverride] = React.useState<Theme | null>(null)
  const [reloadKey, setReloadKey] = React.useState(0)

  const theme = themeOverride ?? siteTheme
  const src = `/view/${name}?theme=${theme}`
  const width = VIEWPORTS.find((v) => v.id === viewport)?.width ?? "100%"

  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="flex items-center justify-between gap-2 border-b bg-muted/40 px-2 py-1.5">
        {/* Device widths only matter where the frame can be wider than a phone. */}
        <div role="group" aria-label="Preview width" className="hidden items-center gap-0.5 md:flex">
          {VIEWPORTS.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={label}
              aria-pressed={viewport === id}
              title={label}
              onClick={() => setViewport(id)}
              className={cn(viewport === id ? "bg-background text-foreground shadow-xs" : "text-muted-foreground")}
            >
              <Icon aria-hidden="true" />
            </Button>
          ))}
        </div>
        <p className="font-mono text-xs text-muted-foreground md:hidden">Preview</p>

        <div className="flex items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={theme === "dark" ? "Show preview in light theme" : "Show preview in dark theme"}
            title={theme === "dark" ? "Light preview" : "Dark preview"}
            onClick={() => setThemeOverride(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground"
          >
            {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Reload preview"
            title="Reload preview"
            onClick={() => setReloadKey((k) => k + 1)}
            className="text-muted-foreground"
          >
            <RotateCw aria-hidden="true" />
          </Button>
          <Button asChild variant="ghost" size="icon-sm" className="text-muted-foreground">
            <a href={src} target="_blank" rel="noreferrer" aria-label="Open preview full screen in a new tab" title="Open full screen">
              <ExternalLink aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>

      <div className="flex justify-center bg-muted/30">
        <iframe
          key={`${src}-${reloadKey}`}
          src={src}
          title={`${title} preview`}
          loading="lazy"
          className={cn(
            "block max-w-full border-x border-transparent bg-background transition-[width] duration-300 motion-reduce:transition-none data-[narrow=true]:border-border",
            tall ? "h-128 sm:h-160" : "h-96 sm:h-112"
          )}
          data-narrow={viewport !== "desktop"}
          style={{ width }}
        />
      </div>
    </div>
  )
}
