import { defineItem } from "../define.ts"

export default defineItem({
  "name": "rotary-phone",
  "type": "registry:ui",
  "title": "Rotary Phone",
  "description": "A rotary dial: put a finger in a hole, turn it to the stop, and it winds back, clicking out the digit.",
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
      "path": "registry/default/ui/rotary-phone.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "maxDigits",
        "type": "number",
        "description": "Longest number the dial accepts.",
        "default": "10"
      },
      {
        "name": "sound",
        "type": "boolean",
        "description": "Play the dial’s clicks as it winds back.",
        "default": "true"
      },
      {
        "name": "onNumberChange",
        "type": "(number: string) => void",
        "description": "Called after each digit."
      },
      {
        "name": "onCall",
        "type": "(number: string) => void",
        "description": "Called when Call is pressed."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. Sound uses the Web Audio API, with no audio files."
    ],
    "customization": [
      "Use it as a playful phone field on a contact page, and read the number from `onNumberChange`."
    ],
    "accessibility": [
      "Each hole is a button: Enter dials that digit, and the number keys dial any digit while a hole has focus. The number is announced."
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
