from typing import Any, Dict
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.api import deps
from app.models.models import Profile, Project, Skill, Certificate, Experience, Service

router = APIRouter()

@router.get("/all")
async def get_all_portfolio_data(
    db: AsyncSession = Depends(deps.get_db),
) -> Any:
    # Fetch all data concurrently or sequentially
    profile_result = await db.execute(select(Profile))
    profile = profile_result.scalars().first()

    projects_result = await db.execute(select(Project).order_by(Project.display_order))
    projects = projects_result.scalars().all()

    skills_result = await db.execute(select(Skill).order_by(Skill.display_order))
    skills = skills_result.scalars().all()

    certificates_result = await db.execute(select(Certificate).order_by(Certificate.display_order))
    certificates = certificates_result.scalars().all()

    experience_result = await db.execute(select(Experience).order_by(Experience.display_order))
    experience = experience_result.scalars().all()

    services_result = await db.execute(select(Service).order_by(Service.display_order))
    services = services_result.scalars().all()

    return {
        "profile": profile,
        "projects": projects,
        "skills": skills,
        "certificates": certificates,
        "experience": experience,
        "services": services
    }
