import { Terminal } from "@/registry/default/ui/terminal"

export const meta = {
  title: "CLI quickstart",
  description: "The terminal playing a CLI's install and first deploy on a developer tool's quickstart page.",
}

// The tool and its output are made up.
export default function CliQuickstart() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-2">
      <div>
        <p className="text-sm text-muted-foreground">Quickstart · 2 minutes</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Deploy your first site from the terminal</h2>
        <ol className="mt-6 space-y-4 text-sm">
          <li className="flex gap-3">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-muted text-xs font-medium">1</span>
            <span>
              <span className="font-medium">Install the CLI.</span> <span className="text-muted-foreground">One package, no global config files.</span>
            </span>
          </li>
          <li className="flex gap-3">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-muted text-xs font-medium">2</span>
            <span>
              <span className="font-medium">Sign in once.</span> <span className="text-muted-foreground">It opens your browser and remembers the device.</span>
            </span>
          </li>
          <li className="flex gap-3">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-muted text-xs font-medium">3</span>
            <span>
              <span className="font-medium">Deploy.</span> <span className="text-muted-foreground">Every deploy gets its own preview address.</span>
            </span>
          </li>
        </ol>
      </div>
      <Terminal
        title="~/oakline-web"
        lines={[
          { type: "command", text: "npm install -g oakline" },
          { type: "output", text: "added 1 package in 2s" },
          { type: "command", text: "oakline login" },
          { type: "success", text: "Signed in as lena@oakline.example" },
          { type: "command", text: "oakline deploy" },
          { type: "output", text: "Building… 42 pages in 6.1s" },
          { type: "success", text: "Live at https://checkout-redesign.oakline.app" },
        ]}
      />
    </section>
  )
}
