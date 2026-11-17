import { defineItem } from "../define.ts"

export default defineItem({
  "name": "widgets-01",
  "type": "registry:block",
  "title": "Widget Grid",
  "description": "A home-screen style grid of widgets: weather, world clocks, music, calendar and reminders.",
  "version": "0.1.1",
  "releasedAt": "2026-11-16",
  "categories": [
    "content"
  ],
  "internalDependencies": [
    "weather-widget",
    "world-clock"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/widgets-01/components/widgets-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. Edit the widgets' content in the file.",
    "requirements": [
      "VenusUI `weather-widget` and `world-clock`. The CLI installs them.",
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Each tile is a `section` in a 4-column grid; change the `col-span` and `row-span` classes to rearrange them."
    ],
    "accessibility": [
      "Each widget is a labelled section; reminders are real checkboxes."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Blocks use your project’s theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
