from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from app.api import deps
from app.models.models import Certificate, User
from app.schemas.certificate import Certificate as CertificateSchema, CertificateCreate, CertificateUpdate

router = APIRouter()

@router.get("/", response_model=List[CertificateSchema])
async def read_certificates(
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    result = await db.execute(select(Certificate).order_by(Certificate.display_order).offset(skip).limit(limit))
    return result.scalars().all()

@router.post("/", response_model=CertificateSchema)
async def create_certificate(
    *,
    db: AsyncSession = Depends(deps.get_db),
    cert_in: CertificateCreate,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    cert = Certificate(**cert_in.model_dump())
    db.add(cert)
    await db.commit()
    await db.refresh(cert)
    return cert

@router.put("/{id}", response_model=CertificateSchema)
async def update_certificate(
    *,
    db: AsyncSession = Depends(deps.get_db),
    id: str,
    cert_in: CertificateUpdate,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    result = await db.execute(select(Certificate).filter(Certificate.id == id))
    cert = result.scalars().first()
    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found")
    
    update_data = cert_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(cert, field, value)
        
    db.add(cert)
    await db.commit()
    await db.refresh(cert)
    return cert

@router.delete("/{id}", response_model=CertificateSchema)
async def delete_certificate(
    *,
    db: AsyncSession = Depends(deps.get_db),
    id: str,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    result = await db.execute(select(Certificate).filter(Certificate.id == id))
    cert = result.scalars().first()
    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found")
    
    await db.execute(delete(Certificate).filter(Certificate.id == id))
    await db.commit()
    return cert
