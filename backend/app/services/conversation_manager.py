conversation_state = {}

def get_next_question(user):

    if user not in conversation_state:
        conversation_state[user] = "ask_duration"
        return "How long has this been happening?"

    elif conversation_state[user] == "ask_duration":
        conversation_state[user] = "ask_pain"
        return "Are you experiencing severe pain or cramps?"

    elif conversation_state[user] == "ask_pain":
        conversation_state[user] = "complete"
        return None