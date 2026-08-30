from fastapi import APIRouter

from app.api.api_v1.endpoints import auth, projects, profiles, portfolio
# from app.api.api_v1.endpoints import skills, certificates, experiences, services, messages

api_router = APIRouter()
api_router.include_router(auth.router, tags=["login"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(profiles.router, prefix="/profile", tags=["profile"])
api_router.include_router(portfolio.router, prefix="/portfolio", tags=["portfolio"])
