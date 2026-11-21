import { Clock, DoorOpen, Luggage } from "lucide-react"

import { BoardingPass } from "@/registry/default/ui/boarding-pass"

export const meta = {
  title: "Trip wallet",
  description: "The boarding pass in a travel app's trip wallet, next to gate and baggage updates for the same flight.",
}

// The airline, flight and passenger are made up.
export default function TripWallet() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Your trips</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">London to Lisbon, today</h1>
      <div className="mt-8 grid items-start gap-8 md:grid-cols-[22rem_minmax(0,1fr)]">
        <BoardingPass
          className="w-full"
          airline="Copperleaf Air"
          flight="CL 412"
          from={{ code: "LHR", city: "London" }}
          to={{ code: "LIS", city: "Lisbon" }}
          date="Fri, 21 Nov"
          departs="14:35"
          arrives="17:15"
          passenger="Ana Ribeiro"
          seat="12C"
          gate="A21"
          boarding="13:55"
          cabin="Economy"
          reference="R4T9QM"
          details={[
            { label: "Fare", value: "Economy Classic" },
            { label: "Checked bag", value: "1 × 23 kg" },
            { label: "Seat", value: "Aisle" },
          ]}
        />
        <section aria-labelledby="updates" className="space-y-3">
          <h2 id="updates" className="font-medium">
            Flight updates
          </h2>
          {[
            { icon: DoorOpen, title: "Gate assigned: A21", text: "About 12 minutes' walk from security.", time: "12:40" },
            { icon: Clock, title: "On time", text: "Boarding starts at 13:55.", time: "11:02" },
            { icon: Luggage, title: "Bag checked in", text: "Tag CL 412 883 · collect at belt 7 in Lisbon.", time: "10:48" },
          ].map(({ icon: Icon, title, text, time }) => (
            <div key={title} className="flex gap-3 rounded-xl border bg-card p-4 text-sm">
              <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="font-medium">{title}</p>
                <p className="text-muted-foreground">{text}</p>
              </div>
              <span className="text-muted-foreground tabular-nums">{time}</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
