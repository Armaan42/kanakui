import { Rating } from "@/registry/default/ui/rating"

export default function RatingDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Rating label="Rate this template" defaultValue={4} />
      <Rating label="Average rating" value={3} readOnly />
    </div>
  )
}
