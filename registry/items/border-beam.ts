import { defineItem } from "../define.ts"

export default defineItem({
  name: "border-beam",
  type: "registry:ui",
  title: "Border Beam",
  description: "A light that travels around the border of a card or container.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["effects", "cards", "animations"],
  files: [{ path: "registry/default/ui/border-beam.tsx", type: "registry:ui" }],
  cssVars: {
    theme: {
      "animate-border-beam": "border-beam var(--border-beam-duration) linear infinite",
    },
  },
  css: {
    "@property --border-beam-angle": {
      syntax: "'<angle>'",
      "initial-value": "0deg",
      inherits: "false",
    },
    "@keyframes border-beam": {
      to: { "--border-beam-angle": "360deg" },
    },
  },
  pageDocs: {
    props: [
      { name: "duration", type: "string", default: "\"6s\"", description: "Time for one trip around the border, as a CSS duration." },
      { name: "color", type: "string", default: "\"var(--foreground)\"", description: "Beam color. Any CSS color." },
      { name: "borderWidth", type: "number", default: "1.5", description: "Beam thickness, in pixels." },
      { name: "length", type: "number", default: "12", description: "Beam length as a percentage of a full turn." },
    ],
    extends: "All `<div>` props, including `className` and `style`.",
    requirements: [
      "Tailwind CSS v4. The CLI adds the `border-beam` keyframes, the `--border-beam-angle` property and `--animate-border-beam` to your CSS.",
      "A browser with `@property` support (all current browsers). Older browsers show no beam.",
    ],
    customization: [
      "Place `<BorderBeam />` as the last child of a `relative` element. It follows the parent’s `border-radius`.",
      "Use a brand color with `color=\"oklch(0.7 0.15 250)\"`, or two beams with different `duration` values for a layered effect.",
    ],
    accessibility: [
      "Purely decorative: `aria-hidden` and ignores the pointer.",
      "Hidden when the user prefers reduced motion. Don’t rely on it as the only sign that something is loading.",
    ],
    troubleshooting: [
      {
        problem: "The beam fills the whole card instead of the border.",
        solution: "The parent needs `position: relative`, and your browser must support CSS masks with `exclude`, which all current browsers do.",
      },
      {
        problem: "The beam doesn’t move.",
        solution: "Check that `@property --border-beam-angle` and the `border-beam` keyframes are in your CSS.",
      },
    ],
  },
})
