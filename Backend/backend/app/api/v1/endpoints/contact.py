from typing import List
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.contact import ContactCreate, ContactResponse, ContactMessageResponse
from app.services import contact_service
from app.api.v1.deps import get_current_admin

router = APIRouter()

@router.post("/", response_model=ContactMessageResponse)
def submit(data: ContactCreate, bg: BackgroundTasks, db: Session = Depends(get_db)):
    contact_service.create_message(db, data)
    bg.add_task(contact_service.send_notification_email, data)
    return {"success": True, "message": "Message received! I'll be in touch soon."}

@router.get("/", response_model=List[ContactResponse])
def list_messages(unread_only: bool = False, db: Session = Depends(get_db), _=Depends(get_current_admin)):
    return contact_service.get_all_messages(db, unread_only)
