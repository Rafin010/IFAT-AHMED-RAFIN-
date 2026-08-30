from sqlalchemy import Column, String, Integer, Text, Boolean, DateTime, JSON, ForeignKey, Uuid
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.db.base import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)

class Profile(Base):
    __tablename__ = "profile"
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, default="Ifat Ahmed Rafin")
    headline = Column(String, default="Full-Stack Architect")
    bio = Column(Text, nullable=True)
    location = Column(String, nullable=True)
    email = Column(String, nullable=True)
    github = Column(String, nullable=True)
    linkedin = Column(String, nullable=True)
    instagram = Column(String, nullable=True)
    resume_url = Column(String, nullable=True)
    available_for_hire = Column(Boolean, default=True)

class Project(Base):
    __tablename__ = "projects"
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    short_description = Column(String, nullable=True)
    long_description = Column(Text, nullable=True)
    category = Column(String, nullable=True) # e.g., app, web, software
    is_featured = Column(Boolean, default=False)
    status = Column(String, default="completed")
    year = Column(Integer, nullable=True)
    cover_image = Column(String, nullable=True)
    technologies = Column(JSON, default=[])
    live_url = Column(String, nullable=True)
    github_url = Column(String, nullable=True)
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Skill(Base):
    __tablename__ = "skills"
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False) # Frontend, Backend, Database
    icon = Column(String, nullable=True) # fontawesome class or image url
    display_order = Column(Integer, default=0)

class Certificate(Base):
    __tablename__ = "certificates"
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    issuer = Column(String, nullable=False)
    date = Column(String, nullable=True)
    image = Column(String, nullable=True)
    credential_url = Column(String, nullable=True)
    display_order = Column(Integer, default=0)

class Experience(Base):
    __tablename__ = "experience"
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    company = Column(String, nullable=False)
    role = Column(String, nullable=False)
    start_date = Column(String, nullable=False)
    end_date = Column(String, nullable=True)
    is_current = Column(Boolean, default=False)
    description = Column(Text, nullable=True)
    technologies = Column(JSON, default=[])
    display_order = Column(Integer, default=0)

class Service(Base):
    __tablename__ = "services"
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    icon = Column(String, nullable=True)
    display_order = Column(Integer, default=0)

class Message(Base):
    __tablename__ = "messages"
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    company = Column(String, nullable=True)
    project_type = Column(String, nullable=True)
    message = Column(Text, nullable=False)
    status = Column(String, default="unread") # unread, read, archived
    created_at = Column(DateTime(timezone=True), server_default=func.now())
