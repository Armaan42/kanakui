"use client"

import * as React from "react"
import { FilePlus2, Scissors } from "lucide-react"

import { cn } from "@/lib/utils"

interface PaperShredderProps extends React.ComponentProps<"div"> {
  /** What's printed on the sheet. */
  children: React.ReactNode
  /** Strips the sheet is cut into. */
  strips?: number
  onShred?: (count: number) => void
}

/**
 * A desk shredder. Press "Shred" (or the sheet) and the page feeds into the
 * slot and comes out underneath in curling strips. A playful confirmation for
 * destructive actions such as deleting data.
 */
function PaperShredder({ children, strips = 12, onShred, className, ...props }: PaperShredderProps) {
  const [state, setState] = React.useState<"ready" | "shredding" | "gone">("ready")
  const [count, setCount] = React.useState(0)
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  React.useEffect(() => () => clearTimeout(timer.current), [])

  const shred = () => {
    if (state !== "ready") return
    setState("shredding")
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    timer.current = setTimeout(() => {
      setState("gone")
      setCount((value) => value + 1)
      onShred?.(count + 1)
    }, reduced ? 0 : 1700)
  }

  const sheet = <div className="h-full w-full bg-[#fdfcf7] p-4 text-[11px] leading-4 text-neutral-700">{children}</div>

  return (
    <div data-slot="paper-shredder" className={cn("flex w-72 max-w-full flex-col items-center", className)} {...props}>
      {/* The sheet waiting on top. */}
      <div className="relative h-56 w-56 overflow-hidden">
        {state !== "gone" ? (
          <button
            type="button"
            onClick={shred}
            aria-label="Shred this page"
            className={cn(
              "absolute inset-x-0 top-4 h-64 overflow-hidden rounded-t-sm text-left shadow-[0_6px_14px_-6px_rgb(0_0_0/0.4)] ring-1 ring-black/10 outline-none focus-visible:ring-3 focus-visible:ring-ring/60",
              state === "shredding" && "animate-paper-shredder-feed motion-reduce:animate-none"
            )}
          >
            {sheet}
          </button>
        ) : (
          <p className="absolute inset-x-0 bottom-6 text-center text-sm text-muted-foreground">Nothing left to read.</p>
        )}
      </div>

      {/* The machine. */}
      <div className="relative z-10 h-16 w-72 max-w-full rounded-t-xl rounded-b-md bg-linear-to-b from-neutral-700 to-neutral-900 shadow-[0_10px_20px_-10px_rgb(0_0_0/0.6),inset_0_1px_0_rgb(255_255_255/0.15)]">
        <span aria-hidden="true" className="absolute top-3 left-1/2 h-1.5 w-60 -translate-x-1/2 rounded-full bg-black shadow-[inset_0_1px_2px_rgb(0_0_0/0.8)]" />
        <span aria-hidden="true" className={cn("absolute right-4 bottom-3 size-2 rounded-full", state === "shredding" ? "animate-pulse bg-emerald-400" : "bg-neutral-600")} />
        <span aria-hidden="true" className="absolute bottom-2.5 left-4 font-mono text-[10px] tracking-[0.2em] text-neutral-400">CROSS-CUT</span>
      </div>

      {/* Strips falling out underneath. */}
      <div aria-hidden="true" className="relative h-36 w-56 overflow-hidden rounded-b-lg bg-neutral-200/60 dark:bg-neutral-800/60">
        {state !== "ready"
          ? Array.from({ length: strips }, (_, i) => (
              <div
                key={`${count}-${i}`}
                className="animate-paper-shredder-strip absolute top-0 h-64 motion-reduce:animate-none"
                style={{
                  left: `${(i / strips) * 100}%`,
                  width: `${100 / strips}%`,
                  animationDelay: `${(i % 3) * 60}ms`,
                  rotate: `${(i % 2 ? 1 : -1) * (1 + (i % 4))}deg`,
                }}
              >
                <div className="h-full overflow-hidden" style={{ width: `${strips * 100}%`, marginLeft: `${-i * 100}%` }}>
                  {sheet}
                </div>
              </div>
            ))
          : null}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button type="button" onClick={shred} disabled={state !== "ready"} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50">
          <Scissors aria-hidden="true" className="size-4" />
          Shred
        </button>
        <button type="button" onClick={() => setState("ready")} disabled={state !== "gone"} className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-muted-foreground outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50">
          <FilePlus2 aria-hidden="true" className="size-4" />
          New page
        </button>
      </div>
      <p role="status" className="mt-2 min-h-5 text-xs text-muted-foreground">
        {state === "shredding" ? "Shredding…" : count ? `${count} ${count === 1 ? "page" : "pages"} shredded` : ""}
      </p>
    </div>
  )
}

export { PaperShredder }
