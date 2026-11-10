import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

import { CommandBlock } from "@/components/site/command-block"
import { Button } from "@/components/ui/button"
import { HeroRotatingWords } from "@/components/home/hero-rotating-words"
import { HeroSurface } from "@/components/home/hero-surface"
import { installCommandByUrl } from "@/config/site"
import { GridPattern } from "@/registry/default/ui/grid-pattern"
import { NumberTicker } from "@/registry/default/ui/number-ticker"

interface HomeHeroProps {
  components: number
  blocks: number
  threeD: number
}

/** Homepage hero. Every number is counted from the registry at build time. */
export function HomeHero({ components, blocks, threeD }: HomeHeroProps) {
  const stats = [
    { value: components, label: "Components" },
    { value: blocks, label: "Blocks" },
    { value: threeD, label: "3D effects" },
  ]

  return (
    <HeroSurface className="border-b">
      <GridPattern fade size={44} highlight={[[3, 2], [7, 1], [12, 3], [18, 2], [23, 1]]} className="text-foreground/[0.07]" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-28 sm:pb-20">
        <Link
          href="/components/category/3d"
          className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <Sparkles aria-hidden="true" className="size-3.5" />
          New: 3D components
          <ArrowRight aria-hidden="true" className="size-3" />
        </Link>

        <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
          React components that make interfaces{" "}
          <HeroRotatingWords words={["feel alive", "stand out", "move", "shine"]} />
        </h1>
        <p className="mt-6 max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">
          Animated, accessible components and page blocks for React and Tailwind CSS. Install any of them with one
          command. The code lands in your project, ready to change.
        </p>

        <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg" className="h-11 px-6">
            <Link href="/components">
              Browse components
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-11 px-6">
            <Link href="/docs/installation">Installation guide</Link>
          </Button>
        </div>

        <CommandBlock
          command={installCommandByUrl("dotted-globe")}
          copyLabel="Copy install command for Dotted Globe"
          className="mt-8 w-full max-w-2xl text-left"
        />

        <dl className="mt-14 grid w-full max-w-lg grid-cols-3 divide-x rounded-xl border bg-background/60">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1 px-4 py-4">
              <dt className="text-xs text-muted-foreground">{stat.label}</dt>
              <dd className="text-2xl font-semibold tracking-tight sm:text-3xl">
                <NumberTicker value={stat.value} duration={1400} locale="en-US" />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </HeroSurface>
  )
}
