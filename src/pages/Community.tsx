import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Heart, MessageCircle, Users, Smile, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface Message {
  id: number;
  userId: string;
  displayName: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  liked: boolean;
}

const initialMessages: Message[] = [
  { id: 1, userId: "HC-4821", displayName: "Amani", avatar: "🌸", text: "Has anyone else experienced really bad cramps during their first day? I feel like mine have gotten worse this year.", time: "10:32 AM", likes: 5, liked: false },
  { id: 2, userId: "HC-7390", displayName: "Wanjiku", avatar: "🌺", text: "Yes! I used to have mild ones but lately they've been intense. My doctor said it could be hormonal changes. Have you tried a warm compress? It helps me a lot.", time: "10:35 AM", likes: 8, liked: false },
  { id: 3, userId: "HC-1156", displayName: "Aisha", avatar: "🌷", text: "Warm compress + ginger tea is my go-to combo 💛 Also tracking my cycle helped me prepare better for those days.", time: "10:38 AM", likes: 12, liked: false },
  { id: 4, userId: "HC-5502", displayName: "Nyambura", avatar: "🌻", text: "I started tracking with HerCycle on WhatsApp and it actually predicted my heavy days accurately. Now I plan around them!", time: "10:42 AM", likes: 15, liked: false },
  { id: 5, userId: "HC-2290", displayName: "Fatuma", avatar: "🌼", text: "Quick question — is it normal to have a 40+ day cycle? Mine has been around 42-45 days and I'm a bit worried.", time: "10:50 AM", likes: 3, liked: false },
  { id: 6, userId: "HC-7390", displayName: "Wanjiku", avatar: "🌺", text: "It can vary! But if it's consistently that long, definitely worth mentioning to a gynecologist. Better safe than sorry 💜", time: "10:53 AM", likes: 7, liked: false },
  { id: 7, userId: "HC-8834", displayName: "Zawadi", avatar: "🏵️", text: "I went through something similar. Turned out I had mild PCOS. Early detection made all the difference. Don't hesitate to get checked!", time: "10:58 AM", likes: 20, liked: false },
  { id: 8, userId: "HC-1156", displayName: "Aisha", avatar: "🌷", text: "This group is so supportive 🥺 I love that we can talk about these things openly. Knowledge is power!", time: "11:02 AM", likes: 25, liked: false },
];

const communityTopics = [
  { label: "Period Tips", count: 234 },
  { label: "Fertility", count: 128 },
  { label: "Menopause", count: 89 },
  { label: "Mental Health", count: 176 },
  { label: "Nutrition", count: 145 },
];

const onlineMembers = 247;
const totalMembers = 1820;

export default function CommunityPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: messages.length + 1,
      userId: "HC-YOU",
      displayName: "You",
      avatar: "💜",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      likes: 0,
      liked: false,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  const toggleLike = (id: number) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, liked: !m.liked, likes: m.liked ? m.likes - 1 : m.likes + 1 }
          : m
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-1">Community</h1>
          <p className="text-muted-foreground mb-6">A safe space to share, learn, and support each other.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4 order-2 lg:order-1">
            {/* Members Card */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Users size={18} className="text-primary" />
                  <span className="font-semibold text-sm">Members</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex -space-x-2">
                    {["🌸", "🌺", "🌷", "🌻", "🌼"].map((e, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm border-2 border-card">
                        {e}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">+{totalMembers - 5}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse-soft" />
                  {onlineMembers} online now
                </div>
              </CardContent>
            </Card>

            {/* Topics */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle size={18} className="text-primary" />
                  <span className="font-semibold text-sm">Trending Topics</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {communityTopics.map((t) => (
                    <Badge key={t.label} variant="secondary" className="cursor-pointer hover:bg-accent transition-colors">
                      {t.label} <span className="ml-1 text-muted-foreground">({t.count})</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card className="border-primary/20 gradient-card">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={18} className="text-primary" />
                  <span className="font-semibold text-sm">Community Guidelines</span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1.5">
                  <li>💜 Be kind and supportive</li>
                  <li>🔒 All identities are anonymized</li>
                  <li>🚫 No medical prescriptions</li>
                  <li>🩺 Always consult a professional</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <Card className="overflow-hidden flex flex-col" style={{ height: "calc(100vh - 220px)", minHeight: "500px" }}>
              {/* Header */}
              <div className="gradient-primary px-5 py-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <Users size={18} className="text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-primary-foreground">HerCycle Community</div>
                    <div className="text-xs text-primary-foreground/70">{onlineMembers} members online</div>
                  </div>
                </div>
                <Smile size={20} className="text-primary-foreground/60" />
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
                {/* Date separator */}
                <div className="flex items-center gap-3 my-2">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Today</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {messages.map((msg) => {
                  const isYou = msg.userId === "HC-YOU";
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2.5 ${isYou ? "flex-row-reverse" : ""}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm shrink-0 mt-1">
                        {msg.avatar}
                      </div>
                      <div className={`max-w-[75%] ${isYou ? "text-right" : ""}`}>
                        <div className={`flex items-center gap-2 mb-0.5 ${isYou ? "justify-end" : ""}`}>
                          <span className="text-xs font-semibold">{msg.displayName}</span>
                          <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                        </div>
                        <div
                          className={`rounded-2xl px-4 py-2.5 text-sm inline-block text-left ${
                            isYou
                              ? "gradient-primary text-primary-foreground rounded-br-md"
                              : "bg-card border border-border rounded-bl-md"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <button
                          onClick={() => toggleLike(msg.id)}
                          className={`flex items-center gap-1 mt-1 text-xs transition-colors ${
                            isYou ? "justify-end" : ""
                          } ${msg.liked ? "text-secondary" : "text-muted-foreground hover:text-secondary"}`}
                        >
                          <Heart size={12} fill={msg.liked ? "currentColor" : "none"} />
                          {msg.likes > 0 && msg.likes}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border flex gap-2 shrink-0 bg-card">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Share something with the community..."
                  className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
                <Button onClick={handleSend} size="icon" className="gradient-primary rounded-full border-0 h-10 w-10 shrink-0">
                  <Send size={16} className="text-primary-foreground" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
