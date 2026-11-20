import { defineItem } from "../define.ts"

export default defineItem({
  "name": "sundial",
  "type": "registry:ui",
  "title": "Sundial",
  "description": "A garden sundial whose shadow sweeps across real hour lines for your latitude as you slide through the day.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "data-display",
    "interactive"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/sundial.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "latitude",
        "type": "number",
        "description": "The dial is drawn for this latitude.",
        "default": "51.5"
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Set `latitude` to your city’s to get its true hour-line angles."
    ],
    "accessibility": [
      "Time is a native slider; the dial describes the time it shows."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
