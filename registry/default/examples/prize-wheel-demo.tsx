import { PrizeWheel } from "@/registry/default/ui/prize-wheel"

export default function PrizeWheelDemo() {
  return (
    <PrizeWheel
      className="w-[min(20rem,calc(100vw-3rem))]"
      segments={[
        { label: "10% off", color: "#1f1f22" },
        { label: "Free tote", color: "#f2ede3" },
        { label: "5% off", color: "#1f1f22" },
        { label: "Free ship", color: "#f2ede3" },
        { label: "20% off", color: "#e2531b" },
        { label: "Stickers", color: "#f2ede3" },
        { label: "15% off", color: "#1f1f22" },
        { label: "Mystery", color: "#f2ede3" },
      ]}
    />
  )
}
