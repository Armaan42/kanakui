"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"

interface TerminalLine {
  /** `command` lines are typed out after a `$`; the others appear at once. */
  type: "command" | "output" | "success"
  text: string
  /** Milliseconds to wait before this line starts. */
  delay?: number
}

interface TerminalProps {
  lines: TerminalLine[]
  /** Title in the window bar. */
  title?: string
  /** Milliseconds per typed character. */
  typingSpeed?: number
  className?: string
}

/**
 * A terminal window that types out commands and prints their output once it
 * scrolls into view, then offers a replay button. Screen readers get the
 * whole session as text right away; with reduced motion the finished session
 * shows immediately.
 */
function Terminal({ lines, title = "Terminal", typingSpeed = 30, className }: TerminalProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduceMotion = React.useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(REDUCED_MOTION)
      media.addEventListener("change", onChange)
      return () => media.removeEventListener("change", onChange)
    },
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  )
  const [started, setStarted] = React.useState(false)
  const [run, setRun] = React.useState(0)
  // Progress: the index of the line being shown, and how many of its characters.
  const [progress, setProgress] = React.useState({ line: 0, chars: 0 })

  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    if (!started || reduceMotion) return
    const timers: ReturnType<typeof setTimeout>[] = []
    let at = 300
    lines.forEach((line, index) => {
      at += line.delay ?? (line.type === "command" ? 400 : 250)
      if (line.type === "command") {
        for (let c = 0; c <= line.text.length; c++) {
          const time = at + c * typingSpeed
          timers.push(setTimeout(() => setProgress({ line: index, chars: c }), time))
        }
        at += line.text.length * typingSpeed
      } else {
        timers.push(setTimeout(() => setProgress({ line: index, chars: line.text.length }), at))
      }
    })
    timers.push(setTimeout(() => setProgress({ line: lines.length, chars: 0 }), at + 50))
    return () => timers.forEach(clearTimeout)
  }, [started, reduceMotion, lines, typingSpeed, run])

  const shown = reduceMotion ? { line: lines.length, chars: 0 } : progress
  const finished = shown.line >= lines.length

  const replay = () => {
    setProgress({ line: 0, chars: 0 })
    setRun((r) => r + 1)
  }

  const transcript = lines.map((line) => (line.type === "command" ? `$ ${line.text}` : line.type === "success" ? `✔ ${line.text}` : line.text)).join("\n")

  return (
    <div ref={ref} data-slot="terminal" className={cn("min-w-0 overflow-hidden rounded-xl border bg-card shadow-sm", className)}>
      <div className="flex items-center gap-2 border-b px-4 py-2.5">
        <span aria-hidden="true" className="size-2.5 rounded-full bg-foreground/15" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-foreground/15" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-foreground/15" />
        <span className="ml-2 text-xs text-muted-foreground">{title}</span>
        {!reduceMotion && finished && started ? (
          <button
            type="button"
            onClick={replay}
            className="ml-auto inline-flex size-7 items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <RotateCcw aria-hidden="true" className="size-3.5" />
            <span className="sr-only">Replay</span>
          </button>
        ) : null}
      </div>
      <pre className="sr-only">{transcript}</pre>
      <pre aria-hidden="true" className="min-h-40 overflow-x-auto p-4 font-mono text-[13px] leading-6">
        <code>
          {lines.map((line, index) => {
            if (index > shown.line || (index === shown.line && !finished && line.type !== "command" && shown.chars === 0)) return null
            const text = index < shown.line || finished ? line.text : line.text.slice(0, shown.chars)
            const typing = index === shown.line && !finished && line.type === "command"
            return (
              <span key={index} className="block">
                {line.type === "command" ? <span className="text-muted-foreground select-none">$ </span> : null}
                {line.type === "success" ? <span className="text-emerald-600 dark:text-emerald-400">✔ </span> : null}
                <span className={line.type === "output" ? "text-muted-foreground" : undefined}>{text}</span>
                {typing ? <span className="ml-px inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-foreground/70" /> : null}
              </span>
            )
          })}
        </code>
      </pre>
    </div>
  )
}

export { Terminal, type TerminalLine, type TerminalProps }
