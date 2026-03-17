from pydantic import BaseModel

class User(BaseModel):
    user_id: str
    phone: str
    region: str
    age_group: str