import { defineItem } from "../define.ts"

export default defineItem({
  "name": "hero-13",
  "type": "registry:block",
  "title": "Messaging App Hero",
  "description": "A messaging-app hero with the pitch and features beside a live chat on a phone.",
  "version": "0.1.1",
  "releasedAt": "2026-11-16",
  "categories": [
    "hero"
  ],
  "registryDependencies": [
    "button"
  ],
  "internalDependencies": [
    "chat-thread"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/hero-13/components/hero-13.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. Edit the copy and the conversation in the file.",
    "requirements": [
      "shadcn `button` and kanakui `chat-thread`. The CLI installs them.",
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Swap the store buttons for official app store badges if you have them."
    ],
    "accessibility": [
      "One `h1`. The chat is a live `log` region, and its composer works with the keyboard."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Blocks use your project’s theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
