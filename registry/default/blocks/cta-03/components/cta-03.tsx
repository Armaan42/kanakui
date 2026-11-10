import { CopyButton } from "@/registry/default/ui/copy-button"

// Replace with the command people should run to get started.
const command = "npx create-acme-app@latest"

/** A developer-focused call to action: pitch on one side, a copyable command on the other. */
export function Cta03() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 rounded-2xl border bg-card p-8 sm:p-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-balance">Start building in one command</h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              Create a new project with sensible defaults. Change anything later.
            </p>
          </div>
          <div className="flex min-w-0 items-center gap-2 rounded-lg border bg-background p-2 pl-4">
            <code className="min-w-0 flex-1 overflow-x-auto font-mono text-sm whitespace-nowrap">
              <span aria-hidden="true" className="text-muted-foreground select-none">
                ${" "}
              </span>
              {command}
            </code>
            <CopyButton value={command} aria-label="Copy command" />
          </div>
        </div>
      </div>
    </section>
  )
}
