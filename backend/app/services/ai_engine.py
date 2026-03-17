import os
from dotenv import load_dotenv
from google import genai

# 1. Setup Environment and Client
load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# --- 2. THE CONVERSATIONAL FUNCTION (HerCycle Persona) ---
def ai_chat(message, context=""):
    """
    Handles conversational flow with the HerCycle persona.
    """
    try:
        prompt = f"""
        You are HerCycle, an AI assistant helping women understand menstrual health.

        Conversation history:
        {context}

        User message:
        {message}

        Respond conversationally and medically responsibly.
        Ask follow-up questions if symptoms are unclear.
        """

        # Using the modern SDK and Gemini 3 Flash
        response = client.models.generate_content(
            model="gemini-3-flash-preview", 
            contents=prompt
        )

        return response.text

    except Exception as e:
        print(f"AI Chat error: {e}")
        return None

# --- 3. THE EXTRACTION FUNCTION (Data Tool) ---
def analyze_health_message(message):
    """
    Extracts raw symptoms as a Python-style list.
    """
    try:
        prompt = f"""
        You are a menstrual health assistant.
        Extract menstrual health symptoms from the following message.
        
        Return a Python-style list of symptoms only.
        
        Message:
        {message}
        """

        response = client.models.generate_content(
            model="gemini-3-flash-preview", 
            contents=prompt
        )

        return response.text

    except Exception as e:
        print(f"Extraction error: {e}")
        return "[]"

# --- Example Usage ---
if __name__ == "__main__":
    test_message = "I've been feeling very bloated and had a migraine since yesterday."
    
    # 1. Get the conversational response
    chat_response = ai_chat(test_message)
    print(f"HerCycle: {chat_response}\n")
    
    # 2. Get the structured data for your backend
    symptoms = analyze_health_message(test_message)
    print(f"Extracted Symptoms: {symptoms}")