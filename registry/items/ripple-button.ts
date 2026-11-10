import { defineItem } from "../define.ts"

export default defineItem({
  name: "ripple-button",
  type: "registry:ui",
  title: "Ripple Button",
  description: "A button that sends a ripple out from where it was pressed.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["buttons", "animations"],
  files: [{ path: "registry/default/ui/ripple-button.tsx", type: "registry:ui" }],
  cssVars: {
    theme: { "animate-ripple": "ripple 600ms ease-out forwards" },
  },
  css: {
    "@keyframes ripple": {
      from: { transform: "scale(0)", opacity: "1" },
      to: { transform: "scale(1)", opacity: "0" },
    },
  },
  pageDocs: {
    props: [
      { name: "rippleColor", type: "string", default: "text color at 30%", description: "Ripple color. Any CSS color." },
      { name: "type", type: "\"button\" | \"submit\" | \"reset\"", default: "\"button\"", description: "Defaults to `button` so it never submits a form by accident." },
    ],
    extends: "All `<button>` props, including `onClick`, `disabled` and `ref`. Your `onPointerDown` and `onKeyDown` still run.",
    requirements: [
      "Tailwind CSS v4. The CLI adds the `ripple` keyframes and `--animate-ripple` to your CSS.",
      "React 19, with a `cn` helper at `@/lib/utils`.",
    ],
    customization: [
      "Restyle with `className`, e.g. `bg-secondary text-secondary-foreground` for a quieter button; the ripple follows the text color.",
      "Change the ripple speed in `--animate-ripple`.",
    ],
    accessibility: [
      "A native `<button>`. Enter and Space ripple from the center.",
      "No ripple when the user prefers reduced motion.",
    ],
    troubleshooting: [
      {
        problem: "The ripple stays on screen.",
        solution: "Ripples remove themselves when their animation ends. Check that the `ripple` keyframes are in your CSS.",
      },
    ],
  },
})
