import { defineItem } from "../define.ts"

export default defineItem({
  name: "animated-card",
  featured: true,
  type: "registry:ui",
  title: "Animated Card",
  description: "A card that tilts in 3D toward the pointer with spring physics.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: [
    "cards",
    "animations",
    "interactive"
  ],
  dependencies: [
    "motion"
  ],
  files: [
    {
      path: "registry/default/ui/animated-card.tsx",
      type: "registry:ui"
    }
  ],
  pageDocs: {
    props: [
      {
        name: "maxTilt",
        type: "number",
        default: "8",
        description: "Maximum tilt on each axis, in degrees."
      },
      {
        name: "hoverScale",
        type: "number",
        default: "1.02",
        description: "Scale while hovered. Set to `1` to turn scaling off."
      }
    ],
    extends: "All `motion.div` props (`HTMLMotionProps<\"div\">`), including `className`, `style`, `initial`, `animate` and event handlers.",
    requirements: [
      "The `motion` package. The CLI installs it for you.",
      "React 19 and Tailwind CSS v4, with a `cn` helper at `@/lib/utils`."
    ],
    customization: [
      "Make the tilt subtler or stronger with `maxTilt`, e.g. `maxTilt={4}`.",
      "The spring is set by the `SPRING` constant at the top of the file (`stiffness`, `damping`, `mass`). The code lives in your project, so edit it directly.",
      "Your own `onPointerMove` and `onPointerLeave` handlers still run. The card calls them before updating the tilt."
    ],
    accessibility: [
      "Tilt and scale are turned off when the user prefers reduced motion.",
      "Tilt follows mouse input only, so it never interferes with touch scrolling."
    ],
    troubleshooting: [
      {
        problem: "The card doesn’t tilt on a phone or tablet.",
        solution: "This is intended. Tilt only responds to a mouse."
      },
      {
        problem: "Nothing moves at all.",
        solution: "Check the reduced-motion setting of your operating system. The card stays still while it is on."
      },
      {
        problem: "`Module not found: Can't resolve 'motion/react'`.",
        solution: "Run `npm install motion`. The CLI does this automatically; a manual install needs it."
      }
    ]
  }
})
