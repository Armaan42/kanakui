import { defineItem } from "../define.ts"

export default defineItem({
  name: "sparkles",
  type: "registry:ui",
  title: "Sparkles",
  description: "Small stars that twinkle around a word, badge or button.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["effects", "text", "animations"],
  files: [{ path: "registry/default/ui/sparkles.tsx", type: "registry:ui" }],
  cssVars: { theme: { "animate-sparkle": "sparkle 1.8s ease-in-out infinite" } },
  css: {
    "@keyframes sparkle": {
      "0%, 100%": { transform: "scale(0) rotate(0deg)", opacity: "0" },
      "50%": { transform: "scale(1) rotate(90deg)", opacity: "1" },
    },
  },
  pageDocs: {
    props: [
      { name: "count", type: "number", default: "10", description: "Number of sparkles." },
      { name: "color", type: "string", default: "text color", description: "Sparkle color." },
    ],
    extends: "All `<span>` props, including `className` and `children`.",
    requirements: ["Tailwind CSS v4. The CLI adds the `sparkle` keyframes. Works in Server Components."],
    customization: ["Positions are pseudo-random but fixed, so server and browser HTML match.", "Use one sparkling word per headline."],
    accessibility: ["Sparkles are `aria-hidden`; the wrapped text is read normally.", "Hidden with reduced motion."],
    troubleshooting: [{ problem: "Sparkles are clipped.", solution: "They extend 12px outside the text. Avoid `overflow-hidden` on the direct parent." }],
  },
})
