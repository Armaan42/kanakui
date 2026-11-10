import { defineItem } from "../define.ts"

export default defineItem({
  name: "features-01",
  type: "registry:block",
  title: "Feature Grid",
  description: "Six features with icons in a bordered grid that goes from one to three columns.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["features"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/blocks/features-01/components/features-01.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Features are in the `features` array at the top of the file.",
    requirements: ["`lucide-react` for icons, React 19 and Tailwind CSS v4. Works in Server Components."],
    customization: [
      "Edit the `features` array; any Lucide icon works for `icon`.",
      "Use 4 or 8 items with `lg:grid-cols-4` for a denser grid.",
    ],
    accessibility: ["Features are a list with `h3` titles under the section’s `h2`.", "Icons are decorative (`aria-hidden`)."],
    troubleshooting: [
      { problem: "Thin lines between tiles are missing.", solution: "The lines come from `gap-px` on a `bg-border` grid. Keep both classes on the `ul`." },
    ],
  },
})
