from app.services.keywords import extract_keywords

def suggest_hashtags(text):
    keywords = extract_keywords(text)
    return [f"#{kw.replace(' ', '')}" for kw in keywords[:5]]
