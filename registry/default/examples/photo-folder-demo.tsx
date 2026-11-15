import { PhotoFolder } from "@/registry/default/ui/photo-folder"

// Photos: Unsplash (free under the Unsplash License).
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=480&h=600&fit=crop&auto=format&q=75`

const FOLDERS = [
  {
    label: "Japan",
    color: "oklch(0.7 0.14 245)",
    images: [
      { src: photo("1493976040374-85c8e12f0c0e"), alt: "A pagoda at the end of an old street in Kyoto at dusk" },
      { src: photo("1478436127897-769e1b3f0f36"), alt: "A tunnel of red torii gates" },
      { src: photo("1490806843957-31f4c9a91c65"), alt: "Mount Fuji framed by cherry blossoms" },
    ],
  },
  {
    label: "Up north",
    color: "oklch(0.74 0.13 160)",
    images: [
      { src: photo("1476610182048-b716b8518aae"), alt: "A waterfall over green cliffs at sunset" },
      { src: photo("1531366936337-7c912a4589a7"), alt: "Green and purple northern lights over snow" },
      { src: photo("1504893524553-b855bce32c67"), alt: "A river winding through a mossy canyon" },
    ],
  },
  {
    label: "Tokyo nights",
    color: "oklch(0.68 0.16 300)",
    images: [
      { src: photo("1528360983277-13d401cdc186"), alt: "A red paper lantern in a narrow alley at night" },
      { src: photo("1540959733332-eab4deabeeaf"), alt: "A neon-lit shopping street full of people" },
      { src: photo("1513407030348-c983a97b98d8"), alt: "Tokyo Tower above the city at twilight" },
    ],
  },
]

export default function PhotoFolderDemo() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-x-6 gap-y-14 pt-28">
      {FOLDERS.map((folder) => (
        <PhotoFolder key={folder.label} {...folder} className="w-44 sm:w-52" />
      ))}
    </div>
  )
}
