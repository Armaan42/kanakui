import { Archive, File, Inbox, Search, Send, Star } from "lucide-react"

import { ScrollDevice } from "@/registry/default/ui/scroll-device"

// The mail app, people and messages are made up.
const FOLDERS = [
  { icon: Inbox, label: "Inbox", count: 12, active: true },
  { icon: Star, label: "Starred" },
  { icon: Send, label: "Sent" },
  { icon: File, label: "Drafts", count: 2 },
  { icon: Archive, label: "Archive" },
]

const MAIL = [
  { from: "Lena Okafor", subject: "Venue walkthrough moved to Thursday", time: "9:42", unread: true },
  { from: "Tomás Rivera", subject: "Re: Q3 vendor contracts", time: "8:15", unread: true },
  { from: "Harbour Print Co.", subject: "Proofs ready for the spring catalogue", time: "Tue" },
  { from: "Mei Lin", subject: "Notes from the design review", time: "Mon" },
  { from: "Aditya Rao", subject: "Can we push the launch call?", time: "Mon" },
]

export default function ScrollDeviceDemo() {
  return (
    <ScrollDevice className="w-full max-w-2xl">
      <div className="flex size-full bg-background text-[11px] text-foreground">
        <div className="hidden w-[24%] shrink-0 flex-col gap-0.5 border-r bg-muted/40 p-2.5 sm:flex">
          <p className="mb-2 px-2 text-xs font-semibold">Fieldnote Mail</p>
          {FOLDERS.map((folder) => (
            <span key={folder.label} className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${folder.active ? "bg-background font-medium shadow-xs" : "text-muted-foreground"}`}>
              <folder.icon className="size-3.5" aria-hidden="true" />
              {folder.label}
              {folder.count ? <span className="ml-auto tabular-nums">{folder.count}</span> : null}
            </span>
          ))}
        </div>
        <div className="flex w-[40%] shrink-0 flex-col border-r sm:w-[38%]">
          <div className="flex items-center gap-1.5 border-b px-3 py-2 text-muted-foreground">
            <Search className="size-3.5" aria-hidden="true" />
            Search mail
          </div>
          {MAIL.map((mail, i) => (
            <div key={mail.subject} className={`border-b px-3 py-2 ${i === 0 ? "bg-muted/60" : ""}`}>
              <div className="flex items-center gap-1.5">
                {mail.unread ? <span className="size-1.5 shrink-0 rounded-full bg-foreground" aria-hidden="true" /> : null}
                <span className={`truncate ${mail.unread ? "font-semibold" : "font-medium"}`}>{mail.from}</span>
                <span className="ml-auto text-muted-foreground tabular-nums">{mail.time}</span>
              </div>
              <p className="mt-0.5 truncate text-muted-foreground">{mail.subject}</p>
            </div>
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
          <p className="text-xs font-semibold sm:text-sm">Venue walkthrough moved to Thursday</p>
          <p className="mt-1 text-muted-foreground">Lena Okafor · to you, Tomás</p>
          <div className="mt-3 space-y-2 leading-relaxed">
            <p>Hi both,</p>
            <p>The Old Mill can only do Thursday at 10:00 now, so I&apos;ve moved the walkthrough. Parking is behind the east wing.</p>
            <p className="hidden sm:block">I&apos;ll bring the floor plan and the catering shortlist. Shout if Thursday doesn&apos;t work.</p>
          </div>
          <div className="mt-auto flex gap-1.5">
            <span className="rounded-md bg-primary px-2.5 py-1 font-medium text-primary-foreground">Reply</span>
            <span className="rounded-md border px-2.5 py-1">Forward</span>
          </div>
        </div>
      </div>
    </ScrollDevice>
  )
}
