from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.token import Token, LoginRequest
from app.core.security import verify_password, create_access_token, get_password_hash
from app.models.admin import AdminUser

router = APIRouter()

@router.post("/login", response_model=Token)
def login(creds: LoginRequest, db: Session = Depends(get_db)):
    admin = db.query(AdminUser).filter(AdminUser.email == creds.email).first()
    if not admin or not verify_password(creds.password, admin.hashed_password):
        raise HTTPException(401, "Incorrect credentials")
    return {"access_token": create_access_token(admin.email), "token_type": "bearer"}

@router.post("/register-first-admin", response_model=Token)
def register_first(creds: LoginRequest, db: Session = Depends(get_db)):
    if db.query(AdminUser).first(): raise HTTPException(400, "Admin already exists")
    admin = AdminUser(email=creds.email, hashed_password=get_password_hash(creds.password))
    db.add(admin); db.commit(); db.refresh(admin)
    return {"access_token": create_access_token(admin.email), "token_type": "bearer"}
