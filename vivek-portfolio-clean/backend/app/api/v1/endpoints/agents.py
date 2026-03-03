from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.agents import run_portfolio_chat, run_resume_reviewer, run_research_agent, run_finance_agent

router = APIRouter()

AGENT_MAP = {
    "portfolio-chat":  run_portfolio_chat,
    "resume-reviewer": run_resume_reviewer,
    "research-agent":  run_research_agent,
    "finance-agent":   run_finance_agent,
}

class ChatMessage(BaseModel):
    role: str; content: str

class AgentChatRequest(BaseModel):
    agent_id: str; message: str; history: Optional[List[ChatMessage]] = []

class AgentChatResponse(BaseModel):
    response: str; agent_id: str

@router.post("/chat", response_model=AgentChatResponse)
async def agent_chat(req: AgentChatRequest):
    fn = AGENT_MAP.get(req.agent_id)
    if not fn: raise HTTPException(400, f"Unknown agent. Valid: {list(AGENT_MAP.keys())}")
    try:
        history = [{"role": m.role, "content": m.content} for m in (req.history or [])]
        response = await fn(req.message, history)
        return AgentChatResponse(response=response, agent_id=req.agent_id)
    except Exception as e:
        raise HTTPException(500, f"Agent error: {str(e)}")

@router.get("/list")
def list_agents():
    return {"agents": [
        {"id": "portfolio-chat",  "name": "Chat with My Portfolio"},
        {"id": "resume-reviewer", "name": "Resume Reviewer Agent"},
        {"id": "research-agent",  "name": "Research AI Agent"},
        {"id": "finance-agent",   "name": "Finance AI Agent"},
    ]}
