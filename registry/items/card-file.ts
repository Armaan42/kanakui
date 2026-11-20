import { defineItem } from "../define.ts"

export default defineItem({
  "name": "card-file",
  "type": "registry:ui",
  "title": "Card File",
  "description": "A rotary card file that tumbles through contacts by scroll, drag, keys or letter tabs.",
  "version": "0.1.0",
  "releasedAt": "2026-11-19",
  "categories": [
    "interactive",
    "data-display"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/card-file.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "cards",
        "type": "{ name: string; role?: string; phone?: string; email?: string; note?: string }[]",
        "description": "Cards, in the order you want them."
      },
      {
        "name": "defaultIndex",
        "type": "number",
        "description": "Card shown first.",
        "default": "0"
      },
      {
        "name": "onCardChange",
        "type": "(card, index) => void",
        "description": "Called when the front card changes."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Sort `cards` alphabetically so the letter tabs read in order."
    ],
    "accessibility": [
      "The drum is focusable and turns with the up and down arrow keys; the current card is announced.",
      "Only the front card’s links can be focused."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
