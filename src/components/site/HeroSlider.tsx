import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Shield,
  Cpu,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NeuralBackground } from "./NeuralBackground";


export interface SlideItem {
  attn: string;
  role: string;
  problem: string;
  outcome: string;
  cta: string;
  bgImage: string;
  metrics: { value: string; label: string }[];
  tags: string[];
  accentColor: string;
  accentGlow: string;
  accentBorder: string;
  icon: React.ElementType;
}

export interface SliderData {
  optimizedFor: string;
  slides: SlideItem[];
}

const slidersData: Record<string, SliderData> = {
  home: {
    optimizedFor: "AI Revenue Acceleration, Sales Velocity, Pipeline Growth, Revenue Operations",
    slides: [
      {
        attn: "CTOs & VPs of AI",
        role: "Infrastructure Leadership",
        problem: "You're bleeding compute budgets on AI infrastructure that wasn't built for modern scale or power demands.",
        outcome: "We transform experimental AI clusters into hyper-optimized engines, slashing infrastructure costs by 20–30% while boosting total AI output and ROI.",
        cta: "Book an Architecture Audit",
        bgImage: "/images/gpu_cluster_1_1781677642098.png",
        metrics: [
          { value: "20–30%", label: "Cost Reduction" },
          { value: "3×", label: "Output Boost" },
          { value: "< 90 days", label: "Time to Value" },
        ],
        tags: ["GPU Clusters", "Cost Optimization", "AI ROI"],
        accentColor: "#818cf8",
        accentGlow: "rgba(99,102,241,0.22)",
        accentBorder: "rgba(129,140,248,0.4)",
        icon: Cpu,
      },
      {
        attn: "Head of ML Infrastructure",
        role: "ML Platform Engineering",
        problem: "Your multi-million-dollar GPUs sit idle, choked by network and memory bottlenecks killing throughput.",
        outcome: "We unlock maximum FLOPS/Watt across your cluster, delivering a 2x–3x surge in training throughput on existing hardware—zero new CapEx.",
        cta: "Get My GPU Utilization Report",
        bgImage: "/images/slide_gpu_infra_bg.png",
        metrics: [
          { value: "2×–3×", label: "Training Throughput" },
          { value: "Zero", label: "New CapEx" },
          { value: "FLOPS/W", label: "Fully Maximized" },
        ],
        tags: ["NVLink", "NCCL Tuning", "Zero-CapEx Scaling"],
        accentColor: "#60a5fa",
        accentGlow: "rgba(96,165,250,0.22)",
        accentBorder: "rgba(96,165,250,0.4)",
        icon: Activity,
      },
      {
        attn: "VP of Product & AI",
        role: "Product & AI Strategy",
        problem: "Your LLMs ace demos but hallucinate, lag, or crash under real user load—destroying trust and revenue.",
        outcome: "We engineer production-grade RAG and Agent architectures achieving 99.9% uptime and cutting hallucination rates by 40–60%.",
        cta: "Scale My LLM Infrastructure",
        bgImage: "/images/slide_llm_bg.png",
        metrics: [
          { value: "99.9%", label: "Uptime SLA" },
          { value: "40–60%", label: "Less Hallucination" },
          { value: "< 100ms", label: "Response Latency" },
        ],
        tags: ["RAG Architecture", "LLM Agents", "Production AI"],
        accentColor: "#a78bfa",
        accentGlow: "rgba(167,139,250,0.22)",
        accentBorder: "rgba(167,139,250,0.4)",
        icon: TrendingUp,
      },
      {
        attn: "CISOs",
        role: "Cybersecurity & Governance",
        problem: "Your AI models are a wide-open attack surface for adversarial and prompt-injection threats.",
        outcome: "We build a zero-trust AI perimeter that neutralizes 95%+ of adversarial inputs before they reach your model.",
        cta: "Schedule an AI Red Team Assessment",
        bgImage: "/images/slide_security_bg.png",
        metrics: [
          { value: "95%+", label: "Threats Blocked" },
          { value: "< 5ms", label: "Firewall Latency" },
          { value: "Zero-Trust", label: "Architecture" },
        ],
        tags: ["Adversarial Defense", "LLM Firewall", "Red Teaming"],
        accentColor: "#34d399",
        accentGlow: "rgba(52,211,153,0.22)",
        accentBorder: "rgba(52,211,153,0.4)",
        icon: Shield,
      },
      {
        attn: "Cloud Architects",
        role: "Cloud & Data Infrastructure",
        problem: "Your data scientists wait on I/O bottlenecks and energy constraints instead of training models.",
        outcome: "We solve the holy trinity of constraints—Energy, I/O, and Memory—accelerating data pipelines by 10x and eliminating compute waste.",
        cta: "Optimize My AI Stack Now",
        bgImage: "/images/gpu_cluster_2_1781677654723.png",
        metrics: [
          { value: "10×", label: "Pipeline Speed" },
          { value: "3 Domains", label: "Energy · I/O · Memory" },
          { value: "Zero", label: "Compute Waste" },
        ],
        tags: ["GPU-Direct Storage", "Energy Optimization", "MLOps"],
        accentColor: "#f472b6",
        accentGlow: "rgba(244,114,182,0.22)",
        accentBorder: "rgba(244,114,182,0.4)",
        icon: Cpu,
      },
      {
        attn: "SRE Leads",
        role: "Site Reliability Engineering",
        problem: "Unpredictable AI behavior and silent model drift trigger cascade failures in production.",
        outcome: "We engineer self-healing AI pipelines guaranteeing 99.999% availability and auto-remediating failures in under 5 minutes.",
        cta: "Build Resilient AI Systems",
        bgImage: "/images/hero_infrastructure.png",
        metrics: [
          { value: "99.999%", label: "Availability" },
          { value: "< 5 min", label: "Auto-Remediation" },
          { value: "Self-Healing", label: "Architecture" },
        ],
        tags: ["LLM Observability", "Drift Detection", "Chaos Engineering"],
        accentColor: "#fb923c",
        accentGlow: "rgba(251,146,60,0.22)",
        accentBorder: "rgba(251,146,60,0.4)",
        icon: Activity,
      },
      {
        attn: "Data Center Executives",
        role: "Data Center Operations",
        problem: "Your GW-scale AI clusters threaten grid stability and fail strict ESG mandates.",
        outcome: "We design sustainable, carbon-aware AI campuses lowering PUE from 1.5 to sub-1.15 and saving 15–25% on energy costs.",
        cta: "Get an Energy Optimization Plan",
        bgImage: "/images/slide_gpu_infra_bg.png",
        metrics: [
          { value: "Sub-1.15", label: "PUE Achieved" },
          { value: "15–25%", label: "Energy Savings" },
          { value: "ESG", label: "Compliant" },
        ],
        tags: ["Carbon-Aware AI", "PUE Optimization", "ESG Compliance"],
        accentColor: "#4ade80",
        accentGlow: "rgba(74,222,128,0.22)",
        accentBorder: "rgba(74,222,128,0.4)",
        icon: Shield,
      },
      {
        attn: "Enterprise Leaders",
        role: "Executive & Board Level",
        problem: "AI vendors sell hype and black boxes—not deterministic, reliable results you can bank on.",
        outcome: "You get measurable, physics-backed AI performance delivering a 5x–10x ROI on infrastructure investment within 12 months.",
        cta: "Talk to a Principal Architect",
        bgImage: "/images/slide_enterprise_bg.png",
        metrics: [
          { value: "5×–10×", label: "ROI Guarantee" },
          { value: "12 months", label: "Payback Period" },
          { value: "100%", label: "Measurable Results" },
        ],
        tags: ["Physics-Backed AI", "Guaranteed ROI", "Enterprise Scale"],
        accentColor: "#fbbf24",
        accentGlow: "rgba(251,191,36,0.22)",
        accentBorder: "rgba(251,191,36,0.4)",
        icon: TrendingUp,
      },
    ],
  },
  gpu: {
    optimizedFor: "GPU Utilization, HPC Fabric, CUDA Kernels, AI Infrastructure ROI, GPUaaS",
    slides: [
      {
        attn: "CFOs & CTOs",
        role: "Financial & Technology Leadership",
        problem: "You're paying premium GPU cycles that go completely unused—burning cash every hour.",
        outcome: "We maximize your GPU ROI by squeezing every last FLOP from your silicon, increasing effective FLOPS-per-dollar by 40–60%.",
        cta: "Maximize My GPU ROI",
        bgImage: "/images/gpu_cluster_1_1781677642098.png",
        metrics: [
          { value: "40–60%", label: "More FLOPS/$" },
          { value: "24/7", label: "GPU Utilization" },
          { value: "Zero", label: "Idle Cycles" },
        ],
        tags: ["GPU ROI", "FLOPS Optimization", "Cost Engineering"],
        accentColor: "#818cf8",
        accentGlow: "rgba(99,102,241,0.22)",
        accentBorder: "rgba(129,140,248,0.4)",
        icon: TrendingUp,
      },
      {
        attn: "HPC Architects",
        role: "High-Performance Computing",
        problem: "Network chatter and latency stall your 100,000+ GPU super-cluster builds.",
        outcome: "We deliver microsecond-latency HPC fabrics cutting inter-node communication overhead by 50–70% for true GPU Super Scaling.",
        cta: "Design My HPC Fabric",
        bgImage: "/images/slide_gpu_infra_bg.png",
        metrics: [
          { value: "50–70%", label: "Lower Latency" },
          { value: "100K+", label: "GPU Scale" },
          { value: "µs", label: "Inter-Node RTT" },
        ],
        tags: ["InfiniBand", "RoCEv2", "HPC Fabric Design"],
        accentColor: "#60a5fa",
        accentGlow: "rgba(96,165,250,0.22)",
        accentBorder: "rgba(96,165,250,0.4)",
        icon: Cpu,
      },
      {
        attn: "ML Engineers",
        role: "Machine Learning Engineering",
        problem: "Your massive models starve because memory bandwidth can't feed the compute beast.",
        outcome: "We re-architect tensor pipelines to feed data at maximum speed, boosting memory-bound workload speeds by 30–50%.",
        cta: "Get a Free Memory Audit",
        bgImage: "/images/gpu_cluster_2_1781677654723.png",
        metrics: [
          { value: "30–50%", label: "Faster Workloads" },
          { value: "Max BW", label: "Memory Bandwidth" },
          { value: "Zero", label: "Tensor Starvation" },
        ],
        tags: ["HBM Optimization", "Tensor Pipelines", "Memory Architecture"],
        accentColor: "#a78bfa",
        accentGlow: "rgba(167,139,250,0.22)",
        accentBorder: "rgba(167,139,250,0.4)",
        icon: Activity,
      },
      {
        attn: "Product Managers",
        role: "AI Product Management",
        problem: "Unacceptable inference latency is killing your real-time AI UX and user retention.",
        outcome: "We slash latency via advanced quantization and kernel tuning, reducing time-to-first-token by 40–60%.",
        cta: "Accelerate My Inference Engine",
        bgImage: "/images/ai_processor_node_1781677682371.png",
        metrics: [
          { value: "40–60%", label: "Lower TTFT" },
          { value: "FP8/INT4", label: "Quantization" },
          { value: "< 50ms", label: "Real-Time UX" },
        ],
        tags: ["Inference Optimization", "Quantization", "Kernel Tuning"],
        accentColor: "#f472b6",
        accentGlow: "rgba(244,114,182,0.22)",
        accentBorder: "rgba(244,114,182,0.4)",
        icon: TrendingUp,
      },
      {
        attn: "Platform Engineers",
        role: "Platform & DevOps Engineering",
        problem: "You waste compute isolating single, low-utilization workloads on dedicated GPUs.",
        outcome: "We enable safe, high-density GPU multi-tenancy, boosting cluster utilization from 30% to 80%+ with zero noisy-neighbor risk.",
        cta: "Enable GPU Multi-Tenancy",
        bgImage: "/images/gpu_server_rack_1781677667839.png",
        metrics: [
          { value: "30→80%", label: "GPU Utilization" },
          { value: "Zero", label: "Noisy-Neighbor Risk" },
          { value: "High-Density", label: "Multi-Tenancy" },
        ],
        tags: ["MIG Partitioning", "GPU Multi-Tenancy", "K8s for AI"],
        accentColor: "#fb923c",
        accentGlow: "rgba(251,146,60,0.22)",
        accentBorder: "rgba(251,146,60,0.4)",
        icon: Shield,
      },
      {
        attn: "AI Researchers",
        role: "AI & Deep Learning Research",
        problem: "Off-the-shelf software fails to run your proprietary mathematical operations efficiently.",
        outcome: "We write custom CUDA and Triton kernels engineered for your math, accelerating specific ops by 5x–10x over baseline.",
        cta: "Discuss Custom Kernel Development",
        bgImage: "/images/gpu_cluster_1_1781677642098.png",
        metrics: [
          { value: "5×–10×", label: "Custom Op Speed" },
          { value: "CUDA/Triton", label: "Expert Engineers" },
          { value: "Bespoke", label: "Math Kernels" },
        ],
        tags: ["CUDA Kernels", "Triton", "Custom Op Development"],
        accentColor: "#4ade80",
        accentGlow: "rgba(74,222,128,0.22)",
        accentBorder: "rgba(74,222,128,0.4)",
        icon: Cpu,
      },
      {
        attn: "Data Center Ops",
        role: "Data Center Operations",
        problem: "Thermal throttling silently destroys training throughput without triggering a single alert.",
        outcome: "We implement intelligent power-capping eliminating 95% of thermal throttling events, sustaining peak frequency 24/7.",
        cta: "Prevent Thermal Throttling",
        bgImage: "/images/slide_gpu_infra_bg.png",
        metrics: [
          { value: "95%", label: "Throttling Eliminated" },
          { value: "24/7", label: "Peak Frequency" },
          { value: "Smart", label: "Power Capping" },
        ],
        tags: ["Thermal Management", "Power Capping", "DVFS Tuning"],
        accentColor: "#fbbf24",
        accentGlow: "rgba(251,191,36,0.22)",
        accentBorder: "rgba(251,191,36,0.4)",
        icon: Activity,
      },
      {
        attn: "Systems Architects",
        role: "Systems & Network Architecture",
        problem: "Your model parallelism fails because peer-to-peer memory access is misconfigured.",
        outcome: "We optimize NVLink and P2P interconnects achieving 90%+ scaling efficiency across your entire cluster.",
        cta: "Optimize My Interconnects",
        bgImage: "/images/gpu_cluster_2_1781677654723.png",
        metrics: [
          { value: "90%+", label: "Scaling Efficiency" },
          { value: "NVLink", label: "Fully Optimized" },
          { value: "P2P", label: "Zero-Config Mesh" },
        ],
        tags: ["NVLink", "P2P Memory", "Model Parallelism"],
        accentColor: "#818cf8",
        accentGlow: "rgba(99,102,241,0.22)",
        accentBorder: "rgba(129,140,248,0.4)",
        icon: Shield,
      },
    ],
  },
  llm: {
    optimizedFor: "RAG Architecture, AI Agents, LLM Production, Token Cost Reduction, Multi-Modal AI",
    slides: [
      {
        attn: "AI Product Leads",
        role: "AI Product Leadership",
        problem: "Your RAG systems retrieve garbage context, causing LLM failures in high-stakes production environments.",
        outcome: "We build high-fidelity RAG pipelines boosting retrieval precision by 30–50%, ensuring accurate, grounded, trustworthy answers.",
        cta: "Architect My RAG System",
        bgImage: "/images/slide_llm_bg.png",
        metrics: [
          { value: "30–50%", label: "Better Retrieval" },
          { value: "Grounded", label: "Answers Always" },
          { value: "Zero", label: "Context Garbage" },
        ],
        tags: ["RAG Pipelines", "pgvector", "Knowledge Graphs"],
        accentColor: "#818cf8",
        accentGlow: "rgba(99,102,241,0.22)",
        accentBorder: "rgba(129,140,248,0.4)",
        icon: TrendingUp,
      },
      {
        attn: "Innovation Teams",
        role: "AI Innovation & R&D",
        problem: "Your chatbots answer questions but can't take action or use tools—they're conversational dead-ends.",
        outcome: "We build autonomous, tool-calling AI agents resolving 80%+ of complex tasks without human intervention.",
        cta: "Build My AI Agents",
        bgImage: "/images/slide_agent_bg.png",
        metrics: [
          { value: "80%+", label: "Task Automation" },
          { value: "Autonomous", label: "Decision-Making" },
          { value: "Multi-Tool", label: "Integrations" },
        ],
        tags: ["LangGraph", "CrewAI", "MCP Tool-Calling"],
        accentColor: "#a78bfa",
        accentGlow: "rgba(167,139,250,0.22)",
        accentBorder: "rgba(167,139,250,0.4)",
        icon: Cpu,
      },
      {
        attn: "Finance & AI Ops",
        role: "AI Finance & Operations",
        problem: "Out-of-control API and token costs are bleeding your AI budget dry every month.",
        outcome: "We slash cost-per-token by 40–60% via semantic caching and intelligent small-model routing.",
        cta: "Reduce My Token Costs",
        bgImage: "/images/generative_ai.png",
        metrics: [
          { value: "40–60%", label: "Token Cost Cut" },
          { value: "Semantic", label: "Caching Layer" },
          { value: "Smart", label: "Model Routing" },
        ],
        tags: ["Token Optimization", "Semantic Cache", "Model Routing"],
        accentColor: "#34d399",
        accentGlow: "rgba(52,211,153,0.22)",
        accentBorder: "rgba(52,211,153,0.4)",
        icon: TrendingUp,
      },
      {
        attn: "ML Teams",
        role: "Machine Learning Teams",
        problem: "Full-parameter training is prohibitively expensive and slow for your domain-specific needs.",
        outcome: "We adapt foundational models with advanced LoRA/PEFT, cutting training compute costs by 80–90% with zero accuracy loss.",
        cta: "Explore Efficient Fine-Tuning",
        bgImage: "/images/slide_llm_bg.png",
        metrics: [
          { value: "80–90%", label: "Compute Savings" },
          { value: "Zero", label: "Accuracy Loss" },
          { value: "LoRA/PEFT", label: "Expert Tuning" },
        ],
        tags: ["LoRA", "PEFT", "DPO Fine-Tuning"],
        accentColor: "#60a5fa",
        accentGlow: "rgba(96,165,250,0.22)",
        accentBorder: "rgba(96,165,250,0.4)",
        icon: Activity,
      },
      {
        attn: "Compliance Officers",
        role: "Regulatory & Compliance",
        problem: "Your LLMs generate false or hallucinated information in regulated environments—legal and reputational suicide.",
        outcome: "We implement architecture-level guardrails reducing hallucination rates in high-stakes queries by 60–80%.",
        cta: "Stop AI Hallucinations",
        bgImage: "/images/slide_security_bg.png",
        metrics: [
          { value: "60–80%", label: "Fewer Hallucinations" },
          { value: "Audit-Ready", label: "XAI Reports" },
          { value: "HIPAA/GDPR", label: "Compliant" },
        ],
        tags: ["Guardrails", "XAI", "Compliance AI"],
        accentColor: "#f87171",
        accentGlow: "rgba(248,113,113,0.22)",
        accentBorder: "rgba(248,113,113,0.4)",
        icon: Shield,
      },
      {
        attn: "Tech Strategists",
        role: "Technology Strategy",
        problem: "Rigid, text-only models limit your product's market capabilities and user experience.",
        outcome: "We integrate seamless multi-modal routing processing text, audio, and vision with <100ms overhead.",
        cta: "Integrate Multi-Modal AI",
        bgImage: "/images/agentic_ai.png",
        metrics: [
          { value: "< 100ms", label: "Modal Overhead" },
          { value: "Text + Audio", label: "+ Vision" },
          { value: "Unified", label: "Routing Layer" },
        ],
        tags: ["Multi-Modal AI", "Vision Models", "Audio AI"],
        accentColor: "#f472b6",
        accentGlow: "rgba(244,114,182,0.22)",
        accentBorder: "rgba(244,114,182,0.4)",
        icon: TrendingUp,
      },
      {
        attn: "NLP Engineers",
        role: "Natural Language Processing",
        problem: "You hit hard limits on how much context your models can actually process and utilize effectively.",
        outcome: "We engineer efficient extended context increasing effective utilization by 2x–4x without exponential memory drain.",
        cta: "Optimize My Context Windows",
        bgImage: "/images/slide_llm_bg.png",
        metrics: [
          { value: "2×–4×", label: "Context Utilization" },
          { value: "Zero", label: "Memory Drain" },
          { value: "128K+", label: "Token Windows" },
        ],
        tags: ["Long Context", "FlashAttention", "RoPE Scaling"],
        accentColor: "#fbbf24",
        accentGlow: "rgba(251,191,36,0.22)",
        accentBorder: "rgba(251,191,36,0.4)",
        icon: Cpu,
      },
      {
        attn: "Software Engineers",
        role: "AI Application Development",
        problem: "Unpredictable, unstructured LLM outputs constantly break your downstream application APIs.",
        outcome: "We enforce strict JSON/XML schemas achieving 100% schema compliance, eliminating API-breaking errors forever.",
        cta: "Engineer Structured Outputs",
        bgImage: "/images/generative_ai.png",
        metrics: [
          { value: "100%", label: "Schema Compliance" },
          { value: "Zero", label: "API-Breaking Errors" },
          { value: "JSON/XML", label: "Guaranteed Output" },
        ],
        tags: ["Structured Outputs", "Outlines", "Schema Enforcement"],
        accentColor: "#818cf8",
        accentGlow: "rgba(99,102,241,0.22)",
        accentBorder: "rgba(129,140,248,0.4)",
        icon: Activity,
      },
    ],
  },
  security: {
    optimizedFor: "AI Security, Adversarial Defense, LLM Firewall, Confidential Computing, Zero-Trust AI",
    slides: [
      {
        attn: "CISOs",
        role: "Information Security Leadership",
        problem: "Your AI models act as a wide-open, unprotected attack surface for sophisticated bad actors.",
        outcome: "We deploy a comprehensive adversarial defense strategy reducing your exploitable AI attack surface by 90%+.",
        cta: "Schedule an AI Threat Model",
        bgImage: "/images/slide_security_bg.png",
        metrics: [
          { value: "90%+", label: "Attack Surface Cut" },
          { value: "360°", label: "Threat Coverage" },
          { value: "Real-Time", label: "Defense Layer" },
        ],
        tags: ["Adversarial Defense", "Threat Modeling", "Zero-Trust AI"],
        accentColor: "#34d399",
        accentGlow: "rgba(52,211,153,0.22)",
        accentBorder: "rgba(52,211,153,0.4)",
        icon: Shield,
      },
      {
        attn: "Security Architects",
        role: "Security Architecture",
        problem: "Malicious users easily manipulate your customer-facing bots through prompt injection attacks.",
        outcome: "We deploy impenetrable LLM firewalls blocking 99% of injection attempts in real-time with <5ms latency overhead.",
        cta: "Deploy LLM Firewalls",
        bgImage: "/images/slide_security_bg.png",
        metrics: [
          { value: "99%", label: "Injections Blocked" },
          { value: "< 5ms", label: "Latency Overhead" },
          { value: "Real-Time", label: "LLM Firewall" },
        ],
        tags: ["LLM Firewall", "Prompt Injection", "API Security"],
        accentColor: "#f87171",
        accentGlow: "rgba(248,113,113,0.22)",
        accentBorder: "rgba(248,113,113,0.4)",
        icon: Shield,
      },
      {
        attn: "Privacy Officers",
        role: "Privacy & Data Protection",
        problem: "Sensitive raw data is exposed in plain text during the AI inference process—GDPR/HIPAA nightmare.",
        outcome: "We process data in fully encrypted memory (TEEs) ensuring 100% data privacy during inference with <10% performance hit.",
        cta: "Explore Confidential Computing",
        bgImage: "/images/slide_security_bg.png",
        metrics: [
          { value: "100%", label: "Data Privacy" },
          { value: "< 10%", label: "Perf Overhead" },
          { value: "TEE-Based", label: "Encrypted Memory" },
        ],
        tags: ["Confidential Computing", "TEE", "GDPR/HIPAA"],
        accentColor: "#818cf8",
        accentGlow: "rgba(99,102,241,0.22)",
        accentBorder: "rgba(129,140,248,0.4)",
        icon: Shield,
      },
      {
        attn: "IP Counsel & CTOs",
        role: "IP Strategy & Technology",
        problem: "Competitors or attackers are stealing or reverse-engineering your proprietary, million-dollar models.",
        outcome: "We protect your AI IP with cryptographic watermarking guaranteeing 99.9% extraction accuracy for legal proof of ownership.",
        cta: "Secure My Model IP",
        bgImage: "/images/slide_security_bg.png",
        metrics: [
          { value: "99.9%", label: "Extraction Accuracy" },
          { value: "Crypto", label: "Watermarking" },
          { value: "Legal", label: "Proof of Ownership" },
        ],
        tags: ["Model Watermarking", "IP Protection", "Crypto Security"],
        accentColor: "#fbbf24",
        accentGlow: "rgba(251,191,36,0.22)",
        accentBorder: "rgba(251,191,36,0.4)",
        icon: Shield,
      },
      {
        attn: "DevSecOps",
        role: "DevSecOps Engineering",
        problem: "Hidden malware and backdoors lurk in your third-party HuggingFace and open-source models.",
        outcome: "We scan and clear your AI supply chain 10x faster, eliminating 99% of known dependency risks pre-deployment.",
        cta: "Audit My AI Dependencies",
        bgImage: "/images/slide_security_bg.png",
        metrics: [
          { value: "10×", label: "Scan Speed" },
          { value: "99%", label: "Risk Eliminated" },
          { value: "Pre-Deploy", label: "Clearance" },
        ],
        tags: ["Supply Chain Security", "Model Scanning", "OSS Audit"],
        accentColor: "#fb923c",
        accentGlow: "rgba(251,146,60,0.22)",
        accentBorder: "rgba(251,146,60,0.4)",
        icon: Shield,
      },
      {
        attn: "Legal & Compliance",
        role: "Legal & Regulatory Affairs",
        problem: "You risk massive regulatory fines if adversaries reconstruct private data from your model outputs.",
        outcome: "We implement mathematical differential privacy ensuring zero-exposure compliance with HIPAA/GDPR data extraction laws.",
        cta: "Implement Differential Privacy",
        bgImage: "/images/slide_security_bg.png",
        metrics: [
          { value: "Zero", label: "Data Exposure" },
          { value: "HIPAA + GDPR", label: "Compliant" },
          { value: "DP Math", label: "Guaranteed" },
        ],
        tags: ["Differential Privacy", "GDPR", "HIPAA Compliance"],
        accentColor: "#4ade80",
        accentGlow: "rgba(74,222,128,0.22)",
        accentBorder: "rgba(74,222,128,0.4)",
        icon: Shield,
      },
      {
        attn: "Network Security",
        role: "Network & API Security",
        problem: "You extend blind trust to ML API endpoints without proper authorization or encryption.",
        outcome: "We build a zero-trust AI architecture authenticating and encrypting 100% of inference traffic end-to-end.",
        cta: "Build a Zero-Trust AI API",
        bgImage: "/images/slide_security_bg.png",
        metrics: [
          { value: "100%", label: "Traffic Encrypted" },
          { value: "Zero-Trust", label: "Every Request" },
          { value: "mTLS", label: "Enforced" },
        ],
        tags: ["Zero-Trust", "mTLS", "API Security"],
        accentColor: "#60a5fa",
        accentGlow: "rgba(96,165,250,0.22)",
        accentBorder: "rgba(96,165,250,0.4)",
        icon: Shield,
      },
      {
        attn: "Risk Managers",
        role: "Enterprise Risk Management",
        problem: "You deploy neural networks with unknown adversarial vulnerabilities into production—playing Russian roulette.",
        outcome: "We proactively red-team your models identifying and patching 85%+ of hidden vulnerabilities before they go live.",
        cta: "Hire an AI Red Team",
        bgImage: "/images/slide_security_bg.png",
        metrics: [
          { value: "85%+", label: "Vulns Found Pre-Live" },
          { value: "Red Team", label: "Expert Attack Sims" },
          { value: "Patch-First", label: "Policy" },
        ],
        tags: ["Red Teaming", "Adversarial ML", "Vulnerability Assessment"],
        accentColor: "#f472b6",
        accentGlow: "rgba(244,114,182,0.22)",
        accentBorder: "rgba(244,114,182,0.4)",
        icon: Shield,
      },
    ],
  },
  infrastructure: {
    optimizedFor: "LLMOps, MLOps, GPU-Direct Storage, K8s for AI, Vector DB, AI FinOps",
    slides: [
      {
        attn: "VP of Engineering",
        role: "Engineering Leadership",
        problem: "Your legacy MLOps stacks crumble under the weight, speed, and scale of LLM workloads.",
        outcome: "We build modern LLMOps pipelines cutting model deployment cycles from weeks to hours with 99% automation.",
        cta: "Modernize My AI Pipeline",
        bgImage: "/images/hero_infrastructure.png",
        metrics: [
          { value: "Weeks → Hours", label: "Deploy Cycle" },
          { value: "99%", label: "Automated" },
          { value: "LLMOps", label: "Native Stack" },
        ],
        tags: ["LLMOps", "MLflow", "CI/CD for AI"],
        accentColor: "#818cf8",
        accentGlow: "rgba(99,102,241,0.22)",
        accentBorder: "rgba(129,140,248,0.4)",
        icon: Activity,
      },
      {
        attn: "Data Center Executives",
        role: "Data Center Operations",
        problem: "Your GW-scale AI compute growth outpaces power grid capacity and sustainability targets.",
        outcome: "We implement carbon-aware scheduling and DVFS tuning reducing campus power draw by 15–30% without compute loss.",
        cta: "Optimize My Energy Footprint",
        bgImage: "/images/slide_gpu_infra_bg.png",
        metrics: [
          { value: "15–30%", label: "Power Reduction" },
          { value: "Carbon-Aware", label: "Scheduling" },
          { value: "Zero", label: "Compute Loss" },
        ],
        tags: ["Carbon Scheduling", "DVFS", "Green AI"],
        accentColor: "#4ade80",
        accentGlow: "rgba(74,222,128,0.22)",
        accentBorder: "rgba(74,222,128,0.4)",
        icon: Shield,
      },
      {
        attn: "Storage Engineers",
        role: "Storage & I/O Engineering",
        problem: "Slow storage I/O starves your multi-billion-parameter models during training checkpoints.",
        outcome: "We bypass legacy file systems with GPU-Direct Storage, accelerating checkpointing and data loading by 5x–10x.",
        cta: "Accelerate My Data I/O",
        bgImage: "/images/ai_infra.png",
        metrics: [
          { value: "5×–10×", label: "I/O Acceleration" },
          { value: "GPU-Direct", label: "Storage Bypass" },
          { value: "Zero", label: "Checkpoint Lag" },
        ],
        tags: ["GPU-Direct Storage", "GDS", "RDMA"],
        accentColor: "#60a5fa",
        accentGlow: "rgba(96,165,250,0.22)",
        accentBorder: "rgba(96,165,250,0.4)",
        icon: Cpu,
      },
      {
        attn: "Infrastructure Leads",
        role: "AI Infrastructure",
        problem: "Clunky model partitioning destroys inference speed and wastes precious memory resources.",
        outcome: "We tune unified memory architectures reducing memory fragmentation by 40–60%, fitting larger batches on fewer GPUs.",
        cta: "Optimize GPU Memory Now",
        bgImage: "/images/gpu_cluster_1_1781677642098.png",
        metrics: [
          { value: "40–60%", label: "Less Fragmentation" },
          { value: "Larger", label: "Batch Sizes" },
          { value: "Fewer", label: "GPUs Needed" },
        ],
        tags: ["Unified Memory", "Model Sharding", "Batch Optimization"],
        accentColor: "#a78bfa",
        accentGlow: "rgba(167,139,250,0.22)",
        accentBorder: "rgba(167,139,250,0.4)",
        icon: Activity,
      },
      {
        attn: "Platform Ops",
        role: "Platform Operations",
        problem: "Standard Kubernetes fails to orchestrate distributed AI training and GPU scheduling effectively.",
        outcome: "We deploy AI-native K8s operators (KubeRay/TorchElastic) achieving 95%+ cluster utilization during massive training runs.",
        cta: "Deploy K8s for AI",
        bgImage: "/images/hero_infrastructure.png",
        metrics: [
          { value: "95%+", label: "Cluster Utilization" },
          { value: "KubeRay", label: "Operator Deployed" },
          { value: "Auto-Scale", label: "Training Jobs" },
        ],
        tags: ["KubeRay", "TorchElastic", "K8s for AI"],
        accentColor: "#fb923c",
        accentGlow: "rgba(251,146,60,0.22)",
        accentBorder: "rgba(251,146,60,0.4)",
        icon: Cpu,
      },
      {
        attn: "Data Architects",
        role: "Data & Vector Architecture",
        problem: "Your vector databases choke, lag, and timeout under enterprise RAG traffic loads.",
        outcome: "We architect hyper-available vector infrastructure capable of sub-millisecond (<5ms) retrieval at 10,000+ QPS.",
        cta: "Scale My Vector DB",
        bgImage: "/images/long_memory.png",
        metrics: [
          { value: "< 5ms", label: "Vector Retrieval" },
          { value: "10K+ QPS", label: "Query Throughput" },
          { value: "99.99%", label: "Availability" },
        ],
        tags: ["pgvector", "Qdrant", "Weaviate"],
        accentColor: "#34d399",
        accentGlow: "rgba(52,211,153,0.22)",
        accentBorder: "rgba(52,211,153,0.4)",
        icon: Activity,
      },
      {
        attn: "Systems Architects",
        role: "Distributed Systems Architecture",
        problem: "Tightly coupled AI systems cause massive cascade failures when one node drops.",
        outcome: "We design event-driven microservices isolating failures instantly, preventing 99% of cascade crashes.",
        cta: "Design Event-Driven AI",
        bgImage: "/images/ai_infra.png",
        metrics: [
          { value: "99%", label: "Cascade Prevention" },
          { value: "Event-Driven", label: "Architecture" },
          { value: "Instant", label: "Failure Isolation" },
        ],
        tags: ["Event-Driven", "Kafka", "Microservices"],
        accentColor: "#fbbf24",
        accentGlow: "rgba(251,191,36,0.22)",
        accentBorder: "rgba(251,191,36,0.4)",
        icon: Shield,
      },
      {
        attn: "Finance & Cloud Ops",
        role: "AI FinOps & Cloud Operations",
        problem: "You waste millions on idle, unoptimized, un-terminated cloud GPU instances every quarter.",
        outcome: "We implement serverless GPU provisioning and auto-scaling eliminating 30–50% of cloud GPU waste, saving millions annually.",
        cta: "Run an AI FinOps Audit",
        bgImage: "/images/slide_enterprise_bg.png",
        metrics: [
          { value: "30–50%", label: "GPU Waste Cut" },
          { value: "$M+", label: "Annual Savings" },
          { value: "Serverless", label: "GPU Scaling" },
        ],
        tags: ["AI FinOps", "Spot Instances", "Auto-Scaling"],
        accentColor: "#f472b6",
        accentGlow: "rgba(244,114,182,0.22)",
        accentBorder: "rgba(244,114,182,0.4)",
        icon: TrendingUp,
      },
    ],
  },
  reliability: {
    optimizedFor: "LLM Observability, Model Drift Detection, Self-Healing Pipelines, AI Chaos Engineering, XAI",
    slides: [
      {
        attn: "SRE Leads",
        role: "Site Reliability Engineering",
        problem: "You operate AI in production completely blind, unable to trace why it makes bad decisions.",
        outcome: "We implement total LLM observability with token-level tracing, cutting root-cause debug time by 80%.",
        cta: "Implement LLM Observability",
        bgImage: "/images/hero_infrastructure.png",
        metrics: [
          { value: "80%", label: "Faster Debug" },
          { value: "Token-Level", label: "Tracing" },
          { value: "Full-Stack", label: "Observability" },
        ],
        tags: ["LLM Tracing", "Prometheus", "LangSmith"],
        accentColor: "#818cf8",
        accentGlow: "rgba(99,102,241,0.22)",
        accentBorder: "rgba(129,140,248,0.4)",
        icon: Activity,
      },
      {
        attn: "ML Ops Managers",
        role: "ML Operations Management",
        problem: "Silent model drift degrades accuracy, costing customer trust before anyone notices the bleed.",
        outcome: "We deploy real-time statistical detection catching data drift 24–48 hours before it impacts business metrics.",
        cta: "Deploy Drift Detection",
        bgImage: "/images/slide_llm_bg.png",
        metrics: [
          { value: "24–48h", label: "Early Warning" },
          { value: "Real-Time", label: "Statistical Tests" },
          { value: "Auto", label: "Rollback Triggers" },
        ],
        tags: ["Drift Detection", "Evidently AI", "Statistical Testing"],
        accentColor: "#60a5fa",
        accentGlow: "rgba(96,165,250,0.22)",
        accentBorder: "rgba(96,165,250,0.4)",
        icon: Activity,
      },
      {
        attn: "DevOps Directors",
        role: "DevOps & Platform Engineering",
        problem: "Your team manually firefights degrading AI accuracy instead of shipping new features.",
        outcome: "We build automated, self-healing CI/CD pipelines reducing model degradation recovery time from days to <15 minutes.",
        cta: "Build Self-Healing Pipelines",
        bgImage: "/images/ai_infra.png",
        metrics: [
          { value: "Days → 15min", label: "Recovery Time" },
          { value: "Self-Healing", label: "CI/CD" },
          { value: "Zero", label: "Manual Firefighting" },
        ],
        tags: ["Self-Healing", "ArgoCD", "Auto-Remediation"],
        accentColor: "#34d399",
        accentGlow: "rgba(52,211,153,0.22)",
        accentBorder: "rgba(52,211,153,0.4)",
        icon: Shield,
      },
      {
        attn: "Resilience Engineers",
        role: "AI Resilience Engineering",
        problem: "You live in fear of multi-node AI systems breaking unpredictably under high load.",
        outcome: "We run proactive AI chaos engineering proving your system survives 95%+ of simulated node and network failures.",
        cta: "Engineer AI Chaos Resilience",
        bgImage: "/images/slide_gpu_infra_bg.png",
        metrics: [
          { value: "95%+", label: "Failure Survival" },
          { value: "Proactive", label: "Chaos Tests" },
          { value: "Proven", label: "Resilience" },
        ],
        tags: ["Chaos Engineering", "LitmusChaos", "Fault Injection"],
        accentColor: "#fb923c",
        accentGlow: "rgba(251,146,60,0.22)",
        accentBorder: "rgba(251,146,60,0.4)",
        icon: Shield,
      },
      {
        attn: "Business Stakeholders",
        role: "Business & Executive Leadership",
        problem: "Vague AI performance guarantees create massive, unquantified business risk.",
        outcome: "We enforce strict, measurable AI SLAs backed by automated circuit breakers, keeping error rates below 0.01%.",
        cta: "Define AI SLAs/SLOs",
        bgImage: "/images/slide_enterprise_bg.png",
        metrics: [
          { value: "< 0.01%", label: "Error Rate" },
          { value: "Enforced", label: "SLA/SLO" },
          { value: "Auto", label: "Circuit Breakers" },
        ],
        tags: ["SLA Enforcement", "Circuit Breakers", "Error Budgets"],
        accentColor: "#fbbf24",
        accentGlow: "rgba(251,191,36,0.22)",
        accentBorder: "rgba(251,191,36,0.4)",
        icon: TrendingUp,
      },
      {
        attn: "QA Directors",
        role: "Quality Assurance Leadership",
        problem: "Unseen edge cases in your AI cause catastrophic, public-facing production failures.",
        outcome: "We safely stress-test your AI discovering 5x more edge-case failures than traditional testing methods.",
        cta: "Stress Test My AI",
        bgImage: "/images/hero_infrastructure.png",
        metrics: [
          { value: "5×", label: "More Edge Cases" },
          { value: "Safe", label: "Stress Testing" },
          { value: "Pre-Prod", label: "Coverage" },
        ],
        tags: ["AI Stress Testing", "Edge Case Mining", "Adversarial QA"],
        accentColor: "#a78bfa",
        accentGlow: "rgba(167,139,250,0.22)",
        accentBorder: "rgba(167,139,250,0.4)",
        icon: Activity,
      },
      {
        attn: "Data Governance",
        role: "Data Governance & Quality",
        problem: "Upstream data poisoning silently corrupts your models without triggering a single alarm.",
        outcome: "We deploy impenetrable validation frameworks blocking 99.9% of poisoned or anomalous data before training begins.",
        cta: "Secure My Data Quality",
        bgImage: "/images/long_memory.png",
        metrics: [
          { value: "99.9%", label: "Poison Blocked" },
          { value: "Pre-Train", label: "Validation" },
          { value: "Continuous", label: "Data Auditing" },
        ],
        tags: ["Data Validation", "Anomaly Detection", "Data Lineage"],
        accentColor: "#4ade80",
        accentGlow: "rgba(74,222,128,0.22)",
        accentBorder: "rgba(74,222,128,0.4)",
        icon: Shield,
      },
      {
        attn: "Compliance & Legal",
        role: "Legal & Compliance Affairs",
        problem: '"Black box" AI models block your regulatory approval and internal audits.',
        outcome: "We implement Explainable AI (XAI) generating automated, audit-ready reports for 100% of AI decisions.",
        cta: "Implement XAI Frameworks",
        bgImage: "/images/slide_security_bg.png",
        metrics: [
          { value: "100%", label: "Decision Audited" },
          { value: "Auto", label: "XAI Reports" },
          { value: "Regulator", label: "Ready" },
        ],
        tags: ["XAI", "SHAP/LIME", "Audit Trails"],
        accentColor: "#f87171",
        accentGlow: "rgba(248,113,113,0.22)",
        accentBorder: "rgba(248,113,113,0.4)",
        icon: Shield,
      },
    ],
  },
};

export interface SlideData {
  badge: string;
  title: string;
  highlight: string;
  titleEnd?: string;
  description: string;
  image: string;
  icp?: string;
  outcome?: string;
  cta?: string;
}

const GPU_IMAGES = [
  "/images/gpu_h100_cluster.png",
  "/images/gpu_silicon_die.png",
  "/images/gpu_liquid_cooled_server.png",
  "/images/gpu_interconnect_mesh.png",
  "/images/gpu_cluster_1_1781677642098.png",
  "/images/gpu_cluster_2_1781677654723.png",
  "/images/gpu_server_rack_1781677667839.png",
  "/images/ai_processor_node_1781677682371.png",
];

// Map old slides format to the new specifications dynamically
function getSlidesForType(type: string): SlideData[] {
  const data = slidersData[type];
  if (!data) return [];

  return data.slides.map((slide, idx) => {
    let title = "Accelerating ";
    let highlight = slide.role;
    let titleEnd = " for Enterprise AI";

    const roleLower = slide.role.toLowerCase();
    const attnLower = slide.attn.toLowerCase();

    if (roleLower.includes("financial") || roleLower.includes("cfo")) {
      title = "Maximizing ";
      highlight = "GPU ROI & Compute";
      titleEnd = " Efficiency";
    } else if (roleLower.includes("high-performance") || roleLower.includes("hpc")) {
      title = "Super-Scaling ";
      highlight = "HPC Interconnects";
      titleEnd = " & Fabrics";
    } else if (roleLower.includes("learning") || roleLower.includes("ml")) {
      title = "Optimizing ";
      highlight = "Tensor & Pipeline";
      titleEnd = " Throughput";
    } else if (roleLower.includes("security") || roleLower.includes("cyber") || attnLower.includes("ciso")) {
      title = "Hardening ";
      highlight = "Zero-Trust Security";
      titleEnd = " for Production AI";
    } else if (roleLower.includes("reliability") || roleLower.includes("sre")) {
      title = "Engineering ";
      highlight = "Self-Healing AI";
      titleEnd = " Infrastructure";
    } else if (roleLower.includes("ops") || roleLower.includes("operations")) {
      title = "Eliminating ";
      highlight = "Compute & GPU Waste";
      titleEnd = " at Scale";
    } else if (roleLower.includes("data center")) {
      title = "Designing ";
      highlight = "Carbon-Aware AI";
      titleEnd = " Campuses";
    } else if (roleLower.includes("product")) {
      title = "Reducing ";
      highlight = "Inference Latency";
      titleEnd = " & Token Costs";
    } else if (roleLower.includes("research")) {
      title = "Customizing ";
      highlight = "CUDA & Triton";
      titleEnd = " Kernels";
    } else if (roleLower.includes("compliance") || roleLower.includes("legal")) {
      title = "Deploying ";
      highlight = "Explainable AI";
      titleEnd = " with Guardrails";
    } else if (roleLower.includes("governance") || roleLower.includes("privacy")) {
      title = "Securing ";
      highlight = "Differential Privacy";
      titleEnd = " & Data Quality";
    }

    const gpuImage = GPU_IMAGES[idx % GPU_IMAGES.length];

    return {
      badge: slide.role,
      title: title,
      highlight: highlight,
      titleEnd: titleEnd,
      description: slide.problem,
      image: gpuImage,
      icp: slide.attn,
      outcome: slide.outcome,
      cta: slide.cta,
    };
  });
}

// Animation variants
const bgVariants: Variants = {
  enter: { scale: 1.08, opacity: 0 },
  center: { scale: 1, opacity: 1, transition: { duration: 1.0, ease: "easeOut" } },
  exit: { scale: 0.98, opacity: 0, transition: { duration: 0.6 } },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function HeroSlider({
  type,
  slides: customSlides,
}: {
  type: "home" | "gpu" | "llm" | "security" | "infrastructure" | "reliability";
  slides?: SlideData[];
}) {
  const slides = customSlides || getSlidesForType(type);
  const slideCount = slides.length;

  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (slideCount === 0) return;
    if (isHovered) return; // Pause on Hover

    const intervalTime = 5500; // 5.5 seconds
    const stepTime = 50; // update progress every 50ms
    let elapsed = (progress / 100) * intervalTime;

    const timer = setInterval(() => {
      elapsed += stepTime;
      const currentProgress = Math.min((elapsed / intervalTime) * 100, 100);
      setProgress(currentProgress);

      if (elapsed >= intervalTime) {
        setIndex((prevIndex) => (prevIndex + 1) % slideCount);
        setProgress(0);
        elapsed = 0;
      }
    }, stepTime);

    return () => {
      clearInterval(timer);
    };
  }, [isHovered, index, slideCount]);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + slideCount) % slideCount);
    setProgress(0);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % slideCount);
    setProgress(0);
  };

  const handleDotClick = (idx: number) => {
    setIndex(idx);
    setProgress(0);
  };

  if (slideCount === 0) return null;

  const slide = slides[index];

  return (
    <section
      className="relative w-full overflow-hidden bg-white select-none min-h-[85dvh]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Neural node canvas backdrop */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <NeuralBackground density={40} />
      </div>

      {/* Background Carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={index}
            variants={bgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover object-center opacity-30 filter grayscale-[10%]"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gradient Masks */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" />

      {/* Decorative Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,82,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,82,255,0.012)_1px,transparent_1px)] bg-[size:4rem_4rem] z-10 pointer-events-none" />

      {/* Slide Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="container mx-auto px-6 relative z-20 text-left max-w-6xl w-full flex flex-col justify-center min-h-[85dvh] pt-28 pb-24"
        >
          {/* Badges / ICP */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-4 py-2 bg-slate-100/90 border border-slate-200 text-xs font-extrabold tracking-[0.2em] uppercase text-slate-700 rounded-full">
              {slide.badge}
            </span>
            {slide.icp && (
              <span className="px-4 py-2 bg-blue-50/90 border border-blue-100 text-xs font-extrabold tracking-[0.2em] uppercase text-blue-700 rounded-full">
                ICP: {slide.icp}
              </span>
            )}
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.12] tracking-tight mb-6"
          >
            {slide.title}
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              {" "}{slide.highlight}{" "}
            </span>
            {slide.titleEnd}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl font-sans leading-relaxed font-medium mb-8"
          >
            {slide.description}
          </motion.p>

          {/* Outcome Tag */}
          {slide.outcome && (
            <motion.div variants={itemVariants} className="flex mb-8">
              <div className="px-5 py-2.5 bg-emerald-50/90 border border-emerald-200/60 text-emerald-800 rounded-2xl text-xs sm:text-sm font-bold shadow-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>{slide.outcome}</span>
              </div>
            </motion.div>
          )}

          {/* CTA Button */}
          {slide.cta && (
            <motion.div variants={itemVariants} className="flex">
              <Link
                to="/contact"
                search={{ subject: `Strategy Session: ${slide.icp || slide.badge}`, cta: slide.cta }}
              >
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] duration-300 bg-[length:200%_200%] animate-gradient-flow cursor-pointer">
                  {slide.cta}
                </button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Manual Dots Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`rounded-full transition-all duration-300 ${
              idx === index
                ? "w-8 h-2 bg-blue-600 shadow-sm"
                : "w-2 h-2 bg-slate-300/80 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Manual Chevron Controls */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center gap-3">
        <button
          onClick={handlePrev}
          className="p-3.5 bg-white/90 hover:bg-white border border-slate-200 text-slate-800 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 duration-200"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={handleNext}
          className="p-3.5 bg-white/90 hover:bg-white border border-slate-200 text-slate-800 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 duration-200"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 z-30 pointer-events-none">
        <div
          className="h-full bg-blue-600 transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
}
