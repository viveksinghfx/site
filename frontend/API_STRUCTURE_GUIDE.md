# Python Backend API Structure Guide

## Project Directory Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app entry point
│   ├── config.py               # Configuration & environment variables
│   ├── database.py             # Database connection & setup
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── users.py        # User endpoints
│   │   │   ├── projects.py     # Project endpoints
│   │   │   └── auth.py         # Authentication endpoints
│   │   │
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── user.py         # User data models
│   │   │   ├── project.py      # Project data models
│   │   │   └── common.py       # Shared schemas
│   │   │
│   │   └── dependencies/
│   │       ├── __init__.py
│   │       ├── auth.py         # Auth middleware & JWT
│   │       └── database.py     # DB session dependency
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py             # SQLAlchemy User model
│   │   ├── project.py          # SQLAlchemy Project model
│   │   └── base.py             # Base model class
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   ├── user_service.py     # Business logic for users
│   │   ├── project_service.py  # Business logic for projects
│   │   └── email_service.py    # Email sending logic
│   │
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── security.py         # Password hashing, JWT tokens
│   │   ├── validators.py       # Input validation
│   │   └── exceptions.py       # Custom exceptions
│   │
│   └── middleware/
│       ├── __init__.py
│       └── error_handler.py    # Global error handling
│
├── tests/
│   ├── __init__.py
│   ├── test_users.py
│   ├── test_projects.py
│   └── conftest.py             # Test configuration
│
├── .env                        # Environment variables (DO NOT commit)
├── .env.example                # Example environment file
├── requirements.txt            # Python dependencies
└── README.md                   # Project documentation
```

---

## Step-by-Step Connection Guide

### 1. **Environment Configuration** (`app/config.py`)

```python
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost/dbname"
    
    # JWT/Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # App
    APP_NAME: str = "Viveksingh.tech API"
    DEBUG: bool = False
    
    class Config:
        env_file = ".env"

settings = Settings()
```

---

### 2. **Database Setup** (`app/database.py`)

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import settings

# Create database engine
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,  # Verify connections before using
    echo=False
)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all models
Base = declarative_base()

def get_db():
    """Dependency to inject database session into routes"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_all_tables():
    """Create all database tables"""
    Base.metadata.create_all(bind=engine)
```

---

### 3. **Database Models** (`app/models/user.py`)

```python
from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
```

---

### 4. **Request/Response Schemas** (`app/api/schemas/user.py`)

```python
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True  # For SQLAlchemy ORM objects

class UserLogin(BaseModel):
    email: EmailStr
    password: str
```

---

### 5. **Business Logic** (`app/services/user_service.py`)

```python
from sqlalchemy.orm import Session
from app.models.user import User
from app.api.schemas.user import UserCreate, UserUpdate
from app.utils.security import hash_password, verify_password
from fastapi import HTTPException

class UserService:
    @staticmethod
    def create_user(db: Session, user: UserCreate):
        db_user = User(
            email=user.email,
            hashed_password=hash_password(user.password),
            full_name=user.full_name
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    
    @staticmethod
    def get_user_by_email(db: Session, email: str):
        return db.query(User).filter(User.email == email).first()
    
    @staticmethod
    def authenticate_user(db: Session, email: str, password: str):
        user = UserService.get_user_by_email(db, email)
        if not user or not verify_password(password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return user
```

---

### 6. **Authentication** (`app/utils/security.py`)

```python
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from app.config import settings

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# JWT tokens
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, 
        settings.SECRET_KEY, 
        algorithm=settings.ALGORITHM
    )
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(
            token, 
            settings.SECRET_KEY, 
            algorithms=[settings.ALGORITHM]
        )
        email = payload.get("sub")
        if email is None:
            raise JWTError()
        return email
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

---

### 7. **Dependencies** (`app/api/dependencies/auth.py`)

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from sqlalchemy.orm import Session
from app.database import get_db
from app.utils.security import verify_token
from app.services.user_service import UserService

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    """Dependency to get current authenticated user"""
    email = verify_token(credentials.credentials)
    user = UserService.get_user_by_email(db, email)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user
```

---

### 8. **API Routes** (`app/api/routes/auth.py`)

```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta

from app.database import get_db
from app.api.schemas.user import UserCreate, UserResponse, UserLogin
from app.services.user_service import UserService
from app.utils.security import create_access_token
from app.config import settings

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    # Check if user exists
    existing_user = UserService.get_user_by_email(db, user.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user
    new_user = UserService.create_user(db, user)
    return new_user

@router.post("/login")
async def login(user: UserLogin, db: Session = Depends(get_db)):
    """Login user and return JWT token"""
    # Authenticate user
    db_user = UserService.authenticate_user(db, user.email, user.password)
    
    # Create access token
    access_token_expires = timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    access_token = create_access_token(
        data={"sub": db_user.email},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": UserResponse.from_orm(db_user)
    }
```

---

### 9. **Main Application** (`app/main.py`)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import create_all_tables
from app.api.routes import auth, users, projects

# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    debug=settings.DEBUG
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://viveksingh.tech"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
create_all_tables()

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(projects.router)

@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

## Connection Flow Diagram

```
CLIENT REQUEST
    ↓
[FastAPI Route Handler]
    ↓
[Dependency Injection] → get_db(), get_current_user()
    ↓
[Request Schema Validation] → Pydantic schema
    ↓
[Service Layer] → Business logic (UserService, ProjectService)
    ↓
[Database Layer] → SQLAlchemy models & queries
    ↓
[Database] → PostgreSQL/MySQL
    ↓
[Response] → Response schema (UserResponse, etc.)
    ↓
CLIENT RESPONSE
```

---

## Requirements.txt

```
fastapi==0.104.1
uvicorn==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9  # PostgreSQL driver
pydantic==2.5.0
pydantic-settings==2.1.0
python-jose==3.3.0
passlib==1.7.4
bcrypt==4.1.1
email-validator==2.1.0
python-multipart==0.0.6
```

---

## Quick Start Commands

```bash
# 1. Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Set up .env file
cp .env.example .env

# 4. Run migrations (if using Alembic)
alembic upgrade head

# 5. Start server
uvicorn app.main:app --reload

# 6. API docs available at:
# http://localhost:8000/docs (Swagger UI)
# http://localhost:8000/redoc (ReDoc)
```

---

## Best Practices

✅ **DO:**
- Separate concerns (models, schemas, services, routes)
- Use dependency injection for database sessions
- Hash passwords with bcrypt
- Validate all inputs with Pydantic
- Use environment variables for sensitive data
- Implement proper error handling
- Add logging for debugging
- Write unit tests

❌ **DON'T:**
- Expose database objects directly to API
- Store passwords in plain text
- Mix business logic with route handlers
- Hardcode configuration values
- Commit .env files
- Trust user input without validation
- Skip error handling

---

## Frontend to Backend Connection

### From Your Next.js Frontend:

```typescript
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  
  const data = await response.json()
  if (response.ok) {
    localStorage.setItem('token', data.access_token)
    return data
  }
  throw new Error(data.detail)
}

export async function getUserProfile() {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/users/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  return response.json()
}
```

This structure ensures clean, maintainable, and scalable Python backend code with clear separation of concerns and proper connections between all components.
