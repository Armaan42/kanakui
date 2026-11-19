import { defineItem } from "../define.ts"

export default defineItem({
  "name": "newtons-cradle",
  "type": "registry:ui",
  "title": "Newton's Cradle",
  "description": "A Newton's cradle: lift an end ball and the swing passes back and forth until it rests.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "animations",
    "interactive"
  ],
  "files": [
    {
      "path": "registry/default/ui/newtons-cradle.tsx",
      "type": "registry:ui"
    }
  ],
  "pageDocs": {
    "props": [
      {
        "name": "balls",
        "type": "number",
        "description": "Number of balls.",
        "default": "5"
      },
      {
        "name": "duration",
        "type": "number",
        "description": "Seconds before it rests.",
        "default": "7"
      }
    ],
    "extends": "All `<div>` props.",
    "requirements": [
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "A calm idle animation for dashboards or 404 pages."
    ],
    "accessibility": [
      "The end balls and the Lift button are buttons. Reduced motion keeps it still."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Components use your project’s theme tokens, so surrounding colours and radius follow your styles."
      }
    ]
  }
})
