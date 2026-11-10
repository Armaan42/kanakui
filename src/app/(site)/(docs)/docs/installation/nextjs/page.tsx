import type { Metadata } from "next"

import { CommandBlock } from "@/components/site/command-block"
import { DocsArticle, Step } from "@/components/site/docs-article"
import { DocsSection, InlineText } from "@/components/site/docs"
import { getDocsPage } from "@/config/docs"

const HREF = "/docs/installation/nextjs"
const page = getDocsPage(HREF)

export const metadata: Metadata = { title: page.title, description: page.description }

export default function InstallNextPage() {
  return (
    <DocsArticle href={HREF}>
      <DocsSection id="create" title="Create the app">
        <ol>
          <Step number={1} title="Run create-next-app">
            <CommandBlock command={`npx create-next-app@latest my-app --ts --tailwind --eslint --app --src-dir --import-alias "@/*"`} />
            <ul className="list-disc space-y-1 pl-5">
              <li><InlineText text="`--ts` TypeScript, `--tailwind` Tailwind CSS v4, `--eslint` linting." /></li>
              <li><InlineText text={'`--app` the App Router, `--src-dir` code in `src/`, `--import-alias "@/*"` imports like `@/components/...`.'} /></li>
              <li>The CLI may ask a few more questions (for example about React Compiler). The defaults are fine.</li>
            </ul>
          </Step>
          <Step number={2} title="Start the dev server">
            <CommandBlock command="cd my-app && npm run dev" />
            <p>Open http://localhost:3000 to check it works.</p>
          </Step>
        </ol>
      </DocsSection>
      <DocsSection id="next" title="Next">
        <p className="text-sm leading-6 text-muted-foreground">
          <InlineText text="Tailwind CSS is already set up. Continue with `npx shadcn@latest init` (see Add utilities)." />
        </p>
      </DocsSection>
    </DocsArticle>
  )
}
