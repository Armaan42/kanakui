import { defineItem } from "../define.ts"

export default defineItem({
  name: "particle-galaxy",
  type: "registry:ui",
  title: "Particle Galaxy",
  description: "A WebGL spiral galaxy of glowing particles that turns and leans toward the pointer.",
  version: "0.1.0",
  releasedAt: "2026-11-12",
  categories: ["3d","backgrounds"],
  dependencies: ["three","@react-three/fiber"],
  devDependencies: ["@types/three"],
  internalDependencies: ["use-scene-state"],
  files: [{ path: "registry/default/ui/particle-galaxy.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [{"name":"count","type":"number","default":"40000","description":"Number of particles."},{"name":"arms","type":"number","default":"4","description":"Number of spiral arms."},{"name":"colors","type":"[string, string, string]","default":"peach, violet, sky","description":"Core, middle and rim colors (hex, rgb() or hsl())."},{"name":"speed","type":"number","default":"0.06","description":"Turning speed in radians per second."},{"name":"followPointer","type":"boolean","default":"true","description":"Lean the camera toward the pointer."},{"name":"label","type":"string","default":"\"Spiral galaxy of glowing particles\"","description":"Accessible description."}],
    extends: "Only the props above, plus `className` (set the height, e.g. `h-96`).",
    requirements: ["`three` and `@react-three/fiber` (React 19). The CLI installs both, plus `@types/three` as a dev dependency.","A browser with WebGL. Without it, a short text fallback is shown."],
    customization: ["Made for dark backgrounds: its glow adds light.","Lower `count` (around 15000) for low-end phones."],
    accessibility: ["Exposed as a labelled image.","Pauses off screen and holds still with reduced motion."],
    troubleshooting: [{"problem":"A color looks black.","solution":"three.js can’t parse `oklch()`; use hex, `rgb()` or `hsl()`."}],
  },
})
