import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BlurText } from "@/registry/default/ui/blur-text"
import { Lamp } from "@/registry/default/ui/lamp"

/** A centered hero lit by a lamp, with a headline that rises out of a blur. Works in Server Components. */
export function Hero09() {
  return (
    <section className="dark border-b bg-background text-foreground">
      <Lamp className="px-4 pt-44 pb-24 text-center sm:px-6 sm:pt-52 sm:pb-28">
        <BlurText
          as="h1"
          text="Ship the product your users keep talking about"
          className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl"
        />
        <p className="mt-6 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
          One sentence on what you make and who it helps. Replace this with your own pitch.
        </p>
        <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Button size="lg" className="h-11 px-6">
            Get started
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="outline" className="h-11 px-6">
            Book a demo
          </Button>
        </div>
      </Lamp>
    </section>
  )
}
