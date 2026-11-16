import Link from "next/link"

import { siteConfig } from "@/config/site"
import { AccordionSmooth } from "@/registry/default/ui/accordion-smooth"

/**
 * Honest answers only: every statement here is true of the current product.
 * When something changes (paid items, Figma files, accounts), change the answer.
 */
export function HomeFaq() {
  const ns = siteConfig.registry.namespace
  const license = siteConfig.license.name

  const items = [
    {
      id: "what",
      title: `What is ${siteConfig.name}?`,
      content: `A library of React components, website blocks and full-page templates, published in the open shadcn registry format. You install them with the shadcn CLI and the source code is copied into your project.`,
    },
    {
      id: "install",
      title: "How do I install components?",
      content: `Set up shadcn in your project (npx shadcn@latest init), then run the install command from the item’s page. To use short names like ${ns}/shimmer-button, add the ${ns} registry once; the Installation guide shows the command.`,
    },
    {
      id: "account",
      title: "Do I need an account?",
      content: "No. There’s no sign-up: the registry is public, so the CLI downloads items directly.",
    },
    {
      id: "free",
      title: "Are the components free?",
      content: `Yes. Every component, block and template on the site is free and released under the ${license} license.`,
    },
    {
      id: "modify",
      title: "Can I modify the source code?",
      content: "Yes, that’s the point. The files live in your repo, not in a package, so change anything. To pull an update later, re-run the install command with --overwrite (commit your changes first, because the file is replaced).",
    },
    {
      id: "nextjs",
      title: `Does ${siteConfig.name} support Next.js?`,
      content: "Yes. Every item is tested by installing it into fresh Next.js apps with both shadcn setups (Radix and Base UI). You need React 19 and Tailwind CSS v4. Other React frameworks that shadcn supports should work too, but we haven’t tested them yet.",
    },
    {
      id: "responsive",
      title: "Are the components responsive?",
      content: "Yes. Each item is checked at phone, tablet and desktop widths, and every preview on the site has width controls so you can check for yourself.",
    },
    {
      id: "accessibility",
      title: "Are the components accessible?",
      content: "They use real buttons, labels and landmarks, work with the keyboard, and stop or reduce motion for people who ask for less. Each page lists its accessibility notes.",
    },
    {
      id: "commercial",
      title: "Can I use them in commercial projects?",
      content: `Yes. The ${license} license allows commercial use. It asks you to keep the copyright and license notice with the code.`,
    },
    {
      id: "figma",
      title: "Do templates include Figma files?",
      content: "Not yet. Templates are code only for now: one command adds the page and every section in it.",
    },
    {
      id: "premium",
      title: "How do I access premium resources?",
      content: "There aren’t any right now. Everything published is free, with no account needed.",
    },
  ]

  return (
    <section aria-labelledby="faq" className="border-b">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <h2 id="faq" className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Questions, answered
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            More in the{" "}
            <Link href="/docs/installation" className="text-foreground underline underline-offset-4">
              installation guide
            </Link>{" "}
            and{" "}
            <Link href="/docs/troubleshooting" className="text-foreground underline underline-offset-4">
              troubleshooting
            </Link>
            .
          </p>
        </div>
        <AccordionSmooth items={items} defaultOpen={["what"]} />
      </div>
    </section>
  )
}
