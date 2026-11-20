import { GradientText } from "@/registry/default/ui/gradient-text"

export default function GradientTextDemo() {
  return (
    <div className="max-w-md text-center">
      <h2 className="text-4xl font-semibold tracking-tight text-balance">
        Annual plans are <GradientText>20% off</GradientText> until 31 January
      </h2>
      <p className="mt-3 text-sm text-muted-foreground">Switch any time from Settings, then Billing.</p>
    </div>
  )
}
