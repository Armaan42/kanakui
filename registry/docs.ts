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

  // ------------------------------------------------------------- blocks
  "hero-01": {
    props: [],
    extends: "No props. The text, links and layout are in the file. It's your code, so edit it directly.",
    requirements: [
      "shadcn `button` and kanakui `shimmer-button`. The CLI installs both.",
      "React 19 and Tailwind CSS v4, with a `cn` helper at `@/lib/utils`.",
    ],
    customization: [
      "Replace the headline, paragraph and button labels, and point the announcement link (`href=\"#\"`) at your changelog.",
      "Swap the product window placeholder (marked with a comment) for an `<img>`, `next/image` or a video.",
      "Use `Button` for both actions if you don’t want the shimmer effect.",
    ],
    accessibility: [
      "Uses one `h1`. Keep it the only `h1` on the page.",
      "The product window placeholder is `aria-hidden`. Give a real screenshot meaningful `alt` text.",
      "The shimmer effect stops when the user prefers reduced motion.",
    ],
    troubleshooting: [
      {
        problem: "The outline button looks different from the preview.",
        solution: "The block uses your project’s own shadcn `button`, so it follows your style and theme. Previews on this site use the Nova style.",
      },
    ],
  },

  "pricing-01": {
    props: [],
    extends: "No props. Plans are in `pricing-01-plans.ts`; the layout and billing switch are in `pricing-01.tsx`.",
    requirements: [
      "shadcn `button`. The CLI installs it.",
      "React 19 and Tailwind CSS v4, with a `cn` helper at `@/lib/utils`.",
    ],
    customization: [
      "Edit plans in `pricing-01-plans.ts`: `monthly` and `yearly` are prices per month, and `highlighted` marks the recommended plan.",
      "Prices are formatted as USD by `formatPrice` at the bottom of `pricing-01.tsx`. Change the currency there, e.g. `currency: \"INR\"` with locale `en-IN`.",
      "The “Save 20%” label is text. Update it if you change the yearly discount.",
      "The plan buttons have no action yet. Wrap them in links to your sign-up or checkout pages.",
    ],
    accessibility: [
      "The billing switch is a group of two buttons with `aria-pressed`, so screen readers announce which period is selected.",
      "Plans are a list, and each plan’s features are a nested list.",
    ],
    troubleshooting: [
      {
        problem: "`Module not found: Can't resolve '@/components/pricing-01-plans'`.",
        solution: "Both files must be in the same folder, `@/components/`. The CLI puts them there; after a manual install, check you created both.",
      },
    ],
  },

  "footer-01": {
    props: [],
    extends: "No props. Brand, link columns and legal links are arrays at the top of the file.",
    requirements: ["React 19 and Tailwind CSS v4. No other dependencies."],
    customization: [
      "Edit the `columns` and `legal` arrays to change links. Replace each `href=\"#\"` with real URLs, or use `next/link` for internal pages.",
      "Replace the square logo placeholder and the name “Acme” with your logo.",
      "Update the copyright line, which is plain text so it never changes unexpectedly.",
    ],
    accessibility: [
      "Each link column is a `nav` labelled by its heading, so screen reader users can jump between them.",
      "Uses a `footer` element, which is announced as the content information landmark.",
    ],
    troubleshooting: [
      {
        problem: "The footer headings don’t fit my page outline.",
        solution: "Column titles are `h2`. Change them to `h3` or plain text if your page needs a different heading structure.",
      },
    ],
  },
}
