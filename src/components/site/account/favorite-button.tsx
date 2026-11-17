"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useFavorites } from "@/hooks/use-favorites"
import { cn } from "@/lib/utils"

/**
 * Save an item to the signed-in user's favourites. Visitors who aren't signed
 * in are taken to sign-in and brought back here afterwards.
 */
export function FavoriteButton({ name, title, className }: { name: string; title: string; className?: string }) {
  const { status, names, signedIn, sessionStatus, toggle } = useFavorites()
  const pathname = usePathname()
  const [failed, setFailed] = React.useState(false)

  if (sessionStatus === "disabled") return null

  const saved = names.has(name)
  const label = (
    <>
      <Heart aria-hidden="true" className={cn("size-4 transition-colors", saved && "fill-red-500 text-red-500")} />
      {saved ? "Saved" : "Save"}
    </>
  )

  if (sessionStatus === "signed-out") {
    return (
      <Button asChild variant="outline" size="sm" className={className}>
        <Link href={`/sign-in?next=${encodeURIComponent(pathname ?? "/")}`} aria-label={`Sign in to save ${title} to your favourites`}>
          {label}
        </Link>
      </Button>
    )
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-pressed={saved}
        aria-label={saved ? `Remove ${title} from favourites` : `Save ${title} to favourites`}
        disabled={!signedIn || status !== "ready"}
        onClick={async () => setFailed(!(await toggle(name)))}
      >
        {label}
      </Button>
      <span role="status" className="text-xs text-destructive">
        {failed ? "Couldn’t save. Try again." : status === "error" ? "Favourites didn’t load." : ""}
      </span>
    </div>
  )
}
