import type { Metadata } from "next"

import { CodeViewer } from "@/components/site/code-viewer"
import { CommandBlock } from "@/components/site/command-block"
import { DocsArticle, Step } from "@/components/site/docs-article"
import { DocsSection, InlineText } from "@/components/site/docs"
import { getDocsPage } from "@/config/docs"
import { getSnippet } from "@/lib/source"

const HREF = "/docs/installation/utilities"
const page = getDocsPage(HREF)

export const metadata: Metadata = { title: page.title, description: page.description }

const utils = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`

export default async function UtilitiesPage() {
  const utilsFile = await getSnippet(utils, "typescript", "lib/utils.ts")

  return (
    <DocsArticle href={HREF}>
      <DocsSection id="init" title="Recommended: shadcn init">
        <ol>
          <Step number={1} title="Run shadcn init in your project">
            <CommandBlock command="npx shadcn@latest init" />
            <p>It asks a few questions and then:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li><InlineText text="creates `components.json`, which tells the CLI where to put files (your aliases);" /></li>
              <li><InlineText text="adds theme variables such as `--background`, `--card` and `--muted-foreground` to your global CSS. kanakui components use these, so they match your theme;" /></li>
              <li><InlineText text="adds a `cn` helper at `@/lib/utils` that merges class names." /></li>
            </ul>
          </Step>
          <Step number={2} title="Pick Radix or Base UI">
            <p>
              <InlineText text="Both work. kanakui is tested against fresh apps with each. Blocks that need a shadcn primitive, such as `button`, get the version that matches your choice." />
            </p>
          </Step>
        </ol>
      </DocsSection>

      <DocsSection id="manual" title="Manual setup">
        <p className="text-sm leading-6 text-muted-foreground">
          <InlineText text="If you can’t run `init`, add the `cn` helper yourself. You also need the shadcn theme variables in your CSS, or colors such as `bg-card` won’t exist." />
        </p>
        <CommandBlock command="npm install clsx tailwind-merge" />
        <CodeViewer files={[utilsFile]} label="lib/utils.ts" />
      </DocsSection>
    </DocsArticle>
  )
}
