import * as React from "react"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

import { HeroGalaxy } from "@/components/home/hero-galaxy"
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

/** A light beam falling from the top edge. Decorative. */
function Beam({ className, from, to }: { className: string; from: string; to: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -top-48 -z-10 h-[52rem] w-[26rem] origin-top animate-beam-in rounded-full blur-3xl motion-reduce:animate-none",
        className
      )}
      style={{ transform: to, "--beam-from": from, "--beam-to": to } as React.CSSProperties}
    />
  )
}

/**
 * The homepage hero: a dark stage in both themes, with a particle galaxy,
 * light beams and a headline that resolves word by word. Every number is
 * counted from the registry at build time.
 */
export function HomeHero({ components, blocks, threeD }: HomeHeroProps) {
  const stats = [
    { value: components, label: "components" },
    { value: blocks, label: "blocks" },
    { value: threeD, label: "3D effects" },
  ]

  return (
    <section className="dark relative isolate flex min-h-[calc(100svh-3.5rem)] flex-col overflow-hidden border-b bg-background text-foreground">
      <HeroGalaxy className="absolute inset-0 -z-20" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_40%_at_50%_42%,color-mix(in_oklch,var(--background)_75%,transparent),transparent),radial-gradient(ellipse_120%_90%_at_50%_50%,transparent_55%,var(--background))]"
      />
      <Beam
        className="left-[8%] bg-[linear-gradient(to_bottom,oklch(0.75_0.16_290/0.45),transparent_75%)]"
        from="rotate(-70deg) scaleY(0.3)"
        to="rotate(-32deg)"
      />
      <Beam
        className="right-[8%] bg-[linear-gradient(to_bottom,oklch(0.8_0.12_220/0.4),transparent_75%)] [animation-delay:200ms]"
        from="rotate(70deg) scaleY(0.3)"
        to="rotate(32deg)"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <Link
          href="/components/category/3d"
          className="inline-flex animate-word-in items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur-md transition-colors hover:border-white/25 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none motion-reduce:animate-none"
        >
          <Sparkles aria-hidden="true" className="size-3.5 text-violet-300" />
          New: 3D components
          <ArrowRight aria-hidden="true" className="size-3" />
        </Link>

        <h1 className="mt-8 max-w-5xl text-5xl leading-[1.02] font-semibold tracking-tighter text-balance sm:text-7xl lg:text-[5.75rem]">
          <Words text="Build interfaces people" start={1} />
          <span className="inline-block animate-word-in motion-reduce:animate-none" style={{ animationDelay: `${4 * WORD_MS}ms` }}>
            <GradientText colors={["oklch(0.83 0.12 60)", "oklch(0.78 0.16 320)", "oklch(0.8 0.13 230)"]} className="pb-[0.08em]">
              remember
            </GradientText>
          </span>
        </h1>

        <p
          className="mt-7 max-w-2xl animate-word-in text-base text-pretty text-muted-foreground motion-reduce:animate-none sm:text-lg"
          style={{ animationDelay: "650ms" }}
        >
          {components} animated components and {blocks} page blocks for React and Tailwind CSS, including real 3D.
          Install any of them with one command; the code lands in your project, ready to change.
        </p>

        <div
          className="mt-10 flex w-full animate-word-in flex-col justify-center gap-3 motion-reduce:animate-none sm:w-auto sm:flex-row"
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
              Browse components
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
          <Link
            href="/docs/installation"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 bg-black/45 px-7 text-sm font-medium backdrop-blur-md transition-colors outline-none hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Installation guide
          </Link>
        </div>

        <div className="mt-8 w-full max-w-xl animate-word-in motion-reduce:animate-none" style={{ animationDelay: "950ms" }}>
          <CommandBlock
            command={installCommandByUrl("dotted-globe")}
            copyLabel="Copy install command for Dotted Globe"
            className="border-white/10 bg-black/40 text-left backdrop-blur-md"
          />
        </div>

        <dl
          className="mt-10 flex animate-word-in flex-wrap justify-center gap-x-6 gap-y-1 rounded-2xl border border-white/10 bg-black/55 px-5 py-2.5 text-sm text-muted-foreground backdrop-blur-md motion-reduce:animate-none sm:rounded-full"
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-violet-300/50 to-transparent"
      />
    </section>
  )
}
