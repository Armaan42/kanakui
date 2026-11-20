import { SlidingPuzzle } from "@/registry/default/ui/sliding-puzzle"

const PHOTO = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=640&h=640&fit=crop&auto=format&q=80"

export default function SlidingPuzzleDemo() {
  return <SlidingPuzzle src={PHOTO} alt="a rowing boat on a turquoise mountain lake" />
}
