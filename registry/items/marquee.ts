import { defineItem } from "../define.ts"

export default defineItem({
  name: "marquee",
  type: "registry:ui",
  title: "Marquee",
  description: "Scrolls content in an endless loop, horizontally or vertically.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["effects", "animations"],
  files: [{ path: "registry/default/ui/marquee.tsx", type: "registry:ui" }],
  cssVars: {
    theme: {
      "animate-marquee": "marquee var(--marquee-duration) linear infinite",
      "animate-marquee-vertical": "marquee-vertical var(--marquee-duration) linear infinite",
    },
  },
  css: {
    "@keyframes marquee": {
      from: { transform: "translateX(0)" },
      to: { transform: "translateX(calc(-100% - var(--marquee-gap)))" },
    },
    "@keyframes marquee-vertical": {
      from: { transform: "translateY(0)" },
      to: { transform: "translateY(calc(-100% - var(--marquee-gap)))" },
    },
  },
  pageDocs: {
    props: [
      { name: "reverse", type: "boolean", default: "false", description: "Scroll in the opposite direction." },
      { name: "pauseOnHover", type: "boolean", default: "false", description: "Pause while the pointer is over the marquee." },
      { name: "vertical", type: "boolean", default: "false", description: "Scroll top-to-bottom instead of sideways." },
      { name: "repeat", type: "number", default: "4", description: "Copies of the children. Raise it if a gap shows on very wide screens." },
      { name: "duration", type: "string", default: "\"40s\"", description: "Time for one loop, as a CSS duration." },
      { name: "gap", type: "string", default: "\"1rem\"", description: "Space between items, as a CSS length." },
    ],
    extends: "All `<div>` props, including `className` and `style`.",
    requirements: [
      "Tailwind CSS v4. The CLI adds the `marquee` keyframes and `--animate-marquee` theme variables to your CSS.",
      "A `cn` helper at `@/lib/utils`.",
    ],
    customization: [
      "Fade the edges by wrapping the marquee in an element with a mask, e.g. `[mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)]`.",
      "Stack two marquees with `reverse` on one for a woven look.",
      "For vertical scrolling, give the marquee a fixed height, e.g. `className=\"h-80\"`.",
    ],
    accessibility: [
      "Only the first copy is exposed to screen readers; the repeated copies are `aria-hidden` and `inert`, so links inside are reachable once.",
      "Scrolling stops when the user prefers reduced motion.",
      "Use `pauseOnHover` when items contain links or text people need to read.",
    ],
    troubleshooting: [
      {
        problem: "Items jump at the end of each loop.",
        solution: "Check that `--animate-marquee` and the `marquee` keyframes are in your CSS, and that `gap` matches any spacing you add yourself.",
      },
      {
        problem: "A gap appears on wide screens.",
        solution: "Increase `repeat` so the copies cover the full width.",
      },
    ],
  },
})
