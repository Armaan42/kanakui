import { defineItem } from "../define.ts"

export default defineItem({
  name: "grid-pattern",
  type: "registry:ui",
  title: "Grid Pattern",
  description: "Grid lines as a background, with optional highlighted cells and an edge fade.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["backgrounds"],
  files: [{ path: "registry/default/ui/grid-pattern.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "size", type: "number", default: "32", description: "Cell size, in pixels." },
      { name: "highlight", type: "[number, number][]", default: "[]", description: "Cells to fill, as `[column, row]` pairs from the top-left." },
      { name: "dashed", type: "string", description: "SVG dash pattern for the lines, e.g. `\"4 2\"`." },
      { name: "fade", type: "boolean", default: "false", description: "Fade the grid out from the top center." },
    ],
    extends: "All `<svg>` props, including `className` and `style`.",
    requirements: ["Tailwind CSS v4, with a `cn` helper at `@/lib/utils`. Works in Server Components."],
    customization: [
      "Lines and highlighted cells use `currentColor`; set it with a text class such as `text-border`.",
      "Highlight cells near your headline to draw the eye, e.g. `highlight={[[4, 2], [6, 3]]}`.",
    ],
    accessibility: ["Decorative: `aria-hidden` and ignores the pointer."],
    troubleshooting: [
      {
        problem: "Highlighted cells don’t line up with the grid.",
        solution: "Cells are counted from the top-left of the SVG. If you offset the pattern, offset the highlights the same way.",
      },
    ],
  },
})
