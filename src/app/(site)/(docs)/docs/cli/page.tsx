import type { Metadata } from "next"

import { CodeViewer } from "@/components/site/code-viewer"
import { CommandBlock } from "@/components/site/command-block"
import { DocsArticle } from "@/components/site/docs-article"
import { DocsSection, InlineText } from "@/components/site/docs"
import { getDocsPage } from "@/config/docs"
import {
  installCommand,
  installCommandByUrl,
  registryItemUrl,
  registrySetupCommand,
  registryUrlTemplate,
  siteConfig,
} from "@/config/site"
import { getSnippet } from "@/lib/source"

const HREF = "/docs/cli"
const page = getDocsPage(HREF)

export const metadata: Metadata = { title: page.title, description: page.description }

const p = "text-sm leading-6 text-muted-foreground"

export default async function CliPage() {
  const ns = siteConfig.registry.namespace
  const componentsJson = await getSnippet(
    JSON.stringify({ registries: { [ns]: registryUrlTemplate() } }, null, 2),
    "json",
    "components.json (excerpt)"
  )

  return (
    <DocsArticle href={HREF}>
      <DocsSection id="by-url" title="Install by URL">
        <p className={p}>Works in any project set up with shadcn, with no other configuration.</p>
        <CommandBlock command={installCommandByUrl("marquee")} />
        <p className={p}>
          <InlineText text="You can pass several URLs at once. Components that depend on other kanakui items install those automatically." />
        </p>
      </DocsSection>

      <DocsSection id="namespace" title={`Install by name with ${ns}`}>
        <p className={p}>Register the namespace once per project:</p>
        <CommandBlock command={registrySetupCommand()} />
        <p className={p}>
          <InlineText text="This adds an entry to `components.json`:" />
        </p>
        <CodeViewer files={[componentsJson]} label="components.json" />
        <p className={p}>Then install any item by name:</p>
        <CommandBlock command={installCommand("marquee")} />
      </DocsSection>

      <DocsSection id="explore" title="Preview and search">
        <p className={p}>See an item’s files, dependencies and CSS before installing:</p>
        <CommandBlock command={`npx shadcn@latest view ${registryItemUrl("marquee")}`} />
        <p className={p}>
          <InlineText text={`After registering the namespace, search it:`} />
        </p>
        <CommandBlock command={`npx shadcn@latest search ${ns} --query card`} />
      </DocsSection>

      <DocsSection id="update" title="Update a component">
        <p className={p}>
          <InlineText text="First see what changed. `--diff` compares the latest version in the registry with the file in your project and writes nothing. Lines starting with `-` are your file, lines starting with `+` are the registry’s." />
        </p>
        <CommandBlock command={`${installCommandByUrl("marquee")} --diff`} />
        <p className={p}>
          <InlineText text="To take the new version, re-run the install with `--overwrite`. It replaces the file, including any changes you made, so commit your work first." />
        </p>
        <CommandBlock command={`${installCommandByUrl("marquee")} --overwrite`} />
      </DocsSection>
    </DocsArticle>
  )
}
