from pydantic import BaseModel
from datetime import datetime

class Message(BaseModel):

    user_id: str
    message: str
    symptoms: list
    risk_score: int
    risk_level: str
    region: str | None = None
    timestamp: datetime