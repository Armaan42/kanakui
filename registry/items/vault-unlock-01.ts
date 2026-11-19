import { defineItem } from "../define.ts"

export default defineItem({
  "name": "vault-unlock-01",
  "type": "registry:block",
  "title": "Vault Unlock",
  "description": "A second sign-in step where you dial a three-part code into a safe.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "auth"
  ],
  "internalDependencies": [
    "safe-dial"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/vault-unlock-01/components/vault-unlock-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "VenusUI `safe-dial`. The CLI installs them. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "The code is for show; check the real one on your server in `onUnlock`.",
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
