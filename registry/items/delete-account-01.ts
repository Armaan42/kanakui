import { defineItem } from "../define.ts"

export default defineItem({
  "name": "delete-account-01",
  "type": "registry:block",
  "title": "Delete Account",
  "description": "Account deletion where shredding the page is the final confirmation.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "auth"
  ],
  "internalDependencies": [
    "paper-shredder"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/delete-account-01/components/delete-account-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "VenusUI `paper-shredder`. The CLI installs them. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Run the real deletion in `onShred`, and keep the typed confirmation.",
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
