import { defineItem } from "../define.ts"

export default defineItem({
  name: "spinner",
  type: "registry:ui",
  title: "Spinner",
  description: "A circular loading indicator in three sizes that inherits the text color.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["loaders"],
  files: [{ path: "registry/default/ui/spinner.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"", description: "16, 24 or 32 pixels." },
      { name: "label", type: "string", default: "\"Loading\"", description: "Text announced to screen readers." },
    ],
    extends: "All `<span>` props except `children`.",
    requirements: ["Tailwind CSS v4, with a `cn` helper at `@/lib/utils`. Works in Server Components."],
    customization: [
      "Color it with a text class, e.g. `className=\"text-muted-foreground\"`.",
      "Inside a button, use `size=\"sm\"` and a specific `label` such as `\"Saving\"`.",
    ],
    accessibility: [
      "Has `role=\"status\"`, so the label is announced when the spinner appears.",
      "With reduced motion it spins slowly instead of stopping, so it still reads as in progress.",
    ],
    troubleshooting: [
      {
        problem: "Screen readers announce “Loading” twice.",
        solution: "Don’t also put visible “Loading” text inside the same status region; use the `label` prop instead.",
      },
    ],
  },
})
