import { defineItem } from "../define.ts"

export default defineItem({
  name: "segmented-control",
  type: "registry:ui",
  title: "Segmented Control",
  description: "A single-choice switcher with a highlight that slides to the selected option.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["navigation", "inputs", "animations"],
  dependencies: ["motion"],
  files: [{ path: "registry/default/ui/segmented-control.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "options", type: "{ value: string; label: ReactNode; disabled?: boolean }[]", description: "The choices. Required." },
      { name: "label", type: "string", description: "Accessible name for the group, e.g. `\"View\"`. Required." },
      { name: "value", type: "string", description: "Selected value when controlled." },
      { name: "defaultValue", type: "string", default: "first option", description: "Initial value when uncontrolled." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called when the selection changes." },
      { name: "className", type: "string", description: "Classes for the group container." },
    ],
    extends: "Only the props above.",
    requirements: ["The `motion` package. The CLI installs it.", "React 19 and Tailwind CSS v4."],
    customization: [
      "Use it controlled (`value` + `onValueChange`) to switch views, filters or billing periods.",
      "Put icons in `label` for icon-only segments, and add `aria-label` text inside so they stay accessible.",
    ],
    accessibility: [
      "Uses radio group semantics: Tab focuses the selected option; arrow keys, Home and End change the selection.",
      "Disabled options are skipped by the keyboard.",
      "The highlight jumps instead of sliding when the user prefers reduced motion.",
    ],
    troubleshooting: [
      {
        problem: "Two controls on a page animate into each other.",
        solution: "Each control has its own layout group, so this shouldn’t happen. If you copied the indicator elsewhere, give it a unique `layoutId`.",
      },
    ],
  },
})
