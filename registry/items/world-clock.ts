import { defineItem } from "../define.ts"

export default defineItem({
  "name": "world-clock",
  "type": "registry:ui",
  "title": "World Clock",
  "description": "Real analog clocks for several cities with smooth second hands and day and night faces.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "data-display"
  ],
  "files": [
    {
      "path": "registry/default/ui/world-clock.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "zones",
        "type": "{ city: string; timeZone: string }[]",
        "description": "Cities and their IANA time zones, e.g. `Asia/Tokyo`."
      }
    ],
    "extends": "All `<ul>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4. Uses `Intl.DateTimeFormat`; no time-zone library needed."
    ],
    "customization": [
      "Faces turn dark between 19:00 and 06:00 in that city. Change the hours in `night` in the file."
    ],
    "accessibility": [
      "Each clock is a list item with the city, the digital time and the offset as text; the dial is decorative.",
      "One shared animation-frame loop moves the hands without re-rendering; with reduced motion the second hand ticks once a second."
    ],
    "troubleshooting": [
      {
        "problem": "Hands appear a moment after the page loads.",
        "solution": "That's deliberate: the server doesn't know the visitor's time, so hands are drawn in the browser to avoid a wrong flash."
      }
    ]
  }
})
