"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Heart, LogOut, UserRound } from "lucide-react"

import { UserAvatar } from "@/components/site/account/user-avatar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { signOut, useSession } from "@/hooks/use-session"
import { cn } from "@/lib/utils"

const item =
  "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm outline-none hover:bg-muted focus-visible:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"

/** "Sign in" for visitors; the avatar and its menu once signed in. Nothing when accounts are off. */
export function UserMenu({ className }: { className?: string }) {
  const session = useSession()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  if (session.status === "disabled") return null
  // Same footprint as the button, so the header doesn't shift once the session is known.
  if (session.status === "loading") return <span aria-hidden="true" className={cn("inline-block h-8 w-16", className)} />

  if (session.status === "signed-out") {
    const next = pathname && !["/sign-in", "/sign-up"].includes(pathname) ? `?next=${encodeURIComponent(pathname)}` : ""
    return (
      <Button asChild variant="outline" size="sm" className={className}>
        <Link href={`/sign-in${next}`}>Sign in</Link>
      </Button>
    )
  }

  const { user } = session
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Account menu for ${user.name ?? user.email ?? "you"}`}
          className={cn("rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50", className)}
        >
          <UserAvatar user={user} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-1.5">
        <div className="flex items-center gap-3 px-2.5 py-2">
          <UserAvatar user={user} className="size-9" />
          <div className="min-w-0">
            {user.name ? <p className="truncate text-sm font-medium">{user.name}</p> : null}
            {user.email ? <p className="truncate text-xs text-muted-foreground">{user.email}</p> : null}
          </div>
        </div>
        <div className="my-1 border-t" />
        <nav aria-label="Account">
          <Link href="/account" className={item} onClick={() => setOpen(false)}>
            <UserRound aria-hidden="true" className="size-4 text-muted-foreground" />
            Account
          </Link>
          <Link href="/account#favorites" className={item} onClick={() => setOpen(false)}>
            <Heart aria-hidden="true" className="size-4 text-muted-foreground" />
            Favourites
          </Link>
        </nav>
        <div className="my-1 border-t" />
        <button
          type="button"
          className={item}
          onClick={async () => {
            setOpen(false)
            await signOut()
            if (pathname?.startsWith("/account")) router.push("/")
            router.refresh()
          }}
        >
          <LogOut aria-hidden="true" className="size-4 text-muted-foreground" />
          Sign out
        </button>
      </PopoverContent>
    </Popover>
  )
}
