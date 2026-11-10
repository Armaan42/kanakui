import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { GitHubIcon } from "@/components/site/icons"
import { CommandBlock } from "@/components/site/command-block"
import { ComponentGrid } from "@/components/site/component-card"
import { Button } from "@/components/ui/button"
import { installCommandByUrl, registrySetupCommand, siteConfig } from "@/config/site"
import { formatDate } from "@/lib/format"
import { getComponents, getFeaturedComponents, getLatestComponents } from "@/lib/registry"

const steps = [
  {
    title: "Pick a component",
    body: "Preview it live, check which npm packages it needs and which files it adds.",
  },
  {
    title: "Run one command",
    body: "The shadcn CLI downloads the source, installs dependencies and writes the files.",
  },
  {
    title: "Change anything",
    body: "The code lives in your repository. There is no package to update or work around.",
  },
]

export default function HomePage() {
  const featured = getFeaturedComponents()
  const latest = getLatestComponents(5)
  const total = getComponents().length
  const heroItem = featured[0] ?? latest[0]

  return (
    <>
      <section className="border-b">
        <div className="page-container flex flex-col items-start gap-8 py-16 sm:py-24">
          <div className="space-y-5">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              shadcn registry · {total} {total === 1 ? "component" : "components"}
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              React components you install, then own.
            </h1>
            <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
              Animated, accessible components for React and Tailwind CSS. One command copies the source
              into your project, with its dependencies, ready to change.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/components">
                Browse components
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
                <GitHubIcon data-icon="inline-start" />
                GitHub
              </a>
            </Button>
          </div>
          {heroItem ? (
            <CommandBlock
              command={installCommandByUrl(heroItem.name)}
              copyLabel={`Copy install command for ${heroItem.title}`}
              className="w-full max-w-2xl"
            />
          ) : null}
        </div>
      </section>

      {featured.length > 0 ? (
        <section aria-labelledby="featured" className="page-container space-y-6 py-14 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 id="featured" className="text-2xl font-semibold tracking-tight">
                Featured
              </h2>
              <p className="text-muted-foreground">Live previews. Hover, move the pointer, click.</p>
            </div>
            <Link
              href="/components"
              className="hidden shrink-0 text-sm text-muted-foreground hover:text-foreground sm:inline-flex sm:items-center sm:gap-1"
            >
              View all <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </div>
          <ComponentGrid components={featured} />
        </section>
      ) : null}

      <section aria-labelledby="latest" className="border-t">
        <div className="page-container grid gap-10 py-14 sm:py-20 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <div className="space-y-1">
            <h2 id="latest" className="text-2xl font-semibold tracking-tight">
              Latest releases
            </h2>
            <p className="text-muted-foreground">New and updated components.</p>
          </div>
          <ul className="min-w-0 divide-y rounded-xl border">
            {latest.map((component) => (
              <li key={component.name}>
                <Link
                  href={`/components/${component.name}`}
                  className="flex flex-col gap-1 px-4 py-3.5 transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <span className="min-w-0">
                    <span className="block font-medium">{component.title}</span>
                    <span className="block truncate text-sm text-muted-foreground">{component.description}</span>
                  </span>
                  <time dateTime={component.releasedAt} className="shrink-0 font-mono text-xs text-muted-foreground">
                    {formatDate(component.releasedAt)}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="how-it-works" className="border-t">
        <div className="page-container space-y-8 py-14 sm:py-20">
          <h2 id="how-it-works" className="text-2xl font-semibold tracking-tight">
            How it works
          </h2>
          <ol className="grid gap-6 sm:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="space-y-2">
                <span className="font-mono text-sm text-muted-foreground">0{index + 1}</span>
                <h3 className="font-medium">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="namespace" className="border-t">
        <div className="page-container grid gap-6 py-14 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div className="space-y-2">
            <h2 id="namespace" className="text-2xl font-semibold tracking-tight">
              Install by name with {siteConfig.registry.namespace}
            </h2>
            <p className="text-muted-foreground">
              Add the registry to your project once, then install any component by name, e.g.{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-[13px]">
                {siteConfig.registry.namespace}/{heroItem?.name ?? "component"}
              </code>
              .
            </p>
          </div>
          <CommandBlock command={registrySetupCommand()} copyLabel="Copy registry setup command" />
        </div>
      </section>
    </>
  )
}
