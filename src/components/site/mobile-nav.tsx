"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Code, Menu, X } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { UserAvatar } from "@/components/site/account/user-avatar"
import { LogoMark } from "@/components/site/icons"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "@/hooks/use-session"
import { cn } from "@/lib/utils"

export interface MobileNavLink {
  title: string
  href: string
  /** Shown beside the title, e.g. how many components there are. */
  count?: number
}

interface MobileNavProps {
  siteName: string
  github: string
  /** The main sections, shown large. */
  primary: MobileNavLink[]
  /** Setup guides, shown as a smaller list. */
  guides: MobileNavLink[]
  className?: string
}

/**
 * The site menu on phones and small tablets: a full-screen panel with every
 * main section, the setup guides and the source code. It's a modal dialog, so focus is
 * trapped inside and Escape closes it; following a link closes it too.
 */
/** Sign in, or who's signed in with links to the account; hidden when accounts are off. */
function MobileAccount({ onNavigate }: { onNavigate: () => void }) {
  const session = useSession()
  if (session.status === "disabled" || session.status === "loading") return null
  if (session.status === "signed-out") {
    return (
      <Button asChild variant="outline" className="mt-6 w-full">
        <Link href="/sign-in" onClick={onNavigate}>
          Sign in
        </Link>
      </Button>
    )
  }
  const { user } = session
  return (
    <div className="mt-6 flex items-center gap-3 rounded-xl border p-3">
      <UserAvatar user={user} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{user.name ?? user.email}</p>
        <div className="mt-0.5 flex gap-3 text-sm text-muted-foreground">
          <Link href="/account" onClick={onNavigate} className="hover:text-foreground">
            Account
          </Link>
          <Link href="/account#favorites" onClick={onNavigate} className="hover:text-foreground">
            Favourites
          </Link>
          <button
            type="button"
            className="hover:text-foreground"
            onClick={async () => {
              onNavigate()
              await signOut()
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}

export function MobileNav({ siteName, github, primary, guides, className }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`))
  const close = () => setOpen(false)

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu" className={className}>
          <Menu aria-hidden="true" />
        </Button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex flex-col bg-background outline-none data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-top-2 data-closed:animate-out data-closed:fade-out-0 motion-reduce:animate-none"
        >
          <DialogPrimitive.Title className="sr-only">Menu</DialogPrimitive.Title>
          <div className="flex h-14 shrink-0 items-center justify-between border-b px-4 sm:px-6">
            <Link
              href="/"
              onClick={close}
              className="flex items-center gap-2 rounded-md font-semibold tracking-tight focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <LogoMark className="size-5" />
              {siteName}
            </Link>
            <DialogPrimitive.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close menu">
                <X aria-hidden="true" />
              </Button>
            </DialogPrimitive.Close>
          </div>

          <nav aria-label="Site menu" className="flex-1 overflow-y-auto px-4 pt-4 pb-10 sm:px-6">
            <ul className="divide-y border-b">
              {primary.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className="flex items-baseline justify-between gap-4 rounded-sm py-4 text-2xl font-semibold tracking-tight text-foreground transition-colors outline-none hover:text-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=page]:text-violet-600 dark:aria-[current=page]:text-violet-300"
                  >
                    {link.title}
                    {link.count !== undefined ? (
                      <span className="font-mono text-sm font-normal tracking-normal text-muted-foreground tabular-nums">{link.count}</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>

            <MobileAccount onNavigate={close} />

            <p className="mt-8 font-mono text-xs tracking-widest text-muted-foreground uppercase">Get started</p>
            <ul className="mt-3 grid gap-1">
              {guides.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-md py-1.5 text-base text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
                      "aria-[current=page]:font-medium aria-[current=page]:text-foreground"
                    )}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-md text-base text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Code aria-hidden="true" className="size-4" />
              Source code
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </nav>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
