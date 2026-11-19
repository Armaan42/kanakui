import { defineItem } from "../define.ts"

export default defineItem({
  "name": "rubber-stamp",
  "type": "registry:ui",
  "title": "Rubber Stamp",
  "description": "A rubber stamp and a sheet of paper: click to stamp it, each impression a little crooked and worn.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive",
    "animations"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/rubber-stamp.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-rubber-stamp-press": "rubber-stamp-press 0.25s cubic-bezier(.3,1.5,.6,1) both",
      "animate-rubber-stamp-handle": "rubber-stamp-handle 0.3s ease-out"
    }
  },
  "css": {
    "@keyframes rubber-stamp-press": {
      "from": {
        "scale": "1.6",
        "opacity": "0"
      },
      "to": {
        "scale": "1",
        "opacity": "0.9"
      }
    },
    "@keyframes rubber-stamp-handle": {
      "0%, 100%": {
        "transform": "translateY(0)"
      },
      "40%": {
        "transform": "translateY(14px)"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "text",
        "type": "string",
        "description": "What the stamp says.",
        "default": "\"APPROVED\""
      },
      {
        "name": "ink",
        "type": "string",
        "description": "Ink colour.",
        "default": "\"#c2410c\""
      },
      {
        "name": "children",
        "type": "ReactNode",
        "description": "Content of the sheet."
      },
      {
        "name": "onStamp",
        "type": "(count: number) => void",
        "description": "Called after each stamp."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "Change `text` and `ink` for “PAID”, “SHIPPED” or “DRAFT”."
    ],
    "accessibility": [
      "A Stamp button stamps the middle of the sheet; the count is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
