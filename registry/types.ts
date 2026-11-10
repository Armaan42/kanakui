import type { RegistryItem, RegistryItemFile } from "shadcn/schema"

/**
 * Authoring format for registry items. It is the official shadcn item shape
 * with two differences, both resolved by `scripts/registry.mts`:
 *
 * - `internalDependencies` names other items in THIS registry. The generator
 *   turns them into `registryDependencies` as absolute URLs built from
 *   NEXT_PUBLIC_SITE_URL, so neither the domain nor the namespace is
 *   hardcoded here.
 * - `version` is written to `meta.version`.
 */
export type RegistryEntryType =
  | "registry:ui"
  | "registry:component"
  | "registry:block"
  | "registry:hook"
  | "registry:lib"
  | "registry:page"
  | "registry:file"
  | "registry:theme"
  | "registry:style"

export interface RegistryEntryFile {
  /** Path relative to the project root, e.g. `registry/default/ui/x.tsx`. */
  path: string
  type: RegistryItemFile["type"]
  /** Required for registry:page and registry:file. */
  target?: string
}

export interface RegistryEntry {
  name: string
  type: RegistryEntryType
  title: string
  description: string
  /** Semver of this item's source. Bump on every published change. */
  version: string
  categories: string[]
  files: RegistryEntryFile[]
  /** npm packages, optionally with a version: `motion@^12`. */
  dependencies?: string[]
  devDependencies?: string[]
  /** Items from other registries: shadcn built-ins (`button`), `@ns/item` or URLs. */
  registryDependencies?: string[]
  /** Names of items in this registry. */
  internalDependencies?: string[]
  cssVars?: RegistryItem["cssVars"]
  css?: RegistryItem["css"]
  envVars?: RegistryItem["envVars"]
  /** Message the CLI shows after installation. */
  docs?: string
}
