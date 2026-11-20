"use client"

import * as React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample photos. Swap in your own. The restaurant is made up.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&h=1000&fit=crop&auto=format&q=75`

interface Dish {
  name: string
  detail: string
  price: number
  image: string
  alt: string
  tag?: string
}

const menu: { id: string; course: string; dishes: Dish[] }[] = [
  {
    id: "start",
    course: "To start",
    dishes: [
      { name: "Roast squash soup", detail: "Brown butter, toasted seeds, sour cream", price: 11, image: photo("1476718406336-bb5a9690ee2a"), alt: "A bowl of orange soup topped with seeds", tag: "V" },
      { name: "Garden bowl", detail: "Heritage tomato, chickpeas, avocado, sweet potato", price: 13, image: photo("1512621776951-a57141f2eefd"), alt: "A colourful bowl of vegetables, chickpeas and avocado", tag: "VG" },
      { name: "Market salad", detail: "Bitter leaves, radish, pickled onion, seeds", price: 12, image: photo("1540189549336-e6e99c3679fe"), alt: "A dark plate of mixed salad", tag: "VG" },
    ],
  },
  {
    id: "mains",
    course: "Mains",
    dishes: [
      { name: "Prawn spaghetti", detail: "Chilli, cherry tomato, shellfish butter", price: 26, image: photo("1563379926898-05f4575a45d8"), alt: "A pan of spaghetti with prawns and tomatoes" },
      { name: "Slow ragù penne", detail: "Twelve-hour beef shin, aged parmesan", price: 23, image: photo("1621996346565-e3dbc646d9a9"), alt: "A white plate of penne in meat sauce" },
      { name: "Wood-fired pizza", detail: "Fior di latte, red onion, wild herbs", price: 19, image: photo("1565299624946-b28f40a0ae38"), alt: "A pizza with herbs on a wooden board", tag: "V" },
      { name: "Coconut fish curry", detail: "Tamarind, curry leaf, steamed rice", price: 25, image: photo("1455619452474-d2be8b1e70cd"), alt: "A bowl of red curry with basil" },
    ],
  },
  {
    id: "sweet",
    course: "Sweet",
    dishes: [
      { name: "Buttermilk pancakes", detail: "Banana, maple, salted butter", price: 10, image: photo("1567620905732-2d1ec7ab7445"), alt: "A stack of pancakes with syrup being poured", tag: "V" },
      { name: "Brioche french toast", detail: "Blueberries, caramelised banana", price: 11, image: photo("1484723091739-30a097e8f929"), alt: "French toast with banana and blueberries", tag: "V" },
    ],
  },
]

/** A restaurant menu by course; the photo follows the dish you point at or focus. */
export function Menu01() {
  const [active, setActive] = React.useState(menu[0].dishes[0])

  return (
    <section aria-labelledby="menu-01-title" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16">
        <div>
          <p className="text-sm text-muted-foreground">Osteria Lume · Dinner</p>
          <h2 id="menu-01-title" className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Tonight’s menu
          </h2>
          <Tabs defaultValue={menu[0].id} onValueChange={(id) => setActive(menu.find((section) => section.id === id)!.dishes[0])} className="mt-8 gap-6">
            <TabsList variant="line">
              {menu.map((section) => (
                <TabsTrigger key={section.id} value={section.id}>
                  {section.course}
                </TabsTrigger>
              ))}
            </TabsList>
            {menu.map((section) => (
              <TabsContent key={section.id} value={section.id}>
                <ul className="space-y-1">
                  {section.dishes.map((dish) => (
                    <li key={dish.name}>
                      <button
                        type="button"
                        aria-pressed={active.name === dish.name}
                        onClick={() => setActive(dish)}
                        onPointerEnter={() => setActive(dish)}
                        onFocus={() => setActive(dish)}
                        className="group w-full rounded-lg px-3 py-3 text-left outline-none transition-colors hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:bg-muted"
                      >
                        <span className="flex items-baseline gap-2">
                          <span className="font-medium">{dish.name}</span>
                          {dish.tag ? <span className="text-[10px] font-semibold text-muted-foreground group-aria-pressed:text-foreground/80">{dish.tag}</span> : null}
                          <span aria-hidden="true" className="mb-1 min-w-6 flex-1 border-b border-dotted border-muted-foreground/50" />
                          <span className="font-mono text-sm tabular-nums">${dish.price}</span>
                        </span>
                        <span className="mt-0.5 block text-sm text-muted-foreground group-aria-pressed:text-foreground/80">{dish.detail}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            ))}
          </Tabs>
          <p className="mt-6 px-3 text-xs text-muted-foreground">V vegetarian · VG vegan. Please tell us about any allergies.</p>
        </div>
        <figure className="max-lg:order-first lg:sticky lg:top-24 lg:self-start">
          <img key={active.image} src={active.image} alt={active.alt} className="aspect-[4/3] w-full rounded-2xl bg-muted object-cover lg:aspect-[4/5]" />
          <figcaption aria-live="polite" className="mt-3 text-sm text-muted-foreground">
            {active.name}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
