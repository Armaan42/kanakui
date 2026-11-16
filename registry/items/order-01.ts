import { defineItem } from "../define.ts"

export default defineItem({
  "name": "order-01",
  "type": "registry:block",
  "title": "Order Confirmation",
  "description": "An order confirmation with delivery progress, the items and a printing receipt.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "content"
  ],
  "registryDependencies": [
    "button"
  ],
  "internalDependencies": [
    "receipt-printer"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/order-01/components/order-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The items and steps are arrays at the top of the file.",
    "requirements": [
      "shadcn `button` and kanakui `receipt-printer`. The CLI installs them.",
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Mark the current step with `current: true` and finished ones with `done: true`."
    ],
    "accessibility": [
      "The current step has `aria-current=\"step\"` and each step says whether it's done, in progress or to come."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Blocks use your project’s theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
