import { defineItem } from "../define.ts"

export default defineItem({
  "name": "candle",
  "type": "registry:ui",
  "title": "Candle",
  "description": "A candle whose flame flickers and leans from your pointer; blow it out, even through the mic, and smoke curls up.",
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
      "path": "registry/default/ui/candle.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-candle-flicker": "candle-flicker 1.6s ease-in-out infinite",
      "animate-candle-smoke": "candle-smoke 2.6s ease-out forwards"
    }
  },
  "css": {
    "@keyframes candle-flicker": {
      "0%, 100%": {
        "transform": "scale(1, 1) skewX(0deg)"
      },
      "25%": {
        "transform": "scale(0.96, 1.04) skewX(1.5deg)"
      },
      "50%": {
        "transform": "scale(1.02, 0.97) skewX(-1deg)"
      },
      "75%": {
        "transform": "scale(0.98, 1.03) skewX(1deg)"
      }
    },
    "@keyframes candle-smoke": {
      "from": {
        "transform": "translateY(10px) scale(0.8)",
        "opacity": "0.9"
      },
      "to": {
        "transform": "translateY(-40px) scale(1.3)",
        "opacity": "0"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "burnMinutes",
        "type": "number",
        "description": "Minutes to burn all the way down.",
        "default": "10"
      },
      {
        "name": "microphone",
        "type": "boolean",
        "description": "Offer to blow it out through the microphone.",
        "default": "true"
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "The microphone is only used after you press the button, and never recorded."
    ],
    "accessibility": [
      "Blow out and light are buttons; its state and how much is left are announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
