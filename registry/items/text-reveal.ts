import { defineItem } from "../define.ts"

export default defineItem({
  name: "text-reveal",
  type: "registry:ui",
  title: "Text Reveal",
  description: "Fades, unblurs and lifts text into place word by word as it scrolls into view.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["text", "animations"],
  dependencies: ["motion"],
  files: [{ path: "registry/default/ui/text-reveal.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "text", type: "string", description: "Text to reveal. Required." },
      { name: "as", type: "\"h1\" | \"h2\" | \"h3\" | \"p\" | \"span\"", default: "\"p\"", description: "Element to render, so headings keep their meaning." },
      { name: "delay", type: "number", default: "0", description: "Seconds before the first word starts." },
      { name: "stagger", type: "number", default: "0.06", description: "Seconds between words." },
      { name: "repeat", type: "boolean", default: "false", description: "Animate every time the text enters the viewport, not just the first time." },
      { name: "className", type: "string", description: "Classes for the element." },
    ],
    extends: "Only the props above.",
    requirements: ["The `motion` package. The CLI installs it.", "React 19 and Tailwind CSS v4."],
    customization: [
      "Use `as=\"h1\"` for page titles so the heading structure stays correct.",
      "Slow the reveal down with `stagger={0.12}`, or chain several with increasing `delay`.",
    ],
    accessibility: [
      "The text stays real, selectable text and is read normally by screen readers.",
      "Renders plain text without animation when the user prefers reduced motion.",
    ],
    troubleshooting: [
      {
        problem: "Text is invisible.",
        solution: "Words start hidden and appear when half the text is in view. In a container that never scrolls into view, pass `repeat` or remove the component.",
      },
    ],
  },
})
