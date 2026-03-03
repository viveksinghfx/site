export interface Project {
  slug: string
  title: string
  description: string
  tags: string[]
  span: string
  problem: {
    title: string
    description: string
  }
  solution: {
    title: string
    description: string
  }
  impact: {
    metrics: Array<{ label: string; value: string }>
  }
  architecture: {
    description: string
    components: Array<{
      name: string
      description: string
    }>
  }
  workflow?: {
    title: string
    steps: Array<{
      step: string
      description: string
    }>
  }
  codeSnippets: Array<{
    title: string
    language: string
    code: string
  }>
  challenges: Array<{
    challenge: string
    solution: string
  }>
  githubUrl: string
  liveUrl: string
  highlights: string[]
}

export const projects: Project[] = [
  {
    slug: "rag-knowledge-base",
    title: "RAG-Powered Knowledge Base",
    description:
      "Production-grade RAG system with hybrid search (BM25 + vector), query rewriting, and a reranking pipeline deployed on AWS ECS.",
    tags: ["LangChain", "Pinecone", "AWS ECS", "FastAPI"],
    span: "md:col-span-1",
    githubUrl: "https://github.com/viveksinghfx/rag-knowledge-base",
    liveUrl: "https://rag-demo.example.com",
    highlights: ["10M+ documents indexed", "99.2% retrieval accuracy", "<500ms query time"],
    problem: {
      title: "Document Retrieval Challenges",
      description:
        "Organizations struggle with large document collections lacking intelligent retrieval mechanisms. Traditional keyword-based search fails for semantic queries, leading to poor user experiences and missing relevant information.",
    },
    solution: {
      title: "Hybrid Search RAG System",
      description:
        "Implemented a production-grade RAG pipeline combining BM25 keyword search with vector embeddings. Includes query rewriting for semantic enrichment, multi-stage reranking for accuracy, and caching layer for performance optimization.",
    },
    impact: {
      metrics: [
        { label: "Retrieval Accuracy", value: "99.2%" },
        { label: "Query Latency", value: "<500ms" },
        { label: "Documents Indexed", value: "10M+" },
      ],
    },
    architecture: {
      description:
        "A multi-component system orchestrating document processing, embedding generation, vector storage, and intelligent ranking.",
      components: [
        {
          name: "Document Processor",
          description: "Chunking and preprocessing pipeline for heterogeneous documents",
        },
        {
          name: "Embedding Engine",
          description: "Multi-modal embeddings using sentence transformers",
        },
        {
          name: "Vector Store",
          description: "Pinecone for scalable vector storage with metadata filtering",
        },
        {
          name: "Hybrid Retriever",
          description: "BM25 + vector search fusion with dynamic weighting",
        },
        {
          name: "Reranker",
          description: "Cross-encoder for result reranking and relevance scoring",
        },
      ],
    },
    workflow: {
      title: "Query Processing Pipeline",
      steps: [
        {
          step: "Query Expansion",
          description: "Rewrite user query for semantic richness",
        },
        {
          step: "Dual Retrieval",
          description: "Parallel BM25 and vector search",
        },
        {
          step: "Fusion Ranking",
          description: "Combine and weight results from both searches",
        },
        {
          step: "Reranking",
          description: "Cross-encoder reranking for final relevance",
        },
        {
          step: "Caching",
          description: "Redis cache for frequently accessed queries",
        },
      ],
    },
    codeSnippets: [
      {
        title: "Hybrid Retriever Setup",
        language: "python",
        code: `from langchain.retrievers import BM25Retriever, MultiQueryRetriever
from langchain_pinecone import PineconeVectorStore

# Dual retrieval setup
bm25_retriever = BM25Retriever.from_documents(docs)
vector_store = PineconeVectorStore.from_documents(
    docs, embeddings, index_name="documents"
)

# Ensemble retriever
ensemble = EnsembleRetriever(
    retrievers=[bm25_retriever, vector_store.as_retriever()],
    weights=[0.4, 0.6]
)`,
      },
      {
        title: "Reranker Integration",
        language: "python",
        code: `from langchain.retrievers import ContextualCompressionRetriever
from langchain_cohere import CohereRerank

reranker = ContextualCompressionRetriever(
    base_compressor=CohereRerank(model="rerank-english-v2.0"),
    base_retriever=ensemble
)

# Get top-ranked results
results = reranker.invoke("user query")`,
      },
    ],
    challenges: [
      {
        challenge: "Query Ambiguity",
        solution:
          "Implemented multi-step query expansion using LLM to rephrase user queries before retrieval",
      },
      {
        challenge: "Latency Management",
        solution:
          "Added Redis caching layer and optimized vector search parameters; 90% cache hit rate",
      },
      {
        challenge: "Precision vs Recall",
        solution:
          "Fine-tuned hybrid search weights through A/B testing and deployed adaptive weighting based on query type",
      },
    ],
  },
  {
    slug: "resume-screening-agent",
    title: "Resume Screening Agent",
    description:
      "Agentic workflow that parses resumes, extracts structured data, and scores candidates against job descriptions using chain-of-thought reasoning.",
    tags: ["OpenAI", "Pydantic", "S3", "DynamoDB"],
    span: "md:col-span-1",
    githubUrl: "https://github.com/viveksinghfx/resume-screening",
    liveUrl: "https://resume-screening.example.com",
    highlights: ["95% accuracy", "5-10 seconds per resume", "1000+ daily screenings"],
    problem: {
      title: "Manual Resume Processing",
      description:
        "HR teams manually review thousands of resumes, consuming days of work. Standard keyword matching misses qualified candidates and fails to understand context.",
    },
    solution: {
      title: "AI-Powered Screening Agent",
      description:
        "Built an agentic system that parses resumes, extracts competencies, performs chain-of-thought reasoning against job requirements, and provides detailed candidate scoring.",
    },
    impact: {
      metrics: [
        { label: "Accuracy", value: "95%" },
        { label: "Processing Time", value: "5-10s" },
        { label: "Daily Capacity", value: "1000+" },
      ],
    },
    architecture: {
      description:
        "Agent-based architecture with specialized tools for resume parsing, data extraction, and intelligent scoring.",
      components: [
        {
          name: "Resume Parser",
          description: "Extract text from PDF/DOC files with layout preservation",
        },
        {
          name: "Information Extractor",
          description: "LLM-powered extraction of skills, experience, education",
        },
        {
          name: "Scoring Engine",
          description: "Chain-of-thought reasoning for candidate scoring",
        },
        {
          name: "Database",
          description: "DynamoDB for scalable candidate storage",
        },
      ],
    },
    codeSnippets: [
      {
        title: "Resume Analysis Agent",
        language: "python",
        code: `from langchain.agents import Tool, create_react_agent
from langchain_openai import ChatOpenAI

def parse_resume(file_path):
    # Extract text from PDF
    text = extract_text(file_path)
    return text

def score_candidate(resume_text, job_description):
    prompt = f"""
    Analyze this resume against the job description using chain-of-thought.
    1. Extract key competencies
    2. Compare with job requirements
    3. Rate fit (0-100)
    
    Resume: {resume_text}
    Job: {job_description}
    """
    return llm.invoke(prompt)

tools = [
    Tool(name="ParseResume", func=parse_resume),
    Tool(name="ScoreCandidate", func=score_candidate),
]`,
      },
    ],
    challenges: [
      {
        challenge: "Resume Format Variation",
        solution:
          "Built robust PDF/DOC parsing with fallback text extraction; 98% success rate",
      },
      {
        challenge: "Context Understanding",
        solution:
          "Used chain-of-thought prompting to reason through competency matching",
      },
      {
        challenge: "Bias in Scoring",
        solution:
          "Implemented bias detection and fairness checks in scoring logic",
      },
    ],
  },
  {
    slug: "real-time-ai-dashboard",
    title: "Real-Time AI Dashboard",
    description:
      "A monitoring dashboard for multi-agent systems with live metrics on token usage, latency, agent decisions, and RAG retrieval quality scores.",
    tags: ["Next.js", "WebSockets", "CloudWatch", "Recharts"],
    span: "md:col-span-1",
    githubUrl: "https://github.com/viveksinghfx/ai-monitoring-dashboard",
    liveUrl: "https://dashboard.example.com",
    highlights: ["Real-time updates", "10k+ metrics/sec", "99.9% uptime"],
    problem: {
      title: "Observability Gap",
      description:
        "Multi-agent AI systems lack real-time visibility into agent decisions, token usage, and system performance. Teams debug issues blindly without telemetry.",
    },
    solution: {
      title: "Real-Time Monitoring Dashboard",
      description:
        "Built a comprehensive dashboard streaming agent metrics, token consumption, latency, and RAG quality scores using WebSockets for real-time updates.",
    },
    impact: {
      metrics: [
        { label: "Update Latency", value: "<100ms" },
        { label: "Metrics/sec", value: "10k+" },
        { label: "Uptime", value: "99.9%" },
      ],
    },
    architecture: {
      description: "Real-time data pipeline from CloudWatch to browser visualization",
      components: [
        {
          name: "Data Ingestion",
          description: "CloudWatch metrics and custom event streams",
        },
        {
          name: "WebSocket Server",
          description: "Real-time event broadcasting with socket.io",
        },
        {
          name: "Frontend Dashboard",
          description: "Next.js with React Query for efficient updates",
        },
        {
          name: "Visualization",
          description: "Recharts for interactive metrics display",
        },
      ],
    },
    codeSnippets: [
      {
        title: "Real-Time Metrics Stream",
        language: "python",
        code: `import asyncio
from fastapi import WebSocket

class MetricsStreamer:
    async def stream_metrics(self, websocket: WebSocket):
        while True:
            metrics = self.get_cloudwatch_metrics()
            agent_trace = self.get_agent_trace()
            
            await websocket.send_json({
                "timestamp": datetime.now(),
                "metrics": metrics,
                "agents": agent_trace,
                "token_usage": self.calculate_tokens(),
            })
            await asyncio.sleep(0.1)`,
      },
    ],
    challenges: [
      {
        challenge: "Latency at Scale",
        solution: "Implemented metric batching and aggressive caching; <100ms latency",
      },
      {
        challenge: "Data Volume",
        solution: "Time-series downsampling and aggregation for historical data",
      },
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug)
}
