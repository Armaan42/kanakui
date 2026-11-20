import { Clock } from "lucide-react"

import { LikeButton } from "@/registry/default/ui/like-button"

export const meta = {
  title: "Recipe feed",
  description: "Like buttons with counts on the cards of a recipe feed, each one independent.",
}

// Sample photos. Swap in your own. The recipes and authors are made up.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=640&h=480&fit=crop&auto=format&q=75`
const RECIPES = [
  { id: "1476718406336-bb5a9690ee2a", title: "Roast squash soup with pumpkin seeds", author: "Mei Lin", time: "40 min", likes: 312, alt: "Two bowls of orange squash soup topped with seeds" },
  { id: "1484723091739-30a097e8f929", title: "Brown butter French toast", author: "Jonas Keller", time: "20 min", likes: 1240, alt: "A stack of French toast with banana and blueberries" },
  { id: "1512621776951-a57141f2eefd", title: "Crunchy rainbow grain bowl", author: "Ana Ribeiro", time: "25 min", likes: 87, alt: "A grain bowl with tomatoes, avocado, chickpeas and greens" },
]

export default function RecipeFeed() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Cook this week</h2>
          <p className="mt-1 text-sm text-muted-foreground">Picked by the Paperkite kitchen from your saved ingredients.</p>
        </div>
      </div>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {RECIPES.map((recipe) => (
          <li key={recipe.title} className="overflow-hidden rounded-xl border bg-card">
            <img src={photo(recipe.id)} alt={recipe.alt} width={640} height={480} className="aspect-[4/3] w-full object-cover" />
            <div className="p-4">
              <h3 className="font-medium">{recipe.title}</h3>
              <div className="mt-3 flex items-center justify-between gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-3">
                  <span>{recipe.author}</span>
                  <span className="flex items-center gap-1">
                    <Clock aria-hidden="true" className="size-3.5" />
                    {recipe.time}
                  </span>
                </span>
                <LikeButton count={recipe.likes} label={`Like ${recipe.title}`} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
