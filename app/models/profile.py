from pydantic import BaseModel
from typing import List

class Profile(BaseModel):
    name: str
    role: str
    industry: str
    interests: List[str]
