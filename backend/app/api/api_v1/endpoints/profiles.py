from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.api import deps
from app.models.models import Profile, User
from app.schemas.profile import Profile as ProfileSchema, ProfileUpdate

router = APIRouter()

@router.get("/", response_model=ProfileSchema)
async def read_profile(
    db: AsyncSession = Depends(deps.get_db),
) -> Any:
    result = await db.execute(select(Profile))
    profile = result.scalars().first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.put("/{id}", response_model=ProfileSchema)
async def update_profile(
    *,
    db: AsyncSession = Depends(deps.get_db),
    id: str,
    profile_in: ProfileUpdate,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    result = await db.execute(select(Profile).filter(Profile.id == id))
    profile = result.scalars().first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    update_data = profile_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(profile, field, value)
        
    db.add(profile)
    await db.commit()
    await db.refresh(profile)
    return profile
