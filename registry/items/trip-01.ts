import { defineItem } from "../define.ts"

export default defineItem({
  "name": "trip-01",
  "type": "registry:block",
  "title": "Trip Itinerary",
  "description": "A trip overview: a boarding pass beside a day-by-day itinerary with photos.",
  "version": "0.1.1",
  "releasedAt": "2026-11-16",
  "categories": [
    "content"
  ],
  "internalDependencies": [
    "boarding-pass"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/trip-01/components/trip-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The days and summary are arrays at the top of the file.",
    "requirements": [
      "kanakui `boarding-pass`. The CLI installs it.",
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Edit `days` (with your own photos) and the boarding pass details."
    ],
    "accessibility": [
      "Labelled by its `h2`; each day is an article with a described photo."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Blocks use your project’s theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
