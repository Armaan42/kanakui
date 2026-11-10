import { defineItem } from "../define.ts"

export default defineItem({
  name: "cta-01",
  type: "registry:block",
  title: "Boxed Call to Action",
  description: "A rounded panel with a headline, short reassurance and two actions over a faded grid.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["cta"],
  registryDependencies: ["button"],
  dependencies: ["lucide-react"],
  internalDependencies: ["grid-pattern"],
  files: [{ path: "registry/default/blocks/cta-01/components/cta-01.tsx", type: "registry:component" }],
  pageDocs: {
    props: [],
    extends: "No props. Edit the headline, text and buttons in the file.",
    requirements: ["shadcn `button` and kanakui `grid-pattern`. The CLI installs both.", "`lucide-react`, React 19 and Tailwind CSS v4."],
    customization: [
      "Wrap the buttons in links (or use your router’s `Link`) to point them at sign-up and sales pages.",
      "Move or remove the highlighted grid cells with the `highlight` prop.",
    ],
    accessibility: ["The headline is an `h2`. The grid is decorative."],
    troubleshooting: [
      { problem: "The grid is too strong in light mode.", solution: "Lower the opacity in `className=\"text-foreground/[0.08]\"`." },
    ],
  },
})
