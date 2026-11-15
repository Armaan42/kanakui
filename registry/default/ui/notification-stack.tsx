"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface StackNotification {
  id: string
  /** App name, e.g. "Messages". */
  app: string
  title: string
  body: string
  /** When it arrived, e.g. "now" or "9:41". */
  time: string
  /** App icon, e.g. a lucide icon. Shown in a colored square (see `iconClassName`). */
  icon?: React.ReactNode
  /** Background for the icon square, e.g. "bg-emerald-500". */
  iconClassName?: string
  /** A person's photo; replaces the icon, with the app icon as a small badge. */
  avatar?: string
}

interface NotificationStackProps extends React.ComponentProps<"div"> {
  notifications: StackNotification[]
  /** Heading above the stack. */
  heading?: string
  expanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
}

const CARD_HEIGHT = 76
const GAP = 8
const PEEK = 10

/**
 * Notifications stacked like a phone's lock screen. Hovering the stack,
 * clicking it, or the "Show all" button fans them out into a list; "Show
 * less" stacks them again. Every notification is always in the list for
 * screen readers.
 */
function NotificationStack({
  notifications,
  heading = "Notifications",
  expanded: expandedProp,
  defaultExpanded = false,
  onExpandedChange,
  className,
  ...props
}: NotificationStackProps) {
  const [hovered, setHovered] = React.useState(false)
  const [pinned, setPinned] = React.useState(defaultExpanded)
  const expanded = expandedProp ?? (hovered || pinned)
  const count = notifications.length
  const listId = React.useId()

  const setPinnedAndNotify = (next: boolean) => {
    setPinned(next)
    onExpandedChange?.(next)
  }

  const height = expanded ? count * CARD_HEIGHT + (count - 1) * GAP : CARD_HEIGHT + Math.min(count - 1, 2) * PEEK

  return (
    <div data-slot="notification-stack" className={cn("w-full max-w-sm", className)} {...props}>
      <div className="mb-2 flex items-center justify-between px-1">
        <p className="text-sm font-semibold">{heading}</p>
        {count > 1 ? (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={listId}
            onClick={() => setPinnedAndNotify(!pinned)}
            className="rounded-full bg-foreground/10 px-2.5 py-0.5 text-xs font-medium backdrop-blur outline-none hover:bg-foreground/15 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {expanded ? "Show less" : `Show all ${count}`}
          </button>
        ) : null}
      </div>

      {/* Pointer users can hover or click the stack itself; the button above is the accessible control. */}
      <div
        onPointerEnter={(event) => event.pointerType !== "touch" && setHovered(true)}
        onPointerLeave={(event) => event.pointerType !== "touch" && setHovered(false)}
        onClick={() => !expanded && setPinnedAndNotify(true)}
        className={cn("relative transition-[height] duration-500 ease-[cubic-bezier(0.32,1.2,0.6,1)] motion-reduce:transition-none", !expanded && "cursor-pointer")}
        style={{ height }}
      >
        <ul id={listId} className="absolute inset-0">
          {notifications.map((n, index) => {
            const behind = !expanded && index > 0
            const hidden = !expanded && index > 2
            return (
              <li
                key={n.id}
                className={cn(
                  "absolute inset-x-0 top-0 flex items-center gap-3 rounded-2xl border border-white/30 bg-white/70 px-3.5 shadow-[0_8px_24px_-12px_rgb(0_0_0/0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/70",
                  "origin-top transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.32,1.2,0.6,1)] motion-reduce:transition-none"
                )}
                style={{
                  height: CARD_HEIGHT,
                  zIndex: count - index,
                  opacity: hidden ? 0 : 1,
                  transform: expanded
                    ? `translateY(${index * (CARD_HEIGHT + GAP)}px)`
                    : `translateY(${Math.min(index, 2) * PEEK}px) scale(${1 - Math.min(index, 2) * 0.05})`,
                }}
              >
                <span className={cn("flex w-full items-center gap-3 transition-opacity duration-300", behind && "opacity-0")}>
                  <span className="relative shrink-0">
                    {n.avatar ? (
                      <img src={n.avatar} alt="" className="size-10 rounded-full object-cover" />
                    ) : (
                      <span className={cn("grid size-10 place-items-center rounded-[11px] text-white [&_svg]:size-5", n.iconClassName ?? "bg-neutral-500")}>
                        {n.icon}
                      </span>
                    )}
                    {n.avatar && n.icon ? (
                      <span
                        className={cn(
                          "absolute -right-1 -bottom-1 grid size-5 place-items-center rounded-md text-white ring-2 ring-white dark:ring-neutral-900 [&_svg]:size-3",
                          n.iconClassName ?? "bg-neutral-500"
                        )}
                      >
                        {n.icon}
                      </span>
                    ) : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-neutral-900 dark:text-white">{n.title}</span>
                      <span className="shrink-0 text-xs text-neutral-500 dark:text-neutral-400">{n.time}</span>
                    </span>
                    <span className="line-clamp-2 text-[13px] leading-snug text-neutral-700 dark:text-neutral-300">
                      <span className="sr-only">{n.app}: </span>
                      {n.body}
                    </span>
                  </span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export { NotificationStack }
