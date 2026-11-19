import { defineItem } from "../define.ts"

export default defineItem({
  "name": "booking-01",
  "type": "registry:block",
  "title": "Booking Card",
  "description": "A stay booking page with a wall calendar range and a live price.",
  "version": "0.1.0",
  "releasedAt": "2026-11-19",
  "categories": [
    "content"
  ],
  "registryDependencies": [
    "button"
  ],
  "internalDependencies": [
    "wall-calendar"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/booking-01/components/booking-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "shadcn `button` and VenusUI `wall-calendar`. The CLI installs them. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Replace `BOOKED`, `RATE` and `CLEANING`, and connect Reserve to your booking system.",
      "The people, businesses and prices in the demo are made up; replace them with your own."
    ],
    "accessibility": [
      "The section is labelled by its heading, photos have descriptions and every control works from the keyboard."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Blocks use your project’s theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
