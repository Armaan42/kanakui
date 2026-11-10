import { defineItem } from "../define.ts"

export default defineItem({
  name: "features-03",
  type: "registry:block",
  title: "Alternating Features",
  description: "Features as alternating rows of text and visual, with a checklist per row.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["features"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/blocks/features-03/components/features-03.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Rows are in the `rows` array at the top of the file.",
    requirements: ["`lucide-react`, React 19 and Tailwind CSS v4. Works in Server Components."],
    customization: [
      "Add or remove rows in the `rows` array; sides alternate automatically on large screens.",
      "Replace the grey panel with an `<img>` or video for each row.",
    ],
    accessibility: ["Each row has its own `h2`. Visual placeholders are `aria-hidden`; give real images `alt` text."],
    troubleshooting: [{ problem: "Rows don’t alternate.", solution: "Alternation uses `lg:order-2` on odd rows and starts at the `lg` breakpoint." }],
  },
})
