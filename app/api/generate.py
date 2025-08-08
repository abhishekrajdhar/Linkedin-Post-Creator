from fastapi import APIRouter
from app.models.profile import Profile
from app.core.generator import generate_post

router = APIRouter()

@router.post("/generate")
def generate(profile: Profile):
    return generate_post(profile)
