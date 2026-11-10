import { defineItem } from "../define.ts"

export default defineItem({
  name: "meteors",
  type: "registry:ui",
  title: "Meteors",
  description: "Streaks of light falling diagonally across a card or section.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["backgrounds", "effects", "animations"],
  files: [{ path: "registry/default/ui/meteors.tsx", type: "registry:ui" }],
  cssVars: { theme: { "animate-meteor": "meteor 5s linear infinite" } },
  css: {
    "@keyframes meteor": {
      "0%": { transform: "translateX(0)", opacity: "1" },
      "70%": { opacity: "1" },
      "100%": { transform: "translateX(-600px)", opacity: "0" },
    },
  },
  pageDocs: {
    props: [{ name: "count", type: "number", default: "16", description: "Number of meteors." }],
    extends: "All `<div>` props, including `className`.",
    requirements: ["Tailwind CSS v4. The CLI adds the `meteor` keyframes and `--animate-meteor` to your CSS. Works in Server Components."],
    customization: [
      "Positions and timings are pseudo-random but fixed, so server and browser render the same thing.",
      "Change the streak color with the `from-foreground/70` class in the file, e.g. a brand color.",
    ],
    accessibility: ["Decorative: `aria-hidden`.", "Hidden when the user prefers reduced motion."],
    troubleshooting: [
      { problem: "Meteors appear outside the card.", solution: "Give the parent `relative overflow-hidden`." },
    ],
  },
})
