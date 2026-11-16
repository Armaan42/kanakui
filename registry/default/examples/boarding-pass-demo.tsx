import { BoardingPass } from "@/registry/default/ui/boarding-pass"

// The airline and passenger are made up.
export default function BoardingPassDemo() {
  return (
    <BoardingPass
      className="w-[min(22rem,calc(100vw-3rem))]"
      airline="Skylark Air"
      flight="SK 208"
      from={{ code: "LHR", city: "London" }}
      to={{ code: "HND", city: "Tokyo" }}
      date="Tue, 7 Apr"
      departs="19:05"
      arrives="16:40 +1"
      passenger="Priya Natarajan"
      seat="24A"
      gate="B32"
      boarding="18:15"
      cabin="Economy"
      reference="K7PX2Q"
      details={[
        { label: "Fare", value: "Economy Flex" },
        { label: "Checked bag", value: "1 × 23 kg" },
        { label: "Cabin bag", value: "1 × 10 kg" },
        { label: "Seat", value: "Window, extra legroom" },
        { label: "Meal", value: "Vegetarian" },
      ]}
    />
  )
}
