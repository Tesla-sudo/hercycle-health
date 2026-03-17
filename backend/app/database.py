from motor.motor_asyncio import AsyncIOMotorClient
from .config import MONGO_URI, DB_NAME

client = AsyncIOMotorClient(MONGO_URI)

db = client[DB_NAME]

users_collection = db["users"]
messages_collection = db["messages"]
symptoms_collection = db["symptoms"]