"use client"

import * as React from "react"
import { Check, RotateCcw } from "lucide-react"
import { useReducedMotion } from "motion/react"

import { CopyButton } from "@/components/site/copy-button"
import { cn } from "@/lib/utils"

interface Step {
  title: string
  body: string
}

/** CLI output lines, in order, with the pause before each appears. */
const OUTPUT = [
  { delay: 450, text: "Checking registry.", check: true },
  { delay: 900, text: "Installing dependencies.", check: true },
  { delay: 500, text: "Created 1 file:", check: true },
  { delay: 120, text: "  - src/components/ui/animated-card.tsx", check: false },
]

const TYPE_MS = 28

/**
 * The three install steps beside a terminal. When the terminal scrolls into
 * view it types the command and prints the CLI's output, and the step that
 * matches lights up. The output is the real output of this install in our
 * tests. Assistive technology gets the finished text, not the animation;
 * with reduced motion the finished state shows straight away.
 */
export function InstallDemo({ command, steps }: { command: string; steps: Step[] }) {
  const reduceMotion = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const [run, setRun] = React.useState(0)
  const [started, setStarted] = React.useState(false)
  const [typed, setTyped] = React.useState(0)
  const [lines, setLines] = React.useState(0)

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
      { threshold: 0.6 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    if (!started || reduceMotion) return
    const timers: ReturnType<typeof setTimeout>[] = []
    let at = 500
    for (let i = 1; i <= command.length; i++) {
      at += TYPE_MS
      timers.push(setTimeout(() => setTyped(i), at))
    }
    OUTPUT.forEach((line, index) => {
      at += line.delay
      timers.push(setTimeout(() => setLines(index + 1), at))
    })
    return () => timers.forEach(clearTimeout)
  }, [started, reduceMotion, command, run])

  const finished = reduceMotion || lines === OUTPUT.length
  const shownChars = reduceMotion ? command.length : typed
  const shownLines = reduceMotion ? OUTPUT.length : lines
  // Step 1 while waiting, step 2 while the command runs, step 3 once done.
  const activeStep = finished ? 2 : shownChars > 0 ? 1 : 0

  const replay = () => {
    setTyped(0)
    setLines(0)
    setRun((r) => r + 1)
  }

  return (
    <div ref={ref} className="grid items-center gap-12 lg:grid-cols-2">
      <ol className="space-y-8">
        {steps.map((step, index) => {
          const done = index < activeStep || (finished && index === activeStep)
          const current = index === activeStep && !finished
          return (
            <li
              key={step.title}
              className={cn(
                "flex gap-4 transition-opacity duration-500",
                !reduceMotion && started && !finished && index > activeStep && "opacity-45"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-colors duration-300",
                  (current || done) && "border-foreground bg-foreground text-background"
                )}
              >
                {done ? <Check className="size-3.5" /> : index + 1}
              </span>
              <div>
                <h3 className="font-medium">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
              </div>
            </li>
          )
        })}
      </ol>

      <div className="min-w-0 overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="flex items-center gap-2 border-b px-4 py-2.5">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-foreground/15" />
          <span aria-hidden="true" className="size-2.5 rounded-full bg-foreground/15" />
          <span aria-hidden="true" className="size-2.5 rounded-full bg-foreground/15" />
          <span className="ml-2 text-xs text-muted-foreground">Terminal</span>
          <div className="ml-auto flex items-center gap-1">
            {!reduceMotion && finished ? (
              <button
                type="button"
                onClick={replay}
                className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <RotateCcw aria-hidden="true" className="size-3.5" />
                <span className="sr-only">Replay the install</span>
              </button>
            ) : null}
            <CopyButton value={command} label="Copy install command" />
          </div>
        </div>
        <pre className="sr-only">
          {`$ ${command}\n${OUTPUT.map((line) => (line.check ? `✔ ${line.text}` : line.text)).join("\n")}`}
        </pre>
        <pre aria-hidden="true" className="min-h-48 overflow-x-auto p-4 font-mono text-[13px] leading-6">
          <code>
            <span className="text-muted-foreground">$ </span>
            {command.slice(0, shownChars)}
            {!finished && shownLines === 0 ? (
              <span className="ml-px inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-foreground/70" />
            ) : null}
            {OUTPUT.slice(0, shownLines).map((line) => (
              <React.Fragment key={line.text}>
                {"\n"}
                {line.check ? (
                  <>
                    <span className="text-emerald-600 dark:text-emerald-400">✔</span> {line.text}
                  </>
                ) : (
                  <span className="text-muted-foreground">{line.text}</span>
                )}
              </React.Fragment>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}
