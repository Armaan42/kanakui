import { defineItem } from "../define.ts"

export default defineItem({
  "name": "event-01",
  "type": "registry:block",
  "title": "Festival Section",
  "description": "A festival section over a photo, with the lineup by day in tabs and a tearable ticket.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "content"
  ],
  "internalDependencies": [
    "event-ticket"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/event-01/components/event-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The days and sets are an array at the top of the file.",
    "requirements": [
      "kanakui `event-ticket`. The CLI installs it.",
      "It renders inside a `.dark` wrapper so it stays dark over the photo; this relies on shadcn's class-based dark mode.",
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Edit `days`; mark a set with `headline: true` to highlight it.",
      "Replace the backdrop photo; the dark wash keeps the text readable."
    ],
    "accessibility": [
      "The days are real tabs: arrow keys move between them and the panel is labelled by the active tab."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Blocks use your project’s theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
