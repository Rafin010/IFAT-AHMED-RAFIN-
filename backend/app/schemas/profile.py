from typing import Optional
from pydantic import BaseModel
from uuid import UUID

class ProfileBase(BaseModel):
    name: str
    headline: str
    bio: Optional[str] = None
    location: Optional[str] = None
    email: Optional[str] = None
    github: Optional[str] = None
    linkedin: Optional[str] = None
    instagram: Optional[str] = None
    resume_url: Optional[str] = None
    available_for_hire: bool = True

class ProfileCreate(ProfileBase):
    pass

class ProfileUpdate(ProfileBase):
    name: Optional[str] = None
    headline: Optional[str] = None
    available_for_hire: Optional[bool] = None

class Profile(ProfileBase):
    id: UUID

    class Config:
        from_attributes = True
