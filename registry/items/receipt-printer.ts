import { defineItem } from "../define.ts"

export default defineItem({
  "name": "receipt-printer",
  "type": "registry:ui",
  "title": "Receipt Printer",
  "description": "A receipt that prints out of a slot line by line, with itemized totals and a torn zig-zag edge.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "animations",
    "data-display"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/receipt-printer.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "store, address",
        "type": "string",
        "description": "Printed at the top."
      },
      {
        "name": "items",
        "type": "{ name: string; quantity: number; price: number }[]",
        "description": "Line items; totals are calculated from them."
      },
      {
        "name": "taxRate",
        "type": "number",
        "default": "0",
        "description": "e.g. `0.2` for 20%, added on top."
      },
      {
        "name": "currency, locale",
        "type": "string",
        "default": "\"USD\", \"en-US\"",
        "description": "Formats prices with `Intl.NumberFormat`."
      },
      {
        "name": "paidWith, orderId, date",
        "type": "string",
        "description": "Printed details."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for the replay icon. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Printing speed scales with the number of lines; change `0.12` (seconds per line) in the paper's transition."
    ],
    "accessibility": [
      "Items are a table and totals a description list, so they read in order.",
      "With reduced motion it appears already printed."
    ],
    "troubleshooting": [
      {
        "problem": "Totals are off by a cent.",
        "solution": "Prices are added as numbers; for money in production, calculate totals on your server in cents."
      }
    ]
  }
})
