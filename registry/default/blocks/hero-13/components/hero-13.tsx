import { Lock, Mic, WifiOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ChatThread } from "@/registry/default/ui/chat-thread"

// Portrait: Unsplash (free under the Unsplash License). The app and people are made up.
const AVATAR = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces&auto=format&q=80"

const features = [
  { icon: Lock, title: "Private by default", text: "End-to-end encrypted, always. Not even we can read your chats." },
  { icon: Mic, title: "Voice notes that read themselves", text: "Every voice note comes with a transcript you can skim." },
  { icon: WifiOff, title: "Works on bad Wi-Fi", text: "Messages queue offline and send the moment you’re back." },
]

/** A messaging-app hero: the pitch and features beside a live chat on a phone. */
export function Hero13() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute top-[12%] right-[4%] -z-10 size-[26rem] rounded-full bg-sky-400/15 blur-3xl" />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:py-24">
        <div>
          <p className="text-sm font-medium text-sky-700 dark:text-sky-400">Murmur · free for iOS and Android</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">Messages that feel like talking.</h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-muted-foreground">
            Murmur is a calm, fast messenger for the people you actually talk to: no ads, no feeds, just your conversations.
          </p>
          <ul className="mt-8 space-y-5">
            {features.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <span>
                  <span className="block text-sm font-medium">{title}</span>
                  <span className="block text-sm text-muted-foreground">{text}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#">Download for iPhone</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#">Get it on Android</a>
            </Button>
          </div>
        </div>

        {/* Phone */}
        <div className="mx-auto w-full max-w-[22rem] rounded-[2.6rem] border-[10px] border-neutral-900 bg-neutral-900 shadow-2xl dark:border-neutral-700">
          <ChatThread
            className="h-[32rem] max-w-none rounded-[1.9rem] border-0 shadow-none"
            contact={{ name: "Priya", status: "online", avatar: AVATAR }}
            messages={[
              { id: "1", from: "them", text: "Landed! 🛬 Grabbing a coffee, then heading your way." },
              { id: "2", from: "me", text: "Yay! The door code is 4821." },
              { id: "3", from: "them", text: "Got it. Should I pick up anything for dinner?" },
              { id: "4", from: "me", text: "Just bread, we have everything else 🍝" },
            ]}
            replies={["On it 👍", "See you in 20!", "Haha ok"]}
          />
        </div>
      </div>
    </section>
  )
}
