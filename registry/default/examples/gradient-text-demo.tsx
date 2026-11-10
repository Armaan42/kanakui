import { GradientText } from "@/registry/default/ui/gradient-text"

export default function GradientTextDemo() {
  return (
    <div className="space-y-4 text-center">
      <h2 className="text-4xl font-semibold tracking-tight">
        <GradientText>Quietly animated headline</GradientText>
      </h2>
      <p className="text-2xl font-semibold">
        <GradientText colors={["#6366f1", "#06b6d4", "#10b981"]}>With your own colors</GradientText>
      </p>
    </div>
  )
}
