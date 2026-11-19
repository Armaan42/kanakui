import { defineItem } from "../define.ts"

export default defineItem({
  "name": "abacus",
  "type": "registry:ui",
  "title": "Abacus",
  "description": "A soroban abacus: slide beads to the bar and read the number.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "inputs",
    "data-display"
  ],
  "files": [
    {
      "path": "registry/default/ui/abacus.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "rods",
        "type": "number",
        "description": "Number of digits.",
        "default": "6"
      },
      {
        "name": "defaultValue",
        "type": "number",
        "description": "Starting number.",
        "default": "2026"
      },
      {
        "name": "onValueChange",
        "type": "(value: number) => void",
        "description": "Called on change."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "A charming number input for counters, quantities or games."
    ],
    "accessibility": [
      "Each rod is a slider from 0 to 9 (arrow keys); the total is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
