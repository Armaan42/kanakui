import { defineItem } from "../define.ts"

export default defineItem({
  "name": "plinko-board",
  "type": "registry:ui",
  "title": "Plinko Board",
  "description": "A Plinko board: balls bounce off the pegs into slots, and a big drop draws a bell curve.",
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
      "path": "registry/default/ui/plinko-board.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "rows",
        "type": "number",
        "description": "Rows of pegs; there’s one more slot than rows.",
        "default": "9"
      },
      {
        "name": "slots",
        "type": "string[]",
        "description": "Labels for the slots instead of the tally."
      },
      {
        "name": "onLand",
        "type": "(slot: number) => void",
        "description": "Called as each ball lands."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Label `slots` with prizes or multipliers for a giveaway."
    ],
    "accessibility": [
      "Buttons drop one or twenty balls; the board and the tally are described as text."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
