"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface MorphingPillProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** What the small pill shows. Not interactive: the pill itself is the toggle. */
  compact: React.ReactNode
  /** What the island shows when expanded. May include buttons. */
  expanded: React.ReactNode
  /** Names the toggle for screen readers, e.g. "Now playing: Night Drive". */
  label: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

interface Size {
  width: number
  height: number
}

/**
 * A black pill that morphs into a larger panel, like a phone's dynamic
 * island. It measures both views and animates its size and roundness
 * between them while they crossfade. Hover or click to open; move away,
 * press Escape or click outside to close.
 */
function MorphingPill({
  compact,
  expanded,
  label,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  ...props
}: MorphingPillProps) {
  const [hovered, setHovered] = React.useState(false)
  const [pinned, setPinned] = React.useState(defaultOpen)
  const open = openProp ?? (hovered || pinned)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const compactRef = React.useRef<HTMLSpanElement>(null)
  const pillRef = React.useRef<HTMLButtonElement>(null)
  const expandedRef = React.useRef<HTMLDivElement>(null)
  const [sizes, setSizes] = React.useState<{ compact: Size; expanded: Size } | null>(null)
  const panelId = React.useId()

  const setPinnedAndNotify = React.useCallback(
    (next: boolean) => {
      setPinned(next)
      onOpenChange?.(next)
    },
    [onOpenChange]
  )

  // Measure both views, and again whenever their content changes size.
  React.useLayoutEffect(() => {
    const c = compactRef.current
    const e = expandedRef.current
    if (!c || !e) return
    const measure = () =>
      setSizes({
        compact: { width: c.offsetWidth, height: c.offsetHeight },
        expanded: { width: e.offsetWidth, height: e.offsetHeight },
      })
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(c)
    observer.observe(e)
    return () => observer.disconnect()
  }, [])

  // Escape and clicks outside close an island opened by click.
  React.useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const hadFocus = rootRef.current?.contains(document.activeElement)
        setHovered(false)
        setPinnedAndNotify(false)
        if (hadFocus) requestAnimationFrame(() => pillRef.current?.focus())
      }
    }
    const onPointer = (event: PointerEvent) => {
      if (pinned && rootRef.current && !rootRef.current.contains(event.target as Node)) setPinnedAndNotify(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointer)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointer)
    }
  }, [open, pinned, setPinnedAndNotify])

  const size = sizes ? (open ? sizes.expanded : sizes.compact) : undefined
  const layer = "absolute top-0 left-1/2 w-max -translate-x-1/2 transition-[opacity,filter,scale] duration-300 motion-reduce:transition-none"

  return (
    <div
      ref={rootRef}
      data-slot="morphing-pill"
      data-open={open || undefined}
      className={cn("flex justify-center", className)}
      onPointerEnter={(event) => event.pointerType !== "touch" && setHovered(true)}
      onPointerLeave={(event) => event.pointerType !== "touch" && setHovered(false)}
      {...props}
    >
      <div
        className="relative overflow-hidden bg-black text-white shadow-[0_10px_30px_-10px_rgb(0_0_0/0.6)] ring-1 ring-white/10 transition-[width,height,border-radius] duration-500 ease-[cubic-bezier(0.32,1.25,0.5,1)] motion-reduce:transition-none"
        style={size ? { width: size.width, height: size.height, borderRadius: open ? 32 : size.height / 2 } : { borderRadius: 999 }}
      >
        <button
          ref={pillRef}
          type="button"
          aria-label={label}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => {
            setPinnedAndNotify(!pinned)
            // Opened from the keyboard: move focus to the first control inside.
            if (!pinned) {
              requestAnimationFrame(() => expandedRef.current?.querySelector<HTMLElement>("button, a[href], input, [tabindex='0']")?.focus())
            }
          }}
          className={cn(layer, "cursor-pointer rounded-full outline-none focus-visible:ring-3 focus-visible:ring-white/50", open && "pointer-events-none scale-90 opacity-0 blur-sm")}
          tabIndex={open ? -1 : 0}
        >
          <span ref={compactRef} className="block">
            {compact}
          </span>
        </button>
        <div
          ref={expandedRef}
          id={panelId}
          inert={!open}
          className={cn(layer, !open && "pointer-events-none scale-90 opacity-0 blur-sm")}
        >
          {expanded}
        </div>
      </div>
    </div>
  )
}

export { MorphingPill }
