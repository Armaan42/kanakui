import { defineItem } from "../define.ts"

export default defineItem({
  "name": "wind-chimes",
  "type": "registry:ui",
  "title": "Wind Chimes",
  "description": "Wind chimes that ring as you brush across them, tuned to a pentatonic scale, with a breeze button.",
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
      "path": "registry/default/ui/wind-chimes.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-wind-chimes-swing": "wind-chimes-swing 1.4s ease-out"
    }
  },
  "css": {
    "@keyframes wind-chimes-swing": {
      "0%": {
        "transform": "rotate(0deg)"
      },
      "15%": {
        "transform": "rotate(7deg)"
      },
      "35%": {
        "transform": "rotate(-5deg)"
      },
      "55%": {
        "transform": "rotate(3deg)"
      },
      "75%": {
        "transform": "rotate(-1.5deg)"
      },
      "100%": {
        "transform": "rotate(0deg)"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "notes",
        "type": "number[]",
        "description": "Tube pitches in hertz, longest first.",
        "default": "C major pentatonic"
      },
      {
        "name": "sound",
        "type": "boolean",
        "description": "Play sounds (Web Audio, no files).",
        "default": "true"
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes. Sound uses the Web Audio API, with no audio files."
    ],
    "customization": [
      "Any pentatonic scale sounds pleasant whatever order the tubes ring in."
    ],
    "accessibility": [
      "Each tube is a button. The breeze rings them for you; with reduced motion the tubes ring without swinging."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      },
      {
        "problem": "There’s no sound.",
        "solution": "Browsers only play audio after a click or key press on the page, and the device must not be muted. Pass `sound={false}` to turn it off."
      }
    ]
  }
})
