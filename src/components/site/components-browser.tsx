"use client"

import * as React from "react"
import { Search } from "lucide-react"

import { ComponentGrid } from "@/components/site/component-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ComponentSummary } from "@/lib/registry"

/**
 * Client-side search over component metadata (title, name, description,
 * categories). The list is small and already on the page, so no request is made.
 */
export function ComponentsBrowser({ components }: { components: ComponentSummary[] }) {
  const [query, setQuery] = React.useState("")
  const q = query.trim().toLowerCase()

  const results = q
    ? components.filter((c) =>
        [c.title, c.name, c.description, ...c.categories].some((value) => value.toLowerCase().includes(q))
      )
    : components

  return (
    <div className="space-y-6">
      <div className="relative max-w-sm">
        <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search components"
          aria-label="Search components"
          className="pl-8"
        />
      </div>

      <p className="sr-only" aria-live="polite">
        {q ? `${results.length} ${results.length === 1 ? "result" : "results"}` : ""}
      </p>

      {results.length > 0 ? (
        <ComponentGrid components={results} />
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-16 text-center">
          <p className="text-sm text-muted-foreground">No components match “{query.trim()}”.</p>
          <Button type="button" variant="outline" size="sm" onClick={() => setQuery("")}>
            Clear search
          </Button>
        </div>
      )}
    </div>
  )
}
