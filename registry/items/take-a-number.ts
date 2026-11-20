import { defineItem } from "../define.ts"

export default defineItem({
  "name": "take-a-number",
  "type": "registry:ui",
  "title": "Take a Number",
  "description": "A deli-counter queue: pull a ticket, watch “Now serving” count up, and hear a chime on your turn.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive",
    "data-display"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/take-a-number.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-take-a-number-tear": "take-a-number-tear 0.5s cubic-bezier(.3,1.3,.5,1) both"
    }
  },
  "css": {
    "@keyframes take-a-number-tear": {
      "from": {
        "transform": "translateY(-50px) rotate(6deg)",
        "opacity": "0"
      },
      "to": {
        "transform": "translateY(0) rotate(0deg)",
        "opacity": "1"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "serving",
        "type": "number",
        "description": "The number being served at the start.",
        "default": "44"
      },
      {
        "name": "nextTicket",
        "type": "number",
        "description": "The next ticket in the dispenser.",
        "default": "47"
      },
      {
        "name": "sound",
        "type": "boolean",
        "description": "Play sounds (Web Audio, no files).",
        "default": "true"
      },
      {
        "name": "onTake",
        "type": "(ticket: number) => void",
        "description": "Called when a ticket is taken."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes. Sound uses the Web Audio API, with no audio files."
    ],
    "customization": [
      "Wire “Next customer” to your real queue, and `serving` to its state."
    ],
    "accessibility": [
      "The dispenser and Next customer are buttons; your place in the queue is announced."
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
