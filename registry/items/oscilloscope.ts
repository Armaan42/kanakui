import { defineItem } from "../define.ts"

export default defineItem({
  "name": "oscilloscope",
  "type": "registry:ui",
  "title": "Oscilloscope",
  "description": "A green-phosphor oscilloscope tracing Lissajous figures, with frequency and phase knobs.",
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
      "path": "registry/default/ui/oscilloscope.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "defaultX",
        "type": "number",
        "description": "Horizontal frequency, 1–7.",
        "default": "3"
      },
      {
        "name": "defaultY",
        "type": "number",
        "description": "Vertical frequency, 1–7.",
        "default": "2"
      },
      {
        "name": "defaultPhase",
        "type": "number",
        "description": "Phase difference in degrees.",
        "default": "90"
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Equal frequencies with a 90° phase draw a circle; try 3:2 and 5:4."
    ],
    "accessibility": [
      "The knobs are sliders (arrows, Home, End). The screen describes the figure, and drift stops with reduced motion."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
