import { LedTicker } from "@/registry/default/ui/led-ticker"

export const meta = {
  title: "Ferry departures board",
  description: "An LED ticker scrolling the service notice above a ferry terminal's departures board.",
}

// The ferry company, routes and times are made up.
const DEPARTURES = [
  { time: "18:20", to: "Cacilhas", pier: "2", status: "Boarding" },
  { time: "18:35", to: "Seixal", pier: "4", status: "On time" },
  { time: "18:40", to: "Barreiro", pier: "1", status: "Delayed 10 min" },
  { time: "18:50", to: "Montijo", pier: "3", status: "On time" },
]

export default function StationBoard() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <section aria-labelledby="board" className="overflow-hidden rounded-xl border bg-[#0b0d10] text-[#e8e2d4] shadow-lg">
        <div className="flex items-baseline justify-between px-5 pt-5">
          <h1 id="board" className="text-lg font-semibold">
            Tidewell Ferries · Departures
          </h1>
          <span className="text-sm text-[#e8e2d4]/60">Cais do Sodré</span>
        </div>
        <div className="px-5 pt-4">
          <LedTicker text="BARREIRO 18:40 DELAYED BY 10 MINUTES - ALL OTHER CROSSINGS ON TIME" color="amber" />
        </div>
        <table className="mt-4 w-full text-left text-sm">
          <thead className="text-xs text-[#e8e2d4]/60">
            <tr>
              <th scope="col" className="px-5 py-2 font-normal">
                Time
              </th>
              <th scope="col" className="py-2 font-normal">
                To
              </th>
              <th scope="col" className="py-2 font-normal">
                Pier
              </th>
              <th scope="col" className="px-5 py-2 text-right font-normal">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {DEPARTURES.map((d) => (
              <tr key={d.time}>
                <td className="px-5 py-3 font-mono tabular-nums">{d.time}</td>
                <td className="py-3 font-medium">{d.to}</td>
                <td className="py-3 tabular-nums">{d.pier}</td>
                <td className={d.status.startsWith("Delayed") ? "px-5 py-3 text-right text-[#ffb020]" : "px-5 py-3 text-right text-[#e8e2d4]/80"}>{d.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
