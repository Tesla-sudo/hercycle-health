import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getRegions } from "@/lib/api/hercycleApi";
import "leaflet/dist/leaflet.css";

const riskColor = (risk: string) => {
  if (risk === "High") return "#ef4444";
  if (risk === "Moderate") return "#f59e0b";
  return "#22c55e";
};

export default function MapsPage() {

  const [regions, setRegions] = useState<any[]>([]);

  useEffect(() => {

    async function loadRegions() {

      try {

        const data = await getRegions();

        setRegions(
          data.map((r:any)=>({

            name:r._id,
            lat:-0.5,
            lng:37,
            totalUsers:r.count,
            riskLevel:"Moderate",
            commonSymptom:"Unknown"

          }))
        );

      } catch(err) {

        console.error(err);

      }

    }

    loadRegions();

  }, []);

  return (

    <div className="min-h-screen bg-background">

      <Navbar />

      <div className="container mx-auto px-4 py-8">

        <h1 className="text-3xl font-bold mb-6">GIS Health Map</h1>

        <div style={{height:"500px"}}>

          <MapContainer center={[-0.5,37]} zoom={6} className="h-full w-full">

            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

            {regions.map((r,i)=>(

              <CircleMarker
                key={i}
                center={[r.lat,r.lng]}
                radius={10}
                pathOptions={{color:riskColor(r.riskLevel)}}
              >

                <Popup>

                  <b>{r.name}</b><br/>
                  Users: {r.totalUsers}

                </Popup>

              </CircleMarker>

            ))}

          </MapContainer>

        </div>

      </div>

      <Footer />

    </div>
  );

}