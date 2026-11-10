import { defineItem } from "../define.ts"

export default defineItem({
  name: "login-01",
  type: "registry:block",
  title: "Sign-in Form",
  description: "A centered sign-in card with password show/hide that you connect to your auth provider.",
  version: "0.1.0",
  releasedAt: "2026-11-10",
  categories: ["auth"],
  registryDependencies: ["button"],
  internalDependencies: ["password-input"],
  files: [{ path: "registry/default/blocks/login-01/components/login-01.tsx", type: "registry:component" }],
  pageDocs: {
    props: [{"name":"onSubmit","type":"(credentials: { email: string; password: string }) => Promise<void> | void","description":"Signs the user in. Throw an Error with a message to show it. Without it, submitting says the form isn’t connected."}],
    extends: "Only the prop above.",
    requirements: ["shadcn `button` and kanakui `password-input`. The CLI installs both."],
    customization: ["Connect it to Supabase, Auth.js or your own API in `onSubmit`, and redirect on success.","Never log or store passwords yourself; let your auth provider handle them."],
    accessibility: ["Labelled fields with correct `autocomplete` values; errors are announced through a status region."],
    troubleshooting: [{"problem":"Submitting says the form isn’t connected.","solution":"Pass an `onSubmit` handler. The block never pretends to sign anyone in."}],
  },
})
