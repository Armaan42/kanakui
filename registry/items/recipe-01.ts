import { defineItem } from "../define.ts"

export default defineItem({
  "name": "recipe-01",
  "type": "registry:block",
  "title": "Recipe Page",
  "description": "A recipe whose servings rescale the ingredients, with tick-off lists for cooking.",
  "version": "0.1.0",
  "releasedAt": "2026-11-19",
  "categories": [
    "content"
  ],
  "registryDependencies": [
    "button"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/recipe-01/components/recipe-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "shadcn `button`. The CLI installs them. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Amounts in `ingredients` are written for `BASE_SERVINGS`.",
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
