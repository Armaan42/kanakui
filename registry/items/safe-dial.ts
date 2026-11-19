import { defineItem } from "../define.ts"

export default defineItem({
  "name": "safe-dial",
  "type": "registry:ui",
  "title": "Safe Dial",
  "description": "A safe's combination dial: turn to each number and press the centre; three right numbers open it.",
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
      "path": "registry/default/ui/safe-dial.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "code",
        "type": "[number, number, number]",
        "description": "The combination, 0–99 each."
      },
      {
        "name": "onUnlock",
        "type": "() => void",
        "description": "Called when the right combination is entered."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Pair it with a real check on your server; the code here is for show."
    ],
    "accessibility": [
      "The dial is a slider (arrows, Page Up and Down), Enter enters a number, and the result is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
