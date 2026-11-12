import { defineItem } from "../define.ts"

export default defineItem({
  "name": "ai-startup",
  "type": "registry:block",
  "title": "AI Startup",
  "description": "A bold launch page for an AI product, with a lamp-lit hero, glowing feature cards, a live bento grid, scrolling testimonials and a beam-rain call to action.",
  "version": "0.1.0",
  "releasedAt": "2026-11-12",
  "categories": [
    "templates"
  ],
  "internalDependencies": [
    "banner-01",
    "navbar-02",
    "hero-09",
    "logo-cloud-02",
    "features-06",
    "bento-01",
    "testimonials-02",
    "pricing-03",
    "faq-02",
    "cta-05",
    "footer-03"
  ],
  "files": [
    {
      "path": "registry/default/blocks/ai-startup/components/ai-startup.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The page is 11 blocks in order: `banner-01`, `navbar-02`, `hero-09`, `logo-cloud-02`, `features-06`, `bento-01`, `testimonials-02`, `pricing-03`, `faq-02`, `cta-05`, `footer-03`.",
    "requirements": [
      "The 11 kanakui blocks it is made of, and their components. The CLI installs all of them with this one command.",
      "React 19 and Tailwind CSS v4, with a `cn` helper at `@/lib/utils`."
    ],
    "customization": [
      "Sections: Announcement banner, floating navbar, lamp hero, logo grid, glow grid features, live bento grid, scrolling testimonials, single plan, two-column FAQ and a beam-rain call to action.",
      "Render `<AiStartup />` from `app/page.tsx` (or any route) to use it as that page.",
      "Every section is a separate file in `@/components/`. Edit the text and links there, or remove a section by deleting its line in the template.",
      "Swap any section for another block of the same kind, e.g. a different hero from the Blocks page.",
      "Colors, radius and dark mode come from your theme. Pick one on the Themes page and copy its CSS."
    ],
    "accessibility": [
      "The hero has the page's only `h1`; every other section starts at `h2`.",
      "Sections sit inside one `<main>`, with the navbar before it and the footer after it.",
      "Animated sections respect the user's reduced-motion setting."
    ],
    "troubleshooting": [
      {
        "problem": "The install asks to overwrite a file.",
        "solution": "Another kanakui item already added that file. Choose to overwrite only if you haven't edited it; otherwise keep yours."
      },
      {
        "problem": "A section looks different from the preview.",
        "solution": "Templates use your project's theme and your own shadcn components, so they follow your styles."
      }
    ]
  }
})
