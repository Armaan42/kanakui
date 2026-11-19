import { defineItem } from "../define.ts"

export default defineItem({
  "name": "bubble-wrap",
  "type": "registry:ui",
  "title": "Bubble Wrap",
  "description": "A sheet of bubble wrap to pop one by one, or a whole row with a drag.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive",
    "animations"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/bubble-wrap.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "rows, columns",
        "type": "number",
        "description": "Sheet size.",
        "default": "5, 8"
      },
      {
        "name": "onPop",
        "type": "(popped: number, total: number) => void",
        "description": "Called on each pop."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "A stress-relief easter egg for empty states or loading screens."
    ],
    "accessibility": [
      "Every bubble is a toggle button; the count is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
