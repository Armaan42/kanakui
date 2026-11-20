import { defineItem } from "../define.ts"

export default defineItem({
  "name": "zen-garden",
  "type": "registry:ui",
  "title": "Zen Garden",
  "description": "A Japanese sand garden: rake grooves with your pointer, place and lift stones, and rake fresh ripples.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive",
    "inputs"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/zen-garden.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "defaultStones",
        "type": "{ x: number; y: number; size: number }[]",
        "description": "Starting stones: position in percent, size in canvas pixels."
      },
      {
        "name": "maxStones",
        "type": "number",
        "description": "Most stones the tray holds.",
        "default": "7"
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "The sand is a canvas at 960 × 600; it scales to fit its container."
    ],
    "accessibility": [
      "The sand is focusable and the arrow keys rake it. Stones are buttons in Stones mode, with an Add a stone button, and the tool hint is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
