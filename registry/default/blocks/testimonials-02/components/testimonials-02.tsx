import { Marquee } from "@/registry/default/ui/marquee"

// Placeholder quotes. Replace them with real customer quotes (with permission)
// before publishing; never present invented quotes as real.
const quotes = [
  { quote: "Our landing page went from idea to live in a day.", name: "Aarav Shah", handle: "@aarav" },
  { quote: "The components look good out of the box and are easy to change.", name: "Lena Fischer", handle: "@lenaf" },
  { quote: "Finally, animations that don’t feel like a demo reel.", name: "Tomás Ruiz", handle: "@tomasr" },
  { quote: "Accessible defaults saved us a full audit cycle.", name: "Grace Kim", handle: "@gracek" },
  { quote: "We copy, tweak and move on. No dependency to fight.", name: "Omar Haddad", handle: "@omarh" },
  { quote: "Docs answered every question before we asked it.", name: "Sofia Rossi", handle: "@sofiar" },
]

function QuoteCard({ quote, name, handle }: (typeof quotes)[number]) {
  return (
    <figure className="w-72 shrink-0 rounded-xl border bg-card p-5">
      <blockquote className="text-sm text-pretty">
        <p>“{quote}”</p>
      </blockquote>
      <figcaption className="mt-4 text-sm">
        <span className="font-medium">{name}</span> <span className="text-muted-foreground">{handle}</span>
      </figcaption>
    </figure>
  )
}

/**
 * Two rows of quotes scrolling in opposite directions, with faded edges.
 * Rows pause on hover so quotes can be read. Static with reduced motion.
 */
export function Testimonials02() {
  const half = Math.ceil(quotes.length / 2)
  return (
    <section className="overflow-hidden bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Loved by builders everywhere
        </h2>
      </div>
      <div className="mt-12 space-y-4 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <Marquee pauseOnHover duration="50s">
          {quotes.slice(0, half).map((q) => (
            <QuoteCard key={q.handle} {...q} />
          ))}
        </Marquee>
        <Marquee pauseOnHover reverse duration="50s">
          {quotes.slice(half).map((q) => (
            <QuoteCard key={q.handle} {...q} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
