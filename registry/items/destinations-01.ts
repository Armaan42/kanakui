import { defineItem } from "../define.ts"

export default defineItem({
  "name": "destinations-01",
  "type": "registry:block",
  "title": "Travel Destinations",
  "description": "A travel album of postage stamps you postmark for each place you have been.",
  "version": "0.1.0",
  "releasedAt": "2026-11-19",
  "categories": [
    "content"
  ],
  "internalDependencies": [
    "postage-stamp"
  ],
  "files": [
    {
      "path": "registry/default/blocks/destinations-01/components/destinations-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "VenusUI `postage-stamp`. The CLI installs them. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Load `places` and the visited list from your own data.",
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
