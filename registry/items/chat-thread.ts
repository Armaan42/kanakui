import { defineItem } from "../define.ts"

export default defineItem({
  "name": "chat-thread",
  "type": "registry:ui",
  "title": "Chat Thread",
  "description": "A messaging conversation that plays out with typing indicators; viewers can send replies too.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "data-display",
    "interactive"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/chat-thread.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "contact",
        "type": "{ name: string; avatar?: string; status?: string }",
        "description": "Shown in the header."
      },
      {
        "name": "messages",
        "type": "{ id: string; from: \"me\" | \"them\"; text: string }[]",
        "description": "The conversation so far."
      },
      {
        "name": "replies",
        "type": "string[]",
        "description": "Answers the contact gives, in turn, when the viewer sends a message."
      },
      {
        "name": "autoplay",
        "type": "boolean",
        "default": "true",
        "description": "Play the conversation out message by message."
      }
    ],
    "extends": "All `<div>` props; `className` sizes it (30rem tall by default).",
    "requirements": [
      "`lucide-react` for the send icon. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "It's a demo conversation, not a chat client. For a real one, render your messages and send them from the form's submit handler."
    ],
    "accessibility": [
      "Messages are a `log` region, so new ones are announced, each prefixed with who sent it.",
      "The typing indicator has text for screen readers; the message field has a label.",
      "With reduced motion the conversation shows at once."
    ],
    "troubleshooting": [
      {
        "problem": "Emoji look different from the preview.",
        "solution": "Emoji are drawn by the visitor's operating system."
      }
    ]
  }
})
