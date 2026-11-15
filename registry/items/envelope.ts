import { defineItem } from "../define.ts"

export default defineItem({
  "name": "envelope",
  "type": "registry:ui",
  "title": "Envelope",
  "description": "A sealed envelope that opens on hover or click: the flap folds back and the letter slides out.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "interactive",
    "animations",
    "cards"
  ],
  "files": [
    {
      "path": "registry/default/ui/envelope.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "description": "The letter. Any content, including links and buttons."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Names the envelope for screen readers, e.g. “Invitation from Maya”."
      },
      {
        "name": "to",
        "type": "string",
        "description": "Shown on the front, e.g. the recipient's name."
      },
      {
        "name": "color",
        "type": "string",
        "default": "oklch(0.93 0.035 75)",
        "description": "Envelope color: any CSS color; the flap and pocket shades are mixed from it."
      },
      {
        "name": "open, defaultOpen",
        "type": "boolean",
        "description": "Controlled or initial open state. Unset, it opens on hover and toggles on click."
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "description": "Called when a click, tap or key press opens or closes it."
      }
    ],
    "extends": "All `<div>` props except `children` (which is the letter).",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Leave room above it: the letter rises out of the envelope by about 60% of its height. The component adds top padding for this.",
      "Keep the letter short (it shows about two-thirds of the envelope's height); link to a full page for details."
    ],
    "accessibility": [
      "A button with `aria-expanded` covers the envelope; Enter or Space opens it, so it works without a mouse.",
      "The letter is `inert` while closed, so its links can't be reached until it's out.",
      "With reduced motion it opens without animation."
    ],
    "troubleshooting": [
      {
        "problem": "The letter is cut off at the top.",
        "solution": "A parent has `overflow-hidden`, or the envelope's top padding was removed. Keep the space above it."
      }
    ]
  }
})
