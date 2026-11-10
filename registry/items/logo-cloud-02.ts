import { defineItem } from "../define.ts"

export default defineItem({
  name: "logo-cloud-02",
  type: "registry:block",
  title: "Logo Grid",
  description: "A static grid of customer logos separated by hairline dividers.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["logo-clouds"],
  files: [{ path: "registry/default/blocks/logo-cloud-02/components/logo-cloud-02.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Logos are in the `logos` array at the top of the file.",
    requirements: ["React 19 and Tailwind CSS v4. No other dependencies. Works in Server Components."],
    customization: [
      "The names are placeholders. Show only logos of customers who agreed to be listed.",
      "Use monochrome SVG logos at the same visual size for an even grid.",
    ],
    accessibility: ["Logos are a list. Give each logo image `alt` text with the company name."],
    troubleshooting: [{ problem: "Divider lines are missing.", solution: "They come from `gap-px` on a `bg-border` grid; keep both classes." }],
  },
})
