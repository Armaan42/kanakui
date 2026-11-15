import { defineItem } from "../define.ts"

export default defineItem({
  "name": "notification-stack",
  "type": "registry:ui",
  "title": "Notification Stack",
  "description": "Phone-style stacked notifications with frosted glass that fan out into a list on hover or click.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "data-display",
    "animations"
  ],
  "files": [
    {
      "path": "registry/default/ui/notification-stack.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "notifications",
        "type": "StackNotification[]",
        "description": "Each has `id`, `app`, `title`, `body`, `time`, and optionally `icon`, `iconClassName` (icon background) and `avatar` (a photo URL)."
      },
      {
        "name": "heading",
        "type": "string",
        "default": "\"Notifications\"",
        "description": "Heading above the stack."
      },
      {
        "name": "expanded, defaultExpanded",
        "type": "boolean",
        "description": "Controlled or initial state. Unset, it fans out on hover and toggles with the button or a click."
      },
      {
        "name": "onExpandedChange",
        "type": "(expanded: boolean) => void",
        "description": "Called when the button or a click expands or collapses it."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Put it over a photo or gradient to show off the frosted glass, as in the demo.",
      "Cards are 76px tall with two lines of body text; keep bodies short."
    ],
    "accessibility": [
      "Every notification is always in the list for screen readers, with the app name before the message.",
      "“Show all” / “Show less” is a real button with `aria-expanded`; hovering and clicking the stack are pointer shortcuts.",
      "With reduced motion it expands without animation."
    ],
    "troubleshooting": [
      {
        "problem": "The glass looks solid.",
        "solution": "Frosted glass needs something colorful behind it; on a plain background it looks like a white card."
      }
    ]
  }
})
