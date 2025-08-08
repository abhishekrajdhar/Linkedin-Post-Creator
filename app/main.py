
from fastapi import Request
from fastapi import FastAPI, Body
from pydantic import BaseModel
from app.services.llm import llm  # Make sure this imports your GeminiLLM
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class PostRequest(BaseModel):
    topic: str
    tone: str = "professional"
    audience: str = "LinkedIn professionals"

@app.options("/generate-post")
async def options_generate_post(request: Request):
    return {}

# Store posts in memory for demo purposes
posts = []

@app.get("/posts")
def get_posts():
    return posts

@app.post("/posts")
def add_post(post: dict = Body(...)):
    posts.append(post)
    return post

@app.post("/generate-post")
def generate_post(request: PostRequest):
    prompt = f"Write a {request.tone} LinkedIn post about {request.topic} for {request.audience}."
    response = llm.predict(prompt)
    return {"post": response}

