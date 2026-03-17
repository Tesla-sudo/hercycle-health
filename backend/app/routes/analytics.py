from fastapi import APIRouter
from app.core.database import messages_collection

router = APIRouter()


@router.get("/risk-scores")
async def risk_scores():

    pipeline = [
        {
            "$group": {
                "_id": "$risk_level",
                "count": {"$sum": 1}
            }
        }
    ]

    results = await messages_collection.aggregate(pipeline).to_list(100)

    return results


@router.get("/symptoms")
async def symptoms():

    pipeline = [
        {"$unwind": "$symptoms"},
        {
            "$group": {
                "_id": "$symptoms",
                "count": {"$sum": 1}
            }
        }
    ]

    results = await messages_collection.aggregate(pipeline).to_list(100)

    return results


@router.get("/regions")
async def regions():

    pipeline = [
        {
            "$group": {
                "_id": "$region",
                "count": {"$sum": 1}
            }
        }
    ]

    results = await messages_collection.aggregate(pipeline).to_list(100)

    return results


@router.get("/")
async def analytics():

    total = await messages_collection.count_documents({})

    return {
        "total_messages": total
    }