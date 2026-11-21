import { Check } from "lucide-react"

import { CreditCardForm } from "@/registry/default/ui/credit-card-form"

export const meta = {
  title: "Subscription checkout",
  description: "The credit card form in a subscription checkout, beside the plan summary it pays for.",
}

// The product and plan are made up. Use a test card number; nothing is charged.
export default function SubscriptionCheckout() {
  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 md:grid-cols-[1fr_1.1fr]">
      <section aria-labelledby="plan">
        <p className="text-sm text-muted-foreground">Northlight · Team plan</p>
        <h1 id="plan" className="mt-1 text-2xl font-semibold tracking-tight">
          Start your subscription
        </h1>
        <p className="mt-6 text-4xl font-semibold tabular-nums">
          $96 <span className="text-base font-normal text-muted-foreground">a month for 4 seats</span>
        </p>
        <ul className="mt-6 space-y-2.5 text-sm">
          {["Unlimited projects", "Automations and shared dashboards", "Email support, replies within a day", "Cancel any time from Settings"].map((item) => (
            <li key={item} className="flex gap-2">
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-xs text-muted-foreground">Billed monthly. VAT added at checkout where it applies.</p>
      </section>
      <CreditCardForm submitLabel="Pay $96 and start" successMessage="You're subscribed. A receipt is on its way." />
    </div>
  )
}
