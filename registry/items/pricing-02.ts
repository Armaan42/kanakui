import { defineItem } from "../define.ts"

export default defineItem({
  name: "pricing-02",
  type: "registry:block",
  title: "Plan Comparison Table",
  description: "Two plans compared feature by feature in an accessible table.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["pricing"],
  registryDependencies: ["button"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/blocks/pricing-02/components/pricing-02.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Plans and features are arrays at the top of the file.",
    requirements: ["shadcn `button`. The CLI installs it.", "`lucide-react`, React 19 and Tailwind CSS v4."],
    customization: [
      "In `features`, use `true`/`false` for a check or dash, or a string such as `\"Unlimited\"`.",
      "Add a third plan by extending `plans` and adding a matching key to each feature row and cell.",
    ],
    accessibility: [
      "A real `table` with a caption, column headers and row headers, so screen readers announce “Pro, Custom domains, Included”.",
      "Checks and dashes have hidden text (“Included” / “Not included”).",
    ],
    troubleshooting: [{ problem: "The table is cut off on phones.", solution: "It scrolls sideways inside its rounded frame; that’s intended for tables." }],
  },
})
