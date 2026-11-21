"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Rating } from "@/registry/default/ui/rating"

export const meta = {
  title: "Review after delivery",
  description: "Rating inputs in a post-delivery review form, plus read-only ratings in the reviews list below.",
}

// Sample photo. Swap in your own. The shop, product and reviews are made up.
const PHOTO = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop&auto=format&q=70"
const REVIEWS = [
  { name: "Mei L.", stars: 5, text: "Quiet, comfortable for a whole flight, and the case actually fits in my bag." },
  { name: "Diego A.", stars: 4, text: "Great sound. The ear cushions get warm after a couple of hours." },
]

export default function ProductReview() {
  const [overall, setOverall] = React.useState(0)
  const [comfort, setComfort] = React.useState(0)
  const [sent, setSent] = React.useState(false)

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="flex items-center gap-4">
        <img src={PHOTO} alt="Black over-ear headphones on a yellow background" width={200} height={200} className="size-16 rounded-lg object-cover" />
        <div>
          <p className="text-sm text-muted-foreground">Delivered on 19 November</p>
          <h1 className="text-xl font-semibold">How are your Field Headphones?</h1>
        </div>
      </div>

      {sent ? (
        <p role="status" className="mt-8 flex items-center gap-2 rounded-xl border p-4 text-sm">
          <Check aria-hidden="true" className="size-4" />
          Thanks, Ana. Your review will appear after a quick check.
        </p>
      ) : (
        <form
          className="mt-8 grid gap-5 rounded-xl border bg-card p-6"
          onSubmit={(event) => {
            event.preventDefault()
            if (overall > 0) setSent(true)
          }}
        >
          <Rating label="Overall" value={overall} onValueChange={setOverall} />
          <Rating label="Comfort" value={comfort} onValueChange={setComfort} />
          <label className="grid gap-1.5 text-sm font-medium">
            What should other people know?
            <textarea rows={3} className="rounded-md border bg-transparent px-3 py-2 font-normal outline-none focus-visible:ring-3 focus-visible:ring-ring/50" />
          </label>
          <div>
            <Button type="submit" disabled={overall === 0}>
              Post review
            </Button>
          </div>
        </form>
      )}

      <h2 className="mt-10 font-semibold">Recent reviews</h2>
      <ul className="mt-3 divide-y border-y">
        {REVIEWS.map((review) => (
          <li key={review.name} className="py-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="font-medium">{review.name}</span>
              <Rating label={`${review.name}'s rating`} value={review.stars} readOnly />
            </div>
            <p className="mt-1 text-muted-foreground">{review.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
