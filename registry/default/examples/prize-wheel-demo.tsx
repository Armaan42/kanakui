import { PrizeWheel } from "@/registry/default/ui/prize-wheel"

export default function PrizeWheelDemo() {
  return (
    <PrizeWheel
      className="w-[min(20rem,calc(100vw-3rem))]"
      segments={[
        { label: "10% off", color: "#f43f5e" },
        { label: "Free tote", color: "#f59e0b" },
        { label: "5% off", color: "#10b981" },
        { label: "Free ship", color: "#3b82f6" },
        { label: "20% off", color: "#a855f7" },
        { label: "Sticker", color: "#14b8a6" },
        { label: "15% off", color: "#ec4899" },
        { label: "Mystery", color: "#6366f1" },
      ]}
    />
  )
}
