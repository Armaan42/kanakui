import { docsPages } from "@/config/docs"
import { installCommand, installCommandByUrl, siteConfig } from "@/config/site"
import { getItems, KIND_LABEL, type ItemKind } from "@/lib/registry"

const KINDS: ItemKind[] = ["components", "blocks", "templates"]

const absolute = (path: string) => new URL(path, siteConfig.url).toString()

/**
 * /llms.txt (https://llmstxt.org): a plain-text map of the site for AI tools,
 * built from the registry and the docs list at build time.
 */
export function GET() {
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description} Everything is free under the ${siteConfig.license.name} license.`,
    "",
    `Every item installs into a project set up with shadcn (components.json) with ${installCommand("<name>")}. ${siteConfig.registry.namespace} is listed in the shadcn registry index, so no setup is needed.`,
    `With an older shadcn CLI, install by full address instead: ${installCommandByUrl("<name>")}`,
    `Registry index: ${absolute(`${siteConfig.registry.basePath}/registry.json`)}`,
    "",
    "## Docs",
    "",
    ...docsPages.map((page) => `- [${page.title}](${absolute(page.href)}): ${page.description}`),
    ...KINDS.flatMap((kind) => [
      "",
      `## ${KIND_LABEL[kind].plural[0].toUpperCase()}${KIND_LABEL[kind].plural.slice(1)}`,
      "",
      ...getItems(kind).map(
        (item) => `- [${item.title}](${absolute(item.href)}): ${item.description} Install: \`${installCommand(item.name)}\``
      ),
    ]),
    "",
  ]

  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
