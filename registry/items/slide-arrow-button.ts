import { defineItem } from "../define.ts"

export default defineItem({
  name: "slide-arrow-button",
  type: "registry:ui",
  title: "Slide Arrow Button",
  description: "A pill button whose arrow slides in as the label moves aside on hover.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["buttons", "animations"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/slide-arrow-button.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "icon", type: "ReactNode", default: "arrow", description: "Icon that slides in." },
      { name: "type", type: "\"button\" | \"submit\" | \"reset\"", default: "\"button\"", description: "Defaults to `button` so it never submits a form by accident." },
    ],
    extends: "All `<button>` props, including `onClick`, `disabled` and `ref`.",
    requirements: ["`lucide-react` for the default arrow, Tailwind CSS v4. Works in Server Components."],
    customization: [
      "Pass any icon, e.g. `icon={<Download />}` for a download action.",
      "For a filled look, add `className=\"bg-primary text-primary-foreground hover:bg-primary/90\"`.",
    ],
    accessibility: [
      "The icon is decorative; the label names the button.",
      "The same movement happens on keyboard focus, and is skipped with reduced motion.",
    ],
    troubleshooting: [
      { problem: "The label is clipped on hover.", solution: "The button has fixed horizontal padding; very long labels need more `px-*`." },
    ],
  },
})
