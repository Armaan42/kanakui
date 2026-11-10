import { defineItem } from "../define.ts"

export default defineItem({
  name: "floating-label-input",
  type: "registry:ui",
  title: "Floating Label Input",
  description: "A text field whose label sits inside and floats above on focus or when filled.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["inputs", "forms"],
  files: [{ path: "registry/default/ui/floating-label-input.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "label", type: "string", description: "Visible label. Required." },
      { name: "className", type: "string", description: "Classes for the wrapper." },
    ],
    extends: "All `<input>` props except `placeholder`, which the floating effect uses internally.",
    requirements: ["Tailwind CSS v4, with a `cn` helper at `@/lib/utils`. CSS only; works in Server Components."],
    customization: [
      "Mark errors with `aria-invalid`; the border turns red. Link an error message with `aria-describedby`.",
      "Pass `id` to connect it to your own error text; otherwise an id is generated.",
    ],
    accessibility: [
      "Uses a real `<label>` linked to the input, so it is announced and clicking it focuses the field.",
      "The label never disappears, unlike a placeholder-only field.",
    ],
    troubleshooting: [
      { problem: "The label overlaps the text.", solution: "Don’t pass a `placeholder`. The component relies on an empty placeholder to know when the field is empty." },
    ],
  },
})
