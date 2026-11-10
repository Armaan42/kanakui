/**
 * End-to-end installation test for the registry.
 *
 *   npm run registry:test
 *
 * 1. Builds the registry with NEXT_PUBLIC_SITE_URL pointed at a local port.
 * 2. Serves public/r over HTTP (a tiny static server, so no Next.js build is needed).
 * 3. Creates a fresh Next.js app in the OS temp folder and runs `shadcn init`.
 * 4. Installs EVERY registry item by URL, exactly as a user would.
 * 5. Type-checks and lints the consumer app.
 *
 * Options (env vars):
 *   TEST_PORT=3210        port for the static registry server
 *   TEST_BASE=radix       shadcn base for the consumer app (radix | base)
 *   TEST_REUSE=1          reuse an existing consumer app (faster reruns)
 */
import { spawn } from "node:child_process"
import { createServer } from "node:http"
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")
const PORT = Number(process.env.TEST_PORT ?? 3210)
const BASE = process.env.TEST_BASE ?? "radix"
const REUSE = process.env.TEST_REUSE === "1"
const ORIGIN = `http://localhost:${PORT}`
const WORK_DIR = path.join(tmpdir(), "kanakui-registry-test")
const APP_DIR = path.join(WORK_DIR, `consumer-${BASE}`)

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

function serveRegistry() {
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
  return new Promise<typeof server>((resolve, reject) => {
    server.once("error", reject)
    server.listen(PORT, () => resolve(server))
  })
}

async function main() {
  await run("npm run registry:build", ROOT, { NEXT_PUBLIC_SITE_URL: ORIGIN })

  const index = JSON.parse(readFileSync(path.join(ROOT, "public/r/registry.json"), "utf8")) as {
    items: { name: string }[]
  }
  const urls = index.items.map((item) => `${ORIGIN}/r/${item.name}.json`)

  const server = await serveRegistry()
  console.log(`\nServing public/r at ${ORIGIN}/r`)

  try {
    if (!REUSE || !existsSync(APP_DIR)) {
      rmSync(APP_DIR, { recursive: true, force: true })
      mkdirSync(WORK_DIR, { recursive: true })
      await run(
        `npx --yes create-next-app@latest consumer-${BASE} --yes --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-agent-feedback --disable-git`,
        WORK_DIR
      )
      await run(`npx --yes shadcn@latest init --base ${BASE} --preset nova --no-monorepo`, APP_DIR)
    }

    await run(`npx shadcn@latest add ${urls.join(" ")} --yes --overwrite`, APP_DIR)
    await run("npx tsc --noEmit", APP_DIR)
    await run("npm run lint", APP_DIR)

    console.log(`\n✓ Installed and type-checked ${urls.length} items in ${APP_DIR}`)
  } finally {
    server.close()
    // Restore the default (localhost:3000 / .env.local) registry build.
    await run("npm run registry:build", ROOT, { NEXT_PUBLIC_SITE_URL: undefined })
  }
}

main().catch((err: unknown) => {
  console.error(`\n✗ ${err instanceof Error ? err.message : String(err)}`)
  process.exit(1)
})
