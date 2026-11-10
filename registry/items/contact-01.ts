import { defineItem } from "../define.ts"

export default defineItem({
  name: "contact-01",
  type: "registry:block",
  title: "Contact Form",
  description: "Contact details beside a validated form that you connect to your own backend.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["contact"],
  registryDependencies: ["button"],
  dependencies: ["lucide-react"],
  internalDependencies: ["floating-label-input"],
  files: [{ path: "registry/default/blocks/contact-01/components/contact-01.tsx", type: "registry:component" }],
  pageDocs: {
    props: [
      {
        name: "onSubmit",
        type: "(data: { name: string; email: string; message: string }) => Promise<void> | void",
        description: "Sends the message, e.g. by calling a Server Action. Throw to show an error. Without it, submitting explains the form isn’t connected.",
      },
    ],
    extends: "Only the prop above.",
    requirements: ["shadcn `button` and kanakui `floating-label-input`. The CLI installs both.", "`lucide-react`, React 19 and Tailwind CSS v4."],
    customization: [
      "Connect it: `<Contact01 onSubmit={sendMessage} />`, where `sendMessage` is a Server Action that emails you or stores the message.",
      "Validate again on the server; the browser’s `required` and `type=\"email\"` checks are only a convenience.",
      "Replace the email address, chat hours and location with your own.",
    ],
    accessibility: [
      "Every field has a visible label. Required fields use native validation messages.",
      "The result (sending, sent, error) is announced through a status region.",
    ],
    troubleshooting: [
      { problem: "Submitting says the form isn’t connected.", solution: "Pass an `onSubmit` handler. The block never pretends to send a message it didn’t send." },
      { problem: "Spam submissions.", solution: "Add a honeypot field or a CAPTCHA, and rate-limit your Server Action." },
    ],
  },
})
