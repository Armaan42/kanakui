import { defineItem } from "../define.ts"

export default defineItem({
  "name": "holo-card",
  "type": "registry:ui",
  "title": "Holo Card",
  "description": "A payment card with a holographic foil that follows the pointer, and a flip to the back on click.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "cards",
    "interactive",
    "3d"
  ],
  "files": [
    {
      "path": "registry/default/ui/holo-card.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "name",
        "type": "string",
        "description": "Card holder's name."
      },
      {
        "name": "last4",
        "type": "string",
        "description": "The last four digits; the rest show as dots."
      },
      {
        "name": "expires",
        "type": "string",
        "description": "Expiry, e.g. “08/29”."
      },
      {
        "name": "brand",
        "type": "string",
        "default": "\"Aurora\"",
        "description": "Wordmark in the top corner."
      },
      {
        "name": "cvc",
        "type": "string",
        "default": "\"123\"",
        "description": "Shown on the back. Use a placeholder, never a real code."
      },
      {
        "name": "max",
        "type": "number",
        "default": "14",
        "description": "Largest tilt in degrees."
      }
    ],
    "extends": "All `<button>` props except `children`; `className` sizes the card.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Change the card's colors in the front face's `bg-[radial-gradient(...)]` class, and the foil colors in its inline `linear-gradient`.",
      "Use it for product pages, pricing or onboarding. Never display real card numbers."
    ],
    "accessibility": [
      "It's a button with `aria-pressed` that flips the card; its label reads the brand, last four digits, name and expiry.",
      "Touch and keyboard users get the flip; the tilt is pointer-only.",
      "With reduced motion it neither tilts nor animates the flip."
    ],
    "troubleshooting": [
      {
        "problem": "The back shows through, or the flip looks flat.",
        "solution": "A parent is flattening 3D (`overflow-hidden` or `filter`). Keep the card's wrapper free of those."
      }
    ]
  }
})
