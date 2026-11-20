"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FloatingLabelInput } from "@/registry/default/ui/floating-label-input"
import { PasswordInput, scorePassword } from "@/registry/default/ui/password-input"

export const meta = {
  title: "Sign-up form",
  description: "Floating-label inputs in a complete sign-up form, with validation on blur, a password strength meter and a submit state.",
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function SignUpForm() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [touched, setTouched] = React.useState({ name: false, email: false, password: false })
  const [done, setDone] = React.useState(false)

  const errors = {
    name: name.trim() ? "" : "Enter your name.",
    email: EMAIL.test(email) ? "" : "Enter an email like you@company.com.",
    password: scorePassword(password) >= 3 ? "" : "Choose a stronger password: see the tip above.",
  }
  const valid = !errors.name && !errors.email && !errors.password

  if (done) {
    return (
      <div className="mx-auto flex min-h-svh max-w-sm flex-col justify-center px-6 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-muted">
          <Check aria-hidden="true" className="size-6" />
        </span>
        <h1 className="mt-4 text-xl font-semibold">Check your inbox</h1>
        <p className="mt-2 text-sm text-muted-foreground">We sent a link to {email}. It expires in 30 minutes.</p>
        <Button variant="outline" className="mt-6" onClick={() => setDone(false)}>
          Back to sign up
        </Button>
      </div>
    )
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-muted/50 p-10 lg:flex">
        <p className="font-semibold">Paperkite</p>
        <blockquote className="max-w-sm">
          <p className="text-lg">Shared reading lists for book clubs, classrooms and the friend who always asks what to read next.</p>
        </blockquote>
        <p className="text-sm text-muted-foreground">Free for clubs of up to 20 readers.</p>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <form
          noValidate
          className="w-full max-w-sm"
          onSubmit={(event) => {
            event.preventDefault()
            setTouched({ name: true, email: true, password: true })
            if (valid) setDone(true)
          }}
        >
          <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Start your first reading list in under a minute.</p>

          <div className="mt-8 grid gap-4">
            <Field error={touched.name ? errors.name : ""} id="signup-name-error">
              <FloatingLabelInput
                label="Full name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                aria-invalid={touched.name && !!errors.name}
                aria-describedby={touched.name && errors.name ? "signup-name-error" : undefined}
              />
            </Field>
            <Field error={touched.email ? errors.email : ""} id="signup-email-error">
              <FloatingLabelInput
                label="Work email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                aria-invalid={touched.email && !!errors.email}
                aria-describedby={touched.email && errors.email ? "signup-email-error" : undefined}
              />
            </Field>
            <Field error={touched.password ? errors.password : ""} id="signup-password-error">
              <label htmlFor="signup-password" className="mb-1.5 block text-sm font-medium">
                Password
              </label>
              <PasswordInput
                id="signup-password"
                showStrength
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                aria-invalid={touched.password && !!errors.password}
                aria-describedby={touched.password && errors.password ? "signup-password-error" : undefined}
              />
            </Field>
          </div>

          <Button type="submit" className="mt-6 w-full">
            Create account
          </Button>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="#sign-in" className="font-medium text-foreground underline underline-offset-4">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

function Field({ error, id, children }: { error: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      {children}
      {error ? (
        <p id={id} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
