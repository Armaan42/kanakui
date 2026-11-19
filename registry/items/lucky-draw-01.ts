import { defineItem } from "../define.ts"

export default defineItem({
  "name": "lucky-draw-01",
  "type": "registry:block",
  "title": "Lucky Draw",
  "description": "A giveaway with a slot machine and a prize table.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "cta"
  ],
  "internalDependencies": [
    "slot-machine"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/lucky-draw-01/components/lucky-draw-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "VenusUI `slot-machine`. The CLI installs them. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "For real prizes, decide the result on your server and only animate it here.",
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
