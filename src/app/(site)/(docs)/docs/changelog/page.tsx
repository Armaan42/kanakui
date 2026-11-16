import type { Metadata } from "next"
import Link from "next/link"

import { DocsArticle } from "@/components/site/docs-article"
import { DocsSection } from "@/components/site/docs"
import { getDocsPage } from "@/config/docs"
import { formatDate } from "@/lib/format"
import { getItems, KIND_LABEL, type ItemKind, type ItemSummary } from "@/lib/registry"

const HREF = "/docs/changelog"
const page = getDocsPage(HREF)

// "Changelog" alone is also the title of the changelog-01 block page.
export const metadata: Metadata = { title: "Changelog: new components and blocks", description: page.description }

const KINDS: ItemKind[] = ["components", "blocks", "templates"]

function summary(items: ItemSummary[]) {
  return KINDS.flatMap((kind) => {
    const count = items.filter((item) => item.kind === kind).length
    if (count === 0) return []
    return `${count} ${KIND_LABEL[kind][count === 1 ? "singular" : "plural"]}`
  }).join(", ")
}

/**
 * Built from each item's `releasedAt` in the registry, so it can't drift from
 * what's actually published. Items record when they were added, not when they
 * were last changed, so this lists additions only.
 */
export default function ChangelogPage() {
  const items = KINDS.flatMap((kind) => getItems(kind))
  const byDate = new Map<string, ItemSummary[]>()
  for (const item of items) byDate.set(item.releasedAt, [...(byDate.get(item.releasedAt) ?? []), item])
  const releases = [...byDate].sort(([a], [b]) => b.localeCompare(a))

  return (
    <DocsArticle href={HREF}>
      {releases.map(([date, added]) => {
        const sorted = [...added].sort((a, b) => KINDS.indexOf(a.kind) - KINDS.indexOf(b.kind) || a.title.localeCompare(b.title))
        return (
          <DocsSection key={date} id={`added-${date}`} title={formatDate(date)}>
            <p className="text-sm text-muted-foreground">Added {summary(added)}.</p>
            <ul className="grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
              {sorted.map((item) => (
                <li key={item.name} className="flex min-w-0 items-baseline gap-2">
                  <Link href={item.href} className="truncate underline-offset-4 hover:underline">
                    {item.title}
                  </Link>
                  <span className="shrink-0 text-xs text-muted-foreground">{KIND_LABEL[item.kind].singular}</span>
                </li>
              ))}
            </ul>
          </DocsSection>
        )
      })}
    </DocsArticle>
  )
}
