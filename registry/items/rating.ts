import { defineItem } from "../define.ts"

export default defineItem({
  name: "rating",
  type: "registry:ui",
  title: "Rating",
  description: "A star rating built on native radio buttons, with a read-only display mode.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["inputs", "interactive"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/rating.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "label", type: "string", description: "Accessible name, e.g. “Rate this template”. Required." },
      { name: "value", type: "number", description: "Controlled value." },
      { name: "defaultValue", type: "number", default: "0", description: "Initial value." },
      { name: "onValueChange", type: "(value: number) => void", description: "Called when the rating changes." },
      { name: "max", type: "number", default: "5", description: "Number of stars." },
      { name: "readOnly", type: "boolean", default: "false", description: "Display only." },
    ],
    extends: "Only the props above, plus `className`.",
    requirements: ["`lucide-react`, React 19 and Tailwind CSS v4."],
    customization: ["Change the star color by editing `fill-amber-400` in the file."],
    accessibility: ["Native radios in a fieldset: arrow keys change the rating and each star is named “3 stars”.", "Read-only mode is one labelled image, e.g. “3 out of 5 stars”."],
    troubleshooting: [{ problem: "Two ratings change together.", solution: "Each instance generates its own radio group name; don’t pass the same `name` to both." }],
  },
})
