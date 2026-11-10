import { defineItem } from "../define.ts"

export default defineItem({
  name: "wireframe-orb",
  type: "registry:ui",
  title: "Wireframe Orb",
  description: "A WebGL wireframe sphere with glowing vertices that turns and leans toward the pointer.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["3d", "interactive", "animations"],
  dependencies: ["three", "@react-three/fiber"],
  devDependencies: ["@types/three"],
  internalDependencies: ["use-scene-state"],
  files: [{ path: "registry/default/ui/wireframe-orb.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "detail", type: "number", default: "2", description: "Geometry detail: 0 is a plain icosahedron, 3 is nearly round." },
      { name: "follow", type: "number", default: "0.5", description: "How strongly it leans toward the pointer." },
      { name: "label", type: "string", default: "\"Rotating wireframe sphere\"", description: "Accessible description." },
      { name: "className", type: "string", description: "Classes for the wrapper; set the color with a text class." },
    ],
    extends: "Only the props above.",
    requirements: [
      "`three` and `@react-three/fiber`. The CLI installs both, plus `@types/three` as a dev dependency.",
      "A browser with WebGL.",
    ],
    customization: ["`detail={1}` gives a crisp geometric look; `3` looks like a globe.", "Set `follow={0}` to turn off the pointer lean."],
    accessibility: ["Exposed as a labelled image.", "Pauses off screen and with reduced motion."],
    troubleshooting: [{ problem: "It looks jagged.", solution: "The canvas renders at up to 2× device pixel ratio; make sure the wrapper isn’t scaled with CSS transforms." }],
  },
})
