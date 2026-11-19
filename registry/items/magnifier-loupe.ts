import { defineItem } from "../define.ts"

export default defineItem({
  "name": "magnifier-loupe",
  "type": "registry:ui",
  "title": "Magnifier Loupe",
  "description": "A magnifying glass that follows the pointer over a photo and enlarges what's under it.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive",
    "cards"
  ],
  "files": [
    {
      "path": "registry/default/ui/magnifier-loupe.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "src, alt",
        "type": "string",
        "description": "The photo."
      },
      {
        "name": "zoom",
        "type": "number",
        "description": "How much the lens enlarges.",
        "default": "2.5"
      },
      {
        "name": "lens",
        "type": "number",
        "description": "Lens diameter in pixels.",
        "default": "168"
      },
      {
        "name": "caption",
        "type": "string",
        "description": "Shown under the photo."
      }
    ],
    "extends": "All `<figure>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Use a large, detailed photo; the lens shows it at `zoom` times its displayed size."
    ],
    "accessibility": [
      "The photo is focusable: arrow keys move the lens (Shift for bigger steps) and Escape puts it down."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
