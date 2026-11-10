import { NumberTicker } from "@/registry/default/ui/number-ticker"

export default function NumberTickerDemo() {
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-6 text-center">
      <div>
        <NumberTicker value={12480} className="text-4xl font-semibold tracking-tight" />
        <p className="mt-1 text-sm text-muted-foreground">Installs</p>
      </div>
      <div>
        <NumberTicker value={99.95} decimals={2} className="text-4xl font-semibold tracking-tight" />
        <span className="text-4xl font-semibold">%</span>
        <p className="mt-1 text-sm text-muted-foreground">Uptime</p>
      </div>
    </div>
  )
}
