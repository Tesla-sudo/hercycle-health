import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Activity, Calendar, MapPin, Flame, Moon, Brain, Heart } from "lucide-react";
import { symptomData, monthlyTrends } from "@/lib/mock-data/symptoms";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const quickStats = [
  { label: "Avg Cycle Length", value: "32 days", icon: Calendar },
  { label: "Most Common Symptom", value: "Severe cramps", icon: Activity },
  { label: "Highest Risk Region", value: "Nairobi", icon: MapPin },
];

const menopauseSymptoms = [
  { symptom: "Hot flashes", count: 800 },
  { symptom: "Sleep disturbances", count: 600 },
  { symptom: "Mood changes", count: 1500 },
  { symptom: "Fatigue", count: 1200 },
];

const conditions = [
  { title: "PCOS", icon: Heart, desc: "Polycystic ovary syndrome affects 1 in 10 women. Symptoms include irregular periods, excess androgen, and polycystic ovaries." },
  { title: "Endometriosis", icon: Activity, desc: "A condition where tissue similar to the uterine lining grows outside the uterus, causing pain and potential fertility issues." },
  { title: "Menopause", icon: Flame, desc: "A natural transition marking the end of menstrual cycles, typically occurring in the late 40s or 50s. Management strategies can ease symptoms." },
  { title: "Hormonal Imbalance", icon: Brain, desc: "Occurs when there is too much or too little of a hormone. Can affect menstrual cycles, mood, weight, and overall health." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
};

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-1">Health Insights</h1>
          <p className="text-muted-foreground mb-8">Educational and analytical insights on women's reproductive health.</p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {quickStats.map((s, i) => (
            <motion.div key={s.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Card className="gradient-card">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                    <s.icon size={22} className="text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{s.label}</div>
                    <div className="text-xl font-bold">{s.value}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Top Symptoms Chart */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="text-lg">Top Reported Symptoms</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={symptomData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(270,15%,90%)" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="symptom" type="category" tick={{ fontSize: 11 }} width={120} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(263,70%,58%)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Menopause Insights */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Flame className="text-secondary" size={22} /> Menopause Insights
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {menopauseSymptoms.map((s) => (
              <Card key={s.symptom} className="text-center">
                <CardContent className="p-5">
                  <div className="text-2xl font-bold text-gradient">{s.count.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.symptom}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Moon className="text-primary" size={22} /> Health Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {conditions.map((c, i) => (
              <motion.div key={c.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                        <c.icon size={20} className="text-primary-foreground" />
                      </div>
                      <h3 className="font-bold text-lg">{c.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
