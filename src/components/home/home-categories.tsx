import Link from "next/link"
import {
  Box,
  CircleDashed,
  Component,
  FormInput,
  Grid3x3,
  Layers,
  LayoutTemplate,
  ListTree,
  MousePointerClick,
  Navigation,
  Sparkles,
  SquareStack,
  Type,
  Wand2,
  type LucideIcon,
} from "lucide-react"

import { GlowGrid } from "@/components/home/glow-grid"
import { getCategories, getItems } from "@/lib/registry"

const ICONS: Record<string, LucideIcon> = {
  buttons: MousePointerClick,
  cards: SquareStack,
  navigation: Navigation,
  forms: FormInput,
  inputs: FormInput,
  backgrounds: Grid3x3,
  effects: Wand2,
  animations: Sparkles,
  text: Type,
  "3d": Box,
  loaders: CircleDashed,
  interactive: MousePointerClick,
  "data-display": ListTree,
}

/** Every component category with its real item count, plus a tile for blocks. */
export function HomeCategories() {
  const categories = getCategories("components")
  const blocks = getItems("blocks").length

  return (
    <section aria-labelledby="categories" className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <h2 id="categories" className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Everything you need to build a modern product
        </h2>
        <GlowGrid className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = ICONS[category.slug] ?? Component
            return (
              <li key={category.slug}>
                <Link
                  href={`/components/category/${category.slug}`}
                  className="glow-card group flex h-full flex-col gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-foreground/20 hover:bg-muted/40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <span className="flex items-center justify-between">
                    <Icon aria-hidden="true" className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                    <span className="font-mono text-xs text-muted-foreground tabular-nums">{category.count}</span>
                  </span>
                  <span className="font-medium">{category.title}</span>
                  <span className="line-clamp-2 text-sm text-muted-foreground">{category.description}</span>
                </Link>
              </li>
            )
          })}
          <li>
            <Link
              href="/blocks"
              className="glow-card group flex h-full flex-col gap-3 rounded-xl border border-dashed bg-card p-4 transition-colors hover:border-foreground/30 hover:bg-muted/40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <span className="flex items-center justify-between">
                <LayoutTemplate aria-hidden="true" className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                <span className="font-mono text-xs text-muted-foreground tabular-nums">{blocks}</span>
              </span>
              <span className="font-medium">Page blocks</span>
              <span className="text-sm text-muted-foreground">Heroes, pricing, testimonials, footers and more.</span>
            </Link>
          </li>
          <li>
            <Link
              href="/docs"
              className="glow-card group flex h-full flex-col gap-3 rounded-xl border border-dashed bg-card p-4 transition-colors hover:border-foreground/30 hover:bg-muted/40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <Layers aria-hidden="true" className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
              <span className="font-medium">Docs</span>
              <span className="text-sm text-muted-foreground">Installation, CLI and troubleshooting guides.</span>
            </Link>
          </li>
        </GlowGrid>
      </div>
    </section>
  )
}
