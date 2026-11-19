import { defineItem } from "../define.ts"

export default defineItem({
  "name": "slot-machine",
  "type": "registry:ui",
  "title": "Slot Machine",
  "description": "A three-reel slot machine with a lever; reels stop one after another and three of a kind lights up.",
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
      "path": "registry/default/ui/slot-machine.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "onResult",
        "type": "(symbols: string[], win: boolean) => void",
        "description": "Called when the reels stop."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "For real prizes, decide the result on your server and only animate it here."
    ],
    "accessibility": [
      "Spin and the lever are buttons; the result is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
