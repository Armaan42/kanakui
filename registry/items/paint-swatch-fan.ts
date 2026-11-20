import { defineItem } from "../define.ts"

export default defineItem({
  "name": "paint-swatch-fan",
  "type": "registry:ui",
  "title": "Paint Swatch Fan",
  "description": "A paint fan deck as a colour picker: fan out the strips, pick a shade and copy its hex.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "inputs",
    "interactive"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/paint-swatch-fan.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "strips",
        "type": "{ name: string; hex: string }[][]",
        "description": "Strips of shades, light to dark."
      },
      {
        "name": "onColorChange",
        "type": "(hex: string) => void",
        "description": "Called when a shade is picked."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Load your brand palette as `strips` for an on-brand picker."
    ],
    "accessibility": [
      "Shades are toggle buttons named by colour; arrow keys move between shades and strips, with one in the tab order."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
