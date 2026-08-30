from fastapi import APIRouter

from app.api.api_v1.endpoints import auth, projects, profiles, portfolio, certificates, experiences

api_router = APIRouter()
api_router.include_router(auth.router, tags=["login"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(profiles.router, prefix="/profile", tags=["profile"])
api_router.include_router(portfolio.router, prefix="/portfolio", tags=["portfolio"])
api_router.include_router(certificates.router, prefix="/certificates", tags=["certificates"])
api_router.include_router(experiences.router, prefix="/experiences", tags=["experiences"])
