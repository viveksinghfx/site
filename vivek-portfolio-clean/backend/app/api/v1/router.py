from fastapi import APIRouter
from app.api.v1.endpoints import contact, auth, agents

api_router = APIRouter()
api_router.include_router(contact.router, prefix="/contact", tags=["Contact"])
api_router.include_router(auth.router,    prefix="/auth",    tags=["Auth"])
api_router.include_router(agents.router,  prefix="/agents",  tags=["AI Agents"])
