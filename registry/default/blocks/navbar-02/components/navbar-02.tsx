"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"

const links = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Customers", href: "#customers" },
  { label: "Docs", href: "#docs" },
]

/**
 * A floating, rounded navigation bar that stays centered at the top of the
 * page. Collapses into a dropdown below `md`, with Escape to close.
 * Set `currentHref` from your router to highlight the current link.
 */
export function Navbar02({ currentHref = "#features" }: { currentHref?: string }) {
  const [open, setOpen] = React.useState(false)
  const toggleRef = React.useRef<HTMLButtonElement>(null)
  const menuId = React.useId()

  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <div className="sticky top-4 z-40 px-4">
      <header className="mx-auto max-w-3xl rounded-2xl border bg-background/85 shadow-sm backdrop-blur">
        <div className="flex h-14 items-center gap-4 pr-2 pl-4">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span aria-hidden="true" className="size-5 rounded-full bg-foreground" />
            Acme
          </a>
          <nav aria-label="Main" className="mx-auto hidden md:block">
            <ul className="flex items-center gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={link.href === currentHref ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-sm transition-colors",
                      link.href === currentHref ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href="#"
            className="ml-auto hidden h-9 items-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90 md:inline-flex"
          >
            Sign up
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="ml-auto inline-flex size-9 items-center justify-center rounded-full outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
        <div id={menuId} hidden={!open} className="border-t px-2 py-2 md:hidden">
          <nav aria-label="Main">
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={link.href === currentHref ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2 text-sm hover:bg-muted aria-[current=page]:bg-muted"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#" className="mt-2 flex h-10 items-center justify-center rounded-xl bg-foreground text-sm font-medium text-background">
            Sign up
          </a>
        </div>
      </header>
    </div>
  )
}
