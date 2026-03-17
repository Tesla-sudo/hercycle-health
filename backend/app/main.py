from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import whatsapp, analytics, websocket

app = FastAPI(
    title="HerCycle API",
    description="Backend for HerCycle women's health platform"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(whatsapp.router, prefix="/whatsapp")
app.include_router(analytics.router, prefix="/analytics")
app.include_router(websocket.router, prefix="/ws")


@app.get("/")
def home():
    return {"message": "HerCycle backend running"}