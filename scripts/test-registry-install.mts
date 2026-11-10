/**
 * End-to-end installation test for the registry.
 *
 *   npm run registry:test
 *     Local mode:
 *     1. Builds the registry with NEXT_PUBLIC_SITE_URL pointed at a local port.
 *     2. Serves public/r over HTTP (a tiny static server, so no Next.js build is needed).
 *     3. Creates a fresh Next.js app in the OS temp folder and runs `shadcn init`.
 *     4. Installs EVERY registry item by URL, exactly as a user would.
 *     5. Type-checks, lints and production-builds the consumer app.
 *
 *   TEST_REGISTRY_ORIGIN=https://kanakui.vercel.app npm run registry:test
 *     Remote mode: the same steps 3 to 5 against a deployed registry. It also checks
 *     that every item's registryDependencies point at that same origin.
 *
 * Options (env vars):
 *   TEST_REGISTRY_ORIGIN  test a deployed registry instead of a local build
 *   TEST_PORT=3210        port for the local static registry server
 *   TEST_BASE=radix       shadcn base for the consumer app (radix | base)
 *   TEST_REUSE=1          reuse an existing consumer app (faster reruns)
 */
import { spawn } from "node:child_process"
import { createServer, type Server } from "node:http"
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")
const REMOTE_ORIGIN = process.env.TEST_REGISTRY_ORIGIN?.replace(/\/+$/, "")
const PORT = Number(process.env.TEST_PORT ?? 3210)
const BASE = process.env.TEST_BASE ?? "radix"
const REUSE = process.env.TEST_REUSE === "1"
const ORIGIN = REMOTE_ORIGIN ?? `http://localhost:${PORT}`
const WORK_DIR = path.join(tmpdir(), "kanakui-registry-test")
const APP_DIR = path.join(WORK_DIR, `consumer-${BASE}`)

type RegistryIndex = { items: { name: string }[] }
type RegistryItemJson = { name: string; registryDependencies?: string[] }

/**
 * Runs a shell command asynchronously. This must NOT be spawnSync: the
 * registry server below lives in this same process, and a synchronous spawn
 * would block its event loop while the shadcn CLI waits on it (deadlock).
 */
function run(
  command: string,
  cwd: string,
  env: Record<string, string | undefined> = {}
): Promise<void> {
  console.log(`\n$ ${command}  (in ${path.relative(ROOT, cwd) || "."})`)
  return new Promise((resolve, reject) => {
    const child = spawn(command, {
      cwd,
      shell: true,
      stdio: "inherit",
      env: { ...process.env, ...env },
    })
    child.once("error", reject)
    child.once("exit", (code) => {
      if (code === 0) resolve()
      else reject(new Error(`Command failed (${code}): ${command}`))
    })
  })
}

function serveRegistry(): Promise<Server> {
  const dir = path.join(ROOT, "public/r")
  const server = createServer((req, res) => {
    const name = decodeURIComponent((req.url ?? "").split("?")[0]).replace(/^\/r\//, "")
    const file = path.join(dir, name)
    if (!name || name.includes("..") || !file.startsWith(dir) || !existsSync(file)) {
      res.writeHead(404, { "content-type": "application/json" })
      res.end(JSON.stringify({ message: "Not found" }))
      return
    }
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" })
    res.end(readFileSync(file))
  })
  return new Promise((resolve, reject) => {
    server.once("error", reject)
    server.listen(PORT, () => resolve(server))
  })
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}`)
  const type = res.headers.get("content-type") ?? ""
  if (!type.includes("json")) throw new Error(`GET ${url} returned ${type}, expected JSON`)
  return (await res.json()) as T
}

/** Every dependency on one of our own items must use this registry's origin. */
async function checkDependencyOrigins(names: string[]) {
  const problems: string[] = []
  for (const name of names) {
    const item = await fetchJson<RegistryItemJson>(`${ORIGIN}/r/${name}.json`)
    for (const dep of item.registryDependencies ?? []) {
      if (/^https?:\/\//.test(dep) && !dep.startsWith(`${ORIGIN}/`)) {
        problems.push(`${name} → ${dep}`)
      }
    }
  }
  if (problems.length) {
    throw new Error(
      `registryDependencies point outside ${ORIGIN}:\n  ${problems.join("\n  ")}\n` +
        `Check how the site URL is set for that deployment (src/config/site.ts).`
    )
  }
  console.log(`✓ All registryDependencies point at ${ORIGIN}`)
}

async function main() {
  let server: Server | undefined

  if (!REMOTE_ORIGIN) {
    await run("npm run registry:build", ROOT, { NEXT_PUBLIC_SITE_URL: ORIGIN })
    server = await serveRegistry()
    console.log(`\nServing public/r at ${ORIGIN}/r`)
  } else {
    console.log(`\nTesting deployed registry at ${ORIGIN}/r`)
  }

  try {
    const index = await fetchJson<RegistryIndex>(`${ORIGIN}/r/registry.json`)
    const names = index.items.map((item) => item.name)
    await checkDependencyOrigins(names)

    if (!REUSE || !existsSync(APP_DIR)) {
      rmSync(APP_DIR, { recursive: true, force: true })
      mkdirSync(WORK_DIR, { recursive: true })
      await run(
        `npx --yes create-next-app@latest consumer-${BASE} --yes --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-agent-feedback --disable-git`,
        WORK_DIR
      )
      await run(`npx --yes shadcn@latest init --base ${BASE} --preset nova --no-monorepo`, APP_DIR)
    }

    const urls = names.map((name) => `${ORIGIN}/r/${name}.json`)
    await run(`npx shadcn@latest add ${urls.join(" ")} --yes --overwrite`, APP_DIR)
    await run("npx tsc --noEmit", APP_DIR)
    await run("npm run lint", APP_DIR)
    // A production build also compiles the CSS the CLI merged into globals.css
    // (keyframes, @property, theme variables), which type checking can't catch.
    await run("npm run build", APP_DIR)

    console.log(`\n✓ Installed, type-checked and built ${urls.length} items from ${ORIGIN} in ${APP_DIR}`)
  } finally {
    if (server) {
      server.close()
      // Restore the default (localhost:3000 / .env.local) registry build.
      await run("npm run registry:build", ROOT, { NEXT_PUBLIC_SITE_URL: undefined })
    }
  }
}

main().catch((err: unknown) => {
  console.error(`\n✗ ${err instanceof Error ? err.message : String(err)}`)
  process.exit(1)
})
