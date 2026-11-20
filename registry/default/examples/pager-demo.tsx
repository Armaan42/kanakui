import { Pager } from "@/registry/default/ui/pager"

const PAGES = [
  { from: "Sam", text: "Call me back", time: "09:12" },
  { from: "Server", text: "Disk 3 is 92% full on db-west", time: "09:40" },
]

const INCOMING = [
  { from: "Mum", text: "Dinner at 7? Bring bread", time: "10:05" },
  { from: "Ops", text: "Deploy finished, all green", time: "10:21" },
]

export default function PagerDemo() {
  return <Pager messages={PAGES} incoming={INCOMING} />
}
