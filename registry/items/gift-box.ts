import { defineItem } from "../define.ts"

export default defineItem({
  "name": "gift-box",
  "type": "registry:ui",
  "title": "Gift Box",
  "description": "A wrapped gift that pops its lid with confetti and reveals a coupon code with a copy button.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "interactive",
    "animations"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/gift-box.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-gift-box-confetti": "gift-box-confetti 1.6s cubic-bezier(0.2, 0.7, 0.4, 1) forwards"
    }
  },
  "css": {
    "@keyframes gift-box-confetti": {
      "0%": {
        "transform": "translate(0, 0) rotate(0deg)",
        "opacity": "1"
      },
      "45%": {
        "transform": "translate(calc(var(--x) * 0.7), var(--y)) rotate(calc(var(--r) * 0.5))",
        "opacity": "1"
      },
      "100%": {
        "transform": "translate(var(--x), calc(var(--y) + 260px)) rotate(var(--r))",
        "opacity": "0"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "code",
        "type": "string",
        "description": "The coupon code revealed inside."
      },
      {
        "name": "reward",
        "type": "string",
        "description": "What it gets you, e.g. “15% off your next order”."
      },
      {
        "name": "color",
        "type": "string",
        "default": "oklch(0.62 0.2 15)",
        "description": "Box color: any CSS color; the lid is a shade darker and the ribbon stays gold."
      },
      {
        "name": "onOpen",
        "type": "() => void",
        "description": "Called when the gift is opened."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for the copy icon. React 19 and Tailwind CSS v4. The CLI adds the `gift-box-confetti` keyframes."
    ],
    "customization": [
      "Leave room above it: the card rises out of the box. The component adds top padding for this."
    ],
    "accessibility": [
      "The box is a button (“Open the gift”); the copy button is labelled with the code and announces “Code copied”.",
      "With reduced motion there's no confetti and the lid moves without animation."
    ],
    "troubleshooting": [
      {
        "problem": "Copy doesn't work.",
        "solution": "Browsers allow clipboard access only on secure (https) pages; the code stays visible to copy by hand."
      }
    ]
  }
})
