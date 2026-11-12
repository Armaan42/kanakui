"use client"

import * as React from "react"
import { Search } from "lucide-react"

import { BlockGrid } from "@/components/site/block-card"
import { ComponentGrid } from "@/components/site/component-card"
import { TemplateGrid } from "@/components/site/template-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ItemKind, ItemSummary } from "@/lib/registry"

/**
 * Client-side search over item metadata (title, name, description,
 * categories). The list is small and already on the page, so no request is made.
 */
export function ItemsBrowser({ items, kind }: { items: ItemSummary[]; kind: ItemKind }) {
  const [query, setQuery] = React.useState("")
  const q = query.trim().toLowerCase()
  const noun = kind

  const results = q
    ? items.filter((item) =>
        [item.title, item.name, item.description, ...item.categories].some((value) => value.toLowerCase().includes(q))
      )
    : items

  return (
    <div className="space-y-6">
      <div className="relative max-w-sm">
        <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`Search ${noun}`}
          aria-label={`Search ${noun}`}
          className="pl-8"
        />
      </div>

      <p className="sr-only" aria-live="polite">
        {q ? `${results.length} ${results.length === 1 ? "result" : "results"}` : ""}
      </p>

      {results.length > 0 ? (
        kind === "templates" ? (
          <TemplateGrid templates={results} />
        ) : kind === "blocks" ? (
          <BlockGrid blocks={results} />
        ) : (
          <ComponentGrid components={results} />
        )
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-16 text-center">
          <p className="text-sm text-muted-foreground">
            No {noun} match “{query.trim()}”.
          </p>
          <Button type="button" variant="outline" size="sm" onClick={() => setQuery("")}>
            Clear search
          </Button>
        </div>
      )}
    </div>
  )
}
