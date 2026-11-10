import { defineItem } from "../define.ts"

export default defineItem({
  name: "bar-loader",
  type: "registry:ui",
  title: "Bar Loader",
  description: "A thin indeterminate progress bar for pages and cards that are loading.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["loaders", "animations"],
  files: [{ path: "registry/default/ui/bar-loader.tsx", type: "registry:ui" }],
  cssVars: { theme: { "animate-bar-loader": "bar-loader 1.4s ease-in-out infinite" } },
  css: {
    "@keyframes bar-loader": {
      "0%": { transform: "translateX(-100%)" },
      "100%": { transform: "translateX(300%)" },
    },
  },
  pageDocs: {
    props: [{ name: "label", type: "string", default: "\"Loading\"", description: "Accessible name, e.g. “Loading results”." }],
    extends: "All `<div>` props except `children`.",
    requirements: ["Tailwind CSS v4. The CLI adds the `bar-loader` keyframes and `--animate-bar-loader` to your CSS. Works in Server Components."],
    customization: [
      "Pin it to the top of the page with `className=\"fixed inset-x-0 top-0 z-50 rounded-none\"`.",
      "Change the bar color by editing `bg-foreground` in the file.",
    ],
    accessibility: [
      "Uses `role=\"progressbar\"` without a value, which screen readers announce as busy or indeterminate.",
      "With reduced motion the bar fills the track and pulses instead of sliding.",
    ],
    troubleshooting: [
      { problem: "The bar doesn’t move.", solution: "Check that the `bar-loader` keyframes are in your CSS (the CLI adds them)." },
    ],
  },
})
