# Authentication Guide

Implement JWT authentication across your frontend and backend.

## Table of Contents
1. [How JWT Works](#how-jwt-works)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Token Management](#token-management)
5. [Protected Routes](#protected-routes)
6. [Logout](#logout)

---

## How JWT Works

### The Flow

```
1. User enters credentials
2. Backend validates & creates JWT token
3. Frontend stores token (localStorage/cookies)
4. Frontend sends token in Authorization header
5. Backend verifies token for protected routes
6. Access granted/denied based on token validity
```

### Token Structure

```
JWT = Header.Payload.Signature

Example:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOjEsImV4cCI6MTcwMDAwMDAwMH0.
signature_here

Header: {"alg": "HS256", "typ": "JWT"}
Payload: {"sub": 1, "exp": 1700000000}
Signature: HMACSHA256(header.payload, secret)
```

---

## Backend Setup

### Step 1: Install Dependencies

```bash
pip install pyjwt bcrypt python-jose
```

### Step 2: Create Auth Module

**File: `backend/auth.py`**

```python
import os
import jwt
import bcrypt
from datetime import datetime, timedelta
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthCredentials

SECRET_KEY = os.getenv("JWT_SECRET", "your_secret_key_change_this")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24

security = HTTPBearer()

# Password hashing
def hash_password(password: str) -> str:
    """Hash password using bcrypt"""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode(), salt)
    return hashed.decode()

def verify_password(password: str, hashed: str) -> bool:
    """Verify password against hash"""
    return bcrypt.checkpw(password.encode(), hashed.encode())

# JWT Token
def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    """Create JWT token"""
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt

def verify_token(credentials: HTTPAuthCredentials = Depends(security)) -> dict:
    """Verify JWT token and return decoded payload"""
    token = credentials.credentials
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_current_user_id(payload: dict = Depends(verify_token)) -> int:
    """Extract user ID from token"""
    return payload.get("sub")
```

### Step 3: Create Auth Endpoints

**File: `backend/routes/auth.py`**

```python
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from datetime import timedelta

from auth import (
    hash_password,
    verify_password,
    create_access_token,
    ACCESS_TOKEN_EXPIRE_HOURS,
)
from models import User
from database import get_db

router = APIRouter(prefix="/api/auth", tags=["auth"])

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict

class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str
    full_name: str

@router.post("/login", response_model=LoginResponse)
async def login(
    request: LoginRequest,
    db: Session = Depends(get_db)
):
    """Login endpoint"""
    # Find user
    user = db.query(User).filter(User.username == request.username).first()
    
    if not user or not verify_password(request.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create token
    access_token_expires = timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    access_token = create_access_token(
        data={"sub": user.id},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "full_name": user.full_name
        }
    }

@router.post("/register")
async def register(
    request: RegisterRequest,
    db: Session = Depends(get_db)
):
    """Register new user"""
    # Check if user exists
    existing = db.query(User).filter(
        (User.username == request.username) | 
        (User.email == request.email)
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Create user
    user = User(
        username=request.username,
        email=request.email,
        password_hash=hash_password(request.password),
        full_name=request.full_name
    )
    
    db.add(user)
    db.commit()
    db.refresh(user)
    
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email
    }

@router.get("/me")
async def get_current_user(
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    """Get current authenticated user"""
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "full_name": user.full_name
    }
```

### Step 4: Add CORS Configuration

```python
# File: backend/main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Frontend Setup

### Step 1: Create Auth Context

**File: `context/auth-context.tsx`**

```typescript
'use client'

import React, { createContext, useState, useCallback, useEffect } from 'react'

interface User {
  id: number
  username: string
  email: string
  full_name: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (username: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string, fullName: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  error: string | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token')
    if (storedToken) {
      setToken(storedToken)
      // Verify token is still valid
      fetchCurrentUser(storedToken)
    }
  }, [])

  const fetchCurrentUser = useCallback(async (authToken: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        // Token invalid
        logout()
      }
    } catch (err) {
      console.error('Failed to fetch user:', err)
    }
  }, [])

  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      setToken(data.access_token)
      setUser(data.user)
      localStorage.setItem('auth_token', data.access_token)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (
    username: string,
    email: string,
    password: string,
    fullName: string
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
          full_name: fullName,
        }),
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      // Auto-login after registration
      await login(username, password)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [login])

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('auth_token')
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

### Step 2: Update Layout with Provider

**File: `app/layout.tsx`**

```typescript
import { AuthProvider } from '@/context/auth-context'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

---

## Token Management

### Store Token Securely

```typescript
// Option 1: localStorage (simpler, less secure)
localStorage.setItem('auth_token', token)
const token = localStorage.getItem('auth_token')

// Option 2: httpOnly cookies (more secure, requires backend support)
// Backend sets: Set-Cookie: auth_token=...; HttpOnly; Secure
// Browser automatically sends it
```

### Send Token in Requests

```typescript
// Option 1: Authorization header
fetch(url, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

// Option 2: Custom header
fetch(url, {
  headers: {
    'X-Access-Token': token
  }
})
```

---

## Protected Routes

### Frontend Protected Route

**File: `components/protected-route.tsx`**

```typescript
'use client'

import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, token } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!token && !user) {
      router.push('/login')
    }
  }, [token, user, router])

  if (!user) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}
```

### Usage

```typescript
// pages/dashboard/page.tsx
import { ProtectedRoute } from '@/components/protected-route'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <h1>Dashboard</h1>
      {/* Protected content */}
    </ProtectedRoute>
  )
}
```

### Backend Protected Endpoint

```python
from auth import get_current_user_id
from fastapi import Depends

@app.get("/api/dashboard")
async def get_dashboard(user_id: int = Depends(get_current_user_id)):
    """Only accessible with valid JWT token"""
    return {
        "message": f"Hello user {user_id}",
        "data": [...]
    }
```

---

## Logout

```typescript
export function LogoutButton() {
  const { logout } = useAuth()
  const router = useRouter()

  function handleLogout() {
    logout()
    router.push('/')
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  )
}
```

---

## Security Best Practices

### ✅ DO

```
✅ Hash passwords with bcrypt
✅ Use HTTPS in production
✅ Set token expiration (24 hours)
✅ Validate token on every request
✅ Clear token on logout
✅ Refresh token before expiry
```

### ❌ DON'T

```
❌ Store plaintext passwords
❌ Send token in URL
❌ Use weak JWT secret
❌ Forget to validate token
❌ Set very long token expiry
❌ Log sensitive information
```

---

## Testing

```bash
# Test registration
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"test123","full_name":"Test User"}'

# Test login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'

# Test protected endpoint
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/dashboard
```

---

## Quick Checklist

- [ ] Dependencies installed (pyjwt, bcrypt)
- [ ] Secret key configured in .env
- [ ] Password hashing implemented
- [ ] JWT token creation working
- [ ] Token verification working
- [ ] Login endpoint created
- [ ] Register endpoint created
- [ ] Auth context created
- [ ] Provider added to layout
- [ ] Protected routes working
- [ ] CORS configured
- [ ] Tested with real credentials
