import { defineItem } from "../define.ts"

export default defineItem({
  "name": "deck-of-cards",
  "type": "registry:ui",
  "title": "Deck of Cards",
  "description": "A deck of 52 cards: riffle-shuffle, deal five, and it names your poker hand.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive",
    "cards"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/deck-of-cards.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-deck-of-cards-riffle": "deck-of-cards-riffle 0.6s ease-in-out",
      "animate-deck-of-cards-deal": "deck-of-cards-deal 0.5s cubic-bezier(.2,.8,.3,1) both"
    }
  },
  "css": {
    "@keyframes deck-of-cards-riffle": {
      "0%, 100%": {
        "transform": "translateX(0) rotate(0deg)"
      },
      "25%": {
        "transform": "translateX(-6px) rotate(-4deg)"
      },
      "50%": {
        "transform": "translateX(6px) rotate(4deg)"
      },
      "75%": {
        "transform": "translateX(-3px) rotate(-2deg)"
      }
    },
    "@keyframes deck-of-cards-deal": {
      "from": {
        "transform": "translate(-160px, -20px) rotate(-20deg)",
        "opacity": "0"
      },
      "to": {
        "transform": "translate(0, 0) rotate(0deg)",
        "opacity": "1"
      }
    }
  },
  "pageDocs": {
    "props": [],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "`handName` is exported-ready logic you can reuse for other card games."
    ],
    "accessibility": [
      "The hand is a list of named cards, and the poker hand is announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
