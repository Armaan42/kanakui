import { defineItem } from "../define.ts"

export default defineItem({
  "name": "portfolio-01",
  "type": "registry:block",
  "title": "Portfolio Grid",
  "description": "A studio portfolio with a filterable, editorial project grid.",
  "version": "0.1.0",
  "releasedAt": "2026-11-19",
  "categories": [
    "content"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/portfolio-01/components/portfolio-01.tsx",
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
      "Set each project’s `type` to create the filters and `wide` to change its span.",
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
