import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { HeroDesk } from "@/components/home/hero-desk"
import { CommandBlock } from "@/components/site/command-block"
import { installCommand } from "@/config/site"

interface HomeHeroProps {
  components: number
  blocks: number
  /** Kept for the page's data; the hero no longer shows a 3D count. */
  threeD?: number
}

/**
 * The homepage hero: a short, specific headline above a workbench of real
 * VenusUI components that visitors can play with straight away.
 */
export function HomeHero({ components, blocks }: HomeHeroProps) {
  return (
    <section className="border-b bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 pt-14 pb-10 sm:px-6 sm:pt-20 lg:pb-14">
        <div className="grid grid-cols-[minmax(0,1fr)] items-end gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
          <div className="max-w-2xl">
            <h1 className="text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl xl:text-7xl">
              Components you can almost touch.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
              VenusUI is a free library of {components} React components and {blocks} blocks for shadcn/ui. Everything on
              this desk is one of them: strike the match, flip a switch, take a photo.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:pb-1">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href="/components"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-foreground px-5 text-sm font-medium text-background outline-none transition-colors hover:bg-foreground/85 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                Browse components
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link href="/templates" className="text-sm font-medium underline-offset-4 outline-none hover:underline focus-visible:underline">
                See templates
              </Link>
            </div>
            <CommandBlock
              packageManagers={false}
              command={installCommand("matchbox")}
              copyLabel="Copy install command for Matchbox"
              className="bg-background text-left"
            />
          </div>
        </div>
      </div>
      <HeroDesk />
    </section>
  )
}
