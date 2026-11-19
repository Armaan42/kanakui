import { defineItem } from "../define.ts"

export default defineItem({
  "name": "podcast-01",
  "type": "registry:block",
  "title": "Podcast Episodes",
  "description": "A podcast page with expandable episodes to save and a rotary guest file.",
  "version": "0.1.0",
  "releasedAt": "2026-11-19",
  "categories": [
    "content"
  ],
  "registryDependencies": [
    "button"
  ],
  "internalDependencies": [
    "rolodex"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/podcast-01/components/podcast-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "shadcn `button` and VenusUI `rolodex`. The CLI installs them. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Load `episodes` and `guests` from your feed.",
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
