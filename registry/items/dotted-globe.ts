import { defineItem } from "../define.ts"

const threeDocs = {
  requirements: [
    "`three` and `@react-three/fiber` (React 19). The CLI installs both, plus `@types/three` as a dev dependency.",
    "A browser with WebGL. Without it, a short text fallback is shown.",
  ],
}

export default defineItem({
  name: "dotted-globe",
  type: "registry:ui",
  title: "Dotted Globe",
  description: "A WebGL sphere of evenly spaced dots that slowly turns; drag or use the arrow keys to spin it.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  featured: true,
  categories: ["3d", "backgrounds", "interactive"],
  dependencies: ["three", "@react-three/fiber"],
  devDependencies: ["@types/three"],
  internalDependencies: ["use-scene-state"],
  files: [{ path: "registry/default/ui/dotted-globe.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "dots", type: "number", default: "1600", description: "Number of dots on the sphere." },
      { name: "dotSize", type: "number", default: "2", description: "Dot size in pixels." },
      { name: "speed", type: "number", default: "0.15", description: "Auto-rotation speed, in radians per second." },
      { name: "label", type: "string", default: "\"Rotating globe made of dots\"", description: "Accessible description of the graphic." },
      { name: "className", type: "string", description: "Classes for the wrapper; set the color with a text class." },
    ],
    extends: "Only the props above.",
    requirements: threeDocs.requirements,
    customization: [
      "Dots use the CSS text color: `className=\"text-primary\"` tints the globe, and it updates when the theme changes.",
      "Fewer `dots` look sparser and render faster on low-end phones.",
    ],
    accessibility: [
      "Exposed as an image with a label. It can be focused and turned with the arrow keys.",
      "Rendering pauses when off screen. With reduced motion it doesn’t auto-rotate, but you can still turn it.",
    ],
    troubleshooting: [
      { problem: "The globe is invisible.", solution: "Its color comes from the text color. Make sure the wrapper isn’t `text-transparent` and the background contrasts." },
      { problem: "`Cannot find module 'three'` types.", solution: "Run `npm install -D @types/three`." },
    ],
  },
})
