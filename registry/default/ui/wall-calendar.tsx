"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

export interface CalendarSelection {
  from: Date | null
  to: Date | null
}

interface WallCalendarProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Month shown first. Required so the server and browser render the same page. */
  defaultMonth: Date
  mode?: "single" | "range"
  selected?: CalendarSelection
  defaultSelected?: CalendarSelection
  onSelectedChange?: (selection: CalendarSelection) => void
  /** One photo per month, repeating if there are fewer than twelve. */
  photos?: { src: string; alt: string }[]
  /** Return true for days that can't be picked. */
  isDateDisabled?: (date: Date) => boolean
  /** 0 is Sunday, 1 is Monday. */
  weekStartsOn?: 0 | 1
  locale?: string
}

const key = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const addDays = (d: Date, days: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + days)
const sameMonth = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()

/**
 * A hanging wall calendar. Pages flip over from the binding as you change
 * month, and days can be picked singly or as a range, by pointer or keyboard.
 */
function WallCalendar({
  defaultMonth,
  mode = "single",
  selected: selectedProp,
  defaultSelected = { from: null, to: null },
  onSelectedChange,
  photos,
  isDateDisabled,
  weekStartsOn = 1,
  locale = "en-US",
  className,
  ...props
}: WallCalendarProps) {
  const [month, setMonth] = React.useState(() => new Date(defaultMonth.getFullYear(), defaultMonth.getMonth(), 1))
  const [internal, setInternal] = React.useState(defaultSelected)
  const [cursor, setCursor] = React.useState(() => startOfDay(defaultSelected.from ?? new Date(defaultMonth.getFullYear(), defaultMonth.getMonth(), 1)))
  const [flipped, setFlipped] = React.useState(false)
  const moveFocus = React.useRef(false)
  const grid = React.useRef<HTMLTableElement>(null)
  const selected = selectedProp ?? internal
  const year = month.getFullYear()
  const photo = photos?.length ? photos[month.getMonth() % photos.length] : null
  const title = new Intl.DateTimeFormat(locale, { month: "long" }).format(month)
  const fullDate = new Intl.DateTimeFormat(locale, { dateStyle: "full" })
  const weekday = new Intl.DateTimeFormat(locale, { weekday: "short" })
  const lead = (month.getDay() - weekStartsOn + 7) % 7
  const cells = Array.from({ length: 42 }, (_, i) => addDays(month, i - lead))
  const weeks = Array.from({ length: 6 }, (_, i) => cells.slice(i * 7, i * 7 + 7))
  const tabDate = sameMonth(cursor, month) ? cursor : month

  React.useEffect(() => {
    if (!moveFocus.current) return
    moveFocus.current = false
    grid.current?.querySelector<HTMLButtonElement>(`[data-date="${key(cursor)}"]`)?.focus()
  }, [cursor, month])

  const showMonth = (next: Date) => {
    setFlipped(true)
    setMonth(new Date(next.getFullYear(), next.getMonth(), 1))
  }

  const moveCursor = (next: Date) => {
    moveFocus.current = true
    setCursor(next)
    if (!sameMonth(next, month)) showMonth(next)
  }

  const choose = (date: Date) => {
    setCursor(date)
    let next: CalendarSelection = { from: date, to: null }
    if (mode === "range" && selected.from && !selected.to) {
      next = date < selected.from ? { from: date, to: selected.from } : { from: selected.from, to: date }
    }
    setInternal(next)
    onSelectedChange?.(next)
  }

  const onGridKey = (event: React.KeyboardEvent) => {
    const moves: Record<string, Date> = {
      ArrowLeft: addDays(cursor, -1),
      ArrowRight: addDays(cursor, 1),
      ArrowUp: addDays(cursor, -7),
      ArrowDown: addDays(cursor, 7),
      PageUp: new Date(cursor.getFullYear(), cursor.getMonth() - 1, Math.min(cursor.getDate(), 28)),
      PageDown: new Date(cursor.getFullYear(), cursor.getMonth() + 1, Math.min(cursor.getDate(), 28)),
    }
    const next = moves[event.key]
    if (!next) return
    event.preventDefault()
    moveCursor(next)
  }

  return (
    <div data-slot="wall-calendar" className={cn("relative w-80 max-w-full pt-3 [perspective:1100px]", className)} {...props}>
      <div aria-hidden="true" className="absolute inset-x-6 top-0 z-10 flex justify-between">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className="h-6 w-1 rounded-full bg-linear-to-b from-neutral-300 via-neutral-500 to-neutral-700 shadow-sm" />
        ))}
      </div>
      <div
        key={`${year}-${month.getMonth()}`}
        className={cn("origin-top overflow-hidden rounded-b-md rounded-t-sm bg-white text-neutral-900 shadow-[0_18px_34px_-16px_rgb(0_0_0/0.55)] ring-1 ring-black/10", flipped && "animate-wall-calendar-flip motion-reduce:animate-none")}
      >
        {photo ? (
          <img src={photo.src} alt={photo.alt} className="aspect-[2/1] w-full bg-neutral-200 object-cover" />
        ) : (
          <div aria-hidden="true" className="h-8 bg-neutral-900" />
        )}
        <div className="px-4 pt-3 pb-4">
          <div className="flex items-center justify-between">
            <button type="button" aria-label="Previous month" onClick={() => showMonth(new Date(year, month.getMonth() - 1, 1))} className="grid size-8 place-items-center rounded-md text-neutral-500 outline-none hover:bg-neutral-100 focus-visible:ring-3 focus-visible:ring-neutral-400">
              <ChevronLeft aria-hidden="true" className="size-4" />
            </button>
            <p aria-live="polite" className="text-center font-serif text-lg font-semibold">
              {title} <span className="font-normal text-neutral-500">{year}</span>
            </p>
            <button type="button" aria-label="Next month" onClick={() => showMonth(new Date(year, month.getMonth() + 1, 1))} className="grid size-8 place-items-center rounded-md text-neutral-500 outline-none hover:bg-neutral-100 focus-visible:ring-3 focus-visible:ring-neutral-400">
              <ChevronRight aria-hidden="true" className="size-4" />
            </button>
          </div>
          <table ref={grid} role="grid" aria-label={`${title} ${year}`} onKeyDown={onGridKey} className="mt-2 w-full table-fixed border-collapse text-center text-sm">
            <thead>
              <tr>
                {weeks[0].map((day) => (
                  <th key={day.getDay()} scope="col" className={cn("pb-1 text-[10px] font-medium tracking-wide uppercase", day.getDay() === 0 ? "text-red-700" : "text-neutral-500")}>
                    {weekday.format(day)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week) => (
                <tr key={key(week[0])}>
                  {week.map((day) => {
                    if (!sameMonth(day, month)) return <td key={key(day)} aria-hidden="true" className="h-9" />
                    const dayKey = key(day)
                    const from = selected.from && key(selected.from) === dayKey
                    const to = selected.to && key(selected.to) === dayKey
                    const inside = selected.from && selected.to && day > selected.from && day < selected.to
                    const disabled = isDateDisabled?.(day) ?? false
                    return (
                      <td key={dayKey} className={cn("h-9 p-0", inside && "bg-neutral-100", from && selected.to && "rounded-l-full bg-neutral-100", to && "rounded-r-full bg-neutral-100")}>
                        <button
                          type="button"
                          data-date={dayKey}
                          disabled={disabled}
                          tabIndex={dayKey === key(tabDate) ? 0 : -1}
                          aria-pressed={Boolean(from || to || inside)}
                          aria-label={fullDate.format(day)}
                          onClick={() => choose(day)}
                          className={cn(
                            "mx-auto grid size-8 place-items-center rounded-full tabular-nums outline-none hover:bg-neutral-200 focus-visible:ring-3 focus-visible:ring-neutral-400 disabled:text-neutral-300 disabled:line-through disabled:hover:bg-transparent",
                            day.getDay() === 0 && "text-red-700",
                            (from || to) && "bg-neutral-900 text-white hover:bg-neutral-800"
                          )}
                        >
                          {day.getDate()}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export { WallCalendar }
