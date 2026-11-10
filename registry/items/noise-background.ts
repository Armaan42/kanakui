import { defineItem } from "../define.ts"

export default defineItem({
  name: "noise-background",
  type: "registry:ui",
  title: "Noise Background",
  description: "A film-grain texture drawn with an SVG filter, with no image to download.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["backgrounds"],
  files: [{ path: "registry/default/ui/noise-background.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "intensity", type: "number", default: "0.08", description: "Grain opacity, 0–1." },
      { name: "frequency", type: "number", default: "0.8", description: "Grain size; higher is finer." },
    ],
    extends: "All `<div>` props, including `className` and `style`.",
    requirements: ["Tailwind CSS v4. Works in Server Components."],
    customization: ["Layer it over gradients or flat colors to add depth.", "It blends with `mix-blend-overlay`; remove that class for a stronger look."],
    accessibility: ["Decorative and static (`aria-hidden`)."],
    troubleshooting: [{ problem: "The grain covers the whole page.", solution: "Its parent needs `position: relative`." }],
  },
})
