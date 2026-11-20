"use client"

import * as React from "react"
import { BarChart3, Inbox, Settings, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { BarLoader } from "@/registry/default/ui/bar-loader"

export const meta = {
  title: "App page transitions",
  description: "The bar loader across the top of an app while the next page loads; pick a section in the sidebar to see it.",
}

// The app and its contents are made up.
const PAGES = {
  Inbox: { icon: Inbox, lines: ["Lena: venue walkthrough moved to Thursday", "Tomás: Q3 vendor contracts", "Mei: notes from the design review"] },
  Reports: { icon: BarChart3, lines: ["Weekly revenue · up 6.2%", "Churn by plan · steady", "Top referrers · 12 sources"] },
  People: { icon: Users, lines: ["Lena Okafor · Owner", "Tomás Rivera · Admin", "Mei Lin · Member"] },
  Settings: { icon: Settings, lines: ["Profile", "Billing", "Notifications"] },
} as const
type Page = keyof typeof PAGES

export default function AppNavigation() {
  const [page, setPage] = React.useState<Page>("Inbox")
  const [loading, setLoading] = React.useState(false)

  const go = (next: Page) => {
    if (next === page || loading) return
    setLoading(true)
    setTimeout(() => {
      setPage(next)
      setLoading(false)
    }, 1100)
  }

  return (
    <div className="relative flex min-h-svh">
      <div className="absolute inset-x-0 top-0 z-10 h-1">{loading ? <BarLoader label={`Loading ${page}`} className="rounded-none" /> : null}</div>
      <nav aria-label="Sections" className="w-52 shrink-0 border-r bg-muted/30 p-3">
        <p className="px-2 py-2 text-sm font-semibold">Oakline</p>
        <ul className="mt-2 space-y-0.5">
          {(Object.keys(PAGES) as Page[]).map((name) => {
            const Icon = PAGES[name].icon
            return (
              <li key={name}>
                <button
                  type="button"
                  aria-current={page === name ? "page" : undefined}
                  onClick={() => go(name)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                    page === name ? "bg-background font-medium shadow-xs" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon aria-hidden="true" className="size-4" />
                  {name}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
      <div aria-busy={loading} className={cn("flex-1 p-8 transition-opacity", loading && "opacity-60")}>
        <h1 className="text-2xl font-semibold tracking-tight">{page}</h1>
        <ul className="mt-6 divide-y rounded-xl border">
          {PAGES[page].lines.map((line) => (
            <li key={line} className="px-4 py-3 text-sm">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
