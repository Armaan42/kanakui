import { Contact01 } from "@/registry/default/blocks/contact-01/components/contact-01"

// No onSubmit here, so submitting shows that the form isn't connected yet.
// In your app, pass a handler that calls a Server Action or API route.
export default function Contact01Demo() {
  return <Contact01 />
}
