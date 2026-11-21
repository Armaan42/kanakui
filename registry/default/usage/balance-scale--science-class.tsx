import { Input } from "@/components/ui/input"
import { BalanceScale } from "@/registry/default/ui/balance-scale"

export const meta = {
  title: "Science class activity",
  description: "The balance scale in an online science lesson: weigh three mystery parcels and record each one in the lab book.",
}

// The lesson is made up.
export default function ScienceClass() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Halden Science · Forces and mass · Activity 2</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">How heavy is the parcel?</h1>
      <p className="mt-2 text-muted-foreground">
        Put brass weights on the right-hand pan until the beam is level. Write the weight down, then press New parcel and weigh the next one.
      </p>
      <div className="mt-8 grid grid-cols-[minmax(0,1fr)] items-start gap-10 md:grid-cols-[minmax(0,1fr)_14rem]">
        <BalanceScale className="mx-auto" mystery={27} />
        <section aria-labelledby="lab-book" className="rounded-xl border bg-card p-5">
          <h2 id="lab-book" className="text-sm font-medium">
            Lab book
          </h2>
          <div className="mt-4 grid gap-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-3">
                <label htmlFor={`parcel-${n}`} className="w-16 shrink-0 text-sm text-muted-foreground">
                  Parcel {n}
                </label>
                <Input id={`parcel-${n}`} inputMode="numeric" placeholder="grams" />
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Which weights did you need most often? Why?</p>
        </section>
      </div>
    </div>
  )
}
