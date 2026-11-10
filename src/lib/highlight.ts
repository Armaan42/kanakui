import { createHighlighter, type Highlighter } from "shiki"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"

export type CodeLanguage = "tsx" | "typescript" | "css" | "bash" | "json"

const THEMES = { light: "github-light-default", dark: "github-dark-default" } as const

// Server-only. Created once per process; the JavaScript regex engine avoids
// loading WebAssembly in the build and serverless runtimes.
let highlighter: Promise<Highlighter> | undefined

function getHighlighter() {
  highlighter ??= createHighlighter({
    themes: [THEMES.light, THEMES.dark],
    langs: ["tsx", "typescript", "css", "bash", "json"],
    engine: createJavaScriptRegexEngine(),
  })
  return highlighter
}

/**
 * Returns highlighted HTML that carries both themes as CSS variables
 * (--shiki-light / --shiki-dark). globals.css picks one based on `.dark`.
 */
export async function highlightCode(code: string, lang: CodeLanguage): Promise<string> {
  const shiki = await getHighlighter()
  return shiki.codeToHtml(code, { lang, themes: THEMES, defaultColor: false })
}

export function languageForPath(filePath: string): CodeLanguage {
  if (filePath.endsWith(".tsx")) return "tsx"
  if (filePath.endsWith(".ts")) return "typescript"
  if (filePath.endsWith(".css")) return "css"
  if (filePath.endsWith(".json")) return "json"
  return "tsx"
}
