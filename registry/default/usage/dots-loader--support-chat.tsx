"use client"

import * as React from "react"
import { SendHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DotsLoader } from "@/registry/default/ui/dots-loader"

export const meta = {
  title: "Support chat",
  description: "The dots loader as the typing indicator in a support chat window; send a message to see the agent reply.",
}

// The shop and agent are made up.
type Message = { from: "agent" | "you"; text: string }

export default function SupportChat() {
  const [messages, setMessages] = React.useState<Message[]>([
    { from: "agent", text: "Hi Ana, this is Sofie from Halden Goods. How can I help?" },
    { from: "you", text: "My order #48213 says delivered but I haven't got it." },
  ])
  const [typing, setTyping] = React.useState(false)
  const [draft, setDraft] = React.useState("Could you check with the courier?")

  const send = (event: React.FormEvent) => {
    event.preventDefault()
    if (!draft.trim()) return
    setMessages((m) => [...m, { from: "you", text: draft.trim() }])
    setDraft("")
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { from: "agent", text: "Done. The courier left it with your neighbour at number 30. I've sent you their photo of the doorstep." }])
    }, 2200)
  }

  return (
    <div className="flex min-h-svh items-end justify-end bg-muted/40 p-6">
      <section aria-label="Support chat" className="flex h-[30rem] w-full max-w-sm flex-col overflow-hidden rounded-2xl border bg-background shadow-xl">
        <header className="border-b px-4 py-3">
          <p className="font-medium">Halden Goods support</p>
          <p className="text-xs text-muted-foreground">Usually replies in a few minutes</p>
        </header>
        <ol aria-live="polite" className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
          {messages.map((message, i) => (
            <li key={i} className={message.from === "you" ? "flex justify-end" : "flex"}>
              <span className={message.from === "you" ? "max-w-[80%] rounded-2xl rounded-br-sm bg-foreground px-3 py-2 text-background" : "max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2"}>
                {message.text}
              </span>
            </li>
          ))}
          {typing ? (
            <li className="flex">
              <span className="rounded-2xl rounded-bl-sm bg-muted px-3 py-2.5">
                <DotsLoader label="Sofie is typing" />
              </span>
            </li>
          ) : null}
        </ol>
        <form onSubmit={send} className="flex gap-2 border-t p-3">
          <Input aria-label="Message" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write a message" />
          <Button type="submit" size="icon" aria-label="Send">
            <SendHorizontal aria-hidden="true" />
          </Button>
        </form>
      </section>
    </div>
  )
}
