SYMPTOM_WEIGHTS = {

    "heavy bleeding": 3,
    "severe cramps": 3,
    "irregular cycle": 2,
    "missed period": 2,
    "spotting": 1,
    "mood swings": 1,
    "bloating": 1

}


def calculate_risk(symptoms):

    score = 0

    for s in symptoms:

        score += SYMPTOM_WEIGHTS.get(s.lower(),1)

    if score >= 5:
        level = "High"

    elif score >= 3:
        level = "Moderate"

    else:
        level = "Low"

    return {

        "score": score,
        "risk_level": level

    }