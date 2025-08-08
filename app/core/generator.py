from app.core.prompt import content_prompt
from app.services.llm import llm
from app.core.hashtags import suggest_hashtags
from app.core.calendar import suggest_post_date

def generate_post(profile):
    prompt = content_prompt.format(
        name=profile.name,
        industry=profile.industry,
        role=profile.role,
        interests=", ".join(profile.interests)
    )
    response = llm.predict(prompt)
    return {
        "post": response,
        "hashtags": suggest_hashtags(response),
        "calendar_date": suggest_post_date()
    }
