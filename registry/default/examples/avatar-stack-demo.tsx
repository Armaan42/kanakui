import { AvatarStack } from "@/registry/default/ui/avatar-stack"

const people = ["Ananya Iyer", "Marcus Webb", "Lucía Moreno", "Kenji Sato", "Fatima Noor", "Jonas Berg", "Chloé Martin", "Ravi Kapoor"].map((name) => ({ name }))

export default function AvatarStackDemo() {
  return (
    <div className="flex items-center gap-3">
      <AvatarStack people={people} max={5} />
      <p className="text-sm text-muted-foreground">8 people are viewing this page</p>
    </div>
  )
}
