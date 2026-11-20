import { defineItem } from "../define.ts"

export default defineItem({
  "name": "claw-machine",
  "type": "registry:ui",
  "title": "Claw Machine",
  "description": "An arcade claw machine: steer, drop, grab, and hope it holds on all the way to the chute.",
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
      "path": "registry/default/ui/claw-machine.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "credits",
        "type": "number",
        "description": "Tries per coin.",
        "default": "3"
      },
      {
        "name": "grip",
        "type": "number",
        "description": "Chance (0–1) the claw holds a prize to the chute.",
        "default": "0.7"
      },
      {
        "name": "onWin",
        "type": "(prize: string) => void",
        "description": "Called with each prize won."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Raise `grip` for a friendlier machine; real ones are stingier."
    ],
    "accessibility": [
      "Left, right and Drop are buttons, and each attempt’s outcome is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
