# Error Handling Guide

Comprehensive error handling patterns for frontend and backend.

## Table of Contents
1. [Backend Error Handling](#backend-error-handling)
2. [Frontend Error Handling](#frontend-error-handling)
3. [Error Types & Status Codes](#error-types--status-codes)
4. [Logging & Monitoring](#logging--monitoring)
5. [User-Friendly Error Messages](#user-friendly-error-messages)

---

## Backend Error Handling

### Setup Custom Exceptions

**File: `backend/exceptions.py`**

```python
from fastapi import HTTPException, status
from typing import Optional, Any

class APIException(HTTPException):
    """Base API exception"""
    def __init__(
        self,
        detail: str,
        status_code: int = status.HTTP_400_BAD_REQUEST,
        error_code: str = "GENERAL_ERROR",
        data: Optional[dict] = None
    ):
        super().__init__(status_code=status_code, detail=detail)
        self.error_code = error_code
        self.data = data or {}

class ValidationError(APIException):
    def __init__(self, detail: str, data: Optional[dict] = None):
        super().__init__(
            detail=detail,
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            error_code="VALIDATION_ERROR",
            data=data
        )

class AuthenticationError(APIException):
    def __init__(self, detail: str = "Invalid credentials"):
        super().__init__(
            detail=detail,
            status_code=status.HTTP_401_UNAUTHORIZED,
            error_code="AUTH_ERROR"
        )

class AuthorizationError(APIException):
    def __init__(self, detail: str = "Insufficient permissions"):
        super().__init__(
            detail=detail,
            status_code=status.HTTP_403_FORBIDDEN,
            error_code="PERMISSION_ERROR"
        )

class NotFoundError(APIException):
    def __init__(self, resource: str = "Resource"):
        super().__init__(
            detail=f"{resource} not found",
            status_code=status.HTTP_404_NOT_FOUND,
            error_code="NOT_FOUND"
        )

class ConflictError(APIException):
    def __init__(self, detail: str):
        super().__init__(
            detail=detail,
            status_code=status.HTTP_409_CONFLICT,
            error_code="CONFLICT"
        )

class RateLimitError(APIException):
    def __init__(self):
        super().__init__(
            detail="Too many requests",
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            error_code="RATE_LIMIT"
        )
```

### Global Exception Handler

**File: `backend/main.py`**

```python
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
import logging
from datetime import datetime
from exceptions import APIException

app = FastAPI()
logger = logging.getLogger(__name__)

@app.exception_handler(APIException)
async def api_exception_handler(request, exc: APIException):
    """Handle custom API exceptions"""
    logger.warning(
        f"API Error: {exc.error_code} - {exc.detail}",
        extra={
            "error_code": exc.error_code,
            "status_code": exc.status_code,
            "path": request.url.path,
        }
    )
    
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.error_code,
            "message": exc.detail,
            "data": exc.data,
            "timestamp": datetime.utcnow().isoformat()
        }
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc: RequestValidationError):
    """Handle Pydantic validation errors"""
    errors = {}
    for error in exc.errors():
        field = ".".join(str(x) for x in error["loc"][1:])
        errors[field] = error["msg"]
    
    logger.warning(f"Validation error: {errors}")
    
    return JSONResponse(
        status_code=422,
        content={
            "error": "VALIDATION_ERROR",
            "message": "Validation failed",
            "errors": errors,
            "timestamp": datetime.utcnow().isoformat()
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc: Exception):
    """Handle unexpected errors"""
    logger.error(
        f"Unexpected error: {str(exc)}",
        exc_info=True,
        extra={"path": request.url.path}
    )
    
    return JSONResponse(
        status_code=500,
        content={
            "error": "INTERNAL_ERROR",
            "message": "An unexpected error occurred",
            "timestamp": datetime.utcnow().isoformat()
        }
    )
```

### Using Custom Exceptions in Routes

```python
from fastapi import APIRouter
from exceptions import (
    AuthenticationError,
    NotFoundError,
    ConflictError,
    ValidationError
)

router = APIRouter()

@router.post("/login")
async def login(username: str, password: str):
    """Login endpoint with error handling"""
    if not username or not password:
        raise ValidationError(
            "Username and password required",
            data={"fields": ["username", "password"]}
        )
    
    user = db.query(User).filter(User.username == username).first()
    
    if not user or not verify_password(password, user.password_hash):
        raise AuthenticationError("Invalid credentials")
    
    return {"token": create_token(user.id)}

@router.get("/projects/{project_id}")
async def get_project(project_id: int):
    """Get project with error handling"""
    project = db.query(Project).filter(Project.id == project_id).first()
    
    if not project:
        raise NotFoundError("Project")
    
    return project

@router.post("/register")
async def register(username: str, email: str):
    """Register with conflict handling"""
    existing = db.query(User).filter(
        (User.username == username) | (User.email == email)
    ).first()
    
    if existing:
        raise ConflictError("Username or email already exists")
    
    # Create user...
    return {"status": "success"}
```

---

## Frontend Error Handling

### Error Boundary Component

**File: `components/error-boundary.tsx`**

```typescript
'use client'

import React from 'react'
import { logger } from '@/lib/logger'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error('Error Boundary caught:', {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-muted-foreground mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.href = '/'
              }}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              Go Home
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
```

### API Error Handler

**File: `lib/api-error.ts`**

```typescript
export class APIError extends Error {
  constructor(
    public status: number,
    message: string,
    public code: string = 'UNKNOWN_ERROR',
    public data?: any
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export async function handleAPIResponse<T>(
  response: Response
): Promise<T> {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    
    throw new APIError(
      response.status,
      data.message || response.statusText,
      data.error || 'API_ERROR',
      data.errors || {}
    )
  }

  return response.json()
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof APIError) {
    return error.message
  }
  
  if (error instanceof TypeError) {
    return 'Network error. Please check your connection.'
  }
  
  return 'An unexpected error occurred'
}
```

### API Client with Error Handling

```typescript
// lib/api-client.ts
import { APIError, handleAPIResponse, getErrorMessage } from './api-error'

export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
      {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      }
    )

    return await handleAPIResponse<T>(response)
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }
    
    throw new APIError(
      0,
      getErrorMessage(error),
      'NETWORK_ERROR'
    )
  }
}
```

### Form Error Handling

```typescript
'use client'

import { useState } from 'react'
import { APIError } from '@/lib/api-error'

interface FormErrors {
  [key: string]: string
}

export function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setGeneralError(null)

    try {
      await apiCall('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
      })
      
      // Success
      setFormData({ name: '', email: '', message: '' })
      // Show success toast
    } catch (error) {
      if (error instanceof APIError) {
        // Handle validation errors
        if (error.status === 422 && error.data?.errors) {
          setErrors(error.data.errors)
        } else {
          // Handle general error
          setGeneralError(error.message)
        }
      } else {
        setGeneralError('An unexpected error occurred')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {generalError && (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
          {generalError}
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className={errors.name ? 'border-red-500' : ''}
          placeholder="Name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* More fields... */}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
```

---

## Error Types & Status Codes

### HTTP Status Codes

```
200 OK              - Request successful
201 Created         - Resource created
204 No Content      - Success, no response body
400 Bad Request     - Invalid request
401 Unauthorized    - Authentication required
403 Forbidden       - Permission denied
404 Not Found       - Resource not found
409 Conflict        - Resource already exists
422 Unprocessable   - Validation failed
429 Too Many        - Rate limited
500 Internal Error  - Server error
503 Unavailable     - Service down
```

### Backend Error Response Format

```json
{
  "error": "VALIDATION_ERROR",
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters"
  },
  "timestamp": "2024-03-03T10:30:00Z"
}
```

### Frontend Error Handling Map

```typescript
const errorMessages: Record<string, string> = {
  'VALIDATION_ERROR': 'Please check your input',
  'AUTH_ERROR': 'Invalid credentials',
  'PERMISSION_ERROR': 'You do not have permission',
  'NOT_FOUND': 'Resource not found',
  'CONFLICT': 'Resource already exists',
  'RATE_LIMIT': 'Too many requests. Please try again later',
  'INTERNAL_ERROR': 'Server error. Please try again',
  'NETWORK_ERROR': 'Network connection failed',
}

function getErrorMessage(code: string): string {
  return errorMessages[code] || 'An error occurred'
}
```

---

## Logging & Monitoring

### Backend Logging

**File: `backend/logger.py`**

```python
import logging
import json
from datetime import datetime

class JSONFormatter(logging.Formatter):
    def format(self, record):
        log_obj = {
            'timestamp': datetime.utcnow().isoformat(),
            'level': record.levelname,
            'message': record.getMessage(),
            'logger': record.name,
            'module': record.module,
        }
        
        if record.exc_info:
            log_obj['exception'] = self.formatException(record.exc_info)
        
        if hasattr(record, 'extra'):
            log_obj.update(record.__dict__.get('extra', {}))
        
        return json.dumps(log_obj)

# Setup logging
handler = logging.StreamHandler()
handler.setFormatter(JSONFormatter())

logger = logging.getLogger(__name__)
logger.addHandler(handler)
logger.setLevel(logging.INFO)

# Usage
logger.error('Error occurred', extra={'user_id': 123, 'action': 'login'})
```

### Frontend Logging

**File: `lib/logger.ts`**

```typescript
interface LogContext {
  [key: string]: any
}

const isDevelopment = process.env.NODE_ENV === 'development'

export const logger = {
  info(message: string, context?: LogContext) {
    if (isDevelopment) console.log(`[INFO] ${message}`, context)
    // Send to server in production
  },
  
  warn(message: string, context?: LogContext) {
    if (isDevelopment) console.warn(`[WARN] ${message}`, context)
  },
  
  error(message: string, context?: LogContext) {
    console.error(`[ERROR] ${message}`, context)
    
    // Send to monitoring service
    if (!isDevelopment) {
      fetch('/api/logs', {
        method: 'POST',
        body: JSON.stringify({
          level: 'error',
          message,
          context,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      }).catch(() => {
        // Silently fail if logging fails
      })
    }
  },
}
```

---

## User-Friendly Error Messages

### Error Message Translation

```typescript
// lib/error-messages.ts
export const userFriendlyMessages: Record<string, string> = {
  'VALIDATION_ERROR': 'Please check your information and try again',
  'AUTH_ERROR': 'Username or password is incorrect',
  'EMAIL_TAKEN': 'This email is already registered',
  'USER_NOT_FOUND': 'User does not exist',
  'PERMISSION_ERROR': 'You don\'t have access to this',
  'NOT_FOUND': 'The page you\'re looking for doesn\'t exist',
  'NETWORK_ERROR': 'Connection problem. Please check your internet',
  'TIMEOUT': 'Request took too long. Please try again',
  'SERVER_ERROR': 'Something went wrong on our end. We\'re working on it',
}

export function getErrorMessage(error: APIError): string {
  return userFriendlyMessages[error.code] || error.message
}
```

### Display Error Toast

```typescript
import { useToast } from '@/hooks/use-toast'
import { APIError } from '@/lib/api-error'

export function useErrorHandler() {
  const { toast } = useToast()

  return function handleError(error: unknown) {
    if (error instanceof APIError) {
      toast({
        title: 'Error',
        description: getErrorMessage(error),
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    }
  }
}
```

---

## Checklist

Backend:
- [ ] Custom exceptions defined
- [ ] Global exception handler configured
- [ ] Validation error handling implemented
- [ ] Logging configured
- [ ] Error response format consistent
- [ ] Sensitive data not exposed in errors

Frontend:
- [ ] Error Boundary component created
- [ ] API error handler implemented
- [ ] Form error handling working
- [ ] User-friendly error messages
- [ ] Error logging to server
- [ ] Loading states handled
- [ ] Retry logic for failed requests
