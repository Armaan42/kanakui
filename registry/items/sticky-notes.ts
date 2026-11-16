import { defineItem } from "../define.ts"

export default defineItem({
  "name": "sticky-notes",
  "type": "registry:ui",
  "title": "Sticky Notes",
  "description": "A board of handwritten sticky notes you can drag around; the one you grab comes to the front.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "interactive",
    "data-display"
  ],
  "files": [
    {
      "path": "registry/default/ui/sticky-notes.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "notes",
        "type": "StickyNote[]",
        "description": "Each has `id`, `text`, a starting `x` and `y` (percent of the board), and optionally `color` (yellow, pink, blue, green) and `rotate` (degrees)."
      }
    ],
    "extends": "All `<div>` props; `className` styles the board (4:3).",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Positions live in component state. To save a layout, lift the state out and store it.",
      "Notes use system handwriting fonts; load a web font and change `HANDWRITING` for the same look everywhere."
    ],
    "accessibility": [
      "Each note is focusable (`role=\"note\"`) and the arrow keys move it; hold Shift for bigger steps.",
      "Focusing or grabbing a note brings it to the front."
    ],
    "troubleshooting": [
      {
        "problem": "Notes jump when dragged.",
        "solution": "The board must keep its `relative` position and aspect ratio; notes are placed in percent of its size."
      }
    ]
  }
})
