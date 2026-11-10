import { defineItem } from "../define.ts"

export default defineItem({
  name: "aurora-background",
  type: "registry:ui",
  title: "Aurora Background",
  description: "Soft, blurred color fields that drift slowly behind content.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["backgrounds", "animations"],
  files: [{ path: "registry/default/ui/aurora-background.tsx", type: "registry:ui" }],
  cssVars: { theme: { "animate-aurora": "aurora 18s ease-in-out infinite alternate" } },
  css: {
    "@keyframes aurora": {
      "0%": { transform: "translate(0, 0) scale(1)" },
      "50%": { transform: "translate(8%, -6%) scale(1.1)" },
      "100%": { transform: "translate(-6%, 6%) scale(0.95)" },
    },
  },
  pageDocs: {
    props: [
      { name: "colors", type: "[string, string, string]", default: "indigo, cyan, emerald", description: "Three blob colors." },
      { name: "intensity", type: "number", default: "0.35", description: "Overall strength, 0–1." },
    ],
    extends: "All `<div>` props, including `className` and `children`.",
    requirements: ["Tailwind CSS v4. The CLI adds the `aurora` keyframes. Works in Server Components."],
    customization: ["Use brand colors at a low `intensity` so text stays readable.", "Give the wrapper a size and rounded corners, e.g. a card or hero."],
    accessibility: ["Decorative layer; check text contrast over the brightest blob.", "Still with reduced motion."],
    troubleshooting: [{ problem: "Blobs show outside the box.", solution: "The wrapper uses `overflow-hidden`; keep it." }],
  },
})
