import { defineItem } from "../define.ts"

export default defineItem({
  name: "stats-01",
  type: "registry:block",
  title: "Animated Stats",
  description: "Four key numbers that count up as they scroll into view.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["stats"],
  internalDependencies: ["number-ticker"],
  files: [{ path: "registry/default/blocks/stats-01/components/stats-01.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Numbers are in the `stats` array at the top of the file.",
    requirements: ["kanakui `number-ticker` (the CLI installs it), React 19 and Tailwind CSS v4."],
    customization: [
      "The numbers are placeholders. Replace them with real, current figures.",
      "Each stat accepts `decimals` and a `suffix` such as `%` or `ms`.",
      "Change `locale` on `NumberTicker` to format numbers for your audience, e.g. `en-IN`.",
    ],
    accessibility: [
      "Stats are a description list: the label is the term and the number its value.",
      "Screen readers get each final number, not the counting digits.",
    ],
    troubleshooting: [
      { problem: "Numbers stay at 0.", solution: "They start counting when they scroll into view. Make sure the section is actually visible on the page." },
    ],
  },
})
