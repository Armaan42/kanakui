"use client"

import * as React from "react"
import { ArrowUp } from "lucide-react"

import { cn } from "@/lib/utils"

export interface ChatMessage {
  id: string
  from: "me" | "them"
  text: string
}

interface ChatThreadProps extends React.ComponentProps<"div"> {
  contact: { name: string; avatar?: string; status?: string }
  /** The conversation so far. With `autoplay` it plays out message by message. */
  messages: ChatMessage[]
  /** Answers the contact gives, in turn, when the viewer sends a message. */
  replies?: string[]
  autoplay?: boolean
}

const TYPING_MS = 1300
const PAUSE_MS = 700

/**
 * A messaging conversation. It plays out with typing indicators, then the
 * viewer can send their own messages and get replies. New messages are
 * announced to screen readers (`role="log"`). With reduced motion the
 * conversation shows at once.
 */
function ChatThread({ contact, messages, replies = [], autoplay = true, className, ...props }: ChatThreadProps) {
  const [shown, setShown] = React.useState(autoplay ? 0 : messages.length)
  const [extra, setExtra] = React.useState<ChatMessage[]>([])
  const [typing, setTyping] = React.useState(false)
  const [draft, setDraft] = React.useState("")
  const replyIndex = React.useRef(0)
  const logRef = React.useRef<HTMLDivElement>(null)
  const inputId = React.useId()
  // Read the latest messages without restarting the timers when a new array
  // with the same messages is passed on every render.
  const messagesRef = React.useRef(messages)
  React.useEffect(() => {
    messagesRef.current = messages
  })
  const total = messages.length

  // Play the conversation out, one message at a time.
  React.useEffect(() => {
    if (shown >= total) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      const id = setTimeout(() => setShown(total), 0)
      return () => clearTimeout(id)
    }
    const next = messagesRef.current[shown]
    if (next.from === "them") {
      const start = setTimeout(() => setTyping(true), PAUSE_MS)
      const done = setTimeout(() => {
        setTyping(false)
        setShown((n) => n + 1)
      }, PAUSE_MS + TYPING_MS)
      return () => {
        clearTimeout(start)
        clearTimeout(done)
      }
    }
    const id = setTimeout(() => setShown((n) => n + 1), PAUSE_MS + 300)
    return () => clearTimeout(id)
  }, [shown, total])

  const all = [...messages.slice(0, shown), ...extra]

  // Keep the newest message in view.
  React.useEffect(() => {
    const log = logRef.current
    log?.scrollTo({ top: log.scrollHeight, behavior: "smooth" })
  }, [all.length, typing])

  const send = (event: React.FormEvent) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    setDraft("")
    setExtra((e) => [...e, { id: `me-${Date.now()}`, from: "me", text }])
    if (replies.length === 0) return
    const reply = replies[replyIndex.current % replies.length]
    replyIndex.current += 1
    setTimeout(() => setTyping(true), PAUSE_MS)
    setTimeout(() => {
      setTyping(false)
      setExtra((e) => [...e, { id: `them-${Date.now()}`, from: "them", text: reply }])
    }, PAUSE_MS + TYPING_MS)
  }

  const lastMine = all.map((m) => m.from).lastIndexOf("me")

  return (
    <div data-slot="chat-thread" className={cn("flex h-[30rem] w-full max-w-sm flex-col overflow-hidden rounded-[1.75rem] border bg-background shadow-xl", className)} {...props}>
      {/* Header */}
      <div className="flex flex-col items-center gap-1 border-b bg-muted/40 px-4 pt-4 pb-3 backdrop-blur">
        {contact.avatar ? (
          <img src={contact.avatar} alt="" className="size-11 rounded-full object-cover" />
        ) : (
          <span className="grid size-11 place-items-center rounded-full bg-muted font-semibold">{contact.name[0]}</span>
        )}
        <p className="text-sm font-semibold">{contact.name}</p>
        {contact.status ? (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {contact.status}
          </p>
        ) : null}
      </div>

      {/* Messages */}
      <div ref={logRef} role="log" aria-label={`Conversation with ${contact.name}`} className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-3 py-4">
        {all.map((message, index) => {
          const mine = message.from === "me"
          const nextSame = all[index + 1]?.from === message.from
          return (
            <div key={message.id} className={cn("flex flex-col", mine ? "items-end" : "items-start", !nextSame && "mb-2")}>
              <p
                className={cn(
                  "max-w-[78%] animate-in px-3.5 py-2 text-[15px] leading-snug duration-300 fade-in slide-in-from-bottom-2 motion-reduce:animate-none",
                  mine ? "rounded-2xl bg-sky-500 text-white" : "rounded-2xl bg-muted text-foreground",
                  !nextSame && (mine ? "rounded-br-md" : "rounded-bl-md")
                )}
              >
                <span className="sr-only">{mine ? "You: " : `${contact.name}: `}</span>
                {message.text}
              </p>
              {index === lastMine ? <span className="mt-1 mr-1 text-[11px] text-muted-foreground">Delivered</span> : null}
            </div>
          )
        })}
        {typing ? (
          <div className="flex animate-in items-center gap-1 self-start rounded-2xl rounded-bl-md bg-muted px-3.5 py-3 fade-in motion-reduce:animate-none">
            <span className="sr-only">{contact.name} is typing</span>
            {[0, 150, 300].map((delay) => (
              <span key={delay} aria-hidden="true" className="size-2 animate-bounce rounded-full bg-muted-foreground/60 motion-reduce:animate-none" style={{ animationDelay: `${delay}ms` }} />
            ))}
          </div>
        ) : null}
      </div>

      {/* Composer */}
      <form onSubmit={send} className="flex items-center gap-2 border-t p-3">
        <label htmlFor={inputId} className="sr-only">
          Message {contact.name}
        </label>
        <input
          id={inputId}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Message"
          autoComplete="off"
          className="h-9 min-w-0 flex-1 rounded-full border bg-background px-4 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={!draft.trim()}
          className="grid size-9 shrink-0 place-items-center rounded-full bg-sky-500 text-white outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
        >
          <ArrowUp aria-hidden="true" className="size-4" />
        </button>
      </form>
    </div>
  )
}

export { ChatThread }
