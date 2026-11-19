import { defineItem } from "../define.ts"

export default defineItem({
  "name": "coffee-order-dial",
  "type": "registry:ui",
  "title": "Coffee Order Dial",
  "description": "A café dial for choosing a drink, with a cup that shows what goes into it.",
  "version": "0.1.0",
  "releasedAt": "2026-11-19",
  "categories": [
    "inputs",
    "interactive"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "registryDependencies": [
    "button"
  ],
  "files": [
    {
      "path": "registry/default/ui/coffee-order-dial.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "drinks",
        "type": "CoffeeDrink[]",
        "description": "Drinks, each with a price and cup layers."
      },
      {
        "name": "sizes",
        "type": "CoffeeSize[]",
        "description": "Sizes, with extra cost and cup fill."
      },
      {
        "name": "currency",
        "type": "string",
        "description": "Currency code.",
        "default": "\"USD\""
      },
      {
        "name": "locale",
        "type": "string",
        "description": "Locale for prices.",
        "default": "\"en-US\""
      },
      {
        "name": "onOrder",
        "type": "(order: CoffeeOrder) => void",
        "description": "Called by Add to order."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. shadcn `button`. The CLI installs it. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Each drink’s `layers` set the colours and proportions in the cup."
    ],
    "accessibility": [
      "Drinks and sizes are native radio buttons, so the dial works fully from the keyboard."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
