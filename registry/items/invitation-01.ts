import { defineItem } from "../define.ts"

export default defineItem({
  "name": "invitation-01",
  "type": "registry:block",
  "title": "Invitation & RSVP",
  "description": "An invitation with an opening envelope, the day's schedule, the venue and a working RSVP form.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "contact",
    "content"
  ],
  "registryDependencies": [
    "button",
    "input"
  ],
  "internalDependencies": [
    "envelope"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/invitation-01/components/invitation-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. Edit the schedule and copy in the file.",
    "requirements": [
      "shadcn `button` and `input`, and kanakui `envelope`. The CLI installs them.",
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "The form shows a thank-you message but doesn't send anything yet: post the `FormData` to your backend in `onSubmit`.",
      "Guests and dietary fields appear only when the guest is attending."
    ],
    "accessibility": [
      "Every field has a visible label; the attend/decline choice is a fieldset of radios.",
      "The thank-you message is announced (`role=\"status\"`)."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Blocks use your project’s theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
