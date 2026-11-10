import type { Metadata } from "next"
import Link from "next/link"

import { CommandBlock } from "@/components/site/command-block"
import { DocsArticle } from "@/components/site/docs-article"
import { DocsSection, InlineText } from "@/components/site/docs"
import { getDocsPage } from "@/config/docs"
import { installCommandByUrl, siteConfig } from "@/config/site"
import { getItems } from "@/lib/registry"

const HREF = "/docs"
const page = getDocsPage(HREF)

export const metadata: Metadata = { title: page.title, description: page.description }

export default function IntroductionPage() {
  const components = getItems("components").length
  const blocks = getItems("blocks").length

  return (
    <DocsArticle href={HREF}>
      <DocsSection id="what" title="What is kanakui?">
        <p className="leading-7 text-muted-foreground">
          {siteConfig.name} is a collection of {components} components and {blocks} blocks for React and Tailwind CSS.
          It is not a package you install from npm. Each component is source code that the shadcn CLI copies into your
          project, so you own it and can change anything.
        </p>
      </DocsSection>

      <DocsSection id="how" title="How it works">
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground marker:text-foreground">
          <li>Pick a component or block and look at its live preview.</li>
          <li>
            <InlineText text="Run one command. The shadcn CLI downloads the source, installs npm packages (for example `motion`) and adds any CSS it needs." />
          </li>
          <li>Import it from your own project and edit it like any other file.</li>
        </ol>
        <CommandBlock command={installCommandByUrl("animated-card")} copyLabel="Copy example install command" />
      </DocsSection>

      <DocsSection id="what-you-get" title="What you get">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
          <li>Components and blocks that work with both shadcn setups (Radix and Base UI), and are tested by installing every item into fresh apps of each kind.</li>
          <li>Accessible markup: real buttons, labels and landmarks, keyboard support and reduced-motion handling.</li>
          <li>Documentation for every item: props, customization, accessibility notes and troubleshooting.</li>
          <li>
            Free components under the{" "}
            <a href={siteConfig.license.url} className="underline underline-offset-4" target="_blank" rel="noreferrer">
              {siteConfig.license.name} license
            </a>
            .
          </li>
        </ul>
      </DocsSection>

      <DocsSection id="next" title="Next steps">
        <p className="text-sm leading-6 text-muted-foreground">
          Follow the <Link href="/docs/installation" className="text-foreground underline underline-offset-4">installation guide</Link>, or
          browse the <Link href="/components" className="text-foreground underline underline-offset-4">components</Link> and{" "}
          <Link href="/blocks" className="text-foreground underline underline-offset-4">blocks</Link>.
        </p>
      </DocsSection>
    </DocsArticle>
  )
}
