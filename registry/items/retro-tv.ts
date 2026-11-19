import { defineItem } from "../define.ts"

export default defineItem({
  "name": "retro-tv",
  "type": "registry:ui",
  "title": "Retro TV",
  "description": "A wood-cased CRT set: turn the channel knob through static, or switch it off to a closing line.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive",
    "cards"
  ],
  "files": [
    {
      "path": "registry/default/ui/retro-tv.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "channels",
        "type": "{ src: string; alt: string; name: string }[]",
        "description": "Pictures for each channel."
      },
      {
        "name": "defaultChannel",
        "type": "number",
        "description": "Channel shown first.",
        "default": "0"
      },
      {
        "name": "onChannelChange",
        "type": "(index: number) => void",
        "description": "Called on a new channel."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Use it to show a portfolio, product shots or a gallery."
    ],
    "accessibility": [
      "The knob is a slider (arrow keys) and Power is a switch; the channel is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
