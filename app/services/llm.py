import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GOOGLE_API_KEY")

if GEMINI_API_KEY is None:
    raise ValueError("GOOGLE_API_KEY not found in environment variables.")

genai.configure(api_key=GEMINI_API_KEY)

class GeminiLLM:
    def __init__(self):
        self.model = genai.GenerativeModel("gemini-2.0-flash")

    def predict(self, prompt: str) -> str:
        response = self.model.generate_content(prompt)
        return response.text

llm = GeminiLLM()
