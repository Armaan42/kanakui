import { defineItem } from "../define.ts"

export default defineItem({
  "name": "neon-sign",
  "type": "registry:ui",
  "title": "Neon Sign",
  "description": "A neon sign on a brick wall that flickers on, buzzes now and then, and takes your own words and colour.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "text",
    "animations"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/neon-sign.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-neon-sign-boot": "neon-sign-boot 1.2s linear both",
      "animate-neon-sign-buzz": "neon-sign-buzz 6s linear infinite"
    }
  },
  "css": {
    "@keyframes neon-sign-boot": {
      "0%": {
        "opacity": "0"
      },
      "10%": {
        "opacity": "1"
      },
      "12%": {
        "opacity": "0.2"
      },
      "20%": {
        "opacity": "1"
      },
      "24%": {
        "opacity": "0.3"
      },
      "30%, 100%": {
        "opacity": "1"
      }
    },
    "@keyframes neon-sign-buzz": {
      "0%, 88%, 100%": {
        "opacity": "1"
      },
      "89%": {
        "opacity": "0.2"
      },
      "90%": {
        "opacity": "1"
      },
      "92%": {
        "opacity": "0.15"
      },
      "94%": {
        "opacity": "1"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "defaultText",
        "type": "string",
        "description": "The sign’s words.",
        "default": "\"Open late\""
      },
      {
        "name": "editable",
        "type": "boolean",
        "description": "Show a field to change the words.",
        "default": "true"
      },
      {
        "name": "colors",
        "type": "NeonColor[]",
        "description": "Tube and glow colours."
      },
      {
        "name": "flickerAt",
        "type": "number",
        "description": "Index of a letter that buzzes now and then.",
        "default": "2"
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "Set `flickerAt` to -1 for a sign in perfect repair."
    ],
    "accessibility": [
      "The words are real text. Power and colours are buttons, and the flicker stops with reduced motion."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
