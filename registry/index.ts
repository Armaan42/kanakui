import { itemDefinitions } from "./items.generated.ts"
import type { RegistryEntry } from "./types.ts"

/**
 * Every item this registry publishes, one file per item in registry/items/.
 * `scripts/registry.mts` collects them (registry/items.generated.ts), writes
 * `registry.json`, then `shadcn build` writes `public/r/<name>.json`.
 *
 * Source files live in `registry/default/{ui,hooks,lib,blocks}` because the
 * shadcn CLI rewrites `@/registry/<style>/<kind>/...` imports to the
 * consumer's matching alias (ui, hooks, lib, components).
 */
export const registryItems: RegistryEntry[] = itemDefinitions.map((definition) => {
  const { pageDocs, ...entry } = definition
  void pageDocs
  return entry
})
