import { defineItem } from "../define.ts"

export default defineItem({
  name: "ripple-background",
  type: "registry:ui",
  title: "Ripple Background",
  description: "Concentric rings that gently pulse from the center, e.g. behind an icon.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["backgrounds", "animations"],
  files: [{ path: "registry/default/ui/ripple-background.tsx", type: "registry:ui" }],
  cssVars: { theme: { "animate-ripple-ring": "ripple-ring 3s ease-in-out infinite" } },
  css: {
    "@keyframes ripple-ring": {
      "0%, 100%": { transform: "scale(1)" },
      "50%": { transform: "scale(0.94)" },
    },
  },
  pageDocs: {
    props: [
      { name: "rings", type: "number", default: "6", description: "Number of rings." },
      { name: "size", type: "number", default: "160", description: "Diameter of the innermost ring, in pixels." },
      { name: "step", type: "number", default: "90", description: "Extra diameter per ring, in pixels." },
    ],
    extends: "All `<div>` props, including `className`.",
    requirements: ["Tailwind CSS v4. The CLI adds the `ripple-ring` keyframes and `--animate-ripple-ring` to your CSS. Works in Server Components."],
    customization: [
      "Rings fade toward the edges with a radial mask. Remove the mask class for hard edges.",
      "Center an icon or avatar on top by placing it after the background with `relative`.",
    ],
    accessibility: ["Decorative: `aria-hidden`.", "Rings stay still when the user prefers reduced motion."],
    troubleshooting: [
      { problem: "Rings are off-center.", solution: "The parent must be the positioned element (`relative`) whose center you want." },
    ],
  },
})
