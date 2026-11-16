import { defineItem } from "../define.ts"

export default defineItem({
  "name": "boarding-pass",
  "type": "registry:ui",
  "title": "Boarding Pass",
  "description": "A flight boarding pass with a perforated stub and code that flips to the fare and baggage details.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "cards",
    "interactive"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/boarding-pass.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "airline, flight",
        "type": "string",
        "description": "Shown in the header band."
      },
      {
        "name": "from, to",
        "type": "{ code: string; city: string }",
        "description": "Airports: IATA code and city."
      },
      {
        "name": "date, departs, arrives",
        "type": "string",
        "description": "e.g. “Tue, 7 Apr”, “19:05”, “16:40 +1”."
      },
      {
        "name": "passenger, seat, gate, boarding",
        "type": "string",
        "description": "The main fields."
      },
      {
        "name": "cabin",
        "type": "string",
        "default": "\"Economy\"",
        "description": "Shown on the stub and the back."
      },
      {
        "name": "reference",
        "type": "string",
        "description": "Booking reference, printed on the stub and drawn into the code."
      },
      {
        "name": "details",
        "type": "{ label: string; value: string }[]",
        "description": "Rows on the back, e.g. fare, baggage and meal."
      }
    ],
    "extends": "All `<button>` props except `children`; `className` sets the width (the pass is about 5:8).",
    "requirements": [
      "`lucide-react` for the plane. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "The code is a decorative pattern, not scannable. For a real pass, put a QR image from your backend in the stub instead."
    ],
    "accessibility": [
      "It's a button with `aria-pressed`; its label reads the flight, route, date, seat, gate and boarding time.",
      "With reduced motion it flips without animation."
    ],
    "troubleshooting": [
      {
        "problem": "The back shows through.",
        "solution": "A parent is flattening 3D (`overflow-hidden` or `filter`). Keep the pass's wrapper free of those."
      }
    ]
  }
})
