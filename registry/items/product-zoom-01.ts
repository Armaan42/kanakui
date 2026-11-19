import { defineItem } from "../define.ts"

export default defineItem({
  "name": "product-zoom-01",
  "type": "registry:block",
  "title": "Product Zoom",
  "description": "A product page where shoppers inspect the photo with a magnifying glass.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "content"
  ],
  "registryDependencies": [
    "button"
  ],
  "internalDependencies": [
    "magnifier-loupe"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/product-zoom-01/components/product-zoom-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "shadcn `button` and VenusUI `magnifier-loupe`. The CLI installs them. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Swap the photo for a large, detailed shot; `zoom` sets how close the glass goes.",
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
