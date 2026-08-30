from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from app.api import deps
from app.models.models import Project, User
from app.schemas.project import Project as ProjectSchema, ProjectCreate, ProjectUpdate

router = APIRouter()

@router.get("/", response_model=List[ProjectSchema])
async def read_projects(
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    result = await db.execute(select(Project).order_by(Project.display_order).offset(skip).limit(limit))
    return result.scalars().all()

@router.post("/", response_model=ProjectSchema)
async def create_project(
    *,
    db: AsyncSession = Depends(deps.get_db),
    project_in: ProjectCreate,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    project = Project(**project_in.model_dump())
    db.add(project)
    await db.commit()
    await db.refresh(project)
    return project

@router.put("/{id}", response_model=ProjectSchema)
async def update_project(
    *,
    db: AsyncSession = Depends(deps.get_db),
    id: str,
    project_in: ProjectUpdate,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    result = await db.execute(select(Project).filter(Project.id == id))
    project = result.scalars().first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    update_data = project_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(project, field, value)
        
    db.add(project)
    await db.commit()
    await db.refresh(project)
    return project

@router.delete("/{id}", response_model=ProjectSchema)
async def delete_project(
    *,
    db: AsyncSession = Depends(deps.get_db),
    id: str,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    result = await db.execute(select(Project).filter(Project.id == id))
    project = result.scalars().first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    await db.execute(delete(Project).filter(Project.id == id))
    await db.commit()
    return project
