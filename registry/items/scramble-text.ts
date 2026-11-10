import { defineItem } from "../define.ts"

export default defineItem({
  name: "scramble-text",
  type: "registry:ui",
  title: "Scramble Text",
  description: "Resolves text from random characters, left to right, like a decoder.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["text", "animations"],
  files: [{ path: "registry/default/ui/scramble-text.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "text", type: "string", description: "The final text. Required." },
      { name: "as", type: "\"span\" | \"p\" | \"h1\" | \"h2\" | \"h3\"", default: "\"span\"", description: "Element to render." },
      { name: "trigger", type: "\"view\" | \"hover\" | \"mount\"", default: "\"view\"", description: "Scramble when it enters the viewport, on hover and focus, or once on mount." },
      { name: "duration", type: "number", default: "900", description: "Milliseconds until every character has settled." },
      { name: "characters", type: "string", description: "Characters used while scrambling." },
      { name: "className", type: "string", description: "Classes for the element. Uses a monospace font by default so width stays stable." },
    ],
    extends: "Only the props above.",
    requirements: ["React 19 and Tailwind CSS v4, with a `cn` helper at `@/lib/utils`. No other dependencies."],
    customization: [
      "Keep the monospace font, or the text will change width as characters scramble.",
      "Use `characters=\"01\"` for a binary look or `\"アイウエオカキクケコ\"` for katakana.",
    ],
    accessibility: [
      "Screen readers read the final text from a hidden copy; the scrambling layer is `aria-hidden`.",
      "Nothing scrambles when the user prefers reduced motion.",
    ],
    troubleshooting: [
      { problem: "It never scrambles.", solution: "With `trigger=\"view\"` it runs once when 60% of it is visible. Check that it actually scrolls into view, or use `trigger=\"mount\"`." },
    ],
  },
})
