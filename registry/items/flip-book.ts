import { defineItem } from "../define.ts"

export default defineItem({
  "name": "flip-book",
  "type": "registry:ui",
  "title": "Flip Book",
  "description": "A 3D book whose pages turn with buttons, a click or the arrow keys.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "interactive",
    "3d"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/flip-book.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "pages",
        "type": "ReactNode[]",
        "description": "Pages in order: the front cover, then pages pairing up as left and right, ending with the back cover."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Accessible name, e.g. the book's title."
      }
    ],
    "extends": "All `<div>` props; the book is 3:2 and fills the width (up to `max-w-3xl`).",
    "requirements": [
      "`lucide-react` for the arrows. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Each page is any content, sized to a 3:4 page. Size text with container units (`cqw`) inside an `@container` wrapper so it scales with the book, as the demo does."
    ],
    "accessibility": [
      "The book is focusable; the left and right arrow keys turn pages, as do the Previous and Next buttons.",
      "Only the open pages are exposed to screen readers, and the page numbers are announced.",
      "With reduced motion pages turn instantly."
    ],
    "troubleshooting": [
      {
        "problem": "Pages show through each other.",
        "solution": "A parent is flattening 3D (`overflow-hidden` or `filter` on an ancestor between the book and its pages)."
      }
    ]
  }
})
