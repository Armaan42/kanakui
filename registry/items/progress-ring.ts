import { defineItem } from "../define.ts"

export default defineItem({
  name: "progress-ring",
  type: "registry:ui",
  title: "Progress Ring",
  description: "Circular progress with the value in the middle, exposed as an accessible progress bar.",
  version: "0.1.1",
  releasedAt: "2026-11-10",
  categories: ["loaders"],
  files: [{ path: "registry/default/ui/progress-ring.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "value", type: "number", description: "Current progress, from 0 to `max`. Required." },
      { name: "max", type: "number", default: "100", description: "Value at which the ring is full." },
      { name: "size", type: "number", default: "96", description: "Diameter in pixels." },
      { name: "strokeWidth", type: "number", default: "8", description: "Ring thickness in pixels." },
      { name: "label", type: "string", description: "Accessible name, e.g. “Upload progress”. Required." },
      { name: "children", type: "ReactNode", default: "percentage", description: "Content in the middle, e.g. `3/5`." },
    ],
    extends: "All `<div>` props except `children`, which is listed above.",
    requirements: ["Tailwind CSS v4, with a `cn` helper at `@/lib/utils`. Works in Server Components."],
    customization: [
      "Color the ring with stroke classes: it uses `stroke-primary` (your theme’s primary color); edit it in the file, or pass `className=\"[&_circle:last-child]:stroke-emerald-500\"`.",
      "Show steps instead of percent with `max={5}` and `children=\"3/5\"`.",
    ],
    accessibility: ["Uses `role=\"progressbar\"` with min, max and current value, so screen readers announce progress.", "The ring animates between values unless the user prefers reduced motion."],
    troubleshooting: [
      { problem: "The ring starts at the right instead of the top.", solution: "The SVG is rotated `-90deg` to start at 12 o’clock. Keep the `-rotate-90` class." },
    ],
  },
})
