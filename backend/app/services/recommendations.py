def get_possible_causes(symptoms):

    causes = []

    if "prolonged bleeding" in symptoms:
        causes.append("Hormonal imbalance")
        causes.append("Uterine fibroids")
        causes.append("Endometriosis")

    if "severe cramps" in symptoms:
        causes.append("Endometriosis")
        causes.append("Pelvic inflammation")

    if "irregular cycle" in symptoms:
        causes.append("PCOS")
        causes.append("Stress or hormonal changes")

    return list(set(causes))

def lifestyle_advice(symptoms):

    advice = []

    advice.append("Stay hydrated and drink plenty of water")

    if "severe cramps" in symptoms:
        advice.append("Apply a warm compress on the lower abdomen")

    if "heavy bleeding" in symptoms:
        advice.append("Eat iron rich foods like spinach and beans")

    if "irregular cycle" in symptoms:
        advice.append("Maintain balanced nutrition and manage stress")

    advice.append("If symptoms persist for several cycles, consult a doctor")

    return advice