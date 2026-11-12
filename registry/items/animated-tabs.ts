import { defineItem } from "../define.ts"

export default defineItem({
  name: "animated-tabs",
  type: "registry:ui",
  title: "Animated Tabs",
  description: "Tabs with a sliding underline and fading panels, following the WAI-ARIA tabs pattern.",
  version: "0.1.1",
  releasedAt: "2026-11-10",
  categories: ["navigation", "animations"],
  dependencies: ["motion"],
  files: [{ path: "registry/default/ui/animated-tabs.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "tabs", type: "{ value: string; label: ReactNode; content: ReactNode }[]", description: "Tabs and their panels. Required." },
      { name: "label", type: "string", description: "Accessible name for the tab list. Required." },
      { name: "defaultValue", type: "string", default: "first tab", description: "Initially selected tab." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called when the selection changes." },
      { name: "className", type: "string", description: "Classes for the wrapper." },
    ],
    extends: "Only the props above.",
    requirements: ["The `motion` package. The CLI installs it.", "React 19 and Tailwind CSS v4."],
    customization: ["Put icons in `label` alongside text.", "For a pill style, replace the underline classes with `inset-0 rounded-md bg-muted`."],
    accessibility: [
      "Implements the WAI-ARIA tabs pattern: arrow keys, Home and End switch tabs; each panel is labelled by its tab.",
      "No sliding or fading with reduced motion.",
    ],
    troubleshooting: [{ problem: "Two tab sets animate into each other.", solution: "Each instance has its own layout group; if you copy the underline elsewhere, give it a unique `layoutId`." }],
  },
})
