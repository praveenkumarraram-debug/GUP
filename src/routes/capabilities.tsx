import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Zap, Cpu, Bot, Shield, Gauge, CheckCircle2, ShieldCheck, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SectionTemplate, type SectionData } from "@/components/site/SectionTemplate";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/capabilities")({
  component: CapabilitiesPage,
});

interface MatrixCapability {
  capability: string;
  description: string;
  outcomes: string;
  relevance: string;
}

interface MatrixCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  emoji: string;
  description: string;
  capabilities: MatrixCapability[];
}

const matrixCategories: MatrixCategory[] = [
  {
    id: "gpu-eng",
    title: "GPU Performance Engineering",
    icon: Zap,
    emoji: "🔥",
    description: "Unlock the full potential of your GPU infrastructure with deep technical optimizations, cost efficiency, and workload-specific tuning.",
    capabilities: [
      {
        capability: "Low-Level Kernel Optimization",
        description: "Custom CUDA/ROCm kernel development, compiler fusions, and memory hierarchy tuning (e.g., FlashAttention-3, PagedAttention).",
        outcomes: "30–70%+ kernel speedups, 20–50%+ latency reduction, 90%+ hardware utilization.",
        relevance: "Critical for proprietary architectures, latency-sensitive workloads (HFT, defense, scientific simulation)."
      },
      {
        capability: "Applied GPU Acceleration",
        description: "TensorRT-LLM/vLLM optimization, quantization (FP8/INT4), and multi-dimensional parallelism.",
        outcomes: "4–8x inference throughput, 50–80%+ cost-per-token reduction, sub-second latency.",
        relevance: "Essential for scaling large models (70B+), high-throughput inference, and multimodal pipelines."
      },
      {
        capability: "FinOps & Cost Diagnostics",
        description: "GPU spend auditing, SKU right-sizing, spot/preemptible strategies, and unit-economic dashboards.",
        outcomes: "40–70%+ cost reduction, 70–90% spot savings, granular per-token/per-user metrics.",
        relevance: "Ideal for organizations with escalating cloud bills or poor ROI visibility."
      },
      {
        capability: "Workload-Specific Optimization",
        description: "Tailored optimization for LLM training/inference, computer vision, scientific HPC, and genomics.",
        outcomes: "4–8x tokens/sec, 50–80% cost-per-token reduction, 2–5x domain acceleration.",
        relevance: "Perfect for domain-specific workloads requiring precision-tuned performance."
      }
    ]
  },
  {
    id: "ai-infra",
    title: "AI Infrastructure Design & Optimization",
    icon: Cpu,
    emoji: "⚙️",
    description: "Build scalable, secure, and high-performance AI infrastructure tailored to your enterprise needs.",
    capabilities: [
      {
        capability: "Mega-Scale Data Center Optimization",
        description: "End-to-end design for 10,000+ GPU deployments, including InfiniBand/RoCEv2 fabric tuning and liquid cooling.",
        outcomes: "95–97%+ scaling efficiency, 85–95%+ GPU utilization, 25–40%+ TCO reduction.",
        relevance: "Critical for hyperscalers, sovereign AI initiatives, and national-scale infrastructure."
      },
      {
        capability: "Enterprise GPU Platforms",
        description: "Topology-aware scheduling, MIG/vGPU multi-tenancy, and self-healing telemetry (DCGM).",
        outcomes: "80–95%+ cluster utilization, ~1% idle waste, 40–60%+ TCO improvement.",
        relevance: "Ideal for corporate data centers with fragmented GPU usage and high idle time."
      },
      {
        capability: "AI-Native Cloud/Hybrid Infrastructure",
        description: "Kubernetes for AI, distributed training infrastructure, and AI FinOps optimization.",
        outcomes: "128+ GPU scaling, high-availability design, 2–8x storage throughput.",
        relevance: "Essential for organizations transitioning to hybrid or multi-cloud AI environments."
      },
      {
        capability: "Networking & Storage Optimization",
        description: "NCCL collective tuning, GPUDirect Storage, and Zero Trust network boundaries.",
        outcomes: "95–97%+ fabric scaling efficiency, low-latency access, SOC2/FedRAMP compliance.",
        relevance: "Perfect for high-speed, secure, and compliant AI workloads."
      }
    ]
  },
  {
    id: "llm-agents",
    title: "LLM & Agents Optimization",
    icon: Bot,
    emoji: "🤖",
    description: "Deploy production-grade LLMs and autonomous agents with fine-tuning, guardrails, and multi-agent orchestration.",
    capabilities: [
      {
        capability: "Fine-Tuning & Quantization",
        description: "Domain-specific adaptation using LoRA/QLoRA, DPO/RLHF, and FP8/INT4 quantization.",
        outcomes: "50–80%+ inference cost reduction, 4–8x throughput boost, 99%+ accuracy retention.",
        relevance: "Critical for organizations with proprietary terminologies or high inference costs."
      },
      {
        capability: "Evaluation & Guardrails Gateway",
        description: "Real-time prompt/output filtering for injection, PII leaks, and hallucinations.",
        outcomes: "99.8% prompt injection mitigation, <15ms gateway latency, 0% PII leakage.",
        relevance: "Essential for secure, compliant LLM deployment in regulated industries."
      },
      {
        capability: "Multi-Agent Orchestration",
        description: "LangGraph/CrewAI pipelines, debate mechanisms, and Ray-based parallelism.",
        outcomes: "92–96% complex task completion, 85% reduction in workflow failures, sub-second routing.",
        relevance: "Ideal for complex, multi-step business processes requiring deterministic outcomes."
      },
      {
        capability: "Tool Integration & Action Gating",
        description: "Model Context Protocol (MCP), secure API bindings, and human-in-the-loop oversight.",
        outcomes: "0% unauthorized actions, 3x faster integration, 98.5% tool call routing accuracy.",
        relevance: "Perfect for enterprises requiring secure, governed agent-to-system interactions."
      }
    ]
  },
  {
    id: "cyber-security",
    title: "AI-Driven Cybersecurity for Large-Scale DC & Enterprises",
    icon: Shield,
    emoji: "🔒",
    description: "Protect your AI systems with Zero Trust security, runtime protection, and compliance-ready guardrails.",
    capabilities: [
      {
        capability: "Cyber Dom Security Mesh",
        description: "Runtime threat analysis, exfiltration blockades, and Zero Trust boundaries.",
        outcomes: "99.9% jailbreak detection, <5ms routing overhead, SOC2/FedRAMP/EU AI Act compliance.",
        relevance: "Critical for high-privilege AI systems in regulated environments."
      },
      {
        capability: "Secure Sandbox Execution",
        description: "gVisor/WebAssembly/MicroVMs for safe Bash script execution and dynamic command isolation.",
        outcomes: "0% sandbox breakout rate, <10ms boot time, 100% banned system call blocking.",
        relevance: "Essential for agents requiring terminal access or executing untrusted scripts."
      },
      {
        capability: "Compliance & Auditing",
        description: "Immutable cryptographic audit trails, real-time alerts, and regulatory compliance mapping.",
        outcomes: "Instantaneous incident isolation, SOC2/FedRAMP/EU AI Act readiness.",
        relevance: "Ideal for organizations requiring strict compliance and auditability."
      },
      {
        capability: "Agent-Specific Security",
        description: "Tool execution gating, action validation, and micro-segmented pathways.",
        outcomes: "0% unauthorized executions, granular permission scopes, secure agent-to-database interactions.",
        relevance: "Perfect for enterprises deploying agents in production systems."
      }
    ]
  },
  {
    id: "ai-infra-layers",
    title: "AI Infrastructure (Compute, Storage, GPU/CPU, Networking, Energy Optimization)",
    icon: Gauge,
    emoji: "⚡",
    description: "Optimize every layer of your AI infrastructure for performance, efficiency, and sustainability.",
    capabilities: [
      {
        capability: "Compute Optimization",
        description: "CUDA kernel speedups, TensorRT optimization, and hybrid CPU/GPU pipelines.",
        outcomes: "3–15x performance improvement, 2–5x hybrid workload efficiency.",
        relevance: "Critical for organizations seeking maximum hardware utilization."
      },
      {
        capability: "Storage Optimization",
        description: "GPUDirect Storage, disaggregated serving, and distributed file systems.",
        outcomes: "2–8x throughput improvement, low-latency access for 10K+ GPU clusters.",
        relevance: "Essential for large-scale training and inference workloads."
      },
      {
        capability: "Networking Optimization",
        description: "InfiniBand/RoCEv2 tuning, NCCL collective operations, and topology-aware scheduling.",
        outcomes: "95–97%+ scaling efficiency, GPUDirect RDMA for storage/networking.",
        relevance: "Perfect for high-speed, low-latency AI clusters."
      },
      {
        capability: "Energy Optimization",
        description: "Liquid cooling design, dynamic power profiles, and carbon footprint tracking.",
        outcomes: "15–40% power efficiency gains, 20–30%+ energy savings per workload, EU AI Act compliance.",
        relevance: "Ideal for sustainable, cost-effective AI infrastructure."
      },
      {
        capability: "Unified Governance",
        description: "FinOps dashboards, self-healing telemetry, and multi-cloud integration.",
        outcomes: "Unit-economic metrics, <1–5% cluster downtime, consistent hybrid/cloud policies.",
        relevance: "Critical for organizations managing fragmented or multi-cloud AI environments."
      },
      {
        capability: "NIST AI Risk Management & Governance System",
        description: "Establishing formal AI governance frameworks, mapping intended use context and potential impact, implementing statistical risk measurement indices, and defining continuous mitigation treatments aligned with NIST AI RMF 1.0.",
        outcomes: "100% audit-readiness, 90%+ risk mapping coverage across systems, weeks to setup.",
        relevance: "Establishes a solid, standardized foundation for enterprise AI governance that aligns engineering controls with corporate compliance policies."
      },
      {
        capability: "EU AI Act Conformity Assessment & High-Risk Obligations",
        description: "Comprehensive alignment pipelines for Articles 8–15 of the EU AI Act covering technical data governance, representativeness audits, automated log retention, and robust human-in-the-loop oversight systems.",
        outcomes: "99%+ statistical audit coverage, 100% traced lineage records, Articles 8-15 technical dossiers.",
        relevance: "De-risks EU market access and guarantees compliance with the world's most stringent AI safety legislation."
      },
      {
        capability: "ISO 42001:2023 & ISO 23894 Management Systems (AIMS)",
        description: "Implementing, auditing, and optimizing an Artificial Intelligence Management System (AIMS) under ISO 42001 and ISO 23894 guidance to establish continuous process controls.",
        outcomes: "Full certification audit readiness, standardized QA gates for 100% of internal AI initiatives.",
        relevance: "Creates a universally recognized certifiable management framework for AI systems, demonstrating quality assurance to global buyers."
      },
      {
        capability: "Adversarial AI Red Teaming & Model Penetration Testing",
        description: "Dynamic stress testing and security validation of production models against prompt injection, model extraction, data poisoning, demographic bias, and privacy leakage vectors.",
        outcomes: "99.8% prompt injection capture rate, 99.9% malicious payload block rate, 35%+ EDR detection lift.",
        relevance: "Exposes security and ethical flaws in a controlled sandbox environment before hostile actors exploit them in production."
      },
      {
        capability: "Reliability Architecture, Guardrails & Real-Time Observability",
        description: "Deployment of high-performance proxy gateways (guardrails), real-time drift, bias, and performance monitors, and cryptographically signed audit logging networks.",
        outcomes: "Under 15ms added filter latency, real-time drift alerts within 5 minutes, under 3 minutes incident MTTR.",
        relevance: "Guarantees runtime reliability, safety-first fail-safes, and continuous alignment under live traffic conditions."
      }
    ]
  }
];

const capabilitiesData: SectionData[] = [
  {
    title: "GPU Optimization",
    description: "Maximum hardware throughput and efficiency",
    introduction: "We empower enterprises to achieve peak hardware efficiency through comprehensive Black-Box Optimization (autonomous workload tuning) and White-Box Optimization (transparent kernel profiling).",
    capabilities: [
      "Kernel-level tuning and custom CUDA deployment",
      "Advanced CUDA stream concurrency",
      "TensorRT graph fusion optimization",
      "NCCL topology optimization for multi-GPU communication"
    ],
    solutions: [
      "Automated workload profiling and tuning",
      "Transparent white-box kernel acceleration",
      "Autonomous black-box workload orchestration",
      "Hybrid scaling architectures"
    ],
    useCases: [
      "Real-time inference pipelines requiring ultra-low latency",
      "Large-scale distributed training clusters",
      "Complex computational modeling in HFT and research"
    ],
    outcomes: [
      "Dramatically accelerate workload processing speeds",
      "Significant latency reduction across enterprise applications",
      "Massive throughput gains and hard cost savings"
    ],
    metrics: [
      { label: "Performance Gains", value: "3-15x" },
      { label: "Cost Reduction", value: "40-75%" },
      { label: "Latency Reduction", value: "50%+" },
      { label: "Hardware Utilization", value: "95%" }
    ]
  },
  {
    title: "Cloud GPU Optimization",
    description: "Cloud-neutral multi-cluster orchestration",
    introduction: "Positioning the GPU-phi platform as cloud-neutral and enterprise-ready, we transform fragmented multi-cloud deployments into unified, cost-aware AI factories.",
    capabilities: [
      "Seamless multi-cloud cluster orchestration",
      "Advanced GPU autoscaling with Kubernetes and Ray",
      "Enterprise-grade GPU FinOps strategies",
      "Cross-region workload mobility"
    ],
    solutions: [
      "Cloud-neutral GPU-phi orchestration integration",
      "Automated cost-aware scheduling policies",
      "Dynamic instance provisioning algorithms",
      "Multi-tenant resource isolation"
    ],
    useCases: [
      "Enterprise multi-cloud AI adoption",
      "Global scaling of real-time AI services",
      "Mitigating cloud vendor lock-in strategies"
    ],
    outcomes: [
      "Significantly faster deployment cycles",
      "Unmatched resilience with zero downtime updates",
      "Drastic reduction in cloud infrastructure spending"
    ],
    metrics: [
      { label: "Deployment Speed", value: "5x Faster" },
      { label: "Infrastructure Savings", value: "50%+" },
      { label: "Downtime", value: "Zero" },
      { label: "Cloud Flexibility", value: "100%" }
    ]
  },
  {
    title: "LLM Optimization",
    description: "Accelerating GenAI inference and training",
    introduction: "Unlock the full potential of Large Language Models with specialized hybrid black-box and white-box optimizations that reduce inference costs while accelerating response times.",
    capabilities: [
      "Parameter-Efficient Fine-Tuning (LoRA, QLoRA)",
      "Advanced model quantization (INT8/FP16/AWQ)",
      "Highly distributed inference pipeline orchestration",
      "Context-window memory management"
    ],
    solutions: [
      "Disaggregated serving architectures for LLMs",
      "Hybrid black-box + white-box scaling",
      "Custom kernel integration for transformer blocks",
      "RAG pipeline acceleration"
    ],
    useCases: [
      "Enterprise customer support conversational bots",
      "Automated compliance monitoring and document QA",
      "Real-time predictive analytics and decision engines"
    ],
    outcomes: [
      "Drastically reduces per-token inference cost",
      "Accelerates response times for fluid user experiences",
      "Empowers secure, on-premise foundation model deployment"
    ],
    metrics: [
      { label: "Inference Speed", value: "70% Faster" },
      { label: "Memory Footprint", value: "-60%" },
      { label: "Cost Per Token", value: "-80%" },
      { label: "Throughput", value: "4-8x+" }
    ]
  },
  {
    title: "AI Optimization",
    description: "Intelligent orchestration for AI infrastructure",
    introduction: "Emphasize workload orchestration across heterogeneous GPU clusters with AI-driven scheduling, predictive resource allocation, and automated scaling that guarantees resilience.",
    capabilities: [
      "Heterogeneous GPU cluster workload orchestration",
      "AI-driven workload scheduling algorithms",
      "Predictive resource allocation and capacity planning",
      "Automated and autonomous scaling frameworks"
    ],
    solutions: [
      "Autonomous resilience frameworks",
      "Intelligent capacity forecasting dashboards",
      "Continuous integration/deployment (CI/CD) for ML models",
      "Dynamic priority-based queue management"
    ],
    useCases: [
      "Foundational model training across diverse hardware",
      "Heterogeneous enterprise cluster management",
      "High-throughput internal AI R&D platforms"
    ],
    outcomes: [
      "ROI-driven outcomes with significantly faster model training",
      "Reduced energy consumption across the data center",
      "Improved resilience and fault tolerance for critical workloads"
    ],
    metrics: [
      { label: "Model Training", value: "3x Faster" },
      { label: "Energy Consumption", value: "-40%" },
      { label: "Cluster Uptime", value: "99.99%" },
      { label: "Job Completion", value: "99%+" }
    ]
  },
  {
    title: "Data Center Network Automation",
    description: "Sub-microsecond latency at multi-megawatt scale",
    introduction: "Eliminate network bottlenecks with AI-driven routing controllers, RDMA over InfiniBand, and NVLink topology optimization for autonomous, highly resilient orchestration.",
    capabilities: [
      "RDMA over InfiniBand architectural design",
      "NVLink topology optimization for massive scale",
      "AI-driven routing controllers and traffic management",
      "Adaptive network reflex layers"
    ],
    solutions: [
      "Autonomous network orchestration platforms",
      "Adaptive routing dashboards with real-time telemetry",
      "Congestion control and automated load balancing",
      "Resilient leaf-spine fabric configurations"
    ],
    useCases: [
      "Hyperscale AI training data center networking",
      "Low-latency financial trading (HFT) infrastructure",
      "National sovereign AI computing grid deployments"
    ],
    outcomes: [
      "Achieve absolute sub-microsecond latency",
      "Guarantee 99.9% uptime for business-critical operations",
      "Transform rigid networks into adaptive, self-healing fabrics"
    ],
    metrics: [
      { label: "Network Latency", value: "< 1μs" },
      { label: "Network Uptime", value: "99.9%" },
      { label: "Bandwidth Utilization", value: "95%+" },
      { label: "Packet Loss", value: "Near-Zero" }
    ]
  },
  {
    title: "Energy Optimization",
    description: "Sustainable AI scaling with ESG compliance",
    introduction: "Drive sustainable AI growth through energy-aware scheduling, comprehensive GPU FinOps dashboards, and automated thermal management that aligns with corporate ESG standards.",
    capabilities: [
      "Energy-aware workload scheduling algorithms",
      "Real-time GPU FinOps and sustainability dashboards",
      "Comprehensive sustainability metrics tracking",
      "Dynamic power capping and thermal profiling"
    ],
    solutions: [
      "ESG compliance reporting suites",
      "Intelligent workload time-shifting for off-peak execution",
      "Liquid cooling integration and management",
      "Carbon footprint reduction automation"
    ],
    useCases: [
      "Enterprise sustainability initiatives and ESG mandates",
      "Power-constrained data center environments",
      "Green AI research and development facilities"
    ],
    outcomes: [
      "Massively reduced total power consumption",
      "Proven carbon footprint reduction for enterprise reporting",
      "Strict compliance with evolving ESG standards and regulations"
    ],
    metrics: [
      { label: "Power Consumption", value: "-30%" },
      { label: "ESG Compliance", value: "100%" },
      { label: "Carbon Footprint", value: "-45%" },
      { label: "Cooling Efficiency", value: "2x" }
    ]
  },
  {
    title: "AI Security & Cyber Dom Protection Mesh",
    description: "Continuous Zero-Trust shielding and threat isolation",
    introduction: "Deploy generative AI and autonomous systems with absolute peace of mind. We protect applications, models, and execution hosts from adversarial threats, jailbreaks, and exfiltration attempts.",
    capabilities: [
      "Cyber Dom guardrails for real-time prompt injection blocking",
      "Zero-Trust policy enforcement for models and tools",
      "Cryptographic activity logging for every database read/write",
      "Automated red-teaming and adversarial simulation engines"
    ],
    solutions: [
      "Cyber Dom runtime injection filter mesh integration",
      "PII redaction and exfiltration prevention gateways",
      "Audit compliance tracking suites (SOC2, EU AI Act)",
      "Confidential computing and TEE infrastructure setups"
    ],
    useCases: [
      "Regulated banking systems deploying user-facing conversational LLMs",
      "Federal databases integrated with generative search engines",
      "SaaS systems executing user-supplied prompts with tool bindings"
    ],
    outcomes: [
      "Neutralize prompt injections and model jailbreaks at the gateway",
      "Maintain strict compliance standards in highly audited industries",
      "Guarantee privacy and zero leaks of proprietary enterprise data"
    ],
    metrics: [
      { label: "Jailbreak Block Rate", value: "99.9%" },
      { label: "Filter Latency Overhead", value: "< 5ms" },
      { label: "PII Leak Probability", value: "0%" },
      { label: "Compliance Score", value: "100%" }
    ]
  },
  {
    title: "Hardened Sandbox Shell & Agent Execution",
    description: "Hyper-secure runtimes for dynamic agent-generated code",
    introduction: "Unlock the full potential of shell automation and scripting. We build ephemeral, isolated execution environments that allow agents to write and run code securely without exposing host servers.",
    capabilities: [
      "gVisor, WebAssembly, and MicroVM container isolation",
      "Dynamic pre-execution Bash script parsing and syntax auditing",
      "Strict CPU, memory, and network namespace restrictions",
      "Real-time process telemetry and system call monitoring"
    ],
    solutions: [
      "Ephemeral runner sandboxes integrated with agent pipelines",
      "Blacklisted command and namespace isolation policies",
      "Automatic file system cleanup immediately post-execution",
      "MCP server bindings with restricted execution contexts"
    ],
    useCases: [
      "AI agents performing code correction and running automated tests",
      "Systems deploying shell-capable automation agents for server configs",
      "Data analytics agents writing and executing dynamic Python/Bash scripts"
    ],
    outcomes: [
      "Safe execution of dynamic, AI-generated terminal commands",
      "Zero host contamination or unauthorized lateral network movements",
      "Prevention of infinite loops, memory leaks, and CPU exhaustion"
    ],
    metrics: [
      { label: "Sandbox Breakout", value: "0%" },
      { label: "Container Boot Time", value: "< 10ms" },
      { label: "Blocked Banned Syscalls", value: "100%" },
      { label: "Resource Limits Enforced", value: "100%" }
    ]
  },
  {
    title: "Multi-Agent Fleet Orchestration",
    description: "Stateful coordination of specialist agent teams",
    introduction: "Decompose complex, long-running processes into reliable worker fleets. We engineer distributed multi-agent state machines with robust routing, conflict resolution, and human approval gates.",
    capabilities: [
      "Helvetica or hierarchical multi-agent orchestration design", // preserved comment fallback if appropriate, but keeping original structure
      "Hierarchical and network multi-agent orchestration design",
      "LangGraph and CrewAI distributed workflow development",
      "Human-in-the-Loop Slack/Email action approval gates",
      "Model Context Protocol (MCP) server resource bindings"
    ],
    solutions: [
      "Stateful multi-agent supervisor systems",
      "Automated exception handling and compensation routines",
      "Interactive agent trace observability dashboards",
      "Real-time cost governance and token attribution controls"
    ],
    useCases: [
      "Autonomous coding, testing, and devops pipeline agents",
      "Multi-document financial report reconciliation systems",
      "Autonomous procurement workflows with authorization loops"
    ],
    outcomes: [
      "Scale operational automation without losing governance",
      "Prevent infinite agent loops and execution drift",
      "Seamlessly gate high-risk writes with real-time human reviews"
    ],
    metrics: [
      { label: "Complex Task Success", value: "92-96%" },
      { label: "Loop Failures Blocked", value: "85%+" },
      { label: "Tool Selector Accuracy", value: "98.5%" },
      { label: "Integration Speedup", value: "3x Faster" }
    ]
  },
  {
    title: "AI Trusted Reliability Engineering",
    description: "NIST, ISO 42001, and EU AI Act compliance, AI Red Teaming, and safety guardrails.",
    introduction: "Establish institutional trust and regulatory resilience. AI Trusted Reliability Engineering (AIRE) integrates rigorous compliance frameworks, adversarial testing, and robust reliability guardrails to secure your enterprise AI pipelines against operational, legal, and security threats.",
    capabilities: [
      "NIST AI RMF 1.0 (Govern, Map, Measure, Manage) alignment",
      "EU AI Act Articles 8–15 High-Risk System compliance",
      "ISO 42001:2023 Artificial Intelligence Management System (AIMS) execution",
      "AI Red Teaming (Prompt injection, data poisoning, privacy leak testing)",
      "Trusted AI cross-framework harmonization (explainability, bias audit)",
      "Reliability Architecture (guardrails, real-time observability, signed logs)"
    ],
    solutions: [
      "Bias detection & mitigation pipelines",
      "Explainable AI (XAI) reason code generation",
      "Dual Compliance framework setup (EU AI Act + Medical Device Regulation)",
      "Conformity assessment package dossier preparation",
      "Real-time proxy guardrail gateway deployment"
    ],
    useCases: [
      "High-Risk Generative AI / RAG Systems (e.g. Legal Research Copilots)",
      "Financial Credit Scoring & Underwriting AI (ECOA/FCRA/AIMS compliant)",
      "Healthcare Diagnostic Imaging & Sepsis Early Warning Systems"
    ],
    outcomes: [
      "Establish certifiable audit readiness under ISO 42001",
      "Achieve 99.9% mitigation of prompt injections and jailbreaks",
      "Mitigate disparate impact bias to a ratio of >0.95 across demographic groups",
      "Eliminate PHI and PII data leaks with secure sandbox execution"
    ],
    metrics: [
      { label: "Jailbreak Blocks", value: "99.9%" },
      { label: "Audit Readiness", value: "100%" },
      { label: "Proxy Latency", value: "<15ms" },
      { label: "Bias Mitigation", value: ">0.95" }
    ]
  }
];

function CapabilitiesList() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 space-y-16">
      {matrixCategories.map((category, index) => {
        const Icon = category.icon;
        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="premium-card p-6 md:p-8 bg-card border border-border/60 rounded-xl shadow-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.01] to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              {/* Category header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-border/40 pb-6 mb-8">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/5 border border-primary/10 text-xs font-semibold text-accent mb-3">
                    <Icon className="h-3.5 w-3.5 text-accent" />
                    <span>Category {index + 1}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gradient font-display">
                    {category.emoji} {category.title}
                  </h3>
                </div>
                <p className="max-w-xl text-sm md:text-base text-muted-foreground leading-relaxed md:pt-4">
                  {category.description}
                </p>
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border/50 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest font-mono bg-muted/20">
                      <th className="py-4 px-4 font-semibold w-1/4">Capability</th>
                      <th className="py-4 px-4 font-semibold w-1/3">Description</th>
                      <th className="py-4 px-4 font-semibold w-1/4">Key Outcomes</th>
                      <th className="py-4 px-4 font-semibold w-1/4">Relevance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {category.capabilities.map((row, i) => (
                      <tr
                        key={i}
                        className="group hover:bg-accent/[0.015] transition-colors"
                      >
                        <td className="py-5 px-4 align-top font-semibold text-foreground text-sm leading-snug group-hover:text-accent transition-colors">
                          {row.capability}
                        </td>
                        <td className="py-5 px-4 align-top text-xs md:text-sm text-muted-foreground leading-relaxed">
                          {row.description}
                        </td>
                        <td className="py-5 px-4 align-top text-xs md:text-sm font-semibold text-emerald-600 leading-relaxed font-mono">
                          {row.outcomes}
                        </td>
                        <td className="py-5 px-4 align-top text-xs md:text-sm text-muted-foreground/80 leading-relaxed border-l border-border/10">
                          {row.relevance}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards View */}
              <div className="md:hidden space-y-6">
                {category.capabilities.map((row, i) => (
                  <div
                    key={i}
                    className="p-5 bg-background/50 border border-border/50 rounded-xl space-y-4"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {row.capability}
                      </h4>
                    </div>
                    <div className="space-y-3 pt-3 border-t border-border/40 text-[13px] leading-relaxed">
                      <div>
                        <span className="font-mono text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                          Description
                        </span>
                        <p className="text-muted-foreground">{row.description}</p>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                          Key Outcomes
                        </span>
                        <p className="text-emerald-600 font-semibold">{row.outcomes}</p>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                          Relevance
                        </span>
                        <p className="text-muted-foreground/80">{row.relevance}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Strategic Why section */}
      <div className="pt-8">
        <div className="premium-card p-8 md:p-12 relative overflow-hidden bg-card border border-border/60 rounded-2xl shadow-elevated">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-[10px] uppercase tracking-widest font-semibold text-accent mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
              Strategic Alignment
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-gradient mb-4 font-display">
              💡 Why These Capabilities Matter
            </h3>
            <p className="text-muted-foreground text-sm md:text-base mb-10 leading-relaxed">
              At <span className="font-semibold text-foreground">TrustGrid</span>, we don’t just optimize AI systems—we transform them into strategic assets. Whether you’re scaling GPU clusters, deploying autonomous agents, or securing enterprise AI, our capabilities are designed to:
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-4 p-4 rounded-xl hover:bg-muted/30 transition-colors">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600 border border-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm md:text-base mb-1">Maximize Performance</h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">Achieve 3–15x speedups and near-linear scaling.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 rounded-xl hover:bg-muted/30 transition-colors">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600 border border-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm md:text-base mb-1">Reduce Costs</h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">Cut infrastructure spend by 40–75% with FinOps and optimization.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 rounded-xl hover:bg-muted/30 transition-colors">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600 border border-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm md:text-base mb-1">Ensure Security</h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">Deploy AI with Zero Trust, compliance-ready guardrails.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 rounded-xl hover:bg-muted/30 transition-colors">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600 border border-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm md:text-base mb-1">Future-Proof</h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">Build scalable, sustainable infrastructure for long-term growth.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="🚀 Capabilities"
        title={
          <>
            Engineering AI systems that <br />
            scale from <span className="text-accent font-semibold">GPUs to autonomous enterprises</span>
          </>
        }
        description="Unlock peak performance, cut cloud infrastructure spend, secure sandbox runtimes, and coordinate resilient agent fleets with our production-grade engineering capabilities."
      />

      <div className="bg-background relative">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        
        {/* Render Capability Sections sequentially one by one */}
        <CapabilitiesList />

        {/* Divider / Heading for Deep Dive Sections */}
        <div className="border-t border-border/40 bg-surface/10 py-16">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="text-3xl font-semibold text-gradient mb-3 font-display">
              Deep Dive Competencies
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Explore detailed implementations, custom solutions, use cases, and performance metrics for each domain.
            </p>
          </div>
        </div>

        {/* Restore original detailed capability sections */}
        <div className="bg-background">
          {capabilitiesData.map((data, index) => (
            <SectionTemplate key={index} data={data} />
          ))}
        </div>
      </div>

      <CTA />
    </>
  );
}
