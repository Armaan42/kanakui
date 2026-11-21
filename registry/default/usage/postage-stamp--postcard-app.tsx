"use client"

import * as React from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PostageStamp } from "@/registry/default/ui/postage-stamp"

export const meta = {
  title: "Send a printed postcard",
  description: "The postage stamp on a postcard app's preview; sending the card postmarks the stamp.",
}

// Sample photo. Swap in your own. The app, sender and recipient are made up.
const PHOTO = "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=480&h=600&fit=crop&auto=format&q=80"

export default function PostcardApp() {
  const [sent, setSent] = React.useState(false)

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Your postcard from Santorini</h1>
      <p className="mt-1 text-sm text-muted-foreground">We print it on thick card and post it within a day. €3.50 anywhere in Europe.</p>
      <div className="mt-6 grid gap-6 rounded-xl border bg-[#fbf8f1] p-6 text-[#2a2118] shadow-sm sm:grid-cols-[1fr_auto] dark:bg-[#f3ede0]">
        <div className="font-serif text-lg leading-relaxed">
          <p>Dear Grandma,</p>
          <p className="mt-2">The paths down to the sea are steeper than they look in the photos. We swam every morning. Back on Sunday with too many lemons.</p>
          <p className="mt-2">Love, Ana</p>
        </div>
        <div className="flex flex-col items-end gap-6">
          <PostageStamp
            src={PHOTO}
            alt="White houses above a blue sea"
            title="Santorini"
            country="Greece"
            value="€3.50"
            postmark={{ place: "Fira", date: "21 NOV 2026" }}
            cancelled={sent}
            onCancelledChange={setSent}
          />
          <address className="text-sm not-italic">
            Rosa Ribeiro
            <br />
            Rua das Flores 28
            <br />
            1200-195 Lisboa, Portugal
          </address>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <Button disabled={sent} onClick={() => setSent(true)}>
          <Send aria-hidden="true" />
          {sent ? "On its way" : "Send for €3.50"}
        </Button>
        {sent ? (
          <p role="status" className="text-sm text-muted-foreground">
            Posted from Fira today. It usually arrives in 4 to 6 days.
          </p>
        ) : null}
      </div>
    </div>
  )
}
