import { defineItem } from "../define.ts"

export default defineItem({
  "name": "postage-stamp",
  "type": "registry:ui",
  "title": "Postage Stamp",
  "description": "A perforated stamp with a photo that takes a postmark when you press it.",
  "version": "0.1.0",
  "releasedAt": "2026-11-19",
  "categories": [
    "cards",
    "interactive"
  ],
  "files": [
    {
      "path": "registry/default/ui/postage-stamp.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-postage-stamp-thud": "postage-stamp-thud 0.28s cubic-bezier(0.3, 1.4, 0.6, 1) both"
    }
  },
  "css": {
    "@keyframes postage-stamp-thud": {
      "0%": {
        "transform": "scale(1.5)",
        "opacity": "0"
      },
      "100%": {
        "transform": "scale(1)",
        "opacity": "1"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "src, alt",
        "type": "string",
        "description": "The photo."
      },
      {
        "name": "title, country",
        "type": "string",
        "description": "Printed on the stamp."
      },
      {
        "name": "value",
        "type": "string",
        "description": "Face value."
      },
      {
        "name": "postmark",
        "type": "{ place: string; date: string }",
        "description": "Text in the postmark."
      },
      {
        "name": "cancelled",
        "type": "boolean",
        "description": "Controlled postmark state."
      },
      {
        "name": "defaultCancelled",
        "type": "boolean",
        "description": "Start postmarked.",
        "default": "false"
      },
      {
        "name": "onCancelledChange",
        "type": "(cancelled: boolean) => void",
        "description": "Called when pressed."
      }
    ],
    "extends": "All `<button>` props; `className` sets the width.",
    "requirements": [
      "React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "Portrait photos at 4:5 fit best."
    ],
    "accessibility": [
      "The stamp is a toggle button that says whether it is postmarked."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
