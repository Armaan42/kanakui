import { CopyButton } from "@/components/site/copy-button"
import { installCommandByUrl } from "@/config/site"

const steps = [
  { title: "Pick a component", body: "Preview it live, read its docs, and check the files and packages it adds." },
  { title: "Run one command", body: "The shadcn CLI downloads the source, installs dependencies and adds any CSS." },
  { title: "Make it yours", body: "The code lives in your repo. Change anything, with no package to fight." },
]

/**
 * How installing works, beside a terminal. The terminal lines are the real
 * output of the shadcn CLI installing this component in our install tests.
 */
export function HomeHowItWorks() {
  const command = installCommandByUrl("animated-card")

  return (
    <section aria-labelledby="how-it-works" className="border-b">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2">
        <div>
          <h2 id="how-it-works" className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Copy the command. Own the code.
          </h2>
          <ol className="mt-10 space-y-8">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="min-w-0 overflow-hidden rounded-xl border bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b px-4 py-2.5">
            <span aria-hidden="true" className="size-2.5 rounded-full bg-foreground/15" />
            <span aria-hidden="true" className="size-2.5 rounded-full bg-foreground/15" />
            <span aria-hidden="true" className="size-2.5 rounded-full bg-foreground/15" />
            <span className="ml-2 text-xs text-muted-foreground">Terminal</span>
            <CopyButton value={command} label="Copy install command" className="ml-auto" />
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6">
            <code>
              <span className="text-muted-foreground">$ </span>
              {command}
              {"\n"}
              <span className="text-emerald-600 dark:text-emerald-400">✔</span> Checking registry.{"\n"}
              <span className="text-emerald-600 dark:text-emerald-400">✔</span> Installing dependencies.{"\n"}
              <span className="text-emerald-600 dark:text-emerald-400">✔</span> Created 1 file:{"\n"}
              <span className="text-muted-foreground">{"  - "}src/components/ui/animated-card.tsx</span>
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}
