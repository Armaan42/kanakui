import { defineItem } from "../define.ts"

export default defineItem({
  "name": "hourglass",
  "type": "registry:ui",
  "title": "Hourglass",
  "description": "An hourglass timer you turn over; turn it mid-way and the sand runs back.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "data-display",
    "interactive"
  ],
  "files": [
    {
      "path": "registry/default/ui/hourglass.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "duration",
        "type": "number",
        "description": "Seconds for the sand to run.",
        "default": "60"
      },
      {
        "name": "onDone",
        "type": "() => void",
        "description": "Called when the sand runs out."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Good for focus timers, cooldowns or quiz rounds."
    ],
    "accessibility": [
      "The glass is a button; the time left is shown as a timer and the state is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
