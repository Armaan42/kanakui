import { readFile } from "node:fs/promises"
import path from "node:path"

import { entriesCss } from "@/registry/css"
import { highlightCode, languageForPath, type CodeLanguage } from "@/lib/highlight"
import { getInstalledFiles, getInternalDependencies, getPreviewableItem } from "@/lib/registry"

/** A code file ready to display: raw text for copying, highlighted HTML for reading. */
export interface CodeFile {
  /** Path shown to the user, e.g. `@/components/ui/animated-card.tsx`. */
  path: string
  code: string
  html: string
  lang: CodeLanguage
}

/**
 * Maps one `@/registry/...` import to what the shadcn CLI writes with the
 * default aliases. Same patterns and order as the CLI's import transformer
 * (shadcn 4.23): ui, lib/utils, components, lib, hooks, then a fallback.
 */
function rewriteRegistryImport(spec: string): string {
  if (/^@\/registry\/(.+)\/ui/.test(spec)) return spec.replace(/^@\/registry\/(.+)\/ui/, "@/components/ui")
  if (/^@\/registry\/(.+)\/lib\/utils$/.test(spec)) return "@/lib/utils"
  if (/^@\/registry\/(.+)\/components/.test(spec)) return spec.replace(/^@\/registry\/(.+)\/components/, "@/components")
  if (/^@\/registry\/(.+)\/lib/.test(spec)) return spec.replace(/^@\/registry\/(.+)\/lib/, "@/lib")
  if (/^@\/registry\/(.+)\/hooks/.test(spec)) return spec.replace(/^@\/registry\/(.+)\/hooks/, "@/hooks")
  return spec.replace(/^@\/registry\/[^/]+/, "@/components")
}

/** Rewrites every registry import in `code` to the path a user gets after installing. */
export function toInstalledSource(code: string): string {
  return code.replace(/(["'])(@\/registry\/[^"']+)\1/g, (_match, quote: string, spec: string) => {
    return `${quote}${rewriteRegistryImport(spec)}${quote}`
  })
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
  const item = getPreviewableItem(name)
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
  const item = getPreviewableItem(name)
  if (!item) return null
  const css = entriesCss([...getInternalDependencies(item), item])
  return css ? toCodeFile("globals.css", css, "css") : null
}
