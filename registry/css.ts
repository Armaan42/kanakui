import type { RegistryEntry } from "./types.ts"

/** Nested CSS as used by the registry `css` field: selectors/at-rules → declarations or nested blocks. */
export type CssTree = { [key: string]: string | CssTree }

export function serializeCss(tree: CssTree, indent = ""): string {
  return Object.entries(tree)
    .map(([key, value]) => {
      if (typeof value === "string") return `${indent}${key}: ${value};`
      if (Object.keys(value).length === 0 && key.startsWith("@")) return `${indent}${key};`
      return `${indent}${key} {\n${serializeCss(value, indent + "  ")}\n${indent}}`
    })
    .join("\n")
}

const SCOPE_SELECTOR = { theme: "@theme inline", light: ":root", dark: ".dark" } as const

/**
 * The CSS that `entries` add to a project: their cssVars (as @theme inline,
 * :root and .dark blocks) followed by their css rules. Later entries win on
 * duplicate keys. Returns an empty string when there is no CSS.
 */
export function entriesCss(entries: RegistryEntry[]): string {
  const tree: CssTree = {}
  for (const scope of ["theme", "light", "dark"] as const) {
    const vars: Record<string, string> = {}
    for (const entry of entries) {
      for (const [key, value] of Object.entries(entry.cssVars?.[scope] ?? {})) {
        vars[`--${key}`] = value
      }
    }
    if (Object.keys(vars).length) tree[SCOPE_SELECTOR[scope]] = vars
  }
  for (const entry of entries) {
    Object.assign(tree, (entry.css ?? {}) as CssTree)
  }
  return Object.keys(tree).length ? serializeCss(tree) : ""
}
