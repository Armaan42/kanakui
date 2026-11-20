import { defineItem } from "../define.ts"

export default defineItem({
  "name": "oracle-ball",
  "type": "registry:ui",
  "title": "Oracle Ball",
  "description": "A fortune-telling ball: ask a yes-or-no question, shake it, and an answer floats up in the window.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive",
    "animations"
  ],
  "files": [
    {
      "path": "registry/default/ui/oracle-ball.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-oracle-ball-shake": "oracle-ball-shake 0.9s ease-in-out",
      "animate-oracle-ball-rise": "oracle-ball-rise 0.9s ease-out both"
    }
  },
  "css": {
    "@keyframes oracle-ball-shake": {
      "0%, 100%": {
        "transform": "translate(0, 0) rotate(0deg)"
      },
      "15%": {
        "transform": "translate(-10px, 4px) rotate(-6deg)"
      },
      "30%": {
        "transform": "translate(10px, -4px) rotate(5deg)"
      },
      "45%": {
        "transform": "translate(-8px, 2px) rotate(-4deg)"
      },
      "60%": {
        "transform": "translate(8px, -2px) rotate(3deg)"
      },
      "75%": {
        "transform": "translate(-4px, 0) rotate(-2deg)"
      }
    },
    "@keyframes oracle-ball-rise": {
      "from": {
        "transform": "scale(0.5) rotate(-25deg)",
        "opacity": "0"
      },
      "to": {
        "transform": "scale(1) rotate(0deg)",
        "opacity": "1"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "answers",
        "type": "string[]",
        "description": "Answers it can give."
      },
      {
        "name": "onAnswer",
        "type": "(answer: string) => void",
        "description": "Called with each answer."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "Swap in your own `answers`, e.g. lunch spots."
    ],
    "accessibility": [
      "The question field and ball are labelled; the question and answer are announced together."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
