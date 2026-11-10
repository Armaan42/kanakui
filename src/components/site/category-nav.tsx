import Link from "next/link"

import type { CategoryWithCount } from "@/lib/registry"
import { cn } from "@/lib/utils"

interface CategoryNavProps {
  categories: CategoryWithCount[]
  total: number
  /** Slug of the current category; undefined on /components. */
  active?: string
}

export function CategoryNav({ categories, total, active }: CategoryNavProps) {
  const items = [
    { href: "/components", label: "All", count: total, current: active === undefined },
    ...categories.map((c) => ({
      href: `/components/category/${c.slug}`,
      label: c.title,
      count: c.count,
      current: c.slug === active,
    })),
  ]

  return (
    <nav aria-label="Categories">
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={cn(
                "inline-flex h-7 items-center gap-1.5 rounded-md border px-2.5 text-sm transition-colors",
                "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                item.current
                  ? "border-foreground/20 bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              )}
            >
              {item.label}
              <span className="font-mono text-xs text-muted-foreground tabular-nums">{item.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
