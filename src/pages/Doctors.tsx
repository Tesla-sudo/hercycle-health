import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, AlertTriangle, MapPin, Building2, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { connectWebSocket } from "@/lib/api/websocketService";

import {
BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
PieChart, Pie, Cell
} from "recharts";

const overviewCards = [
{ title: "Active Users", value: "Live", change: "+", icon: Users },
{ title: "High-Risk Cases", value: "Live", change: "+", icon: AlertTriangle },
{ title: "Regions Reporting", value: "Live", change: "+", icon: MapPin },
{ title: "Clinic Referrals", value: "Live", change: "+", icon: Building2 },
];

const riskBadgeVariant = (risk: string) => {
if (risk === "High") return "destructive";
if (risk === "Moderate") return "outline";
return "secondary";
};

export default function DoctorsPage() {

const [liveUsers, setLiveUsers] = useState<any[]>([]);

const [symptomData, setSymptomData] = useState([
{ symptom: "Cramps", count: 12 },
{ symptom: "Heavy Bleeding", count: 8 },
{ symptom: "Irregular Cycle", count: 5 },
{ symptom: "Mood Swings", count: 7 }
]);

const [riskDistribution, setRiskDistribution] = useState([
{ name: "Low", value: 18, fill: "#22c55e" },
{ name: "Moderate", value: 6, fill: "#f59e0b" },
{ name: "High", value: 2, fill: "#ef4444" }
]);

const viewPatient = (user:any)=>{
  alert(`Patient: ${user.id}

Region: ${user.region}

Symptoms: ${user.symptom}
S
Risk: ${user.riskScore}

Contact: ${user.phone}
`)

}

const updateDashboard = (data:any)=>{
  const newEntry = {

  id: data.user_id?.slice(-6),
  region: data.region,
  symptom: data.symptoms?.join(", "),
  cycleLength: null,
  riskScore: data.risk_level,
  phone: data.phone,
  lastReport: "Just now"

}

setLiveUsers(prev => [newEntry, ...prev].slice(0,30))

// Update symptom chart

if(data.symptoms){

  setSymptomData(prev=>{

    const updated=[...prev]

    data.symptoms.forEach((s:string)=>{

      const existing=updated.find(i=>i.symptom===s)

      if(existing) existing.count+=1
      else updated.push({symptom:s,count:1})

    })

    return updated

  })

}

// Update risk chart

setRiskDistribution(prev=>{

  return prev.map(r=>{

    if(r.name===data.risk_level){

      return {...r,value:r.value+1}

    }

    return r

  })

})
}

useEffect(()=>{
  connectWebSocket(updateDashboard)
  },[])

const highRiskUsers = liveUsers.filter((u)=>u.riskScore==="High")

return (
  <div className="min-h-screen bg-background">

  <Navbar/>

  <div className="container mx-auto px-4 py-8">

    <h1 className="text-3xl font-bold mb-8">Doctor Dashboard</h1>

    {/* Charts */}

    <div className="grid lg:grid-cols-2 gap-6 mb-8">

      <Card>

        <CardHeader>
          <CardTitle>Symptom Reports</CardTitle>
        </CardHeader>

        <CardContent>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={symptomData}>

              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis dataKey="symptom"/>
              <YAxis/>

              <Tooltip/>

              <Bar dataKey="count"/>

            </BarChart>

          </ResponsiveContainer>

        </CardContent>

      </Card>

      <Card>

        <CardHeader>
          <CardTitle>Risk Distribution</CardTitle>
        </CardHeader>

        <CardContent>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={riskDistribution}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
              >

                {riskDistribution.map((entry,index)=>(

                  <Cell key={index} fill={entry.fill}/>

                ))}

              </Pie>

              <Tooltip/>

            </PieChart>

          </ResponsiveContainer>

        </CardContent>

      </Card>

    </div>

    {/* Live Table */}

    <Card>

      <CardHeader>
        <CardTitle>Live Incoming Data</CardTitle>
      </CardHeader>

      <CardContent>

        <table className="w-full text-sm">

          <thead>

            <tr>

              <th>User</th>
              <th>Region</th>
              <th>Symptom</th>
              <th>Risk</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {liveUsers.map((u,i)=>(

              <tr key={i}>

                <td>{u.id}</td>
                <td>{u.region}</td>
                <td>{u.symptom}</td>

                <td>
                  <Badge variant={riskBadgeVariant(u.riskScore)}>
                    {u.riskScore}
                  </Badge>
                </td>

                <td>

                  <button
                    className="text-blue-500"
                    onClick={()=>viewPatient(u)}
                  >

                    View Case

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </CardContent>

    </Card>

  </div>

  <Footer/>

</div>
)
}