import { CalendarPlus, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PostageStamp } from "@/registry/default/ui/postage-stamp"
import { WallCalendar } from "@/registry/default/ui/wall-calendar"

// Sample photos. Swap in your own. The couple and venue are made up.
const photo = (id: string, width: number, height: number) => `https://images.unsplash.com/photo-${id}?w=${width}&h=${height}&fit=crop&auto=format&q=78`

const CALENDAR_FILE = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Save the date//EN",
  "BEGIN:VEVENT",
  "UID:ana-and-leo-2027@example.com",
  "DTSTAMP:20260101T000000Z",
  "DTSTART:20270612T140000Z",
  "DTEND:20270612T220000Z",
  "SUMMARY:Ana and Leo's wedding",
  "LOCATION:Villa Serena\\, Lake Como",
  "END:VEVENT",
  "END:VCALENDAR",
].join("\r\n")

const wedding = new Date(2027, 5, 12)

/** A wedding save-the-date with the day circled, a stamp and an add-to-calendar file. */
export function Wedding01() {
  return (
    <section aria-labelledby="wedding-01-title" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
        <div className="relative">
          <img src={photo("1469371670807-013ccf25f16a", 1100, 900)} alt="A garden aisle lined with pink and white flowers" className="aspect-[5/4] w-full rounded-2xl bg-muted object-cover" />
          <PostageStamp
            src={photo("1519741497674-611481863552", 360, 450)}
            alt="A bride holding a bouquet in warm light"
            title="Ana & Leo"
            country="Italia"
            value="1 love"
            postmark={{ place: "Lake Como", date: "12 JUN 27" }}
            defaultCancelled
            className="absolute right-1 -bottom-8 w-32 rotate-3 sm:right-6 sm:w-40"
          />
        </div>
        <div className="mx-auto w-full max-w-80 text-center lg:text-left">
          <p className="font-serif text-lg text-muted-foreground italic">Save the date</p>
          <h2 id="wedding-01-title" className="mt-1 font-serif text-5xl font-semibold tracking-tight">
            Ana &amp; Leo
          </h2>
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin aria-hidden="true" className="size-4" />
            Villa Serena, Lake Como
          </p>
          <WallCalendar defaultMonth={wedding} selected={{ from: wedding, to: null }} className="mt-6" />
          <Button asChild className="mt-5 w-full">
            <a href={`data:text/calendar;charset=utf-8,${encodeURIComponent(CALENDAR_FILE)}`} download="ana-and-leo-wedding.ics">
              <CalendarPlus aria-hidden="true" className="size-4" />
              Add to calendar
            </a>
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">Formal invitation to follow.</p>
        </div>
      </div>
    </section>
  )
}
