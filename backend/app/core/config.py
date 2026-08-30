import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Ifat Ahmed Rafin Portfolio API"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 11520

    POSTGRES_SERVER: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_PORT: str = "5432"

    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        return "sqlite+aiosqlite:///./sql_app.db"

    class Config:
        env_file = ".env"

settings = Settings()
