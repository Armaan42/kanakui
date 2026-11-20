import { PostageStamp } from "@/registry/default/ui/postage-stamp"

// Sample photos. Swap in your own.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=420&h=525&fit=crop&auto=format&q=75`

export default function PostageStampDemo() {
  return (
    <PostageStamp
      src={photo("1523906834658-6e24ef2386f9")}
      alt="The Rialto Bridge over the Grand Canal"
      title="Venice"
      country="Italy"
      value="€1.30"
      postmark={{ place: "Venezia", date: "27 JUN 26" }}
    />
  )
}
