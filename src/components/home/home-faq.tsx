import { siteConfig } from "@/config/site"
import { AccordionSmooth } from "@/registry/default/ui/accordion-smooth"

/** Honest answers only: every statement here is true of the current product. */
export function HomeFaq() {
  const items = [
    {
      id: "free",
      title: "Is kanakui free?",
      content: `Yes. All components and blocks on the site are free and released under the ${siteConfig.license.name} license, including for commercial projects.`,
    },
    {
      id: "install",
      title: "How do I install a component?",
      content: "Set up shadcn in your project (npx shadcn@latest init), then run the install command shown on the component’s page. The CLI adds the files, npm packages and CSS.",
    },
    {
      id: "frameworks",
      title: "Which frameworks are supported?",
      content: "Every item is tested by installing it into fresh Next.js apps using both shadcn setups (Radix and Base UI). Other React frameworks that shadcn supports should work too, but we haven’t tested them yet.",
    },
    {
      id: "requirements",
      title: "What do I need?",
      content: "React 19 and Tailwind CSS v4. 3D components also use three.js and React Three Fiber, which the CLI installs for you.",
    },
    {
      id: "accessibility",
      title: "Are the components accessible?",
      content: "They use real buttons, labels and landmarks, support the keyboard, and stop or reduce motion when people ask for less. Each component page lists its accessibility notes.",
    },
    {
      id: "update",
      title: "How do I get updates?",
      content: "Re-run a component’s install command with --overwrite. Commit your own changes first, because the file is replaced.",
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
            <a href="/docs/troubleshooting" className="text-foreground underline underline-offset-4">
              troubleshooting guide
            </a>
            .
          </p>
        </div>
        <AccordionSmooth items={items} defaultOpen={["free"]} />
      </div>
    </section>
  )
}
