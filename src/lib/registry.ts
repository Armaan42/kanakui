/**
 * Read-only access to registry metadata for the website.
 * Server-side only: pages pass plain `ItemSummary` objects to client
 * components, so registry/index.ts is never bundled for the browser.
 */
import { registryCategories, type RegistryCategory } from "@/registry/categories"
import { registryItems } from "@/registry/index"
import type { RegistryEntry, RegistryEntryType } from "@/registry/types"

/** Site sections that list registry items. Each maps to /<kind>/... routes. */
export type ItemKind = "components" | "blocks"

const KIND_TYPES: Record<ItemKind, RegistryEntryType[]> = {
  components: ["registry:ui", "registry:component"],
  blocks: ["registry:block"],
}

export const KIND_LABEL: Record<ItemKind, { singular: string; plural: string }> = {
  components: { singular: "component", plural: "components" },
  blocks: { singular: "block", plural: "blocks" },
}

/** Serializable data a card needs. Safe to pass to client components. */
export interface ItemSummary {
  name: string
  title: string
  description: string
  categories: string[]
  releasedAt: string
  kind: ItemKind
  href: string
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

export function kindOf(item: RegistryEntry): ItemKind | undefined {
  return (Object.keys(KIND_TYPES) as ItemKind[]).find((kind) => KIND_TYPES[kind].includes(item.type))
}

function toSummary(item: RegistryEntry): ItemSummary {
  const kind = kindOf(item) ?? "components"
  return {
    name: item.name,
    title: item.title,
    description: item.description,
    categories: item.categories,
    releasedAt: item.releasedAt,
    kind,
    href: `/${kind}/${item.name}`,
  }
}

function entriesOf(kind: ItemKind): RegistryEntry[] {
  return registryItems.filter((item) => KIND_TYPES[kind].includes(item.type))
}

/** Every item of `kind`, sorted by title. */
export function getItems(kind: ItemKind): ItemSummary[] {
  return entriesOf(kind)
    .sort((a, b) => a.title.localeCompare(b.title))
    .map(toSummary)
}

export function getItem(kind: ItemKind, name: string): RegistryEntry | undefined {
  const item = byName.get(name)
  return item && kindOf(item) === kind ? item : undefined
}

/** Any item that has a page and a preview (component or block). */
export function getPreviewableItem(name: string): RegistryEntry | undefined {
  const item = byName.get(name)
  return item && kindOf(item) ? item : undefined
}

export function getAllPreviewableItems(): ItemSummary[] {
  return registryItems.filter((item) => kindOf(item)).map(toSummary)
}

export function getFeatured(kind: ItemKind): ItemSummary[] {
  return entriesOf(kind).filter((i) => i.featured).map(toSummary)
}

/** Newest items across all kinds. */
export function getLatest(limit: number): ItemSummary[] {
  return registryItems
    .filter((item) => kindOf(item))
    .sort((a, b) => b.releasedAt.localeCompare(a.releasedAt) || a.title.localeCompare(b.title))
    .slice(0, limit)
    .map(toSummary)
}

/** Categories that contain at least one item of `kind`. */
export function getCategories(kind: ItemKind): CategoryWithCount[] {
  const items = entriesOf(kind)
  return registryCategories
    .map((category) => ({
      ...category,
      count: items.filter((i) => i.categories.includes(category.slug)).length,
    }))
    .filter((category) => category.count > 0)
}

export function getCategory(kind: ItemKind, slug: string): CategoryWithCount | undefined {
  return getCategories(kind).find((c) => c.slug === slug)
}

export function getItemsByCategory(kind: ItemKind, slug: string): ItemSummary[] {
  return getItems(kind).filter((c) => c.categories.includes(slug))
}

export function getCategoryTitle(slug: string): string {
  return registryCategories.find((c) => c.slug === slug)?.title ?? slug
}

/** Items of the same kind sharing the most categories with `item`. */
export function getRelated(item: RegistryEntry, limit: number): ItemSummary[] {
  const kind = kindOf(item)
  if (!kind) return []
  return entriesOf(kind)
    .filter((other) => other.name !== item.name)
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

/** shadcn built-in items (e.g. `button`) that `item` or its dependencies need. */
export function getShadcnDependencies(item: RegistryEntry): string[] {
  const all = [item, ...getInternalDependencies(item)].flatMap((i) => i.registryDependencies ?? [])
  return [...new Set(all.filter((dep) => !dep.startsWith("@") && !dep.includes("/")))].sort()
}

/** npm packages installed for `item` and everything of ours it pulls in. */
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
 * Where the shadcn CLI writes each of our files, using the default aliases.
 * Matches what the install tests observed for every item type we publish.
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
