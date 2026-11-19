import { defineItem } from "../define.ts"

export default defineItem({
  "name": "size-guide-01",
  "type": "registry:block",
  "title": "Size Guide",
  "description": "A strap size guide: pull the tape to your measurement and the right size lights up.",
  "version": "0.1.0",
  "releasedAt": "2026-11-20",
  "categories": [
    "content"
  ],
  "internalDependencies": [
    "tape-measure"
  ],
  "files": [
    {
      "path": "registry/default/blocks/size-guide-01/components/size-guide-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The content is at the top of the file.",
    "requirements": [
      "VenusUI `tape-measure`. The CLI installs them. React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Edit `SIZES` for your own ranges and units.",
      "The people, businesses and numbers in the demo are made up; replace them with your own."
    ],
    "accessibility": [
      "The section is labelled by its heading, and every control works from the keyboard and announces its result."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Blocks use your project’s theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
