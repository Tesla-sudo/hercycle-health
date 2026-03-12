import { useEffect } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { regions } from "@/lib/mock-data/regions";
import { Badge } from "@/components/ui/badge";
import "leaflet/dist/leaflet.css";

const riskColor = (risk: string) => {
  if (risk === "High") return "#ef4444";
  if (risk === "Moderate") return "#f59e0b";
  return "#22c55e";
};

export default function MapsPage() {
  useEffect(() => {
    // Fix leaflet icon issue in vite
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any).L?.Icon?.Default?.prototype?._getIconUrl;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-1">GIS Health Map</h1>
          <p className="text-muted-foreground mb-6">Menstrual health symptom distribution across Kenya.</p>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full bg-destructive" /> High Risk
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full bg-warning" /> Moderate
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full bg-success" /> Low
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-border" style={{ height: "500px" }}>
          <MapContainer
            center={[-0.5, 37.0]}
            zoom={6}
            className="h-full w-full"
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {regions.map((r) => (
              <CircleMarker
                key={r.name}
                center={[r.lat, r.lng]}
                radius={Math.max(r.totalUsers / 150, 8)}
                pathOptions={{
                  color: riskColor(r.riskLevel),
                  fillColor: riskColor(r.riskLevel),
                  fillOpacity: 0.4,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="text-sm space-y-1">
                    <div className="font-bold">{r.name}</div>
                    <div>Common: {r.commonSymptom}</div>
                    <div>Users: {r.totalUsers.toLocaleString()}</div>
                    <div>Risk: <span className="font-semibold">{r.riskLevel}</span></div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* Region Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {regions.map((r) => (
            <div key={r.name} className="rounded-xl border border-border p-4 bg-card hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{r.name}</span>
                <Badge variant={r.riskLevel === "High" ? "destructive" : r.riskLevel === "Moderate" ? "outline" : "secondary"}>
                  {r.riskLevel}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>Top symptom: {r.commonSymptom}</div>
                <div>Users: {r.totalUsers.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
