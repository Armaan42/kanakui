import { ChatThread } from "@/registry/default/ui/chat-thread"

export const meta = {
  title: "Marketplace messages",
  description: "The chat thread inside a second-hand marketplace's inbox, next to the listing the buyer is asking about.",
}

// Sample photos. Swap in your own. The people and listing are made up.
const face = (id: string) => `https://images.unsplash.com/photo-${id}?w=96&h=96&fit=crop&crop=faces&auto=format&q=80`
const ITEM = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=480&h=360&fit=crop&auto=format&q=75"

export default function MarketplaceMessages() {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-6 py-10 md:grid-cols-[16rem_minmax(0,1fr)]">
      <aside aria-labelledby="listing" className="h-fit rounded-xl border bg-card p-4">
        <img src={ITEM} alt="Black over-ear headphones on a yellow background" width={480} height={360} className="aspect-[4/3] w-full rounded-lg object-cover" />
        <h2 id="listing" className="mt-3 font-medium">
          Over-ear headphones, barely used
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">€90 · Collection in Alfama</p>
        <p className="mt-3 text-xs text-muted-foreground">Pay in the app to get buyer protection.</p>
      </aside>
      <ChatThread
        className="min-h-[28rem]"
        contact={{ name: "Ana Ribeiro", avatar: face("1494790108377-be9c29b29330"), status: "Usually replies within an hour" }}
        messages={[
          { id: "1", from: "them", text: "Hi! Are the headphones still available?" },
          { id: "2", from: "me", text: "They are. Used for about a month, everything is in the box." },
          { id: "3", from: "them", text: "Great. Would you take €80 if I collect tomorrow?" },
        ]}
        replies={["€85 and they're yours.", "Sure, tomorrow after 6 works.", "Sorry, €90 is firm."]}
      />
    </div>
  )
}
