# Database Setup Guide for Python Backend

Complete guide to set up PostgreSQL/SQLite with your Python FastAPI backend.

## Table of Contents
1. [Installation](#installation)
2. [PostgreSQL Setup](#postgresql-setup)
3. [SQLAlchemy Configuration](#sqlalchemy-configuration)
4. [Database Models](#database-models)
5. [Migrations with Alembic](#migrations-with-alembic)
6. [Connection String](#connection-string)
7. [Testing](#testing)

---

## Installation

### Step 1: Install Required Packages

```bash
pip install sqlalchemy psycopg2-binary alembic python-dotenv
```

**Package Explanations:**
- `sqlalchemy` - ORM for database operations
- `psycopg2-binary` - PostgreSQL adapter
- `alembic` - Database migrations tool
- `python-dotenv` - Environment variables management

### Step 2: PostgreSQL Installation

**On Windows:**
- Download from https://www.postgresql.org/download/windows/
- Install and remember your password
- Add PostgreSQL to PATH

**On macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**On Linux (Ubuntu):**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

---

## PostgreSQL Setup

### Step 1: Create Database and User

```bash
# Enter PostgreSQL CLI
psql -U postgres

# Create database
CREATE DATABASE viveksingh_portfolio;

# Create user
CREATE USER portfolio_user WITH PASSWORD 'your_secure_password';

# Grant privileges
ALTER ROLE portfolio_user SET client_encoding TO 'utf8';
ALTER ROLE portfolio_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE portfolio_user SET default_transaction_deferrable TO on;
ALTER ROLE portfolio_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE viveksingh_portfolio TO portfolio_user;

# Exit
\q
```

### Step 2: Create Tables (Before Using ORM)

```bash
# Connect to your database
psql -U portfolio_user -d viveksingh_portfolio

# Create a simple table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# Exit
\q
```

---

## SQLAlchemy Configuration

### Step 1: Create Database Connection File

**File: `backend/database.py`**

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# Database URL
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://portfolio_user:password@localhost/viveksingh_portfolio"
)

# Create engine
engine = create_engine(
    DATABASE_URL,
    echo=True,  # Set to False in production
    pool_pre_ping=True,  # Verify connection before using
    pool_recycle=3600  # Recycle connections every hour
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

---

## Database Models

### Step 1: Create Models File

**File: `backend/models.py`**

```python
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(80), unique=True, index=True, nullable=False)
    email = Column(String(120), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(120))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<User {self.username}>"

class Portfolio(Base):
    __tablename__ = "portfolios"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    technologies = Column(String(500))
    github_link = Column(String(255))
    live_link = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Certificate(Base):
    __tablename__ = "certificates"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    title = Column(String(200), nullable=False)
    issuer = Column(String(200))
    issue_date = Column(String(20))
    credential_url = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
```

### Step 2: Create All Tables

```python
# File: backend/init_db.py
from database import engine, Base
from models import User, Portfolio, Certificate

# Create all tables
Base.metadata.create_all(bind=engine)
print("✅ All tables created successfully!")
```

Run it:
```bash
python backend/init_db.py
```

---

## Migrations with Alembic

### Step 1: Initialize Alembic

```bash
cd backend
alembic init migrations
```

### Step 2: Configure Alembic

**File: `backend/alembic.ini`** - Change this line:

```ini
sqlalchemy.url = postgresql://portfolio_user:password@localhost/viveksingh_portfolio
```

**File: `backend/migrations/env.py`** - Modify to use your models:

```python
from models import Base

# Change this line in env.py:
target_metadata = Base.metadata
```

### Step 3: Create Migration

```bash
# Auto-generate migration
alembic revision --autogenerate -m "Add initial schema"

# Apply migration
alembic upgrade head

# Downgrade (undo last migration)
alembic downgrade -1
```

---

## Connection String

### Format: `postgresql://username:password@host:port/database`

**Development:**
```
postgresql://portfolio_user:your_password@localhost:5432/viveksingh_portfolio
```

**Production (Example with Railway):**
```
postgresql://user:pass@journey.proxy.rlwy.net:12345/railway
```

**SQLite (Alternative for Development):**
```
sqlite:///./test.db
```

### Store in `.env` File:

```env
DATABASE_URL=postgresql://portfolio_user:your_password@localhost/viveksingh_portfolio
```

---

## Testing

### Test Connection Script

**File: `backend/test_db.py`**

```python
from database import SessionLocal, engine
from models import User, Portfolio, Certificate
from sqlalchemy import inspect

def test_connection():
    """Test database connection"""
    try:
        # Test connection
        with engine.connect() as connection:
            result = connection.execute("SELECT 1")
            print("✅ Database connection successful!")
    except Exception as e:
        print(f"❌ Connection failed: {e}")

def test_tables():
    """Check if tables exist"""
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    
    required_tables = ['users', 'portfolios', 'certificates']
    
    for table in required_tables:
        if table in tables:
            print(f"✅ Table '{table}' exists")
        else:
            print(f"❌ Table '{table}' missing")

def test_insert():
    """Test inserting data"""
    db = SessionLocal()
    try:
        new_user = User(
            username="viveksingh",
            email="ace.vivek2@gmail.com",
            password_hash="hashed_password_here",
            full_name="Vivek Singh"
        )
        db.add(new_user)
        db.commit()
        print("✅ Insert test successful!")
    except Exception as e:
        print(f"❌ Insert test failed: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    test_connection()
    test_tables()
    # Uncomment to test insert
    # test_insert()
```

Run it:
```bash
python backend/test_db.py
```

---

## Common Issues & Solutions

### Issue 1: "connection refused"
**Solution:** PostgreSQL service not running
```bash
# macOS
brew services start postgresql@15

# Linux
sudo service postgresql start

# Windows: Check Services > PostgreSQL is running
```

### Issue 2: "password authentication failed"
**Solution:** Wrong credentials
```bash
# Reset password
psql -U postgres
ALTER USER portfolio_user WITH PASSWORD 'new_password';
\q
```

### Issue 3: "database does not exist"
**Solution:** Create database first
```bash
psql -U postgres
CREATE DATABASE viveksingh_portfolio;
\q
```

---

## Quick Checklist

- [ ] PostgreSQL installed and running
- [ ] Database `viveksingh_portfolio` created
- [ ] User `portfolio_user` created with password
- [ ] `database.py` configured with correct URL
- [ ] Models defined in `models.py`
- [ ] `init_db.py` ran successfully
- [ ] Connection test passed
- [ ] Ready to build API endpoints
