import { defineItem } from "../define.ts"

export default defineItem({
  "name": "radio-station-01",
  "type": "registry:block",
  "title": "Radio Station",
  "description": "A radio page: tune the dial and the station's schedule appears.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "content"
  ],
  "internalDependencies": [
    "radio-tuner"
  ],
  "files": [
    {
      "path": "registry/default/blocks/radio-station-01/components/radio-station-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "VenusUI `radio-tuner`. The CLI installs them. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Each station carries its own `schedule`.",
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
