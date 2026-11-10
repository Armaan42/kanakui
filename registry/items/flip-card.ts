import { defineItem } from "../define.ts"

export default defineItem({
  name: "flip-card",
  type: "registry:ui",
  title: "Flip Card",
  description: "A two-sided card that turns over in 3D, by button or on hover.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["cards", "interactive", "animations"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/flip-card.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "front", type: "ReactNode", description: "Front face content. Required." },
      { name: "back", type: "ReactNode", description: "Back face content. Required." },
      { name: "flipLabel", type: "string", default: "\"Flip card\"", description: "Accessible name for the flip button." },
      { name: "flipOnHover", type: "boolean", default: "false", description: "Also flip while a mouse is over the card." },
      { name: "className", type: "string", description: "Classes for the outer element, e.g. a different height." },
    ],
    extends: "Only the props above.",
    requirements: ["`lucide-react` for the flip icon, React 19 and Tailwind CSS v4."],
    customization: [
      "The card is `h-64` by default. Pass `className=\"h-80\"` for taller content; both faces fill it.",
      "Use a descriptive `flipLabel` such as `\"Show plan details\"`.",
    ],
    accessibility: [
      "Flipping is done with a real button (`aria-pressed`), so it works with keyboard, touch and screen readers; hover is an extra.",
      "The hidden face is `inert` and `aria-hidden`, so its content can’t be focused or read by mistake.",
      "With reduced motion the faces swap instantly.",
    ],
    troubleshooting: [
      { problem: "Both faces show at once.", solution: "The effect needs `backface-visibility: hidden` and `transform-style: preserve-3d`; don’t remove those classes." },
    ],
  },
})
