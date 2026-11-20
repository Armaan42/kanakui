import { defineItem } from "../define.ts"

export default defineItem({
  "name": "aquarium",
  "type": "registry:ui",
  "title": "Aquarium",
  "description": "A little aquarium: fish wander, weed sways and bubbles rise; drop food and they race to eat it.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "animations",
    "interactive"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/aquarium.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-aquarium-sway": "aquarium-sway 4s ease-in-out infinite alternate",
      "animate-aquarium-bubble": "aquarium-bubble 3s ease-in infinite"
    }
  },
  "css": {
    "@keyframes aquarium-sway": {
      "from": {
        "transform": "rotate(-6deg)"
      },
      "to": {
        "transform": "rotate(6deg)"
      }
    },
    "@keyframes aquarium-bubble": {
      "0%": {
        "transform": "translateY(0)",
        "opacity": "0"
      },
      "10%": {
        "opacity": "1"
      },
      "100%": {
        "transform": "translateY(-210px)",
        "opacity": "0"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "fish",
        "type": "string[]",
        "description": "Fish colours, one fish each."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "Add colours to `fish` for a busier tank."
    ],
    "accessibility": [
      "A Feed button drops food without aiming; the tank describes what’s in it, and eaten flakes are counted."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
