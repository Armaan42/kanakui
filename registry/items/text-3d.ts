import { defineItem } from "../define.ts"

export default defineItem({
  name: "text-3d",
  type: "registry:ui",
  title: "3D Text",
  description: "Text extruded into 3D with stacked shadows that tilts on hover.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["3d", "text"],
  files: [{ path: "registry/default/ui/text-3d.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "text", type: "string", description: "The text. Required." },
      { name: "as", type: "\"h1\" | \"h2\" | \"h3\" | \"p\" | \"span\"", default: "\"h2\"", description: "Element to render." },
      { name: "depth", type: "number", default: "8", description: "Extrusion depth in layers (about one pixel each)." },
      { name: "tilt", type: "boolean", default: "true", description: "Tilt toward the viewer on hover." },
      { name: "className", type: "string", description: "Classes, e.g. a font size and color." },
    ],
    extends: "Only the props above.",
    requirements: ["Tailwind CSS v4 and a browser with `color-mix()` support (all current browsers). Works in Server Components."],
    customization: ["The face uses the text color and the sides darker mixes of it; set the color with a text class.", "Large, bold, short words work best."],
    accessibility: ["The text stays real text. Shadows are decorative.", "No tilt with reduced motion."],
    troubleshooting: [{ problem: "The extrusion is hard to see.", solution: "Increase `depth`, or use a lighter background." }],
  },
})
