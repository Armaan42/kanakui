import { defineItem } from "../define.ts"

export default defineItem({
  "name": "office-directory-01",
  "type": "registry:block",
  "title": "Office Directory",
  "description": "A building directory as an elevator: press a floor, ride up, and the doors open on who works there.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "content"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/office-directory-01/components/office-directory-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Edit `FLOORS`: each floor has a label, tenant, details and photo. `DOORS` and `PER_FLOOR` set the timing.",
      "The businesses, people and prices in the demo are made up; replace them with your own."
    ],
    "accessibility": [
      "Floor buttons say which tenant is on each floor, the ride is announced, and a plain list of floors follows the car. Reduced motion skips the ride."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Blocks use your project’s theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
