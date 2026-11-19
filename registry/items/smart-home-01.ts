import { defineItem } from "../define.ts"

export default defineItem({
  "name": "smart-home-01",
  "type": "registry:block",
  "title": "Smart Home",
  "description": "A smart-home panel with a thermostat, light switches and live power use.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "content"
  ],
  "internalDependencies": [
    "thermostat",
    "light-switch-panel"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/smart-home-01/components/smart-home-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "VenusUI `thermostat` and VenusUI `light-switch-panel`. The CLI installs them. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Connect `onValueChange` on both controls to your devices.",
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
