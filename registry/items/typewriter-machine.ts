import { defineItem } from "../define.ts"

export default defineItem({
  "name": "typewriter-machine",
  "type": "registry:ui",
  "title": "Typewriter Machine",
  "description": "A typewriter whose carriage slides as you type, with a bell near the end of each line.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "inputs",
    "interactive"
  ],
  "files": [
    {
      "path": "registry/default/ui/typewriter-machine.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-typewriter-machine-strike": "typewriter-machine-strike 0.12s ease-out"
    }
  },
  "css": {
    "@keyframes typewriter-machine-strike": {
      "0%": {
        "transform": "translateY(2px) scale(.96)"
      },
      "100%": {
        "transform": "translateY(0) scale(1)"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "defaultValue",
        "type": "string",
        "description": "Starting text.",
        "default": "\"Dear reader,\\n\""
      },
      {
        "name": "columns",
        "type": "number",
        "description": "Characters per line.",
        "default": "30"
      },
      {
        "name": "onValueChange",
        "type": "(text: string) => void",
        "description": "Called as the text changes."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "The paper is a real text field, so it works with any keyboard, including phones."
    ],
    "accessibility": [
      "Typing goes into a labelled text field; the round keys are a pointer shortcut."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
