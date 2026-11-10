import { defineItem } from "../define.ts"

export default defineItem({
  name: "typewriter",
  type: "registry:ui",
  title: "Typewriter",
  description: "Types, pauses and deletes a list of words with a blinking caret.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["text", "animations"],
  files: [{ path: "registry/default/ui/typewriter.tsx", type: "registry:ui" }],
  cssVars: {
    theme: { "animate-typewriter-caret": "typewriter-caret 1s steps(1) infinite" },
  },
  css: {
    "@keyframes typewriter-caret": {
      "0%, 100%": { opacity: "1" },
      "50%": { opacity: "0" },
    },
  },
  pageDocs: {
    props: [
      { name: "words", type: "string[]", description: "Words or phrases to type in order. Required." },
      { name: "typeSpeed", type: "number", default: "70", description: "Milliseconds per typed character." },
      { name: "deleteSpeed", type: "number", default: "40", description: "Milliseconds per deleted character." },
      { name: "pause", type: "number", default: "1600", description: "Milliseconds to wait after a word is complete." },
      { name: "loop", type: "boolean", default: "true", description: "Start again after the last word. When `false`, the last word stays." },
      { name: "cursor", type: "boolean", default: "true", description: "Show the blinking caret." },
    ],
    extends: "All `<span>` props except `children`.",
    requirements: [
      "Tailwind CSS v4. The CLI adds the `typewriter-caret` keyframes and `--animate-typewriter-caret` to your CSS.",
      "React 19, with a `cn` helper at `@/lib/utils`.",
    ],
    customization: [
      "Style the typed text with `className`, e.g. a muted or accent color, separate from the surrounding sentence.",
      "The caret uses the text color and is `2px` wide; edit its classes in the file to change it.",
    ],
    accessibility: [
      "Screen readers hear all the words once, from a visually hidden list, instead of every keystroke.",
      "With reduced motion, the first word is shown without typing.",
    ],
    troubleshooting: [
      {
        problem: "Layout shifts while typing.",
        solution: "Give the container a minimum width or put the typewriter at the end of a line so changing width doesn’t move other text.",
      },
    ],
  },
})
