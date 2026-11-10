import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ComponentPreview } from "@/components/site/component-preview"
import type { ItemSummary } from "@/lib/registry"

/**
 * The preview stays interactive (buttons, hover effects), so the card is not
 * one big link. The title and the arrow link to the component page.
 */
export function ComponentCard({ component }: { component: ItemSummary }) {
  const href = component.href
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border bg-card">
      <ComponentPreview name={component.name} className="h-52 border-b" />
      <div className="flex flex-1 items-start justify-between gap-3 p-4">
        <div className="min-w-0 space-y-1">
          <h3 className="font-medium">
            <Link
              href={href}
              className="rounded-sm hover:underline hover:underline-offset-4 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {component.title}
            </Link>
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{component.description}</p>
        </div>
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  )
}

export function ComponentGrid({ components }: { components: ItemSummary[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {components.map((component) => (
        <ComponentCard key={component.name} component={component} />
      ))}
    </div>
  )
}
