/**
 * Read-only access to registry metadata for the website.
 * Server-side only: pages pass plain `ComponentSummary` objects to client
 * components, so registry/index.ts is never bundled for the browser.
 */
import { registryCategories, type RegistryCategory } from "@/registry/categories"
import { registryItems } from "@/registry/index"
import type { RegistryEntry, RegistryEntryType } from "@/registry/types"

const PAGE_TYPES: RegistryEntryType[] = ["registry:ui", "registry:block", "registry:component"]

/** Serializable data a component card needs. Safe to pass to client components. */
export interface ComponentSummary {
  name: string
  title: string
  description: string
  categories: string[]
  releasedAt: string
}

export interface CategoryWithCount extends RegistryCategory {
  count: number
}

/** A file the CLI writes into the user's project, shown with the user's alias. */
export interface InstalledFile {
  path: string
  fromItem: string
}

const byName = new Map(registryItems.map((item) => [item.name, item]))

function toSummary(item: RegistryEntry): ComponentSummary {
  return {
    name: item.name,
    title: item.title,
    description: item.description,
    categories: item.categories,
    releasedAt: item.releasedAt,
  }
}

function hasPage(item: RegistryEntry) {
  return PAGE_TYPES.includes(item.type)
}

/** Every item that has a page under /components, sorted by title. */
export function getComponents(): ComponentSummary[] {
  return registryItems
    .filter(hasPage)
    .sort((a, b) => a.title.localeCompare(b.title))
    .map(toSummary)
}

export function getComponent(name: string): RegistryEntry | undefined {
  const item = byName.get(name)
  return item && hasPage(item) ? item : undefined
}

export function getFeaturedComponents(): ComponentSummary[] {
  return registryItems.filter((i) => hasPage(i) && i.featured).map(toSummary)
}

export function getLatestComponents(limit: number): ComponentSummary[] {
  return registryItems
    .filter(hasPage)
    .sort((a, b) => b.releasedAt.localeCompare(a.releasedAt) || a.title.localeCompare(b.title))
    .slice(0, limit)
    .map(toSummary)
}

/** Categories that contain at least one component with a page. */
export function getCategories(): CategoryWithCount[] {
  const pageItems = registryItems.filter(hasPage)
  return registryCategories
    .map((category) => ({
      ...category,
      count: pageItems.filter((i) => i.categories.includes(category.slug)).length,
    }))
    .filter((category) => category.count > 0)
}

export function getCategory(slug: string): CategoryWithCount | undefined {
  return getCategories().find((c) => c.slug === slug)
}

export function getComponentsByCategory(slug: string): ComponentSummary[] {
  return getComponents().filter((c) => c.categories.includes(slug))
}

export function getCategoryTitle(slug: string): string {
  return registryCategories.find((c) => c.slug === slug)?.title ?? slug
}

/** Components sharing the most categories with `item`. */
export function getRelatedComponents(item: RegistryEntry, limit: number): ComponentSummary[] {
  return registryItems
    .filter((other) => hasPage(other) && other.name !== item.name)
    .map((other) => ({
      other,
      shared: other.categories.filter((c) => item.categories.includes(c)).length,
    }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared || a.other.title.localeCompare(b.other.title))
    .slice(0, limit)
    .map(({ other }) => toSummary(other))
}

/** Our own items that `item` pulls in, depth-first and without duplicates. */
export function getInternalDependencies(item: RegistryEntry): RegistryEntry[] {
  const seen = new Set<string>()
  const result: RegistryEntry[] = []
  const visit = (name: string) => {
    if (seen.has(name)) return
    seen.add(name)
    const dep = byName.get(name)
    if (!dep) return
    dep.internalDependencies?.forEach(visit)
    result.push(dep)
  }
  item.internalDependencies?.forEach(visit)
  return result
}

/** npm packages installed for `item` and everything it pulls in. */
export function getNpmDependencies(item: RegistryEntry): string[] {
  const all = [item, ...getInternalDependencies(item)].flatMap((i) => i.dependencies ?? [])
  return [...new Set(all)].sort()
}

const TARGET_DIR: Partial<Record<RegistryEntryType, string>> = {
  "registry:ui": "@/components/ui",
  "registry:component": "@/components",
  "registry:block": "@/components",
  "registry:hook": "@/hooks",
  "registry:lib": "@/lib",
}

/**
 * Where the shadcn CLI writes each file, using the default aliases. Matches
 * what the install tests observed for registry:ui, registry:hook and registry:lib.
 */
export function getInstalledFiles(item: RegistryEntry): InstalledFile[] {
  return [...getInternalDependencies(item), item].flatMap((entry) =>
    entry.files.map((file) => {
      const fileName = file.path.split("/").pop() ?? file.path
      const dir = TARGET_DIR[file.type as RegistryEntryType]
      return {
        path: file.target ?? (dir ? `${dir}/${fileName}` : fileName),
        fromItem: entry.name,
      }
    })
  )
}
