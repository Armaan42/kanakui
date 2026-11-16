import { defineItem } from "../define.ts"

export default defineItem({
  "name": "prize-wheel",
  "type": "registry:ui",
  "title": "Prize Wheel",
  "description": "A spin-to-win wheel that eases to a stop while its pointer ticks past each segment.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "interactive",
    "animations"
  ],
  "files": [
    {
      "path": "registry/default/ui/prize-wheel.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "segments",
        "type": "{ label: string; color: string }[]",
        "description": "Wheel segments, clockwise from the top."
      },
      {
        "name": "pick",
        "type": "number",
        "description": "Index to land on; random when unset. Set it from your server for real prizes."
      },
      {
        "name": "onResult",
        "type": "(segment, index) => void",
        "description": "Called when the wheel stops."
      },
      {
        "name": "duration",
        "type": "number",
        "default": "5200",
        "description": "Spin time in ms."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Keep labels short (about 10 characters) so they fit the segments."
    ],
    "accessibility": [
      "“Spin” is a button; the result is announced (“You won: 10% off!”).",
      "With reduced motion the result shows straight away."
    ],
    "troubleshooting": [
      {
        "problem": "People can win anything by inspecting the page.",
        "solution": "The wheel only animates; decide prizes on your server and pass the result in `pick`."
      }
    ]
  }
})
