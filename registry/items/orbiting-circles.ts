import { defineItem } from "../define.ts"

export default defineItem({
  name: "orbiting-circles",
  type: "registry:ui",
  title: "Orbiting Circles",
  description: "Items placed evenly on a circle that orbit the center, staying upright.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  featured: true,
  categories: ["effects", "animations"],
  files: [{ path: "registry/default/ui/orbiting-circles.tsx", type: "registry:ui" }],
  cssVars: { theme: { "animate-orbit": "orbit 24s linear infinite" } },
  css: {
    "@keyframes orbit": {
      "0%": { transform: "rotate(calc(var(--orbit-angle) * 1deg)) translateY(calc(var(--orbit-radius) * 1px)) rotate(calc(var(--orbit-angle) * -1deg))" },
      "100%": { transform: "rotate(calc(var(--orbit-angle) * 1deg + 360deg)) translateY(calc(var(--orbit-radius) * 1px)) rotate(calc(var(--orbit-angle) * -1deg - 360deg))" },
    },
  },
  pageDocs: {
    props: [
      { name: "children", type: "ReactNode", description: "Items to orbit, e.g. small icons. Required." },
      { name: "radius", type: "number", default: "120", description: "Orbit radius in pixels." },
      { name: "duration", type: "number", default: "24", description: "Seconds per orbit." },
      { name: "reverse", type: "boolean", default: "false", description: "Orbit counter-clockwise." },
      { name: "path", type: "boolean", default: "true", description: "Draw the dashed orbit line." },
    ],
    extends: "Only the props above, plus `className`.",
    requirements: ["Tailwind CSS v4. The CLI adds the `orbit` keyframes. Works in Server Components."],
    customization: ["Stack two or three with different `radius` and `reverse` for rings.", "Put a logo in the center of the positioned parent."],
    accessibility: ["Give icon-only items a visually hidden label.", "With reduced motion items rest on the orbit without moving."],
    troubleshooting: [{ problem: "Items pile up in the middle.", solution: "Check that the `orbit` keyframes are in your CSS; the parent must be `relative` with a size." }],
  },
})
