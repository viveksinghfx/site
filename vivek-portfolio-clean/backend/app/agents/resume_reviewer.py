from __future__ import annotations
import re
from typing import Annotated, TypedDict
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langgraph.graph import END, StateGraph
from langgraph.graph.message import add_messages

AI_KEYWORDS = ["python","machine learning","llm","langchain","docker","kubernetes","aws","fastapi",
    "sql","postgresql","redis","git","mlops","rag","vector","transformer","nlp","pytorch","tensorflow"]
WEAK_VERBS = ["worked on","helped with","was responsible for","assisted","participated in"]

@tool
def ats_scan(resume_text: str) -> str:
    """Scan resume for ATS keywords relevant to AI/ML roles."""
    low = resume_text.lower()
    found = [k for k in AI_KEYWORDS if k in low]
    missing = [k for k in AI_KEYWORDS if k not in low]
    score = int(len(found)/len(AI_KEYWORDS)*100)
    return f"ATS Score: {score}/100\nFound ({len(found)}): {', '.join(found[:12])}\nMissing high-value: {', '.join(missing[:8])}"

@tool
def impact_analysis(resume_text: str) -> str:
    """Analyse impact statements and action verbs in resume bullets."""
    lines = [l.strip() for l in resume_text.split("\n") if len(l.strip()) > 20]
    numbered = [l for l in lines if re.search(r"\d+[%x+]?|\$[\d,]+|[\d,]+\+?", l)]
    weak = [v for v in WEAK_VERBS if v in resume_text.lower()]
    pct = int(len(numbered)/max(len(lines),1)*100)
    return f"Quantified bullets: {len(numbered)}/{len(lines)} ({pct}%)\nWeak verbs found: {', '.join(weak) if weak else 'None — good!'}"

class State(TypedDict):
    messages: Annotated[list, add_messages]
    resume_text: str; ats: str; impact: str

SYSTEM = """You are an expert resume reviewer for AI/ML roles.
Format your review:
## Overall Score (X/10)
## ATS Analysis
## Impact Statements
## Top 3 Improvements (numbered, specific)
Be direct and actionable. Under 280 words."""

def build_graph():
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.2)

    def extract(state):
        last = next((m for m in reversed(state["messages"]) if isinstance(m, HumanMessage)), None)
        return {"resume_text": last.content if last else ""}

    def scan_ats(state):
        if len(state["resume_text"]) < 50: return {"ats": "No resume text detected."}
        return {"ats": ats_scan.invoke({"resume_text": state["resume_text"]})}

    def scan_impact(state):
        if len(state["resume_text"]) < 50: return {"impact": ""}
        return {"impact": impact_analysis.invoke({"resume_text": state["resume_text"]})}

    def review(state):
        context = f"ATS Results:\n{state.get('ats','')}\n\nImpact Results:\n{state.get('impact','')}\n\nResume:\n{state['resume_text'][:2000]}"
        resp = llm.invoke([SystemMessage(content=SYSTEM), HumanMessage(content=context)])
        return {"messages": [resp]}

    def route(state): return "impact" if len(state.get("resume_text","")) >= 50 else "review"

    g = StateGraph(State)
    g.add_node("extract", extract); g.add_node("ats", scan_ats)
    g.add_node("impact", scan_impact); g.add_node("review", review)
    g.set_entry_point("extract")
    g.add_edge("extract", "ats")
    g.add_conditional_edges("ats", route, {"impact": "impact", "review": "review"})
    g.add_edge("impact", "review"); g.add_edge("review", END)
    return g.compile()

graph = build_graph()

async def run_resume_reviewer(message: str, history: list[dict]) -> str:
    msgs = [HumanMessage(content=h["content"]) if h["role"]=="user" else AIMessage(content=h["content"]) for h in history]
    msgs.append(HumanMessage(content=message))
    result = await graph.ainvoke({"messages": msgs, "resume_text": "", "ats": "", "impact": ""})
    return result["messages"][-1].content
