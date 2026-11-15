import { defineItem } from "../define.ts"

export default defineItem({
  name: "keyboard",
  type: "registry:ui",
  title: "Keyboard",
  description: "A compact Mac-style keyboard whose keys press down when clicked, light up as you type on your own keyboard, and can sound like a mechanical keyboard.",
  version: "0.2.0",
  releasedAt: "2026-11-15",
  categories: ["interactive", "data-display"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/keyboard.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      {
        name: "onKeyPress",
        type: "(key: KeyboardKeyPress) => void",
        description: "Called for each press with the key's `code` (e.g. `\"KeyA\"`), `name` (e.g. `\"A\"`) and `source`: `\"click\"` or `\"keyboard\"`.",
      },
      { name: "listen", type: "boolean", default: "true", description: "Light up keys as they are pressed on the user's real keyboard." },
      { name: "sound", type: "boolean | \"thock\" | \"clicky\"", default: "false", description: "Mechanical keyboard sound on each press and release: `\"thock\"` (deep, linear switches; `true` plays this) or `\"clicky\"` (bright click switches). Synthesized with the Web Audio API, so there are no audio files." },
    ],
    extends: "All `<div>` props, on the outer element.",
    requirements: [
      "`lucide-react` for the function-row icons. The CLI installs it.",
      "Tailwind CSS v4 (it uses container queries to scale with its container).",
    ],
    customization: [
      "It fills its container's width up to about 52rem; wrap it in e.g. `max-w-xl` to make it smaller.",
      "Keys use neutral grays in light and dark mode. Change the key and case colors in the `className` strings in `keyboard.tsx`.",
      "The layout is the `ROWS` data at the top of the file. Each row adds up to 14.5 key units; keep that total if you change key widths.",
      "Set `listen={false}` to show a keyboard that only responds to clicks, e.g. in a list of several.",
      "Tune the sounds in `SHAPES` in `keyboard.tsx`: each is a few filtered noise bursts (the click and the plastic) and pitch-dropping tones (the bottom-out). Lower `frequency` values sound deeper.",
    ],
    accessibility: [
      "The keyboard is a labelled group of real buttons, each named after its key (“Command”, “Left arrow”).",
      "Tab enters the keyboard once; the arrow keys then move between keys by position and Enter or Space presses the focused key.",
      "Caps Lock reports its state with `aria-pressed` and shows a light.",
      "Sound is off by default and is never the only feedback: every press also moves the key. The press animation is instant when the user prefers reduced motion.",
    ],
    troubleshooting: [
      {
        problem: "Keys don’t light up when I type.",
        solution: "Only keys on this layout light up, and not while focus is inside the keyboard itself (there the arrow keys move between keys). Check that `listen` isn’t `false`.",
      },
      {
        problem: "No sound in Safari or on iPhone.",
        solution: "Browsers allow audio only after the user interacts with the page; the first click enables it. Silent mode on iPhone also mutes Web Audio.",
      },
    ],
  },
})
