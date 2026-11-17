import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { CommandBlock } from "@/components/site/command-block"
import { TemplateCard, TemplateGrid } from "@/components/site/template-card"
import { Button } from "@/components/ui/button"
import { installCommandByUrl } from "@/config/site"
import { getItem, getItems } from "@/lib/registry"

/** Readable names for a template's section files (`<template>-<section>.tsx`). */
const SECTION_LABELS: Record<string, string> = {
  navbar: "Navbar",
  hero: "Hero",
  dashboard: "Product dashboard",
  logos: "Logo cloud",
  features: "Features",
  customers: "Customer story",
  pricing: "Pricing",
  faq: "FAQ",
  cta: "Call to action",
  footer: "Footer",
}

/** The sections a template is made of, in file order, read from its registry files. */
function templateSections(name: string): string[] {
  const item = getItem("templates", name)
  if (!item) return []
  return item.files.flatMap((file) => {
    const match = file.path.match(new RegExp(`/${name}-([a-z-]+)\\.tsx$`))
    const label = match ? SECTION_LABELS[match[1]!] : undefined
    return label ? [label] : []
  })
}

/**
 * Templates on the homepage: the first template large, with what's inside and
 * how to install it, and any others in a grid below. Everything is read from
 * the registry, so new templates show up here on their own.
 */
export function HomeTemplates() {
  const templates = getItems("templates")
  const [featured, ...rest] = templates
  if (!featured) return null
  const sections = templateSections(featured.name)

  return (
    <section aria-labelledby="templates" className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Templates</p>
            <h2 id="templates" className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Everything you need to build a modern product
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              Complete pages with real copy and photos. One command adds the page and every section in it to your
              project, ready to rebrand.
            </p>
          </div>
          <Link
            href="/templates"
            className="inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            Browse templates <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
          <TemplateCard template={featured} thumbnailOnly />

          <div className="flex min-w-0 flex-col rounded-xl border bg-card p-6">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Featured template</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight">{featured.title}</h3>
            <p className="mt-2 text-sm text-pretty text-muted-foreground">{featured.description}</p>

            {sections.length ? (
              <>
                <p className="mt-6 text-sm font-medium">
                  What’s inside <span className="font-normal text-muted-foreground">· {sections.length} sections</span>
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {sections.map((section) => (
                    <li key={section} className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">
                      {section}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <div className="mt-auto space-y-3 pt-6">
              <CommandBlock packageManagers={false} command={installCommandByUrl(featured.name)} copyLabel={`Copy install command for ${featured.title}`} />
              <div className="flex flex-wrap gap-2">
                <Button asChild>
                  <Link href={featured.href}>View details</Link>
                </Button>
                <Button asChild variant="outline">
                  <a href={`/view/${featured.name}`} target="_blank" rel="noreferrer">
                    Live demo <ArrowUpRight aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {rest.length ? (
          <div className="mt-5">
            <TemplateGrid templates={rest} />
          </div>
        ) : null}
      </div>
    </section>
  )
}
