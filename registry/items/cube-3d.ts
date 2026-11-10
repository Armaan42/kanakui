import { defineItem } from "../define.ts"

export default defineItem({
  name: "cube-3d",
  type: "registry:ui",
  title: "3D Cube",
  description: "A CSS-only cube with six content faces that tumbles slowly and pauses on hover.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["3d", "animations"],
  files: [{ path: "registry/default/ui/cube-3d.tsx", type: "registry:ui" }],
  cssVars: { theme: { "animate-cube-3d": "cube-3d 14s linear infinite" } },
  css: {
    "@keyframes cube-3d": {
      from: { transform: "rotateX(-20deg) rotateY(0deg)" },
      to: { transform: "rotateX(340deg) rotateY(360deg)" },
    },
  },
  pageDocs: {
    props: [
      { name: "faces", type: "ReactNode[]", description: "Up to six faces: front, right, back, left, top, bottom. Required." },
      { name: "size", type: "number", default: "160", description: "Edge length in pixels." },
      { name: "duration", type: "number", default: "14", description: "Seconds per full turn." },
    ],
    extends: "All `<div>` props except `children`.",
    requirements: ["Tailwind CSS v4. The CLI adds the `cube-3d` keyframes and `--animate-cube-3d`. No JavaScript; works in Server Components."],
    customization: ["Put icons, logos or images on the faces.", "Faces use the card colors; restyle them in the file."],
    accessibility: [
      "Face content is in the page in order, so screen readers read all six faces.",
      "With reduced motion it rests at an angle that shows three faces.",
    ],
    troubleshooting: [{ problem: "The cube looks flat.", solution: "A parent with `overflow: hidden` and `transform` can flatten 3D. Keep the cube’s own wrapper free of transforms." }],
  },
})
