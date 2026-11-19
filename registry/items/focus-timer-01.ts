import { defineItem } from "../define.ts"

export default defineItem({
  "name": "focus-timer-01",
  "type": "registry:block",
  "title": "Focus Timer",
  "description": "A focus page with a 25-minute timer, a break hourglass and a short task list.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "content"
  ],
  "internalDependencies": [
    "kitchen-timer",
    "hourglass"
  ],
  "files": [
    {
      "path": "registry/default/blocks/focus-timer-01/components/focus-timer-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "VenusUI `kitchen-timer` and VenusUI `hourglass`. The CLI installs them. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Change the hourglass `duration` for longer breaks.",
      "The people, businesses and numbers in the demo are made up; replace them with your own."
    ],
    "accessibility": [
      "The section is labelled by its heading, and every control works from the keyboard and announces its result."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Blocks use your project’s theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
