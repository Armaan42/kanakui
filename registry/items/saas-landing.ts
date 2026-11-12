import { defineItem } from "../define.ts"

export default defineItem({
  "name": "saas-landing",
  "type": "registry:block",
  "title": "SaaS Landing",
  "description": "A complete landing page for a SaaS product: navbar, hero, logos, features, stats, pricing, testimonials, FAQ, call to action and footer.",
  "version": "0.1.0",
  "releasedAt": "2026-11-12",
  "categories": [
    "templates"
  ],
  "internalDependencies": [
    "navbar-01",
    "hero-01",
    "logo-cloud-01",
    "features-01",
    "features-03",
    "stats-01",
    "pricing-01",
    "testimonials-01",
    "faq-01",
    "cta-01",
    "footer-01"
  ],
  "files": [
    {
      "path": "registry/default/blocks/saas-landing/components/saas-landing.tsx",
      "type": "registry:component"
    }
  ],
  "pageDocs": {
    "props": [],
    "extends": "No props. The page is 11 blocks in order: `navbar-01`, `hero-01`, `logo-cloud-01`, `features-01`, `features-03`, `stats-01`, `pricing-01`, `testimonials-01`, `faq-01`, `cta-01`, `footer-01`.",
    "requirements": [
      "The 11 kanakui blocks it is made of, and their components. The CLI installs all of them with this one command.",
      "React 19 and Tailwind CSS v4, with a `cn` helper at `@/lib/utils`."
    ],
    "customization": [
      "Sections: Hero, logo cloud, feature grid, alternating features, stats, pricing tiers, testimonials, FAQ and a boxed call to action.",
      "Render `<SaasLanding />` from `app/page.tsx` (or any route) to use it as that page.",
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
