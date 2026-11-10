import type { Metadata } from "next"

import { DocsArticle } from "@/components/site/docs-article"
import { DocsSection, InlineText } from "@/components/site/docs"
import { getDocsPage } from "@/config/docs"
import { registrySetupCommand, siteConfig } from "@/config/site"

const HREF = "/docs/troubleshooting"
const page = getDocsPage(HREF)

export const metadata: Metadata = { title: page.title, description: page.description }

const issues = [
  {
    problem: `\`Unknown registry "${siteConfig.registry.namespace}"\``,
    solution: `Your project doesn’t know the namespace yet. Run \`${registrySetupCommand()}\` once, or install by URL.`,
  },
  {
    problem: "`No components.json found`",
    solution: "The project isn’t set up for shadcn. Run `npx shadcn@latest init` first.",
  },
  {
    problem: "`Module not found: Can't resolve 'motion/react'` (or another package)",
    solution: "The CLI installs npm packages for you. After a manual install, run the `npm install` command shown in the component’s Manual tab.",
  },
  {
    problem: "An animation doesn’t run",
    solution: "Animated components add keyframes and theme variables (e.g. `--animate-marquee`) to your global CSS. After a manual install, copy the CSS from the Manual tab. Also check your operating system’s reduced-motion setting: components stay still when it is on.",
  },
  {
    problem: "Colors look wrong or classes such as `bg-card` do nothing",
    solution: "Your CSS is missing the shadcn theme variables. Run `npx shadcn@latest init`, or add the variables yourself.",
  },
  {
    problem: "TypeScript errors about `ref` props",
    solution: "kanakui targets React 19, where `ref` is a regular prop. Upgrade React to 19.",
  },
  {
    problem: "Tailwind classes from a component have no effect",
    solution: "kanakui targets Tailwind CSS v4. See Install Tailwind CSS for upgrading from v3.",
  },
  {
    problem: "3D components show an empty area",
    solution: "3D components render with WebGL. Check that WebGL is enabled in the browser; on very old devices it may be unavailable.",
  },
]

export default function TroubleshootingPage() {
  return (
    <DocsArticle href={HREF}>
      <DocsSection id="common" title="Common problems">
        <dl className="divide-y rounded-lg border">
          {issues.map((issue) => (
            <div key={issue.problem} className="space-y-1 px-4 py-3 text-sm">
              <dt className="font-medium">
                <InlineText text={issue.problem} />
              </dt>
              <dd className="leading-6 text-muted-foreground">
                <InlineText text={issue.solution} />
              </dd>
            </div>
          ))}
        </dl>
      </DocsSection>
    </DocsArticle>
  )
}
