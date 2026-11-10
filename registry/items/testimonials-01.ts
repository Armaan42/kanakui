import { defineItem } from "../define.ts"

export default defineItem({
  name: "testimonials-01",
  type: "registry:block",
  title: "Testimonial Grid",
  description: "Three customer quotes as cards with initials and attribution.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["testimonials"],
  files: [{ path: "registry/default/blocks/testimonials-01/components/testimonials-01.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Quotes are in the `testimonials` array at the top of the file.",
    requirements: ["React 19 and Tailwind CSS v4. No other dependencies. Works in Server Components."],
    customization: [
      "The quotes, names and companies are placeholders. Replace them with real quotes from customers who agreed to be featured.",
      "Swap the initials for photos with an `<img>` inside `figcaption`, and give it `alt` text.",
    ],
    accessibility: ["Each quote is a `figure` with a `blockquote` and a `figcaption`, the standard pattern for attributed quotes."],
    troubleshooting: [
      { problem: "Cards have different heights.", solution: "They stretch to the tallest card per row; keep quotes similar in length for a tidy grid." },
    ],
  },
})
