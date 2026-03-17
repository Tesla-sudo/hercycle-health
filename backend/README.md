#  HerCycle Backend API

AI-powered backend for **HerCycle**, a real-time menstrual health intelligence platform that enables:

* WhatsApp-based symptom reporting
* AI-driven conversational triage
* Risk scoring for reproductive health
* Real-time doctor dashboards
* GIS-based health insights

---

# Features

# AI Chatbot Layer

* Processes incoming WhatsApp messages
* Generates conversational responses
* Extracts symptoms using NLP

# Risk Scoring Engine

* Assigns weighted scores to symptoms
* Categorizes users into:

  * Low Risk
  * Moderate Risk
  * High Risk

# Real-Time Analytics

* Aggregates:

  * Symptoms
  * Risk distribution
  * Regional data
* Streams updates via WebSockets

# GIS Data Support

* Tracks symptom reports by region
* Enables heatmap visualization on frontend

# WebSocket Broadcasting

* Pushes live updates to dashboards
* Enables real-time monitoring for doctors

---

# Tech Stack

* **FastAPI** — Backend framework
* **MongoDB** — Data storage
* **Twilio API** — WhatsApp integration
* **WebSockets** — Real-time updates
* **Python** — Core logic

---

# Project Structure

```
app/
├── main.py
├── routes/
│   ├── whatsapp.py
│   ├── analytics.py
│   └── websocket.py
├── services/
│   ├── chatbot_service.py
│   ├── symptom_extractor.py
│   └── risk_scoring.py
├── core/
│   ├── database.py
│   └── websocket_manager.py
```

---

# Setup Instructions

# 1. Clone Repository

```bash
git clone https://github.com/your-repo/hercycle-health.git
cd hercycle-health/backend
```

---

# 2. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
```

---

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 4. Environment Variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
```

---

### 5. Run Server

```bash
uvicorn app.main:app --reload
```

Server runs at:

```
http://localhost:8000
```

---

# API Endpoints

# WhatsApp Webhook

```
POST /whatsapp/webhook
```

* Receives incoming WhatsApp messages from Twilio
* Processes AI response
* Stores data in MongoDB
* Broadcasts to dashboard

---

# Analytics

```
GET /analytics/symptoms
GET /analytics/risk-scores
GET /analytics/regions
GET /analytics/
```

---

# WebSocket

```
ws://localhost:8000/ws/live
```

* Streams real-time health reports

---

# Data Flow

```
User (WhatsApp)
      ↓
Twilio API
      ↓
FastAPI Webhook
      ↓
AI Processing Layer
      ↓
MongoDB Storage
      ↓
WebSocket Broadcast
      ↓
Frontend Dashboard
```

---

# Risk Scoring Logic

Symptoms are weighted:

| Symptom         | Weight |
| --------------- | ------ |
| Heavy bleeding  | 3      |
| Severe cramps   | 3      |
| Irregular cycle | 2      |
| Missed period   | 2      |
| Others          | 1      |

# Risk Levels

* **High** → Score ≥ 5
* **Moderate** → Score ≥ 3
* **Low** → Score < 3

---

# Example Workflow

User sends:

```
"I have heavy bleeding and severe cramps"
```

System:

1. Extracts symptoms → `["heavy bleeding", "severe cramps"]`
2. Calculates score → `6`
3. Assigns risk → `High`
4. Stores in MongoDB
5. Broadcasts to dashboard

---

# Doctor Integration

Each record includes:

* User ID (phone number)
* Symptoms
* Risk level
* Region

Doctors can:

* View real-time cases
* Identify high-risk patients
* Contact patients directly

---

# Security Notes

* Ensure Twilio webhook validation in production
* Protect MongoDB with authentication
* Restrict CORS origins in production

---

# Future Improvements

* AI disease prediction (PCOS, Endometriosis)
* Geo-cluster outbreak detection
* Doctor-patient chat system
* Personalized health recommendations

---

# Hackathon Value

HerCycle is more than a chatbot:

👉 It is a **real-time AI-powered public health surveillance system for women's health**

---

# Contributors

* Backend Engineering: FastAPI, AI, WebSockets
* Frontend Integration: React Dashboard
* AI Layer: Symptom extraction + conversational flow

---

# License

MIT License

---

# Inspiration

Built to bridge the gap between:

* Women’s health awareness
* Accessibility to care
* Real-time clinical insights

---

**HerCycle — Empowering women's health through AI. **