import { InstallDemo } from "@/components/home/install-demo"
import { installCommandByUrl } from "@/config/site"

const steps = [
  { title: "Pick a component", body: "Preview it live, read its docs, and check the files and packages it adds." },
  { title: "Run one command", body: "The shadcn CLI downloads the source, installs dependencies and adds any CSS." },
  { title: "Make it yours", body: "The code lives in your repo. Change anything, with no package to fight." },
]

/** How installing works: the steps beside a terminal that plays the install. */
export function HomeHowItWorks() {
  return (
    <section aria-labelledby="how-it-works" className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <h2 id="how-it-works" className="mb-10 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Copy the command. Own the code.
        </h2>
        <InstallDemo command={installCommandByUrl("animated-card")} steps={steps} />
      </div>
    </section>
  )
}
