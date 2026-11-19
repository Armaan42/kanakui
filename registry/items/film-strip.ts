import { defineItem } from "../define.ts"

export default defineItem({
  "name": "film-strip",
  "type": "registry:ui",
  "title": "Film Strip",
  "description": "A strip of 35mm negatives; picking a frame develops it into a print above the strip.",
  "version": "0.1.0",
  "releasedAt": "2026-11-19",
  "categories": [
    "interactive",
    "cards"
  ],
  "files": [
    {
      "path": "registry/default/ui/film-strip.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "frames",
        "type": "{ src: string; alt: string; caption?: string }[]",
        "description": "The photos on the roll."
      },
      {
        "name": "defaultIndex",
        "type": "number",
        "description": "Frame developed at first.",
        "default": "0"
      },
      {
        "name": "stock",
        "type": "string",
        "description": "Text along the film edge.",
        "default": "\"SAFETY FILM 400\""
      },
      {
        "name": "onSelect",
        "type": "(index: number) => void",
        "description": "Called when a frame is picked."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Frames work best at 3:2. Change `stock` to print your own film name."
    ],
    "accessibility": [
      "Frames are buttons with the photo’s description; the left and right arrow keys move between them.",
      "The caption of the print is announced when it changes."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
