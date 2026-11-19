import { defineItem } from "../define.ts"

export default defineItem({
  "name": "analog-clock",
  "type": "registry:ui",
  "title": "Analog Clock",
  "description": "A station clock whose needle waits at twelve; drag the minute hand to set it by hand.",
  "version": "0.1.0",
  "releasedAt": "2026-11-19",
  "categories": [
    "data-display",
    "interactive"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/analog-clock.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "timeZone",
        "type": "string",
        "description": "IANA time zone. Defaults to the visitor’s own."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Shown under the dial, such as a city."
      }
    ],
    "extends": "All `<div>` props; `className` sets the size.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Show several clocks side by side with different `timeZone` values."
    ],
    "accessibility": [
      "The minute hand is a slider: arrow keys move one minute, Page Up and Page Down move five.",
      "The time appears after the page loads, so server and browser markup always match."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
