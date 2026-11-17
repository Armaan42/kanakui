"use client"

import * as React from "react"

import type { SessionUser } from "@/hooks/use-session"
import { cn } from "@/lib/utils"

/** The Google photo, or initials when there's none (or it fails to load). */
export function UserAvatar({ user, className }: { user: SessionUser; className?: string }) {
  const [failed, setFailed] = React.useState(false)
  const initials = (user.name ?? user.email ?? "?")
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")

  return (
    <span className={cn("inline-grid size-8 shrink-0 place-items-center overflow-hidden rounded-full border bg-muted text-xs font-medium text-foreground", className)}>
      {user.avatarUrl && !failed ? (
        // Google profile photos refuse requests that carry a Referer header.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.avatarUrl} alt="" referrerPolicy="no-referrer" className="size-full object-cover" onError={() => setFailed(true)} />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </span>
  )
}
