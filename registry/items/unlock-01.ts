import { defineItem } from "../define.ts"

export default defineItem({
  "name": "unlock-01",
  "type": "registry:block",
  "title": "Unlock Screen",
  "description": "A sign-in approval screen with a passcode pad and the details of the sign-in.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "auth"
  ],
  "internalDependencies": [
    "passcode-pad"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/unlock-01/components/unlock-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The demo passcode is 2580; replace `onSubmit` with a call to your server.",
    "requirements": [
      "VenusUI `passcode-pad`. The CLI installs it.",
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Fill the device and location from the sign-in request."
    ],
    "accessibility": [
      "Labelled by its `h2`; the pad announces progress and the result."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Blocks use your project’s theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
