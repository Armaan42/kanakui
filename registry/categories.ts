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
  { slug: "loaders", title: "Loaders", description: "Spinners, skeletons and progress indicators." },
  { slug: "interactive", title: "Interactive", description: "Components that respond to the pointer or keyboard." },
  { slug: "hooks", title: "Hooks", description: "React hooks used by components." },
  { slug: "utilities", title: "Utilities", description: "Small helper functions used by components." },
]
