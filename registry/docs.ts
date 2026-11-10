/**
 * Documentation for each component page. Text may use `backticks` for inline
 * code. Keep props in sync with the component source; `scripts/registry.mts`
 * fails the build if a component has no entry here.
 */
export interface PropDoc {
  name: string
  type: string
  default?: string
  description: string
}

export interface ComponentDocs {
  /** Props the component adds. */
  props: PropDoc[]
  /** Props passed through to the underlying element, e.g. "All `<div>` props". */
  extends: string
  requirements: string[]
  customization: string[]
  accessibility: string[]
  troubleshooting: { problem: string; solution: string }[]
}

export const componentDocs: Record<string, ComponentDocs> = {
  "spotlight-card": {
    props: [
      {
        name: "spotlightColor",
        type: "string",
        default: "foreground at 10%",
        description: "Color of the light. Any CSS color, e.g. `rgb(59 130 246 / 0.25)`.",
      },
      {
        name: "radius",
        type: "number",
        default: "320",
        description: "Radius of the light, in pixels.",
      },
    ],
    extends: "All `<div>` props, including `className`, `style`, `children` and `ref`.",
    requirements: [
      "React 19. The card receives `ref` as a prop and uses a ref cleanup function.",
      "Tailwind CSS v4 and a `cn` helper at `@/lib/utils`, which `npx shadcn@latest init` creates.",
    ],
    customization: [
      "Style the card with `className`. Classes are merged with `cn`, so `className=\"rounded-2xl p-8\"` replaces the default radius and padding.",
      "The light is drawn from CSS variables on the card: `--spotlight-color` and `--spotlight-radius` (set from the props), and `--pointer-x` / `--pointer-y` (written by `usePointerPosition`).",
      "`usePointerPosition` works on its own: attach the ref it returns to any element to get `--pointer-x`, `--pointer-y` and `--pointer-active` for your own effects.",
    ],
    accessibility: [
      "The light is decorative: it is `aria-hidden` and hidden when the user prefers reduced motion.",
      "The card adds no role. Put headings, text and controls inside as you normally would.",
    ],
    troubleshooting: [
      {
        problem: "The light doesn’t appear.",
        solution:
          "It only shows while a pointer is over the card, and is hidden when reduced motion is on. On light backgrounds, pass a stronger `spotlightColor`.",
      },
      {
        problem: "TypeScript error on `ref`.",
        solution: "The component targets React 19, where `ref` is a regular prop. Upgrade React, or remove the `ref` handling.",
      },
    ],
  },

  "animated-card": {
    props: [
      {
        name: "maxTilt",
        type: "number",
        default: "8",
        description: "Maximum tilt on each axis, in degrees.",
      },
      {
        name: "hoverScale",
        type: "number",
        default: "1.02",
        description: "Scale while hovered. Set to `1` to turn scaling off.",
      },
    ],
    extends:
      "All `motion.div` props (`HTMLMotionProps<\"div\">`), including `className`, `style`, `initial`, `animate` and event handlers.",
    requirements: [
      "The `motion` package. The CLI installs it for you.",
      "React 19 and Tailwind CSS v4, with a `cn` helper at `@/lib/utils`.",
    ],
    customization: [
      "Make the tilt subtler or stronger with `maxTilt`, e.g. `maxTilt={4}`.",
      "The spring is set by the `SPRING` constant at the top of the file (`stiffness`, `damping`, `mass`). The code lives in your project, so edit it directly.",
      "Your own `onPointerMove` and `onPointerLeave` handlers still run. The card calls them before updating the tilt.",
    ],
    accessibility: [
      "Tilt and scale are turned off when the user prefers reduced motion.",
      "Tilt follows mouse input only, so it never interferes with touch scrolling.",
    ],
    troubleshooting: [
      {
        problem: "The card doesn’t tilt on a phone or tablet.",
        solution: "This is intended. Tilt only responds to a mouse.",
      },
      {
        problem: "Nothing moves at all.",
        solution: "Check the reduced-motion setting of your operating system. The card stays still while it is on.",
      },
      {
        problem: "`Module not found: Can't resolve 'motion/react'`.",
        solution: "Run `npm install motion`. The CLI does this automatically; a manual install needs it.",
      },
    ],
  },

  "shimmer-button": {
    props: [
      {
        name: "type",
        type: "\"button\" | \"submit\" | \"reset\"",
        default: "\"button\"",
        description: "Defaults to `button` so it never submits a form by accident. Pass `type=\"submit\"` inside forms.",
      },
    ],
    extends: "All `<button>` props, including `className`, `disabled`, `onClick` and `ref`.",
    requirements: [
      "Tailwind CSS v4. The CLI adds the `shimmer` keyframes and the `--animate-shimmer` theme variable to your CSS.",
      "A `cn` helper at `@/lib/utils`.",
    ],
    customization: [
      "Change the speed by editing `--animate-shimmer` in your CSS, e.g. `shimmer 4s linear infinite`.",
      "Colors come from your theme’s `--primary` and `--primary-foreground`. Change those, or override with `className`.",
      "Icons inside the button are sized to 16px unless they have their own `size-*` class.",
    ],
    accessibility: [
      "The light sweep stops when the user prefers reduced motion.",
      "It renders a native `<button>`, so keyboard and screen reader support work as usual. Give icon-only buttons an `aria-label`.",
    ],
    troubleshooting: [
      {
        problem: "The button is flat, with no light sweep.",
        solution:
          "Your CSS is missing the `shimmer` keyframes or `--animate-shimmer`. The CLI adds them; after a manual install, copy the CSS from the Manual tab.",
      },
    ],
  },
}
