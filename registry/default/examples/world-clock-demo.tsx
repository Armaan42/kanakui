import { WorldClock } from "@/registry/default/ui/world-clock"

export default function WorldClockDemo() {
  return (
    <WorldClock
      zones={[
        { city: "San Francisco", timeZone: "America/Los_Angeles" },
        { city: "London", timeZone: "Europe/London" },
        { city: "Bengaluru", timeZone: "Asia/Kolkata" },
        { city: "Tokyo", timeZone: "Asia/Tokyo" },
      ]}
    />
  )
}
