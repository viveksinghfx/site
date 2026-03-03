import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List
from sqlalchemy.orm import Session
from app.models.contact import ContactMessage
from app.schemas.contact import ContactCreate
from app.core.config import settings

def create_message(db: Session, data: ContactCreate) -> ContactMessage:
    msg = ContactMessage(**data.model_dump())
    db.add(msg); db.commit(); db.refresh(msg); return msg

def get_all_messages(db: Session, unread_only: bool = False) -> List[ContactMessage]:
    q = db.query(ContactMessage)
    if unread_only: q = q.filter(ContactMessage.is_read == False)
    return q.order_by(ContactMessage.created_at.desc()).all()

def mark_as_read(db: Session, message_id: int):
    msg = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if msg: msg.is_read = True; db.commit(); db.refresh(msg)
    return msg

def send_notification_email(contact: ContactCreate) -> bool:
    if not settings.SMTP_USER: return False
    try:
        msg = MIMEMultipart()
        msg["Subject"] = f"[Portfolio] New message from {contact.name}"
        msg["From"] = settings.SMTP_USER; msg["To"] = settings.CONTACT_EMAIL
        msg.attach(MIMEText(f"Name: {contact.name}\nEmail: {contact.email}\n\n{contact.message}", "plain"))
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as s:
            s.starttls(); s.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            s.sendmail(settings.SMTP_USER, settings.CONTACT_EMAIL, msg.as_string())
        return True
    except: return False
