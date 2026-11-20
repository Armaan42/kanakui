import { defineItem } from "../define.ts"

export default defineItem({
  "name": "balance-scale",
  "type": "registry:ui",
  "title": "Balance Scale",
  "description": "A balance scale with a mystery parcel: add brass weights until the beam levels to find what it weighs.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/balance-scale.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "mystery",
        "type": "number",
        "description": "Grams in the first parcel.",
        "default": "13"
      },
      {
        "name": "weights",
        "type": "number[]",
        "description": "Brass weights available.",
        "default": "[1, 2, 5, 10, 20]"
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Use it to teach comparison, or to weigh two options against each other."
    ],
    "accessibility": [
      "Weights are buttons, each one on the pan can be taken off, and the balance is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
