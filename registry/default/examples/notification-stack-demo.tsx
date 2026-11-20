import { Activity, CalendarDays, Mail, MessageCircle } from "lucide-react"

import { NotificationStack } from "@/registry/default/ui/notification-stack"

// Wallpaper and portraits: Unsplash (free under the Unsplash License). People are made up.
const WALLPAPER = "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900&h=1100&fit=crop&auto=format&q=70"
const face = (id: string) => `https://images.unsplash.com/photo-${id}?w=96&h=96&fit=crop&crop=faces&auto=format&q=80`

export default function NotificationStackDemo() {
  return (
    <div
      className="flex w-[min(24rem,calc(100vw-3rem))] flex-col rounded-[2rem] bg-cover bg-center p-4 pt-10 pb-24 shadow-xl"
      style={{ backgroundImage: `linear-gradient(rgb(0 0 0 / 0.45), rgb(0 0 0 / 0.15) 45%, rgb(0 0 0 / 0.35)), url(${WALLPAPER})` }}
    >
      <p className="text-center text-5xl font-light tracking-tight text-white/95 tabular-nums">9:41</p>
      <p className="mb-8 text-center text-sm font-medium text-white/80">Monday, 16 November</p>
      <NotificationStack
        className="[&>div:first-child]:text-white"
        notifications={[
          {
            id: "1",
            app: "Messages",
            title: "Priya Natarajan",
            body: "Landing at 6:40! See you at arrivals? I’ll be the one with way too many bags.",
            time: "now",
            avatar: face("1494790108377-be9c29b29330"),
            icon: <MessageCircle />,
            iconClassName: "bg-emerald-500",
          },
          {
            id: "2",
            app: "Calendar",
            title: "Design review",
            body: "In 15 minutes · Room 4B · with Sofie and Marcus",
            time: "9:45",
            icon: <CalendarDays />,
            iconClassName: "bg-rose-500",
          },
          {
            id: "3",
            app: "Mail",
            title: "Marcus Reid",
            body: "Re: Q4 launch plan. Looks great overall, one note on the pricing page before we ship.",
            time: "9:12",
            avatar: face("1507003211169-0a1dd7228f2d"),
            icon: <Mail />,
            iconClassName: "bg-sky-500",
          },
          {
            id: "4",
            app: "Fitness",
            title: "Move goal reached",
            body: "You closed your rings before 9 am. That’s 6 days in a row.",
            time: "8:58",
            icon: <Activity />,
            iconClassName: "bg-orange-500",
          },
        ]}
      />
    </div>
  )
}
