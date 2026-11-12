"use client"

import { CopyButton } from "@/components/site/copy-button"
import { useThemeState } from "@/components/site/theme-config"
import { themeCss } from "@/config/themes"

/** The chosen theme as a globals.css block, updated live, with a copy button. */
export function ThemeCss() {
  const theme = useThemeState()
  const css = themeCss(theme)

  return (
    <div className="relative min-w-0 rounded-xl border bg-muted/30">
      <div className="flex items-center justify-between border-b px-4 py-2.5">
        <p className="font-mono text-xs text-muted-foreground">globals.css</p>
        <CopyButton value={css} label="Copy theme CSS for globals.css" />
      </div>
      <pre className="max-h-96 overflow-auto p-4 font-mono text-[12px] leading-5">
        <code>{css}</code>
      </pre>
    </div>
  )
}
