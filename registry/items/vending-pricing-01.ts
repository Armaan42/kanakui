import { defineItem } from "../define.ts"

export default defineItem({
  "name": "vending-pricing-01",
  "type": "registry:block",
  "title": "Vending Pricing",
  "description": "A pricing section in a vending machine: key in a code or tap a plan, and it drops into the tray with its details.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "pricing"
  ],
  "registryDependencies": [
    "button"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/vending-pricing-01/components/vending-pricing-01.tsx",
      "type": "registry:component"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-vending-pricing-01-drop": "vending-pricing-01-drop 1.1s cubic-bezier(.5,0,.75,0) forwards",
      "animate-vending-pricing-01-coil": "vending-pricing-01-coil 0.3s linear infinite",
      "animate-vending-pricing-01-land": "vending-pricing-01-land 0.45s cubic-bezier(.3,1.5,.5,1) both"
    }
  },
  "css": {
    "@keyframes vending-pricing-01-drop": {
      "0%": {
        "transform": "translateY(0) rotate(0deg)",
        "opacity": "1"
      },
      "25%": {
        "transform": "translateY(-3px) rotate(-3deg)",
        "opacity": "1"
      },
      "100%": {
        "transform": "translateY(340%) rotate(16deg)",
        "opacity": "0"
      }
    },
    "@keyframes vending-pricing-01-coil": {
      "from": {
        "transform": "translateX(0)"
      },
      "to": {
        "transform": "translateX(-16px)"
      }
    },
    "@keyframes vending-pricing-01-land": {
      "from": {
        "transform": "translateY(-28px) rotate(-8deg)",
        "opacity": "0"
      },
      "to": {
        "transform": "translateY(0) rotate(0deg)",
        "opacity": "1"
      }
    }
  },
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "shadcn `button`. The CLI installs them. `lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes."
    ],
    "customization": [
      "Edit `ITEMS`: row A holds plans and row B add-ons, each with its own wrapper colours and features.",
      "The businesses, people and prices in the demo are made up; replace them with your own."
    ],
    "accessibility": [
      "Every product and key is a button, the keypad screen and the details panel are announced, and a plain price list shows before anything is picked."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Blocks use your project’s theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
