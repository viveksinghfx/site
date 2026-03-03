# Environment Variables Guide

Complete guide to managing secrets and configuration across your project.

## Table of Contents
1. [Understanding Environment Variables](#understanding-environment-variables)
2. [Development Setup](#development-setup)
3. [Production Setup](#production-setup)
4. [Common Variables](#common-variables)
5. [Security Best Practices](#security-best-practices)

---

## Understanding Environment Variables

### What Are They?

Environment variables are secret key-value pairs that hold sensitive information:
- Database credentials
- API keys
- JWT secrets
- Passwords
- URLs

### Why Use Them?

```
❌ BAD: Hardcoding secrets
const DB_PASSWORD = "mypassword123"

✅ GOOD: Using environment variables
const DB_PASSWORD = process.env.DB_PASSWORD
```

---

## Development Setup

### Frontend (.env.local)

**File: `/vercel/share/v0-project/.env.local`**

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Why NEXT_PUBLIC?**
- `NEXT_PUBLIC_` prefix = visible in browser (safe for public values)
- No prefix = secret, only on server

### Backend (.env)

**File: `backend/.env`**

```env
# Database
DATABASE_URL=postgresql://portfolio_user:password@localhost/viveksingh_portfolio

# API Config
DEBUG=true
HOST=0.0.0.0
PORT=8000

# Security
JWT_SECRET=your_development_secret_key_change_this
JWT_EXPIRATION=7200

# CORS
CORS_ORIGINS=["http://localhost:3000"]

# Email (optional)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
EMAIL_ADDRESS=your.email@gmail.com
EMAIL_PASSWORD=your_app_password

# Environment
ENVIRONMENT=development
```

### How to Use in Code

**Frontend (Next.js):**
```javascript
// pages/api/config.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchData() {
  const response = await fetch(`${API_URL}/data`)
  return response.json()
}
```

**Backend (Python/FastAPI):**
```python
import os
from dotenv import load_dotenv

load_dotenv()  # Load from .env file

DATABASE_URL = os.getenv("DATABASE_URL")
JWT_SECRET = os.getenv("JWT_SECRET")
DEBUG = os.getenv("DEBUG", "false").lower() == "true"

print(f"Database: {DATABASE_URL}")
print(f"Debug Mode: {DEBUG}")
```

---

## Production Setup

### Vercel (Frontend)

1. **Dashboard** → Your Project
2. **Settings** → **Environment Variables**
3. Click **Add New**
4. Add each variable:

```
Name: NEXT_PUBLIC_API_URL
Value: https://api.viveksingh.tech
Environments: Production, Preview, Development
```

**Production Variables:**
```env
NEXT_PUBLIC_API_URL=https://api.viveksingh.tech
NEXT_PUBLIC_SITE_URL=https://viveksingh.tech
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Railway (Backend)

1. **Railway Dashboard** → Your Service
2. **Variables** tab
3. Click **Raw Editor**
4. Paste all variables:

```env
DATABASE_URL=postgresql://user:pass@host:port/dbname
JWT_SECRET=use_a_strong_random_string_here
JWT_EXPIRATION=3600
DEBUG=false
HOST=0.0.0.0
PORT=8000
CORS_ORIGINS=["https://viveksingh.tech"]
ENVIRONMENT=production
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
EMAIL_ADDRESS=your.email@gmail.com
EMAIL_PASSWORD=app_specific_password
```

---

## Common Variables Reference

### Database Variables

```env
# PostgreSQL
DATABASE_URL=postgresql://username:password@host:port/database

# MongoDB
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/database

# SQLite (development only)
DATABASE_URL=sqlite:///./test.db
```

### Authentication Variables

```env
# JWT
JWT_SECRET=your_secret_key_minimum_32_characters_long
JWT_EXPIRATION=3600  # seconds

# OAuth (if using)
GITHUB_CLIENT_ID=xxxx
GITHUB_CLIENT_SECRET=xxxx

# API Keys
API_KEY=your_api_key_here
```

### Service Integration Variables

```env
# Email
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
EMAIL_ADDRESS=your.email@gmail.com
EMAIL_PASSWORD=app_password

# Storage
AWS_ACCESS_KEY=xxxx
AWS_SECRET_KEY=xxxx
S3_BUCKET=your-bucket

# LLM APIs (if using)
OPENAI_API_KEY=sk-xxxx
GROQ_API_KEY=xxxx
```

### URL Variables

```env
# Frontend (Next.js)
NEXT_PUBLIC_API_URL=http://localhost:8000  # dev
NEXT_PUBLIC_API_URL=https://api.viveksingh.tech  # prod

# Backend
FRONTEND_URL=http://localhost:3000  # dev
FRONTEND_URL=https://viveksingh.tech  # prod
```

---

## Security Best Practices

### ✅ DO

```
✅ Use strong random strings for secrets
   JWT_SECRET=$(openssl rand -hex 32)

✅ Rotate secrets periodically (every 3 months)

✅ Use different values for dev/prod

✅ Store securely in platform (Vercel, Railway)

✅ Never commit .env files
   Add to .gitignore:
   .env
   .env.local
   .env.*.local
```

### ❌ DON'T

```
❌ Hardcode secrets in code
❌ Commit .env files to Git
❌ Share secrets over chat/email
❌ Use same secret for dev and prod
❌ Use simple/guessable secrets
❌ Log sensitive information
```

### Generate Secure Secrets

```bash
# Terminal: Generate random string
openssl rand -hex 32
# Example output: 7f4a9c2d8e1b5f3a6c9e2d4b7f8a1c3d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a

# Python
import secrets
secrets.token_urlsafe(32)
```

### Verify Variables Are Set

**Backend (Python):**
```python
import os
from dotenv import load_dotenv

load_dotenv()

required_vars = [
    "DATABASE_URL",
    "JWT_SECRET",
    "CORS_ORIGINS"
]

for var in required_vars:
    if not os.getenv(var):
        raise ValueError(f"Missing required variable: {var}")

print("✅ All required variables are set")
```

**Frontend (Next.js):**
```javascript
// pages/_app.tsx
const requiredVars = [
  'NEXT_PUBLIC_API_URL'
]

requiredVars.forEach(variable => {
  if (!process.env[variable]) {
    throw new Error(`Missing environment variable: ${variable}`)
  }
})
```

---

## Troubleshooting

### Issue: Variables not loading in development

**Solution:**
```bash
# Make sure .env file exists in root directory
ls -la .env

# Restart dev server
# Frontend: npm run dev
# Backend: uvicorn main:app --reload
```

### Issue: Frontend can't access API

**Solution:**
```javascript
// Check if NEXT_PUBLIC_API_URL is set
console.log(process.env.NEXT_PUBLIC_API_URL)

// Should print: http://localhost:8000 (dev) or https://api.viveksingh.tech (prod)
```

### Issue: CORS errors from backend

**Solution:**
```python
# Backend: Add frontend URL to CORS
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "").split(",")

print(f"Allowed origins: {CORS_ORIGINS}")
```

### Issue: Secrets leaked to GitHub

**Solution (immediate action):**
```bash
# 1. Remove file from git history
git rm --cached .env
git commit -m "Remove .env file"

# 2. Regenerate all secrets immediately

# 3. Invalidate old secrets
# - Rotate database password
# - Regenerate API keys
# - Update JWT secret
```

---

## Quick Checklist

Development:
- [ ] Created `.env.local` in frontend root
- [ ] Created `.env` in backend root
- [ ] Added both to `.gitignore`
- [ ] Variables load without errors
- [ ] Frontend connects to backend successfully

Production:
- [ ] Variables set in Vercel dashboard
- [ ] Variables set in Railway dashboard
- [ ] Used different secrets than development
- [ ] Secrets are strong (32+ characters)
- [ ] CORS origins updated for production URL
- [ ] Database connection verified
- [ ] All services authenticated and working

---

## Example .gitignore Entry

```
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Dependencies
node_modules/
__pycache__/
*.pyc

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```
