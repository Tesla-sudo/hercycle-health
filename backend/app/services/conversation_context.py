user_context = {}

def update_context(user, message):

    if user not in user_context:
        user_context[user] = []

    user_context[user].append(message)

    return " ".join(user_context[user])