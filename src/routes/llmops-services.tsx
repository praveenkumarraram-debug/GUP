import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHero } from "@/components/site/PageHero";
import { CTA } from "@/components/site/CTA";
import { HeroSlider } from "@/components/site/HeroSlider";
import { OptimizationMatrix } from "@/components/site/OptimizationMatrix";
import { PartnerSection } from "@/components/site/PartnerSection";
import { llmOptimizationOfferings } from "@/data/optimization-offerings";
import {
  CheckCircle2,
  ChevronRight,
  BarChart3,
  Target,
  Zap,
  TrendingUp,
  Users,
  ArrowRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface KpiRow {
  kpi: string;
  before: string;
  after: string;
  isNew?: boolean;
}

interface Benefit {
  text: string;
  isNew?: boolean;
}

interface CaseStudyResult {
  metric: string;
  before: string;
  after: string;
}

interface CaseStudy {
  title: string;
  industry: string;
  situation: string;
  intervention: string;
  interventionItems?: { label: string; detail: string }[];
  results: CaseStudyResult[];
}

interface LlmOffering {
  id: string;
  number: string;
  title: string;
  description: string;
  enhancement?: string;
  statementOfValue: string;
  before: string[];
  situation: string;
  kpis: KpiRow[];
  benefits: Benefit[];
  timeline: string;
  caseStudies: CaseStudy[];
}

interface CrossCuttingCapability {
  capability: string;
  description: string;
  impact: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const llmOfferings: LlmOffering[] = [
  {
    id: "enterprise-ai-foundation",
    number: "01",
    title: "Enterprise AI Foundation & LLM Factory",
    description:
      "Design, build, and operationalize an enterprise-grade LLM platform enabling secure deployment, governance, observability, and continuous optimization of AI applications across the organization.",
    enhancement:
      "Includes an LLM Inference Optimization Layer built on TensorRT-LLM, vLLM, or Triton — delivering continuous batching, paged KV-cache, and model-variant routing from day one.",
    statementOfValue:
      "Build once. Scale AI across the enterprise with performance and cost efficiency baked in.",
    before: [
      "Multiple AI pilots running on default serving stacks",
      "No governance; shadow AI usage across departments",
      "No reusable architecture or shared inference optimization",
    ],
    situation:
      "Enterprise wants to move from AI experimentation to production-grade, optimization-aware deployment.",
    kpis: [
      { kpi: "AI Projects in Production", before: "<10%", after: ">70%" },
      { kpi: "Time to Deploy AI App", before: "6 Months", after: "6 Weeks" },
      { kpi: "AI Governance Coverage", before: "15%", after: "100%" },
      { kpi: "Infrastructure Utilization", before: "35%", after: "75%" },
      { kpi: "AI Project Failure Rate", before: "60%", after: "20%" },
      { kpi: "Business Unit Adoption", before: "2", after: "25+" },
      { kpi: "P95 Inference Latency", before: "4.2s", after: "0.9s", isNew: true },
      { kpi: "Tokens/GPU/Second", before: "800", after: "3,200", isNew: true },
    ],
    benefits: [
      { text: "Enterprise AI Governance" },
      { text: "Reusable AI Platform" },
      { text: "Faster AI Rollout" },
      { text: "Reduced AI Risk" },
      { text: "Multi-Model Strategy" },
      { text: "Lower Operational Costs" },
      { text: "Optimized Inference Serving Stack (TensorRT-LLM / vLLM)", isNew: true },
      { text: "Model-variant routing — cascade from small → large model based on query complexity", isNew: true },
      { text: "Centralized KV-cache and prompt-cache management", isNew: true },
      { text: "GPU fleet observability (utilization, memory, thermal, queue depth)", isNew: true },
    ],
    timeline: "18–24 Weeks",
    caseStudies: [
      {
        title: "Global Insurance Conglomerate",
        industry: "BFSI / Fortune 100",
        situation:
          "A Fortune 100 insurer had 14 separate AI pilots — each with its own model and cloud account. No shared platform and no governance; regulators flagged uncontrolled AI usage.",
        intervention:
          "Built a unified LLM Factory on Triton with centralized guardrails and model routing (7B for FAQs, 70B for complex reasoning).",
        results: [
          { metric: "AI apps in production", before: "3", after: "28" },
          { metric: "Governance coverage", before: "12%", after: "100%" },
          { metric: "Avg inference cost/query", before: "$0.11", after: "$0.03" },
          { metric: "Regulatory audit findings", before: "9 critical", after: "0 critical" },
          { metric: "Time to onboard new AI use case", before: "14 weeks", after: "3 weeks" },
        ],
      },
      {
        title: "National Telecom Provider",
        industry: "Telecom / APAC",
        situation:
          "A major APAC telecom deployed a virtual assistant without batching or caching. Peak-hour latency exceeded 12 seconds; GPU utilization averaged 22%.",
        intervention:
          "Migrated to vLLM with continuous batching, prefix caching, and speculative decoding with a 1.5B draft model.",
        results: [
          { metric: "P95 latency (peak)", before: "12.4s", after: "1.8s" },
          { metric: "GPU utilization", before: "22%", after: "74%" },
          { metric: "Concurrent sessions supported", before: "200", after: "1,800" },
          { metric: "Monthly GPU spend", before: "$184,000", after: "$62,000" },
          { metric: "Customer satisfaction (CSAT)", before: "3.1/5", after: "4.4/5" },
        ],
      },
    ],
  },
  {
    id: "knowledge-intelligence-rag",
    number: "02",
    title: "Enterprise Knowledge Intelligence & RAG Factory",
    description:
      "Build enterprise knowledge systems that connect LLMs to internal documents, contracts, SOPs, CRM, and ERP platforms.",
    enhancement:
      "Includes a RAG Performance Optimization Module covering embedding distillation, hybrid retrieval tuning, re-ranker optimization, and context-window budget management.",
    statementOfValue:
      "Turn decades of enterprise knowledge into an AI-accessible asset with retrieval precision engineered from the ground up.",
    before: [
      "Knowledge trapped in silos; employees spend hours searching",
      "Naive chunking yields irrelevant retrieval and hallucinations",
      "Context stuffing drives spiraling token costs",
    ],
    situation:
      "Enterprises have millions of documents but poor RAG implementations suffer from low precision, context stuffing, and high token costs.",
    kpis: [
      { kpi: "Search Time", before: "2 Hours/Day", after: "10 Minutes" },
      { kpi: "Employee Productivity", before: "Baseline", after: "+35%" },
      { kpi: "Knowledge Reuse", before: "20%", after: "85%" },
      { kpi: "First Contact Resolution", before: "55%", after: "90%" },
      { kpi: "Document Retrieval Accuracy", before: "60%", after: "95%" },
      { kpi: "Knowledge Discovery Time", before: "Days", after: "Seconds" },
      { kpi: "Retrieval Precision@5", before: "48%", after: "92%", isNew: true },
      { kpi: "Hallucination Rate", before: "22%", after: "3%", isNew: true },
      { kpi: "Avg Tokens per Query", before: "12,000", after: "3,800", isNew: true },
      { kpi: "RAG Cost per Query", before: "$0.09", after: "$0.025", isNew: true },
    ],
    benefits: [
      { text: "Enterprise Search" },
      { text: "AI Knowledge Assistant" },
      { text: "Faster Decisions" },
      { text: "Reduced Employee Friction" },
      { text: "Improved Customer Support" },
      { text: "Embedding-model distillation (10x smaller custom embeddings, 97% recall retention)", isNew: true },
      { text: "Hybrid retrieval (BM25 + dense vector) tuned per document domain", isNew: true },
      { text: "Learned re-ranker (cross-encoder) for top-k refinement", isNew: true },
      { text: "Context-window budget optimizer (only send the 3–5 most relevant passages, not 20)", isNew: true },
      { text: "Chunking strategy per document type (contracts vs. engineering drawings vs. emails)", isNew: true },
    ],
    timeline: "8–14 Weeks",
    caseStudies: [
      {
        title: "Top-20 Global Law Firm",
        industry: "Professional Services",
        situation:
          "40M legal documents across 6 DMS platforms. Associates spent 2.3 hrs/day searching. First RAG attempt hit 41% precision@5 — lawyers abandoned it within 3 weeks.",
        intervention:
          "Built a domain-tuned hybrid retrieval pipeline with fine-tuned sentence transformers, BM25 + dense retrieval, a cross-encoder re-ranker, and clause-boundary chunking.",
        results: [
          { metric: "Retrieval precision@5", before: "41%", after: "93%" },
          { metric: "Associate search time", before: "2.3 hrs/day", after: "18 min/day" },
          { metric: "RAG adoption rate", before: "8%", after: "89%" },
          { metric: "Billable hours recovered/associate/week", before: "—", after: "6.2 hrs" },
          { metric: "Hallucination rate", before: "19%", after: "2.4%" },
          { metric: "Annual productivity value (2,000 lawyers)", before: "—", after: "~$78M recovered" },
        ],
      },
      {
        title: "Top-5 Pharma R&D Division",
        industry: "Healthcare / Life Sciences",
        situation:
          "12M internal R&D documents. Keyword search missed 55% of results. First RAG prototype cost $47K/month because every query stuffed the full 128K context window.",
        intervention:
          "Built 3-stage retrieval (BM25 pre-filter → bi-encoder → cross-encoder re-ranker), context-budget controller, and query cache with 38% cache hit rate.",
        results: [
          { metric: "Relevant document discovery rate", before: "45%", after: "94%" },
          { metric: "Avg tokens consumed per query", before: "98,000", after: "4,200" },
          { metric: "Monthly RAG infrastructure cost", before: "$47,000", after: "$6,800" },
          { metric: "Researcher time-to-insight", before: "3.5 days", after: "20 minutes" },
          { metric: "Regulatory submission prep time", before: "6 weeks", after: "2 weeks" },
        ],
      },
    ],
  },
  {
    id: "agentic-enterprise-automation",
    number: "03",
    title: "Agentic Enterprise Automation",
    description:
      "Deploy autonomous AI agents capable of reasoning, planning, executing workflows, and collaborating with human teams.",
    enhancement:
      "Includes an Agent Inference Optimization Layer: speculative decoding, step-level model routing, KV-cache reuse across agent steps, and token-budget governance to prevent runaway costs.",
    statementOfValue:
      "Move from AI answering questions to AI completing work — with every agent task optimized for cost and latency.",
    before: [
      "Manual workflows with multiple handoffs and repetitive tasks",
      "Agent prototypes work in demos but too slow and expensive for production",
      "Multi-step agents consume 10–50x more tokens than simple Q&A",
    ],
    situation:
      "Agentic workflows have fundamentally different inference cost and latency profiles than single-turn chat.",
    kpis: [
      { kpi: "Process Completion Time", before: "Days", after: "Minutes" },
      { kpi: "Human Intervention", before: "100%", after: "20%" },
      { kpi: "Ticket Resolution Time", before: "24 Hours", after: "2 Hours" },
      { kpi: "Workflow Throughput", before: "Baseline", after: "4X" },
      { kpi: "Operational Cost", before: "Baseline", after: "-40%" },
      { kpi: "Employee Productivity", before: "Baseline", after: "+50%" },
      { kpi: "Tokens per Agent Task", before: "45,000", after: "8,500", isNew: true },
      { kpi: "Agent Task Latency (P95)", before: "48s", after: "9s", isNew: true },
      { kpi: "Agent Cost per Task", before: "$0.45", after: "$0.08", isNew: true },
    ],
    benefits: [
      { text: "AI Workforce" },
      { text: "Autonomous Operations" },
      { text: "Faster Service Delivery" },
      { text: "Reduced Operating Costs" },
      { text: "Improved Customer Experience" },
      { text: "Step-level model routing — selects cheap vs. powerful LLM per agent reasoning step", isNew: true },
      { text: "KV-cache reuse across multi-turn agent steps (avoid re-processing full prompt at each step)", isNew: true },
      { text: "Token-budget governance per agent (hard caps prevent runaway chain-of-thought loops)", isNew: true },
      { text: "Speculative decoding for chain-of-thought (3x faster reasoning generation)", isNew: true },
      { text: "Agent observability dashboard (tokens/step, latency/step, cost/step, tool-call success rate)", isNew: true },
    ],
    timeline: "8–14 Weeks",
    caseStudies: [
      {
        title: "Fortune 500 Financial Services Firm",
        industry: "BFSI",
        situation:
          "Global bank KYC/AML agent consumed 52,000 tokens per case at $0.52/case — 4x the approved budget for 300K monthly cases.",
        intervention:
          "Step-level model routing (8B classifier → 7B or 70B), KV-cache prefix sharing across steps, and hard token-budget governor of 10K tokens per case.",
        results: [
          { metric: "Tokens per case", before: "52,000", after: "7,800" },
          { metric: "Latency per case (P95)", before: "58s", after: "8.2s" },
          { metric: "Cost per case", before: "$0.52", after: "$0.07" },
          { metric: "Monthly cost (300K cases)", before: "$156,000", after: "$21,000" },
          { metric: "Accuracy (vs. human reviewer)", before: "91%", after: "94%" },
          { metric: "Human escalation rate", before: "100%", after: "18%" },
        ],
      },
      {
        title: "Large E-Commerce Marketplace",
        industry: "Retail",
        situation:
          "Customer-service agent used a single large model for all steps. Peak latency hit 35 seconds and inference cost reached $340K/month.",
        intervention:
          "3-tier architecture (1.3B classifier → 7B for standard responses → 70B for disputes), speculative decoding, and semantic caching with 34% hit rate.",
        results: [
          { metric: "Avg agent latency", before: "18s", after: "3.1s" },
          { metric: "P99 agent latency", before: "35s", after: "7.8s" },
          { metric: "Monthly inference cost", before: "$340,000", after: "$68,000" },
          { metric: "Customer resolution rate (automated)", before: "62%", after: "89%" },
          { metric: "Customer satisfaction", before: "3.6/5", after: "4.5/5" },
          { metric: "Cost per resolution", before: "$0.38", after: "$0.05" },
        ],
      },
    ],
  },
  {
    id: "industry-specific-llm",
    number: "04",
    title: "Industry-Specific LLM Solutions",
    description:
      "Purpose-built LLM platforms optimized for specific industries, regulations, workflows, and terminology.",
    enhancement:
      "Includes domain distillation (compress 70B → 7–13B specialist), quantization-aware training with industry calibration data, and latency SLA engineering per workflow.",
    statementOfValue:
      "Industry expertise embedded directly into AI — with domain-specific model compression delivering 3–10x cost reduction.",
    before: [
      "Generic models fail on proprietary industry terminology",
      "High inference cost using oversized general-purpose models",
      "Compliance gaps in regulated industries",
    ],
    situation:
      "Industry-specific AI demands purpose-built models and serving stacks with domain accuracy and compliance requirements.",
    kpis: [
      { kpi: "Claims Processing Time", before: "5 Days", after: "2 Hours" },
      { kpi: "Underwriting Cycle", before: "3 Days", after: "30 Minutes" },
      { kpi: "Fraud Investigation", before: "8 Hours", after: "30 Minutes" },
      { kpi: "Clinical Documentation Time", before: "2 Hours", after: "15 Minutes" },
      { kpi: "Medical Coding Accuracy", before: "82%", after: "97%" },
      { kpi: "Model Size (Distilled)", before: "70B", after: "7B–13B specialist", isNew: true },
      { kpi: "Inference Cost/Claim", before: "$0.14", after: "$0.012", isNew: true },
      { kpi: "Fraud Scoring Latency", before: "3,200ms", after: "380ms", isNew: true },
      { kpi: "First-Token Latency (Clinical)", before: "2.1s", after: "180ms", isNew: true },
    ],
    benefits: [
      { text: "Domain-accurate models tailored to your industry vocabulary" },
      { text: "Regulatory compliance built into the serving stack" },
      { text: "Latency SLAs engineered per workflow (real-time fraud vs. batch coding)" },
      { text: "Domain distillation: compress 70B → 7-13B specialist with <2% accuracy loss", isNew: true },
      { text: "INT4/INT8 quantization with domain-specific calibration data", isNew: true },
      { text: "Edge-optimized 3–7B models for factory-floor inference on NVIDIA Jetson / IGX", isNew: true },
      { text: "HIPAA-compliant on-prem GPU-encrypted inference for healthcare", isNew: true },
      { text: "Sub-500ms fraud scoring with TensorRT-LLM + CUDA graph capture", isNew: true },
    ],
    timeline: "12–20 Weeks",
    caseStudies: [
      {
        title: "Tier-1 Global Bank",
        industry: "BFSI",
        situation:
          "Real-time fraud detection needed sub-500ms decisions. The 70B model was accurate (96.2%) but P95 latency was 3.2 seconds — too slow for production.",
        intervention:
          "Distilled to a 7B fraud specialist, GPTQ INT4 quantized, deployed on TensorRT-LLM with CUDA graph capture. 2-stage cascade: 7B screens all, top 2% escalate to 70B.",
        results: [
          { metric: "Screening latency (P95)", before: "3,200ms", after: "380ms" },
          { metric: "Fraud detection accuracy", before: "96.2%", after: "95.8% (within tolerance)" },
          { metric: "Real-time screening capability", before: "No", after: "Yes" },
          { metric: "Monthly inference cost", before: "$420,000", after: "$51,000" },
          { metric: "Fraudulent transactions caught pre-settlement", before: "34%", after: "91%" },
          { metric: "Annual fraud losses prevented", before: "—", after: "~$23M" },
        ],
      },
      {
        title: "42-Hospital Network",
        industry: "Healthcare",
        situation:
          "Automated ICD-10 coding from clinical notes. The 70B model cost $2.7M/year at $0.08/note. Leadership demanded sub-$500K annual spend.",
        intervention:
          "Distilled a 13B medical-coding specialist (6M clinical note pairs), SmoothQuant INT8 quantized, with routing: 68% of simple notes to 13B, complex cases to 70B. Deployed on HIPAA-compliant private DGX cluster.",
        results: [
          { metric: "Coding accuracy", before: "94%", after: "97.1% (domain tuning improved it)" },
          { metric: "Cost per note", before: "$0.08", after: "$0.011" },
          { metric: "Annual inference cost", before: "$2.7M", after: "$370K" },
          { metric: "Coding turnaround time", before: "48 hours", after: "2 hours" },
          { metric: "Coding staff redeployed to complex cases", before: "—", after: "38 FTEs" },
          { metric: "HIPAA compliance", before: "Cloud risk", after: "Fully on-prem" },
        ],
      },
    ],
  },
  {
    id: "llm-cost-optimization-finops",
    number: "05",
    title: "LLM Inference Optimization & AI FinOps",
    description:
      "Deep LLM inference optimization engineering — reducing deployment costs by up to 77% while maintaining SLOs through model compression, serving engine tuning, and workload-aware GPU allocation.",
    enhancement:
      "Full-stack optimization: Model-Level (quantization, distillation), Inference-Engine (TensorRT-LLM, PagedAttention, speculative decoding), Serving-Architecture (model routing, semantic caching, Mélange GPU allocation), and FinOps (token-level chargeback).",
    statementOfValue:
      "Reduce AI operating costs by 30–77% through deep inference engineering — not just cloud cost management.",
    before: [
      "GPU costs exploding with no optimization strategy",
      "Low GPU utilization (30% avg) with default serving configs",
      "No model routing — every query hits the most expensive model",
    ],
    situation:
      "Organizations pay 3–10x more than necessary because serving stacks run at defaults and GPU fleet composition is unmatched to workload needs.",
    kpis: [
      { kpi: "Cost Per Query", before: "$0.08", after: "$0.015" },
      { kpi: "GPU Utilization", before: "30%", after: "82%" },
      { kpi: "Inference Cost", before: "Baseline", after: "-65%" },
      { kpi: "Throughput", before: "Baseline", after: "5X" },
      { kpi: "Latency (P95)", before: "8s", after: "1.2s" },
      { kpi: "KV-Cache Hit Rate", before: "0%", after: "42%", isNew: true },
      { kpi: "Model Routing Efficiency", before: "N/A", after: "78% queries → small model", isNew: true },
      { kpi: "Quantization Speedup", before: "1x", after: "3.2x (INT4)", isNew: true },
      { kpi: "Speculative Decoding Speedup", before: "1x", after: "2.4x", isNew: true },
      { kpi: "Heterogeneous GPU Savings", before: "N/A", after: "Up to 77%", isNew: true },
    ],
    benefits: [
      { text: "Lower AI Spend" },
      { text: "Better GPU Utilization" },
      { text: "Reduced Cloud Costs" },
      { text: "Improved ROI" },
      { text: "Sustainable Scaling" },
      { text: "Deep inference-engine optimization (TensorRT-LLM, vLLM, continuous batching)", isNew: true },
      { text: "Model compression pipeline (quantize → distill → prune → validate → deploy)", isNew: true },
      { text: "Workload-aware heterogeneous GPU allocation (Mélange-style)", isNew: true },
      { text: "Model-routing and semantic-caching architecture", isNew: true },
      { text: "Speculative decoding deployment", isNew: true },
      { text: "Token-level FinOps with per-BU chargeback", isNew: true },
      { text: "GPU architecture advisory (which GPU for which workload)", isNew: true },
    ],
    timeline: "10–14 Weeks",
    caseStudies: [
      {
        title: "B2B SaaS Platform Company",
        industry: "Technology",
        situation:
          "$1.2M/month inference bill on Azure A100s, growing 15% MoM. CFO ultimatum: cut 50% in 90 days or copilot becomes premium-only.",
        intervention: "",
        interventionItems: [
          { label: "Distillation", detail: "Compressed 70B → 13B product specialist (800K Q&A pairs, 96% accuracy match)." },
          { label: "Quantization", detail: "AWQ INT4 on 13B model via TensorRT-LLM — 2.5x throughput gain." },
          { label: "Routing + Caching", detail: "350M classifier routes 72% of queries to 1.5B model; semantic caching at 38% hit rate." },
          { label: "GPU Mix", detail: "Migrated to Mélange-optimized fleet (H100/A10G/T4) — 40% infrastructure cost reduction." },
        ],
        results: [
          { metric: "Monthly inference cost", before: "$1,200,000", after: "$185,000" },
          { metric: "Cost reduction", before: "—", after: "84.6%" },
          { metric: "P95 latency", before: "4.8s", after: "1.1s" },
          { metric: "Throughput (queries/sec)", before: "120", after: "580" },
          { metric: "Copilot accuracy (customer-rated)", before: "4.2/5", after: "4.3/5 (improved)" },
          { metric: "CFO mandate met?", before: "—", after: "Yes — exceeded 50% target" },
        ],
      },
      {
        title: "Government Defense & Intelligence Agency",
        industry: "Public Sector / Air-Gapped",
        situation:
          "Air-gapped 200-GPU A100 network processing 50K docs/day. Mission required doubling throughput with zero new hardware (18-month procurement cycle).",
        intervention: "",
        interventionItems: [
          { label: "Quantization", detail: "GPTQ INT4 with defense-domain calibration; <0.8% accuracy loss." },
          { label: "Continuous Batching", detail: "Migrated to vLLM; batch size jumped from 1.2 to 8.4." },
          { label: "Speculative Decoding", detail: "7B draft model — 2.1x speedup on long-doc summarization." },
          { label: "KV-Cache + Scheduling", detail: "Paged KV-cache with prefix sharing; off-peak batch scheduling with reserved SLO capacity for analysts." },
        ],
        results: [
          { metric: "Documents processed/day", before: "50,000", after: "127,000" },
          { metric: "Throughput increase", before: "—", after: "2.54x (exceeded 2x target)" },
          { metric: "GPU utilization", before: "62%", after: "88%" },
          { metric: "Hardware added", before: "—", after: "Zero (same 200 A100s)" },
          { metric: "P95 latency (real-time queries)", before: "6.2s", after: "2.1s" },
          { metric: "Cost of additional hardware avoided", before: "—", after: "~$14M" },
        ],
      },
    ],
  },
  {
    id: "sovereign-ai-private-llm",
    number: "06",
    title: "Sovereign AI & Private LLM Platforms",
    description:
      "Build private, sovereign, and on-premise LLM environments for governments, defense, BFSI, healthcare, and regulated industries.",
    enhancement:
      "Includes On-Prem Inference Optimization: aggressive model compression for fixed GPU memory, TensorRT-LLM or ONNX Runtime serving, and workload scheduling for maximum throughput on constrained hardware.",
    statementOfValue:
      "Keep critical data inside your control boundary — with optimized inference extracting maximum performance from finite on-prem GPUs.",
    before: [
      "Data privacy restrictions prevent cloud AI usage",
      "Limited on-prem GPU budget with no ability to scale",
      "Air-gapped environments lack access to cloud serving platforms",
    ],
    situation:
      "Governments and regulated industries cannot use cloud AI for sensitive workloads and face fixed GPU budgets with zero internet connectivity.",
    kpis: [
      { kpi: "Data Exposure Risk", before: "High", after: "Minimal" },
      { kpi: "Compliance Coverage", before: "50%", after: "100%" },
      { kpi: "External API Dependency", before: "100%", after: "0%" },
      { kpi: "Data Sovereignty", before: "Partial", after: "Full" },
      { kpi: "Security Audit Readiness", before: "Low", after: "High" },
      { kpi: "On-Prem GPU Utilization", before: "28%", after: "85%", isNew: true },
      { kpi: "Throughput on Fixed Hardware", before: "Baseline", after: "3.5X", isNew: true },
      { kpi: "Model Fit in GPU Memory", before: "1 model/node", after: "3 models/node (quantized)", isNew: true },
    ],
    benefits: [
      { text: "Full Data Ownership" },
      { text: "Regulatory Compliance" },
      { text: "National AI Sovereignty" },
      { text: "Enterprise Security" },
      { text: "Vendor Independence" },
      { text: "Maximum throughput on fixed GPU infrastructure", isNew: true },
      { text: "Aggressive quantization for on-prem memory constraints", isNew: true },
      { text: "TensorRT-LLM deployment for deterministic, low-latency serving", isNew: true },
      { text: "Workload scheduling optimized for fixed-capacity environments", isNew: true },
      { text: "Offline model update and redeployment pipeline (no internet required)", isNew: true },
    ],
    timeline: "14–28 Weeks",
    caseStudies: [
      {
        title: "G20 Central Bank",
        industry: "Government / BFSI",
        situation:
          "All data must remain on sovereign soil. 64 H100 GPUs were fully consumed by a single unoptimized 70B model with no headroom for additional use cases.",
        intervention:
          "SmoothQuant INT8 quantization (50% memory reduction), TensorRT-LLM with in-flight batching, model cascade (7B for 74% of queries, 70B for complex analysis), offline model-update pipeline.",
        results: [
          { metric: "GPU utilization", before: "100% (single model, no headroom)", after: "72% (headroom for 3 additional use cases)" },
          { metric: "Models served on 64-GPU cluster", before: "1", after: "4 (distilled 7B, 13B, 70B, embedding)" },
          { metric: "Concurrent users supported", before: "15", after: "180" },
          { metric: "P95 latency", before: "8.4s", after: "1.6s" },
          { metric: "New use cases onboarded (6 months)", before: "0", after: "7" },
        ],
      },
      {
        title: "European National Healthcare System",
        industry: "Healthcare / Government",
        situation:
          "60M citizens, 300 hospitals, data must stay on government infrastructure. 120 A100 GPUs across 3 regional data centers needed to serve clinical AI at scale.",
        intervention:
          "Distilled 13B medical specialist with GPTQ INT4 (3 replicas per 8-GPU node vs. 1 of the 70B). vLLM continuous batching with priority scheduler (emergency dept first, batch coding off-peak).",
        results: [
          { metric: "Hospitals served", before: "0 (pilot stuck)", after: "300" },
          { metric: "Clinical coding accuracy", before: "82% (manual)", after: "96% (model-assisted)" },
          { metric: "Avg time per clinical note summary", before: "12 minutes (manual)", after: "45 seconds" },
          { metric: "Data sovereignty compliance", before: "N/A (blocked)", after: "100% compliant" },
          { metric: "Annual clinician hours saved", before: "—", after: "~4.2M hours" },
          { metric: "Estimated productivity value", before: "—", after: "~€630M/year" },
        ],
      },
    ],
  },
];

const crossCuttingCapabilities: CrossCuttingCapability[] = [
  { capability: "Model Quantization Engineering", description: "GPTQ, AWQ, SmoothQuant, FP8 — with domain-specific calibration data", impact: "2–4x throughput, 50–75% memory reduction" },
  { capability: "Knowledge Distillation", description: "Compress 70B+ models into 7–13B domain specialists", impact: "5–10x cost reduction with <2% accuracy loss" },
  { capability: "Speculative Decoding", description: "Draft model accelerates autoregressive generation", impact: "2–3x latency reduction" },
  { capability: "Continuous Batching", description: "Dynamic micro-batching for variable-length requests", impact: "3–8x throughput vs. sequential serving" },
  { capability: "KV-Cache Optimization", description: "PagedAttention, prefix sharing, cache management", impact: "3x more concurrent sequences" },
  { capability: "Model Routing & Cascading", description: "Route queries to right-sized models by complexity", impact: "60–80% cost reduction" },
  { capability: "Semantic Response Caching", description: "Cache responses for semantically equivalent queries", impact: "25–40% cache hit rate typical" },
  { capability: "Heterogeneous GPU Allocation", description: "Workload-aware assignment of GPU types (Mélange)", impact: "Up to 77% cost reduction vs. homogeneous" },
  { capability: "Serving-Engine Optimization", description: "TensorRT-LLM, vLLM, Triton deployment and tuning", impact: "3–5x throughput vs. default serving" },
  { capability: "Token-Level FinOps", description: "Per-query, per-user, per-BU cost attribution", impact: "Full cost transparency and chargeback" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function KpiTable({ kpis }: { kpis: KpiRow[] }) {
  return (
    <div className="rounded-xl border border-border/60 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface/60 border-b border-border/40">
            <th className="text-left px-4 py-3 font-semibold text-foreground w-2/5">KPI</th>
            <th className="text-left px-4 py-3 font-semibold text-foreground/70">Before</th>
            <th className="text-left px-4 py-3 font-semibold text-accent">After</th>
          </tr>
        </thead>
        <tbody>
          {kpis.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-border/20 last:border-b-0 ${i % 2 === 0 ? "bg-background" : "bg-surface/20"}`}
            >
              <td className="px-4 py-3 font-medium text-foreground">
                {row.isNew && (
                  <span className="inline-block mr-2 text-[10px] font-bold text-primary border border-primary/40 bg-primary/10 rounded px-1 py-0.5 leading-none align-middle">
                    NEW
                  </span>
                )}
                {row.kpi}
              </td>
              <td className="px-4 py-3 text-foreground/65">{row.before}</td>
              <td className="px-4 py-3 font-semibold text-primary">{row.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ResultsTable({ results }: { results: CaseStudyResult[] }) {
  return (
    <div className="rounded-xl border border-border/60 overflow-hidden mt-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface/60 border-b border-border/40">
            <th className="text-left px-4 py-3 font-semibold text-foreground/80 w-2/5">Metric</th>
            <th className="text-left px-4 py-3 font-semibold text-muted-foreground w-1/4">Before</th>
            <th className="text-left px-4 py-3 font-semibold text-accent">After</th>
          </tr>
        </thead>
        <tbody>
          {results.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-border/20 last:border-b-0 ${i % 2 === 0 ? "bg-background" : "bg-surface/20"}`}
            >
              <td className="px-4 py-3 font-medium text-foreground">{row.metric}</td>
              <td className="px-4 py-3 text-foreground/65">{row.before}</td>
              <td className="px-4 py-3 font-semibold text-primary">{row.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-border/50 bg-surface/20 overflow-hidden"
    >
      <div className="p-6 md:p-8 border-b border-border/30 bg-surface/30">
        <div className="flex items-start gap-3">
          <Users className="h-5 w-5 text-accent shrink-0 mt-0.5" />
          <div>
            <h5 className="text-lg font-semibold text-foreground">{study.title}</h5>
            <span className="text-xs text-primary font-semibold bg-primary/10 border border-primary/20 rounded-full px-2.5 py-0.5 inline-block mt-1">
              {study.industry}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        <div>
          <h6 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <Target className="h-4 w-4 text-accent" /> Situation
          </h6>
          <p className="text-sm text-muted-foreground leading-relaxed">{study.situation}</p>
        </div>

        {study.interventionItems && study.interventionItems.length > 0 ? (
          <div>
            <h6 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-500" /> Optimization Stack Applied
            </h6>
            <div className="space-y-2">
              {study.interventionItems.map((item, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="font-semibold text-accent shrink-0 min-w-[120px]">{item.label}</span>
                  <span className="text-muted-foreground leading-relaxed">{item.detail}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h6 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-500" /> Intervention
            </h6>
            <p className="text-sm text-muted-foreground leading-relaxed">{study.intervention}</p>
          </div>
        )}

        <div>
          <h6 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" /> Impact
          </h6>
          <ResultsTable results={study.results} />
        </div>
      </div>
    </motion.div>
  );
}

function OfferingSection({ offering }: { offering: LlmOffering }) {
  return (
    <section id={offering.id} className="py-24 border-b border-border/40 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="text-5xl font-black leading-none font-display bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
              {offering.number}
            </span>
            <div className="h-px w-16 bg-gradient-to-r from-primary/60 to-transparent" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-3.5xl font-semibold tracking-tight text-gradient mb-4">
            {offering.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl leading-relaxed mb-4">
            {offering.description}
          </p>
          {offering.enhancement && (
            <div className="flex gap-3 mt-4 rounded-xl border border-accent/20 bg-accent/5 p-4 max-w-4xl">
              <Zap className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-accent">Enhanced: </span>
                {offering.enhancement}
              </p>
            </div>
          )}
        </motion.div>

        {/* Statement of Value */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8"
        >
          <div className="flex items-start gap-4">
            <ArrowRight className="h-6 w-6 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs uppercase tracking-widest text-primary/70 font-semibold mb-2">Statement of Value</p>
              <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed">{offering.statementOfValue}</p>
            </div>
          </div>
        </motion.div>

        {/* Before / Situation */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 grid md:grid-cols-2 gap-6"
        >
          <div className="rounded-xl border border-border/50 bg-surface/20 p-6">
            <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wider mb-4">Before</h3>
            <ul className="space-y-2">
              {offering.before.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400/60 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="text-sm font-semibold text-primary/70 uppercase tracking-wider mb-4">Situation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{offering.situation}</p>
          </div>
        </motion.div>

        {/* KPI Table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" /> Key Performance Indicators — Before vs. After
          </h3>
          <KpiTable kpis={offering.kpis} />
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-accent" /> Benefits
          </h3>
          <div className="grid md:grid-cols-2 gap-2">
            {offering.benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={`flex items-start gap-3 rounded-lg px-4 py-3 border ${b.isNew ? "border-accent/20 bg-accent/5" : "border-border/30 bg-surface/20"}`}
              >
                <ChevronRight className={`h-4 w-4 shrink-0 mt-0.5 ${b.isNew ? "text-accent" : "text-primary"}`} />
                <div>
                  {b.isNew && (
                    <span className="inline-block mr-1.5 text-[10px] font-bold text-accent border border-accent/40 bg-accent/10 rounded px-1 py-0.5 leading-none align-middle">
                      NEW
                    </span>
                  )}
                  <span className="text-sm text-foreground">{b.text}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 rounded-xl border border-border/50 bg-surface/20 p-6"
        >
          <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wider mb-3">Engagement Timeline</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{offering.timeline}</p>
        </motion.div>

        {/* Case Studies */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" /> Case Studies
          </h3>
          <p className="text-sm text-muted-foreground mb-8">
            Representative engagements demonstrating real-world impact across industries.
          </p>
          <div className="space-y-8">
            {offering.caseStudies.map((study, i) => (
              <CaseStudyCard key={i} study={study} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CrossCuttingSection() {
  return (
    <section id="cross-cutting-capabilities" className="py-24 scroll-mt-20 bg-surface/10">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Cross-Cutting Engineering</p>
          <h2 className="text-2xl md:text-3xl lg:text-3.5xl font-semibold tracking-tight text-gradient mb-4">
            LLM Optimization Engineering Capabilities
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            These capabilities apply across all six offerings and differentiate our practice from competitors who treat LLM deployment as infrastructure-only.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-border/60 overflow-hidden"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface/60 border-b border-border/40">
                <th className="text-left px-4 py-3 font-semibold text-foreground/80 w-1/4">Capability</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground/80">Description</th>
                <th className="text-left px-4 py-3 font-semibold text-accent w-1/4">Typical Impact</th>
              </tr>
            </thead>
            <tbody>
              {crossCuttingCapabilities.map((cap, i) => (
                <tr
                  key={i}
                  className={`border-b border-border/20 last:border-b-0 ${i % 2 === 0 ? "bg-background" : "bg-surface/20"}`}
                >
                  <td className="px-4 py-3 font-semibold text-foreground">{cap.capability}</td>
                  <td className="px-4 py-3 text-muted-foreground">{cap.description}</td>
                  <td className="px-4 py-3 font-semibold text-primary">{cap.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/llmops-services")({
  head: () => ({
    meta: [
      { title: "LLMOps & LLM Inference Optimization — 6 Enterprise Offerings | Summit AI Architects" },
      { name: "description", content: "Six deep LLM engineering engagements covering enterprise AI foundations, RAG optimization, agentic automation, industry-specific AI, inference FinOps, and sovereign AI platforms. Reduce inference costs by 30–77%." },
      { property: "og:title", content: "LLMOps & LLM Inference Optimization | Summit AI Architects" },
      { property: "og:description", content: "Quantization, distillation, speculative decoding, heterogeneous GPU allocation, and model routing across 6 structured LLM engineering engagements." },
      { property: "og:url", content: "/llmops-services" },
    ],
    links: [{ rel: "canonical", href: "/llmops-services" }],
  }),
  component: LlmOpsPage,
});

function LlmOpsPage() {
  return (
    <>
      <HeroSlider type="llm" />

      {/* Outcome stats bar */}
      <section className="border-b border-border/40 bg-surface/20">
        <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "–77%", label: "Inference cost (heterogeneous GPU)" },
            { value: "3–10x", label: "Cost reduction via distillation" },
            { value: "2–4x", label: "Throughput via quantization" },
            { value: "6", label: "Deep engineering offerings" },
          ].map((o) => (
            <div key={o.label}>
              <div className="text-3xl md:text-4xl font-semibold text-gradient-primary font-display">{o.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{o.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky nav */}
      <nav className="border-b border-border/40 bg-background/80 backdrop-blur sticky top-16 z-30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {llmOfferings.map((o) => (
              <a
                key={o.id}
                href={`#${o.id}`}
                className="shrink-0 rounded-md px-3 py-1.5 text-xs text-foreground/70 hover:text-foreground hover:bg-surface/60 transition-colors whitespace-nowrap"
              >
                <span className="font-bold text-primary mr-1">{o.number}</span>
                {o.title}
              </a>
            ))}
            <a
              href="#cross-cutting-capabilities"
              className="shrink-0 rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-surface/60 transition-colors whitespace-nowrap border-l border-border/40 ml-2 pl-4"
            >
              Cross-Cutting Capabilities
            </a>
          </div>
        </div>
      </nav>

      <div className="bg-background">
        {llmOfferings.map((offering) => (
          <OfferingSection key={offering.id} offering={offering} />
        ))}
      </div>

      <CrossCuttingSection />

      <OptimizationMatrix
        title="LLM Optimization Offerings"
        description="Our LLM optimization services target the fundamental physics of large language model inference, driving down cost per million tokens while maximizing hardware utilization and preserving model quality."
        offerings={llmOptimizationOfferings}
      />

      <PartnerSection />

      <CTA />
    </>
  );
}
