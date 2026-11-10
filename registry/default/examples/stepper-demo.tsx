import { Stepper } from "@/registry/default/ui/stepper"

export default function StepperDemo() {
  return (
    <Stepper
      className="max-w-lg"
      current={1}
      steps={[
        { title: "Account", description: "Email and password" },
        { title: "Workspace", description: "Name your team" },
        { title: "Invite", description: "Add teammates" },
      ]}
    />
  )
}
