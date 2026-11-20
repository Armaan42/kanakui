"use client"

import * as React from "react"
import { RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SkeletonShimmer, SkeletonText } from "@/registry/default/ui/skeleton-shimmer"

export const meta = {
  title: "Dashboard loading state",
  description: "Skeletons shaped like the real figures and table while a dashboard loads. Press Refresh to load it again.",
}

// The shop and figures are made up.
const STATS = [
  { label: "Revenue", value: "$48,210", change: "+12.4%" },
  { label: "Orders", value: "1,284", change: "+8.1%" },
  { label: "Average order", value: "$37.55", change: "+3.9%" },
]
const ORDERS = [
  { id: "#48213", customer: "Ana Ribeiro", total: "$70.00", status: "Shipped" },
  { id: "#48212", customer: "Jonas Keller", total: "$124.50", status: "Packed" },
  { id: "#48211", customer: "Mei Lin", total: "$22.00", status: "Delivered" },
  { id: "#48210", customer: "Diego Alvarez", total: "$96.00", status: "Delivered" },
]

export default function DashboardLoading() {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!loading) return
    const timer = setTimeout(() => setLoading(false), 1600)
    return () => clearTimeout(timer)
  }, [loading])

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
          <p className="text-sm text-muted-foreground">Halden Goods · last 30 days</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setLoading(true)} disabled={loading}>
          <RefreshCw aria-hidden="true" className={loading ? "animate-spin motion-reduce:animate-none" : undefined} />
          Refresh
        </Button>
      </div>

      <div aria-busy={loading} aria-live="polite">
        {loading ? <span className="sr-only">Loading dashboard…</span> : null}

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-xl border bg-card p-5">
              {loading ? (
                <>
                  <SkeletonShimmer className="h-3.5 w-20" />
                  <SkeletonShimmer className="mt-3 h-7 w-28" />
                  <SkeletonShimmer className="mt-3 h-3 w-14" />
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-2xl font-semibold tabular-nums">{stat.value}</p>
                  <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">{stat.change}</p>
                </>
              )}
            </div>
          ))}
        </div>

        <section aria-labelledby="recent-orders" className="mt-6 rounded-xl border bg-card">
          <h2 id="recent-orders" className="border-b px-5 py-3 font-medium">
            Recent orders
          </h2>
          {loading ? (
            <div className="space-y-4 p-5">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <SkeletonShimmer className="size-8 rounded-full" />
                  <SkeletonText lines={2} className="flex-1" />
                  <SkeletonShimmer className="h-4 w-16" />
                </div>
              ))}
            </div>
          ) : (
            <ul className="divide-y">
              {ORDERS.map((order) => (
                <li key={order.id} className="flex items-center gap-4 px-5 py-3 text-sm">
                  <span className="grid size-8 place-items-center rounded-full bg-muted text-xs font-medium">
                    {order.customer.split(" ").map((p) => p[0]).join("")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{order.customer}</span>
                    <span className="block text-muted-foreground">
                      {order.id} · {order.status}
                    </span>
                  </span>
                  <span className="tabular-nums">{order.total}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
