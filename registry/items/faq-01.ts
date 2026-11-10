import { defineItem } from "../define.ts"

export default defineItem({
  name: "faq-01",
  type: "registry:block",
  title: "FAQ",
  description: "Frequently asked questions as native expandable rows, with an intro column.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["faq"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/blocks/faq-01/components/faq-01.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Questions are in the `faqs` array at the top of the file.",
    requirements: ["`lucide-react`, React 19 and Tailwind CSS v4. Works in Server Components and without JavaScript."],
    customization: [
      "The answers are placeholders. Replace them with your real policies, especially refunds and licensing.",
      "Open a question by default by adding the `open` attribute to its `details`.",
      "Add `name=\"faq\"` to every `details` to allow only one open at a time (supported in current browsers).",
    ],
    accessibility: [
      "Built on `details` and `summary`, so the browser handles keyboard support and announces expanded or collapsed.",
      "The icon is decorative; the rotation is turned off with reduced motion.",
    ],
    troubleshooting: [
      { problem: "A default triangle marker appears in Safari.", solution: "The block hides it with `::-webkit-details-marker`. Keep that class on `details`." },
    ],
  },
})
