import { defineItem } from "../define.ts"

export default defineItem({
  "name": "dynamic-island",
  "type": "registry:ui",
  "title": "Dynamic Island",
  "description": "A black pill that morphs into a larger panel on hover or click, like a phone's dynamic island.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "interactive",
    "animations"
  ],
  "files": [
    {
      "path": "registry/default/ui/dynamic-island.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "compact",
        "type": "ReactNode",
        "description": "What the pill shows. Not interactive: the pill itself is the toggle."
      },
      {
        "name": "expanded",
        "type": "ReactNode",
        "description": "What the island shows when open. May include buttons."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Names the toggle for screen readers, e.g. “Now playing: Night Drive”."
      },
      {
        "name": "open, defaultOpen",
        "type": "boolean",
        "description": "Controlled or initial open state."
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "description": "Called when a click, Escape or a click outside opens or closes it."
      }
    ],
    "extends": "All `<div>` props except `children`.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Give the compact view a fixed height (the demo uses `h-9`) and the expanded view a width; the island measures both and morphs between them.",
      "To switch to different content (music, timer, call), change its `key` so it re-measures, as the demo does."
    ],
    "accessibility": [
      "The pill is a button with `aria-expanded`; opening it from the keyboard moves focus to the first control inside, and Escape closes it and returns focus.",
      "The expanded view is `inert` while closed.",
      "With reduced motion it resizes without animation."
    ],
    "troubleshooting": [
      {
        "problem": "The island snaps to the wrong size.",
        "solution": "Content that loads later (images without a size) changes the measurement; give images a fixed `size-*`."
      }
    ]
  }
})
