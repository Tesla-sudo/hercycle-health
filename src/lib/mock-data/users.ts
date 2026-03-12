export interface User {
  id: string;
  region: string;
  symptom: string;
  cycleLength: number;
  riskScore: "Low" | "Moderate" | "High";
  ageGroup: string;
  lastReport: string;
}

export const users: User[] = [
  { id: "HC-2843", region: "Nairobi", symptom: "Heavy bleeding", cycleLength: 38, riskScore: "Moderate", ageGroup: "25-34", lastReport: "2 hours ago" },
  { id: "HC-1029", region: "Kisumu", symptom: "Severe cramps", cycleLength: 42, riskScore: "High", ageGroup: "18-24", lastReport: "30 min ago" },
  { id: "HC-9931", region: "Nakuru", symptom: "Severe cramps, irregular cycles", cycleLength: 50, riskScore: "High", ageGroup: "25-34", lastReport: "1 hour ago" },
  { id: "HC-4521", region: "Mombasa", symptom: "Irregular cycles", cycleLength: 35, riskScore: "Moderate", ageGroup: "35-44", lastReport: "3 hours ago" },
  { id: "HC-7782", region: "Eldoret", symptom: "Mood changes", cycleLength: 28, riskScore: "Low", ageGroup: "18-24", lastReport: "5 hours ago" },
  { id: "HC-3310", region: "Nairobi", symptom: "Heavy bleeding", cycleLength: 40, riskScore: "High", ageGroup: "35-44", lastReport: "15 min ago" },
  { id: "HC-5567", region: "Kisii", symptom: "Fatigue", cycleLength: 30, riskScore: "Low", ageGroup: "25-34", lastReport: "4 hours ago" },
  { id: "HC-8891", region: "Thika", symptom: "Severe cramps", cycleLength: 45, riskScore: "High", ageGroup: "18-24", lastReport: "45 min ago" },
  { id: "HC-2204", region: "Nyeri", symptom: "Irregular cycles", cycleLength: 32, riskScore: "Moderate", ageGroup: "25-34", lastReport: "6 hours ago" },
  { id: "HC-6643", region: "Mombasa", symptom: "Hot flashes", cycleLength: 0, riskScore: "Moderate", ageGroup: "45+", lastReport: "2 hours ago" },
  { id: "HC-1187", region: "Nairobi", symptom: "Sleep disturbances", cycleLength: 0, riskScore: "Low", ageGroup: "45+", lastReport: "8 hours ago" },
  { id: "HC-3398", region: "Kisumu", symptom: "Heavy bleeding", cycleLength: 36, riskScore: "Moderate", ageGroup: "25-34", lastReport: "1 hour ago" },
  { id: "HC-7750", region: "Nakuru", symptom: "Mood changes", cycleLength: 29, riskScore: "Low", ageGroup: "18-24", lastReport: "7 hours ago" },
  { id: "HC-4400", region: "Eldoret", symptom: "Severe cramps", cycleLength: 44, riskScore: "High", ageGroup: "35-44", lastReport: "20 min ago" },
  { id: "HC-2019", region: "Nairobi", symptom: "Irregular cycles", cycleLength: 48, riskScore: "High", ageGroup: "25-34", lastReport: "10 min ago" },
];
