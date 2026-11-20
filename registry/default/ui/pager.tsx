"use client"

import * as React from "react"
import { BellRing, ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

type Page = { from: string; text: string; time: string }

interface PagerProps extends React.ComponentProps<"div"> {
  /** Messages already on the pager, oldest first. */
  messages?: Page[]
  /** Messages the "Page me" button sends, in turn. Leave empty to hide the button. */
  incoming?: Page[]
  sound?: boolean
}

/**
 * A 90s pager. New pages beep, buzz and blink the light; press Read to see
 * them, with long messages scrolling across the two-line screen.
 */
function Pager({ messages = [], incoming = [], sound = true, className, ...props }: PagerProps) {
  const [inbox, setInbox] = React.useState(messages)
  const [unread, setUnread] = React.useState(messages.length)
  const [index, setIndex] = React.useState<number | null>(null)
  const [buzz, setBuzz] = React.useState(0)
  const sent = React.useRef(0)
  const audio = React.useRef<AudioContext | null>(null)

  const beep = () => {
    if (!sound) return
    try {
      audio.current ??= new AudioContext()
      const ctx = audio.current
      for (let i = 0; i < 3; i++) {
        const at = ctx.currentTime + i * 0.16
        const tone = ctx.createOscillator()
        const gain = ctx.createGain()
        tone.type = "square"
        tone.frequency.value = 2900
        gain.gain.setValueAtTime(0.05, at)
        gain.gain.setValueAtTime(0.0001, at + 0.09)
        tone.connect(gain).connect(ctx.destination)
        tone.start(at)
        tone.stop(at + 0.1)
      }
    } catch {
      // No Web Audio: it still buzzes.
    }
  }

  const receive = () => {
    const page = incoming[sent.current % incoming.length]
    sent.current += 1
    setInbox((list) => [...list, page])
    setUnread((count) => count + 1)
    setIndex(null)
    setBuzz((count) => count + 1)
    beep()
  }

  const read = (at: number) => {
    setIndex(at)
    // Reading the newest unread page marks everything up to it as read.
    setUnread((count) => Math.min(count, inbox.length - 1 - at))
  }

  const page = index !== null ? inbox[index] : null
  const status = page ? `Page ${index! + 1} of ${inbox.length}, from ${page.from} at ${page.time}: ${page.text}` : unread ? `${unread} new ${unread === 1 ? "page" : "pages"}` : "No new pages"

  return (
    <div data-slot="pager" className={cn("flex w-80 max-w-full flex-col items-center gap-4", className)} {...props}>
      <div
        key={buzz}
        className={cn(
          "relative w-full rounded-[1.75rem] bg-linear-to-b from-neutral-800 to-neutral-950 p-4 pt-5 shadow-[0_18px_30px_-16px_rgb(0_0_0/0.8),inset_0_2px_0_rgb(255_255_255/0.12)]",
          buzz > 0 && "animate-pager-buzz motion-reduce:animate-none"
        )}
      >
        <span
          aria-hidden="true"
          className={cn("absolute top-3 left-5 size-2 rounded-full bg-red-950", unread > 0 && "animate-pager-blink bg-red-500 shadow-[0_0_8px_2px_rgb(239_68_68/0.7)] motion-reduce:animate-none")}
        />
        <div className="flex gap-3">
          <div aria-hidden="true" className="h-[4.5rem] min-w-0 flex-1 overflow-hidden rounded-md bg-[linear-gradient(170deg,#b7c7a0,#93a77c)] px-2.5 py-2 font-mono text-[13px] leading-5 font-bold tracking-wide text-neutral-900/85 uppercase shadow-[inset_0_2px_6px_rgb(0_0_0/0.45)]">
            {page ? (
              <>
                <p className="flex justify-between gap-2 truncate">
                  <span className="truncate">
                    {index! + 1}/{inbox.length} {page.from}
                  </span>
                  <span>{page.time}</span>
                </p>
                <p className="overflow-hidden whitespace-nowrap">
                  <span
                    key={index}
                    className={cn("inline-block", page.text.length > 18 && "animate-pager-scroll motion-reduce:animate-none")}
                    style={{ animationDuration: `${Math.max(4, page.text.length * 0.28)}s` }}
                  >
                    {page.text}
                  </span>
                </p>
              </>
            ) : (
              <>
                <p className="flex items-center gap-1.5">
                  {unread ? <BellRing className="size-3.5" /> : null}
                  {unread ? `${unread} new` : "No new pages"}
                </p>
                <p className="opacity-70">{inbox.length ? "Press read" : "Waiting…"}</p>
              </>
            )}
          </div>
          <div className="flex w-16 flex-col gap-2">
            <button
              type="button"
              onClick={() => (index === null ? read(Math.max(0, inbox.length - Math.max(unread, 1))) : setIndex(null))}
              disabled={!inbox.length}
              className="h-9 rounded-full bg-neutral-600 text-[11px] font-bold tracking-wider text-white uppercase shadow-[0_2px_0_#171717] outline-none active:translate-y-px active:shadow-none focus-visible:ring-3 focus-visible:ring-sky-400 disabled:opacity-50"
            >
              {index === null ? "Read" : "Back"}
            </button>
            <div className="flex gap-1.5">
              <button
                type="button"
                aria-label="Previous page"
                disabled={index === null || index === 0}
                onClick={() => index !== null && read(index - 1)}
                className="grid h-7 flex-1 place-items-center rounded-full bg-neutral-700 text-neutral-200 outline-none focus-visible:ring-3 focus-visible:ring-sky-400 disabled:opacity-40"
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next page"
                disabled={index === null || index >= inbox.length - 1}
                onClick={() => index !== null && read(index + 1)}
                className="grid h-7 flex-1 place-items-center rounded-full bg-neutral-700 text-neutral-200 outline-none focus-visible:ring-3 focus-visible:ring-sky-400 disabled:opacity-40"
              >
                <ChevronRight aria-hidden="true" className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <p role="status" className="sr-only">
        {status}
      </p>
      {incoming.length ? (
        <button type="button" onClick={receive} className="inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50">
          <BellRing aria-hidden="true" className="size-4" />
          Page me
        </button>
      ) : null}
    </div>
  )
}

export { Pager }
export type { Page as PagerMessage }
