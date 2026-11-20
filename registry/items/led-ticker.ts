import { defineItem } from "../define.ts"

export default defineItem({
  "name": "led-ticker",
  "type": "registry:ui",
  "title": "LED Ticker",
  "description": "A scrolling dot-matrix LED sign with a hand-drawn 5×7 font, in four LED colours.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "data-display",
    "animations"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/led-ticker.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "text",
        "type": "string",
        "description": "The message. Letters, digits and common punctuation."
      },
      {
        "name": "color",
        "type": "\"red\" | \"amber\" | \"green\" | \"blue\"",
        "description": "LED colour.",
        "default": "\"amber\""
      },
      {
        "name": "speed",
        "type": "number",
        "description": "Columns per second.",
        "default": "14"
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Unknown characters show as “?”; add glyphs to `FONT` as rows of `#` and `.`."
    ],
    "accessibility": [
      "The message is in the page as text. A pause button stops the scroll, and it starts paused with reduced motion."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
