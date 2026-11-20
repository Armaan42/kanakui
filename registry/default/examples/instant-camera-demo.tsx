import { InstantCamera } from "@/registry/default/ui/instant-camera"

// Sample photos. Swap in your own.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=500&h=500&fit=crop&auto=format&q=75`

export default function InstantCameraDemo() {
  return (
    <InstantCamera
      defaultTaken={1}
      photos={[
        { src: photo("1507525428034-b723cf961d3e"), alt: "Gentle waves on a beach at sunrise", caption: "first light" },
        { src: photo("1533105079780-92b9be482077"), alt: "White houses above a blue sea", caption: "the long way down" },
        { src: photo("1502602898657-3e91760cbb34"), alt: "The Eiffel Tower at dusk", caption: "last night in Paris" },
      ]}
    />
  )
}
