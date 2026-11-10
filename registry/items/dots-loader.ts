import { defineItem } from "../define.ts"

export default defineItem({
  name: "dots-loader",
  type: "registry:ui",
  title: "Dots Loader",
  description: "Three dots that rise and fall in turn, for typing or inline loading states.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["loaders", "animations"],
  files: [{ path: "registry/default/ui/dots-loader.tsx", type: "registry:ui" }],
  cssVars: {
    theme: { "animate-dots-loader": "dots-loader 1.2s ease-in-out infinite" },
  },
  css: {
    "@keyframes dots-loader": {
      "0%, 80%, 100%": { transform: "translateY(0)", opacity: "0.4" },
      "40%": { transform: "translateY(-0.35em)", opacity: "1" },
    },
  },
  pageDocs: {
    props: [{ name: "label", type: "string", default: "\"Loading\"", description: "Text announced to screen readers." }],
    extends: "All `<span>` props except `children`.",
    requirements: [
      "Tailwind CSS v4. The CLI adds the `dots-loader` keyframes and `--animate-dots-loader` to your CSS.",
      "A `cn` helper at `@/lib/utils`. Works in Server Components.",
    ],
    customization: [
      "Dots scale with the font size, so `className=\"text-2xl\"` makes them bigger.",
      "They use the text color; set it with a text class.",
    ],
    accessibility: [
      "Has `role=\"status\"` and announces `label`.",
      "With reduced motion, the dots fade gently instead of moving.",
    ],
    troubleshooting: [
      {
        problem: "Dots don’t move.",
        solution: "Check that the `dots-loader` keyframes and `--animate-dots-loader` are in your CSS.",
      },
    ],
  },
})
