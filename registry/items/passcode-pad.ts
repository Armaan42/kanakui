import { defineItem } from "../define.ts"

export default defineItem({
  "name": "passcode-pad",
  "type": "registry:ui",
  "title": "Passcode Pad",
  "description": "A lock-screen passcode keypad that shakes on a wrong code and unlocks on the right one.",
  "version": "0.1.1",
  "releasedAt": "2026-11-16",
  "categories": [
    "inputs",
    "forms"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/passcode-pad.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "length",
        "type": "number",
        "default": "4",
        "description": "Number of digits."
      },
      {
        "name": "onSubmit",
        "type": "(code: string) => boolean | Promise<boolean>",
        "description": "Checks a complete code; return true to unlock."
      },
      {
        "name": "title",
        "type": "string",
        "default": "\"Enter passcode\"",
        "description": "Heading above the dots."
      },
      {
        "name": "successMessage",
        "type": "string",
        "default": "\"Unlocked\"",
        "description": "Shown once unlocked."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for the lock icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Check codes on your server in `onSubmit` (it can be async); never ship the real code to the browser."
    ],
    "accessibility": [
      "Keys are buttons named by digit; typing digits and Backspace also work.",
      "Progress (“2 of 4 digits entered”) and the result are announced."
    ],
    "troubleshooting": [
      {
        "problem": "Typing digits does nothing.",
        "solution": "Focus must be inside the pad (click a key or Tab into it) for the keyboard to reach it."
      }
    ]
  }
})
