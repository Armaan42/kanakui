import { defineItem } from "../define.ts"

export default defineItem({
  name: "skeleton-shimmer",
  type: "registry:ui",
  title: "Skeleton Shimmer",
  description: "Loading placeholders with a light sweep, plus a text-lines helper.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["loaders"],
  files: [{ path: "registry/default/ui/skeleton-shimmer.tsx", type: "registry:ui" }],
  cssVars: { theme: { "animate-skeleton-shimmer": "skeleton-shimmer 1.6s ease-in-out infinite" } },
  css: { "@keyframes skeleton-shimmer": { to: { transform: "translateX(200%)" } } },
  pageDocs: {
    props: [{ name: "lines", type: "number", default: "3", description: "SkeletonText: number of lines." }],
    extends: "`SkeletonShimmer` accepts all `<div>` props; size it with classes like `h-4 w-32`.",
    requirements: ["Tailwind CSS v4. The CLI adds the `skeleton-shimmer` keyframes. Works in Server Components."],
    customization: ["Match placeholder shapes to the real content to avoid layout jumps."],
    accessibility: ["Placeholders are `aria-hidden`. Mark the loading region with `aria-busy=\"true\"` and a hidden “Loading…”.", "No sweep with reduced motion."],
    troubleshooting: [{ problem: "The sweep isn’t visible in light mode.", solution: "Raise the `via-foreground/[0.07]` opacity in the file." }],
  },
})
