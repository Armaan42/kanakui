import { ImageCompare } from "@/registry/default/ui/image-compare"

// Photo: Unsplash (free under the Unsplash License).
const PHOTO = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=750&fit=crop&auto=format&q=80"
const ALT = "Snowy mountain peaks rising above a sea of clouds at sunset"

export default function ImageCompareDemo() {
  return (
    <ImageCompare
      className="max-w-xl"
      beforeLabel="Original"
      afterLabel="Edited"
      before={<img src={PHOTO} alt={ALT} width={1200} height={750} className="size-full object-cover [filter:saturate(0.55)_contrast(0.9)_brightness(0.95)]" />}
      after={<img src={PHOTO} alt={`${ALT}, colour graded`} width={1200} height={750} className="size-full object-cover [filter:saturate(1.15)_contrast(1.08)]" />}
    />
  )
}
