from datetime import datetime
from typing import List
from sqlalchemy import String, Text, DateTime, ARRAY, JSON, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base

class Project(Base):
    __tablename__ = "projects"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(200))
    description: Mapped[str] = mapped_column(Text)
    tags: Mapped[List[str]] = mapped_column(ARRAY(String), default=[])
    github_url: Mapped[str] = mapped_column(String(500), default="")
    live_url: Mapped[str] = mapped_column(String(500), default="")
    highlights: Mapped[List[str]] = mapped_column(ARRAY(String), default=[])
    problem: Mapped[dict] = mapped_column(JSON, default={})
    solution: Mapped[dict] = mapped_column(JSON, default={})
    impact: Mapped[dict] = mapped_column(JSON, default={})
    architecture: Mapped[dict] = mapped_column(JSON, default={})
    code_snippets: Mapped[List[dict]] = mapped_column(JSON, default=[])
    challenges: Mapped[List[dict]] = mapped_column(JSON, default=[])
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    order: Mapped[int] = mapped_column(default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
