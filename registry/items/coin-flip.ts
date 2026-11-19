import { defineItem } from "../define.ts"

export default defineItem({
  "name": "coin-flip",
  "type": "registry:ui",
  "title": "Coin Flip",
  "description": "A coin you can toss in 3D, with a fair result and a running tally.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive",
    "animations"
  ],
  "files": [
    {
      "path": "registry/default/ui/coin-flip.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-coin-flip-toss": "coin-flip-toss 1.4s cubic-bezier(.3,.7,.4,1)"
    }
  },
  "css": {
    "@keyframes coin-flip-toss": {
      "0%, 100%": {
        "transform": "translateY(0)"
      },
      "40%": {
        "transform": "translateY(-70px)"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "heads, tails",
        "type": "string",
        "description": "Labels on each side.",
        "default": "\"Heads\", \"Tails\""
      },
      {
        "name": "onFlip",
        "type": "(side: \"heads\" | \"tails\") => void",
        "description": "Called with each result."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "Rename the sides for decisions: “Ship it” and “Sleep on it”."
    ],
    "accessibility": [
      "The coin and Flip are buttons; the result and tally are announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
