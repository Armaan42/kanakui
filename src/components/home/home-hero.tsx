import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { HeroGlobe } from "@/components/home/hero-globe"
import { CommandBlock } from "@/components/site/command-block"
import { installCommandByUrl } from "@/config/site"
import { cn } from "@/lib/utils"
import { GradientText } from "@/registry/default/ui/gradient-text"
import { NumberTicker } from "@/registry/default/ui/number-ticker"

interface HomeHeroProps {
  components: number
  blocks: number
  threeD: number
}

const WORD_MS = 110

const SECTIONS = [
  { title: "Components", href: "/components" },
  { title: "Blocks", href: "/blocks" },
  { title: "Templates", href: "/templates" },
]

/** Words that rise out of a blur one after another. Pure CSS, so they show without JavaScript. */
function Words({ text, start = 0, className }: { text: string; start?: number; className?: string }) {
  return text.split(" ").map((word, i) => (
    <React.Fragment key={`${word}-${i}`}>
      <span
        className={cn("inline-block animate-word-in motion-reduce:animate-none", className)}
        style={{ animationDelay: `${(start + i) * WORD_MS}ms` }}
      >
        {word}
      </span>{" "}
    </React.Fragment>
  ))
}

/**
 * The homepage hero: the headline on the left and a 3D globe with glowing
 * routes between cities on the right. It follows the site theme, light or
 * dark. Every number is counted from the registry at build time.
 */
export function HomeHero({ components, blocks, threeD }: HomeHeroProps) {
  const stats = [
    { value: components, label: "components" },
    { value: blocks, label: "blocks" },
    { value: threeD, label: "3D effects" },
  ]

  return (
    <section className="relative isolate overflow-hidden border-b bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(color-mix(in_oklch,var(--foreground)_14%,transparent)_1px,transparent_1px)] bg-size-[22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_60%_45%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[36rem] w-[70rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,oklch(0.7_0.15_285/0.16),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_top,oklch(0.6_0.18_285/0.18),transparent_65%)]"
      />

      <div className="mx-auto grid min-h-[calc(100svh-3.5rem)] w-full max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-4 px-4 pt-16 pb-12 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-8 lg:py-12">
        <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
          <nav
            aria-label="What's in kanakui"
            className="flex animate-word-in items-center gap-2.5 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase motion-reduce:animate-none"
          >
            {SECTIONS.map((section, i) => (
              <React.Fragment key={section.href}>
                {i > 0 ? (
                  <span aria-hidden="true" className="size-1 rounded-full bg-violet-500/60 dark:bg-violet-300/60" />
                ) : null}
                <Link
                  href={section.href}
                  className="rounded-sm transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  {section.title}
                </Link>
              </React.Fragment>
            ))}
          </nav>

          <h1 className="mt-7 text-5xl leading-[1.02] font-semibold tracking-tighter text-balance sm:text-6xl xl:text-7xl">
            <Words text="Build beautiful interfaces." start={1} />
            <span className="inline-block animate-word-in motion-reduce:animate-none" style={{ animationDelay: `${4 * WORD_MS}ms` }}>
              {/* Deeper colors on light backgrounds, pastel on dark; only one is displayed. */}
              <GradientText colors={["oklch(0.52 0.24 300)", "oklch(0.52 0.19 255)", "oklch(0.56 0.13 200)"]} className="pb-[0.08em] dark:hidden">
                Ship faster.
              </GradientText>
              <GradientText
                colors={["oklch(0.78 0.16 300)", "oklch(0.8 0.13 230)", "oklch(0.85 0.12 190)"]}
                className="hidden pb-[0.08em] dark:inline-block"
              >
                Ship faster.
              </GradientText>
            </span>
          </h1>

          <p
            className="mt-6 max-w-xl animate-word-in text-base text-pretty text-muted-foreground motion-reduce:animate-none sm:text-lg"
            style={{ animationDelay: "650ms" }}
          >
            Production-ready React components, website blocks and templates. Copy them in with one command, customize
            the source, and build modern interfaces without starting from scratch.
          </p>

          <div
            className="mt-9 flex w-full animate-word-in flex-col gap-3 motion-reduce:animate-none sm:w-auto sm:flex-row"
            style={{ animationDelay: "800ms" }}
          >
            <Link
              href="/components"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl p-px outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-glow-spin bg-[conic-gradient(from_0deg,transparent_0%,oklch(0.78_0.16_300)_15%,oklch(0.8_0.13_220)_30%,transparent_45%,transparent_100%)] motion-reduce:animate-none"
              />
              <span className="relative inline-flex size-full items-center justify-center gap-2 rounded-[11px] bg-foreground px-7 text-sm font-medium text-background transition-colors group-hover:bg-foreground/90">
                Explore components
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link
              href="/templates"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-foreground/15 bg-background/60 px-7 text-sm font-medium backdrop-blur-md transition-colors outline-none hover:bg-foreground/5 focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Browse templates
            </Link>
          </div>

          <div className="mt-7 w-full max-w-xl animate-word-in motion-reduce:animate-none" style={{ animationDelay: "950ms" }}>
            <CommandBlock
              command={installCommandByUrl("arc-globe")}
              copyLabel="Copy install command for Arc Globe"
              className="border-foreground/10 bg-background/60 text-left backdrop-blur-md"
            />
          </div>

          <dl
            className="mt-8 flex animate-word-in flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-muted-foreground motion-reduce:animate-none lg:justify-start"
            style={{ animationDelay: "1100ms" }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-row-reverse items-baseline gap-1.5">
                <dt>{stat.label}</dt>
                <dd className="font-mono text-base font-medium text-foreground tabular-nums">
                  <NumberTicker value={stat.value} duration={1600} locale="en-US" />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroGlobe className="relative mx-auto aspect-square w-full max-w-[24rem] sm:max-w-[30rem] lg:max-w-[40rem]" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-violet-500/40 to-transparent dark:via-violet-300/50"
      />
    </section>
  )
}
