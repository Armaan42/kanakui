import { defineItem } from "../define.ts"

export default defineItem({
  name: "gradient-text",
  type: "registry:ui",
  title: "Gradient Text",
  description: "Text filled with a slowly moving gradient: a subtle sheen by default, or your own colors.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["text", "animations"],
  files: [{ path: "registry/default/ui/gradient-text.tsx", type: "registry:ui" }],
  cssVars: { theme: { "animate-gradient-text": "gradient-text 6s linear infinite" } },
  css: {
    "@keyframes gradient-text": {
      from: { "background-position": "0% center" },
      to: { "background-position": "200% center" },
    },
  },
  pageDocs: {
    props: [
      { name: "colors", type: "string[]", description: "Gradient colors, left to right. Defaults to a sheen of the text color." },
      { name: "animate", type: "boolean", default: "true", description: "Slowly move the gradient." },
    ],
    extends: "All `<span>` props, including `className` and `style`.",
    requirements: [
      "Tailwind CSS v4. The CLI adds the `gradient-text` keyframes and `--animate-gradient-text` to your CSS.",
      "Works in Server Components.",
    ],
    customization: [
      "Use brand colors sparingly: one gradient word in a headline reads better than a whole paragraph.",
      "Pass `animate={false}` for a static gradient.",
    ],
    accessibility: [
      "The text stays real text. Check contrast at both ends of your gradient against the background.",
      "The movement stops when the user prefers reduced motion.",
    ],
    troubleshooting: [
      { problem: "The text is invisible.", solution: "It uses `bg-clip-text` with transparent text. Another class that sets a background color on the same element will hide it." },
    ],
  },
})
