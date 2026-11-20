"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"

interface FortuneCookieProps extends React.ComponentProps<"div"> {
  fortunes?: string[]
  onOpen?: (fortune: string) => void
}

const FORTUNES = [
  "A small step today saves a long walk tomorrow.",
  "The bug you're hunting is in the last place you'll look. Look there first.",
  "Someone is about to say yes to you.",
  "Your next good idea arrives in the shower.",
  "Drink some water. Future you says thanks.",
  "An old friend is thinking of you right now.",
  "The answer is simpler than the question.",
  "Ship it. Then make it better.",
  "Today is a good day to finish something.",
  "A walk will fix more than you expect.",
  "Good news is on its way. It's running a little late.",
]

/** Half a fortune cookie: a dome on top, a wing curling down at the end, folded to a point in the middle. */
const HALF = "M100 20C64 20 22 42 22 94C38 104 60 88 78 98C88 104 95 114 100 116Z"

/** A fortune cookie. Crack it open for a fortune and five lucky numbers. */
function FortuneCookie({ fortunes = FORTUNES, onOpen, className, ...props }: FortuneCookieProps) {
  const [fortune, setFortune] = React.useState<{ text: string; numbers: number[] } | null>(null)
  const [cracks, setCracks] = React.useState(0)
  const open = fortune !== null

  const crack = () => {
    if (open) return
    const text = fortunes[Math.floor(Math.random() * fortunes.length)]
    const numbers = new Set<number>()
    while (numbers.size < 5) numbers.add(1 + Math.floor(Math.random() * 49))
    setFortune({ text, numbers: [...numbers].sort((a, b) => a - b) })
    setCracks((count) => count + 1)
    onOpen?.(text)
  }

  return (
    <div data-slot="fortune-cookie" className={cn("flex w-80 max-w-full flex-col items-center gap-5", className)} {...props}>
      <button
        type="button"
        onClick={crack}
        disabled={open}
        aria-label="Crack the fortune cookie"
        className="relative h-52 w-full rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/60 disabled:cursor-default"
      >
        <svg aria-hidden="true" viewBox="0 0 200 140" className="absolute inset-x-0 top-6 mx-auto w-64 overflow-visible">
          <defs>
            <radialGradient id="fortune-cookie-bake" cx="0.35" cy="0.35" r="0.8">
              <stop offset="0" stopColor="#f6cf86" />
              <stop offset="0.6" stopColor="#e0a453" />
              <stop offset="1" stopColor="#b9772f" />
            </radialGradient>
          </defs>
          <ellipse cx="100" cy="126" rx="80" ry="8" fill="rgb(0 0 0 / 0.12)" />
          {/* The paper slip, tucked in the fold until the cookie breaks. */}
          <rect
            x="40"
            y="62"
            width="120"
            height="16"
            rx="1"
            fill="#fffef8"
            stroke="rgb(0 0 0 / 0.1)"
            className={cn("origin-center transition-[transform,opacity] delay-150 duration-500 [transform-box:fill-box]", open ? "translate-y-6 scale-x-125 opacity-100" : "scale-x-50 opacity-0")}
          />
          <g className={cn("transition-transform duration-500 ease-out [transform-box:view-box] [transform-origin:100px_80px]", open && "translate-x-[-18px] translate-y-[4px] -rotate-[20deg]")}>
            <path d={HALF} fill="url(#fortune-cookie-bake)" />
            <path d="M100 116C96 96 90 72 70 52" fill="none" stroke="#a8692a" strokeWidth="2.5" opacity="0.55" strokeLinecap="round" />
          </g>
          <g className={cn("transition-transform duration-500 ease-out [transform-box:view-box] [transform-origin:100px_80px]", open && "translate-x-[18px] translate-y-[4px] rotate-[20deg]")}>
            <path d={HALF} fill="url(#fortune-cookie-bake)" transform="matrix(-1 0 0 1 200 0)" />
            <path d="M100 116C104 96 110 72 130 52" fill="none" stroke="#a8692a" strokeWidth="2.5" opacity="0.55" strokeLinecap="round" />
          </g>
          {open ? (
            <g key={cracks} fill="#d79a4c" className="animate-fortune-cookie-crumbs motion-reduce:hidden">
              <circle cx="96" cy="88" r="2" />
              <circle cx="104" cy="92" r="1.5" />
              <circle cx="100" cy="84" r="1.2" />
            </g>
          ) : null}
        </svg>
      </button>

      <div aria-live="polite" className="min-h-28 w-full">
        {fortune ? (
          <div className="animate-fortune-cookie-slip rounded-sm border bg-[#fffef8] px-5 py-4 text-center text-neutral-800 shadow-sm motion-reduce:animate-none">
            <p className="font-serif text-base leading-snug">{fortune.text}</p>
            <p className="mt-2 font-mono text-xs tracking-wider text-red-700">Lucky numbers {fortune.numbers.join(" ")}</p>
          </div>
        ) : null}
      </div>

      {open ? (
        <button
          type="button"
          onClick={() => setFortune(null)}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <RotateCcw aria-hidden="true" className="size-3.5" />
          Another cookie
        </button>
      ) : null}
    </div>
  )
}

export { FortuneCookie }
