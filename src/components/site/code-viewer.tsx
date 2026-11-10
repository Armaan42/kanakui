"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, FileCode2 } from "lucide-react"

import { CopyButton } from "@/components/site/copy-button"
import { Button } from "@/components/ui/button"
import type { CodeFile } from "@/lib/source"
import { cn } from "@/lib/utils"

/** Files longer than this start collapsed. */
const COLLAPSE_AFTER_LINES = 24

interface CodeViewerProps {
  files: CodeFile[]
  /** Accessible name for the group, e.g. "Source files". */
  label: string
  className?: string
}

/**
 * Shows one or more highlighted files. Several files get a tab per file and a
 * "Copy all" button. Long files collapse to a fixed height with an Expand button.
 * Highlighting happens on the server; this component only switches and copies.
 */
export function CodeViewer({ files, label, className }: CodeViewerProps) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [expanded, setExpanded] = React.useState(false)
  const baseId = React.useId()
  const active = files[activeIndex] ?? files[0]
  if (!active) return null

  const lineCount = active.code.split("\n").length - 1
  const collapsible = lineCount > COLLAPSE_AFTER_LINES
  const multiple = files.length > 1
  const allFiles = files.map((f) => `// ${f.path}\n${f.code}`).join("\n")

  function selectTab(index: number) {
    setActiveIndex(index)
    setExpanded(false)
  }

  function onTabKeyDown(event: React.KeyboardEvent, index: number) {
    const last = files.length - 1
    const next =
      event.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null
    if (next === null) return
    event.preventDefault()
    selectTab(next)
    document.getElementById(`${baseId}-tab-${next}`)?.focus()
  }

  return (
    <div role="group" aria-label={label} className={cn("overflow-hidden rounded-lg border bg-muted/30", className)}>
      <div className="flex items-center gap-2 border-b bg-muted/40 pr-2">
        {multiple ? (
          <div role="tablist" aria-label={label} className="flex min-w-0 flex-1 overflow-x-auto">
            {files.map((file, index) => {
              const selected = index === activeIndex
              return (
                <button
                  key={file.path}
                  id={`${baseId}-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectTab(index)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  className={cn(
                    "relative shrink-0 px-3 py-2.5 font-mono text-xs whitespace-nowrap transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none focus-visible:ring-inset",
                    selected
                      ? "text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {file.path.split("/").pop()}
                </button>
              )
            })}
          </div>
        ) : (
          <p className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2.5 font-mono text-xs text-muted-foreground">
            <FileCode2 aria-hidden="true" className="size-3.5 shrink-0" />
            <span className="truncate">{active.path}</span>
          </p>
        )}
        <div className="flex shrink-0 items-center">
          {multiple ? <CopyButton value={allFiles} text="Copy all" label="Copy all files" /> : null}
          <CopyButton value={active.code} label={`Copy ${active.path}`} />
        </div>
      </div>

      {multiple ? (
        <p className="border-b px-4 py-2 font-mono text-xs text-muted-foreground">{active.path}</p>
      ) : null}

      <div
        id={`${baseId}-panel`}
        role={multiple ? "tabpanel" : undefined}
        aria-labelledby={multiple ? `${baseId}-tab-${activeIndex}` : undefined}
        className="relative"
      >
        <div
          className={cn(collapsible && !expanded && "max-h-96 overflow-hidden")}
          // Shiki output is generated on the server from our own source files.
          dangerouslySetInnerHTML={{ __html: active.html }}
        />
        {collapsible ? (
          <div
            className={cn(
              "flex justify-center pb-3",
              !expanded && "absolute inset-x-0 bottom-0 bg-linear-to-t from-background via-background/80 to-transparent pt-16"
            )}
          >
            <Button type="button" variant="outline" size="sm" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
              {expanded ? <ChevronUp data-icon="inline-start" /> : <ChevronDown data-icon="inline-start" />}
              {expanded ? "Collapse" : `Expand (${lineCount} lines)`}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
