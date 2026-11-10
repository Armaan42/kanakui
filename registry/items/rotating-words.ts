import { defineItem } from "../define.ts"

export default defineItem({
  name: "rotating-words",
  type: "registry:ui",
  title: "Rotating Words",
  description: "Cycles through words with a vertical slide, pausing on hover.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["text", "animations"],
  dependencies: ["motion"],
  files: [{ path: "registry/default/ui/rotating-words.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "words", type: "string[]", description: "Words to cycle through. Required." },
      { name: "interval", type: "number", default: "2500", description: "Milliseconds each word stays visible." },
      { name: "className", type: "string", description: "Classes for the wrapper, e.g. a color." },
    ],
    extends: "Only the props above.",
    requirements: ["The `motion` package. The CLI installs it.", "React 19 and Tailwind CSS v4."],
    customization: [
      "Pick words of similar length, so the sentence around them doesn’t shift.",
      "Use it inside a heading: `<h1>Made for <RotatingWords words={…} /></h1>`.",
    ],
    accessibility: [
      "Screen readers hear the full list once; the sliding word is `aria-hidden`.",
      "Rotation pauses while hovered, and is replaced by the first word when the user prefers reduced motion.",
    ],
    troubleshooting: [
      { problem: "The baseline jumps.", solution: "The wrapper is `inline-flex` aligned to the text bottom. If your font sits differently, adjust `align-bottom` on the wrapper." },
    ],
  },
})
