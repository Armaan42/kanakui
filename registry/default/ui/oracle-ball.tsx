"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface OracleBallProps extends React.ComponentProps<"div"> {
  /** Answers it can give. */
  answers?: string[]
  onAnswer?: (answer: string) => void
}

const ANSWERS = [
  "Absolutely",
  "Go for it",
  "The stars agree",
  "Yes, but bring snacks",
  "Looking good",
  "Ask after coffee",
  "Too foggy to tell",
  "Flip a coin instead",
  "Wait for Tuesday",
  "Not today",
  "Hard pass",
  "The stars disagree",
  "Sleep on it",
  "Nope",
]

/**
 * A fortune-telling ball. Ask a question, shake it, and an answer floats up
 * on a die in the little window.
 */
function OracleBall({ answers = ANSWERS, onAnswer, className, ...props }: OracleBallProps) {
  const [answer, setAnswer] = React.useState<string | null>(null)
  const [shaking, setShaking] = React.useState(false)
  const [question, setQuestion] = React.useState("")
  const timer = React.useRef<number | undefined>(undefined)
  const id = React.useId()

  React.useEffect(() => () => window.clearTimeout(timer.current), [])

  const shake = () => {
    if (shaking) return
    const pick = answers[Math.floor(Math.random() * answers.length)]
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setShaking(true)
    setAnswer(null)
    timer.current = window.setTimeout(
      () => {
        setShaking(false)
        setAnswer(pick)
        onAnswer?.(pick)
      },
      still ? 0 : 900
    )
  }

  return (
    <div data-slot="oracle-ball" className={cn("flex w-72 max-w-full flex-col items-center gap-5", className)} {...props}>
      <div className="w-full">
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
          Ask a yes-or-no question
        </label>
        <input
          id={id}
          value={question}
          placeholder="Should I start the project today?"
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") shake()
          }}
          className="h-10 w-full rounded-md border bg-transparent px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      <button
        type="button"
        onClick={shake}
        aria-label="Shake the ball"
        className={cn(
          "relative grid aspect-square w-60 max-w-full place-items-center rounded-full bg-[radial-gradient(circle_at_32%_28%,#6b7280_0%,#1f2937_22%,#030712_62%)] shadow-[0_24px_40px_-16px_rgb(0_0_0/0.8),inset_-12px_-16px_30px_rgb(0_0_0/0.6)] outline-none focus-visible:ring-4 focus-visible:ring-indigo-400",
          shaking && "animate-oracle-ball-shake motion-reduce:animate-none"
        )}
      >
        <span aria-hidden="true" className="absolute top-[12%] left-[22%] h-[18%] w-[26%] -rotate-30 rounded-[50%] bg-white/25 blur-[3px]" />
        {/* The window. */}
        <span aria-hidden="true" className="relative grid size-[46%] place-items-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_40%,#1e1b4b,#020617_75%)] shadow-[inset_0_6px_12px_rgb(0_0_0/0.9),0_0_0_6px_#111827]">
          {answer ? (
            <span key={answer} className="relative grid size-[88%] animate-oracle-ball-rise place-items-center motion-reduce:animate-none">
              <svg viewBox="0 0 100 90" className="absolute inset-0 size-full">
                <polygon points="50,6 96,84 4,84" fill="#3730a3" stroke="#4f46e5" strokeWidth="2" />
              </svg>
              <span className="relative mt-[18%] max-w-[62%] text-center text-[10px] leading-tight font-bold tracking-wide text-indigo-50 uppercase">{answer}</span>
            </span>
          ) : (
            <span className="font-serif text-4xl text-white/80">?</span>
          )}
        </span>
      </button>

      <p role="status" className="min-h-5 text-center text-sm">
        {shaking ? "Shaking…" : answer ? `${question.trim() ? `“${question.trim()}” ` : ""}${answer}.` : "Shake the ball for an answer."}
      </p>
    </div>
  )
}

export { OracleBall }
