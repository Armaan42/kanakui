import { defineItem } from "../define.ts"

export default defineItem({
  "name": "polaroid-stack",
  "type": "registry:ui",
  "title": "Polaroid Stack",
  "description": "A stack of instant photos you drag or swipe through; each one develops as it reaches the top.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "interactive",
    "cards"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/polaroid-stack.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-polaroid-develop": "polaroid-develop 1.6s ease-out both"
    }
  },
  "css": {
    "@keyframes polaroid-develop": {
      "from": {
        "filter": "brightness(1.7) saturate(0.15) contrast(0.7) blur(2px)"
      },
      "to": {
        "filter": "none"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "photos",
        "type": "{ src: string; alt: string; caption?: string }[]",
        "description": "Photos, top first. Captions are written in a handwriting-style font."
      }
    ],
    "extends": "All `<div>` props; `className` sets the width (the stack is 4:5).",
    "requirements": [
      "`lucide-react` for the arrow icon. React 19 and Tailwind CSS v4. The CLI adds the `polaroid-develop` keyframes and `--animate-polaroid-develop`."
    ],
    "customization": [
      "Captions use system handwriting fonts (Segoe Print, Bradley Hand, Marker Felt) with a cursive fallback. Load a web font and change `HANDWRITING` for the same look everywhere."
    ],
    "accessibility": [
      "The stack is focusable and the arrow keys show the next photo; the “Next photo” button does the same.",
      "Only the top photo is exposed to screen readers, and changes are announced with its caption and description.",
      "With reduced motion photos don't develop or fly off."
    ],
    "troubleshooting": [
      {
        "problem": "Swiping on a phone scrolls the page.",
        "solution": "The stack only captures sideways drags (`touch-pan-y`); swipe left or right, or use the button."
      }
    ]
  }
})
