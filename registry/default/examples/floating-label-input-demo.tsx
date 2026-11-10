import { FloatingLabelInput } from "@/registry/default/ui/floating-label-input"

export default function FloatingLabelInputDemo() {
  return (
    <form className="w-full max-w-sm space-y-3">
      <FloatingLabelInput label="Email address" type="email" autoComplete="email" />
      <FloatingLabelInput label="Company" autoComplete="organization" />
    </form>
  )
}
