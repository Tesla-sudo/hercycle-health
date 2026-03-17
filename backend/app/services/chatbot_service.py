from .ai_engine import ai_chat
from .symptom_extractor import extract_symptoms
from .risk_scoring import calculate_risk
from .recommendations import get_possible_causes, lifestyle_advice
from .conversation_context import update_context


def process_message(message, user="default"):

    if not message:
        return "Please describe your symptoms."

    # store conversation history
    context = update_context(user, message)

    # Step 1 — AI handles conversation
    ai_response = ai_chat(message, context)

    # Step 2 — extract symptoms from conversation
    symptoms = extract_symptoms(context)

    # Step 3 — ML risk scoring
    risk_score = None
    risk_level = None

    if symptoms:

        risk = calculate_risk(symptoms)

        risk_score = risk["score"]
        risk_level = risk["risk_level"]

    # Step 4 — Build medical insight layer
    if symptoms:

        causes = get_possible_causes(symptoms)

        advice = lifestyle_advice(symptoms)

        medical_block = f"""

Health Assessment
Risk Score: {risk_score}
Risk Level: {risk_level}

Possible causes:
- """ + "\n- ".join(causes)

        medical_block += "\n\nHelpful actions:\n- " + "\n- ".join(advice)

    else:

        medical_block = "\n\nTell me more about the symptoms so I can help assess your health."

    # Step 5 — Combine AI + Medical analysis

    if ai_response:

        return ai_response + medical_block

    # fallback if AI fails
    return (
        "Thanks for sharing. I may need more details about your symptoms."
    )