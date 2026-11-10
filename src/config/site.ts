/**
 * Single source of truth for site identity and registry addressing.
 * Nothing else in the codebase should hardcode the namespace or domain.
 *
 * Values come from environment variables (see .env.example) so the same
 * code serves localhost, Vercel previews and production.
 */

const DEFAULT_SITE_URL = "http://localhost:3000";
const DEFAULT_NAMESPACE = "@kanakui"; // placeholder until the final name is chosen

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

const url = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL);
const namespace = normalizeNamespace(
  process.env.NEXT_PUBLIC_REGISTRY_NAMESPACE ?? DEFAULT_NAMESPACE,
);

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "kanakui",
  description:
    "Production-ready React components, blocks and templates you can install with the shadcn CLI.",
  url,
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

/** `npx shadcn@latest add @ns/name`: works once the namespace is configured or indexed. */
export function installCommand(name: string): string {
  return `npx shadcn@latest add ${siteConfig.registry.namespace}/${name}`;
}

/** Works with zero consumer configuration. */
export function installCommandByUrl(name: string): string {
  return `npx shadcn@latest add ${registryItemUrl(name)}`;
}

/** One-time setup that registers the namespace in the consumer's components.json. */
export function registrySetupCommand(): string {
  return `npx shadcn@latest registry add ${siteConfig.registry.namespace}=${registryUrlTemplate()}`;
}
