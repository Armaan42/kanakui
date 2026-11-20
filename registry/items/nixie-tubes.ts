import { defineItem } from "../define.ts"

export default defineItem({
  "name": "nixie-tubes",
  "type": "registry:ui",
  "title": "Nixie Tubes",
  "description": "Glowing nixie tubes showing a number or a live clock, each tube holding all ten digits.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "data-display",
    "animations"
  ],
  "files": [
    {
      "path": "registry/default/ui/nixie-tubes.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "value",
        "type": "string",
        "description": "Digits and colons to show. Leave it out for a live clock."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Read out with the value, e.g. “Visitors”."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Pass `value` for counters and scores, e.g. `value=\"002417\"`."
    ],
    "accessibility": [
      "The tubes are hidden from screen readers; the value is read as text. The clock uses the timer role, so it doesn’t announce every second."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
