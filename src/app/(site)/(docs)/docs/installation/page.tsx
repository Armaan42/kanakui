import type { Metadata } from "next"
import Link from "next/link"

import { CommandBlock } from "@/components/site/command-block"
import { DocsArticle, Step } from "@/components/site/docs-article"
import { DocsSection, InlineText } from "@/components/site/docs"
import { getDocsPage } from "@/config/docs"
import { installCommand, installCommandByUrl, registrySetupCommand } from "@/config/site"

const HREF = "/docs/installation"
const page = getDocsPage(HREF)

export const metadata: Metadata = { title: page.title, description: page.description }

const linkClass = "text-foreground underline underline-offset-4"

export default function InstallationPage() {
  return (
    <DocsArticle href={HREF}>
      <DocsSection id="requirements" title="Requirements">
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted-foreground">
          <li>Node.js 20.9 or later (required by Next.js 16).</li>
          <li>React 19 and Tailwind CSS v4.</li>
          <li>
            <InlineText text="A project set up with shadcn (a `components.json` file and the `cn` helper)." />
          </li>
        </ul>
      </DocsSection>

      <DocsSection id="steps" title="Steps">
        <ol className="space-y-0">
          <Step number={1} title="Create a Next.js app">
            <p>
              Skip this if you already have one. <Link href="/docs/installation/nextjs" className={linkClass}>Full guide</Link>.
            </p>
            <CommandBlock command={`npx create-next-app@latest my-app --ts --tailwind --eslint --app --src-dir --import-alias "@/*"`} />
          </Step>
          <Step number={2} title="Make sure Tailwind CSS v4 is set up">
            <p>
              <InlineText text="`create-next-app` with `--tailwind` already does this." />{" "}
              <Link href="/docs/installation/tailwind" className={linkClass}>Add it to an existing project</Link>.
            </p>
          </Step>
          <Step number={3} title="Set up shadcn">
            <p>
              <InlineText text="This creates `components.json`, the theme variables and the `cn` helper. Choose Radix or Base UI; kanakui works with both." />{" "}
              <Link href="/docs/installation/utilities" className={linkClass}>Details</Link>.
            </p>
            <CommandBlock command="npx shadcn@latest init" />
          </Step>
          <Step number={4} title="Install a component">
            <p>Install by URL. No other setup needed:</p>
            <CommandBlock command={installCommandByUrl("animated-card")} copyLabel="Copy install command" />
            <p>
              <InlineText text="Or register the namespace once and install by name:" />
            </p>
            <CommandBlock command={registrySetupCommand()} copyLabel="Copy registry setup command" />
            <CommandBlock command={installCommand("animated-card")} copyLabel="Copy namespaced install command" />
          </Step>
          <Step number={5} title="Use it">
            <p>
              <InlineText text={'Import it from your components folder, e.g. `import { AnimatedCard } from "@/components/ui/animated-card"`. Every component page shows the exact import, files and usage.'} />
            </p>
          </Step>
        </ol>
      </DocsSection>
    </DocsArticle>
  )
}
