import { itemDefinitions } from "./items.generated.ts"
import type { ComponentDocs } from "./types.ts"

export type { ComponentDocs, PropDoc } from "./types.ts"

/** Page documentation by item name, from each item's `pageDocs` in registry/items/. */
export const componentDocs: Record<string, ComponentDocs> = Object.fromEntries(
  itemDefinitions.flatMap((definition) => (definition.pageDocs ? [[definition.name, definition.pageDocs]] : []))
)
