import { Clock, PlayCircle } from "lucide-react"

import { DepthCard, DepthCardItem } from "@/registry/default/ui/depth-card"

export const meta = {
  title: "Course promo card",
  description: "The depth card promoting a featured course on a learning site, with the photo and badge floating above the text.",
}

// Sample photo. Swap in your own. The course is made up.
const PHOTO = "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=900&h=560&fit=crop&auto=format&q=80"

export default function CoursePromo() {
  return (
    <section className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-16 md:grid-cols-2">
      <div>
        <p className="text-sm text-muted-foreground">Kestrel Learning · new this month</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Cook a week of dinners in one Sunday</h2>
        <p className="mt-3 text-muted-foreground">Twelve short lessons on batch cooking from a chef who used to run a school canteen.</p>
      </div>
      <DepthCard className="w-full max-w-md rounded-2xl border bg-card p-5 text-card-foreground shadow-sm">
        <DepthCardItem depth={90} className="relative">
          <img src={PHOTO} alt="Two bowls of orange squash soup topped with seeds" width={900} height={560} className="aspect-[16/10] w-full rounded-xl object-cover" />
          <DepthCardItem depth={40} className="absolute top-3 left-3">
            <span className="rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">12 lessons</span>
          </DepthCardItem>
        </DepthCardItem>
        <DepthCardItem depth={50} className="mt-4">
          <h3 className="font-semibold">Batch cooking with Mei Lin</h3>
        </DepthCardItem>
        <DepthCardItem depth={30} className="mt-1">
          <p className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock aria-hidden="true" className="size-3.5" />
              2 h 10 min
            </span>
            <span>Beginner</span>
            <span>€29</span>
          </p>
        </DepthCardItem>
        <DepthCardItem depth={40} className="mt-4">
          <a href="#course" className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <PlayCircle aria-hidden="true" className="size-4" />
            Watch the first lesson free
          </a>
        </DepthCardItem>
      </DepthCard>
    </section>
  )
}
