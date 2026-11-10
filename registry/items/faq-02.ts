import { defineItem } from "../define.ts"

export default defineItem({
  name: "faq-02",
  type: "registry:block",
  title: "Two-column FAQ",
  description: "Six questions in two smooth accordions, side by side on large screens.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["faq"],
  internalDependencies: ["accordion-smooth"],
  files: [{ path: "registry/default/blocks/faq-02/components/faq-02.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Edit the content directly in the file.",
    requirements: ["kanakui `accordion-smooth` (the CLI installs it)."],
    customization: ["The answers are placeholders. Replace them with your real policies."],
    accessibility: ["Each question is a button with `aria-expanded`; closed answers are `inert`."],
    troubleshooting: [{"problem":"Something looks different from the preview.","solution":"Blocks use your project’s theme and your own shadcn components, so they follow your styles."}],
  },
})
