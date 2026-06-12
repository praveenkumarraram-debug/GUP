import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CTA } from "@/components/site/CTA";
import { CaseStudies } from "@/components/site/CaseStudies";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Cpu, 
  Layers, 
  Server, 
  TrendingUp, 
  Workflow, 
  Shield, 
  Activity, 
  Clock, 
  Settings, 
  CheckCircle2,
  Database,
  Network,
  Thermometer,
  ArrowRight,
  Filter
} from "lucide-react";

export const Route = createFileRoute("/use-cases")({
  component: UseCasesPage,
});

// ─── Interfaces ────────────────────────────────────────────────────────────────

interface TechStackItem {
  name: string;
  category: string;
}

interface CapabilityItem {
  title: string;
  description: string;
}

interface OutcomeItem {
  title: string;
  metric: string;
  description: string;
}

interface TimelinePhase {
  phase: string;
  duration: string;
  title: string;
  details: string;
}

interface MetricSummaryItem {
  label: string;
  value: string;
  sublabel: string;
}

interface UseCase {
  id: string;
  title: string;
  category: string;
  tagline: string;
  challengeBrief: string;
  challengeDetailed1: string;
  challengeDetailed2: string;
  solutionBrief: string;
  solutionDetailed1: string;
  solutionDetailed2: string;
  hardwareConfig: string[];
  techStack: TechStackItem[];
  capabilities: CapabilityItem[];
  outcomes: OutcomeItem[];
  timeline: TimelinePhase[];
  metricsSummary: MetricSummaryItem[];
}

interface CybersecurityUseCase {
  id: number;
  title: string;
  subCategory: string;
  description: string;
  businessValue: string;
  solution: string;
  expectedOutcome: string;
  kpis: string;
}

// ─── Dataset ───────────────────────────────────────────────────────────────────

const useCasesData: UseCase[] = [
  {
    id: "sovereign-ai",
    title: "Sovereign AI Initiatives",
    category: "Infrastructure & Scaling",
    tagline: "National-scale private cloud compute fabrics running air-gapped workloads.",
    challengeBrief: "National-scale AI infrastructure projects require deploying 10,000+ GPUs with absolute data sovereignty, high compute availability, and local regulatory alignment. Public clouds introduce security compliance gaps and lock-in risks.",
    challengeDetailed1: "Nation-states must build independent AI capabilities on private compute — often 10,000+ enterprise GPUs — while guaranteeing zero cross-border data pathways and full compliance with domestic security and defense-grade classification standards.",
    challengeDetailed2: "At this scale, networking becomes a critical bottleneck. Standard commercial software introduces scheduling overhead and cannot prevent thermal throttling, load imbalances, or cluster-wide outages that erase days of training progress.",
    solutionBrief: "We engineered private-cloud, containerized AI training and inference fabrics deployed on-premise with custom non-blocking InfiniBand topologies and RDMA over Converged Ethernet (RoCE v2).",
    solutionDetailed1: "We built a fully air-gapped sovereign AI platform on bare-metal with custom-designed Clos network topology and RDMA over RoCE v2 — enabling direct GPU-to-GPU memory access with zero CPU overhead and zero packet loss during gradient synchronization.",
    solutionDetailed2: "A proprietary DCGM telemetry system polls hardware every 50ms, hot-swapping failing nodes before training loss. Local NVMe caches attached directly to compute nodes deliver sub-microsecond dataset access with no dependency on remote storage.",
    hardwareConfig: [
      "10,240x NVIDIA Blackwell B200 GPUs in custom liquid-cooled server enclosures",
      "Non-blocking Clos network topology with 800Gb/s InfiniBand links",
      "GPUDirect RDMA over RoCE v2 with custom high-speed switches",
      "Liquid-cooled datacenter cabinets with closed smart cooling loops",
      "Air-gapped on-premise storage arrays (100 PB+ high-throughput NVMe)"
    ],
    techStack: [
      { name: "Slurm Scheduler", category: "Orchestration" },
      { name: "Kubernetes / K3s", category: "Containerization" },
      { name: "NVIDIA DCGM SDK", category: "Telemetry" },
      { name: "InfiniBand / RDMA", category: "Networking" },
      { name: "PyTorch Distributed", category: "Framework" },
      { name: "gVisor Runtimes", category: "Security" }
    ],
    capabilities: [
      {
        title: "Air-gapped boundary isolation",
        description: "Complete isolation of physical compute resources with cryptographically signed software boundaries and zero external internet egress pathways."
      },
      {
        title: "Zero-drop Clos network fabric",
        description: "A non-blocking network architecture delivering high-throughput, low-latency inter-node communication specifically tuned for distributed LLM training."
      },
      {
        title: "Self-healing DCGM telemetry",
        description: "Custom monitoring agents using NVIDIA DCGM APIs to predict GPU hardware failures and dynamically hot-swap nodes without training interruption."
      },
      {
        title: "Dynamic thermal-aware scheduling",
        description: "Workload orchestrator that automatically redistributes active training workloads based on rack-level thermal profiles and PUE cooling metrics."
      }
    ],
    outcomes: [
      {
        title: "Scaling training efficiency",
        metric: "95%+",
        description: "Sustained near-linear scaling performance for 70B+ parameter model training runs across thousands of distributed nodes."
      },
      {
        title: "Carbon footprint reduction",
        metric: "30%",
        description: "Optimized liquid cooling strategies and dynamic load allocation reduced overall datacenter Power Usage Effectiveness (PUE) to 1.12."
      },
      {
        title: "Data protection verification",
        metric: "0% Leaks",
        description: "Independent national security audits confirmed absolute separation of sovereign state records and model weights."
      },
      {
        title: "Compute cluster availability",
        metric: "99.99%",
        description: "Minimized downtime through automated node recovery, decreasing epoch restart loss from days to under 60 seconds."
      }
    ],
    timeline: [
      {
        phase: "Phase 1",
        duration: "4 Weeks",
        title: "Architecture & Threat Modeling",
        details: "Conduct physical site audits, design network topologies, and model sovereign security threat vectors."
      },
      {
        phase: "Phase 2",
        duration: "8 Weeks",
        title: "Bare-Metal Cluster Setup",
        details: "Provision compute racks, install custom liquid-cooling loops, and establish InfiniBand Clos fabrics."
      },
      {
        phase: "Phase 3",
        duration: "4 Weeks",
        title: "Hardened OS & Scheduler Deploys",
        details: "Install hardened Linux kernels, set up Slurm partitions, and deploy DCGM telemetry agents."
      },
      {
        phase: "Phase 4",
        duration: "4 Weeks",
        title: "Training Validation & Go-Live",
        details: "Execute benchmark training runs, run adversarial network tests, and secure independent compliance audits."
      }
    ],
    metricsSummary: [
      { label: "GPU Scaling", value: "95.4%", sublabel: "Near-linear efficiency" },
      { label: "PUE Rating", value: "1.12", sublabel: "Liquid-cooled average" },
      { label: "Data Leak Audit", value: "0", sublabel: "Absolute sovereignty" }
    ]
  },
  {
    id: "high-frequency-trading",
    title: "High-Frequency Trading",
    category: "Low-Latency Compute",
    tagline: "Sub-millisecond inference pipelines bypassing CPU boundaries using custom CUDA kernels.",
    challengeBrief: "Quantitative trading firms need sub-millisecond predictive inference speeds to execute orders before markets shift. Standard web serving LLMs or bloated frameworks introduce execution latency.",
    challengeDetailed1: "In HFT, the window to execute arbitrage orders is measured in microseconds. Standard deep learning libraries introduce unacceptable overhead from Python interpreter locks, PCIe memory copy cycles, and CUDA kernel scheduling jitters that cascade into milliseconds.",
    challengeDetailed2: "During market volatility spikes, traditional serving systems suffer queue buildup and thread starvation. A prediction delayed by even 500μs becomes stale, causing failed execution and direct financial losses.",
    solutionBrief: "We replaced PyTorch execution paths with custom CUDA kernel implementations and Graph-Compiled TensorRT inference engines, using GPUDirect RDMA to bypass host-to-device copy bottlenecks.",
    solutionDetailed1: "We re-implemented core model operations — attention, layer normalization, matrix multiplications — as raw CUDA kernels optimized for local tensor cores. The execution graph is compiled into static TensorRT engines that pre-allocate all GPU memory, eliminating runtime allocations and garbage collection.",
    solutionDetailed2: "GPUDirect RDMA allows high-speed Mellanox NICs to write directly to GPU VRAM via PCIe switches, bypassing host CPU and system RAM entirely. Multiple inference pipelines run asynchronously via CUDA streams, keeping latency flat below 800μs regardless of input congestion.",
    hardwareConfig: [
      "NVIDIA H100 PCIe GPUs with NVLink bridges",
      "Mellanox ConnectX-7 400Gb/s SmartNICs",
      "PCIe Gen 5 Direct-Bypass Switches",
      "Hardened ultra-low-latency host servers with customized UEFI configuration",
      "GPUDirect RDMA & GPUDirect Storage SDKs"
    ],
    techStack: [
      { name: "Custom CUDA C++", category: "Inference Engine" },
      { name: "TensorRT Compiler", category: "Graph Optimization" },
      { name: "GPUDirect RDMA", category: "Hardware Bypass" },
      { name: "Mellanox OFED Drivers", category: "Networking" },
      { name: "C++20 Native Coroutines", category: "Concurrency" },
      { name: "Linux Real-Time Kernel", category: "Operating System" }
    ],
    capabilities: [
      {
        title: "FP4 & INT8 hybrid quantization",
        description: "Deep quantization of neural network weights utilizing custom scale factors to maintain trading signal precision while halving data retrieval latency."
      },
      {
        title: "Direct GPUDirect bypass routing",
        description: "Hardware-level bypass routing to allow ultra-low-latency data transfers directly from NIC to GPU VRAM, bypassing the host operating system."
      },
      {
        title: "Custom fused CUDA kernels",
        description: "Fusing activation, normalization, and multiplication operations into single-pass CUDA executions to save precious GPU memory bandwidth."
      },
      {
        title: "Asynchronous stream concurrency",
        description: "Multiple independent prediction lines executed concurrently using CUDA streams for zero-wait request queues under heavy market panic periods."
      }
    ],
    outcomes: [
      {
        title: "Latency reduction in signals",
        metric: "50%+",
        description: "Average end-to-end prediction latency dropped from 2.4 milliseconds to under 800 microseconds."
      },
      {
        title: "Throughput scaling under stress",
        metric: "10x Boost",
        description: "System handled massive market volatility spikes of up to 500,000 requests per second without latency degradation."
      },
      {
        title: "Tail latency stability",
        metric: "Sub-1ms",
        description: "Achieved stable, predictable execution tail latency (p99.9) under a millisecond during peak trading hours."
      },
      {
        title: "Trade execution capture",
        metric: "+15%",
        description: "Enhanced execution speed directly translated into capturing higher-margin trading opportunities across exchanges."
      }
    ],
    timeline: [
      {
        phase: "Phase 1",
        duration: "3 Weeks",
        title: "Profiling & Bottleneck Analysis",
        details: "Measure microsecond latencies across existing PyTorch graphs and map PCIe transfer delays."
      },
      {
        phase: "Phase 2",
        duration: "5 Weeks",
        title: "CUDA Kernel Optimization",
        details: "Write custom C++/CUDA kernels for tensor operators and compile static TensorRT engines."
      },
      {
        phase: "Phase 3",
        duration: "4 Weeks",
        title: "Hardware Bypass Integration",
        details: "Deploy GPUDirect RDMA over ConnectX-7 NICs and configure direct PCIe routing."
      },
      {
        phase: "Phase 4",
        duration: "3 Weeks",
        title: "Volatility Stress Tests & Deployment",
        details: "Replay historical market panic feeds to validate sub-millisecond latency stability before pushing to production."
      }
    ],
    metricsSummary: [
      { label: "Inference p99.9", value: "< 800 μs", sublabel: "Sub-millisecond tail" },
      { label: "Peak Capacity", value: "500k/s", sublabel: "High volatility load" },
      { label: "Execution Win", value: "+15%", sublabel: "HFT trade capture gain" }
    ]
  },
  {
    id: "global-saas",
    title: "Global SaaS Platforms",
    category: "Infrastructure & Scaling",
    tagline: "Maximizing VRAM efficiency and request throughput with continuous KV-cache batching.",
    challengeBrief: "B2B SaaS companies introducing real-time LLM features suffer from severe margin erosion due to inefficient request concurrency, paged memory waste, and static GPU scheduling.",
    challengeDetailed1: "Standard LLM deployment allocates a static, fixed KV-cache memory block per request. Because prompt and completion lengths are highly variable, this causes up to 60-70% GPU VRAM fragmentation — limiting concurrent users and forcing expensive instance scale-outs.",
    challengeDetailed2: "During peak traffic, queue delays spike time-to-first-token and violate customer SLAs. SaaS companies must increase concurrency per GPU by 5-10x while maintaining fast token delivery and dynamically shifting workloads based on cloud pricing.",
    solutionBrief: "We deployed an LLM Inference Optimization Layer built on vLLM and Triton Inference Server with continuous batching, paged KV-cache, and cost-aware Spot instance routing.",
    solutionDetailed1: "We replaced static memory allocation with virtualized PagedAttention (vLLM), partitioning the KV-cache into fixed-size physical pages mapped dynamically as tokens generate — eliminating VRAM fragmentation and supporting far more concurrent sessions per GPU.",
    solutionDetailed2: "An iteration-level scheduler continuously batches incoming prompts with active generation steps, avoiding full-batch wait latency. A real-time FinOps broker routes non-critical batch jobs to cheaper Spot instances and falls back to reserved nodes for interactive sessions during Spot reclamation.",
    hardwareConfig: [
      "Clusters of NVIDIA L40S and H100 SXM5 GPUs in auto-scaling cloud pools",
      "High-performance enterprise cloud instances with custom VM templates",
      "Decentralized model caches utilizing local fast storage (NVMe)",
      "Multi-region latency-aware load balancers",
      "Hybrid On-Demand / Spot compute pools"
    ],
    techStack: [
      { name: "vLLM Serving Engine", category: "Inference Server" },
      { name: "Triton Inference Server", category: "Model Management" },
      { name: "Ray Cluster Manager", category: "Compute Scaling" },
      { name: "Prometheus & Grafana", category: "Monitoring" },
      { name: "Docker Containers", category: "Deployment" },
      { name: "Terraform / Spot Broker", category: "FinOps Infrastructure" }
    ],
    capabilities: [
      {
        title: "Continuous request batching",
        description: "Iteration-level scheduler that groups incoming prompts dynamically to maximize GPU execution tensor core utilization and avoid queue pauses."
      },
      {
        title: "Paged KV-cache memory management",
        description: "Paged virtual memory routing for key-value cache matrices, minimizing memory allocation waste and preventing OOM events."
      },
      {
        title: "Dynamic speculative decoding",
        description: "Running small, fast draft models alongside main LLMs to accelerate token generation speed by up to 2.5x with mathematical guarantee."
      },
      {
        title: "FinOps automated Spot routing",
        description: "Cloud-agnostic broker that schedules workloads based on real-time instance pricing, reclaiming, and SLA constraints."
      }
    ],
    outcomes: [
      {
        title: "Infrastructure cost savings",
        metric: "70%",
        description: "Dramatically reduced monthly cloud spend by maximizing hardware density and using spot instance arbitrage."
      },
      {
        title: "Request concurrency boost",
        metric: "6.5x",
        description: "Expanded the capacity of active user connections per GPU node without degrading the token generation rate."
      },
      {
        title: "SLA compliance on latency",
        metric: "99.9%",
        description: "Stabilized Time-to-First-Token (TTFT) at under 150ms for thousands of concurrent enterprise API users."
      },
      {
        title: "Memory fragmentation crashes",
        metric: "Zero",
        description: "Eliminated Out-Of-Memory (OOM) errors during heavy usage spikes through dynamic virtual page caching."
      }
    ],
    timeline: [
      {
        phase: "Phase 1",
        duration: "3 Weeks",
        title: "KV-Cache Audit & Baseline",
        details: "Measure VRAM waste, benchmark existing serving framework throughput, and capture traffic profiles."
      },
      {
        phase: "Phase 2",
        duration: "4 Weeks",
        title: "vLLM & Triton Integration",
        details: "Reconfigure models to use PagedAttention and continuous batching schedulers."
      },
      {
        phase: "Phase 3",
        duration: "3 Weeks",
        title: "Speculative Decoding Setup",
        details: "Fine-tune small draft models and set up parallel verification inference pipelines."
      },
      {
        phase: "Phase 4",
        duration: "4 Weeks",
        title: "Spot Broker Deploy & Go-Live",
        details: "Implement API telemetry, construct dynamic Spot instances fallback routes, and transition to live traffic."
      }
    ],
    metricsSummary: [
      { label: "VRAM Waste Cut", value: "70.2%", sublabel: "Zero fragmentation" },
      { label: "User Concurrency", value: "6.5x", sublabel: "Per active GPU node" },
      { label: "TTFT (interactive)", value: "120 ms", sublabel: "Continuous batching" }
    ]
  },
  {
    id: "autonomous-operations",
    title: "Autonomous Operations",
    category: "Enterprise Automation",
    tagline: "Hierarchical multi-agent worker fleets executing business workflows with human validation gates.",
    challengeBrief: "Enterprise supply chain and manufacturing operators waste hundreds of hours manually processing unstructured logistics requests, vendor contracts, and tracking data.",
    challengeDetailed1: "Traditional RPA tools cannot handle semantic variations in unstructured documents like vendor contracts, bills of lading, and invoices. Simple LLM API calls fail at multi-step scale due to context drift and state synchronization errors across distributed workflows.",
    challengeDetailed2: "When agents operate without coordination, state drift causes errors like duplicate payments or incorrect inventory routing. Autonomous agents need secure human-in-the-loop validation gates before executing financial transactions or modifying inventory records.",
    solutionBrief: "We built specialized multi-agent worker fleets using LangGraph and CrewAI with shared state memory, role-separated agents, and secure Slack/Email action gates for human verification.",
    solutionDetailed1: "A multi-agent orchestration framework powered by LangGraph and CrewAI uses a centralized conflict-free state memory database. Specialized agents — Contract Reader, Invoice Auditor, Logistics Tracker, ERP Updater — share context in real time, preventing drift. Each executes micro-tools in isolated sandboxes.",
    solutionDetailed2: "Interactive Approval Gates pause execution for any transaction above risk thresholds and surface a Slack card with agent reasoning. Coordinators approve or deny with one click, updating agent memory instantly. This maintains human control over all high-risk decisions.",
    hardwareConfig: [
      "Distributed microservices clusters running on Kubernetes in hybrid-cloud configurations",
      "Local vector database clusters (Qdrant) running in high-availability mode",
      "Secure sandboxed runtime environments (Docker/Wasm) for agent tool executions",
      "OAuth2 verification servers for Slack, Teams, and Email API integrations",
      "Enterprise database caches with low-latency transactional replication"
    ],
    techStack: [
      { name: "LangGraph Framework", category: "Agent Orchestration" },
      { name: "CrewAI SDK", category: "Multi-Agent Systems" },
      { name: "Qdrant / VectorDB", category: "Semantic Storage" },
      { name: "FastAPI / API Engine", category: "Microservices" },
      { name: "PostgreSQL / JSONB", category: "State Memory" },
      { name: "Docker / WebAssembly", category: "Tool Isolation" }
    ],
    capabilities: [
      {
        title: "Conflict-free shared state memory",
        description: "Graph-based transactional memory stores that prevent context degradation and state drift during complex, multi-step agent actions."
      },
      {
        title: "Interactive human-in-the-loop gates",
        description: "Secure OAuth2-backed Slack action buttons and interactive email cards that halt agents for validation and continue upon user approval."
      },
      {
        title: "Local vector-embedded RAG",
        description: "Semantic retrieval systems querying internal policy manuals, historical shipping logs, and vendor agreements with low latency."
      },
      {
        title: "Self-correcting agent execution",
        description: "Automated loop detection and feedback mechanisms that trace and correct failing API requests or parsing anomalies."
      }
    ],
    outcomes: [
      {
        title: "Automated invoice matching",
        metric: "90%",
        description: "Successfully ingested, validated, and matched invoices against purchase orders without human touch."
      },
      {
        title: "Routing logistics accuracy",
        metric: "99.5%",
        description: "Virtually eliminated shipping destination routing errors by double-checking semantic anomalies."
      },
      {
        title: "Workflow cycle compression",
        metric: "14 min",
        description: "Reduced invoice-to-payment cycle latency from three business days to a matter of minutes."
      },
      {
        title: "Operational efficiency gain",
        metric: "40%+",
        description: "Redirected skilled logistics personnel from data entry tasks to complex customer service operations."
      }
    ],
    timeline: [
      {
        phase: "Phase 1",
        duration: "3 Weeks",
        title: "Workflow Audits & Mapping",
        details: "Map administrative processes, identify decision-making gates, and profile unstructured datasets."
      },
      {
        phase: "Phase 2",
        duration: "5 Weeks",
        title: "Multi-Agent System Design",
        details: "Construct agent graph nodes in LangGraph and code custom micro-tools."
      },
      {
        phase: "Phase 3",
        duration: "4 Weeks",
        title: "Human-in-the-Loop Integration",
        details: "Integrate OAuth2 Slack application and construct interactive dashboard endpoints."
      },
      {
        phase: "Phase 4",
        duration: "4 Weeks",
        title: "Pilot Test & System Hardening",
        details: "Run pilot runs on 10% of logistics queues, optimize agent memory states, and roll out to production."
      }
    ],
    metricsSummary: [
      { label: "Auto Processing", value: "90%", sublabel: "Direct matching" },
      { label: "Cycle Compression", value: "14m", sublabel: "Down from 3 days" },
      { label: "Routing Accuracy", value: "99.5%", sublabel: "State consistency" }
    ]
  },
  {
    id: "regulated-ai-security",
    title: "Regulated AI Security",
    category: "Security & HIPAA Compliance",
    tagline: "Adversarial threat protection and runtime container isolation under zero-trust guidelines.",
    challengeBrief: "Defense and intelligence networks face dangerous adversarial inputs, prompt injections, and data extraction attacks when integrating generative LLMs into regulated environments.",
    challengeDetailed1: "Traditional web security firewalls are blind to semantic attacks. Adversaries can exploit prompt injection (direct commands) or indirect injection (commands embedded in untrusted documents) to force models to leak system instructions, access backend tools, or compromise sensitive data.",
    challengeDetailed2: "Model deployments are also vulnerable to training data poisoning and membership inference attacks. Standard containers do not protect against kernel-level exploits if an attacker escapes the model serving application — regulated networks require cryptographically secure audit logs for compliance.",
    solutionBrief: "We integrated the AI Shield™ framework with input/output validation guardrails and ran inference inside isolated WASM and gVisor Bash execution sandboxes.",
    solutionDetailed1: "All prompts and model completions pass through high-speed local classification layers scanning for injection patterns, jailbreak payloads, and sensitive data. Model servers run in gVisor kernel + WebAssembly sandboxes that isolate the application from the host OS, preventing privilege escalation.",
    solutionDetailed2: "Differential privacy filters automatically mask PII before prompts reach the model. All system operations are written to an immutable, cryptographically signed ledger using hash-chain validation — providing auditors with a tamper-proof trail compliant with NIST SP 800-218 and the EU AI Act.",
    hardwareConfig: [
      "Secure, air-gapped on-premise datacenter racks in defense boundaries",
      "FIPS 140-3 validated Hardware Security Modules (HSMs) for encryption",
      "Hardened bare-metal GPU clusters running customized Linux kernels",
      "gVisor-isolated container host architectures",
      "Hardware-encrypted storage volumes with automated zero-knowledge keys"
    ],
    techStack: [
      { name: "AI Shield™ Guardrails", category: "Security Layer" },
      { name: "gVisor Sandbox", category: "Container Isolation" },
      { name: "WebAssembly (Wasm)", category: "Runtime Security" },
      { name: "Llama-Guard Scanners", category: "Input Sanitization" },
      { name: "FIPS KMS Cryptography", category: "Data Security" },
      { name: "Hardened ELK Logs", category: "Audit Logging" }
    ],
    capabilities: [
      {
        title: "ML prompt injection filters",
        description: "Real-time semantic scanners detecting jailbreaks, system prompt overrides, and hidden adversarial inputs at the token level."
      },
      {
        title: "gVisor kernel API isolation",
        description: "Running inference engines inside sandboxed container environments that block direct access to host OS kernels, mitigating escape threats."
      },
      {
        title: "Signed zero-trust audit logging",
        description: "Writing all input prompts, outputs, and system calls to an immutable, cryptographically signed ledger for absolute non-repudiation."
      },
      {
        title: "Differential privacy masking",
        description: "Real-time PII and sensitive token identification layer that obfuscates data dynamically before model processing."
      }
    ],
    outcomes: [
      {
        title: "Jailbreak mitigation rate",
        metric: "99.9%",
        description: "Blocked advanced adversarial jailbreak payloads across rigorous automated red-teaming tests."
      },
      {
        title: "Privilege sandbox escapes",
        metric: "Zero",
        description: "Zero security incidents or privilege escalation attempts detected in isolated container runtimes."
      },
      {
        title: "Regulatory compliance certification",
        metric: "100%",
        description: "Delivered full compliance documentation matching SOC 2 Trust Criteria and European AI Act mandates."
      },
      {
        title: "Air-gapped deployment scope",
        metric: "100% Local",
        description: "Fully functional deployment in secure, air-gapped datacenters with zero external API dependencies."
      }
    ],
    timeline: [
      {
        phase: "Phase 1",
        duration: "4 Weeks",
        title: "Red Teaming & Threat Profiling",
        details: "Perform automated prompt injection testing, map data leaks, and audit host OS kernel vulnerabilities."
      },
      {
        phase: "Phase 2",
        duration: "4 Weeks",
        title: "gVisor Sandbox Deployment",
        details: "Harden container configurations, deploy isolated model servers, and measure latency overheads."
      },
      {
        phase: "Phase 3",
        duration: "4 Weeks",
        title: "Guardrail Classifier Training",
        details: "Fine-tune classification models for input filtering and differential privacy masking rules."
      },
      {
        phase: "Phase 4",
        duration: "3 Weeks",
        title: "KMS Integration & Audit Go-Live",
        details: "Integrate FIPS-compliant HSM key rings and activate immutable audit log chains."
      }
    ],
    metricsSummary: [
      { label: "Jailbreak Blocks", value: "99.9%", sublabel: "Adversarial prevention" },
      { label: "Host Escapes", value: "0", sublabel: "gVisor protected" },
      { label: "Compliance Scope", value: "NIST/EU", sublabel: "Fully certified" }
    ]
  },
  {
    id: "secure-medical-llmops",
    title: "Secure Medical LLMOps",
    category: "Security & HIPAA Compliance",
    tagline: "Fine-tuned clinical models running in secure HIPAA-compliant environments.",
    challengeBrief: "Medical clinics must summarize patient charts and extract diagnostic code data but are legally barred by HIPAA guidelines from sending patient records to external public APIs.",
    challengeDetailed1: "Healthcare providers spend up to 30% of the workday reading EHR records, typing summaries, and mapping symptoms to ICD-10 codes. LLMs can automate this but HIPAA legally prohibits transmitting Protected Health Information (PHI) to any external third-party API.",
    challengeDetailed2: "Generic models also exhibit hallucination rates that are unacceptable in clinical settings — a hallucinated drug interaction poses direct patient safety risks. Medical AI requires on-premise specialist models with verified cross-referencing against medical databases.",
    solutionBrief: "We set up private-cloud model clusters running custom fine-tuned Llama 70B clinical models, quantized to FP8 using AutoAWQ and aligned with doctor annotations via clinical DPO.",
    solutionDetailed1: "We built an isolated on-premise clinical LLM cluster running Llama-3 70B models quantized to FP8 with AutoAWQ — cutting VRAM footprint by 50%. Models were aligned using Clinical DPO trained on expert-annotated datasets to ensure proper medical terminology and diagnostic reasoning.",
    solutionDetailed2: "A semantic validator cross-references model outputs against UMLS and SNOMED-CT knowledge graphs in real time. Any conflicts are flagged and corrected before output generation. The entire environment is air-gapped within the provider's private cloud, ensuring zero data leaks and full HIPAA compliance.",
    hardwareConfig: [
      "On-premise enterprise GPU racks (NVIDIA H100 or A100 SXM5)",
      "Air-gapped local storage clusters (HIPAA certified and encrypted)",
      "Encrypted local area networks with zero external routing",
      "Liquid cooling racks optimized for continuous inference loops",
      "Encrypted hardware key rings for local access authorization"
    ],
    techStack: [
      { name: "Llama-3 70B Model", category: "Foundational Model" },
      { name: "AutoAWQ Quantization", category: "Model Optimization" },
      { name: "Clinical DPO", category: "Alignment Tuning" },
      { name: "UMLS / SNOMED Graphs", category: "Knowledge Validation" },
      { name: "Qdrant Vector Cluster", category: "Retrieval Storage" },
      { name: "Hardened Debian OS", category: "Operating System" }
    ],
    capabilities: [
      {
        title: "AutoAWQ quantization execution",
        description: "Executing quantized FP8 models on local servers, preserving precision while cutting VRAM usage in half to optimize compute density."
      },
      {
        title: "Clinical DPO preference alignment",
        description: "Alignment loops utilizing verified medical datasets to optimize diagnostic logic and medical terminology comprehension."
      },
      {
        title: "Semantic knowledge validation",
        description: "Real-time cross-referencing of model assertions against medical ontologies (UMLS, SNOMED-CT) to eliminate critical hallucinations."
      },
      {
        title: "HIPAA isolated environment",
        description: "On-premise air-gapped deployments ensuring zero PHI leaks or external API network routes, satisfying healthcare audit gates."
      }
    ],
    outcomes: [
      {
        title: "Summarization cost reduction",
        metric: "80%",
        description: "Bypassing token-based external API pricing led to massive cost savings for large-scale chart summarization."
      },
      {
        title: "ICD-10 extraction accuracy",
        metric: "99%+",
        description: "Achieved high precision in identifying ICD-10 codes, patient history, and drug dosages from raw doctor notes."
      },
      {
        title: "HIPAA compliance infractions",
        metric: "Zero",
        description: "Passed rigorous healthcare compliance assessments with zero leaks of patient records."
      },
      {
        title: "Doctor chart review speedup",
        metric: "5x Comp",
        description: "Reduced the time required for physicians to synthesize historical EHR files, improving patient turnover."
      }
    ],
    timeline: [
      {
        phase: "Phase 1",
        duration: "4 Weeks",
        title: "Dataset Collection & Annotation",
        details: "Collect clinical transcripts and secure expert doctor annotations for preference learning."
      },
      {
        phase: "Phase 2",
        duration: "6 Weeks",
        title: "Fine-Tuning & Quantization",
        details: "Execute QLoRA training runs, perform DPO alignment, and quantize weights to FP8 formats."
      },
      {
        phase: "Phase 3",
        duration: "3 Weeks",
        title: "Knowledge Graph Integration",
        details: "Integrate SNOMED-CT dictionaries and code the semantic validation parser."
      },
      {
        phase: "Phase 4",
        duration: "3 Weeks",
        title: "Air-Gapped Cluster Deploy",
        details: "Install physical systems in clinical server rooms and execute HIPAA security verification audits."
      }
    ],
    metricsSummary: [
      { label: "ICD-10 Accuracy", value: "99.2%", sublabel: "Extraction rate" },
      { label: "Doctor Review Comp", value: "5x", sublabel: "Chart time compression" },
      { label: "Cost vs Public API", value: "80% Saved", sublabel: "Zero token pricing" }
    ]
  },
  {
    id: "high-risk-genai-rag",
    title: "High-Risk Generative AI / RAG Systems",
    category: "Trusted AI & Compliance",
    tagline: "Mitigating hallucinations, prompt injections, and data leakage in regulated search ecosystems.",
    challengeBrief: "Enterprises face severe legal liabilities and data leakage risks when deploying conversational RAG/LLM solutions in high-risk areas like legal research, medical triage, and financial customer advisory.",
    challengeDetailed1: "Without custom reliability engineering, LLMs generate ungrounded fabrications and cite false cases, leading to sanctions or clinical misdiagnoses. Standard web firewalls fail to stop prompt injections.",
    challengeDetailed2: "Similarly, unsecured retrieval systems lack role-based access controls, leaking protected PII or confidential company data to unauthorized users during the context construction stage.",
    solutionBrief: "We deployed grounding verification filters, differential privacy masking layers, instruction-hierarchy defenses, and clinician-escalation gateways.",
    solutionDetailed1: "We engineered a real-time citation validation pipeline that correlates generated assertions against database facts, suppressing outputs below 85% grounding confidence.",
    solutionDetailed2: "All inputs/outputs run through a 15ms guardrail proxy proxying prompt injection checks and redacting PII dynamically, while emergency override hooks gate high-risk actions.",
    hardwareConfig: [
      "NVIDIA H100 GPU nodes co-located with local database servers",
      "High-performance local vector search clusters (Qdrant/Milvus)",
      "gVisor runtime sandbox environments isolating model endpoints",
      "Immutable cryptographic log storage disks"
    ],
    techStack: [
      { name: "Llama-Guard Scanners", category: "Input/Output Sanitization" },
      { name: "Qdrant Vector Cluster", category: "Knowledge Base" },
      { name: "gVisor Container isolation", category: "Sandbox" },
      { name: "SHAP/LIME explanation scripts", category: "Explainability" }
    ],
    capabilities: [
      { title: "Retrieval Grounding Verification", description: "Real-time verification of generated claims against source document text." },
      { title: "Prompt Injection Mitigation", description: "Multi-layered filters blocking prompt manipulation and jailbreaks." },
      { title: "PII & PII Masking Gates", description: "Differential privacy filters masking private data prior to LLM processing." }
    ],
    outcomes: [
      { title: "Hallucination suppression", metric: "< 0.4%", description: "Reduced ungrounded or fabricated claims from 6.2% down to 0.4% in legal copilots." },
      { title: "Injection block rate", metric: "99.8%", description: "Mitigated adversarial inputs at the guardrail proxy gateway under red-team testing." },
      { title: "Data leakage prevention", metric: "0 Leaks", description: "Enforced strict role-based access mapping on document retrieval indexes." }
    ],
    timeline: [
      { phase: "Phase 1", duration: "3 Weeks", title: "Grounding Audit", details: "Measure baseline hallucination rates and audit retrieval access controls." },
      { phase: "Phase 2", duration: "4 Weeks", title: "Guardrails Deploy", details: "Install high-performance input/output proxy gateways and injection scanners." },
      { phase: "Phase 3", duration: "3 Weeks", title: "HITL Integration", details: "Code emergency escalation hooks and user verification interfaces." }
    ],
    metricsSummary: [
      { label: "Hallucination Rate", value: "< 0.4%", sublabel: "Ungrounded claims" },
      { label: "Injection Blocks", value: "99.8%", sublabel: "Adversarial capture" },
      { label: "SLA Gateway Latency", value: "< 15ms", sublabel: "Real-time overhead" }
    ]
  },
  {
    id: "credit-scoring-lending",
    title: "Credit Scoring & Lending AI",
    category: "Trusted AI & Compliance",
    tagline: "Bias mitigation and explainable reason codes for automated credit decisioning.",
    challengeBrief: "Automated underwriting models risk perpetuating historical demographic discrimination, violating fair lending laws (ECOA, FCRA, EU AI Act Article 5b) without explainable AI layers.",
    challengeDetailed1: "Black-box scoring engines fail to produce legally required reason codes for credit denials, leading to audit failures and regulatory enforcement actions.",
    challengeDetailed2: "Training datasets inherit structural biases from legacy loan decisions, causing models to digital-redline applicants based on proxies for race, age, or gender.",
    solutionBrief: "We implemented fairness-constrained training, demographic parity calibration, SHAP explainability layers, and an automated adverse action portal.",
    solutionDetailed1: "We audited 300+ features to remove demographic proxies, applying demographic parity and equalized odds thresholds during model training.",
    solutionDetailed2: "A model explanation service translates SHAP output vectors into human-readable consumer reason codes for every automated decline decision.",
    hardwareConfig: [
      "Dedicated secure CPU/GPU instances for batch risk scoring",
      "HSM-backed cryptographic key arrays for transaction signing",
      "FIPS 140-3 compliant database vaults"
    ],
    techStack: [
      { name: "SHAP/LIME Explainers", category: "Explainable AI" },
      { name: "Fairness-Constraints SDK", category: "Bias Mitigation" },
      { name: "Model Registry", category: "Operations" },
      { name: "Cryptographic Ledgers", category: "Auditing" }
    ],
    capabilities: [
      { title: "Explainable Adverse Actions", description: "Legally compliant explanation code delivery for every credit decision." },
      { title: "Demographic Proxy Auditing", description: "Systematic auditing of data features to identify and eliminate proxy features." },
      { title: "Continuous Bias Tracking", description: "Real-time dashboarding of disparate impact ratio metrics." }
    ],
    outcomes: [
      { title: "Disparate impact ratio", metric: "0.96", description: "Improved approval equality across protected classes, well above the 0.80 discrimination threshold." },
      { title: "Explainability coverage", metric: "100%", description: "Generated legally sound explanations for every adverse lending decision automatically." },
      { title: "Fair lending findings", metric: "0", description: "Passed federal regulatory examinations with zero compliance findings." }
    ],
    timeline: [
      { phase: "Phase 1", duration: "4 Weeks", title: "Fairness Audit", details: "Perform disparate impact studies on historical training sets." },
      { phase: "Phase 2", duration: "4 Weeks", title: "Model Calibration", details: "Re-train underwriting models with fairness constraints and remove proxy attributes." },
      { phase: "Phase 3", duration: "3 Weeks", title: "XAI Portal Setup", details: "Connect SHAP explainer pipelines to the credit decision routing gateway." }
    ],
    metricsSummary: [
      { label: "Disparate Impact Ratio", value: "0.96", sublabel: "Fair Lending compliant" },
      { label: "Explanation Delivery", value: "100%", sublabel: "Adverse actions" },
      { label: "Drift Scan Time", value: "< 24h", sublabel: "Continuous check" }
    ]
  },
  {
    id: "healthcare-clinical-ai",
    title: "Healthcare Clinical AI Applications",
    category: "Trusted AI & Compliance",
    tagline: "Dual EU AI Act and Medical Device Regulation (MDR) compliance for diagnostic imaging.",
    challengeBrief: "Healthcare diagnostic AIs suffer from false alarms, data drift, skin-type bias, and PHI exposure risks under medical device and data privacy regulations.",
    challengeDetailed1: "Diagnostic models trained on fair-skinned cohorts drop in sensitivity from 95% to 71% on darker skin tones, creating medical disparities and liability risks.",
    challengeDetailed2: "Additionally, clinician alarm fatigue from low-precision warning models causes vital alerts to be ignored, compromising safety-critical outcomes.",
    solutionBrief: "We integrated skin-tone subgroup calibration, UMLS ontology validators, and alert-fatigue suppression algorithms under HIPAA guidelines.",
    solutionDetailed1: "We augmented training pools with balanced dermatological images, implementing subgroup-specific threshold calibration to close the equity gap.",
    solutionDetailed2: "A secondary validation layer parses outputs against UMLS knowledge graphs, suppressing low-precision alerts while hot-paging clinicians for critical findings.",
    hardwareConfig: [
      "HIPAA-certified GPU nodes co-located in hospital server clusters",
      "FIPS-encrypted local NAS storage arrays",
      "Isolated clinical LAN channels"
    ],
    techStack: [
      { name: "UMLS Ontology Parser", category: "Clinical Validation" },
      { name: "Differential Privacy SDK", category: "Data Protection" },
      { name: "Triton Model Server", category: "Inference Engine" },
      { name: "AutoAWQ Quantizer", category: "Compression" }
    ],
    capabilities: [
      { title: "Clinical Ontology Validation", description: "Semantic validation of diagnostic output statements against medical knowledge databases." },
      { title: "Fitzpatrick Equity Checks", description: "Continuous evaluation of imaging precision across skin types." },
      { title: "Clinician Notification Escalation", description: "Risk-based triage routing for critical warning notifications." }
    ],
    outcomes: [
      { title: "Fitzpatrick sensitivity gap", metric: "< 3%", description: "Reduced diagnostic disparity between fair and dark skin tones." },
      { title: "Sepsis alert precision", metric: "58%", description: "Increased PPV from 22% to 58%, reducing false alarm fatigue by 55%." },
      { title: "Sepsis mortality reduction", metric: "-18%", description: "Early warning optimizations and escalations directly improved patient survival." }
    ],
    timeline: [
      { phase: "Phase 1", duration: "4 Weeks", title: "Equity Mapping", details: "Analyze diagnostic sensitivity gaps across historical cohorts." },
      { phase: "Phase 2", duration: "5 Weeks", title: "Ontology Filter Setup", details: "Code SNOMED/UMLS verification scripts and integrate with the database." },
      { phase: "Phase 3", duration: "4 Weeks", title: "HIPAA Site Deployment", details: "Deploy physical GPU enclosures in hospitals and test network paths." }
    ],
    metricsSummary: [
      { label: "Derm Sensitivity Gap", value: "< 3%", sublabel: "Equity achieved" },
      { label: "Sepsis Mortality", value: "-18%", sublabel: "Life-saving alerts" },
      { label: "Alert Volume Cut", value: "55%", sublabel: "Alarm fatigue drop" }
    ]
  }
];

const cybersecurityData: CybersecurityUseCase[] = [
  {
    id: 61,
    subCategory: "AI-Driven Penetration Testing",
    title: "Automated Attack Surface Mapping",
    description: "Using LLMs to continuously read codebases, APIs, and network topology to find vulnerabilities.",
    businessValue: "Replaces slow, manual penetration testing with continuous, automated vulnerability discovery.",
    solution: "TRUSTGRID AI provides secure, high-memory GPU environments to run static code analysis LLMs and graph neural networks across massive repositories.",
    expectedOutcome: "Constant, real-time visibility into exploitable attack surfaces.",
    kpis: "Scans 10M+ lines of code in <1 hour; 40% higher vulnerability detection vs. traditional SAST."
  },
  {
    id: 62,
    subCategory: "AI-Driven Penetration Testing",
    title: "Intelligent Exploit Generation",
    description: "AI agents dynamically writing custom exploits (e.g., buffer overflows) based on newly discovered zero-days.",
    businessValue: "Proves the exploitability of vulnerabilities instantly, forcing faster patching.",
    solution: "TRUSTGRID AI hosts autonomous coding agents (like specialized Devin models) in heavily isolated, air-gapped GPU sandboxes to generate and test exploit code safely.",
    expectedOutcome: "Rapid, safe validation of critical vulnerabilities.",
    kpis: "Reduces exploit proof-of-concept generation from days to minutes; 100% sandbox containment."
  },
  {
    id: 63,
    subCategory: "AI-Driven Penetration Testing",
    title: "Dynamic Payload Obfuscation",
    description: "Generating polymorphic malware/payloads using AI to test if enterprise EDR/XDR systems can detect them.",
    businessValue: "Tests the true efficacy of endpoint security under adversarial AI conditions.",
    solution: "TRUSTGRID AI’s multi-tenant GPU fabric generates thousands of mutated binary variants simultaneously, isolated from the corporate network.",
    expectedOutcome: "Hardened endpoint detection and response (EDR) rules.",
    kpis: "Tests 10,000+ mutated payloads per hour; improves EDR detection rates by 35%."
  },
  {
    id: 64,
    subCategory: "AI-Driven Managed Threat Defense (MDR)",
    title: "Line-Rate Network Anomaly Detection",
    description: "Analyzing raw network packets (PCAP/Netflow) in real-time using transformer models.",
    businessValue: "Catches stealthy, slow-and-low data exfiltration that signature-based firewalls miss.",
    solution: "TRUSTGRID AI deploys streaming-optimized AI models directly on edge GPUs co-located with network taps, processing data at line rate.",
    expectedOutcome: "Real-time interception of covert data theft.",
    kpis: "Analyzes 100 Gbps of network traffic with <5ms added latency; 99% anomaly detection accuracy."
  },
  {
    id: 65,
    subCategory: "AI-Driven Managed Threat Defense (MDR)",
    title: "Zero-Day Threat Intel Extraction",
    description: "LLMs autonomously reading dark web forums, foreign tech blogs, and PDFs to extract emerging IOCs.",
    businessValue: "Provides early warning systems for threats before they appear in commercial databases.",
    solution: "TRUSTGRID AI orchestrates web-scraping agents and multi-lingual NLP models to process and contextualize unstructured threat data 24/7.",
    expectedOutcome: "Proactive defense against emerging, undocumented threats.",
    kpis: "Processes 50,000 dark web posts/day; delivers IOC intel 72 hours ahead of traditional vendors."
  },
  {
    id: 66,
    subCategory: "AI-Driven Managed Threat Defense (MDR)",
    title: "Automated SOAR Playbook Execution",
    description: "Using LLMs to read security alerts, understand context, and write Python scripts to contain threats.",
    businessValue: "Drastically reduces Mean Time to Respond (MTTR) by automating junior analyst tasks.",
    solution: "TRUSTGRID AI provides low-latency inference for agentic models that interface directly via API with SIEM/SOAR platforms (Splunk, Palo Alto).",
    expectedOutcome: "Instant, context-aware threat containment.",
    kpis: "Reduces MTTR from hours to <3 minutes; automates 80% of Tier-1 SOC alerts."
  },
  {
    id: 67,
    subCategory: "AI-Driven Managed Threat Defense (MDR)",
    title: "Multi-Modal Phishing Defense",
    description: "Analyzing not just email text, but screenshots of landing pages and voice audio (vishing) for fraud.",
    businessValue: "Defeats modern, AI-generated phishing that bypasses traditional text spam filters.",
    solution: "TRUSTGRID AI co-locates Vision, NLP, and Audio models to perform simultaneous multi-modal analysis of suspicious communications.",
    expectedOutcome: "Near-perfect blocking of sophisticated social engineering.",
    kpis: "99.5% phishing detection rate; 90% reduction in false positives."
  },
  {
    id: 68,
    subCategory: "AI Breach Attack & Simulation (BAS)",
    title: "Continuous Purple Teaming",
    description: "AI acting simultaneously as the Red Team (attacking) and Blue Team (defending) in a loop.",
    businessValue: "Moves security testing from a point-in-time snapshot to a continuous, self-improving loop.",
    solution: "TRUSTGRID AI orchestrates parallel GPU clusters: one running adversarial attack agents, the other running defense/healing agents, sharing telemetry in real-time.",
    expectedOutcome: "Evolving, self-healing security postures.",
    kpis: "Executes 1000s of attack/defense cycles daily; continuous security posture improvement."
  },
  {
    id: 69,
    subCategory: "AI Breach Attack & Simulation (BAS)",
    title: "LLM-Specific Attack Simulation",
    description: "Simulating prompt injections, jailbreaks, and token-leakage attacks against the company's own AI apps.",
    businessValue: "Secures the enterprise's external-facing AI chatbots and internal copilots.",
    solution: "TRUSTGRID AI spins up specialized red-team LLMs (like Crimson Joker) to continuously bombard target LLM endpoints hosted on the same platform.",
    expectedOutcome: "Hardened enterprise AI applications.",
    kpis: "Tests 50,000 adversarial prompts/day; identifies 95% of jailbreak vectors before users do."
  },
  {
    id: 70,
    subCategory: "AI Breach Attack & Simulation (BAS)",
    title: "Lateral Movement Emulation",
    description: "AI agents simulating how a hacker would move through the network after gaining initial access.",
    businessValue: "Identifies blind spots in network segmentation and IAM permissions.",
    solution: "TRUSTGRID AI hosts persistent AI agents that safely emulate credential dumping and lateral traversal techniques within a virtualized network twin.",
    expectedOutcome: "Validation of zero-trust architecture effectiveness.",
    kpis: "Maps lateral movement paths 10x faster than human red teams; 100% safe environment."
  },
  {
    id: 71,
    subCategory: "AI Cybersecurity for Various Industries",
    title: "Finance: Real-Time Deepfake Voice Detection",
    description: "Analyzing voice biometrics in live phone-banking calls to detect synthetic audio.",
    businessValue: "Prevents massive financial fraud from AI-cloned CEO/customer voices.",
    solution: "TRUSTGRID AI deploys ultra-low-latency audio classification models on edge GPUs directly inside telecom/PBX infrastructure.",
    expectedOutcome: "Real-time blocking of vishing attacks.",
    kpis: "<200ms detection latency; 98.5% accuracy in identifying AI-generated voices."
  },
  {
    id: 72,
    subCategory: "AI Cybersecurity for Various Industries",
    title: "Healthcare: PHI Exfiltration Prevention",
    description: "Monitoring AI copilots to ensure they don't leak Patient Health Information (PHI) in prompts/responses.",
    businessValue: "Maintains HIPAA compliance while allowing doctors to use AI for note-taking.",
    solution: "TRUSTGRID AI injects a lightweight, GPU-accelerated NER (Named Entity Recognition) guardrail that masks or blocks PHI in real-time.",
    expectedOutcome: "Safe, compliant use of AI in clinical settings.",
    kpis: "Blocks 100% of accidental PHI egress; <10ms impact on clinician UX."
  },
  {
    id: 73,
    subCategory: "AI Cybersecurity for Various Industries",
    title: "Manufacturing/OT: ICS Ransomware Defense",
    description: "Using vision and anomaly models to detect abnormal behavior in Industrial Control Systems.",
    businessValue: "Prevents catastrophic physical damage or shutdowns from targeted OT ransomware.",
    solution: "TRUSTGRID AI processes time-series sensor data (SCADA/PLC logs) through specialized transformers on isolated industrial GPUs.",
    expectedOutcome: "Early detection of attacks on physical infrastructure.",
    kpis: "Detects OT anomalies 15 minutes before critical failure; zero disruption to control systems."
  },
  {
    id: 74,
    subCategory: "AI Cybersecurity for Various Industries",
    title: "Government: Air-Gapped Threat Hunting",
    description: "Running AI threat hunting entirely offline on classified networks.",
    businessValue: "Allows intelligence agencies to use advanced AI without risking data leakage to the cloud.",
    solution: "TRUSTGRID AI On-Premise provides a fully air-gapped, local GPU cluster capable of running cutting-edge LLMs for classified data analysis.",
    expectedOutcome: "Next-gen intelligence analysis at scale with zero exfil risk.",
    kpis: "0 bytes of data leave the classified enclave; supports 70B+ parameter models offline."
  },
  {
    id: 75,
    subCategory: "AI Cybersecurity for Various Industries",
    title: "Retail: Behavioral Biometric Bot Defense",
    description: "Analyzing mouse movements, keystroke dynamics, and click patterns via AI to stop scalper bots.",
    businessValue: "Prevents inventory hoarding, credential stuffing, and coupon abuse on e-commerce sites.",
    solution: "TRUSTGRID AI runs real-time behavioral inference models that process streaming user telemetry data during high-traffic events (e.g., Black Friday).",
    expectedOutcome: "Elimination of automated bot traffic on digital storefronts.",
    kpis: "Blocks 99% of advanced bots; scales to 1M+ concurrent user behavior analyses."
  }
];

const categories = [
  "All Use Cases",
  "Infrastructure & Scaling",
  "Low-Latency Compute",
  "Enterprise Automation",
  "Security & HIPAA Compliance"
];

const cybersecuritySections = [
  {
    id: "cybersecurity-pen-testing",
    title: "AI-Driven Penetration Testing",
    description: "Automated vulnerability discovery, dynamic exploit generation, and payload obfuscation pipelines."
  },
  {
    id: "cybersecurity-mdr",
    title: "AI-Driven Managed Threat Defense (MDR)",
    description: "Line-rate network anomaly analysis, multi-modal phishing interception, and agentic SOAR playbook executions."
  },
  {
    id: "cybersecurity-bas",
    title: "AI Breach Attack & Simulation (BAS)",
    description: "Continuous Purple Teaming loops, LLM-specific jailbreak simulations, and network lateral movement emulation."
  },
  {
    id: "cybersecurity-industry",
    title: "AI Cybersecurity for Various Industries",
    description: "Tailored deepfake detection for finance, PHI filtering for healthcare, ICS ransomware defense, and offline enclaves."
  }
];

// ─── Sub-component for Cybersecurity Cards ────────────────────────────────────

function CyberUseCaseCard({ uc, index }: { uc: CybersecurityUseCase; index: number }) {
  return (
    <motion.div
      layout
      id={`uc-${uc.id}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group relative rounded-2xl border border-border/50 bg-surface/20 hover:bg-surface/40 hover:border-primary/45 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 p-6 flex flex-col justify-between overflow-hidden scroll-mt-28"
    >
      {/* Left gradient accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div>
        {/* Header info */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="text-[10px] font-bold text-accent bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-md">
            {uc.subCategory}
          </span>
          <span className="text-xs font-mono font-bold text-muted-foreground/50">
            UC-{uc.id}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-200">
          {uc.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-6">
          {uc.description}
        </p>

        {/* Grid for Business Value & TG Solution */}
        <div className="space-y-4 border-t border-border/20 pt-4">
          <div>
            <h4 className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
              Business Value
            </h4>
            <p className="text-xs text-foreground/90 font-medium leading-relaxed">
              {uc.businessValue}
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-accent uppercase tracking-wider mb-1">
              TRUSTGRID AI Solution
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {uc.solution}
            </p>
          </div>
        </div>
      </div>

      {/* Footer stats and outcome */}
      <div className="mt-6 pt-4 border-t border-border/20 space-y-4">
        <div>
          <h4 className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider mb-1">
            Expected Outcome
          </h4>
          <p className="text-xs text-foreground/85 leading-relaxed font-medium">
            {uc.expectedOutcome}
          </p>
        </div>
        
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="text-[9px] font-bold uppercase tracking-wider text-primary">
            KPIs & Key Stats
          </span>
          <span className="text-[10px] font-mono font-extrabold text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20 text-center sm:text-right leading-relaxed">
            {uc.kpis}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Component ─────────────────────────────────────────────────────────────────

function UseCasesPage() {
  const [activeCategory, setActiveCategory] = useState("All Use Cases");
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [detailTab, setDetailTab] = useState<"deep-dive" | "capabilities" | "timeline">("deep-dive");

  // Cybersecurity specific states
  const [cyberSearch, setCyberSearch] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        
        if (id.startsWith("cybersecurity") || id.startsWith("uc-")) {
          setCyberSearch("");
          setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 100);
          return;
        }

        const found = useCasesData.find((uc) => uc.id === id);
        if (found) {
          setActiveCategory(found.category);
          setSelectedUseCase(found);
          setDetailTab("deep-dive");
          setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 150);
        }
      }
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const filteredUseCases = useCasesData.filter(item => {
    if (activeCategory === "All Use Cases") return true;
    return item.category === activeCategory;
  });

  return (
    <>
      <PageHero
        eyebrow="Proven Impact"
        title={
          <>
            Enterprise <span className="text-accent">Use Cases</span> <br />
            and Success Stories
          </>
        }
        description="See how our GPU optimization, network automation, and AI infrastructure solutions accelerate outcomes for the world's most demanding enterprises."
      />

      <div className="py-20 bg-background border-b border-border/40 relative">
        {/* Glow decorative effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          
          {/* SECTION 1: Core Engineering Architectures */}
          <div className="mb-12 border-b border-border/20 pb-6">
            <span className="text-xs uppercase tracking-widest font-extrabold text-accent bg-accent/10 px-3 py-1 rounded-md border border-accent/20">
              Part 01
            </span>
            <h2 className="text-3xl md:text-4.5xl font-extrabold tracking-tight text-foreground font-display mt-4">
              Core Engineering Architectures
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-3xl leading-relaxed">
              Deep-dive operational architectures deployed for sovereign clouds, low-latency trading, and enterprise scale systems.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-border/20">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Filter className="w-4 h-4 text-accent" />
              <span>Filter cases by enterprise focus:</span>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all duration-300 ${
                      isActive
                        ? "bg-accent/15 border-accent text-accent shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                        : "bg-surface/30 border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Full-Width Row Layout */}
          <div className="space-y-5">
            <AnimatePresence mode="popLayout">
              {filteredUseCases.map((item, index) => (
                <motion.div
                  key={item.id}
                  id={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="group relative rounded-2xl border border-border/50 bg-surface/20 hover:bg-surface/40 hover:border-primary/40 transition-all duration-400 overflow-hidden scroll-mt-28"
                >
                  {/* Left gradient accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex flex-col lg:flex-row lg:items-center gap-0">

                    {/* Index number — large decorative */}
                    <div className="hidden lg:flex items-center justify-center w-24 shrink-0 self-stretch border-r border-border/20 group-hover:border-primary/30 transition-colors bg-surface/10 group-hover:bg-primary/5">
                      <span className="text-4xl font-black font-mono select-none bg-gradient-to-b from-primary/70 to-accent/50 bg-clip-text text-transparent group-hover:from-primary group-hover:to-accent transition-all duration-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Main content */}
                    <div className="flex-1 p-7 lg:p-8">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-md border border-accent/20">
                          {item.category}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
                          {item.id.replace(/-/g, " ")}
                        </span>
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-1.5 group-hover:text-gradient-primary transition-all duration-300">
                        {item.title}
                      </h3>
                      <p className="text-sm text-accent/70 italic mb-4">{item.tagline}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                        {item.challengeBrief}
                      </p>
                    </div>

                    {/* Metrics strip */}
                    <div className="lg:w-72 shrink-0 border-t lg:border-t-0 lg:border-l border-border/20 group-hover:border-primary/20 transition-colors">
                      <div className="grid grid-cols-3 lg:grid-cols-1 divide-x lg:divide-x-0 lg:divide-y divide-border/20 group-hover:divide-primary/10 h-full transition-colors">
                        {item.metricsSummary.map((m, idx) => (
                          <div key={idx} className="p-5 lg:p-4 flex flex-col lg:flex-row lg:items-center lg:gap-4">
                            <div className="text-xl lg:text-2xl font-black text-foreground font-mono shrink-0">
                              {m.value}
                            </div>
                            <div>
                              <div className="text-[10px] text-primary font-bold uppercase tracking-wider mt-1 lg:mt-0">
                                {m.label}
                              </div>
                              <div className="text-[9px] text-muted-foreground/60 leading-tight hidden lg:block">
                                {m.sublabel}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA column */}
                    <div className="lg:w-52 shrink-0 border-t lg:border-t-0 lg:border-l border-border/20 group-hover:border-primary/20 transition-colors p-6 flex items-center justify-center">
                      <button
                        onClick={() => {
                          setSelectedUseCase(item);
                          setDetailTab("deep-dive");
                        }}
                        className="flex flex-col items-center justify-center gap-2 w-full h-full py-4 rounded-xl border border-primary/25 bg-primary/5 hover:bg-primary/15 hover:border-primary text-xs font-bold tracking-wider uppercase text-foreground transition-all duration-300 group/btn"
                      >
                        <ArrowRight className="w-5 h-5 text-primary group-hover/btn:translate-x-1 transition-transform duration-200" />
                        <span className="text-center leading-tight">Explore<br/>Architecture</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* SECTION 2: Cybersecurity & Threat Defense Matrix */}
          <div id="cybersecurity" className="mt-32 mb-12 border-b border-border/20 pb-6 scroll-mt-28">
            <span className="text-xs uppercase tracking-widest font-extrabold text-accent bg-accent/10 px-3 py-1 rounded-md border border-accent/20">
              Part 02
            </span>
            <h2 className="text-3xl md:text-4.5xl font-extrabold tracking-tight text-foreground font-display mt-4">
              Cybersecurity & Threat Defense Matrix
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-3xl leading-relaxed">
              Continuous threat simulation, anomaly detection pipelines, and zero-trust isolated executions securing generative AI endpoints.
            </p>
          </div>

          {/* Search Box */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border/20 mb-12">
            <div className="text-muted-foreground text-sm">
              Explore our comprehensive threat defense matrix mapping out critical attack paths and solutions:
            </div>
            <div className="relative w-full lg:w-72 shrink-0">
              <input
                type="text"
                placeholder="Search threat defense cases..."
                value={cyberSearch}
                onChange={(e) => setCyberSearch(e.target.value)}
                className="w-full bg-surface/30 border border-border/60 focus:border-accent/60 rounded-xl px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Sequential Cybersecurity Sections */}
          <div className="space-y-20">
            {cybersecuritySections.map((section) => {
              const sectionCases = cybersecurityData.filter(uc => {
                const matchesCategory = uc.subCategory === section.title;
                const matchesSearch = uc.title.toLowerCase().includes(cyberSearch.toLowerCase()) ||
                                      uc.description.toLowerCase().includes(cyberSearch.toLowerCase()) ||
                                      uc.solution.toLowerCase().includes(cyberSearch.toLowerCase()) ||
                                      uc.businessValue.toLowerCase().includes(cyberSearch.toLowerCase());
                return matchesCategory && matchesSearch;
              });

              // If search is active and there are no matching cases for this section, hide it
              if (cyberSearch && sectionCases.length === 0) return null;

              return (
                <div key={section.id} id={section.id} className="scroll-mt-28">
                  <div className="mb-8 border-l-2 border-accent pl-4">
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display">
                      {section.title}
                    </h3>
                    <p className="mt-1.5 text-xs md:text-sm text-muted-foreground max-w-3xl leading-relaxed">
                      {section.description}
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <AnimatePresence mode="popLayout">
                      {sectionCases.map((uc, index) => (
                        <CyberUseCaseCard key={uc.id} uc={uc} index={index} />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}

            {/* Global fallback if search yields nothing across all sections */}
            {cybersecurityData.filter(uc => {
              return uc.title.toLowerCase().includes(cyberSearch.toLowerCase()) ||
                     uc.description.toLowerCase().includes(cyberSearch.toLowerCase()) ||
                     uc.solution.toLowerCase().includes(cyberSearch.toLowerCase()) ||
                     uc.businessValue.toLowerCase().includes(cyberSearch.toLowerCase());
            }).length === 0 && (
              <div className="text-center py-16 text-muted-foreground text-sm border border-dashed border-border/40 rounded-2xl bg-surface/10">
                No cybersecurity use cases match "{cyberSearch}". Try searching for other terms like "PII", "phishing", or "ransomware".
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide-over Drawer Backdrop & Panel */}
      <AnimatePresence>
        {selectedUseCase && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUseCase(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 cursor-pointer"
            />

            {/* Content Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-50 h-full w-full max-w-3xl bg-surface border-l border-border/40 shadow-2xl overflow-y-auto flex flex-col p-8 md:p-10 font-sans"
            >
              {/* Close & Header */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs uppercase tracking-wider font-bold text-accent bg-accent/10 px-3 py-1 rounded-md border border-accent/20">
                  {selectedUseCase.category}
                </span>
                <button
                  onClick={() => setSelectedUseCase(null)}
                  className="p-2 rounded-xl bg-surface-hover/80 hover:bg-surface-hover border border-border/40 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gradient-primary mb-2">
                  {selectedUseCase.title}
                </h2>
                <p className="text-sm text-muted-foreground italic">
                  {selectedUseCase.tagline}
                </p>
              </div>

              {/* Hardware Config Bar */}
              <div className="bg-surface/50 rounded-2xl border border-border/30 p-5 mb-8">
                <div className="flex items-center gap-2.5 mb-3 text-xs font-bold uppercase tracking-wider text-foreground">
                  <Server className="w-4 h-4 text-primary" />
                  <span>Hardware Deployment Stack</span>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {selectedUseCase.hardwareConfig.map((hw, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span className="font-mono text-foreground/80 leading-relaxed">{hw}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-border/30 mb-8 gap-2">
                <button
                  onClick={() => setDetailTab("deep-dive")}
                  className={`pb-4 px-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                    detailTab === "deep-dive"
                      ? "border-accent text-accent"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Engineering Deep-Dive
                </button>
                <button
                  onClick={() => setDetailTab("capabilities")}
                  className={`pb-4 px-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                    detailTab === "capabilities"
                      ? "border-accent text-accent"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Capabilities
                </button>
                <button
                  onClick={() => setDetailTab("timeline")}
                  className={`pb-4 px-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                    detailTab === "timeline"
                      ? "border-accent text-accent"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Deployment Journey
                </button>
              </div>

              {/* Tab Contents */}
              <div className="flex-grow">
                {detailTab === "deep-dive" && (
                  <div className="space-y-8 animate-fade-in">
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground mb-3">
                        <Activity className="w-4 h-4 text-accent" />
                        <span>The Operational Challenge</span>
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {selectedUseCase.challengeDetailed1}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {selectedUseCase.challengeDetailed2}
                      </p>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground mb-3">
                        <Settings className="w-4 h-4 text-primary" />
                        <span>Engineering Solution Design</span>
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {selectedUseCase.solutionDetailed1}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {selectedUseCase.solutionDetailed2}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">
                        Technologies & Protocols Integrated
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedUseCase.techStack.map((tech, idx) => (
                          <div
                            key={idx}
                            className="bg-surface-hover/80 border border-border/40 px-3.5 py-1.5 rounded-lg flex flex-col gap-0.5"
                          >
                            <span className="text-xs font-bold text-foreground">{tech.name}</span>
                            <span className="text-[9px] text-muted-foreground/80 uppercase tracking-wide">
                              {tech.category}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {detailTab === "capabilities" && (
                  <div className="space-y-6 animate-fade-in">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                      Technical Capabilities Delivered
                    </h4>
                    <div className="grid gap-5">
                      {selectedUseCase.capabilities.map((cap, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-xl border border-border/40 bg-surface/30 flex gap-4 items-start"
                        >
                          <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary shrink-0 mt-0.5">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="font-bold text-sm text-foreground mb-1.5">
                              {cap.title}
                            </h5>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {cap.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {detailTab === "timeline" && (
                  <div className="space-y-8 animate-fade-in">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-6">
                        Implementation & Deployment Journey
                      </h4>
                      
                      <div className="relative pl-6 border-l-2 border-border/40 space-y-8">
                        {selectedUseCase.timeline.map((t, idx) => (
                          <div key={idx} className="relative">
                            {/* Bullet dot */}
                            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-background border-2 border-accent flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                            </div>
                            
                            <div>
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-accent">
                                  {t.phase} ({t.duration})
                                </span>
                              </div>
                              <h5 className="font-bold text-sm text-foreground mb-1.5">
                                {t.title}
                              </h5>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {t.details}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-border/20 pt-8 mt-6">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                        Measurable Outcomes & Business Impact
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {selectedUseCase.outcomes.map((out, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl border border-border/30 bg-surface/20 flex flex-col justify-between"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-foreground/90">
                                {out.title}
                              </span>
                              <span className="text-sm font-extrabold text-accent font-mono">
                                {out.metric}
                              </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                              {out.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer Stats */}
              <div className="border-t border-border/30 pt-8 mt-8 grid grid-cols-3 gap-4">
                {selectedUseCase.metricsSummary.map((m, idx) => (
                  <div key={idx} className="text-center bg-surface/30 rounded-xl p-3 border border-border/20">
                    <div className="text-xl font-extrabold text-foreground font-mono">
                      {m.value}
                    </div>
                    <div className="text-[10px] text-accent font-semibold uppercase tracking-wider mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CaseStudies />
      <CTA />
    </>
  );
}
