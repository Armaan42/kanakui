/**
 * Every category an item may use. `scripts/registry.mts` rejects any item
 * category that is not listed here. The site only shows categories that
 * contain at least one component, so listing a category here never creates
 * an empty page.
 */
export interface RegistryCategory {
  slug: string
  title: string
  description: string
}

export const registryCategories: RegistryCategory[] = [
  { slug: "buttons", title: "Buttons", description: "Buttons and call-to-action controls." },
  { slug: "cards", title: "Cards", description: "Containers for grouping related content." },
  { slug: "navigation", title: "Navigation", description: "Menus, tabs and ways to move around a site." },
  { slug: "forms", title: "Forms", description: "Form layouts and form controls." },
  { slug: "inputs", title: "Inputs", description: "Text fields, selects and other input controls." },
  { slug: "backgrounds", title: "Backgrounds", description: "Decorative backgrounds and surfaces." },
  { slug: "effects", title: "Effects", description: "Visual effects such as glows, lights and reveals." },
  { slug: "animations", title: "Animations", description: "Components built around motion." },
  { slug: "text", title: "Text animations", description: "Animated headings, counters and typing effects." },
  { slug: "loaders", title: "Loaders", description: "Spinners, skeletons and progress indicators." },
  { slug: "interactive", title: "Interactive", description: "Components that respond to the pointer or keyboard." },
  { slug: "hooks", title: "Hooks", description: "React hooks used by components." },
  // Block categories
  { slug: "hero", title: "Hero sections", description: "The first section of a landing page: headline, pitch and calls to action." },
  { slug: "features", title: "Features", description: "Sections that explain what a product does." },
  { slug: "pricing", title: "Pricing", description: "Plans, prices and feature comparisons." },
  { slug: "testimonials", title: "Testimonials", description: "Quotes and social proof from customers." },
  { slug: "cta", title: "Calls to action", description: "Sections that ask the visitor to take the next step." },
  { slug: "footers", title: "Footers", description: "Site footers with links, legal text and social links." },
  { slug: "navbars", title: "Navigation bars", description: "Site headers and top navigation." },
  { slug: "logo-clouds", title: "Logo clouds", description: "Rows of customer or partner logos." },
  { slug: "stats", title: "Statistics", description: "Sections that highlight key numbers." },
  { slug: "utilities", title: "Utilities", description: "Small helper functions used by components." },
]
