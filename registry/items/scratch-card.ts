import { defineItem } from "../define.ts"

export default defineItem({
  "name": "scratch-card",
  "type": "registry:ui",
  "title": "Scratch Card",
  "description": "A scratch-off card: scratch the silver coating with a mouse or finger to reveal what's underneath.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "interactive",
    "cards"
  ],
  "files": [
    {
      "path": "registry/default/ui/scratch-card.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "description": "What's under the coating."
      },
      {
        "name": "threshold",
        "type": "number",
        "default": "0.55",
        "description": "Share of the coating to scratch off before it clears completely."
      },
      {
        "name": "brush",
        "type": "number",
        "default": "22",
        "description": "Scratch radius in px."
      },
      {
        "name": "label",
        "type": "string",
        "default": "\"Scratch here\"",
        "description": "Printed on the coating."
      },
      {
        "name": "onReveal",
        "type": "() => void",
        "description": "Called once when the content is revealed."
      }
    ],
    "extends": "All `<div>` props except `children`.",
    "requirements": [
      "React 19 and Tailwind CSS v4. Uses a canvas; no libraries."
    ],
    "customization": [
      "Change the coating colors in the gradient in `paint()`. A gold coating (`#fde68a` to `#d97706`) works well for prizes."
    ],
    "accessibility": [
      "The hidden content is `inert` until revealed; a button reveals it without scratching.",
      "The reveal is announced (“Revealed!”)."
    ],
    "troubleshooting": [
      {
        "problem": "Scratching scrolls the page on a phone.",
        "solution": "The canvas uses `touch-none`; make sure nothing above it captures the touch."
      }
    ]
  }
})
