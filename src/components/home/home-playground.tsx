import { Playground } from "@/components/home/playground"
import { installCommandByUrl } from "@/config/site"

const NAMES = ["dotted-globe", "border-beam", "aurora-background", "spotlight-card"]

/**
 * The homepage playground. Install commands are built here on the server,
 * where the production site URL is known, and passed to the client.
 */
export function HomePlayground() {
  const commands = Object.fromEntries(NAMES.map((name) => [name, installCommandByUrl(name)]))

  return (
    <section aria-labelledby="playground" className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="mb-10 max-w-2xl">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Playground</p>
          <h2 id="playground" className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Tune it, then take the code
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Change the props and watch the component and its code update together. Copy the result straight into your
            project.
          </p>
        </div>
        <Playground commands={commands} />
      </div>
    </section>
  )
}
