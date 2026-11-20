import { defineItem } from "../define.ts"

export default defineItem({
  "name": "retro-calculator",
  "type": "registry:ui",
  "title": "Retro Calculator",
  "description": "An 80s solar calculator with a seven-segment LCD that really calculates.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "inputs",
    "interactive"
  ],
  "files": [
    {
      "path": "registry/default/ui/retro-calculator.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "It works like a pocket calculator: chained operations, eight digits and E for errors."
    ],
    "accessibility": [
      "Every key is a button with a spoken name, the display is announced, and you can type on your keyboard while a key has focus."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
