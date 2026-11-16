import { defineItem } from "../define.ts"

export default defineItem({
  "name": "books-01",
  "type": "registry:block",
  "title": "Bookstore Section",
  "description": "A shelf of staff picks; pulling a book out shows its cover, rating, blurb and a reader review.",
  "version": "0.1.0",
  "releasedAt": "2026-11-16",
  "categories": [
    "content"
  ],
  "registryDependencies": [
    "button"
  ],
  "internalDependencies": [
    "bookshelf"
  ],
  "dependencies": [
    "lucide-react"
  ],
  "files": [
    {
      "path": "registry/default/blocks/books-01/components/books-01.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The books are an array at the top of the file.",
    "requirements": [
      "shadcn `button` and kanakui `bookshelf`. The CLI installs them.",
      "React 19 and Tailwind CSS v4."
    ],
    "customization": [
      "Each book carries its price, rating, blurb and one review; load them from your catalog."
    ],
    "accessibility": [
      "The details update politely when a book is picked; the rating is given as text."
    ],
    "troubleshooting": [
      {
        "problem": "Something looks different from the preview.",
        "solution": "Blocks use your project’s theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
