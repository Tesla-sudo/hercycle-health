import { motion } from "framer-motion";
import { Users, AlertTriangle, MapPin, Building2, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { users } from "@/lib/mock-data/users";
import { symptomData, riskDistribution, monthlyTrends } from "@/lib/mock-data/symptoms";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";

const overviewCards = [
  { title: "Active Users", value: "10,248", change: "+12%", icon: Users, color: "primary" },
  { title: "High-Risk Cases", value: "2,340", change: "+5%", icon: AlertTriangle, color: "destructive" },
  { title: "Regions Reporting", value: "32", change: "+3", icon: MapPin, color: "secondary" },
  { title: "Clinic Referrals", value: "187", change: "+24", icon: Building2, color: "success" },
];

const riskBadgeVariant = (risk: string) => {
  if (risk === "High") return "destructive";
  if (risk === "Moderate") return "outline";
  return "secondary";
};

const highRiskUsers = users.filter((u) => u.riskScore === "High");

export default function DoctorsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Doctor Dashboard</h1>
          <p className="text-muted-foreground">Real-time reproductive health analytics from HerCycle.</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {overviewCards.map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      c.color === "primary" ? "gradient-primary" :
                      c.color === "destructive" ? "bg-destructive" :
                      c.color === "secondary" ? "bg-secondary" : "bg-success"
                    }`}>
                      <c.icon size={20} className="text-primary-foreground" />
                    </div>
                    <span className="text-xs font-medium text-success flex items-center gap-0.5">
                      <ArrowUpRight size={12} /> {c.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold">{c.value}</div>
                  <div className="text-sm text-muted-foreground">{c.title}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Symptom Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Symptom Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={symptomData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(270,15%,90%)" />
                  <XAxis dataKey="symptom" tick={{ fontSize: 11 }} angle={-20} textAnchor="end" height={60} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(263,70%,58%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Risk Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Risk Score Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={riskDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {riskDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trends */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Monthly Symptom Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(270,15%,90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cramps" stroke="hsl(263,70%,58%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="bleeding" stroke="hsl(330,86%,70%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="irregular" stroke="hsl(38,92%,55%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Live Data Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              Live Incoming Data
              <span className="w-2 h-2 rounded-full bg-success animate-pulse-soft" />
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-medium text-muted-foreground">User ID</th>
                  <th className="pb-3 font-medium text-muted-foreground">Region</th>
                  <th className="pb-3 font-medium text-muted-foreground">Symptom</th>
                  <th className="pb-3 font-medium text-muted-foreground">Cycle Length</th>
                  <th className="pb-3 font-medium text-muted-foreground">Risk</th>
                  <th className="pb-3 font-medium text-muted-foreground">Last Report</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-mono text-xs">{u.id}</td>
                    <td className="py-3">{u.region}</td>
                    <td className="py-3">{u.symptom}</td>
                    <td className="py-3">{u.cycleLength ? `${u.cycleLength} days` : "N/A"}</td>
                    <td className="py-3"><Badge variant={riskBadgeVariant(u.riskScore)}>{u.riskScore}</Badge></td>
                    <td className="py-3 text-muted-foreground">{u.lastReport}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Risk Alerts */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="text-destructive" size={20} /> High Risk Alerts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {highRiskUsers.map((u) => (
              <Card key={u.id} className="border-destructive/30 bg-destructive/5">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-bold">{u.id}</span>
                    <Badge variant="destructive">High Risk</Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div><span className="text-muted-foreground">Region:</span> {u.region}</div>
                    <div><span className="text-muted-foreground">Symptoms:</span> {u.symptom}</div>
                    <div><span className="text-muted-foreground">Cycle:</span> {u.cycleLength} days</div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-destructive/20 text-xs text-destructive font-medium">
                    ⚕️ Recommendation: Doctor consultation
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
