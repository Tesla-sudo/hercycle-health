import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Activity, MessageCircle, Wifi, WifiOff, Users, MapPin, Building2, ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState, useRef, useEffect } from "react";

const features = [
  { icon: Activity, title: "Period Tracking", desc: "Track your menstrual cycle with AI-powered predictions and personalized insights." },
  { icon: Heart, title: "AI Risk Detection", desc: "Detect menstrual health risks early using intelligent pattern analysis." },
  { icon: MessageCircle, title: "WhatsApp Access", desc: "Chat with our health bot directly on WhatsApp — no app download needed." },
  { icon: WifiOff, title: "USSD Offline Access", desc: "Access critical health tools via USSD even without internet connectivity." },
];

const stats = [
  { value: "10,000+", label: "Women Supported", icon: Users },
  { value: "30+", label: "Regions Covered", icon: MapPin },
  { value: "50+", label: "Clinics Connected", icon: Building2 },
];

const defaultChatMessages = [
  { from: "bot", text: "Hi! I'm the HerCycle health assistant 💜 Ask me anything about menstrual health, cycle tracking, or symptoms." },
];

const botResponses: Record<string, string> = {
  irregular: "Irregular cycles can happen due to stress, hormonal shifts, or lifestyle changes. If your cycle is consistently longer than 38 days or shorter than 21, I'd recommend consulting a gynecologist. Want me to help you track it?",
  cramps: "Menstrual cramps are very common. Try a warm compress, gentle exercise, or ginger tea. If cramps are severe and interfere with daily life, it could indicate endometriosis — please see a doctor.",
  bleeding: "Heavy bleeding (soaking through a pad/tampon every hour) may indicate hormonal imbalance or fibroids. Track the number of pads you use and consult a healthcare provider if it persists.",
  pcos: "PCOS affects about 1 in 10 women. Common signs include irregular periods, acne, weight gain, and excess hair growth. Early diagnosis helps manage symptoms effectively.",
  menopause: "Menopause typically occurs between ages 45-55. Common symptoms include hot flashes, mood changes, and sleep disturbances. Hormone therapy and lifestyle changes can help manage the transition.",
  track: "I can help you track your cycle! Simply tell me the first day of your last period and your typical cycle length, and I'll set up personalized reminders and predictions for you.",
  default: "That's a great question! Based on our health data, I'd recommend tracking your symptoms consistently. Would you like to know more about period tracking, common symptoms, or when to see a doctor?",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const [chatMessages, setChatMessages] = useState(defaultChatMessages);
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  const getBotResponse = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes("irregular")) return botResponses.irregular;
    if (lower.includes("cramp")) return botResponses.cramps;
    if (lower.includes("bleed") || lower.includes("heavy")) return botResponses.bleeding;
    if (lower.includes("pcos")) return botResponses.pcos;
    if (lower.includes("menopause")) return botResponses.menopause;
    if (lower.includes("track")) return botResponses.track;
    return botResponses.default;
  };

  const handleChatSend = () => {
    if (!inputValue.trim()) return;
    const userMsg = { from: "user", text: inputValue.trim() };
    setChatMessages((prev) => [...prev, userMsg]);
    const userText = inputValue.trim();
    setInputValue("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setChatMessages((prev) => [...prev, { from: "bot", text: getBotResponse(userText) }]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-secondary blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-primary blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              HerCycle — Every Woman.{" "}
              <span className="text-secondary">Every Stage.</span>{" "}
              Every Phone.
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              AI-powered reproductive health insights accessible via WhatsApp and USSD. Empowering women across Kenya with actionable health data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-primary border-0 text-primary-foreground font-semibold px-8">
                <a href="#features">Learn More</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/doctors">Doctor Dashboard</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">How HerCycle Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Comprehensive reproductive health tracking powered by AI and accessible technology.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Card className="h-full border-border hover:border-primary/30 transition-colors gradient-card">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                    <f.icon className="text-primary-foreground" size={24} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Our Impact</h2>
            <p className="text-muted-foreground">Making a difference across Kenya's healthcare landscape.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <motion.div key={s.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <s.icon className="text-primary-foreground" size={28} />
                </div>
                <div className="text-4xl font-extrabold text-gradient mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot Demo */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">WhatsApp Health Bot</h2>
          <p className="text-muted-foreground">Experience our AI health assistant — right from WhatsApp.</p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <Card className="overflow-hidden border-primary/20">
            <div className="gradient-primary px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <MessageCircle size={16} className="text-primary-foreground" />
              </div>
              <div>
                <div className="font-semibold text-sm text-primary-foreground">HerCycle Bot</div>
                <div className="text-xs text-primary-foreground/70">Online</div>
              </div>
            </div>
            <CardContent className="p-4 space-y-3 bg-muted/30 min-h-[300px] max-h-[350px] overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.from === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.from === "user"
                      ? "gradient-primary text-primary-foreground rounded-br-md"
                      : "bg-card border border-border rounded-bl-md"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-2.5 text-sm text-muted-foreground">
                    Typing<span className="animate-pulse">...</span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </CardContent>
            <div className="p-3 border-t border-border flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
                placeholder="Try: irregular periods, cramps, PCOS..."
                className="flex-1 bg-muted rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Button onClick={handleChatSend} size="icon" className="gradient-primary rounded-full border-0 h-9 w-9">
                <Send size={16} className="text-primary-foreground" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Empowering women across every life stage.
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join thousands of women using HerCycle to take control of their reproductive health.
            </p>
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8">
              <Link to="/doctors">
                Explore Dashboard <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
