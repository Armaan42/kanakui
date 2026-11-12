import { defineItem } from "../define.ts"

const files = ["", "-navbar", "-hero", "-dashboard", "-logos", "-features", "-customers", "-pricing", "-faq", "-cta", "-footer", "-logo"]

export default defineItem({
  name: "saas-landing",
  type: "registry:block",
  title: "SaaS Landing",
  description:
    "A complete marketing site for a product analytics startup, with real photos, a product dashboard, feature mockups, a customer story, pricing, FAQ and footer.",
  version: "0.2.0",
  releasedAt: "2026-11-12",
  categories: ["templates"],
  registryDependencies: ["button", "input"],
  // The template's brand colors: indigo and emerald, lighter in dark mode.
  cssVars: {
    theme: { "color-saas-primary": "var(--saas-primary)", "color-saas-accent": "var(--saas-accent)" },
    light: { "saas-primary": "oklch(0.511 0.262 276.966)", "saas-accent": "oklch(0.596 0.145 163.225)" },
    dark: { "saas-primary": "oklch(0.673 0.182 276.935)", "saas-accent": "oklch(0.765 0.177 163.223)" },
  },
  dependencies: ["lucide-react"],
  files: [
    ...files.map((suffix) => ({
      path: `registry/default/blocks/saas-landing/components/saas-landing${suffix}.tsx`,
      type: "registry:component" as const,
    })),
    { path: "registry/default/blocks/saas-landing/components/saas-landing-media.ts", type: "registry:component" },
  ],
  pageDocs: {
    props: [],
    extends:
      "No props. `saas-landing.tsx` puts the sections in order; each section is its own `saas-landing-*.tsx` file with its copy inside.",
    requirements: [
      "shadcn `button` and `input`, and `lucide-react`. The CLI installs them.",
      "React 19 and Tailwind CSS v4, with a `cn` helper at `@/lib/utils`. The CLI adds the template’s two brand colors to your `globals.css`.",
      "An internet connection for the photos, which load from Unsplash’s image CDN.",
    ],
    customization: [
      "Render `<SaasLanding />` from `app/page.tsx`, or render single sections such as `<SaasLandingPricing />` on other pages.",
      "Pulsewise and its customers are made up. Change the name and mark in `saas-landing-logo.tsx`, then the copy in each section file.",
      "Photos are free Unsplash images listed in `saas-landing-media.ts`. Swap in your own photos there, and keep the `alt` text accurate.",
      "To serve photos through `next/image`, add `images.unsplash.com` to `images.remotePatterns` in `next.config.ts`, or move your own photos into `public/`.",
      "The hero dashboard (`saas-landing-dashboard.tsx`) is HTML, so it follows your theme. Replace it with a screenshot of your product when you have one.",
      "Plans and prices are in `saas-landing-pricing.tsx`. Prices are per month in USD, with a yearly price per plan.",
      "Brand colors are `--saas-primary` (indigo) and `--saas-accent` (emerald) in your `globals.css`, with lighter values for dark mode. Change them there; everything else follows your theme.",
    ],
    accessibility: [
      "One `h1` in the hero; every section is labelled by its own `h2`.",
      "The navbar collapses into a disclosure menu on small screens that closes on Escape and returns focus to its toggle.",
      "The dashboard and feature mockups are announced as one image with a text description, not as dozens of numbers.",
      "The billing switch uses `aria-pressed`, FAQ items are native `<details>` elements, and the newsletter field has a visible label.",
      "Testimonial photos have empty `alt` text because the person’s name is right next to them; the case study photo is described.",
    ],
    troubleshooting: [
      {
        problem: "Photos don’t show up.",
        solution:
          "They load from `images.unsplash.com`. Check your network and any Content Security Policy (`img-src`), or replace them with local images.",
      },
      {
        problem: "The indigo and emerald accents are missing.",
        solution: "The CLI adds `--saas-primary` and `--saas-accent` to `globals.css`, plus `--color-saas-*` in `@theme inline`. If you installed by hand, copy them from the registry JSON.",
      },
      {
        problem: "Lint warns about `<img>` elements.",
        solution: "Next.js suggests `next/image`. The template uses `<img>` so it works in any React app; switch to `next/image` if you like (see Customization).",
      },
    ],
  },
})
