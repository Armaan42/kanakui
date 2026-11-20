import { ChatThread } from "@/registry/default/ui/chat-thread"

// Sample photos. Swap in your own. The people are made up.
export default function ChatThreadDemo() {
  return (
    <ChatThread
      className="w-[min(22rem,calc(100vw-3rem))]"
      contact={{
        name: "Sofie Lindqvist",
        status: "online",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=faces&auto=format&q=80",
      }}
      messages={[
        { id: "1", from: "them", text: "Are we still on for the design review tomorrow?" },
        { id: "2", from: "me", text: "Yes! 10 am in 4B." },
        { id: "3", from: "me", text: "I’ll bring the new onboarding screens." },
        { id: "4", from: "them", text: "Perfect. Can you add the empty states too? 🙏" },
      ]}
      replies={["Amazing, thank you!", "Haha, sounds good 😄", "See you then!"]}
    />
  )
}
