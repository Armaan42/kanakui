import { ScoreGauge } from "@/registry/default/ui/score-gauge"

export default function ScoreGaugeDemo() {
  return <ScoreGauge className="w-[min(18rem,calc(100vw-3rem))]" value={742} label="Credit score" caption="Updated 2 Nov · +12 this month" />
}
