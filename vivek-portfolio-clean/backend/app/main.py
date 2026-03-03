from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router
from app.db.session import engine
from app.db.base import Base

Base.metadata.create_all(bind=engine)
app = FastAPI(title=settings.PROJECT_NAME, version=settings.VERSION,
    docs_url=f"{settings.API_V1_STR}/docs", openapi_url=f"{settings.API_V1_STR}/openapi.json")
app.add_middleware(CORSMiddleware, allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/health")
def health(): return {"status": "healthy"}
