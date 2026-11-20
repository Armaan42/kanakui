// Sample photos. Swap in your own. The story and people are made up.
const photo = (id: string, width: number, height: number) => `https://images.unsplash.com/photo-${id}?w=${width}&h=${height}&fit=crop&auto=format&q=78`

/** A long-form magazine story: full-width opener, drop cap, pull quote and inset photo. */
export function Magazine01() {
  return (
    <article aria-labelledby="magazine-01-title" className="py-24 sm:py-28">
      <header className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-neutral-900 text-white">
          <img src={photo("1506905925346-21bda4d32df4", 1600, 900)} alt="Snowy peaks above a sea of cloud at sunrise" className="h-[28rem] w-full object-cover sm:h-[34rem]" />
          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase">Issue 14 · The Altitude Issue</p>
            <h2 id="magazine-01-title" className="mt-3 max-w-3xl font-serif text-4xl leading-[1.05] font-semibold text-balance sm:text-6xl">
              The woman who keeps the last hut open
            </h2>
          </div>
        </div>
        <p className="mx-auto mt-6 flex max-w-2xl flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span>Words by Tomas Reyes</span>
          <span aria-hidden="true">·</span>
          <span>Photographs by Ines Kovac</span>
          <span aria-hidden="true">·</span>
          <span>8 min read</span>
        </p>
      </header>

      <div className="mx-auto mt-10 max-w-2xl space-y-6 px-4 font-serif text-lg leading-8 sm:px-6">
        <p className="first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-7xl first-letter:leading-[0.85] first-letter:font-semibold">
          The path to Refugio Alto stops being a path about an hour before you arrive. After that there are cairns, then a fixed rope, then the smell of woodsmoke, which Marta Solé insists is the only signpost anyone really needs.
        </p>
        <p>
          She has run the hut for twenty-six summers. In that time the glacier below her kitchen window has retreated far enough that she now describes it in the past tense, and the mules that once carried her flour have been replaced by a helicopter that comes twice a season, weather allowing.
        </p>
      </div>

      <blockquote className="mx-auto my-12 max-w-3xl border-y px-4 py-8 text-center font-serif text-3xl leading-tight text-balance italic sm:text-4xl">
        “People come up here to look at the view. Then the weather closes in, and they have to look at each other.”
      </blockquote>

      <div className="mx-auto max-w-2xl space-y-6 px-4 font-serif text-lg leading-8 sm:px-6">
        <p>
          The rules are few and written on a slate by the door: boots off, soup at seven, nobody leaves after two in the afternoon. Guests who argue about the last one tend to be the ones she remembers. Some of them, she says, come back years later to apologise.
        </p>
      </div>

      <figure className="mx-auto my-12 max-w-4xl px-4 sm:px-6">
        <img src={photo("1469474968028-56623f02e42e", 1200, 680)} alt="A lone walker on a rock above misty hills" loading="lazy" className="aspect-[16/9] w-full rounded-xl bg-muted object-cover" />
        <figcaption className="mt-2 text-sm text-muted-foreground">The final ridge before the hut, an hour after the morning mist lifted.</figcaption>
      </figure>

      <div className="mx-auto max-w-2xl space-y-6 px-4 font-serif text-lg leading-8 sm:px-6">
        <p>
          When the season ends she drains the pipes, stacks the blankets and walks down alone. It takes most of a day. She has been asked many times who will take over when she stops, and every time she gives the same answer: whoever turns up with dry socks and no plans to change anything.
        </p>
      </div>
    </article>
  )
}
