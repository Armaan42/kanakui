import { defineItem } from "../define.ts"

export default defineItem({
  name: "pricing-03",
  type: "registry:block",
  title: "Single Plan",
  description: "One plan with everything included, a single price and a moving border.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["pricing"],
  registryDependencies: ["button"],
  dependencies: ["lucide-react"],
  internalDependencies: ["border-beam"],
  files: [{ path: "registry/default/blocks/pricing-03/components/pricing-03.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. The included list, price and terms are in the file.",
    requirements: ["shadcn `button` and kanakui `border-beam`. The CLI installs both.", "`lucide-react`, React 19 and Tailwind CSS v4."],
    customization: [
      "The price, list and refund terms are placeholders. Make them match your real offer exactly.",
      "Remove `<BorderBeam />` for a calmer card.",
    ],
    accessibility: ["The heading is an `h2`; included items are a list.", "The moving border is hidden with reduced motion."],
    troubleshooting: [{ problem: "The two halves stack.", solution: "They sit side by side from the `md` breakpoint." }],
  },
})
