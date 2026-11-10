import { defineItem } from "../define.ts"

export default defineItem({
  name: "retro-grid",
  type: "registry:ui",
  title: "Retro Grid",
  description: "A perspective grid floor that scrolls toward the viewer and fades at the horizon.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["backgrounds", "animations"],
  files: [{ path: "registry/default/ui/retro-grid.tsx", type: "registry:ui" }],
  cssVars: { theme: { "animate-retro-grid": "retro-grid 15s linear infinite" } },
  css: {
    "@keyframes retro-grid": {
      "0%": { transform: "translateY(-50%)" },
      "100%": { transform: "translateY(0)" },
    },
  },
  pageDocs: {
    props: [
      { name: "angle", type: "number", default: "65", description: "Tilt of the grid plane, in degrees." },
      { name: "cellSize", type: "number", default: "56", description: "Grid cell size, in pixels." },
    ],
    extends: "All `<div>` props, including `className` and `style`.",
    requirements: ["Tailwind CSS v4. The CLI adds the `retro-grid` keyframes and `--animate-retro-grid` to your CSS."],
    customization: [
      "Place it inside a `relative overflow-hidden` section and put your content after it with `relative`.",
      "A smaller `angle` flattens the floor; a larger `cellSize` makes the grid feel closer.",
    ],
    accessibility: ["Decorative: `aria-hidden` and ignores the pointer.", "Stops moving when the user prefers reduced motion."],
    troubleshooting: [
      { problem: "The grid covers the whole page.", solution: "Its parent needs `position: relative` and `overflow: hidden`." },
    ],
  },
})
