from typing import Optional
from pydantic import BaseModel, EmailStr
from uuid import UUID

class UserBase(BaseModel):
    email: EmailStr
    is_active: Optional[bool] = True

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: UUID

    class Config:
        from_attributes = True

class UserInDB(User):
    hashed_password: str
