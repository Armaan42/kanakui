import { AvatarStack } from "@/registry/default/ui/avatar-stack"

export const meta = {
  title: "Project list",
  description: "Avatar stacks showing who's on each project in a project list, with the overflow count for big teams.",
}

// Sample portraits. Swap in your own. The projects and people are made up.
const face = (id: string) => `https://images.unsplash.com/photo-${id}?w=96&h=96&fit=crop&crop=faces&auto=format&q=80`
const PEOPLE = {
  lena: { name: "Lena Okafor", src: face("1438761681033-6461ffad8d80") },
  tomas: { name: "Tomás Rivera", src: face("1500648767791-00dcc994a43e") },
  priya: { name: "Priya Natarajan", src: face("1494790108377-be9c29b29330") },
  jonas: { name: "Jonas Keller", src: face("1507003211169-0a1dd7228f2d") },
  mei: { name: "Mei Lin" },
  aditya: { name: "Aditya Rao" },
  sofie: { name: "Sofie Lindqvist" },
}

const PROJECTS = [
  { name: "Checkout redesign", status: "On track", due: "12 Dec", progress: 72, team: [PEOPLE.lena, PEOPLE.tomas, PEOPLE.mei] },
  { name: "Mobile app 3.0", status: "At risk", due: "20 Jan", progress: 38, team: [PEOPLE.priya, PEOPLE.jonas, PEOPLE.aditya, PEOPLE.sofie, PEOPLE.mei, PEOPLE.tomas, PEOPLE.lena] },
  { name: "Help centre migration", status: "On track", due: "5 Dec", progress: 90, team: [PEOPLE.sofie, PEOPLE.aditya] },
  { name: "Annual report site", status: "Not started", due: "28 Feb", progress: 0, team: [PEOPLE.jonas] },
]

export default function ProjectList() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-1 text-sm text-muted-foreground">Oakline · 4 active</p>
      <ul className="mt-6 divide-y rounded-xl border bg-card">
        {PROJECTS.map((project) => (
          <li key={project.name} className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 p-4 sm:grid-cols-[1fr_8rem_auto]">
            <div className="min-w-0">
              <p className="font-medium">{project.name}</p>
              <p className="text-sm text-muted-foreground">
                {project.status} · due {project.due}
              </p>
            </div>
            <div className="col-span-2 row-start-2 sm:col-span-1 sm:row-start-auto">
              <div className="h-1.5 overflow-hidden rounded-full bg-muted" role="img" aria-label={`${project.progress}% done`}>
                <div className="h-full rounded-full bg-foreground" style={{ width: `${project.progress}%` }} />
              </div>
            </div>
            <AvatarStack people={project.team} max={4} size={32} />
          </li>
        ))}
      </ul>
    </div>
  )
}
