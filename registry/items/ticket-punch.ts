import { defineItem } from "../define.ts"

export default defineItem({
  "name": "ticket-punch",
  "type": "registry:ui",
  "title": "Ticket Punch",
  "description": "A loyalty punch card: click a box to punch a circle, star or heart, and the paper drops out.",
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
      "path": "registry/default/ui/ticket-punch.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "animate-ticket-punch-chad": "ticket-punch-chad 0.9s ease-in forwards"
    }
  },
  "css": {
    "@keyframes ticket-punch-chad": {
      "0%": {
        "transform": "translateY(0) rotate(0deg)",
        "opacity": "1"
      },
      "100%": {
        "transform": "translateY(70px) rotate(160deg)",
        "opacity": "0"
      }
    }
  },
  "pageDocs": {
    "props": [
      {
        "name": "title",
        "type": "string",
        "description": "On the card.",
        "default": "\"Kiln Coffee\""
      },
      {
        "name": "reward",
        "type": "string",
        "description": "What a full card earns."
      },
      {
        "name": "slots",
        "type": "number",
        "description": "Boxes on the card, up to 10.",
        "default": "10"
      },
      {
        "name": "defaultShape",
        "type": "\"circle\" | \"star\" | \"heart\"",
        "description": "Punch shape.",
        "default": "\"star\""
      },
      {
        "name": "color",
        "type": "string",
        "description": "Card colour.",
        "default": "\"#0f766e\""
      },
      {
        "name": "sound",
        "type": "boolean",
        "description": "Play sounds (Web Audio, no files).",
        "default": "true"
      },
      {
        "name": "onComplete",
        "type": "() => void",
        "description": "Called when the card is full."
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "`lucide-react` for icons. React 19 and Tailwind CSS v4. The CLI adds the keyframes. Sound uses the Web Audio API, with no audio files."
    ],
    "customization": [
      "Holes are real cut-outs (an SVG mask), so the page shows through them."
    ],
    "accessibility": [
      "Every box is a button that says whether it’s punched, and progress is announced."
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
