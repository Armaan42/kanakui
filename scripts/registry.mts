/**
 * Registry toolchain.
 *
 *   node scripts/registry.mts generate
 *     Validates registry/index.ts, then writes:
 *       - registry.json              (input for `shadcn build`)
 *       - src/styles/registry.css    (item cssVars/css, so the site's own
 *                                     previews get the same CSS that consumers
 *                                     receive on install)
 *
 *   node scripts/registry.mts verify
 *     Checks the `shadcn build` output in public/r against the official schema.
 *
 * Run through `npm run registry:build`, which does generate → build → verify.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs"
import path from "node:path"
import { registryItemSchema, registrySchema } from "shadcn/schema"

import { registryCategories } from "../registry/categories.ts"
import { registryItems } from "../registry/index.ts"
import type { RegistryEntry } from "../registry/types.ts"
import { registryItemUrl, siteConfig } from "../src/config/site.ts"

const ROOT = path.resolve(import.meta.dirname, "..")
const REGISTRY_JSON = path.join(ROOT, "registry.json")
const REGISTRY_CSS = path.join(ROOT, "src/styles/registry.css")
const DEMOS_INDEX = path.join(ROOT, "src/__registry__/demos.ts")
const EXAMPLES_DIR = path.join(ROOT, "registry/default/examples")
const OUTPUT_DIR = path.join(ROOT, "public/r")

/** Names that would collide with static routes under /components. */
const RESERVED_NAMES = new Set(["category"])
/** Item types that get a page on the site and therefore need a demo. */
const PREVIEWABLE_TYPES = new Set(["registry:ui", "registry:block", "registry:component"])

/** Packages every consumer project already has; they need no declaration. */
const PEER_PACKAGES = new Set(["react", "react-dom", "next"])
const SOURCE_EXTENSIONS = ["", ".ts", ".tsx", "/index.ts", "/index.tsx"]

const errors: string[] = []
const warnings: string[] = []
const error = (msg: string) => errors.push(msg)
const warn = (msg: string) => warnings.push(msg)

const rel = (p: string) => path.relative(ROOT, p).split(path.sep).join("/")

function packageName(specifier: string): string {
  // "motion@^12" → "motion", "@scope/pkg@1" → "@scope/pkg", "motion/react" → "motion"
  const parts = specifier.split("/")
  const name = specifier.startsWith("@") ? `${parts[0]}/${parts[1] ?? ""}` : parts[0]
  const at = name.indexOf("@", 1)
  return at === -1 ? name : name.slice(0, at)
}

function importSpecifiers(source: string): string[] {
  const pattern =
    /(?:import|export)\s[^'";]*?from\s*["']([^"']+)["']|import\s*["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)/g
  return [...source.matchAll(pattern)].map((m) => m[1] ?? m[2] ?? m[3])
}

function resolveSource(fromAbs: string, specifier: string): string | undefined {
  const base = specifier.startsWith("@/registry/")
    ? path.join(ROOT, "registry", specifier.slice("@/registry/".length))
    : path.resolve(path.dirname(fromAbs), specifier)
  for (const ext of SOURCE_EXTENSIONS) {
    const candidate = base + ext
    if (existsSync(candidate) && !candidate.endsWith(path.sep)) return candidate
  }
  return undefined
}

// ------------------------------------------------------------- validation

function validateEntries(entries: RegistryEntry[]) {
  const byName = new Map<string, RegistryEntry>()
  const fileOwner = new Map<string, string>()

  for (const entry of entries) {
    if (byName.has(entry.name)) error(`Duplicate item name "${entry.name}"`)
    byName.set(entry.name, entry)
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.name)) {
      error(`"${entry.name}": names must be lowercase kebab-case`)
    }
    if (RESERVED_NAMES.has(entry.name)) error(`"${entry.name}": this name is reserved by a site route`)
    if (!/^\d+\.\d+\.\d+(?:-[\w.]+)?$/.test(entry.version)) {
      error(`"${entry.name}": version "${entry.version}" is not semver`)
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.releasedAt) || Number.isNaN(Date.parse(entry.releasedAt))) {
      error(`"${entry.name}": releasedAt "${entry.releasedAt}" must be a valid YYYY-MM-DD date`)
    }
    if (entry.categories.length === 0) error(`"${entry.name}": needs at least one category`)
    for (const category of entry.categories) {
      if (!registryCategories.some((c) => c.slug === category)) {
        error(`"${entry.name}": unknown category "${category}" (add it to registry/categories.ts)`)
      }
    }
    if (entry.files.length === 0) error(`"${entry.name}": has no files`)
    for (const file of entry.files) {
      const abs = path.join(ROOT, file.path)
      if (!existsSync(abs)) error(`"${entry.name}": file not found: ${file.path}`)
      if ((file.type === "registry:page" || file.type === "registry:file") && !file.target) {
        error(`"${entry.name}": ${file.path} is ${file.type} and needs a "target"`)
      }
      fileOwner.set(abs, entry.name)
    }
  }

  for (const entry of entries) {
    for (const dep of entry.internalDependencies ?? []) {
      if (!byName.has(dep)) error(`"${entry.name}": unknown internal dependency "${dep}"`)
      if (dep === entry.name) error(`"${entry.name}": depends on itself`)
    }

    const declared = new Set((entry.dependencies ?? []).map(packageName))
    const declaredDev = new Set((entry.devDependencies ?? []).map(packageName))
    const allowedOwners = new Set([entry.name, ...(entry.internalDependencies ?? [])])
    const used = new Set<string>()

    for (const file of entry.files) {
      const abs = path.join(ROOT, file.path)
      if (!existsSync(abs)) continue
      const source = readFileSync(abs, "utf8")
      if (source.includes("\r\n")) error(`${file.path}: contains CRLF line endings`)

      for (const spec of importSpecifiers(source)) {
        if (spec === "@/lib/utils") continue

        if (spec.startsWith("@/registry/") || spec.startsWith(".")) {
          const target = resolveSource(abs, spec)
          if (!target) {
            error(`${file.path}: cannot resolve import "${spec}"`)
            continue
          }
          const owner = fileOwner.get(target)
          if (!owner) {
            error(`${file.path}: imports "${spec}", which is not part of any registry item`)
          } else if (!allowedOwners.has(owner)) {
            error(
              `${file.path}: imports "${spec}" from item "${owner}". Add "${owner}" to internalDependencies of "${entry.name}"`
            )
          } else if (spec.startsWith(".") && owner !== entry.name) {
            error(`${file.path}: use "@/registry/..." (not a relative path) to import from "${owner}"`)
          }
          continue
        }

        if (spec.startsWith("@/")) {
          error(`${file.path}: imports project-only path "${spec}". It will not exist in consumer projects`)
          continue
        }

        const pkg = packageName(spec)
        if (spec.startsWith("node:") || PEER_PACKAGES.has(pkg)) continue
        used.add(pkg)
        if (!declared.has(pkg) && !declaredDev.has(pkg)) {
          error(`"${entry.name}": ${file.path} imports "${pkg}" but it is not in dependencies`)
        }
      }
    }

    for (const pkg of declared) {
      if (!used.has(pkg)) warn(`"${entry.name}": dependency "${pkg}" is declared but never imported`)
    }
  }
}

// ------------------------------------------------------------- generation

/**
 * Dependencies between our own items are written as absolute URLs, not
 * `@namespace/name`. Tested with shadcn 4.23: a namespaced dependency makes
 * `npx shadcn add https://…/r/item.json` fail with "Unknown registry" unless
 * the consumer has configured the namespace. A URL resolves in every install
 * mode. The URL comes from NEXT_PUBLIC_SITE_URL, so each environment's build
 * points at itself.
 */
function internalRegistryDependency(name: string): string {
  return registryItemUrl(name)
}

function toRegistryItem(entry: RegistryEntry) {
  const registryDependencies = [
    ...(entry.registryDependencies ?? []),
    ...(entry.internalDependencies ?? []).map(internalRegistryDependency),
  ]
  return {
    name: entry.name,
    type: entry.type,
    title: entry.title,
    description: entry.description,
    author: siteConfig.name,
    ...(entry.dependencies?.length ? { dependencies: entry.dependencies } : {}),
    ...(entry.devDependencies?.length ? { devDependencies: entry.devDependencies } : {}),
    ...(registryDependencies.length ? { registryDependencies } : {}),
    files: entry.files.map(({ path, type, target }) => ({ path, type, ...(target ? { target } : {}) })),
    ...(entry.cssVars ? { cssVars: entry.cssVars } : {}),
    ...(entry.css ? { css: entry.css } : {}),
    ...(entry.envVars ? { envVars: entry.envVars } : {}),
    ...(entry.docs ? { docs: entry.docs } : {}),
    categories: entry.categories,
    meta: { version: entry.version },
  }
}

type CssTree = { [key: string]: string | CssTree }

function serializeCss(tree: CssTree, indent = ""): string {
  return Object.entries(tree)
    .map(([key, value]) => {
      if (typeof value === "string") return `${indent}${key}: ${value};`
      if (Object.keys(value).length === 0 && key.startsWith("@")) return `${indent}${key};`
      return `${indent}${key} {\n${serializeCss(value, indent + "  ")}\n${indent}}`
    })
    .join("\n")
}

function buildCss(entries: RegistryEntry[]): string {
  const vars = { theme: {}, light: {}, dark: {} } as Record<"theme" | "light" | "dark", Record<string, string>>
  const rules: CssTree = {}

  for (const entry of entries) {
    for (const scope of ["theme", "light", "dark"] as const) {
      for (const [key, value] of Object.entries(entry.cssVars?.[scope] ?? {})) {
        const existing = vars[scope][key]
        if (existing !== undefined && existing !== value) {
          error(`"${entry.name}": cssVars.${scope}.${key} conflicts with another item (${existing} vs ${value})`)
        }
        vars[scope][key] = value
      }
    }
    for (const [key, value] of Object.entries((entry.css ?? {}) as CssTree)) {
      const existing = rules[key]
      if (existing !== undefined && JSON.stringify(existing) !== JSON.stringify(value)) {
        error(`"${entry.name}": css "${key}" conflicts with another item`)
      }
      rules[key] = value
    }
  }

  const toVars = (record: Record<string, string>) =>
    Object.fromEntries(Object.entries(record).map(([k, v]) => [`--${k}`, v]))

  const tree: CssTree = {}
  if (Object.keys(vars.theme).length) tree["@theme inline"] = toVars(vars.theme)
  if (Object.keys(vars.light).length) tree[":root"] = toVars(vars.light)
  if (Object.keys(vars.dark).length) tree[".dark"] = toVars(vars.dark)
  Object.assign(tree, rules)

  return [
    "/* Generated by scripts/registry.mts from registry item cssVars/css. Do not edit. */",
    serializeCss(tree),
    "",
  ].join("\n")
}

/**
 * Builds src/__registry__/demos.ts: one lazy `import()` per previewable item,
 * so each preview is code-split and only downloaded when it is rendered.
 * Every previewable item must have registry/default/examples/<name>-demo.tsx.
 */
function buildDemosIndex(entries: RegistryEntry[]): string {
  const demoFiles = existsSync(EXAMPLES_DIR)
    ? readdirSync(EXAMPLES_DIR).filter((f) => f.endsWith("-demo.tsx"))
    : []
  const demoNames = new Set(demoFiles.map((f) => f.replace(/-demo\.tsx$/, "")))
  const previewable = entries.filter((e) => PREVIEWABLE_TYPES.has(e.type))

  for (const entry of previewable) {
    if (!demoNames.has(entry.name)) {
      error(`"${entry.name}": missing demo registry/default/examples/${entry.name}-demo.tsx`)
    }
  }
  for (const name of demoNames) {
    if (!previewable.some((e) => e.name === name)) {
      error(`registry/default/examples/${name}-demo.tsx has no matching previewable item`)
    }
  }
  for (const file of demoFiles) {
    const source = readFileSync(path.join(EXAMPLES_DIR, file), "utf8")
    if (!/export\s+default\s+function/.test(source)) {
      error(`registry/default/examples/${file} must have a default-exported function component`)
    }
  }

  const lines = previewable
    .filter((e) => demoNames.has(e.name))
    .map((e) => `  "${e.name}": () => import("@/registry/default/examples/${e.name}-demo"),`)

  return [
    "// Generated by scripts/registry.mts. Do not edit.",
    'import type { ComponentType } from "react"',
    "",
    "export type DemoLoader = () => Promise<{ default: ComponentType }>",
    "",
    "export const demos: Record<string, DemoLoader> = {",
    ...lines,
    "}",
    "",
  ].join("\n")
}

function writeIfChanged(file: string, content: string) {
  if (existsSync(file) && readFileSync(file, "utf8") === content) return false
  mkdirSync(path.dirname(file), { recursive: true })
  writeFileSync(file, content)
  return true
}

function generate() {
  validateEntries(registryItems)

  const registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: siteConfig.name,
    homepage: siteConfig.url,
    items: registryItems.map(toRegistryItem),
  }

  const parsed = registrySchema.safeParse(registry)
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      error(`registry.json schema: ${issue.path.join(".")}: ${issue.message}`)
    }
  }

  const css = buildCss(registryItems)
  const demosIndex = buildDemosIndex(registryItems)
  report("generate")

  const outputs: [string, string][] = [
    [REGISTRY_JSON, JSON.stringify(registry, null, 2) + "\n"],
    [REGISTRY_CSS, css],
    [DEMOS_INDEX, demosIndex],
  ]
  console.log(
    `✓ ${registryItems.length} items · namespace ${siteConfig.registry.namespace} · homepage ${siteConfig.url}`
  )
  for (const [file, content] of outputs) {
    console.log(`  ${rel(file)} ${writeIfChanged(file, content) ? "written" : "unchanged"}`)
  }
}

// ----------------------------------------------------------------- verify

function verify() {
  const indexFile = path.join(OUTPUT_DIR, "registry.json")
  if (!existsSync(indexFile)) {
    error(`${rel(indexFile)} not found. Run "shadcn build" first`)
    report("verify")
    return
  }

  const index = registrySchema.safeParse(JSON.parse(readFileSync(indexFile, "utf8")))
  if (!index.success) error(`${rel(indexFile)}: does not match registry schema`)
  else {
    for (const item of index.data.items) {
      if (item.files?.some((f) => "content" in f && f.content)) {
        warn(`${rel(indexFile)}: "${item.name}" embeds file content (registry index expects none)`)
      }
    }
  }

  for (const entry of registryItems) {
    const file = path.join(OUTPUT_DIR, `${entry.name}.json`)
    if (!existsSync(file)) {
      error(`${rel(file)} missing`)
      continue
    }
    const parsed = registryItemSchema.safeParse(JSON.parse(readFileSync(file, "utf8")))
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        error(`${rel(file)}: ${issue.path.join(".")}: ${issue.message}`)
      }
      continue
    }
    for (const f of parsed.data.files ?? []) {
      if (!f.content?.trim()) error(`${rel(file)}: ${f.path} has no content`)
    }
  }

  report("verify")
  console.log(`✓ ${registryItems.length} built items verified in ${rel(OUTPUT_DIR)}`)
}

function report(stage: string) {
  for (const w of warnings) console.warn(`  warning: ${w}`)
  warnings.length = 0
  if (errors.length) {
    console.error(`✗ registry ${stage} failed with ${errors.length} error(s):`)
    for (const e of errors) console.error(`  - ${e}`)
    process.exit(1)
  }
}

const command = process.argv[2]
if (command === "generate") generate()
else if (command === "verify") verify()
else {
  console.error("Usage: node scripts/registry.mts <generate|verify>")
  process.exit(1)
}
