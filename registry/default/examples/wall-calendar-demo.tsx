import { WallCalendar } from "@/registry/default/ui/wall-calendar"

// Photos: Unsplash (free under the Unsplash License).
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=640&h=320&fit=crop&auto=format&q=75`

const photos = [
  { src: photo("1501785888041-af3ef285b470"), alt: "Rowing boats on a turquoise lake below mountains" },
  { src: photo("1507525428034-b723cf961d3e"), alt: "Gentle waves on a beach at sunrise" },
]

export default function WallCalendarDemo() {
  return (
    <WallCalendar
      mode="range"
      defaultMonth={new Date(2027, 5, 1)}
      defaultSelected={{ from: new Date(2027, 5, 9), to: new Date(2027, 5, 13) }}
      photos={photos}
    />
  )
}
