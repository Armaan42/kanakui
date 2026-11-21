import { PullCordLamp } from "@/registry/default/ui/pull-cord-lamp"

export const meta = {
  title: "Personal blog header",
  description: "The pull-cord lamp hanging from a personal blog's header as its light and dark switch.",
}

// The blog and posts are made up.
const POSTS = [
  { date: "14 Nov", title: "What I learned building furniture from one sheet of plywood" },
  { date: "2 Nov", title: "A year of writing every morning, in numbers" },
  { date: "19 Oct", title: "The best ferry rides in Europe, ranked by view" },
]

export default function BlogHeader() {
  return (
    <div className="mx-auto max-w-3xl overflow-x-clip px-6">
      <header className="relative flex items-start justify-between border-b pt-6 pb-8">
        <div className="min-w-0">
          <p className="text-xl font-semibold">Mei Lin</p>
          <p className="text-sm text-muted-foreground">Notes on making things, slowly</p>
          <nav aria-label="Main" className="mt-4 flex gap-4 text-sm">
            <a href="#writing" className="font-medium">
              Writing
            </a>
            <a href="#projects" className="text-muted-foreground hover:text-foreground">
              Projects
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground">
              About
            </a>
          </nav>
        </div>
        <PullCordLamp label="Light (switches between light and dark mode)" className="-mt-6 mr-2" />
      </header>
      <ul className="divide-y py-4">
        {POSTS.map((post) => (
          <li key={post.title} className="flex gap-6 py-4">
            <span className="w-14 shrink-0 text-sm text-muted-foreground tabular-nums">{post.date}</span>
            <a href="#post" className="font-medium hover:underline hover:underline-offset-4">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
