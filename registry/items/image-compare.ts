import { defineItem } from "../define.ts"

export default defineItem({
  name: "image-compare",
  type: "registry:ui",
  title: "Image Compare",
  description: "A before/after slider with a draggable divider that also works with the keyboard.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  featured: true,
  categories: ["interactive"],
  files: [{ path: "registry/default/ui/image-compare.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "before", type: "ReactNode", description: "Left layer, e.g. an `<img>`. Required." },
      { name: "after", type: "ReactNode", description: "Right layer. Required." },
      { name: "beforeLabel", type: "string", default: "\"Before\"", description: "Label shown on the left and used in the slider’s name." },
      { name: "afterLabel", type: "string", default: "\"After\"", description: "Label shown on the right." },
      { name: "defaultPosition", type: "number", default: "50", description: "Starting divider position, 0–100." },
      { name: "className", type: "string", description: "Classes for the frame, e.g. a different aspect ratio." },
    ],
    extends: "Only the props above.",
    requirements: ["React 19 and Tailwind CSS v4, with a `cn` helper at `@/lib/utils`. No other dependencies."],
    customization: [
      "Use two images of the same size with `className=\"size-full object-cover\"` and meaningful `alt` text.",
      "The frame is 16:9 by default; pass `className=\"aspect-square\"` for square images.",
    ],
    accessibility: [
      "The divider is a native range input with a descriptive label: arrows, Home and End move it, and screen readers announce the position.",
      "A focus ring appears on the handle when the slider has keyboard focus.",
    ],
    troubleshooting: [
      { problem: "Images look stretched.", solution: "Add `object-cover` and `size-full` to both images so they fill the frame the same way." },
    ],
  },
})
