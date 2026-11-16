export const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"] as const
export type PackageManager = (typeof PACKAGE_MANAGERS)[number]

/**
 * Rewrites an npm command for another package manager, or returns `null` when
 * the command isn't an npm one (git, node, …) and should be shown as is.
 *
 * The forms were run, not guessed (shadcn 4.23, Nov 2026):
 * - `pnpm dlx shadcn@latest`, `bunx --bun shadcn@latest` and `yarn dlx shadcn@latest` work.
 * - `yarn shadcn@latest` (what some docs show) fails on Yarn 1 with
 *   "Command not found", so yarn always uses `dlx` (Yarn 2+).
 * - create-next-app follows the Next.js installation guide.
 */
export function convertCommand(command: string, pm: PackageManager): string | null {
  const createNext = /^npx create-next-app(@\S+)?(.*)$/.exec(command)
  if (createNext) {
    const [, version = "", rest] = createNext
    if (pm === "npm") return command
    return `${pm} create next-app${version}${rest}`
  }

  const npx = /^npx (.+)$/.exec(command)
  if (npx) {
    const [, rest] = npx
    if (pm === "npm") return command
    if (pm === "pnpm") return `pnpm dlx ${rest}`
    if (pm === "yarn") return `yarn dlx ${rest}`
    return `bunx --bun ${rest}`
  }

  const install = /^npm (?:install|i) (.+)$/.exec(command)
  if (install) {
    const [, packages] = install
    return pm === "npm" ? command : `${pm} add ${packages}`
  }

  return null
}
