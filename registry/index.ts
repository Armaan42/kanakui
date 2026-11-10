import type { RegistryEntry } from "./types.ts"

/**
 * Every item this registry publishes. `scripts/registry.mts` turns this list
 * into `registry.json`, then `shadcn build` writes `public/r/<name>.json`.
 *
 * Source files live in `registry/default/{ui,hooks,lib,blocks}` because the
 * shadcn CLI rewrites `@/registry/<style>/<kind>/...` imports to the
 * consumer's matching alias (ui, hooks, lib, components).
 */
export const registryItems: RegistryEntry[] = [
  // ---------------------------------------------------------------- lib
  {
    name: "compose-refs",
    type: "registry:lib",
    title: "Compose Refs",
    description: "Merge multiple React refs into a single callback ref.",
    version: "0.1.0",
    releasedAt: "2026-11-10",
    categories: ["utilities"],
    files: [{ path: "registry/default/lib/compose-refs.ts", type: "registry:lib" }],
  },

  // -------------------------------------------------------------- hooks
  {
    name: "use-pointer-position",
    type: "registry:hook",
    title: "usePointerPosition",
    description:
      "Expose the pointer position over an element as CSS variables, without re-rendering.",
    version: "0.1.0",
    releasedAt: "2026-11-10",
    categories: ["hooks", "interactive"],
    files: [
      { path: "registry/default/hooks/use-pointer-position.ts", type: "registry:hook" },
    ],
  },

  // ----------------------------------------------------------------- ui
  {
    name: "spotlight-card",
    featured: true,
    type: "registry:ui",
    title: "Spotlight Card",
    description: "A card with a soft light that follows the pointer.",
    version: "0.1.0",
    releasedAt: "2026-11-10",
    categories: ["cards", "effects", "interactive"],
    internalDependencies: ["use-pointer-position", "compose-refs"],
    files: [{ path: "registry/default/ui/spotlight-card.tsx", type: "registry:ui" }],
  },
  {
    name: "animated-card",
    featured: true,
    type: "registry:ui",
    title: "Animated Card",
    description: "A card that tilts in 3D toward the pointer with spring physics.",
    version: "0.1.0",
    releasedAt: "2026-11-10",
    categories: ["cards", "animations", "interactive"],
    dependencies: ["motion"],
    files: [{ path: "registry/default/ui/animated-card.tsx", type: "registry:ui" }],
  },
  {
    name: "shimmer-button",
    featured: true,
    type: "registry:ui",
    title: "Shimmer Button",
    description: "A primary button with a light sweep across its surface.",
    version: "0.1.0",
    releasedAt: "2026-11-10",
    categories: ["buttons", "animations"],
    files: [{ path: "registry/default/ui/shimmer-button.tsx", type: "registry:ui" }],
    cssVars: {
      theme: {
        "animate-shimmer": "shimmer 2.5s linear infinite",
      },
    },
    css: {
      "@keyframes shimmer": {
        from: { "background-position": "200% 0" },
        to: { "background-position": "-200% 0" },
      },
    },
  },

  // ------------------------------------------------------------- blocks
  // Block files live in registry/default/blocks/<name>/components/ so the CLI
  // installs them to @/components/ and their imports of each other resolve.
  {
    name: "hero-01",
    type: "registry:block",
    featured: true,
    title: "Centered Hero",
    description: "A centered hero with an announcement link, two calls to action and a product window placeholder.",
    version: "0.1.0",
    releasedAt: "2026-11-10",
    categories: ["hero"],
    registryDependencies: ["button"],
    dependencies: ["lucide-react"],
    internalDependencies: ["shimmer-button"],
    files: [{ path: "registry/default/blocks/hero-01/components/hero-01.tsx", type: "registry:component" }],
  },
  {
    name: "pricing-01",
    type: "registry:block",
    featured: true,
    title: "Pricing Tiers",
    description: "Three pricing plans with a monthly and yearly switch and a highlighted plan.",
    version: "0.1.0",
    releasedAt: "2026-11-10",
    categories: ["pricing"],
    registryDependencies: ["button"],
    dependencies: ["lucide-react"],
    files: [
      { path: "registry/default/blocks/pricing-01/components/pricing-01.tsx", type: "registry:component" },
      { path: "registry/default/blocks/pricing-01/components/pricing-01-plans.ts", type: "registry:component" },
    ],
  },
  {
    name: "footer-01",
    type: "registry:block",
    featured: true,
    title: "Multi-column Footer",
    description: "A footer with a brand column, three link columns and a legal bar.",
    version: "0.1.0",
    releasedAt: "2026-11-10",
    categories: ["footers"],
    files: [{ path: "registry/default/blocks/footer-01/components/footer-01.tsx", type: "registry:component" }],
  },
]
