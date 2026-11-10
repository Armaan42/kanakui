// Placeholder quotes. Replace them with real customer quotes (with permission)
// before publishing; never present invented quotes as real.
const testimonials = [
  {
    quote: "We replaced three internal tools in a week. The team actually enjoys shipping again.",
    name: "Priya Raman",
    role: "Head of Engineering, Northwind",
  },
  {
    quote: "Setup took an afternoon. Our pages load faster and the design finally feels consistent.",
    name: "Daniel Okafor",
    role: "Founder, Contoso Labs",
  },
  {
    quote: "The defaults are thoughtful. We changed colors and fonts and it already looked like us.",
    name: "Mei Tanaka",
    role: "Design Lead, Fabrikam",
  },
]

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
}

/** Three quote cards in a grid. Each card is a `figure` with a `blockquote` and attribution. */
export function Testimonials01() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Teams ship faster with Acme
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col justify-between rounded-xl border bg-card p-6">
              <blockquote className="text-pretty">
                <p>“{t.quote}”</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex size-9 items-center justify-center rounded-full bg-muted text-xs font-medium"
                >
                  {initials(t.name)}
                </span>
                <span className="text-sm">
                  <span className="block font-medium">{t.name}</span>
                  <span className="block text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
