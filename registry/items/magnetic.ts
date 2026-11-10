import { defineItem } from "../define.ts"

export default defineItem({
  name: "magnetic",
  type: "registry:ui",
  title: "Magnetic",
  description: "Wraps any element so it is pulled toward the mouse pointer and springs back.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["interactive", "effects"],
  dependencies: ["motion"],
  files: [{ path: "registry/default/ui/magnetic.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "children", type: "ReactNode", description: "The element to make magnetic, e.g. a button. Required." },
      { name: "strength", type: "number", default: "0.35", description: "How far it follows the pointer, from 0 to 1." },
      { name: "range", type: "number", default: "24", description: "Extra space around the element, in pixels, where the pull starts." },
      { name: "className", type: "string", description: "Classes for the wrapper." },
    ],
    extends: "Only the props above.",
    requirements: ["The `motion` package. The CLI installs it.", "React 19 and Tailwind CSS v4."],
    customization: [
      "Use a small `strength` (0.15–0.25) for buttons and a larger one for icons or cursors.",
      "Increase `range` so the pull starts further away from the element.",
    ],
    accessibility: [
      "The wrapped element keeps its own role and keyboard behavior; the wrapper adds none.",
      "Follows the mouse only, and doesn’t move when the user prefers reduced motion.",
    ],
    troubleshooting: [
      {
        problem: "Nearby elements shift slightly.",
        solution: "The wrapper uses padding plus an equal negative margin to widen the hit area. Reduce `range` if it overlaps neighbours.",
      },
    ],
  },
})
