"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"

import { SaasLandingLogo } from "./saas-landing-logo"

const links = [
  { label: "Product", href: "#features" },
  { label: "Customers", href: "#customers" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Changelog", href: "#" },
]

/**
 * Sticky header. Below `md` the links move into a disclosure menu that
 * closes on Escape (returning focus to the toggle) or when a link is chosen.
 */
export function SaasLandingNavbar() {
  const [open, setOpen] = React.useState(false)
  const toggleRef = React.useRef<HTMLButtonElement>(null)
  const menuId = React.useId()

  React.useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-4 sm:px-6">
        <a href="#" aria-label="Pulsewise home" className="rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
          <SaasLandingLogo />
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <a href="#">Sign in</a>
          </Button>
          <Button size="sm" asChild>
            <a href="#pricing">Start free trial</a>
          </Button>
        </div>

        <Button
          ref={toggleRef}
          type="button"
          variant="ghost"
          size="icon"
          className="ml-auto md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>

      <div id={menuId} hidden={!open} className="border-t bg-background md:hidden">
        <nav aria-label="Main" className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <ul className="grid gap-1">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-sm font-medium outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid grid-cols-2 gap-2 border-t pt-3">
            <Button variant="outline" asChild>
              <a href="#">Sign in</a>
            </Button>
            <Button asChild>
              <a href="#pricing" onClick={() => setOpen(false)}>
                Start free trial
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
