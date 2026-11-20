import { defineItem } from "../define.ts"

export default defineItem({
  "name": "piggy-bank",
  "type": "registry:ui",
  "title": "Piggy Bank",
  "description": "A see-through piggy bank with a savings goal: drop in coins, shake it, and break it open at the goal.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "interactive",
    "data-display"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/ui/piggy-bank.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-piggy-bank-coin": "piggy-bank-coin 0.6s ease-in forwards",
      "animate-piggy-bank-wobble": "piggy-bank-wobble 0.5s ease-out"
    }
  },
  "css": {
    "@keyframes piggy-bank-coin": {
      "0%": {
        "transform": "translateY(-10px)",
        "opacity": "1"
      },
      "80%": {
        "transform": "translateY(40px)",
        "opacity": "1"
      },
      "100%": {
        "transform": "translateY(48px)",
        "opacity": "0"
      }
    },
    "@keyframes piggy-bank-wobble": {
      "0%, 100%": {
        "transform": "rotate(0deg)"
      },
      "25%": {
        "transform": "rotate(-4deg)"
      },
      "50%": {
        "transform": "rotate(3deg)"
      },
      "75%": {
        "transform": "rotate(-1.5deg)"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "goal",
        "type": "number",
        "description": "The savings goal.",
        "default": "50"
      },
      {
        "name": "coins",
        "type": "number[]",
        "description": "Coin values to drop in.",
        "default": "[1, 2, 5, 10]"
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Symbol before amounts.",
        "default": "\"$\""
      },
      {
        "name": "sound",
        "type": "boolean",
        "description": "Play coin clinks.",
        "default": "true"
      },
      {
        "name": "onSave",
        "type": "(total: number) => void",
        "description": "Called after each coin."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes. Sound uses the Web Audio API, with no audio files."
    ],
    "customization": [
      "Use it for savings goals or fundraisers; feed `onSave` to your backend."
    ],
    "accessibility": [
      "Coins are buttons with their value; the total and what’s left to go are announced."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      },
      {
        "problem": "There’s no sound.",
        "solution": "Browsers only play audio after a click or key press on the page, and the device must not be muted. Pass `sound={false}` to turn it off."
      }
    ]
  }
})
