from typing import List, Optional, Any, Dict
from pydantic import BaseModel
from datetime import datetime

class ProjectBase(BaseModel):
    slug: str; title: str; description: str
    tags: List[str] = []; github_url: str = ""; live_url: str = ""
    highlights: List[str] = []; problem: Dict[str,Any] = {}; solution: Dict[str,Any] = {}
    impact: Dict[str,Any] = {}; architecture: Dict[str,Any] = {}
    code_snippets: List[Dict[str,Any]] = []; challenges: List[Dict[str,Any]] = []
    is_featured: bool = False; order: int = 0

class ProjectCreate(ProjectBase): pass
class ProjectUpdate(BaseModel):
    title: Optional[str]=None; description: Optional[str]=None; tags: Optional[List[str]]=None
    github_url: Optional[str]=None; live_url: Optional[str]=None; is_featured: Optional[bool]=None
class ProjectResponse(ProjectBase):
    id: int; created_at: datetime; updated_at: datetime
    class Config: from_attributes = True
