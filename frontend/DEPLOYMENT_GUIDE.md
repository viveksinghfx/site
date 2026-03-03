# Complete Deployment Guide

Deploy your Next.js frontend and Python backend to production.

## Table of Contents
1. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
2. [Backend Deployment (Railway)](#backend-deployment-railway)
3. [Alternative Backend Options](#alternative-backend-options)
4. [Domain Setup](#domain-setup)
5. [Environment Variables in Production](#environment-variables-in-production)
6. [Monitoring & Logs](#monitoring--logs)

---

## Frontend Deployment (Vercel)

### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/viveksinghfx/portfolio.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repository
4. Click "Import"
5. Framework: Select "Next.js"
6. Click "Deploy"

**That's it!** Your Next.js app is live. Vercel automatically deploys on every `git push` to main.

### Step 3: Configure Environment Variables

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add your variables:

```
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

4. Click "Save"
5. Redeploy project

### Step 4: Custom Domain (Optional)

1. In Vercel: "Settings" → "Domains"
2. Enter your domain (e.g., viveksingh.tech)
3. Add DNS records from your domain registrar
4. Verify and it's live!

---

## Backend Deployment (Railway)

Railway is the easiest way to deploy Python apps. Free tier includes $5/month credits.

### Step 1: Push Backend Code to GitHub

```bash
# Create a new repository for backend
git init
git add .
git commit -m "Initial backend commit"
git branch -M main
git remote add origin https://github.com/viveksinghfx/portfolio-backend.git
git push -u origin main
```

### Step 2: Prepare Backend for Deployment

**File: `requirements.txt`**

```
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
python-dotenv==1.0.0
pydantic==2.5.0
pydantic-settings==2.1.0
fastapi-cors==0.0.6
```

Generate it:
```bash
pip freeze > requirements.txt
```

**File: `Procfile`** (for Railway)

```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

**File: `.gitignore`**

```
__pycache__/
*.py[cod]
*$py.class
*.so
.env
.env.local
venv/
env/
.DS_Store
```

### Step 3: Deploy to Railway

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Select your backend repository
5. Click "Deploy"

Railway automatically detects and runs `Procfile`.

### Step 4: Configure Database on Railway

1. In Railway dashboard, click "New"
2. Select "PostgreSQL"
3. This creates a PostgreSQL instance
4. Click on PostgreSQL service
5. Go to "Variables" tab
6. Copy the `DATABASE_URL`

### Step 5: Set Backend Environment Variables

1. In your main service (Python app):
2. Go to "Variables" tab
3. Click "Raw Editor"
4. Paste:

```
DATABASE_URL=postgresql://...  # From PostgreSQL service
CORS_ORIGINS=["https://your-frontend.vercel.app", "http://localhost:3000"]
JWT_SECRET=your_super_secret_key_change_this
```

4. Click "Save"

### Step 6: Get Your Backend URL

1. Go to "Settings" in your service
2. Under "Public Networking", click "Generate Domain"
3. You'll get something like: `https://api-production-xyz.up.railway.app`

---

## Alternative Backend Options

### Option 1: Render (Similar to Railway)

```bash
# Deployment command
pip install -r requirements.txt
gunicorn -w 4 -b 0.0.0.0:$PORT main:app
```

### Option 2: Heroku (Paid, but reliable)

```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create your-app-name

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Option 3: AWS (EC2 + RDS)

```bash
# Setup EC2 instance
# Install Python, PostgreSQL client
# Use systemd service to keep app running
```

---

## Domain Setup

### Connect Your Domain to Vercel Frontend

1. Buy domain from GoDaddy, Namecheap, etc.
2. Go to Vercel: Settings → Domains
3. Add your domain
4. Vercel shows DNS records
5. Add those records to your domain registrar
6. Wait 24-48 hours for DNS propagation

### Setup Subdomain for Backend API

Example: `api.viveksingh.tech` pointing to Railway

1. In your domain registrar, create CNAME record:
   - **Name:** `api`
   - **Value:** `your-railway-url.up.railway.app`

2. In Railway: Settings → Custom Domain → Enter `api.viveksingh.tech`

---

## Environment Variables in Production

### Frontend (.env.production)

```env
NEXT_PUBLIC_API_URL=https://api.viveksingh.tech
NEXT_PUBLIC_SITE_URL=https://viveksingh.tech
```

### Backend (.env.production)

```env
DATABASE_URL=postgresql://user:password@host:port/dbname
CORS_ORIGINS=["https://viveksingh.tech", "https://www.viveksingh.tech"]
JWT_SECRET=your_super_secret_key_min_32_chars
ENVIRONMENT=production
DEBUG=false
```

### Security Rules

- ❌ Never commit `.env` files
- ❌ Never share API keys publicly
- ✅ Use environment variables for all secrets
- ✅ Rotate keys every 3 months
- ✅ Use different keys for dev/prod

---

## Monitoring & Logs

### View Frontend Logs (Vercel)

1. Vercel Dashboard → Your Project
2. Click "Deployments"
3. Select deployment
4. Click "Logs"

### View Backend Logs (Railway)

1. Railway Dashboard
2. Click your service
3. Click "Logs" tab
4. Real-time logs appear

### Common Issues

#### Frontend: Build Failed
```
Solution: Check "Settings" → "Build & Development Settings"
- Framework: Next.js
- Build Command: npm run build
- Output Directory: .next
```

#### Backend: Application crashed
```
Solution: Check logs for errors
1. Review environment variables
2. Check database connection
3. Verify PORT is set to 0.0.0.0
```

#### CORS Errors
```
Backend fix:
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

## Production Checklist

Frontend:
- [ ] Code pushed to GitHub
- [ ] Deployed on Vercel
- [ ] Environment variables set
- [ ] Domain connected
- [ ] HTTPS enabled (automatic)
- [ ] Build tests passing

Backend:
- [ ] Code pushed to GitHub
- [ ] Deployed on Railway/Render
- [ ] PostgreSQL database running
- [ ] Environment variables set
- [ ] Database migrations applied
- [ ] API endpoints tested
- [ ] CORS configured correctly
- [ ] Error logging enabled

---

## After Deployment

### Test Everything

```bash
# Test frontend
curl https://viveksingh.tech

# Test API
curl https://api.viveksingh.tech/health

# Test authentication
curl -X POST https://api.viveksingh.tech/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}'
```

### Setup Monitoring

1. Vercel automatically monitors
2. Railway provides metrics
3. Setup email alerts for failures
4. Monitor response times
5. Check error rates weekly

### Keep It Updated

- Update dependencies monthly
- Monitor security alerts
- Test new features on staging
- Backup database regularly
- Review logs for errors
