import { defineItem } from "../define.ts"

export default defineItem({
  name: "tag-input",
  type: "registry:ui",
  title: "Tag Input",
  description: "Add tags with Enter or comma and remove them with Backspace or their buttons.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["inputs", "forms"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/tag-input.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "label", type: "string", description: "Visible label. Required." },
      { name: "value", type: "string[]", description: "Controlled tags." },
      { name: "defaultValue", type: "string[]", default: "[]", description: "Initial tags when uncontrolled." },
      { name: "onValueChange", type: "(tags: string[]) => void", description: "Called when tags change." },
      { name: "max", type: "number", description: "Maximum number of tags." },
      { name: "placeholder", type: "string", default: "\"Add a tag…\"", description: "Input placeholder." },
    ],
    extends: "Only the props above, plus `className`.",
    requirements: ["`lucide-react`, React 19 and Tailwind CSS v4."],
    customization: ["Duplicates and empty tags are ignored; adjust `add` in the file for other rules.", "Leaving the field also adds what was typed."],
    accessibility: ["A real label; each tag has a “Remove X” button; additions and removals are announced."],
    troubleshooting: [{ problem: "Commas inside tags.", solution: "A comma adds the tag. Remove that branch in `onChange` if tags may contain commas." }],
  },
})
