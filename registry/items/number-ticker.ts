import { defineItem } from "../define.ts"

export default defineItem({
  name: "number-ticker",
  type: "registry:ui",
  title: "Number Ticker",
  description: "Counts up to a number when it scrolls into view, with locale-aware formatting.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["text", "animations"],
  files: [{ path: "registry/default/ui/number-ticker.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "value", type: "number", description: "Number to count to. Required." },
      { name: "from", type: "number", default: "0", description: "Number to start from. Can be larger than `value` to count down." },
      { name: "duration", type: "number", default: "2000", description: "Animation length, in milliseconds." },
      { name: "decimals", type: "number", default: "0", description: "Digits after the decimal point." },
      { name: "locale", type: "string", description: "Locale for formatting, e.g. `en-IN` for 1,00,000. Defaults to the visitor’s locale." },
      { name: "formatOptions", type: "Intl.NumberFormatOptions", description: "Extra formatting, e.g. `{ style: \"currency\", currency: \"INR\" }`." },
    ],
    extends: "All `<span>` props except `children`.",
    requirements: ["React 19 and Tailwind CSS v4, with a `cn` helper at `@/lib/utils`. No other dependencies."],
    customization: [
      "Pass `formatOptions={{ style: \"percent\" }}` with a value like `0.42` for percentages, or `notation: \"compact\"` for 12K-style numbers.",
      "Pass `locale` to format the same way for every visitor; otherwise the browser’s locale is used.",
    ],
    accessibility: [
      "Screen readers get the final value from a visually hidden copy, not the changing digits.",
      "With reduced motion, the final value appears immediately.",
    ],
    troubleshooting: [
      {
        problem: "The number stays at the start value.",
        solution: "It starts when 40% of it is visible. In a scroll container or a hidden tab, make sure it actually becomes visible.",
      },
      {
        problem: "Different separators on server and client.",
        solution: "Pass a fixed `locale` so the server-rendered start value and the animated value use the same format.",
      },
    ],
  },
})
