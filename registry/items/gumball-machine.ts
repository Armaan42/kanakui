import { defineItem } from "../define.ts"

export default defineItem({
  "name": "gumball-machine",
  "type": "registry:ui",
  "title": "Gumball Machine",
  "description": "A gumball machine: turn the crank a full circle and a gumball rolls down the chute while the rest settle.",
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
      "path": "registry/default/ui/gumball-machine.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-gumball-machine-drop": "gumball-machine-drop 0.9s cubic-bezier(.3,.6,.4,1) both"
    }
  },
  "css": {
    "@keyframes gumball-machine-drop": {
      "0%": {
        "transform": "translateY(-260%) rotate(-120deg)"
      },
      "60%": {
        "transform": "translateY(0) rotate(0deg)"
      },
      "75%": {
        "transform": "translateY(-22%)"
      },
      "90%, 100%": {
        "transform": "translateY(0)"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "count",
        "type": "number",
        "description": "Gumballs in the globe to start with (up to about 40).",
        "default": "30"
      },
      {
        "name": "colors",
        "type": "{ name: string; value: string }[]",
        "description": "Gumball colours."
      },
      {
        "name": "onDispense",
        "type": "(gumball: Gumball) => void",
        "description": "Called when a gumball drops."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "Use `onDispense` to hand out a reward, a coupon or a random tip."
    ],
    "accessibility": [
      "The crank is a button that turns once per press; the gumball in the tray is a button to take it, and each one is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
