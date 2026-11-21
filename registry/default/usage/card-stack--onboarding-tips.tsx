import { BellRing, Keyboard, Share2, Upload } from "lucide-react"

import { CardStack } from "@/registry/default/ui/card-stack"

export const meta = {
  title: "Onboarding tips",
  description: "A card stack of getting-started tips on an app's first screen, one tip at a time.",
}

// The app is made up.
const TIPS = [
  { id: "import", icon: Upload, title: "Import your old tasks", text: "Drop in a spreadsheet export and we'll keep owners, due dates and comments." },
  { id: "invite", icon: Share2, title: "Invite your team", text: "Anyone with your company email can join without an invite." },
  { id: "keys", icon: Keyboard, title: "Learn three shortcuts", text: "C creates a task, / searches and Ctrl K opens everything else." },
  { id: "alerts", icon: BellRing, title: "Choose your alerts", text: "Pick what reaches your phone and what waits for the weekly digest." },
]

export default function OnboardingTips() {
  return (
    <div className="mx-auto grid max-w-4xl items-center gap-10 px-6 py-16 md:grid-cols-2">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome to Northlight, Lena</h1>
        <p className="mt-2 text-muted-foreground">Four things that make the first week easier. Skip any you don&apos;t need.</p>
      </div>
      <CardStack
        label="Getting started tips"
        items={TIPS.map(({ id, icon: Icon, title, text }) => ({
          id,
          label: title,
          content: (
            <div className="flex h-full flex-col justify-between">
              <Icon aria-hidden="true" className="size-6 text-muted-foreground" />
              <div>
                <p className="text-lg font-semibold">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ),
        }))}
      />
    </div>
  )
}
