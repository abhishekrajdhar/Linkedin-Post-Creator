from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from app.utils.prompts import content_prompt

llm = ChatOpenAI(model_name="gpt-4", temperature=0.7)

def generate_post(profile):
    prompt = PromptTemplate.from_template(content_prompt)
    filled_prompt = prompt.format(
        name=profile.name,
        industry=profile.industry,
        role=profile.role,
        interests=", ".join(profile.interests)
    )
    response = llm.predict(filled_prompt)
    return {
        "post": response,
        "hashtags": suggest_hashtags(response),
        "calendar_date": suggest_post_date()
    }

