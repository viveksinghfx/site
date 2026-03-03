# Vivek Singh Portfolio — Complete Stack

## What's in this zip

### Frontend (drop into your Next.js project root)
| File | What changed |
|---|---|
| `components/hero-section.tsx` | New "dots connected" story, Live Demos CTA |
| `components/procedural-to-agentic.tsx` | NEW — 6-connection FX→AI comparison section |
| `components/metrics-banner.tsx` | NEW — animated stats: 10M+ docs, 99.2%, 1000+/day |
| `components/skills-section.tsx` | Pipeline Engineering card highlighted orange |
| `components/featured-projects.tsx` | Finance Agent as featured project |
| `components/contact-cta.tsx` | Two-column layout with live contact form |
| `app/page.tsx` | Adds MetricsBanner + ProceduralToAgentic sections |
| `app/demos/page.tsx` | 4 real LangGraph agents (Finance replaces Project Generator) |
| `.env.local.example` | Add NEXT_PUBLIC_API_URL |

### Backend (new folder — run separately with Docker)
FastAPI + PostgreSQL + 4 LangGraph agents

## Quick Start

### Frontend
```bash
# Copy files over your existing project
pnpm add jspdf         # only new dependency
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1" >> .env.local
pnpm dev
```

### Backend
```bash
cd backend
cp .env.example .env   # fill in POSTGRES_PASSWORD, SECRET_KEY, OPENAI_API_KEY
docker compose up -d
docker compose exec backend python -c "
from app.db.session import SessionLocal
from app.db.base import Base
from app.db.session import engine
Base.metadata.create_all(bind=engine)
print('Tables created')
"
# Create admin (one time)
curl -X POST http://localhost:8000/api/v1/auth/register-first-admin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@viveksingh.tech","password":"your_password"}'
```

## The 4 LangGraph Agents
| Agent ID | Graph Topology | What it does |
|---|---|---|
| `portfolio-chat` | ReAct loop | Answers questions about Vivek's projects/skills using KB tool |
| `resume-reviewer` | Linear pipeline | ATS scan → impact analysis → review |
| `research-agent` | Autonomous loop (max 6 steps) | Decompose → web search → synthesize |
| `finance-agent` | ReAct loop (5 tools) | Stock prices US+India, portfolio analysis, news, education |
