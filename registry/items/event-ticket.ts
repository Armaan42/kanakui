import { defineItem } from "../define.ts"

export default defineItem({
  "name": "event-ticket",
  "type": "registry:ui",
  "title": "Event Ticket",
  "description": "A ticket with a perforated stub you can drag or click to tear off.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "interactive",
    "cards"
  ],
  "files": [
    {
      "path": "registry/default/ui/event-ticket.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "event, date, time, venue",
        "type": "string",
        "description": "Printed on the ticket."
      },
      {
        "name": "seat",
        "type": "string",
        "default": "\"General admission\"",
        "description": "Printed on the stub."
      },
      {
        "name": "image",
        "type": "{ src: string; alt: string }",
        "description": "Photo across the top of the ticket."
      },
      {
        "name": "code",
        "type": "string",
        "description": "Printed under the barcode; the barcode pattern is drawn from it."
      },
      {
        "name": "torn, defaultTorn",
        "type": "boolean",
        "description": "Controlled or initial torn state."
      },
      {
        "name": "onTornChange",
        "type": "(torn: boolean) => void",
        "description": "Called when the stub is torn off."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "To show a fresh ticket again, change its `key` (the demo's “New ticket” button does this).",
      "The barcode is decorative. For a scannable code, put a real barcode or QR image in the stub."
    ],
    "accessibility": [
      "The stub is a button (“Tear off the stub, Floor · General admission”); a click, tap, Enter or Space tears it, so dragging is optional.",
      "Tearing is announced (“Stub torn off.”).",
      "With reduced motion the stub disappears without the flying animation."
    ],
    "troubleshooting": [
      {
        "problem": "Dragging scrolls the page on a phone.",
        "solution": "The stub only captures horizontal drags (`touch-pan-y`); drag sideways, or tap to tear."
      }
    ]
  }
})
