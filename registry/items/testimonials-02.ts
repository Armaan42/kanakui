import { defineItem } from "../define.ts"

export default defineItem({
  name: "testimonials-02",
  type: "registry:block",
  title: "Scrolling Testimonials",
  description: "Two rows of quotes scrolling in opposite directions, pausing on hover.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  featured: true,
  categories: ["testimonials"],
  internalDependencies: ["marquee"],
  files: [{ path: "registry/default/blocks/testimonials-02/components/testimonials-02.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Quotes are in the `quotes` array; the first half goes in the top row.",
    requirements: ["kanakui `marquee` (the CLI installs it with its CSS), React 19 and Tailwind CSS v4."],
    customization: [
      "The quotes and names are placeholders. Replace them with real quotes from customers who agreed to be featured.",
      "Slow the rows down with a longer `duration` on each `Marquee`.",
    ],
    accessibility: [
      "Quotes are read once: the marquee hides its repeated copies from screen readers.",
      "Rows pause on hover so quotes can be read, and stop moving with reduced motion.",
    ],
    troubleshooting: [
      { problem: "The rows jump at the end of each loop.", solution: "Check that the `marquee` keyframes are in your CSS (the CLI adds them)." },
    ],
  },
})
