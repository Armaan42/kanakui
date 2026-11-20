"use client"

import * as React from "react"
import { Code2, Eye, Maximize2 } from "lucide-react"

import { CodeViewer } from "@/components/site/code-viewer"
import { CopyButton } from "@/components/site/copy-button"
import { PreviewFrame } from "@/components/site/preview-frame"
import { Button } from "@/components/ui/button"
import type { CodeFile } from "@/lib/source"
import { cn } from "@/lib/utils"

export interface UsageExampleView {
  slug: string
  title: string
  description: string
  file: CodeFile
  /** One command that installs every VenusUI item the example uses. */
  installCommand: string
}

interface UsageExamplesProps {
  name: string
  title: string
  examples: UsageExampleView[]
}

/**
 * "See it in action": each real-world example in the same preview frame as the
 * component (device widths, light and dark, reload, full screen), with a Code
 * view of the exact file the preview renders.
 */
export function UsageExamples({ name, title, examples }: UsageExamplesProps) {
  const [active, setActive] = React.useState(0)
  const [view, setView] = React.useState<"preview" | "code">("preview")
  const baseId = React.useId()
  const example = examples[active] ?? examples[0]
  if (!example) return null
  const path = `/view/${name}/${example.slug}`

  return (
    <section aria-labelledby={`${baseId}-title`} className="space-y-5">
      <div className="space-y-1.5">
        <h2 id={`${baseId}-title`} className="text-2xl font-semibold tracking-tight">
          See it in action
        </h2>
        <p className="text-muted-foreground">Explore how this component looks and works when integrated into a real interface.</p>
      </div>

      {examples.length > 1 ? (
        <div role="tablist" aria-label={`${title} examples`} className="flex flex-wrap gap-1.5">
          {examples.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={index === active}
              aria-controls={`${baseId}-panel`}
              onClick={() => setActive(index)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                index === active ? "border-foreground bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.title}
            </button>
          ))}
        </div>
      ) : null}

      <div
        id={`${baseId}-panel`}
        role={examples.length > 1 ? "tabpanel" : undefined}
        aria-labelledby={examples.length > 1 ? `${baseId}-tab-${active}` : undefined}
        className="space-y-3"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-medium">{example.title}</h3>
            <p className="text-sm text-muted-foreground">{example.description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div role="group" aria-label="Show" className="inline-flex rounded-md border p-0.5">
              {(["preview", "code"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  aria-pressed={view === mode}
                  onClick={() => setView(mode)}
                  className={cn(
                    "inline-flex h-7 items-center gap-1.5 rounded-[5px] px-2.5 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                    view === mode ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {mode === "preview" ? <Eye aria-hidden="true" className="size-3.5" /> : <Code2 aria-hidden="true" className="size-3.5" />}
                  {mode === "preview" ? "Preview" : "Code"}
                </button>
              ))}
            </div>
            <CopyButton value={example.installCommand} label="Copy install command" text="Copy install command" className="h-8 rounded-md border px-2.5 text-sm" />
            <Button asChild variant="outline" size="sm">
              <a href={path} target="_blank" rel="noreferrer">
                <Maximize2 aria-hidden="true" />
                Open full screen
              </a>
            </Button>
          </div>
        </div>

        {view === "preview" ? (
          <PreviewFrame key={example.slug} name={name} title={`${title}: ${example.title}`} path={path} tall />
        ) : (
          <CodeViewer files={[example.file]} label={`${example.title} code`} />
        )}
      </div>
    </section>
  )
}
