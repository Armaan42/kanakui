"use client"

import * as React from "react"
import { Mail, MapPin, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FloatingLabelInput } from "@/registry/default/ui/floating-label-input"

interface Contact01Props {
  /**
   * Sends the message, e.g. to a Server Action or API route. Throw to show an
   * error. Without it, the form explains that it isn't connected yet.
   */
  onSubmit?: (data: { name: string; email: string; message: string }) => Promise<void> | void
}

type Status = { kind: "idle" | "sending" | "sent" | "error" | "unconnected"; message?: string }

/**
 * Contact details beside a form with name, email and message. Uses native
 * validation (required fields, email format) and announces the result.
 */
export function Contact01({ onSubmit }: Contact01Props) {
  const [status, setStatus] = React.useState<Status>({ kind: "idle" })
  const messageId = React.useId()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const values = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    }
    if (!onSubmit) {
      setStatus({ kind: "unconnected", message: "This form isn’t connected yet. Pass an onSubmit handler to send messages." })
      return
    }
    setStatus({ kind: "sending" })
    try {
      await onSubmit(values)
      form.reset()
      setStatus({ kind: "sent", message: "Thanks! Your message was sent." })
    } catch {
      setStatus({ kind: "error", message: "Something went wrong. Please try again or email us directly." })
    }
  }

  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Get in touch</h2>
          <p className="mt-4 max-w-md text-pretty text-muted-foreground">
            Questions about pricing, partnerships or anything else. We usually reply within one business day.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Mail aria-hidden="true" className="size-4 text-muted-foreground" />
              <a href="mailto:hello@example.com" className="underline-offset-4 hover:underline">
                hello@example.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MessageSquare aria-hidden="true" className="size-4 text-muted-foreground" />
              Live chat, Monday to Friday
            </li>
            <li className="flex items-center gap-3">
              <MapPin aria-hidden="true" className="size-4 text-muted-foreground" />
              Your city, Your country
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-6">
          <FloatingLabelInput label="Name" name="name" autoComplete="name" required />
          <FloatingLabelInput label="Email" name="email" type="email" autoComplete="email" required />
          <div className="space-y-1.5">
            <label htmlFor={messageId} className="text-sm font-medium">
              Message
            </label>
            <textarea
              id={messageId}
              name="message"
              required
              rows={5}
              className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>
          <Button type="submit" className="w-full" disabled={status.kind === "sending"}>
            {status.kind === "sending" ? "Sending…" : "Send message"}
          </Button>
          <p role="status" className="min-h-5 text-sm text-muted-foreground">
            {status.message ?? ""}
          </p>
        </form>
      </div>
    </section>
  )
}
