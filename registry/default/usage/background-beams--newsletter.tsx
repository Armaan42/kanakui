import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BackgroundBeams } from "@/registry/default/ui/background-beams"

export const meta = {
  title: "Newsletter sign-up section",
  description: "Background beams behind a dark newsletter section, with the form and past issues kept readable on top.",
}

// The newsletter and issues are made up.
const ISSUES = ["#41 · How we price annual plans", "#40 · The onboarding email nobody opens", "#39 · Killing a feature, kindly"]

export default function NewsletterSection() {
  return (
    <section className="dark relative isolate overflow-hidden bg-background px-6 py-20 text-foreground">
      <BackgroundBeams />
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Shipping notes, every other Tuesday</h2>
        <p className="mt-3 text-muted-foreground">A short email from the Kestrel team: what shipped, what broke and what we learned.</p>
        <form className="mx-auto mt-8 flex max-w-md gap-2" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Input id="newsletter-email" type="email" placeholder="you@company.com" className="bg-background/70" />
          <Button type="submit">Subscribe</Button>
        </form>
        <p className="mt-3 text-xs text-muted-foreground">Unsubscribe with one click. No tracking pixels.</p>
        <ul className="mt-10 space-y-2 text-sm text-muted-foreground">
          {ISSUES.map((issue) => (
            <li key={issue}>{issue}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
