import { Button } from "@/components/ui/button"
import { FidgetSpinner } from "@/registry/default/ui/fidget-spinner"

export const meta = {
  title: "Study app break",
  description: "The fidget spinner on a study timer's break screen: something to do with your hands for five minutes.",
}

// The app and session are made up.
export default function StudyBreak() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12 text-center">
      <p className="text-sm text-muted-foreground">Kestrel Study · Session 3 of 4 done</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Five minute break</h1>
      <p className="mx-auto mt-2 max-w-md text-muted-foreground">You worked for 50 minutes on organic chemistry. Step away from the notes. Give it a flick.</p>
      <FidgetSpinner className="mx-auto mt-10" color="#0f766e" />
      <div className="mt-10 flex justify-center gap-3">
        <Button variant="outline">Skip the break</Button>
        <Button variant="ghost">End for today</Button>
      </div>
    </div>
  )
}
