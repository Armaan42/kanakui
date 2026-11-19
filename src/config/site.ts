/**
 * Single source of truth for site identity and registry addressing.
 * Nothing else in the codebase should hardcode the namespace or domain.
 *
 * Values come from environment variables (see .env.example) so the same
 * code serves localhost, Vercel previews and production.
 */

const DEFAULT_SITE_URL = "http://localhost:3000";
const DEFAULT_NAMESPACE = "@venusui";

function normalizeNamespace(value: string): string {
  const ns = value.startsWith("@") ? value : `@${value}`;
  // Matches the shadcn CLI's namespace rule: letters, digits, "-" and "_",
  // starting and ending with a letter or digit.
  if (!/^@[a-zA-Z0-9](?:[a-zA-Z0-9-_]*[a-zA-Z0-9])?$/.test(ns)) {
    throw new Error(`Invalid registry namespace: "${value}"`);
  }
  return ns;
}

function normalizeUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

/**
 * Resolution order:
 * 1. NEXT_PUBLIC_SITE_URL: explicit override (local dev, tests, custom setups).
 * 2. The project's production domain, which Vercel provides at build time:
 *    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL is exposed to Next.js apps
 *    (and inlined for the browser); VERCEL_PROJECT_PRODUCTION_URL is the
 *    system variable that the registry script sees. Both are a bare hostname
 *    (e.g. "venusui.vercel.app") and switch to the custom domain once one is
 *    added. Preview deployments use it too, because preview URLs sit behind
 *    Vercel's deployment protection and the shadcn CLI cannot fetch from them.
 * 3. http://localhost:3000.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const vercelHost =
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelHost) return `https://${vercelHost}`;
  return DEFAULT_SITE_URL;
}

const url = normalizeUrl(resolveSiteUrl());
const namespace = normalizeNamespace(
  process.env.NEXT_PUBLIC_REGISTRY_NAMESPACE ?? DEFAULT_NAMESPACE,
);

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "VenusUI",
  description:
    "Production-ready React components, blocks and templates you can install with the shadcn CLI.",
  url,
  links: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/Armaan42/venusui",
  },
  /** License of the free registry items. Must match the LICENSE file. */
  license: {
    name: "MIT",
    url: `${process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/Armaan42/venusui"}/blob/main/LICENSE`,
  },
  /** Main navigation. Only list pages that exist. Below `md` these move into the menu panel. */
  nav: [
    { title: "Components", href: "/components" },
    { title: "Blocks", href: "/blocks" },
    { title: "Templates", href: "/templates" },
    { title: "Themes", href: "/themes" },
    { title: "Docs", href: "/docs" },
  ],
  registry: {
    namespace,
    /** Public path where `shadcn build` output is served (public/r → /r). */
    basePath: "/r",
  },
} as const;

/** URL template consumers put in components.json → registries. */
export function registryUrlTemplate(): string {
  return `${siteConfig.url}${siteConfig.registry.basePath}/{name}.json`;
}

/** Absolute URL of a single registry item's JSON. */
export function registryItemUrl(name: string): string {
  return `${siteConfig.url}${siteConfig.registry.basePath}/${name}.json`;
}

/**
 * `npx shadcn@latest add @venusui/name`: the main install command. @venusui is
 * listed in the official shadcn registry index (ui.shadcn.com/r/registries.json),
 * so it works in any shadcn project with no setup. A fork that changes the
 * namespace or domain must be listed too, or switch the site back to the
 * by-URL commands.
 */
export function installCommand(name: string): string {
  return `npx shadcn@latest add ${siteConfig.registry.namespace}/${name}`;
}

/** The same install by full address: for older CLIs or a registry that isn't indexed. */
export function installCommandByUrl(name: string): string {
  return `npx shadcn@latest add ${registryItemUrl(name)}`;
}

/** Adds the namespace to components.json (used by the MCP server). The index supplies the address. */
export function registrySetupCommand(): string {
  return `npx shadcn@latest registry add ${siteConfig.registry.namespace}`;
}

/** Registers the namespace with its address, for CLIs that can't reach the index. */
export function registrySetupCommandByUrl(): string {
  return `npx shadcn@latest registry add ${siteConfig.registry.namespace}=${registryUrlTemplate()}`;
}
