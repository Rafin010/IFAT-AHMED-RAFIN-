from typing import Optional, List
from pydantic import BaseModel, ConfigDict
from uuid import UUID

class ExperienceBase(BaseModel):
    company: str
    role: str
    start_date: str
    end_date: Optional[str] = None
    is_current: Optional[bool] = False
    description: Optional[str] = None
    technologies: Optional[List[str]] = []
    display_order: Optional[int] = 0

class ExperienceCreate(ExperienceBase):
    pass

class ExperienceUpdate(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    is_current: Optional[bool] = None
    description: Optional[str] = None
    technologies: Optional[List[str]] = None
    display_order: Optional[int] = None

class Experience(ExperienceBase):
    id: UUID
    
    model_config = ConfigDict(from_attributes=True)
