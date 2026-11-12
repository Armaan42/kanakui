"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { SaasLandingLogo } from "./saas-landing-logo"

const columns = [
  { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog", "Status"] },
  { title: "Company", links: ["About", "Customers", "Careers", "Blog", "Contact"] },
  { title: "Resources", links: ["Documentation", "API reference", "Guides", "Community", "Webinars"] },
  { title: "Legal", links: ["Privacy", "Terms", "DPA", "Security"] },
]

const social = ["X", "LinkedIn", "GitHub", "YouTube"]

export function SaasLandingFooter() {
  const [subscribed, setSubscribed] = React.useState(false)
  const emailId = React.useId()

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          <div className="max-w-sm">
            <SaasLandingLogo />
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Product analytics that explains itself. Built in Amsterdam and Bengaluru for teams everywhere.
            </p>

            {subscribed ? (
              <p role="status" className="mt-6 text-sm font-medium">
                Thanks! Check your inbox to confirm your subscription.
              </p>
            ) : (
              <form
                className="mt-6"
                onSubmit={(event) => {
                  event.preventDefault()
                  setSubscribed(true)
                }}
              >
                <label htmlFor={emailId} className="text-sm font-medium">
                  The monthly product memo
                </label>
                <div className="mt-2 flex gap-2">
                  <Input id={emailId} type="email" name="email" required autoComplete="email" placeholder="you@company.com" />
                  <Button type="submit">Subscribe</Button>
                </div>
              </form>
            )}
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-medium">{column.title}</h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {link}
                        {link === "Careers" ? (
                          <span className="ml-2 rounded-full bg-saas-accent/15 px-1.5 py-0.5 text-[11px] font-medium text-foreground">
                            Hiring
                          </span>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p>© 2026 Pulsewise, Inc.</p>
            <a href="#" className="inline-flex items-center gap-2 hover:text-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              All systems operational
            </a>
          </div>
          <ul className="flex gap-5">
            {social.map((name) => (
              <li key={name}>
                <a href="#" className="hover:text-foreground">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
