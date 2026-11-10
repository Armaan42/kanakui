"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"

const links = [
  { label: "Product", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Blog", href: "#" },
]

/**
 * Site header with links and actions. Below the `md` breakpoint the links
 * collapse into a disclosure menu: the toggle reports its state with
 * `aria-expanded`, and Escape closes it and returns focus to the toggle.
 */
export function Navbar01() {
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
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <span aria-hidden="true" className="size-6 rounded-md bg-foreground" />
          Acme
        </a>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <Button variant="ghost">Sign in</Button>
          <Button>Get started</Button>
        </div>
        <Button
          ref={toggleRef}
          variant="ghost"
          size="icon"
          className="ml-auto md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      <div id={menuId} hidden={!open} className="border-t md:hidden">
        <nav aria-label="Main" className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="block rounded-md px-3 py-2 text-sm hover:bg-muted" onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid gap-2 border-t pt-3">
            <Button variant="outline">Sign in</Button>
            <Button>Get started</Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
