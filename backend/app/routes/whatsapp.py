from fastapi import APIRouter, Request
from fastapi.responses import Response
from datetime import datetime
from twilio.twiml.messaging_response import MessagingResponse

from app.services.chatbot_service import process_message
from app.services.symptom_extractor import extract_symptoms
from app.services.risk_scoring import calculate_risk

from app.core.database import messages_collection
from app.core.websocket_manager import manager

router = APIRouter()


@router.post("/webhook")
async def whatsapp_webhook(request: Request):

    try:

        form = await request.form()

        incoming_msg = form.get("Body")
        sender = form.get("From")

        print("Incoming message:", incoming_msg)

        # Generate chatbot reply
        response_text = process_message(incoming_msg, sender)

        symptoms = extract_symptoms(incoming_msg)

        risk_score = 0
        risk_level = "Low"

        if symptoms:
            risk = calculate_risk(symptoms)
            risk_score = risk["score"]
            risk_level = risk["risk_level"]

        data = {

    "user_id": sender,
    "phone": sender,
    "message": incoming_msg,
    "symptoms": symptoms,
    "risk_score": risk_score,
    "risk_level": risk_level,
    "region": "Kenya",
    "timestamp": datetime.utcnow().isoformat()

}

        # Save to MongoDB
        result = await messages_collection.insert_one(data)

        # convert ObjectId to string for websocket
        data["_id"] = str(result.inserted_id)

        # Broadcast to dashboard
        await manager.broadcast(data)

        resp = MessagingResponse()
        resp.message(response_text)

        return Response(
            content=str(resp),
            media_type="application/xml"
        )

    except Exception as e:

        print("Webhook error:", e)

        resp = MessagingResponse()
        resp.message("Sorry, something went wrong. Please try again.")

        return Response(
            content=str(resp),
            media_type="application/xml"
        )