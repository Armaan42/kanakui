import { defineItem } from "../define.ts"

export default defineItem({
  "name": "approvals-01",
  "type": "registry:block",
  "title": "Approvals Inbox",
  "description": "An approvals inbox: pick a request and stamp it to approve it.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "content"
  ],
  "internalDependencies": [
    "rubber-stamp"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/approvals-01/components/approvals-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "VenusUI `rubber-stamp`. The CLI installs them. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Load requests from your API and save the approval where `onStamp` fires.",
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
