from typing import Optional
from pydantic import BaseModel, ConfigDict
from uuid import UUID

class CertificateBase(BaseModel):
    title: str
    issuer: str
    date: Optional[str] = None
    image: Optional[str] = None
    credential_url: Optional[str] = None
    display_order: Optional[int] = 0

class CertificateCreate(CertificateBase):
    pass

class CertificateUpdate(BaseModel):
    title: Optional[str] = None
    issuer: Optional[str] = None
    date: Optional[str] = None
    image: Optional[str] = None
    credential_url: Optional[str] = None
    display_order: Optional[int] = None

class Certificate(CertificateBase):
    id: UUID
    
    model_config = ConfigDict(from_attributes=True)
