import { defineItem } from "../define.ts"

export default defineItem({
  "name": "credit-card-form",
  "type": "registry:ui",
  "title": "Credit Card Form",
  "description": "A card form with a live card that fills in as you type and turns over for the security code.",
  "version": "0.1.0",
  "releasedAt": "2026-11-19",
  "categories": [
    "inputs",
    "cards"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "registryDependencies": [
    "button",
    "input"
  ],
  "files": [
    {
      "path": "registry/default/ui/credit-card-form.tsx",
      "type": "registry:ui"
    }
  ],
  "docs": "This form validates locally and sends nothing. Use your payment provider's SDK to process cards.",
  "pageDocs": {
    "props": [
      {
        "name": "submitLabel",
        "type": "string",
        "description": "Button text.",
        "default": "\"Save card\""
      },
      {
        "name": "successMessage",
        "type": "string",
        "description": "Shown after valid details are submitted.",
        "default": "\"Card details look valid.\""
      },
      {
        "name": "onComplete",
        "type": "(details: CardDetails) => void",
        "description": "Receives the validated details."
      }
    ],
    "extends": "All `<form>` props except `onSubmit`.",
    "requirements": [
      "`lucide-react` for icons. shadcn `button` and `input`. The CLI installs them. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Pass `onComplete` details directly to your payment provider’s SDK. Never log them or store them on your own server."
    ],
    "accessibility": [
      "Each field has a label, the right `autocomplete` value and an error tied to it. The card picture is decorative."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
