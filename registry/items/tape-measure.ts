import { defineItem } from "../define.ts"

export default defineItem({
  "name": "tape-measure",
  "type": "registry:ui",
  "title": "Tape Measure",
  "description": "A retractable tape measure: pull the tab out to read a length, and it snaps back unless locked.",
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
      "path": "registry/default/ui/tape-measure.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "max",
        "type": "number",
        "description": "Longest the tape goes, in units.",
        "default": "30"
      },
      {
        "name": "unit",
        "type": "\"cm\" | \"in\"",
        "description": "Unit on the tape.",
        "default": "\"cm\""
      },
      {
        "name": "scale",
        "type": "number",
        "description": "Pixels per unit.",
        "default": "14"
      },
      {
        "name": "onMeasure",
        "type": "(length: number) => void",
        "description": "Called as the length changes."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Lower `scale` to fit a longer tape in the same width."
    ],
    "accessibility": [
      "The tab is a slider (arrow keys, Page Up and Down, Home); the length is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
