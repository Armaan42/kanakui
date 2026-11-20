import { defineItem } from "../define.ts"

export default defineItem({
  "name": "call-support-01",
  "type": "registry:block",
  "title": "Call Support",
  "description": "A contact section where visitors dial a department on a rotary phone and see its hours and number.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "contact"
  ],
  "internalDependencies": [
    "rotary-phone"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/call-support-01/components/call-support-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "VenusUI `rotary-phone`. The CLI installs them. `lucide-react` for icons. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Edit `LINES`: one digit per department, with its hours and phone number.",
      "The businesses, people and prices in the demo are made up; replace them with your own."
    ],
    "accessibility": [
      "The phone dials from the keyboard, the dialled department is marked in the list, and the result is announced with a real `tel:` link."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Blocks use your project’s theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
