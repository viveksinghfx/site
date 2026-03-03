# API Integration Guide

Connect your Next.js frontend to Python backend with complete examples.

## Table of Contents
1. [Setup](#setup)
2. [Basic Fetch Patterns](#basic-fetch-patterns)
3. [Using SWR for Data Fetching](#using-swr-for-data-fetching)
4. [Authentication Integration](#authentication-integration)
5. [Error Handling](#error-handling)
6. [Real-World Examples](#real-world-examples)

---

## Setup

### Step 1: Environment Variable

**Frontend: `.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Step 2: API Client Setup

**File: `lib/api-client.ts`**

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>
}

export async function apiCall<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  // Add auth token if available
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
```

---

## Basic Fetch Patterns

### GET Request

**Backend Endpoint:**
```python
@app.get("/api/projects")
async def get_projects():
    return {
        "projects": [
            {"id": 1, "title": "Multi-Agent Research", "technologies": "Python, FastAPI"},
            {"id": 2, "title": "Portfolio Website", "technologies": "Next.js, TypeScript"}
        ]
    }
```

**Frontend (React Component):**
```typescript
// components/projects-list.tsx
'use client'

import { useEffect, useState } from 'react'
import { apiCall } from '@/lib/api-client'

interface Project {
  id: number
  title: string
  technologies: string
}

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await apiCall<{ projects: Project[] }>('/api/projects')
        setProjects(data.projects)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>
          <h3>{project.title}</h3>
          <p>{project.technologies}</p>
        </div>
      ))}
    </div>
  )
}
```

### POST Request

**Backend Endpoint:**
```python
from pydantic import BaseModel

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

@app.post("/api/contact")
async def send_contact(data: ContactMessage):
    # Process message
    return {"status": "success", "message": "Message received"}
```

**Frontend:**
```typescript
async function sendContactMessage(name: string, email: string, message: string) {
  const response = await apiCall('/api/contact', {
    method: 'POST',
    body: JSON.stringify({ name, email, message }),
  })
  return response
}
```

### PUT Request

```typescript
async function updateProject(id: number, updates: Partial<Project>) {
  return await apiCall(`/api/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  })
}
```

### DELETE Request

```typescript
async function deleteProject(id: number) {
  return await apiCall(`/api/projects/${id}`, {
    method: 'DELETE',
  })
}
```

---

## Using SWR for Data Fetching

SWR is better than useEffect + useState. It handles caching, revalidation, and error states automatically.

### Install SWR

```bash
npm install swr
```

### Setup SWR

**File: `lib/api-client-swr.ts`**

```typescript
import useSWR from 'swr'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function fetcher(endpoint: string) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, { headers })
  
  if (!res.ok) {
    throw new Error('API Error')
  }
  
  return res.json()
}

// Hook for getting projects
export function useProjects() {
  const { data, error, isLoading } = useSWR('/api/projects', fetcher)
  
  return {
    projects: data?.projects || [],
    isLoading,
    error,
  }
}

// Hook for getting single project
export function useProject(id: number) {
  const { data, error, isLoading } = useSWR(
    id ? `/api/projects/${id}` : null,
    fetcher
  )
  
  return {
    project: data,
    isLoading,
    error,
  }
}
```

### Use SWR in Components

```typescript
// components/projects-list-swr.tsx
'use client'

import { useProjects } from '@/lib/api-client-swr'

export function ProjectsList() {
  const { projects, isLoading, error } = useProjects()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>
          <h3>{project.title}</h3>
          <p>{project.technologies}</p>
        </div>
      ))}
    </div>
  )
}
```

---

## Authentication Integration

### Backend: Login Endpoint

```python
from fastapi import HTTPException
from datetime import datetime, timedelta
import jwt
import bcrypt

SECRET_KEY = os.getenv("JWT_SECRET")
ALGORITHM = "HS256"

@app.post("/api/auth/login")
async def login(username: str, password: str):
    # Verify credentials
    user = db.query(User).filter(User.username == username).first()
    
    if not user or not bcrypt.checkpw(password.encode(), user.password_hash.encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create JWT token
    token = jwt.encode(
        {"sub": user.id, "exp": datetime.utcnow() + timedelta(hours=24)},
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    
    return {"access_token": token, "token_type": "bearer"}
```

### Frontend: Login Hook

```typescript
// hooks/use-auth.ts
import { useState } from 'react'
import { apiCall } from '@/lib/api-client'

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function login(username: string, password: string) {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await apiCall('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      })
      
      // Store token
      localStorage.setItem('token', response.access_token)
      
      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  function logout() {
    localStorage.removeItem('token')
  }

  return { login, logout, isLoading, error }
}
```

### Use in Login Component

```typescript
// components/login-form.tsx
'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'

export function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useAuth()
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    
    try {
      await login(username, password)
      router.push('/dashboard')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
```

---

## Error Handling

### Centralized Error Handler

```typescript
// lib/error-handler.ts
export class APIError extends Error {
  constructor(
    public status: number,
    public message: string,
    public details?: any
  ) {
    super(message)
  }
}

export async function handleAPIError(error: unknown): Promise<never> {
  if (error instanceof APIError) {
    throw error
  }
  
  if (error instanceof TypeError) {
    throw new APIError(0, 'Network error')
  }
  
  throw new APIError(500, 'Unknown error')
}
```

### Backend: Error Response Format

```python
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "message": str(exc),
            "timestamp": datetime.now().isoformat()
        }
    )
```

---

## Real-World Examples

### Example 1: Contact Form

**Backend:**
```python
@app.post("/api/contact")
async def contact(
    name: str,
    email: str,
    message: str,
    db: Session = Depends(get_db)
):
    contact = Contact(name=name, email=email, message=message)
    db.add(contact)
    db.commit()
    
    # Send email notification
    send_email(name, email, message)
    
    return {"status": "success"}
```

**Frontend:**
```typescript
export async function submitContact(
  name: string,
  email: string,
  message: string
) {
  return apiCall('/api/contact', {
    method: 'POST',
    body: JSON.stringify({ name, email, message }),
  })
}
```

### Example 2: Portfolio Projects Filtering

**Backend:**
```python
@app.get("/api/projects")
async def get_projects(
    technology: str = Query(None),
    skip: int = 0,
    limit: int = 10
):
    query = db.query(Project)
    
    if technology:
        query = query.filter(Project.technologies.contains(technology))
    
    projects = query.offset(skip).limit(limit).all()
    return {"projects": projects}
```

**Frontend with SWR:**
```typescript
import useSWR from 'swr'
import { fetcher } from '@/lib/api-client-swr'

export function useProjectsByTech(technology: string | null) {
  const { data, error } = useSWR(
    technology ? `/api/projects?technology=${technology}` : '/api/projects',
    fetcher
  )
  
  return {
    projects: data?.projects || [],
    isLoading: !error && !data,
    error,
  }
}
```

---

## Testing Your Integration

```typescript
// Test script in your browser console
async function testAPI() {
  try {
    // Test GET
    const projects = await fetch('http://localhost:8000/api/projects').then(r => r.json())
    console.log('Projects:', projects)
    
    // Test POST
    const contact = await fetch('http://localhost:8000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test', email: 'test@test.com', message: 'Hi' })
    }).then(r => r.json())
    console.log('Contact:', contact)
  } catch (e) {
    console.error('Error:', e)
  }
}

testAPI()
```

---

## Quick Checklist

- [ ] Environment variables configured
- [ ] API client set up in frontend
- [ ] Basic GET endpoint working
- [ ] POST endpoint working
- [ ] Error handling implemented
- [ ] Authentication (if needed) configured
- [ ] SWR hooks created
- [ ] CORS enabled on backend
- [ ] Tested with real data
- [ ] Production URLs work
