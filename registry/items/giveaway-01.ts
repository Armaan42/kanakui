import { defineItem } from "../define.ts"

export default defineItem({
  "name": "giveaway-01",
  "type": "registry:block",
  "title": "Giveaway Section",
  "description": "A spin-to-win giveaway with the rules and an email form to claim the prize.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "cta"
  ],
  "registryDependencies": [
    "button",
    "input"
  ],
  "internalDependencies": [
    "prize-wheel"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/giveaway-01/components/giveaway-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. Edit the segments and rules in the file.",
    "requirements": [
      "shadcn `button` and `input`, and VenusUI `prize-wheel`. The CLI installs them.",
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Decide prizes on your server and pass the result to the wheel's `pick`; send the claim form's email to your backend."
    ],
    "accessibility": [
      "The prize is announced by the wheel; the email field has a label that names the prize."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Blocks use your project’s theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
