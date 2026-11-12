import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { CategoryNav } from "@/components/site/category-nav"
import { ItemsBrowser } from "@/components/site/items-browser"
import { PageHeader } from "@/components/site/page-header"
import { getCategories, getItems, getItemsByCategory, type CategoryWithCount, type ItemKind } from "@/lib/registry"

const INTRO: Record<ItemKind, { title: string; description: (count: number) => string }> = {
  components: {
    title: "Components",
    description: (n) =>
      `${n} ${n === 1 ? "component" : "components"} you can add to your project with one command. The source code is copied into your project for you to change.`,
  },
  blocks: {
    title: "Blocks",
    description: (n) =>
      `${n} ready-made page ${n === 1 ? "section" : "sections"} (heroes, pricing, footers and more). Each installs with one command and is built from components you can edit.`,
  },
  templates: {
    title: "Templates",
    description: (n) =>
      `${n} complete ${n === 1 ? "page" : "pages"} built from kanakui blocks. One command adds the page and every section in it to your project, ready to edit.`,
  },
}

/** Index (/<kind>) or category (/<kind>/category/<slug>) listing. */
export function ItemsIndex({ kind, category }: { kind: ItemKind; category?: CategoryWithCount }) {
  const all = getItems(kind)
  const items = category ? getItemsByCategory(kind, category.slug) : all
  const categories = getCategories(kind)
  // The grouped view is only for a section's index, and only when it has several categories.
  const groups =
    !category && kind !== "templates"
      ? categories.map((c) => ({ slug: c.slug, title: c.title, description: c.description, items: getItemsByCategory(kind, c.slug) }))
      : undefined

  const crumbs = [
    { href: "/", label: "Home" },
    { href: `/${kind}`, label: INTRO[kind].title },
    ...(category ? [{ href: `/${kind}/category/${category.slug}`, label: category.title }] : []),
  ]

  return (
    <div className="page-container space-y-8 py-10 sm:py-14">
      <div className="space-y-5">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            {crumbs.map((crumb, index) => {
              const last = index === crumbs.length - 1
              return (
                <li key={crumb.href} className="flex items-center gap-1">
                  {index > 0 ? <ChevronRight aria-hidden="true" className="size-3.5" /> : null}
                  {last ? (
                    <span aria-current="page" className="text-foreground">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-foreground">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
        <PageHeader
          title={category ? category.title : INTRO[kind].title}
          description={category ? category.description : INTRO[kind].description(all.length)}
        />
      </div>
      {kind === "templates" ? null : (
        <CategoryNav kind={kind} categories={categories} total={all.length} active={category?.slug} />
      )}
      <ItemsBrowser items={items} kind={kind} groups={groups} />
    </div>
  )
}
