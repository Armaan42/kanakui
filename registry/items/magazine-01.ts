import { defineItem } from "../define.ts"

export default defineItem({
  "name": "magazine-01",
  "type": "registry:block",
  "title": "Magazine Story",
  "description": "A long-form story with a full-width opener, drop cap and pull quote.",
  "version": "0.1.0",
  "releasedAt": "2026-11-19",
  "categories": [
    "content"
  ],
  "files": [
    {
      "path": "registry/default/blocks/magazine-01/components/magazine-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Replace the text and photos; the layout needs no JavaScript.",
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
