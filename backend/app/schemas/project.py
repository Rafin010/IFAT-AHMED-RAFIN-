from typing import Optional, List
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class ProjectBase(BaseModel):
    title: str
    slug: str
    short_description: Optional[str] = None
    long_description: Optional[str] = None
    category: Optional[str] = None
    is_featured: bool = False
    status: str = "completed"
    year: Optional[int] = None
    cover_image: Optional[str] = None
    technologies: List[str] = []
    live_url: Optional[str] = None
    github_url: Optional[str] = None
    display_order: int = 0

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    title: Optional[str] = None
    slug: Optional[str] = None
    is_featured: Optional[bool] = None
    status: Optional[str] = None
    display_order: Optional[int] = None

class Project(ProjectBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
