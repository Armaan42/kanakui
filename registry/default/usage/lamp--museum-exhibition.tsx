import { Button } from "@/components/ui/button"
import { Lamp } from "@/registry/default/ui/lamp"

export const meta = {
  title: "Exhibition announcement",
  description: "The lamp lighting a museum's exhibition announcement on a dark page, with the opening details underneath.",
}

// The museum, exhibition and dates are made up.
export default function MuseumExhibition() {
  return (
    <div className="dark bg-background text-foreground">
      <Lamp color="oklch(0.85 0.09 80)" className="px-6 pt-36 pb-16 text-center">
        <p className="text-sm text-muted-foreground">Copperleaf Museum · Gallery 3</p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">Night Shift: photographs of cities after midnight</h1>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">120 prints from 40 photographers, shown in near darkness with each image lit on its own.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg">Book a time slot</Button>
          <Button size="lg" variant="outline">
            Plan your visit
          </Button>
        </div>
      </Lamp>
      <dl className="mx-auto grid max-w-3xl gap-6 px-6 pb-16 text-center text-sm sm:grid-cols-3">
        <div>
          <dt className="text-muted-foreground">Dates</dt>
          <dd className="mt-1">6 Feb – 31 May 2027</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Late opening</dt>
          <dd className="mt-1">Fridays until 23:00</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Tickets</dt>
          <dd className="mt-1">€14, free under 18</dd>
        </div>
      </dl>
    </div>
  )
}
