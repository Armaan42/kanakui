import { defineItem } from "../define.ts"

export default defineItem({
  "name": "corkboard",
  "type": "registry:ui",
  "title": "Corkboard",
  "description": "A corkboard of pinned cards, sticky notes and photos joined by red string; drag them and the string follows.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive",
    "cards"
  ],
  "files": [
    {
      "path": "registry/default/ui/corkboard.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "notes",
        "type": "CorkNote[]",
        "description": "Notes: `id`, pin position `x`/`y` in percent, `kind`, `text`, and `src`/`alt` for photos."
      },
      {
        "name": "links",
        "type": "[string, string][]",
        "description": "Pairs of note ids joined by string."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Great for plans and mood boards; save `notes` positions to keep a layout."
    ],
    "accessibility": [
      "Each note is a button you can move with the arrow keys; photos are described by their `alt`."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
