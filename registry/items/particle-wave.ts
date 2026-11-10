import { defineItem } from "../define.ts"

export default defineItem({
  name: "particle-wave",
  type: "registry:ui",
  title: "Particle Wave",
  description: "A WebGL field of points rolling like a wave, for hero and section backgrounds.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["3d", "backgrounds", "animations"],
  dependencies: ["three", "@react-three/fiber"],
  devDependencies: ["@types/three"],
  internalDependencies: ["use-scene-state"],
  files: [{ path: "registry/default/ui/particle-wave.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "columns", type: "number", default: "70", description: "Points along the width." },
      { name: "rows", type: "number", default: "40", description: "Points along the depth." },
      { name: "amplitude", type: "number", default: "0.6", description: "Wave height." },
      { name: "label", type: "string", default: "\"Animated wave of particles\"", description: "Accessible description." },
      { name: "className", type: "string", description: "Classes for the wrapper, e.g. a height or text color." },
    ],
    extends: "Only the props above.",
    requirements: [
      "`three` and `@react-three/fiber`. The CLI installs both, plus `@types/three` as a dev dependency.",
      "A browser with WebGL.",
    ],
    customization: [
      "Use it as a background: place it `absolute inset-0` inside a `relative` section and put content above it.",
      "A muted color (`text-muted-foreground`) keeps text on top readable.",
      "Lower `columns × rows` for slower devices; 70 × 40 is 2,800 points.",
    ],
    accessibility: ["Exposed as a labelled image; decorative motion.", "Pauses off screen and with reduced motion."],
    troubleshooting: [{ problem: "Nothing appears.", solution: "The wrapper needs a height (it is `h-72` by default)." }],
  },
})
