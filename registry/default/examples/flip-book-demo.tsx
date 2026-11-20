import { FlipBook } from "@/registry/default/ui/flip-book"

// Sample photos. Swap in your own.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=600&h=480&fit=crop&auto=format&q=75`
const HANDWRITING = '"Segoe Print", "Bradley Hand", "Marker Felt", "Chalkboard SE", cursive'

function JournalPage({ day, title, text, image, alt, number }: { day: string; title: string; text: string; image: string; alt: string; number: number }) {
  return (
    <div className="flex h-full flex-col p-[7%]">
      <p className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase">{day}</p>
      <p className="mt-1 font-serif text-[clamp(0.9rem,2.4cqw,1.4rem)] leading-tight">{title}</p>
      <img src={image} alt={alt} className="mt-[5%] aspect-[5/4] w-full rounded-sm object-cover shadow-sm" />
      <p className="mt-[5%] text-[clamp(0.65rem,1.5cqw,0.9rem)] leading-snug text-neutral-700" style={{ fontFamily: HANDWRITING }}>
        {text}
      </p>
      <p className="mt-auto text-center font-mono text-[10px] text-neutral-400">{number}</p>
    </div>
  )
}

export default function FlipBookDemo() {
  return (
    <div className="@container w-full max-w-3xl">
      <FlipBook
        label="Kyoto, in spring: a travel journal"
        pages={[
          <div key="cover" className="flex h-full flex-col items-center justify-center bg-[#7a2e2a] p-[10%] text-center text-[#f6e7d8]">
            <p className="text-[10px] tracking-[0.3em] uppercase opacity-80">A travel journal</p>
            <p className="mt-3 font-serif text-[clamp(1.4rem,4.5cqw,2.6rem)] leading-none">Kyoto, in spring</p>
            <span className="mt-4 h-px w-12 bg-current opacity-50" />
            <p className="mt-4 text-xs opacity-80">April 2026</p>
          </div>,
          <JournalPage
            key="1"
            number={1}
            day="Day one"
            title="Old streets at dusk"
            image={photo("1493976040374-85c8e12f0c0e")}
            alt="A pagoda at the end of an old street in Kyoto"
            text="Walked up from the river as the lanterns came on. Everyone stops at this corner for the pagoda, and now I get why."
          />,
          <JournalPage
            key="2"
            number={2}
            day="Day two"
            title="Ten thousand gates"
            image={photo("1478436127897-769e1b3f0f36")}
            alt="A tunnel of red torii gates"
            text="Started at 6 am to beat the crowds. Lost count of the gates around the halfway point. Legs: destroyed."
          />,
          <JournalPage
            key="3"
            number={3}
            day="Day four"
            title="Fuji, finally"
            image={photo("1490806843957-31f4c9a91c65")}
            alt="Mount Fuji framed by cherry blossoms"
            text="Clouds all week, then this. Sat under the blossoms for an hour and didn’t take out my phone once (ok, twice)."
          />,
          <JournalPage
            key="4"
            number={4}
            day="Day five"
            title="City goodbye"
            image={photo("1513407030348-c983a97b98d8")}
            alt="Tokyo Tower above the city at dusk"
            text="Last night in Tokyo before the flight home. Already planning the autumn trip."
          />,
          <div key="back" className="flex h-full items-end justify-center bg-[#7a2e2a] p-[10%] text-[#f6e7d8]">
            <p className="text-[10px] tracking-[0.3em] uppercase opacity-70">さようなら</p>
          </div>,
        ]}
      />
    </div>
  )
}
