import { defineItem } from "../define.ts"

export default defineItem({
  name: "stats-02",
  type: "registry:block",
  title: "Progress Ring Stats",
  description: "Three key percentages as progress rings with labels and context.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["stats"],
  internalDependencies: ["progress-ring"],
  files: [{ path: "registry/default/blocks/stats-02/components/stats-02.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Figures are in the `stats` array at the top of the file.",
    requirements: ["kanakui `progress-ring` (the CLI installs it), React 19 and Tailwind CSS v4. Works in Server Components."],
    customization: ["The figures are placeholders. Use real numbers and say where they come from in `detail`.", "Ring size and thickness are set per ring with `size` and `strokeWidth`."],
    accessibility: ["Each ring is a labelled progress bar with its value, so screen readers announce “Customer satisfaction, 98%”."],
    troubleshooting: [{ problem: "Rings look cramped on tablets.", solution: "Cards stack below `md`; reduce `size` if your labels are long." }],
  },
})
