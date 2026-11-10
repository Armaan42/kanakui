import { defineItem } from "../define.ts"

export default defineItem({
  name: "pricing-01",
  type: "registry:block",
  featured: true,
  title: "Pricing Tiers",
  description: "Three pricing plans with a monthly and yearly switch and a highlighted plan.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: [
    "pricing"
  ],
  registryDependencies: [
    "button"
  ],
  dependencies: [
    "lucide-react"
  ],
  files: [
    {
      path: "registry/default/blocks/pricing-01/components/pricing-01.tsx",
      type: "registry:component"
    },
    {
      path: "registry/default/blocks/pricing-01/components/pricing-01-plans.ts",
      type: "registry:component"
    }
  ],
  pageDocs: {
    props: [],
    extends: "No props. Plans are in `pricing-01-plans.ts`; the layout and billing switch are in `pricing-01.tsx`.",
    requirements: [
      "shadcn `button`. The CLI installs it.",
      "React 19 and Tailwind CSS v4, with a `cn` helper at `@/lib/utils`."
    ],
    customization: [
      "Edit plans in `pricing-01-plans.ts`: `monthly` and `yearly` are prices per month, and `highlighted` marks the recommended plan.",
      "Prices are formatted as USD by `formatPrice` at the bottom of `pricing-01.tsx`. Change the currency there, e.g. `currency: \"INR\"` with locale `en-IN`.",
      "The “Save 20%” label is text. Update it if you change the yearly discount.",
      "The plan buttons have no action yet. Wrap them in links to your sign-up or checkout pages."
    ],
    accessibility: [
      "The billing switch is a group of two buttons with `aria-pressed`, so screen readers announce which period is selected.",
      "Plans are a list, and each plan’s features are a nested list."
    ],
    troubleshooting: [
      {
        problem: "`Module not found: Can't resolve '@/components/pricing-01-plans'`.",
        solution: "Both files must be in the same folder, `@/components/`. The CLI puts them there; after a manual install, check you created both."
      }
    ]
  }
})
