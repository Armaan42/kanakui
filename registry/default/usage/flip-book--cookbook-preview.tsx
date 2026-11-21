import { Button } from "@/components/ui/button"
import { FlipBook } from "@/registry/default/ui/flip-book"

export const meta = {
  title: "Cookbook look-inside preview",
  description: "The flip book as the “look inside” preview on a cookbook's shop page, turning through the first recipes.",
}

// Sample photos. Swap in your own. The book, author and recipes are made up.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=600&h=480&fit=crop&auto=format&q=75`

function Recipe({ title, time, image, alt, text, number }: { title: string; time: string; image: string; alt: string; text: string; number: number }) {
  return (
    <div className="flex h-full flex-col bg-[#fbf8f1] p-[7%] text-neutral-800">
      <p className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase">{time}</p>
      <p className="mt-1 font-serif text-[clamp(0.9rem,2.4cqw,1.4rem)] leading-tight">{title}</p>
      <img src={image} alt={alt} className="mt-[5%] aspect-[5/4] w-full rounded-sm object-cover" />
      <p className="mt-[5%] text-[clamp(0.65rem,1.5cqw,0.9rem)] leading-snug text-neutral-700">{text}</p>
      <p className="mt-auto text-center font-mono text-[10px] text-neutral-500">{number}</p>
    </div>
  )
}

export default function CookbookPreview() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Copperleaf Books · Cookery</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Small Kitchen, Big Table</h1>
          <p className="mt-1 text-muted-foreground">Rosa Ribeiro · Hardback · 224 pages · €28</p>
        </div>
        <Button>Add to basket</Button>
      </div>
      <div className="@container mt-8">
        <FlipBook
          label="Small Kitchen, Big Table: look inside"
          pages={[
            <div key="cover" className="flex h-full flex-col items-center justify-center bg-[#2f5d50] p-[10%] text-center text-[#f3ede0]">
              <p className="text-[10px] tracking-[0.3em] uppercase opacity-80">Rosa Ribeiro</p>
              <p className="mt-3 font-serif text-[clamp(1.4rem,4.5cqw,2.6rem)] leading-none">Small Kitchen, Big Table</p>
              <span className="mt-4 h-px w-12 bg-current opacity-50" />
              <p className="mt-4 text-xs opacity-80">Food for friends, from one pan</p>
            </div>,
            <Recipe
              key="1"
              number={1}
              time="Serves 4 · 40 min"
              title="Roast squash soup"
              image={photo("1476718406336-bb5a9690ee2a")}
              alt="A bowl of orange soup topped with seeds"
              text="Roast the squash until the edges catch, then blend with stock. Toast the seeds while the oven's still warm."
            />,
            <Recipe
              key="2"
              number={2}
              time="Serves 2 · 20 min"
              title="Prawns and tomato spaghetti"
              image={photo("1563379926898-05f4575a45d8")}
              alt="A pan of spaghetti with prawns and tomatoes"
              text="Everything happens in the pan the pasta finishes in. Lots of garlic, a splash of the pasta water, done."
            />,
            <Recipe
              key="3"
              number={3}
              time="Serves 4 · 30 min"
              title="A bowl for every day"
              image={photo("1512621776951-a57141f2eefd")}
              alt="A colourful bowl of vegetables, chickpeas and avocado"
              text="Crisp chickpeas, whatever greens you have, and a lemon tahini dressing that keeps for a week."
            />,
            <Recipe
              key="4"
              number={4}
              time="Makes 12 · 25 min"
              title="Saturday pancakes"
              image={photo("1567620905732-2d1ec7ab7445")}
              alt="A stack of pancakes with syrup being poured"
              text="Rest the batter while the pan heats. The first one is always for the cook."
            />,
          ]}
        />
      </div>
    </div>
  )
}
