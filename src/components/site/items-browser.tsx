"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, ArrowUpDown, Layers, LayoutGrid, Search, Shapes } from "lucide-react"

import { BlockGrid } from "@/components/site/block-card"
import { ComponentGrid } from "@/components/site/component-card"
import { TemplateGrid } from "@/components/site/template-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ItemKind, ItemSummary } from "@/lib/registry"
import { cn } from "@/lib/utils"

export interface ItemGroup {
  slug: string
  title: string
  description: string
  items: ItemSummary[]
}

export interface CategoryOption {
  slug: string
  title: string
  count: number
}

type View = "grouped" | "all"
type Sort = "curated" | "newest" | "name"
type Price = "all" | "free" | "pro"

const SORTS: { value: Sort; label: string }[] = [
  { value: "curated", label: "Curated" },
  { value: "newest", label: "Newest" },
  { value: "name", label: "A–Z" },
]

const PRICES: { value: Price; label: string; swatch: string }[] = [
  {
    value: "all",
    label: "All prices",
    swatch: "bg-linear-to-r from-sky-300 via-emerald-300 to-amber-300",
  },
  { value: "free", label: "Free", swatch: "bg-emerald-400" },
  { value: "pro", label: "Pro", swatch: "bg-amber-400" },
]

const KIND_SINGULAR: Record<ItemKind, string> = {
  components: "component",
  blocks: "block",
  templates: "template",
}

/** How many items each group shows before "View all". */
const GROUP_PREVIEW: Record<ItemKind, number> = {
  components: 3,
  blocks: 2,
  templates: 2,
}

const triggerClass = "bg-background dark:bg-background dark:hover:bg-muted"

// The chosen view is remembered across pages and visits. useSyncExternalStore
// keeps the server render ("grouped") and the stored choice consistent.
const VIEW_KEY = "kanakui-items-view"
const viewListeners = new Set<() => void>()

function readView(): View {
  try {
    return localStorage.getItem(VIEW_KEY) === "all" ? "all" : "grouped"
  } catch {
    return "grouped"
  }
}

function writeView(view: View) {
  try {
    localStorage.setItem(VIEW_KEY, view)
  } catch {
    // Storage unavailable: the choice still applies until the page is left.
  }
  viewListeners.forEach((listener) => listener())
}

function subscribeView(listener: () => void) {
  viewListeners.add(listener)
  return () => viewListeners.delete(listener)
}

function sortItems(items: ItemSummary[], sort: Sort) {
  const sorted = [...items]
  if (sort === "name") return sorted.sort((a, b) => a.title.localeCompare(b.title))
  if (sort === "newest") {
    return sorted.sort((a, b) => b.releasedAt.localeCompare(a.releasedAt) || a.title.localeCompare(b.title))
  }
  // Curated: featured first, then newest.
  return sorted.sort(
    (a, b) => Number(b.featured) - Number(a.featured) || b.releasedAt.localeCompare(a.releasedAt) || a.title.localeCompare(b.title),
  )
}

function Grid({ kind, items }: { kind: ItemKind; items: ItemSummary[] }) {
  if (kind === "templates") return <TemplateGrid templates={items} />
  if (kind === "blocks") return <BlockGrid blocks={items} />
  return <ComponentGrid components={items} />
}

/**
 * The listing on /components, /blocks and /templates, with one toolbar:
 * search, category, sort and price, plus a Grouped / All switch on a
 * section's index page. Searching or filtering by price shows matching items
 * in one grid. Everything except the category (a page of its own) is
 * filtered client-side: the list is small and already on the page.
 */
export function ItemsBrowser({
  items,
  kind,
  groups,
  total,
  categories,
  activeCategory,
}: {
  items: ItemSummary[]
  kind: ItemKind
  groups?: ItemGroup[]
  /** Items in the whole section, for the "All categories" option. */
  total: number
  categories?: CategoryOption[]
  activeCategory?: string
}) {
  const router = useRouter()
  const storedView = React.useSyncExternalStore(subscribeView, readView, () => "grouped" as View)
  const view: View = groups ? storedView : "all"
  const [query, setQuery] = React.useState("")
  const [sort, setSort] = React.useState<Sort>("curated")
  const [price, setPrice] = React.useState<Price>("all")

  const noun = kind
  const Noun = kind[0].toUpperCase() + kind.slice(1)
  const q = query.trim().toLowerCase()
  const filtered = q !== "" || price !== "all"
  const showGroups = view === "grouped" && groups !== undefined && !filtered

  const results = sortItems(
    items.filter(
      (item) =>
        (price === "all" || item.pricing === price) &&
        (!q || [item.title, item.name, item.description, ...item.categories].some((value) => value.toLowerCase().includes(q))),
    ),
    sort,
  )

  const clear = () => {
    setQuery("")
    setPrice("all")
  }

  return (
    <div className="space-y-8">
      <div
        role="toolbar"
        aria-label={`Find ${noun}`}
        className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-xl border bg-[repeating-linear-gradient(135deg,var(--border)_0_1px,transparent_1px_7px)] p-2.5"
      >
        {groups ? (
          <div role="group" aria-label="View" className="flex rounded-lg border bg-background p-0.5 shadow-xs">
            {(["grouped", "all"] as const).map((option) => {
              const Icon = option === "grouped" ? Layers : LayoutGrid
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={view === option}
                  onClick={() => writeView(option)}
                  className={cn(
                    "inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                    view === option ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon aria-hidden="true" className="size-4" />
                  {option === "grouped" ? "Grouped" : "All"}
                  <span className="sr-only">{` ${Noun}`}</span>
                </button>
              )
            })}
          </div>
        ) : null}

        <div className="relative w-full sm:w-auto sm:min-w-48 sm:flex-1 lg:max-w-80">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${total} ${noun}...`}
            aria-label={`Search ${noun}`}
            className="bg-background pl-8 dark:bg-background"
          />
        </div>

        {categories ? (
          <Select
            value={activeCategory ?? "all"}
            onValueChange={(value) => router.push(value === "all" ? `/${kind}` : `/${kind}/category/${value}`)}
          >
            <SelectTrigger aria-label="Category" className={triggerClass}>
              <Shapes aria-hidden="true" className="text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                All categories
                <span className="ml-auto font-mono text-xs text-muted-foreground tabular-nums">{total}</span>
              </SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.slug} value={category.slug}>
                  {category.title}
                  <span className="ml-auto pl-3 font-mono text-xs text-muted-foreground tabular-nums">{category.count}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}

        <Select value={sort} onValueChange={(value) => setSort(value as Sort)}>
          <SelectTrigger aria-label="Sort" className={triggerClass}>
            <ArrowUpDown aria-hidden="true" className="text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORTS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={price} onValueChange={(value) => setPrice(value as Price)}>
          <SelectTrigger aria-label="Price" className={triggerClass}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PRICES.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <span aria-hidden="true" className={cn("h-2 w-3.5 rounded-full", option.swatch)} />
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <p className="ml-auto pr-1.5 text-xs text-muted-foreground tabular-nums" aria-live="polite">
          {showGroups
            ? `${items.length} ${noun} in ${groups.length} categories`
            : `${results.length} ${results.length === 1 ? KIND_SINGULAR[kind] : noun}`}
        </p>
      </div>

      {showGroups ? (
        <div className="space-y-14">
          {groups.map((group) => (
            <section key={group.slug} aria-labelledby={`group-${group.slug}`} className="space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
                <div className="space-y-1">
                  <h2 id={`group-${group.slug}`} className="flex items-baseline gap-2 text-lg font-semibold tracking-tight">
                    {group.title}
                    <span className="font-mono text-xs font-normal text-muted-foreground tabular-nums">{group.items.length}</span>
                  </h2>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                </div>
                {group.items.length > GROUP_PREVIEW[kind] ? (
                  <Link
                    href={`/${kind}/category/${group.slug}`}
                    className="inline-flex items-center gap-1 rounded-sm text-sm font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    View all {group.items.length}
                    <span className="sr-only"> {group.title.toLowerCase()}</span>
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                ) : null}
              </div>
              <Grid kind={kind} items={sortItems(group.items, sort).slice(0, GROUP_PREVIEW[kind])} />
            </section>
          ))}
        </div>
      ) : results.length > 0 ? (
        <Grid kind={kind} items={results} />
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-16 text-center">
          <p className="text-sm text-muted-foreground">
            {price === "pro" && !q
              ? `No Pro ${noun} yet. Every kanakui ${KIND_SINGULAR[kind]} is free for now.`
              : `No ${noun} match “${query.trim()}”.`}
          </p>
          {filtered ? (
            <Button type="button" variant="outline" size="sm" onClick={clear}>
              Clear filters
            </Button>
          ) : null}
        </div>
      )}
    </div>
  )
}
