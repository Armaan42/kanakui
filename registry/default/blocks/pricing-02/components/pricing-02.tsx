import { Check, Minus } from "lucide-react"

import { Button } from "@/components/ui/button"

const plans = [
  { id: "starter", name: "Starter", price: "$0", note: "Free forever" },
  { id: "pro", name: "Pro", price: "$29", note: "per month" },
] as const

// true/false renders a check or dash; a string is shown as text.
const features: { name: string; starter: boolean | string; pro: boolean | string }[] = [
  { name: "Projects", starter: "3", pro: "Unlimited" },
  { name: "Team members", starter: "1", pro: "Up to 20" },
  { name: "Custom domains", starter: false, pro: true },
  { name: "Analytics", starter: "7 days", pro: "1 year" },
  { name: "Password protection", starter: false, pro: true },
  { name: "Priority support", starter: false, pro: true },
]

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") return <span>{value}</span>
  return value ? (
    <>
      <Check aria-hidden="true" className="mx-auto size-4" />
      <span className="sr-only">Included</span>
    </>
  ) : (
    <>
      <Minus aria-hidden="true" className="mx-auto size-4 text-muted-foreground" />
      <span className="sr-only">Not included</span>
    </>
  )
}

/** Two plans compared feature by feature in an accessible table. Scrolls sideways on small screens. */
export function Pricing02() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Compare plans</h2>
        {/* `relative` keeps the visually hidden (absolutely positioned) cell text
            inside this scroll container, so it can't widen the page on phones. */}
        <div className="relative mt-12 overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[32rem] text-sm">
            <caption className="sr-only">Features included in each plan</caption>
            <thead>
              <tr className="border-b">
                <th scope="col" className="p-4 text-left font-medium text-muted-foreground">
                  Feature
                </th>
                {plans.map((plan) => (
                  <th key={plan.id} scope="col" className="p-4 text-center">
                    <span className="block text-base font-semibold">{plan.name}</span>
                    <span className="block text-2xl font-semibold tracking-tight">{plan.price}</span>
                    <span className="block text-xs font-normal text-muted-foreground">{plan.note}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {features.map((feature) => (
                <tr key={feature.name}>
                  <th scope="row" className="p-4 text-left font-normal">
                    {feature.name}
                  </th>
                  <td className="p-4 text-center">
                    <Cell value={feature.starter} />
                  </td>
                  <td className="p-4 text-center">
                    <Cell value={feature.pro} />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t">
                <td className="p-4" />
                <td className="p-4 text-center">
                  <Button variant="outline" className="w-full">
                    Start free
                  </Button>
                </td>
                <td className="p-4 text-center">
                  <Button className="w-full">Upgrade to Pro</Button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  )
}
