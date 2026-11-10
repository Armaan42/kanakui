import type * as React from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { PageHeader } from "@/components/site/page-header"
import { getDocsNeighbours, getDocsPage } from "@/config/docs"

/** Wrapper for a docs page: title and description from config/docs.ts, content, then previous/next links. */
export function DocsArticle({ href, children }: { href: string; children: React.ReactNode }) {
  const page = getDocsPage(href)
  const { previous, next } = getDocsNeighbours(href)

  return (
    <article className="mx-auto w-full max-w-3xl space-y-10 px-4 py-10 sm:px-8 sm:py-14">
      <PageHeader eyebrow="Docs" title={page.title} description={page.description} />
      <div className="space-y-10">{children}</div>
      <nav aria-label="Docs pages" className="grid gap-3 border-t pt-8 sm:grid-cols-2">
        {previous ? (
          <Link
            href={previous.href}
            className="group rounded-lg border p-4 transition-colors hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowLeft aria-hidden="true" className="size-3.5" /> Previous
            </span>
            <span className="mt-1 block font-medium">{previous.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={next.href}
            className="group rounded-lg border p-4 text-right transition-colors hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
              Next <ArrowRight aria-hidden="true" className="size-3.5" />
            </span>
            <span className="mt-1 block font-medium">{next.title}</span>
          </Link>
        ) : null}
      </nav>
    </article>
  )
}

/** A numbered step with a title and body, for installation guides. */
export function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <li className="relative space-y-3 border-l pb-8 pl-8 last:pb-0">
      <span
        aria-hidden="true"
        className="absolute -left-3.5 flex size-7 items-center justify-center rounded-full border bg-background font-mono text-xs"
      >
        {number}
      </span>
      <h3 className="font-semibold">
        <span className="sr-only">Step {number}: </span>
        {title}
      </h3>
      <div className="space-y-3 text-sm leading-6 text-muted-foreground">{children}</div>
    </li>
  )
}
