import { defineItem } from "../define.ts"

export default defineItem({
  "name": "menu-01",
  "type": "registry:block",
  "title": "Restaurant Menu",
  "description": "A menu by course where the photo follows the dish you point at or focus.",
  "version": "0.1.0",
  "releasedAt": "2026-11-19",
  "categories": [
    "content"
  ],
  "registryDependencies": [
    "tabs"
  ],
  "files": [
    {
      "path": "registry/default/blocks/menu-01/components/menu-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "shadcn `tabs`. The CLI installs them. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Each course and dish lives in the `menu` array.",
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
