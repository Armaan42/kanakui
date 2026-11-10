import { defineItem } from "../define.ts"

export default defineItem({
  name: "number-stepper",
  type: "registry:ui",
  title: "Number Stepper",
  description: "A number field with minus and plus buttons, clamped to a range.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["inputs", "forms"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/number-stepper.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "label", type: "string", description: "Visible label. Required." },
      { name: "value", type: "number", description: "Controlled value." },
      { name: "defaultValue", type: "number", default: "0", description: "Initial value." },
      { name: "onValueChange", type: "(value: number) => void", description: "Called with the clamped value." },
      { name: "min", type: "number", default: "0", description: "Lowest value." },
      { name: "max", type: "number", default: "99", description: "Highest value." },
      { name: "step", type: "number", default: "1", description: "Amount per click." },
    ],
    extends: "Only the props above, plus `className`.",
    requirements: ["`lucide-react`, React 19 and Tailwind CSS v4."],
    customization: ["Widen the field (`w-14`) for larger numbers."],
    accessibility: ["A native number input with a label; the buttons are named “Increase Seats” / “Decrease Seats” and disable at the limits."],
    troubleshooting: [{ problem: "Typing a number outside the range.", solution: "Values are clamped to `min`/`max` as you type." }],
  },
})
