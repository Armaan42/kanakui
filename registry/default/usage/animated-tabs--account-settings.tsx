import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AnimatedTabs } from "@/registry/default/ui/animated-tabs"

export const meta = {
  title: "Account settings",
  description: "Animated tabs switching between the profile, billing and team views of an app's settings page.",
}

// The account, plan and invoices are made up.
const INVOICES = [
  { id: "INV-2041", date: "1 Nov 2026", amount: "$96.00" },
  { id: "INV-1987", date: "1 Oct 2026", amount: "$96.00" },
  { id: "INV-1932", date: "1 Sep 2026", amount: "$72.00" },
]

const TEAM = [
  { name: "Lena Okafor", email: "lena@northlight.app", role: "Owner" },
  { name: "Tomás Rivera", email: "tomas@northlight.app", role: "Admin" },
  { name: "Mei Lin", email: "mei@northlight.app", role: "Member" },
]

function Profile() {
  return (
    <form className="grid max-w-lg gap-4" onSubmit={(event) => event.preventDefault()}>
      <label className="grid gap-1.5 text-sm font-medium">
        Full name
        <Input defaultValue="Lena Okafor" />
      </label>
      <label className="grid gap-1.5 text-sm font-medium">
        Email
        <Input type="email" defaultValue="lena@northlight.app" />
      </label>
      <label className="grid gap-1.5 text-sm font-medium">
        Time zone
        <Input defaultValue="Europe/Lisbon" />
      </label>
      <div>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  )
}

function Billing() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4">
        <div>
          <p className="font-medium">Team plan</p>
          <p className="text-sm text-muted-foreground">$96 a month for 8 seats · renews 1 December</p>
        </div>
        <Button variant="outline">Change plan</Button>
      </div>
      <div>
        <h3 className="text-sm font-medium">Invoices</h3>
        <ul className="mt-2 divide-y rounded-lg border">
          {INVOICES.map((invoice) => (
            <li key={invoice.id} className="flex items-center gap-4 px-4 py-3 text-sm">
              <span className="font-mono text-xs">{invoice.id}</span>
              <span className="flex-1 text-muted-foreground">{invoice.date}</span>
              <span className="tabular-nums">{invoice.amount}</span>
              <Button variant="ghost" size="icon-sm" aria-label={`Download ${invoice.id}`}>
                <Download aria-hidden="true" />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Team() {
  return (
    <ul className="divide-y rounded-lg border">
      {TEAM.map((person) => (
        <li key={person.email} className="flex items-center gap-3 px-4 py-3 text-sm">
          <span className="grid size-8 place-items-center rounded-full bg-muted text-xs font-medium">
            {person.name.split(" ").map((p) => p[0]).join("")}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-medium">{person.name}</span>
            <span className="block truncate text-muted-foreground">{person.email}</span>
          </span>
          <span className="text-muted-foreground">{person.role}</span>
        </li>
      ))}
    </ul>
  )
}

export default function AccountSettings() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage your profile, billing and who has access to Northlight.</p>
      <AnimatedTabs
        label="Settings sections"
        className="mt-8"
        tabs={[
          { value: "profile", label: "Profile", content: <Profile /> },
          { value: "billing", label: "Billing", content: <Billing /> },
          { value: "team", label: "Team", content: <Team /> },
        ]}
      />
    </div>
  )
}
