// API service placeholders for FastAPI backend integration
// Base URL will be configured via environment variable

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
  return response.json();
}

// User endpoints
export const getUsers = () => fetchApi("/users");
export const getUserById = (id: string) => fetchApi(`/users/${id}`);

// Analytics endpoints
export const getRiskScores = () => fetchApi("/analytics/risk-scores");
export const getSymptoms = () => fetchApi("/analytics/symptoms");
export const getRegions = () => fetchApi("/analytics/regions");
export const getAnalytics = () => fetchApi("/analytics");

// WhatsApp webhook (POST)
export const sendWhatsAppWebhook = (data: unknown) =>
  fetchApi("/whatsapp/webhook", { method: "POST", body: JSON.stringify(data) });

/*
  Backend Integration Notes:
  
  FastAPI endpoints expected:
  - POST /whatsapp/webhook       → Receives Twilio WhatsApp messages
  - GET  /analytics/symptoms     → Symptom aggregation data
  - GET  /analytics/risk-scores  → Risk score distribution
  - GET  /analytics/regions      → Regional health data
  - GET  /users                  → Anonymized user list
  
  Twilio WhatsApp Flow:
  User → WhatsApp → Twilio → FastAPI → Database → Frontend Dashboard (via API)
*/
