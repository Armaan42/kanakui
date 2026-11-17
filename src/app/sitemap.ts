import type { MetadataRoute } from "next"

import { docsPages } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { getCategories, getItems, type ItemKind } from "@/lib/registry"

const KINDS: ItemKind[] = ["components", "blocks", "templates"]

/**
 * Every public page: home, listings, guides, category pages and item pages.
 * The bare `/view/<name>` preview frames are left out (they are `noindex`).
 * No `lastModified`: the registry has no per-item dates and guessing one
 * would tell crawlers something untrue.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...KINDS.map((kind) => `/${kind}`),
    "/themes",
    "/privacy",
    ...docsPages.map((page) => page.href),
    ...KINDS.flatMap((kind) =>
      kind === "templates" ? [] : getCategories(kind).map((category) => `/${kind}/category/${category.slug}`)
    ),
    ...KINDS.flatMap((kind) => getItems(kind).map((item) => item.href)),
  ]

  return [...new Set(paths)].map((path) => ({ url: new URL(path, siteConfig.url).toString() }))
}
