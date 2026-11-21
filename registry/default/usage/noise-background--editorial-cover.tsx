import { NoiseBackground } from "@/registry/default/ui/noise-background"

export const meta = {
  title: "Magazine cover story",
  description: "Film-grain noise over a warm editorial cover for an online magazine's lead story.",
}

// The magazine, story and author are made up.
export default function EditorialCover() {
  return (
    <article>
      <header className="relative isolate overflow-hidden bg-[#e9dfcf] px-6 py-24 text-[#2a2118] dark:bg-[#2a2420] dark:text-[#efe6d8]">
        <NoiseBackground intensity={0.18} />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-sm opacity-70">Tidewell Quarterly · Winter 2026 · Cover story</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-7xl">The last ferrymen of the Tagus</h1>
          <p className="mt-6 max-w-xl text-lg opacity-80">
            Four crossings a day, the same faces every morning, and a river that has outlasted every bridge built over it.
          </p>
          <p className="mt-8 text-sm opacity-70">Words by Ana Ribeiro · 14 min read</p>
        </div>
      </header>
      <div className="mx-auto max-w-2xl px-6 py-12 leading-8">
        <p>
          At 6:40 the first boat leaves Cacilhas with eleven passengers, two bicycles and a crate of oranges. Joaquim has made the crossing for thirty-one years
          and still counts the gulls on the way over, out of habit more than interest.
        </p>
      </div>
    </article>
  )
}
