"use client"

import * as React from "react"
import { Eraser } from "lucide-react"

import { cn } from "@/lib/utils"

interface Impression {
  id: number
  x: number
  y: number
  tilt: number
}

interface RubberStampProps extends React.ComponentProps<"div"> {
  /** What the stamp says. */
  text?: string
  /** Ink colour. */
  ink?: string
  /** Content of the sheet being stamped. */
  children?: React.ReactNode
  onStamp?: (count: number) => void
}

/**
 * A rubber stamp and a sheet of paper. Click anywhere on the sheet to stamp
 * it; each impression lands a little crooked, with a worn-ink edge. The
 * "Stamp" button stamps the middle for keyboard users.
 */
function RubberStamp({ text = "APPROVED", ink = "#c2410c", children, onStamp, className, ...props }: RubberStampProps) {
  const [marks, setMarks] = React.useState<Impression[]>([])
  const [pressed, setPressed] = React.useState(0)
  const sheet = React.useRef<HTMLDivElement>(null)
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "")

  const stamp = (x: number, y: number) => {
    const next = [...marks, { id: Date.now() + marks.length, x, y, tilt: Math.round((Math.random() * 16 - 8) * 10) / 10 }].slice(-12)
    setMarks(next)
    setPressed((value) => value + 1)
    onStamp?.(next.length)
  }

  return (
    <div data-slot="rubber-stamp" className={cn("flex w-full max-w-lg flex-col gap-4", className)} {...props}>
      <svg aria-hidden="true" className="absolute size-0">
        <filter id={`${id}-worn`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.25" />
          <feComposite in="SourceGraphic" operator="in" />
        </filter>
      </svg>
      <div className="flex items-end gap-4">
        <div
          ref={sheet}
          onClick={(event) => {
            const box = sheet.current?.getBoundingClientRect()
            if (box) stamp(((event.clientX - box.left) / box.width) * 100, ((event.clientY - box.top) / box.height) * 100)
          }}
          className="relative aspect-[4/5] min-w-0 flex-1 cursor-crosshair overflow-hidden rounded-sm bg-[#fdfcf7] p-6 text-neutral-800 shadow-[0_14px_28px_-16px_rgb(0_0_0/0.5)] ring-1 ring-black/10"
        >
          {children}
          {marks.map((mark) => (
            <span
              key={mark.id}
              aria-hidden="true"
              className="animate-rubber-stamp-press pointer-events-none absolute grid place-items-center rounded-md border-[3px] px-3 py-1 font-mono text-xl font-black tracking-[0.18em] whitespace-nowrap mix-blend-multiply motion-reduce:animate-none"
              style={{ left: `${mark.x}%`, top: `${mark.y}%`, color: ink, borderColor: ink, filter: `url(#${id}-worn)`, "--tilt": `${mark.tilt}deg`, rotate: `${mark.tilt}deg`, translate: "-50% -50%" } as React.CSSProperties}
            >
              {text}
            </span>
          ))}
        </div>
        {/* The stamp itself, which presses down each time. */}
        <div aria-hidden="true" key={pressed} className={cn("flex shrink-0 flex-col items-center", pressed > 0 && "animate-rubber-stamp-handle motion-reduce:animate-none")}>
          <span className="h-12 w-9 rounded-t-full rounded-b-md bg-linear-to-b from-amber-800 to-amber-950 shadow-inner" />
          <span className="h-3 w-5 bg-amber-950" />
          <span className="h-4 w-16 rounded-sm bg-linear-to-b from-neutral-300 to-neutral-500" />
          <span className="h-2 w-16 rounded-b-sm" style={{ background: ink }} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => stamp(50, 50)} className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50">
          Stamp
        </button>
        <button type="button" onClick={() => setMarks([])} disabled={!marks.length} className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-muted-foreground outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50">
          <Eraser aria-hidden="true" className="size-4" />
          Clean sheet
        </button>
        <span role="status" className="ml-auto text-xs text-muted-foreground">
          {marks.length ? `Stamped ${marks.length} ${marks.length === 1 ? "time" : "times"}` : "Not stamped yet"}
        </span>
      </div>
    </div>
  )
}

export { RubberStamp }
