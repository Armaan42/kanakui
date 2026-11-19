import { Rolodex } from "@/registry/default/ui/rolodex"

export default function RolodexDemo() {
  return (
    <Rolodex
      cards={[
        { name: "Amara Diallo", role: "Radio producer", phone: "+1 555 0142", email: "amara@example.com" },
        { name: "Elias Brandt", role: "Lighthouse keeper", phone: "+1 555 0188", note: "Call after the storm" },
        { name: "Hugo Martin", role: "Master baker", email: "hugo@example.com" },
        { name: "Lena Okafor", role: "Oceanographer", phone: "+1 555 0127", email: "lena@example.com" },
        { name: "Noor Rahman", role: "Piano tuner", phone: "+1 555 0163" },
        { name: "Sofia Lindgren", role: "Glacier guide", email: "sofia@example.com" },
      ]}
    />
  )
}
