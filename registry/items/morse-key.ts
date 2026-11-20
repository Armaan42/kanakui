import { defineItem } from "../define.ts"

export default defineItem({
  "name": "morse-key",
  "type": "registry:ui",
  "title": "Morse Key",
  "description": "A brass telegraph key: tap for a dot, hold for a dash, and the paper tape decodes your message.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "inputs",
    "interactive"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/morse-key.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "unit",
        "type": "number",
        "description": "Length of a dot in milliseconds. A press longer than 2.2 units is a dash.",
        "default": "120"
      },
      {
        "name": "sound",
        "type": "boolean",
        "description": "Play a tone while the key is down.",
        "default": "true"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "description": "Starting text."
      },
      {
        "name": "onValueChange",
        "type": "(text: string) => void",
        "description": "Called as letters are decoded."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. Sound uses the Web Audio API, with no audio files."
    ],
    "customization": [
      "Raise `unit` for slower senders: a pause of 5 units ends a letter and 14 units adds a space."
    ],
    "accessibility": [
      "The key is a button: hold Space or Enter for as long as you’d hold the key. Decoded text is announced as it arrives, and the alphabet is in a disclosure below."
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
