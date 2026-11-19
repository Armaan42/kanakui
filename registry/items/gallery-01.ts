import { defineItem } from "../define.ts"

export default defineItem({
  "name": "gallery-01",
  "type": "registry:block",
  "title": "Photo Gallery",
  "description": "A photo series on a strip of negatives that develop into a print.",
  "version": "0.1.0",
  "releasedAt": "2026-11-19",
  "categories": [
    "content"
  ],
  "internalDependencies": [
    "film-strip"
  ],
  "files": [
    {
      "path": "registry/default/blocks/gallery-01/components/gallery-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "VenusUI `film-strip`. The CLI installs them. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Replace the `frames` array with your own photographs.",
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
