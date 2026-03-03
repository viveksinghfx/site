from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class ContactCreate(BaseModel):
    name: str; email: EmailStr; subject: Optional[str]=""; message: str

class ContactResponse(BaseModel):
    id: int; name: str; email: str; subject: str; message: str
    is_read: bool; created_at: datetime
    class Config: from_attributes = True

class ContactMessageResponse(BaseModel):
    success: bool; message: str
