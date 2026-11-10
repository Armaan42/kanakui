"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Blocks, ChevronDown, Download, LayoutGrid, Menu, X } from "lucide-react"

import type { NavGroup } from "@/lib/docs-nav"
import { cn } from "@/lib/utils"

const GROUP_ICON = { installation: Download, components: LayoutGrid, blocks: Blocks } as const

function isActive(pathname: string, href: string) {
  // Section index links ("/components") only match exactly; others also match sub-paths.
  return pathname === href
}

function groupContains(group: NavGroup, pathname: string) {
  return group.links.some((link) => isActive(pathname, link.href)) || pathname.startsWith(`/${group.id}/`)
}

function NavTree({ groups, onNavigate }: { groups: NavGroup[]; onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="space-y-1">
      {groups.map((group) => {
        const Icon = GROUP_ICON[group.id]
        const open = group.id === "installation" || groupContains(group, pathname)
        return (
          <details key={group.id} open={open} className="group/nav">
            <summary
              className={cn(
                "flex cursor-pointer list-none items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium outline-none select-none",
                "hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden"
              )}
            >
              <Icon aria-hidden="true" className="size-4 text-muted-foreground" />
              <span className="flex-1">{group.title}</span>
              <span className="font-mono text-xs text-muted-foreground tabular-nums">
                {group.id === "installation" ? null : group.links.length - 1}
              </span>
              <ChevronDown
                aria-hidden="true"
                className="size-3.5 text-muted-foreground transition-transform group-open/nav:rotate-180 motion-reduce:transition-none"
              />
            </summary>
            <ul className="mt-1 mb-3 ml-[1.0625rem] space-y-0.5 border-l pl-3">
              {group.links.map((link) => {
                const active = isActive(pathname, link.href)
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "-ml-px block truncate rounded-md border-l border-transparent px-2 py-1 text-sm transition-colors outline-none",
                        "focus-visible:ring-3 focus-visible:ring-ring/50",
                        active
                          ? "border-foreground bg-muted font-medium text-foreground"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      )}
                    >
                      {link.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </details>
        )
      })}
    </div>
  )
}

/** Sticky sidebar for large screens. */
export function DocsSidebar({ groups }: { groups: NavGroup[] }) {
  return (
    <nav aria-label="Docs and components">
      <NavTree groups={groups} />
    </nav>
  )
}

/**
 * Below the `lg` breakpoint the sidebar collapses into a "Menu" bar. The
 * toggle exposes `aria-expanded`; choosing a link or pressing Escape closes it.
 */
export function DocsMobileNav({ groups }: { groups: NavGroup[] }) {
  const [open, setOpen] = React.useState(false)
  const toggleRef = React.useRef<HTMLButtonElement>(null)
  const panelId = React.useId()
  const pathname = usePathname()
  const current = groups.flatMap((g) => g.links).find((link) => isActive(pathname, link.href))

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
    <div className="sticky top-14 z-30 border-b bg-background lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex h-11 w-full items-center gap-2 px-4 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset sm:px-6"
      >
        {open ? <X aria-hidden="true" className="size-4" /> : <Menu aria-hidden="true" className="size-4" />}
        <span className="font-medium">Menu</span>
        {current ? <span className="truncate text-muted-foreground">/ {current.title}</span> : null}
      </button>
      <nav
        id={panelId}
        aria-label="Docs and components"
        hidden={!open}
        className="max-h-[calc(100svh-6.25rem)] overflow-y-auto border-t px-2 py-3 sm:px-4"
      >
        <NavTree groups={groups} onNavigate={() => setOpen(false)} />
      </nav>
    </div>
  )
}
