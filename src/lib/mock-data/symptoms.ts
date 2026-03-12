export interface SymptomData {
  symptom: string;
  count: number;
  color: string;
}

export const symptomData: SymptomData[] = [
  { symptom: "Severe cramps", count: 3400, color: "hsl(263, 70%, 58%)" },
  { symptom: "Heavy bleeding", count: 2800, color: "hsl(330, 86%, 70%)" },
  { symptom: "Irregular cycles", count: 2200, color: "hsl(263, 50%, 75%)" },
  { symptom: "Mood changes", count: 1500, color: "hsl(330, 60%, 80%)" },
  { symptom: "Fatigue", count: 1200, color: "hsl(263, 40%, 85%)" },
  { symptom: "Hot flashes", count: 800, color: "hsl(38, 92%, 55%)" },
  { symptom: "Sleep disturbances", count: 600, color: "hsl(200, 60%, 60%)" },
];

export const riskDistribution = [
  { name: "Low", value: 4200, fill: "hsl(152, 60%, 45%)" },
  { name: "Moderate", value: 3500, fill: "hsl(38, 92%, 55%)" },
  { name: "High", value: 2300, fill: "hsl(0, 84%, 60%)" },
];

export const monthlyTrends = [
  { month: "Jan", cramps: 280, bleeding: 220, irregular: 180 },
  { month: "Feb", cramps: 310, bleeding: 240, irregular: 190 },
  { month: "Mar", cramps: 290, bleeding: 260, irregular: 210 },
  { month: "Apr", cramps: 340, bleeding: 230, irregular: 200 },
  { month: "May", cramps: 360, bleeding: 250, irregular: 220 },
  { month: "Jun", cramps: 320, bleeding: 270, irregular: 240 },
];
