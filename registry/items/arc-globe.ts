import { defineItem } from "../define.ts"

export default defineItem({
  name: "arc-globe",
  type: "registry:ui",
  title: "Arc Globe",
  description: "A dotted 3D Earth with glowing routes between cities; pulses travel each arc and ripple where they land.",
  version: "0.1.0",
  releasedAt: "2026-11-11",
  featured: true,
  categories: ["3d", "backgrounds", "interactive"],
  dependencies: ["three", "@react-three/fiber"],
  devDependencies: ["@types/three"],
  internalDependencies: ["use-scene-state"],
  files: [
    { path: "registry/default/ui/arc-globe.tsx", type: "registry:ui" },
    { path: "registry/default/lib/land-mask.ts", type: "registry:lib" },
  ],
  pageDocs: {
    props: [
      {
        name: "routes",
        type: "{ from: [lat, lon]; to: [lat, lon] }[]",
        default: "12 links between major cities",
        description: "Arcs to draw, as latitude/longitude pairs in degrees.",
      },
      { name: "startLongitude", type: "number", default: "20", description: "Longitude turned toward the viewer at the start." },
      { name: "speed", type: "number", default: "0.07", description: "Auto-rotation speed, in radians per second." },
      { name: "pulseSpeed", type: "number", default: "1", description: "How fast pulses travel along the arcs." },
      { name: "dots", type: "number", default: "16000", description: "Points sampled over the sphere; about a third fall on land and are drawn." },
      { name: "dotSize", type: "number", default: "2.4", description: "Dot size in pixels." },
      { name: "arcColors", type: "[string, string]", default: "[\"#a78bfa\", \"#22d3ee\"]", description: "Start and end color of each arc; the end color is also used for landing rings." },
      { name: "atmosphereColor", type: "string", default: "\"#6d5dfc\"", description: "Color of the glow around the rim." },
      { name: "label", type: "string", default: "\"Globe with routes between cities\"", description: "Accessible description of the graphic." },
      { name: "className", type: "string", description: "Classes for the wrapper; set the dot color with a text class." },
    ],
    extends: "Only the props above.",
    requirements: [
      "`three` and `@react-three/fiber` (React 19). The CLI installs both, plus `@types/three` as a dev dependency.",
      "The CLI also adds `lib/land-mask.ts`, an 11 KB map of the continents (Natural Earth 1:110m, public domain).",
      "A browser with WebGL. Without it, a short text fallback is shown.",
    ],
    customization: [
      "Pass your own `routes`, for example your offices or data centers: `[{ from: [51.5, -0.13], to: [40.71, -74] }]`.",
      "Dots use the CSS text color, so `className=\"text-primary\"` tints the continents and follows theme changes.",
      "Colors in `arcColors` and `atmosphereColor` go to three.js, which reads hex, `rgb()` and `hsl()` but not `oklch()`.",
      "It looks best on dark backgrounds, but works on light ones too: the far side is hidden without painting a color.",
    ],
    accessibility: [
      "Exposed as an image with a label. It can be focused and turned with the arrow keys.",
      "On touch screens, vertical swipes still scroll the page; horizontal swipes turn the globe.",
      "Rendering pauses when off screen. With reduced motion it doesn’t rotate or pulse on its own, but you can still turn it.",
    ],
    troubleshooting: [
      { problem: "The continents are invisible.", solution: "Their color comes from the text color. Make sure the wrapper isn’t `text-transparent` and contrasts with the background." },
      { problem: "An arc color is black.", solution: "three.js couldn’t parse it. Use a hex, `rgb()` or `hsl()` color." },
      { problem: "`Cannot find module 'three'` types.", solution: "Run `npm install -D @types/three`." },
    ],
  },
})
