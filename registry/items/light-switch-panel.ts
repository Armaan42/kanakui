import { defineItem } from "../define.ts"

export default defineItem({
  "name": "light-switch-panel",
  "type": "registry:ui",
  "title": "Light Switch Panel",
  "description": "A wall plate of rocker switches that light a row of pendant bulbs.",
  "version": "0.1.0",
  "releasedAt": "2026-11-19",
  "categories": [
    "inputs",
    "interactive"
  ],
  "files": [
    {
      "path": "registry/default/ui/light-switch-panel.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "switches",
        "type": "{ id: string; label: string; defaultOn?: boolean }[]",
        "description": "The switches, left to right."
      },
      {
        "name": "value",
        "type": "string[]",
        "description": "Controlled ids that are on."
      },
      {
        "name": "onValueChange",
        "type": "(on: string[]) => void",
        "description": "Called when a switch changes."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Three or four switches suit the default width."
    ],
    "accessibility": [
      "Each rocker is a named switch and the number of lights on is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
