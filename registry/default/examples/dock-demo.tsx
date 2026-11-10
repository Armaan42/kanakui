import { Calendar, Folder, Home, Mail, Search, Settings } from "lucide-react"

import { Dock } from "@/registry/default/ui/dock"

export default function DockDemo() {
  return (
    <Dock
      items={[
        { label: "Home", icon: <Home />, href: "#" },
        { label: "Search", icon: <Search />, href: "#" },
        { label: "Mail", icon: <Mail />, href: "#" },
        { label: "Calendar", icon: <Calendar />, href: "#" },
        { label: "Files", icon: <Folder />, href: "#" },
        { label: "Settings", icon: <Settings />, href: "#" },
      ]}
    />
  )
}
