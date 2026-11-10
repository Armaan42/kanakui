import { defineItem } from "../define.ts"

export default defineItem({
  name: "dot-pattern",
  type: "registry:ui",
  title: "Dot Pattern",
  description: "A repeating dot grid background, with an optional fade toward the edges.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["backgrounds"],
  files: [{ path: "registry/default/ui/dot-pattern.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "spacing", type: "number", default: "16", description: "Distance between dots, in pixels." },
      { name: "radius", type: "number", default: "1", description: "Dot radius, in pixels." },
      { name: "fade", type: "boolean", default: "false", description: "Fade the dots out toward the edges with a radial mask." },
    ],
    extends: "All `<svg>` props, including `className` and `style`.",
    requirements: ["Tailwind CSS v4, with a `cn` helper at `@/lib/utils`. Works in Server Components."],
    customization: [
      "Dots use `currentColor`. Change the color with a text class, e.g. `className=\"text-primary/20\"`.",
      "It fills the nearest positioned parent. Give that parent `relative` and `overflow-hidden`, and put your content after the pattern with `relative`.",
    ],
    accessibility: ["Decorative: `aria-hidden` and ignores the pointer."],
    troubleshooting: [
      {
        problem: "The pattern covers the whole page.",
        solution: "The parent needs `position: relative`; otherwise the pattern fills the nearest positioned ancestor.",
      },
    ],
  },
})
