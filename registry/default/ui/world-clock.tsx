"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface ClockZone {
  city: string
  /** IANA time zone, e.g. "Asia/Tokyo". */
  timeZone: string
}

interface WorldClockProps extends React.ComponentProps<"ul"> {
  zones: ClockZone[]
}

interface Parts {
  hours: number
  minutes: number
  seconds: number
}

/** The wall-clock time in a zone, from Intl (no time-zone library needed). */
function partsIn(timeZone: string, date: Date): Parts {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone, hour: "numeric", minute: "numeric", second: "numeric", hourCycle: "h23" }).formatToParts(date)
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0)
  return { hours: get("hour"), minutes: get("minute"), seconds: get("second") }
}

/** The zone's UTC offset in minutes at `date`, e.g. 540 for Tokyo. */
function utcOffset(timeZone: string, date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date)
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0)
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"))
  return Math.round((asUtc - Math.floor(date.getTime() / 60000) * 60000) / 60000)
}

/** Hours ahead of or behind the viewer, e.g. "+8h", "-13.5h" or "Same time". */
function offsetLabel(timeZone: string, date: Date) {
  const diff = utcOffset(timeZone, date) + date.getTimezoneOffset()
  if (diff === 0) return "Same time"
  const h = diff / 60
  return `${h > 0 ? "+" : ""}${Number.isInteger(h) ? h : h.toFixed(1)}h`
}

const pad = (n: number) => String(n).padStart(2, "0")

/**
 * Analog clocks for several cities. Hands move smoothly (one shared
 * animation frame loop updates them directly, without re-rendering); faces
 * turn dark at night in that city. With reduced motion the second hand
 * ticks once a second.
 */
function WorldClock({ zones, className, ...props }: WorldClockProps) {
  const hands = React.useRef(new Map<string, { hour: HTMLElement | null; minute: HTMLElement | null; second: HTMLElement | null; digital: HTMLElement | null }>())
  const times = React.useRef(new Map<string, Parts>())
  const [snapshot, setSnapshot] = React.useState<{ night: boolean[]; offsets: string[] } | null>(null)
  // Restart the loop only when the zones themselves change, not when a new
  // array with the same zones is passed on every render.
  const zoneKey = zones.map((z) => `${z.city}@${z.timeZone}`).join("|")
  const zonesRef = React.useRef(zones)
  React.useEffect(() => {
    zonesRef.current = zones
  })

  React.useEffect(() => {
    const zones = zonesRef.current
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let frame = 0
    let interval = 0
    let lastSecond = -1
    let lastMinute = -1

    const update = () => {
      const now = new Date()
      if (now.getSeconds() !== lastSecond) {
        lastSecond = now.getSeconds()
        // Once a second, read each zone's wall time (Intl is too slow for every frame).
        zones.forEach((zone) => {
          const parts = partsIn(zone.timeZone, now)
          times.current.set(zone.timeZone, parts)
          const digital = hands.current.get(zone.timeZone)?.digital
          if (digital) digital.textContent = `${pad(parts.hours)}:${pad(parts.minutes)}`
        })
        // Once a minute, update day/night faces and offsets (this does re-render).
        if (now.getMinutes() !== lastMinute) {
          lastMinute = now.getMinutes()
          setSnapshot({
            night: zones.map((z) => {
              const h = times.current.get(z.timeZone)?.hours ?? 12
              return h < 6 || h >= 19
            }),
            offsets: zones.map((z) => offsetLabel(z.timeZone, now)),
          })
        }
      }
      const ms = reduced ? 0 : now.getMilliseconds()
      zones.forEach((zone) => {
        const el = hands.current.get(zone.timeZone)
        const p = times.current.get(zone.timeZone)
        if (!el || !p) return
        const s = p.seconds + ms / 1000
        const m = p.minutes + s / 60
        const h = (p.hours % 12) + m / 60
        if (el.second) el.second.style.transform = `rotate(${s * 6}deg)`
        if (el.minute) el.minute.style.transform = `rotate(${m * 6}deg)`
        if (el.hour) el.hour.style.transform = `rotate(${h * 30}deg)`
      })
    }

    if (reduced) {
      update()
      interval = window.setInterval(update, 1000)
    } else {
      const loop = () => {
        update()
        frame = requestAnimationFrame(loop)
      }
      frame = requestAnimationFrame(loop)
    }
    return () => {
      cancelAnimationFrame(frame)
      clearInterval(interval)
    }
  }, [zoneKey])

  const register = (timeZone: string, key: "hour" | "minute" | "second" | "digital") => (el: HTMLElement | null) => {
    const entry = hands.current.get(timeZone) ?? { hour: null, minute: null, second: null, digital: null }
    entry[key] = el
    hands.current.set(timeZone, entry)
  }

  return (
    <ul data-slot="world-clock" className={cn("flex flex-wrap justify-center gap-6", className)} {...props}>
      {zones.map((zone, i) => {
        const night = snapshot?.night[i] ?? false
        return (
          <li key={zone.timeZone} className="flex w-32 flex-col items-center gap-3">
            <span
              aria-hidden="true"
              className={cn(
                "relative block aspect-square w-full rounded-full transition-colors duration-700",
                night
                  ? "bg-neutral-900 text-white shadow-[inset_0_0_0_6px_rgb(64_64_64),0_10px_24px_-12px_rgb(0_0_0/0.6)]"
                  : "bg-white text-neutral-900 shadow-[inset_0_0_0_6px_rgb(229_229_229),0_10px_24px_-12px_rgb(0_0_0/0.35)]"
              )}
            >
              {/* Hour marks */}
              {Array.from({ length: 12 }, (_, h) => (
                <span key={h} className="absolute inset-[9%]" style={{ transform: `rotate(${h * 30}deg)` }}>
                  <span className={cn("absolute top-0 left-1/2 -translate-x-1/2 rounded-full bg-current", h % 3 === 0 ? "h-[10%] w-[3%]" : "h-[6%] w-[2%] opacity-50")} />
                </span>
              ))}
              {snapshot ? (
                <>
                  <span ref={register(zone.timeZone, "hour")} className="absolute inset-0">
                    <span className="absolute bottom-1/2 left-1/2 h-[26%] w-[4.5%] -translate-x-1/2 rounded-full bg-current" />
                  </span>
                  <span ref={register(zone.timeZone, "minute")} className="absolute inset-0">
                    <span className="absolute bottom-1/2 left-1/2 h-[37%] w-[3%] -translate-x-1/2 rounded-full bg-current" />
                  </span>
                  <span ref={register(zone.timeZone, "second")} className="absolute inset-0">
                    <span className="absolute bottom-[42%] left-1/2 h-[46%] w-[1.5%] -translate-x-1/2 rounded-full bg-orange-500" />
                  </span>
                </>
              ) : null}
              <span className="absolute top-1/2 left-1/2 size-[7%] -translate-1/2 rounded-full bg-orange-500 ring-2 ring-current" />
            </span>
            <span className="text-center">
              <span className="block text-sm font-medium">{zone.city}</span>
              <span className="block text-xs text-muted-foreground">
                <span ref={register(zone.timeZone, "digital")} className="font-mono tabular-nums">
                  --:--
                </span>
                {snapshot ? ` · ${snapshot.offsets[i]}` : null}
              </span>
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export { WorldClock }
