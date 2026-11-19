"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface CoffeeDrink {
  name: string
  price: number
  /** Parts of the cup, bottom to top. They are scaled to fill it. */
  layers: { name: string; parts: number; color: string }[]
}

export interface CoffeeSize {
  name: string
  /** Added to the drink's price. */
  extra: number
  /** How full the cup looks, from 0 to 1. */
  fill: number
}

export interface CoffeeOrder {
  drink: string
  size: string
  total: number
}

interface CoffeeOrderDialProps extends React.ComponentProps<"div"> {
  drinks?: CoffeeDrink[]
  sizes?: CoffeeSize[]
  currency?: string
  locale?: string
  onOrder?: (order: CoffeeOrder) => void
}

const ESPRESSO = "#3b2417"
const MILK = "#ead9c2"
const FOAM = "#f8f2e8"
const DRINKS: CoffeeDrink[] = [
  { name: "Espresso", price: 3, layers: [{ name: "Espresso", parts: 1, color: ESPRESSO }] },
  { name: "Americano", price: 3.5, layers: [{ name: "Espresso", parts: 1, color: ESPRESSO }, { name: "Water", parts: 3, color: "#7a4e2d" }] },
  { name: "Flat white", price: 4.25, layers: [{ name: "Espresso", parts: 2, color: ESPRESSO }, { name: "Milk", parts: 3, color: MILK }, { name: "Foam", parts: 0.5, color: FOAM }] },
  { name: "Latte", price: 4.5, layers: [{ name: "Espresso", parts: 1, color: ESPRESSO }, { name: "Milk", parts: 4, color: MILK }, { name: "Foam", parts: 1, color: FOAM }] },
  { name: "Cappuccino", price: 4.5, layers: [{ name: "Espresso", parts: 1, color: ESPRESSO }, { name: "Milk", parts: 1, color: MILK }, { name: "Foam", parts: 1.5, color: FOAM }] },
  { name: "Mocha", price: 5, layers: [{ name: "Chocolate", parts: 1, color: "#54301d" }, { name: "Espresso", parts: 1, color: ESPRESSO }, { name: "Milk", parts: 2, color: MILK }, { name: "Foam", parts: 0.75, color: FOAM }] },
]
const SIZES: CoffeeSize[] = [
  { name: "Small", extra: 0, fill: 0.62 },
  { name: "Medium", extra: 0.5, fill: 0.78 },
  { name: "Large", extra: 1, fill: 0.92 },
]

/**
 * A café order dial. Turn the knob, or use the labels or arrow keys, to choose
 * a drink; the cup shows what goes into it and the price follows the size.
 */
function CoffeeOrderDial({ drinks = DRINKS, sizes = SIZES, currency = "USD", locale = "en-US", onOrder, className, ...props }: CoffeeOrderDialProps) {
  const [index, setIndex] = React.useState(2)
  const [turn, setTurn] = React.useState(2)
  const [sizeIndex, setSizeIndex] = React.useState(1)
  const [added, setAdded] = React.useState(false)
  const dragging = React.useRef(false)
  const name = React.useId()
  const count = drinks.length
  const drink = drinks[index]
  const size = sizes[sizeIndex]
  const total = drink.price + size.extra
  const parts = drink.layers.reduce((sum, layer) => sum + layer.parts, 0)
  const money = new Intl.NumberFormat(locale, { style: "currency", currency })

  const choose = (next: number) => {
    if (next === index) return
    const shortest = ((next - index + count + Math.floor(count / 2)) % count) - Math.floor(count / 2)
    setTurn((value) => value + shortest)
    setIndex(next)
    setAdded(false)
  }

  return (
    <div data-slot="coffee-order-dial" className={cn("flex w-full max-w-xl flex-wrap items-center justify-center gap-x-8 gap-y-6", className)} {...props}>
      <fieldset className="relative size-68 max-w-full shrink-0 rounded-full bg-linear-145 from-stone-200 to-stone-300 shadow-[0_16px_30px_-16px_rgb(0_0_0/0.5),inset_0_1px_0_white] dark:from-stone-700 dark:to-stone-800 dark:shadow-[0_16px_30px_-16px_rgb(0_0_0/0.8),inset_0_1px_0_rgb(255_255_255/0.15)]">
        <legend className="sr-only">Drink</legend>
        {drinks.map((item, i) => {
          const angle = (i / count) * Math.PI * 2
          return (
            <label
              key={item.name}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${(50 + 39 * Math.sin(angle)).toFixed(2)}%`, top: `${(50 - 39 * Math.cos(angle)).toFixed(2)}%` }}
            >
              <input type="radio" name={name} className="peer sr-only" checked={i === index} onChange={() => choose(i)} />
              <span className="block rounded-full px-1.5 py-0.5 text-center text-[11px] leading-tight font-medium whitespace-nowrap text-stone-700 transition-colors peer-checked:bg-stone-900 peer-checked:text-white peer-focus-visible:ring-3 peer-focus-visible:ring-ring/60 dark:text-stone-200 dark:peer-checked:bg-amber-200 dark:peer-checked:text-stone-950">
                {item.name}
              </span>
            </label>
          )
        })}
        <div
          aria-hidden="true"
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId)
            dragging.current = true
          }}
          onPointerMove={(event) => {
            if (!dragging.current) return
            const box = event.currentTarget.getBoundingClientRect()
            const angle = Math.atan2(event.clientX - (box.left + box.width / 2), box.top + box.height / 2 - event.clientY)
            choose(((Math.round((angle / (Math.PI * 2)) * count) % count) + count) % count)
          }}
          onPointerUp={() => {
            dragging.current = false
          }}
          onPointerCancel={() => {
            dragging.current = false
          }}
          style={{ transform: `translate(-50%, -50%) rotate(${(turn / count) * 360}deg)` }}
          className="absolute top-1/2 left-1/2 size-[42%] cursor-grab touch-none rounded-full bg-[conic-gradient(from_20deg,#52525b,#27272a,#3f3f46,#18181b,#52525b,#27272a,#52525b)] shadow-[0_8px_14px_rgb(0_0_0/0.4),inset_0_1px_1px_rgb(255_255_255/0.3)] transition-transform duration-300 ease-out active:cursor-grabbing motion-reduce:transition-none"
        >
          <span className="absolute top-1.5 left-1/2 h-5 w-1 -translate-x-1/2 rounded-full bg-amber-300" />
        </div>
      </fieldset>

      <div className="flex w-52 flex-col items-center gap-3">
        <div role="img" aria-label={`${drink.name}: ${drink.layers.map((layer) => layer.name).join(", ")}`} className="relative">
          <div className="relative h-32 w-28 overflow-hidden rounded-b-[2.25rem] rounded-t-md bg-white/80 shadow-[inset_0_0_0_3px_rgb(255_255_255),0_8px_14px_-8px_rgb(0_0_0/0.4)] ring-1 ring-stone-300 dark:ring-stone-500">
            <div className="absolute inset-x-[3px] bottom-[3px] flex flex-col-reverse overflow-hidden rounded-b-[2.1rem] transition-[height] duration-500 motion-reduce:transition-none" style={{ height: `${size.fill * 100}%` }}>
              {drink.layers.map((layer) => (
                <span key={layer.name} className="block transition-[height,background-color] duration-500 motion-reduce:transition-none" style={{ height: `${(layer.parts / parts) * 100}%`, backgroundColor: layer.color }} />
              ))}
            </div>
          </div>
          <span aria-hidden="true" className="absolute top-5 -right-5 h-16 w-8 rounded-r-full border-[6px] border-l-0 border-white shadow-sm ring-1 ring-stone-300 dark:ring-stone-500" />
        </div>
        <p aria-live="polite" className="text-center text-sm">
          <span className="font-medium">{drink.name}</span>
          <span className="ml-2 font-mono text-muted-foreground tabular-nums">{money.format(total)}</span>
        </p>
        <fieldset>
          <legend className="sr-only">Size</legend>
          <div className="flex rounded-lg bg-muted p-0.5">
            {sizes.map((item, i) => (
              <label key={item.name} className="cursor-pointer">
                <input
                  type="radio"
                  name={`${name}-size`}
                  className="peer sr-only"
                  checked={i === sizeIndex}
                  onChange={() => {
                    setSizeIndex(i)
                    setAdded(false)
                  }}
                />
                <span className="block rounded-md px-2.5 py-1 text-xs text-foreground/75 transition-colors peer-checked:bg-background peer-checked:text-foreground peer-checked:shadow-sm peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50">
                  {item.name}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <Button
          type="button"
          className="w-full"
          onClick={() => {
            setAdded(true)
            onOrder?.({ drink: drink.name, size: size.name, total })
          }}
        >
          {added ? <Check aria-hidden="true" className="size-4" /> : null}
          {added ? "Added" : "Add to order"}
        </Button>
      </div>
    </div>
  )
}

export { CoffeeOrderDial }
