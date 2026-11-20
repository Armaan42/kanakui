import { defineItem } from "../define.ts"

export default defineItem({
  "name": "signature-pad",
  "type": "registry:ui",
  "title": "Signature Pad",
  "description": "A signature pad with a fountain-pen feel: quick strokes thin out, slow ones pool ink. Draw or type it.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "inputs",
    "forms"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/signature-pad.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "ink",
        "type": "string",
        "description": "Ink colour.",
        "default": "\"#1e2a5a\""
      },
      {
        "name": "onSave",
        "type": "(dataUrl: string) => void",
        "description": "Called with a PNG data URL when the signature is used."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Send the PNG from `onSave` to your server with the signed document."
    ],
    "accessibility": [
      "Typing your name is a full keyboard alternative to drawing; the box describes what’s in it."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
