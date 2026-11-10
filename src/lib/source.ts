import { readFile } from "node:fs/promises"
import path from "node:path"

import { entriesCss } from "@/registry/css"
import { highlightCode, languageForPath, type CodeLanguage } from "@/lib/highlight"
import { getComponent, getInstalledFiles, getInternalDependencies } from "@/lib/registry"

/** A code file ready to display: raw text for copying, highlighted HTML for reading. */
export interface CodeFile {
  /** Path shown to the user, e.g. `@/components/ui/animated-card.tsx`. */
  path: string
  code: string
  html: string
  lang: CodeLanguage
}

/**
 * Rewrites registry imports to the paths a user gets after installing,
 * using the same rules as the shadcn CLI with default aliases:
 * `@/registry/<style>/ui/x` → `@/components/ui/x`, `/hooks/` → `@/hooks/`,
 * `/lib/` → `@/lib/`, `/components/` → `@/components/`.
 */
export function toInstalledSource(code: string): string {
  return code
    .replace(/@\/registry\/[^/"']+\/ui\//g, "@/components/ui/")
    .replace(/@\/registry\/[^/"']+\/hooks\//g, "@/hooks/")
    .replace(/@\/registry\/[^/"']+\/lib\//g, "@/lib/")
    .replace(/@\/registry\/[^/"']+\/components\//g, "@/components/")
}

async function toCodeFile(displayPath: string, code: string, lang?: CodeLanguage): Promise<CodeFile> {
  const language = lang ?? languageForPath(displayPath)
  const trimmed = code.replace(/\s+$/, "") + "\n"
  return { path: displayPath, code: trimmed, html: await highlightCode(trimmed, language), lang: language }
}

/**
 * Reads a file under registry/. The path is scoped to that folder so the
 * bundler's file tracing includes only registry sources, not the whole project.
 */
function readProjectFile(relativePath: string) {
  if (!relativePath.startsWith("registry/") || relativePath.includes("..")) {
    throw new Error(`Refusing to read outside registry/: ${relativePath}`)
  }
  return readFile(path.join(process.cwd(), "registry", relativePath.slice("registry/".length)), "utf8")
}

/** Every source file a manual install needs (dependencies first), as the user receives them. */
export async function getSourceFiles(name: string): Promise<CodeFile[]> {
  "use cache"
  const item = getComponent(name)
  if (!item) return []
  const installed = getInstalledFiles(item)
  const entries = [...getInternalDependencies(item), item]
  const files = entries.flatMap((entry) => entry.files)
  return Promise.all(
    files.map(async (file, index) =>
      toCodeFile(installed[index]?.path ?? file.path, toInstalledSource(await readProjectFile(file.path)))
    )
  )
}

/** The component's demo, shown as the usage example. */
export async function getUsageExample(name: string): Promise<CodeFile | null> {
  "use cache"
  const demoPath = `registry/default/examples/${name}-demo.tsx`
  try {
    const code = await readProjectFile(demoPath)
    return toCodeFile(`${name}-demo.tsx`, toInstalledSource(code))
  } catch {
    return null
  }
}

/** CSS the item and its dependencies add to the global stylesheet, or null if none. */
export async function getItemCss(name: string): Promise<CodeFile | null> {
  "use cache"
  const item = getComponent(name)
  if (!item) return null
  const css = entriesCss([...getInternalDependencies(item), item])
  return css ? toCodeFile("globals.css", css, "css") : null
}
