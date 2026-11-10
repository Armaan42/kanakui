import { defineItem } from "../define.ts"

export default defineItem({
  name: "spotlight-card",
  featured: true,
  type: "registry:ui",
  title: "Spotlight Card",
  description: "A card with a soft light that follows the pointer.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: [
    "cards",
    "effects",
    "interactive"
  ],
  internalDependencies: [
    "use-pointer-position",
    "compose-refs"
  ],
  files: [
    {
      path: "registry/default/ui/spotlight-card.tsx",
      type: "registry:ui"
    }
  ],
  pageDocs: {
    props: [
      {
        name: "spotlightColor",
        type: "string",
        default: "foreground at 10%",
        description: "Color of the light. Any CSS color, e.g. `rgb(59 130 246 / 0.25)`."
      },
      {
        name: "radius",
        type: "number",
        default: "320",
        description: "Radius of the light, in pixels."
      }
    ],
    extends: "All `<div>` props, including `className`, `style`, `children` and `ref`.",
    requirements: [
      "React 19. The card receives `ref` as a prop and uses a ref cleanup function.",
      "Tailwind CSS v4 and a `cn` helper at `@/lib/utils`, which `npx shadcn@latest init` creates."
    ],
    customization: [
      "Style the card with `className`. Classes are merged with `cn`, so `className=\"rounded-2xl p-8\"` replaces the default radius and padding.",
      "The light is drawn from CSS variables on the card: `--spotlight-color` and `--spotlight-radius` (set from the props), and `--pointer-x` / `--pointer-y` (written by `usePointerPosition`).",
      "`usePointerPosition` works on its own: attach the ref it returns to any element to get `--pointer-x`, `--pointer-y` and `--pointer-active` for your own effects."
    ],
    accessibility: [
      "The light is decorative: it is `aria-hidden` and hidden when the user prefers reduced motion.",
      "The card adds no role. Put headings, text and controls inside as you normally would."
    ],
    troubleshooting: [
      {
        problem: "The light doesn’t appear.",
        solution: "It only shows while a pointer is over the card, and is hidden when reduced motion is on. On light backgrounds, pass a stronger `spotlightColor`."
      },
      {
        problem: "TypeScript error on `ref`.",
        solution: "The component targets React 19, where `ref` is a regular prop. Upgrade React, or remove the `ref` handling."
      }
    ]
  }
})
