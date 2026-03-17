def extract_symptoms(text):

    text = text.lower()

    symptoms = []

    if "cramp" in text:
        symptoms.append("severe cramps")

    if "heavy bleeding" in text or "bleeding a lot" in text:
        symptoms.append("heavy bleeding")

    if "missed period" in text or "no period" in text:
        symptoms.append("missed period")

    if "irregular" in text:
        symptoms.append("irregular cycle")

    if "cycle length" in text:
        symptoms.append("cycle irregularity")

    if "bleeding for" in text:
        symptoms.append("prolonged bleeding")

    return symptoms