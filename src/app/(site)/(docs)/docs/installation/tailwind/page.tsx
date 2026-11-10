import type { Metadata } from "next"

import { CodeViewer } from "@/components/site/code-viewer"
import { CommandBlock } from "@/components/site/command-block"
import { DocsArticle, Step } from "@/components/site/docs-article"
import { DocsSection, InlineText } from "@/components/site/docs"
import { getDocsPage } from "@/config/docs"
import { getSnippet } from "@/lib/source"

const HREF = "/docs/installation/tailwind"
const page = getDocsPage(HREF)

export const metadata: Metadata = { title: page.title, description: page.description }

export default async function InstallTailwindPage() {
  const [postcss, css] = await Promise.all([
    getSnippet(`export default {\n  plugins: {\n    "@tailwindcss/postcss": {},\n  },\n}`, "typescript", "postcss.config.mjs"),
    getSnippet(`@import "tailwindcss";`, "css", "app/globals.css"),
  ])

  return (
    <DocsArticle href={HREF}>
      <DocsSection id="new-projects" title="New projects">
        <p className="text-sm leading-6 text-muted-foreground">
          <InlineText text="Nothing to do: `create-next-app --tailwind` installs and configures Tailwind CSS v4." />
        </p>
      </DocsSection>

      <DocsSection id="existing-projects" title="Existing projects">
        <p className="text-sm leading-6 text-muted-foreground">These are the steps from the official Next.js documentation.</p>
        <ol>
          <Step number={1} title="Install Tailwind CSS and its PostCSS plugin">
            <CommandBlock command="npm install -D tailwindcss @tailwindcss/postcss" />
          </Step>
          <Step number={2} title="Add the PostCSS plugin">
            <CodeViewer files={[postcss]} label="postcss.config.mjs" />
          </Step>
          <Step number={3} title="Import Tailwind in your global CSS">
            <CodeViewer files={[css]} label="Global CSS" />
            <p>
              <InlineText text={'Make sure your root layout imports that file, e.g. `import "./globals.css"`.'} />
            </p>
          </Step>
        </ol>
      </DocsSection>

      <DocsSection id="v3" title="Tailwind CSS v3">
        <p className="text-sm leading-6 text-muted-foreground">
          <InlineText text="kanakui targets Tailwind CSS v4. Components add their animations as v4 theme variables (for example `--animate-marquee`), which v3 doesn’t understand. Upgrade with Tailwind’s official upgrade tool before installing components." />
        </p>
      </DocsSection>
    </DocsArticle>
  )
}
