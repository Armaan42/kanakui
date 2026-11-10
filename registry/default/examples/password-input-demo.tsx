import { PasswordInput } from "@/registry/default/ui/password-input"

export default function PasswordInputDemo() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <label htmlFor="new-password" className="text-sm font-medium">
        New password
      </label>
      <PasswordInput id="new-password" autoComplete="new-password" showStrength />
    </div>
  )
}
