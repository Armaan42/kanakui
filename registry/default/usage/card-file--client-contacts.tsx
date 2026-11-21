"use client"

import * as React from "react"
import { Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CardFile, type FileCard } from "@/registry/default/ui/card-file"

export const meta = {
  title: "Client contacts",
  description: "The card file as the contact list in a small studio's client tool, with quick actions for the card on top.",
}

// The studio, clients and contact details are made up.
const CONTACTS: FileCard[] = [
  { name: "Inês Moreira", role: "Head of brand, Brightwater", phone: "+351 912 000 314", email: "ines@brightwater.example", note: "Prefers calls before 11am. Signed off the spring lookbook." },
  { name: "Jonas Keller", role: "Founder, Kestrel Bikes", phone: "+49 151 0000 2271", email: "jonas@kestrel.example", note: "New catalogue due in March. Send rough layouts first." },
  { name: "Priya Raman", role: "Marketing lead, Oakline", phone: "+44 7700 900 418", email: "priya@oakline.example", note: "Invoices go to accounts@, not to Priya." },
  { name: "Tomás Rivera", role: "Owner, Kiln Corner Café", phone: "+351 913 000 552", email: "tomas@kilncorner.example", note: "Menu reprint every season. Likes the green ink." },
]

export default function ClientContacts() {
  const [current, setCurrent] = React.useState(CONTACTS[0])

  return (
    <div className="mx-auto grid max-w-4xl items-start gap-10 px-6 py-12 md:grid-cols-[minmax(0,1fr)_16rem]">
      <div>
        <p className="text-sm text-muted-foreground">Paperkite Studio · Clients</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Contacts</h1>
        <CardFile className="mt-8" cards={CONTACTS} onCardChange={(card) => setCurrent(card)} />
      </div>
      <aside aria-labelledby="actions" className="rounded-xl border bg-card p-5 md:mt-16">
        <h2 id="actions" className="text-sm font-medium">
          {current.name}
        </h2>
        <p className="text-sm text-muted-foreground">{current.role}</p>
        <div className="mt-4 grid gap-2">
          <Button variant="outline" asChild>
            <a href={`tel:${current.phone?.replace(/\s/g, "")}`}>
              <Phone aria-hidden="true" />
              Call
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={`mailto:${current.email}`}>
              <Mail aria-hidden="true" />
              Email
            </a>
          </Button>
        </div>
      </aside>
    </div>
  )
}
