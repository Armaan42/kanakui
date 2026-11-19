import { defineItem } from "../define.ts"

export default defineItem({
  "name": "matchbox",
  "type": "registry:ui",
  "title": "Matchbox",
  "description": "A matchbox with a sliding tray and matches you can strike one at a time.",
  "version": "0.1.0",
  "releasedAt": "2026-11-19",
  "categories": [
    "interactive",
    "animations"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/matchbox.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-matchbox-flicker": "matchbox-flicker 0.5s ease-in-out infinite"
    }
  },
  "css": {
    "@keyframes matchbox-flicker": {
      "0%, 100%": {
        "transform": "scale(1, 1) rotate(-2deg)"
      },
      "25%": {
        "transform": "scale(0.93, 1.07) rotate(2deg)"
      },
      "50%": {
        "transform": "scale(1.05, 0.95) rotate(-1deg)"
      },
      "75%": {
        "transform": "scale(0.96, 1.05) rotate(3deg)"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "title",
        "type": "string",
        "description": "Big line on the label.",
        "default": "\"Good Light\""
      },
      {
        "name": "subtitle",
        "type": "string",
        "description": "Small line on the label.",
        "default": "\"Safety matches\""
      },
      {
        "name": "count",
        "type": "number",
        "description": "Matches in the box.",
        "default": "12"
      },
      {
        "name": "burnTime",
        "type": "number",
        "description": "Burn time in milliseconds.",
        "default": "6000"
      },
      {
        "name": "onStrike",
        "type": "(remaining: number) => void",
        "description": "Called when a match is lit."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "Use `onStrike` for a small reward, such as revealing a hint."
    ],
    "accessibility": [
      "Open and strike are ordinary buttons, and lighting a match is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
