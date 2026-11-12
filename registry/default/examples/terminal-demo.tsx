import { Terminal } from "@/registry/default/ui/terminal"

export default function TerminalDemo() {
  return (
    <Terminal
      className="w-full max-w-xl"
      lines={[
        { type: "command", text: "npx create-next-app@latest my-app" },
        { type: "success", text: "Created a new Next.js app in ./my-app" },
        { type: "command", text: "cd my-app && npm run dev" },
        { type: "output", text: "Ready on http://localhost:3000", delay: 600 },
      ]}
    />
  )
}
