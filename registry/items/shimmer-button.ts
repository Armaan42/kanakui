import { defineItem } from "../define.ts"

export default defineItem({
  name: "shimmer-button",
  featured: true,
  type: "registry:ui",
  title: "Shimmer Button",
  description: "A primary button with a light sweep across its surface.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: [
    "buttons",
    "animations"
  ],
  files: [
    {
      path: "registry/default/ui/shimmer-button.tsx",
      type: "registry:ui"
    }
  ],
  cssVars: {
    theme: {
      "animate-shimmer": "shimmer 2.5s linear infinite"
    }
  },
  css: {
    "@keyframes shimmer": {
      from: {
        "background-position": "200% 0"
      },
      to: {
        "background-position": "-200% 0"
      }
    }
  },
  pageDocs: {
    props: [
      {
        name: "type",
        type: "\"button\" | \"submit\" | \"reset\"",
        default: "\"button\"",
        description: "Defaults to `button` so it never submits a form by accident. Pass `type=\"submit\"` inside forms."
      }
    ],
    extends: "All `<button>` props, including `className`, `disabled`, `onClick` and `ref`.",
    requirements: [
      "Tailwind CSS v4. The CLI adds the `shimmer` keyframes and the `--animate-shimmer` theme variable to your CSS.",
      "A `cn` helper at `@/lib/utils`."
    ],
    customization: [
      "Change the speed by editing `--animate-shimmer` in your CSS, e.g. `shimmer 4s linear infinite`.",
      "Colors come from your theme’s `--primary` and `--primary-foreground`. Change those, or override with `className`.",
      "Icons inside the button are sized to 16px unless they have their own `size-*` class."
    ],
    accessibility: [
      "The light sweep stops when the user prefers reduced motion.",
      "It renders a native `<button>`, so keyboard and screen reader support work as usual. Give icon-only buttons an `aria-label`."
    ],
    troubleshooting: [
      {
        problem: "The button is flat, with no light sweep.",
        solution: "Your CSS is missing the `shimmer` keyframes or `--animate-shimmer`. The CLI adds them; after a manual install, copy the CSS from the Manual tab."
      }
    ]
  }
})
