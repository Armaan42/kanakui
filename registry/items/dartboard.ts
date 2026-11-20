import { defineItem } from "../define.ts"

export default defineItem({
  "name": "dartboard",
  "type": "registry:ui",
  "title": "Dartboard",
  "description": "A true-to-size dartboard that scores trebles, doubles and bulls, playing 301 with busts.",
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
      "path": "registry/default/ui/dartboard.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-dartboard-thunk": "dartboard-thunk 0.25s ease-out"
    }
  },
  "css": {
    "@keyframes dartboard-thunk": {
      "from": {
        "transform": "translate(10px, -14px) scale(1.15)",
        "opacity": "0"
      },
      "to": {
        "transform": "translate(0, 0) scale(1)",
        "opacity": "1"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "start",
        "type": "number",
        "description": "Starting score, counted down to exactly zero.",
        "default": "301"
      },
      {
        "name": "spread",
        "type": "number",
        "description": "How far throws stray from the aim, in board millimetres.",
        "default": "14"
      },
      {
        "name": "onThrow",
        "type": "(score: number, label: string) => void",
        "description": "Called for every dart."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "Lower `spread` for a sharper thrower."
    ],
    "accessibility": [
      "Focus the board, aim with the arrow keys and press Enter. Each dart’s score is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
