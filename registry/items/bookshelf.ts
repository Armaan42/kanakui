import { defineItem } from "../define.ts"

export default defineItem({
  "name": "bookshelf",
  "type": "registry:ui",
  "title": "Bookshelf",
  "description": "Books on a wooden shelf whose spines lift on hover and pull out when selected, with a matching cover.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "interactive",
    "data-display"
  ],
  "files": [
    {
      "path": "registry/default/ui/bookshelf.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "books",
        "type": "ShelfBook[]",
        "description": "Each has `id`, `title`, `author`, `color`, and optionally `ink` (text color), `height` (0.7–1) and `thickness` (px)."
      },
      {
        "name": "selected",
        "type": "string",
        "description": "Id of the book pulled out."
      },
      {
        "name": "onSelect",
        "type": "(book: ShelfBook) => void",
        "description": "Called when a spine is picked."
      },
      {
        "name": "label",
        "type": "string",
        "default": "\"Bookshelf\"",
        "description": "Accessible name for the shelf."
      }
    ],
    "extends": "All `<div>` props except `onSelect`. Also exports `BookCover` to show the selected book's front.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Covers are designed from the book's colors; pass your own image instead by replacing `BookCover`."
    ],
    "accessibility": [
      "Each spine is a button with `aria-pressed`, named “Title by Author”.",
      "With reduced motion spines move without animation."
    ],
    "troubleshooting": [
      {
        "problem": "Long titles are cut off on the spine.",
        "solution": "Spines show one line; use a bigger `thickness` or a shorter title."
      }
    ]
  }
})
