"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, Loader2, LogOut, Trash2, X } from "lucide-react"

import { UserAvatar } from "@/components/site/account/user-avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useFavorites } from "@/hooks/use-favorites"
import { signOut, useSession } from "@/hooks/use-session"
import { siteConfig } from "@/config/site"
import { getBrowserSupabase } from "@/lib/supabase/client"

export interface AccountItem {
  name: string
  title: string
  href: string
  kind: string
}

const section = "space-y-4 rounded-2xl border bg-card p-6 text-card-foreground"

export function AccountView({ items }: { items: AccountItem[] }) {
  const session = useSession()
  const favorites = useFavorites()
  const router = useRouter()
  const byName = React.useMemo(() => new Map(items.map((item) => [item.name, item])), [items])
  const [deleted, setDeleted] = React.useState(false)
  const onDeleted = React.useCallback(() => setDeleted(true), [])

  if (deleted) {
    return (
      <div role="status" className={section}>
        <p className="font-medium">Your account was deleted.</p>
        <p className="text-sm text-muted-foreground">Your profile and favourites are gone. Thanks for trying {siteConfig.name}.</p>
        <Button asChild size="sm" variant="outline">
          <Link href="/">Back to the homepage</Link>
        </Button>
      </div>
    )
  }

  if (session.status === "loading") {
    return <p className="text-sm text-muted-foreground">Loading your account…</p>
  }
  if (session.status !== "signed-in") {
    return (
      <div className={section}>
        <p className="text-sm text-muted-foreground">You’re signed out.</p>
        <Button asChild size="sm">
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </div>
    )
  }

  const { user } = session
  // Newest first isn't stored client-side; keep the site's own order (components, blocks, templates).
  const saved = items.filter((item) => favorites.names.has(item.name))
  const unknown = [...favorites.names].filter((name) => !byName.has(name))

  return (
    <div className="space-y-8">
      <section aria-labelledby="profile" className={section}>
        <h2 id="profile" className="sr-only">
          Profile
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <UserAvatar user={user} className="size-14 text-base" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-medium">{user.name ?? "Your account"}</p>
            {user.email ? <p className="truncate text-sm text-muted-foreground">{user.email}</p> : null}
            <p className="mt-1 text-xs text-muted-foreground">Signed in with Google</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={async () => {
              await signOut()
              router.push("/")
              router.refresh()
            }}
          >
            <LogOut aria-hidden="true" className="size-4" />
            Sign out
          </Button>
        </div>
      </section>

      <section id="favorites" aria-labelledby="favorites-heading" className={`${section} scroll-mt-24`}>
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="favorites-heading" className="text-lg font-semibold tracking-tight">
            Favourites
          </h2>
          {favorites.status === "ready" ? (
            <span className="font-mono text-xs text-muted-foreground tabular-nums">{saved.length}</span>
          ) : null}
        </div>
        {favorites.status === "loading" || favorites.status === "idle" ? (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 aria-hidden="true" className="size-4 animate-spin" /> Loading favourites…
          </p>
        ) : favorites.status === "error" ? (
          <p className="text-sm text-destructive">Your favourites didn’t load. Refresh the page to try again.</p>
        ) : saved.length === 0 ? (
          <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed p-6">
            <p className="text-sm text-muted-foreground">
              No favourites yet. Press <Heart aria-hidden="true" className="inline size-3.5 align-[-2px]" /> Save on any
              component, block or template.
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href="/components">Browse components</Link>
            </Button>
          </div>
        ) : (
          <ul className="divide-y rounded-xl border">
            {saved.map((item) => (
              <li key={item.name} className="flex items-center gap-3 px-4 py-2.5">
                <Link href={item.href} className="min-w-0 flex-1 truncate text-sm font-medium underline-offset-4 hover:underline">
                  {item.title}
                </Link>
                <span className="text-xs text-muted-foreground capitalize">{item.kind.replace(/s$/, "")}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Remove ${item.title} from favourites`}
                  onClick={() => favorites.toggle(item.name)}
                >
                  <X aria-hidden="true" className="size-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
        {unknown.length > 0 ? (
          <p className="text-xs text-muted-foreground">
            {unknown.length} saved {unknown.length === 1 ? "item no longer exists" : "items no longer exist"} on the site.
          </p>
        ) : null}
      </section>

      <DeleteAccount onDeleted={onDeleted} />
    </div>
  )
}

/** Deletes the account and its favourites via the `delete_account()` database function. */
function DeleteAccount({ onDeleted }: { onDeleted: () => void }) {
  const [pending, setPending] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function remove() {
    const supabase = getBrowserSupabase()
    if (!supabase) return
    setPending(true)
    setError(null)
    const { error } = await supabase.rpc("delete_account")
    if (error) {
      setPending(false)
      setError("Your account couldn’t be deleted. Please try again.")
      return
    }
    onDeleted()
    await signOut()
  }

  return (
    <section aria-labelledby="delete-heading" className={`${section} border-destructive/30`}>
      <h2 id="delete-heading" className="text-lg font-semibold tracking-tight">
        Delete account
      </h2>
      <p className="text-sm text-muted-foreground">
        Removes your account and your favourites for good. Your installed components aren’t affected; they live in your
        project.
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" variant="destructive" size="sm">
            <Trash2 aria-hidden="true" className="size-4" />
            Delete account
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete your account?</DialogTitle>
            <DialogDescription>
              Your account and favourites are removed right away. This can’t be undone. You can always sign in with Google
              again later to start fresh.
            </DialogDescription>
          </DialogHeader>
          <p role="alert" className="min-h-5 text-sm text-destructive">
            {error}
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={pending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" variant="destructive" disabled={pending} onClick={remove}>
              {pending ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : null}
              {pending ? "Deleting…" : "Delete account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
