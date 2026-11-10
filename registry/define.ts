import type { RegistryItemDefinition } from "./types.ts"

/**
 * Identity helper that gives item files type checking and autocompletion:
 *
 *   // registry/items/my-thing.ts
 *   export default defineItem({ name: "my-thing", ... })
 *
 * The file name must match `name`. `scripts/registry.mts` collects every file
 * in registry/items/ into registry/items.generated.ts.
 */
export function defineItem(item: RegistryItemDefinition): RegistryItemDefinition {
  return item
}
