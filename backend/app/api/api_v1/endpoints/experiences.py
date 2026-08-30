from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from app.api import deps
from app.models.models import Experience, User
from app.schemas.experience import Experience as ExperienceSchema, ExperienceCreate, ExperienceUpdate

router = APIRouter()

@router.get("/", response_model=List[ExperienceSchema])
async def read_experiences(
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    result = await db.execute(select(Experience).order_by(Experience.display_order).offset(skip).limit(limit))
    return result.scalars().all()

@router.post("/", response_model=ExperienceSchema)
async def create_experience(
    *,
    db: AsyncSession = Depends(deps.get_db),
    exp_in: ExperienceCreate,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    exp = Experience(**exp_in.model_dump())
    db.add(exp)
    await db.commit()
    await db.refresh(exp)
    return exp

@router.put("/{id}", response_model=ExperienceSchema)
async def update_experience(
    *,
    db: AsyncSession = Depends(deps.get_db),
    id: str,
    exp_in: ExperienceUpdate,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    result = await db.execute(select(Experience).filter(Experience.id == id))
    exp = result.scalars().first()
    if not exp:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    update_data = exp_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(exp, field, value)
        
    db.add(exp)
    await db.commit()
    await db.refresh(exp)
    return exp

@router.delete("/{id}", response_model=ExperienceSchema)
async def delete_experience(
    *,
    db: AsyncSession = Depends(deps.get_db),
    id: str,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    result = await db.execute(select(Experience).filter(Experience.id == id))
    exp = result.scalars().first()
    if not exp:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    await db.execute(delete(Experience).filter(Experience.id == id))
    await db.commit()
    return exp
