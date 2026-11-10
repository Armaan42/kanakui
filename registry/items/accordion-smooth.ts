import { defineItem } from "../define.ts"

export default defineItem({
  name: "accordion-smooth",
  type: "registry:ui",
  title: "Smooth Accordion",
  description: "An accordion whose panels open with a smooth height animation, no measuring needed.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["interactive", "animations"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/accordion-smooth.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "items", type: "{ id: string; title: ReactNode; content: ReactNode }[]", description: "Sections. Required." },
      { name: "multiple", type: "boolean", default: "false", description: "Allow several sections open at once." },
      { name: "defaultOpen", type: "string[]", default: "[]", description: "Section ids open at first." },
      { name: "className", type: "string", description: "Classes for the wrapper." },
    ],
    extends: "Only the props above.",
    requirements: ["`lucide-react`, React 19 and Tailwind CSS v4."],
    customization: ["Heights animate with a CSS grid-rows transition, so content of any height works.", "Headers are `h3`; change the level to fit your page outline."],
    accessibility: [
      "Headers are buttons with `aria-expanded` and `aria-controls`; panels are labelled regions.",
      "Closed panels are `inert`, so their links can’t be focused. Opens instantly with reduced motion.",
    ],
    troubleshooting: [{ problem: "Animation is choppy in older browsers.", solution: "Animating `grid-template-rows` needs a current browser; older ones open instantly instead." }],
  },
})
