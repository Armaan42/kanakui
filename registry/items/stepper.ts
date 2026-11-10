import { defineItem } from "../define.ts"

export default defineItem({
  name: "stepper",
  type: "registry:ui",
  title: "Stepper",
  description: "Progress through a multi-step flow, horizontal or vertical.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["navigation", "data-display"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/stepper.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "steps", type: "{ title: string; description?: string }[]", description: "Steps in order. Required." },
      { name: "current", type: "number", description: "Index of the current step. Earlier steps are complete. Required." },
      { name: "orientation", type: "\"horizontal\" | \"vertical\"", default: "\"horizontal\"", description: "Layout direction." },
    ],
    extends: "All `<ol>` props except `children`.",
    requirements: ["`lucide-react` and Tailwind CSS v4. Works in Server Components."],
    customization: ["Use `vertical` on narrow screens or for long step descriptions."],
    accessibility: ["An ordered list; the current step has `aria-current=\"step\"` and finished steps say “(completed)”."],
    troubleshooting: [{ problem: "Connector lines overlap text.", solution: "Keep step titles short in horizontal mode, or switch to vertical." }],
  },
})
