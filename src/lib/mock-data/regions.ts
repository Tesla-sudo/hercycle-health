export interface Region {
  name: string;
  lat: number;
  lng: number;
  totalUsers: number;
  commonSymptom: string;
  riskLevel: "Low" | "Moderate" | "High";
}

export const regions: Region[] = [
  { name: "Nairobi", lat: -1.2921, lng: 36.8219, totalUsers: 3200, commonSymptom: "Irregular cycles", riskLevel: "High" },
  { name: "Kisumu", lat: -0.1022, lng: 34.7617, totalUsers: 1800, commonSymptom: "Severe cramps", riskLevel: "High" },
  { name: "Mombasa", lat: -4.0435, lng: 39.6682, totalUsers: 1500, commonSymptom: "Heavy bleeding", riskLevel: "Moderate" },
  { name: "Nakuru", lat: -0.3031, lng: 36.0800, totalUsers: 1200, commonSymptom: "Severe cramps", riskLevel: "High" },
  { name: "Eldoret", lat: 0.5143, lng: 35.2698, totalUsers: 900, commonSymptom: "Mood changes", riskLevel: "Moderate" },
  { name: "Kisii", lat: -0.6817, lng: 34.7668, totalUsers: 600, commonSymptom: "Fatigue", riskLevel: "Low" },
  { name: "Thika", lat: -1.0396, lng: 37.0900, totalUsers: 750, commonSymptom: "Severe cramps", riskLevel: "High" },
  { name: "Nyeri", lat: -0.4197, lng: 36.9511, totalUsers: 500, commonSymptom: "Irregular cycles", riskLevel: "Moderate" },
  { name: "Malindi", lat: -3.2192, lng: 40.1169, totalUsers: 350, commonSymptom: "Heavy bleeding", riskLevel: "Low" },
  { name: "Garissa", lat: -0.4532, lng: 39.6461, totalUsers: 280, commonSymptom: "Irregular cycles", riskLevel: "Moderate" },
];
