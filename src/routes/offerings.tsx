import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CTA } from "@/components/site/CTA";
import { motion } from "framer-motion";
import { CheckCircle2, BarChart3, Zap, Cpu, Globe } from "lucide-react";
import { SectionLink } from "@/components/site/Header";

export const Route = createFileRoute("/offerings")({
  component: OfferingsPage,
});

/* ─── Type Definitions ─────────────────────────────────────────── */

interface OfferingCategory {
  id: string;
  title: string;
  description: string;
  solutions: string[];
  capabilities: string[];
  useCases: string[];
  advisory?: string[];
}

/* ─── Data Arrays ──────────────────────────────────────────────── */

const offeringCategories: OfferingCategory[] = [
  {
    id: "gpu-optimization",
    title: "Category 1: GPU Optimization",
    description: "Maximizing compute throughput, memory bandwidth, and interconnect efficiency for high-performance AI workloads.",
    solutions: [
      "Dynamic Workload Balancing: Distributing inference and training requests across GPUs to prevent bottlenecks and maximize utilization.",
      "Memory Bandwidth Optimization: Restructuring data pipelines and tensor layouts to minimize memory bottlenecks and maximize DRAM throughput.",
      "GPU Super Scaling: Engineering seamless scale-out architectures to orchestrate tens of thousands of GPUs for foundation model training, managing gradient synchronization and fault tolerance at extreme scale.",
      "Multi-Tenant GPU Orchestration: Isolating GPU resources using MIG (Multi-Instance GPU) and vGPU technologies for secure, concurrent workspace utilization.",
      "Kernel-Level Compute Tuning: Customizing CUDA/Triton kernels to align specifically with the mathematical operations of your unique model architectures.",
      "NCCL/TCP Communication Overhead Reduction: Optimizing inter-GPU and inter-node communication to eliminate gradient synchronization bottlenecks.",
      "Inference Latency Reduction: Applying advanced quantization (INT8/FP8), pruning, and speculative decoding to shrink token generation latency.",
      "Thermal and Power Management Optimization: Engineering power-capping and dynamic frequency scaling to maintain peak performance within thermal limits.",
      "GPU Pooling and Fractional Sharing: Deploying time-slicing and spatial partitioning to allow multiple lightweight models to share a single physical GPU.",
      "NVLink/NVSwitch Interconnect Optimization: Configuring topologies to ensure P2P (peer-to-peer) memory access is fully leveraged for model parallelism."
    ],
    capabilities: [
      "High-Performance Compute (HPC) Tuning",
      "Energy-Efficient GPU Scheduling",
      "Real-Time Inference Acceleration",
      "GPU Super-Scaling & Global Cluster Orchestration",
      "Ultra-Low Latency HPC Network Fabric Engineering",
      "GPU Memory Fragmentation Mitigation",
      "Custom CUDA/Triton Kernel Development",
      "Heterogeneous Compute Management (CPU/GPU/DPU)",
      "Deep GPU Utilization Analytics & Telemetry",
      "Bare-Metal GPU Provisioning & Optimization"
    ],
    useCases: [
      "Large-scale LLM pre-training acceleration",
      "Real-time video analytics and computer vision pipelines",
      "High-frequency trading algorithm execution",
      "Genomics sequencing and protein folding simulations",
      "Autonomous vehicle perception model processing",
      "Real-time speech-to-speech translation engines",
      "Massive-scale click-through rate (CTR) recommendation engines",
      "3D rendering and digital twin physics simulations",
      "Federated learning across distributed edge nodes",
      "Edge-to-cloud GPU workload offloading",
      "Financial risk modeling and Monte Carlo simulations",
      "Medical imaging inference (MRI/CT scan analysis)",
      "Telecommunications network traffic optimization",
      "Foundation model pre-training across globally distributed GPU super-clusters",
      "Ultra-low latency HPC simulations requiring sub-microsecond inter-node synchronization (e.g., computational fluid dynamics)"
    ]
  },
  {
    id: "llm-optimization",
    title: "Category 2: LLM Optimization",
    description: "Engineering highly efficient, accurate, and agentic large language model systems.",
    solutions: [
      "Parameter-Efficient Fine-Tuning (PEFT) Deployment: Implementing LoRA/QLoRA to adapt foundational models without the compute cost of full-parameter training.",
      "Advanced RAG Pipeline Architecture: Designing chunking, embedding, and retrieval pipelines with hybrid search (dense + sparse) for high-fidelity context injection.",
      "Autonomous AI Agent Framework Development: Building tool-calling, memory-managed, and planning-capable agents using frameworks like LangGraph or custom architectures.",
      "Context Window Optimization Strategies: Utilizing rotary positional embeddings (RoPE) scaling, sliding window attention, and hierarchical memory to extend effective context.",
      "Multi-Modal Model Integration and Routing: Designing orchestration layers that dynamically route text, image, and audio inputs to specialized multi-modal models.",
      "Prompt Chaining and Structured Output Generation: Enforcing JSON/XML schema outputs and complex multi-step reasoning chains for enterprise API integration.",
      "LLM Routing and Load Balancing: Implementing semantic routers to direct queries to small/specialized models versus large foundational models based on complexity.",
      "Vector Embedding Optimization and Indexing: Tuning embedding dimensions and leveraging HNSW or IVF indexing for sub-millisecond semantic search.",
      "Hallucination Mitigation Frameworks: Integrating semantic validation layers, self-consistency checks, and grounded generation techniques.",
      "Cost-Per-Token Optimization Strategies: Implementing caching layers (Semantic Caching), prompt compression, and vocabulary trimming to reduce API and compute costs."
    ],
    capabilities: [
      "Advanced Prompt Engineering & System Prompt Design",
      "Domain-Specific LLM Adaptation & Alignment",
      "Semantic Search & Retrieval Engineering",
      "Agentic Workflow & State Machine Design",
      "Multi-Modal Data Processing & Fusion",
      "Tokenization Optimization & Custom Tokenizers",
      "Knowledge Graph Integration (GraphRAG)",
      "LLM Evaluation & Red-Team Benchmarking",
      "Contextual Memory Management (Short/Long-term)",
      "Instruction Tuning & RLHF/DPO Implementation"
    ],
    useCases: [
      "Enterprise knowledge base conversational search",
      "Automated software code generation, review, and refactoring",
      "Intelligent document processing (IDP) and structured data extraction",
      "Customer support ticket routing, summarization, and resolution",
      "Legal contract analysis, clause extraction, and compliance checking",
      "Automated clinical trial data summarization and patient matching",
      "E-commerce personalized product description generation at scale",
      "Multi-lingual real-time content localization and cultural adaptation",
      "Financial earnings call analysis and insider sentiment extraction",
      "Supply chain demand forecasting agents with tool-calling capabilities",
      "HR policy query and automated employee onboarding assistants",
      "Marketing copy generation, A/B testing, and SEO optimization",
      "IT helpdesk autonomous remediation and scripting agents",
      "Interactive educational tutoring systems with Socratic reasoning",
      "Complex data query translation (Text-to-SQL) for non-technical users"
    ]
  },
  {
    id: "ai-trust-reliability",
    title: "Category 3: AI Trust & Reliability Engineering",
    description: "Ensuring AI systems remain accurate, fair, resilient, and strictly aligned with business SLAs.",
    solutions: [
      "Continuous Model Drift Detection Systems: Implementing statistical monitoring (KL divergence, PSI) to detect data and concept drift in real-time.",
      "Automated CI/CD Retraining Pipelines: Building triggers that automatically retrain and validate models when performance metrics degrade below thresholds.",
      "AI Red-Teaming and Adversarial Stress Testing: Simulating hostile inputs and edge-case scenarios to break models before they reach production.",
      "End-to-End LLM Observability Stack: Deploying tracing, span analysis, and token-level logging to debug complex agentic workflows.",
      "AI-Specific SLA/SLO Definition & Enforcement: Establishing strict latency, accuracy, and availability bounds with automated circuit breakers.",
      "Data Quality Validation Frameworks: Implementing Great Expectations or custom schemas to catch upstream data poisoning before training.",
      "Bias Detection and Fairness Auditing: Measuring model outputs across protected demographics to ensure regulatory and ethical compliance.",
      "Explainable AI (XAI) Integration: Integrating SHAP, LIME, or attention visualization to make model decision-making transparent to stakeholders.",
      "Cascade Failure Prevention Architectures: Designing bulkheads and fallback mechanisms (e.g., LLM to rule-based fallback) to stop systemic failures.",
      "Feedback Loop Integration for HITL: Creating seamless human-in-the-loop pipelines to capture user corrections for continuous model improvement."
    ],
    capabilities: [
      "Statistical Drift & Outlier Analysis",
      "Automated ML Pipeline Orchestration (CI/ML)",
      "Adversarial Prompt Resilience Testing",
      "Deep Traceability & Data/Model Lineage Tracking",
      "Real-Time Performance Anomaly Detection",
      "Model Versioning, Rollback & Shadow Deployments",
      "Fairness Metric Computation & Reporting",
      "Interpretability & Feature Importance Visualization",
      "Chaos Engineering for Distributed AI Systems",
      "Continuous Integration for Machine Learning (CI/ML)"
    ],
    useCases: [
      "Fraud detection model degradation prevention in banking",
      "Healthcare diagnostic AI accuracy assurance and FDA compliance",
      "Autonomous driving decision reliability and edge-case validation",
      "High-frequency trading algorithm stability and fail-safe monitoring",
      "Content moderation consistency maintenance across dynamic internet slang",
      "Manufacturing predictive maintenance sensor drift correction",
      "NLP sentiment analysis accuracy tracking over evolving public opinion",
      "Facial recognition bias auditing and demographic parity enforcement",
      "Recommendation system filter bubble prevention and diversity injection",
      "Speech recognition accuracy monitoring across evolving regional dialects",
      "Credit scoring model compliance monitoring (Equal Credit Opportunity Act)",
      "Chatbot toxicity and safety guardrail enforcement at scale",
      "Robotic process automation (RPA) exception handling and self-healing",
      "Supply chain forecasting error boundary management and alerting",
      "Insurance claims auto-adjudication reliability and appeals triggering"
    ]
  },
  {
    id: "ai-cybersecurity",
    title: "Category 4: AI Cybersecurity",
    description: "Hardening the AI lifecycle from data ingestion to model inference against novel threat vectors.",
    solutions: [
      "Adversarial Robustness Testing & Hardening: Training models to resist perturbed inputs (e.g., Fast Gradient Sign Method) that cause misclassifications.",
      "Model Inversion & Data Extraction Defense: Implementing differential privacy and output perturbation to prevent adversaries from reconstructing training data.",
      "Confidential Computing for Secure Inference: Utilizing Hardware Security Modules (HSMs) and Trusted Execution Environments (TEEs) to process data in encrypted memory.",
      "AI/ML Supply Chain Vulnerability Scanning: Auditing third-party models, HuggingFace pipelines, and open-source dependencies for hidden malware or backdoors.",
      "Threat Modeling for Machine Learning Systems: Applying STRIDE or ATT&CK frameworks specifically tailored to ML data pipelines, model APIs, and inference endpoints.",
      "Model Watermarking & IP Protection: Embedding imperceptible cryptographic signatures into model weights to prove ownership and prevent unauthorized copying.",
      "Prompt Injection Defense Mechanisms: Deploying input sanitization, classifiers, and LLM firewalls to block jailbreaks and indirect prompt injections.",
      "Secure Federated Learning Architectures: Enabling distributed model training without exposing raw client data to the central server or other peers.",
      "Homomorphic Encryption for Data Privacy: Allowing models to compute predictions on encrypted data, ensuring absolute privacy in highly regulated industries.",
      "AI-Powered Security Operations Center (AI-SOC) Integration: Hardening the internal AI tools used by security teams against adversarial evasion attacks."
    ],
    capabilities: [
      "Penetration Testing for Neural Networks",
      "Differential Privacy Implementation & Tuning",
      "Zero-Trust Architecture for ML APIs",
      "Secure Model Serialization & Safe Deserialization",
      "Hardware-Backed Trusted Execution Environment (TEE) Setup",
      "Training Data Poisoning Detection",
      "Anomaly-Based AI Threat Detection",
      "Cryptographic Model Provenance Tracking",
      "Secure Multi-Party Computation (SMPC)",
      "Regulatory Compliance Mapping (NIST AI RMF, EU AI Act)"
    ],
    useCases: [
      "Protecting proprietary LLM weights from theft by malicious insiders",
      "Securing healthcare AI against patient data reconstruction (HIPAA compliance)",
      "Defending autonomous drones against sensor spoofing and adversarial light patterns",
      "Preventing prompt injection attacks on customer-facing banking chatbots",
      "Securing AI models deployed in financial fraud detection from evasion attacks",
      "Hardening biometric authentication systems against deepfake and adversarial presentation attacks",
      "Protecting AI-generated intellectual property (e.g., proprietary art/audio models) with watermarking",
      "Securing third-party ML model dependencies in enterprise software supply chains",
      "Safe deployment of AI in classified government and defense environments",
      "Preventing data poisoning in crowdsourced annotation and training datasets",
      "Secure cross-institutional medical research collaboration without data sharing",
      "Defending against model denial-of-service (DoS) attacks via pathological inputs",
      "Securing edge AI devices in IoT botnets against physical and network tampering",
      "Compliance with emerging AI privacy regulations (GDPR, EU AI Act)",
      "Preventing generative AI models from leaking sensitive corporate secrets via memorization"
    ]
  },
  {
    id: "ai-infrastructure",
    title: "Category 5: AI Infrastructure Engineering",
    description: "Designing the foundational cloud-native, scalable, and automated systems that power enterprise AI.",
    solutions: [
      "End-to-End MLOps/LLMOps Pipeline Architecture: Building automated pipelines from data ingestion to model serving and monitoring.",
      "Highly Available Scalable Vector Database Deployment: Architecting and tuning systems like Milvus, Pinecone, or Weaviate for enterprise-grade RAG workloads.",
      "Kubernetes for AI (K8s) Workload Orchestration: Deploying specialized K8s operators (e.g., KubeRay, TorchElastic) for distributed training and inference.",
      "Serverless GPU Provisioning & Auto-Scaling: Implementing scale-to-zero GPU architectures for sporadic batch inference workloads to optimize costs.",
      "Event-Driven AI Microservices Design: Decoupling AI processing using Kafka, Pulsar, or AWS EventBridge for asynchronous, highly resilient pipelines.",
      "Feature Store Architecture & Management: Building centralized feature repositories to ensure consistency between training and serving environments.",
      "Unified Data Lakehouse for AI Training: Architecting Delta Lake or Apache Iceberg solutions to provide scalable, ACID-compliant data access for model training.",
      "Infrastructure-as-Code (IaC) for AI Environments: Using Terraform and Pulumi to version-control and replicate complex GPU clusters and network fabrics.",
      "Hybrid/Multi-Cloud AI Workload Routing: Designing architectures that seamlessly burst training workloads from on-prem to AWS/GCP/Azure based on cost and capacity.",
      "Cost-Optimized Storage Tiering for ML Datasets: Implementing lifecycle policies to move frequently accessed training data to NVMe, and cold data to S3/Glacier."
    ],
    capabilities: [
      "Cloud-Native AI Deployment & Containerization",
      "GPU Cluster Provisioning Automation",
      "High-Throughput Data Ingestion Engineering",
      "Distributed Storage System Optimization (Lustre, GPFS)",
      "Containerized Model Serving (Triton, vLLM, TGI)",
      "CI/CD Pipeline Automation for Machine Learning",
      "Infrastructure Cost Optimization (FinOps for AI)",
      "Real-Time Streaming Data Integration (Kafka/Flink)",
      "Multi-Cloud Architecture Design & Abstraction",
      "Decentralized Compute Orchestration"
    ],
    useCases: [
      "Building enterprise-scale internal ML platforms from scratch",
      "Migrating on-premise HPC AI workloads to optimized cloud environments",
      "Orchestrating millions of daily LLM inferences with automatic failover",
      "Managing petabyte-scale image and text training datasets efficiently",
      "Deploying real-time recommendation engines on Kubernetes with horizontal pod autoscaling",
      "Setting up enterprise RAG infrastructure with highly available vector databases",
      "Implementing serverless pipelines for nightly batch risk scoring",
      "Creating event-driven architectures for real-time fraud detection and blocking",
      "Automating GPU infrastructure provisioning for data science teams via self-service portals",
      "Designing disaster recovery and business continuity for mission-critical AI systems",
      "Building centralized feature stores to accelerate model development for 100+ data scientists",
      "Optimizing cloud spend for sporadic, compute-heavy generative AI rendering tasks",
      "Setting up edge-to-cloud infrastructure for federated IoT AI devices",
      "Implementing data versioning (DVC) and lineage tracking for strict audit compliance",
      "Architecting secure, multi-tenant AI development environments for distinct business units",
      "Energy Optimization: Designing AI Data Center Power Usage Effectiveness (PUE) tracking systems that dynamically cap GPU power and schedule non-urgent training jobs during off-peak energy hours.",
      "Energy Optimization: Implementing carbon-aware AI training pipelines that automatically route workloads to cloud regions with the highest availability of renewable energy sources.",
      "I/O Optimization: Bypassing traditional POSIX file systems to engineer high-throughput I/O pipelines (using GDS - GPU Direct Storage) for training on billions of small, unstructured files (e.g., web scraping datasets).",
      "I/O Optimization: Architecting NVMe-oF (NVMe over Fabric) storage clusters to eliminate I/O bottlenecks and reduce multi-TB model checkpointing times from hours to minutes.",
      "Memory Optimization: Tuning unified memory architectures (e.g., Apple Silicon clusters or NVLink shared memory pools) to load massive 100B+ parameter models for inference without requiring aggressive quantization or pipeline parallelism."
    ]
  },
  {
    id: "energy-optimization-hyperscale",
    title: "Category 6: Energy Optimization for Hyperscale AI Data Centers",
    description: "Engineering sustainable, high-performance power ecosystems for multi-Gigawatt AI supercomputing campuses.",
    solutions: [
      "GPU Energy Optimization: Dynamic Per-GPU Power Capping & Shifting — Implementing granular, workload-aware power limits at the GPU level, shifting power to critical nodes during complex attention-mechanism calculations and capping during memory-bound phases.",
      "GPU Energy Optimization: Ultra-High Density Direct-to-Chip (D2C) Liquid Cooling — Deploying cold-plate architectures capable of handling 100kW–120kW+ per rack, completely eliminating air-cooling bottlenecks for 1kW+ GPUs (e.g., Nvidia Blackwell).",
      "GPU Energy Optimization: Voltage-Frequency (DVFS) Tuning for LLM Training — Customizing undervolting profiles that sacrifice marginal compute speed (1-2%) for massive power savings (10-15%) across tens of thousands of GPUs.",
      "GPU Energy Optimization: GPU Idle-Power State Management — Engineering custom firmware and orchestration layers that aggressively force GPUs into ultra-low power states during data loading, checkpointing, and network waits.",
      "Network Energy Optimization: SmartNIC/DPU Offloading for Switch Power Reduction — Migrating network processing, encryption, and load balancing to dedicated Data Processing Units (DPUs) to allow top-of-rack (ToR) and spine switches to enter low-power idle states.",
      "Network Energy Optimization: Flattened Network Topology Design — Reducing the number of switch tiers (e.g., moving from 5-tier to 3-tier Clos fabrics) to halve the total number of optical transceivers and switches required, drastically cutting network power overhead.",
      "Network Energy Optimization: Optical Transceiver Power Budgeting — Selecting and tuning co-packaged optics (CPO) and energy-proportional optical links that scale power consumption with actual bandwidth usage rather than drawing peak power at idle.",
      "Facility & Grid Energy Optimization: AI-Predictive Free Cooling Optimization — Using machine learning to predict local weather patterns and AI workload heat generation, maximizing free cooling (economizer) usage and minimizing chiller compressor activation.",
      "Facility & Grid Energy Optimization: Carbon-Aware & Geographic Workload Routing — Orchestrating LLM training jobs across a global fleet of data centers, routing workloads to regions where the grid is currently saturated with renewable energy (solar/wind).",
      "Facility & Grid Energy Optimization: High-Efficiency Medium-Voltage DC Power Distribution — Bypassing multiple AC/DC conversion stages by delivering medium-voltage DC power directly to the GPU racks, eliminating up to 5% of total facility energy loss."
    ],
    capabilities: [
      "Multi-GW Power Flow Modeling & Simulation",
      "Computational Fluid Dynamics (CFD) for Hyper-Density Racks",
      "AI/ML Workload Power Profiling & Forecasting",
      "Liquid Cooling Loop Balancing & Fluid Dynamics Engineering",
      "Network Fabric Power-to-Bandwidth Ratio Optimization",
      "Hardware-Level GPU/FPGA DVFS Customization",
      "Smart Grid Interconnection & Demand Response Engineering",
      "Carbon Lifecycle Analysis (LCA) for AI Infrastructure",
      "Real-Time PUE/WUE/PFUE Telemetry Architecture",
      "Thermal-Mechanical Design & Vendor Agnostic Integration"
    ],
    useCases: [
      "The 2GW Grid Interconnection Bottleneck: A hyperscaler is delayed by 3 years waiting for utility grid upgrades. Solution: We implement an islanded microgrid with 500MWh of battery storage and on-site solar, allowing phased deployment of 100,000 GPUs while waiting for the grid.",
      "Mitigating Thermal Throttling in 100kW Racks: An LLM pre-training cluster repeatedly throttles during peak loads, losing 15% throughput. Solution: Retrofitted with D2C liquid cooling and rear-door heat exchangers, eliminating throttling and increasing sustained FLOPS by 18%.",
      "Slashing Network Power Overhead in a 50,000 Node Cluster: The InfiniBand fabric consumes 20% of the total campus power. Solution: Flattened the network topology and implemented DPU offloading, reducing network power draw by 35% (saving megawatts) with zero impact on training latency.",
      "Carbon-Aware Training for EU Compliance: A global AI company faces strict EU carbon reporting limits. Solution: Deployed a carbon-aware scheduler that pauses non-urgent fine-tuning jobs during peak grid carbon intensity, reducing the carbon footprint of the region's AI workloads by 40%.",
      "DVFS Tuning for Multi-Billion Dollar Training Runs: During a massive foundational model training run, power costs are projected to exceed $50M. Solution: Applied custom DVFS profiling, reducing overall cluster power by 12% and saving nearly $6M in electricity costs with less than a 1% increase in total time-to-train.",
      "Zero-Water Liquid Cooling in Arid Climates: A GW-scale campus in Arizona faces strict water usage restrictions, preventing traditional evaporative cooling. Solution: Designed a closed-loop D2C liquid cooling system with dry coolers, achieving a WUE of near-zero (0.1 L/kWh) while maintaining optimal GPU temperatures.",
      "Waste Heat Monetization for Municipal Heating: A hyperscale campus in Northern Europe generates 150MW of continuous waste heat. Solution: Designed a heat-recovery interface connected to the city’s district heating network, generating $15M annually in recurring revenue while decarbonizing the local city grid.",
      "Eliminating AC/DC Conversion Losses: A legacy AI facility is suffering from high PUE (1.6) due to inefficient power distribution. Solution: Engineered a transition to 400V DC direct power to the GPU racks, dropping facility PUE to 1.25 and saving 4MW of continuous power.",
      "Predictive Cooling for Bursty AI Inference: An inference cluster experiences massive, unpredictable spikes in power draw, causing chillers to lag and waste energy. Solution: Implemented an AI-driven predictive DCIM system that reads the inference queue and pre-cools the facility 5 minutes ahead of demand, cutting cooling energy by 25%.",
      "Optical Transceiver Idle-Power Optimization: A massive RPC (Remote Procedure Call) based distributed AI network wastes power on idle optical links. Solution: Engineered energy-proportional optical links that power down inactive lanes, saving 8MW of power across the campus network fabric during low-traffic hours."
    ],
    advisory: [
      "GW-Scale Power & Capacity Strategy Advisory: End-to-end consulting for securing, designing, and managing multi-Gigawatt utility interconnections, including grid impact assessments and substation planning.",
      "AI Thermal Renaissance & Cooling Transition Workshop: A strategic engagement to map the migration path from air-cooled AI clusters to high-density Direct-to-Chip (D2C) and immersion cooling architectures.",
      "GPU & Network Fabric Energy Audit & Profiling: Deep-dive telemetry assessment to identify per-GPU, per-switch, and per-rack power waste, idle power draw, and thermal throttling events.",
      "Sustainable AI & ESG Compliance Program: Development of strategies to achieve top-tier PFUE (Power Factor Usage Effectiveness), WUE (Water Usage Effectiveness), and Carbon-Aware Computing metrics for regulatory compliance (e.g., EU Energy Efficiency Directive).",
      "AI-Driven Facility Operations (AFO) Implementation: Integration consulting for machine learning models that predictively control facility chillers, pumps, and power distribution based on real-time AI workload queues.",
      "Waste Heat Recovery Monetization Strategy: Feasibility studies, partnership brokering, and financial modeling to convert excess GPU heat into revenue streams (district heating, agriculture, desalination).",
      "Next-Gen Power Architecture & Microgrid Design: Engineering consulting for on-site energy generation, battery energy storage systems (BESS), and islanding capabilities to protect AI training from grid instability."
    ]
  }
];

function DetailedOfferingSection({ data }: { data: OfferingCategory }) {
  const hasAdvisory = !!data.advisory;

  return (
    <div className="py-16 bg-background space-y-16">
      <div className="mx-auto max-w-7xl px-6 space-y-16">

        {/* 1. Core Capabilities Section (4-Column Badges/Chips) */}
        <div className="space-y-6">
          <div className="border-b border-border/40 pb-4">
            <h3 className="text-base md:text-lg font-bold font-display text-foreground flex items-center gap-2">
              <Cpu className="h-4.5 w-4.5 text-primary" />
              Core Capabilities
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Our core technical skills and engineering disciplines in this domain.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.capabilities.map((cap, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-surface/30 hover:border-primary/20 hover:bg-surface-elevated/45 transition-all duration-300"
              >
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <CheckCircle2 className="h-3 w-3" />
                </div>
                <span className="text-xs md:text-sm font-semibold text-foreground leading-snug">{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Technical Solutions Section (2-Column Premium Cards) */}
        <div className="space-y-6">
          <div className="border-b border-border/40 pb-4">
            <h3 className="text-base md:text-lg font-bold font-display text-foreground flex items-center gap-2">
              <Zap className="h-4.5 w-4.5 text-accent" />
              Technical Solutions
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Specific systems, frameworks, and software optimizations we engineer.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {data.solutions.map((sol, i) => {
              const hasSep = sol.includes(" — ");
              const parts = hasSep ? sol.split(" — ") : sol.split(":");
              const title = parts[0];
              const desc = parts.slice(1).join(hasSep ? " — " : ":");
              return (
                <div
                  key={i}
                  className="premium-card p-6 bg-white border border-border/60 hover:border-accent/25 hover:shadow-[0_12px_24px_-8px_rgba(var(--primary),0.03)] rounded-2xl relative overflow-hidden group transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <h4 className="text-sm md:text-base font-bold text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors font-display">
                      {title}
                    </h4>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Advisory Services Section (If present, 2-Column Premium Cards) */}
        {hasAdvisory && (
          <div className="space-y-6">
            <div className="border-b border-border/40 pb-4">
              <h3 className="text-base md:text-lg font-bold font-display text-foreground flex items-center gap-2">
                <Globe className="h-4.5 w-4.5 text-amber-500" />
                Advisory Services
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">Strategic consulting, audits, and power-grid interconnection workshops.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {data.advisory!.map((adv, i) => {
                const parts = adv.split(":");
                const title = parts[0];
                const desc = parts.slice(1).join(":");
                return (
                  <div
                    key={i}
                    className="premium-card p-6 bg-white border border-border/60 hover:border-amber-500/25 hover:shadow-[0_12px_24px_-8px_rgba(245,158,11,0.03)] rounded-2xl relative overflow-hidden group transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-foreground tracking-tight mb-2 group-hover:text-amber-600 transition-colors font-display">
                        {title}
                      </h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. Production Use Cases Section (3-Column Minimal Cards Grid) */}
        <div className="space-y-6">
          <div className="border-b border-border/40 pb-4">
            <h3 className="text-base md:text-lg font-bold font-display text-foreground flex items-center gap-2">
              <BarChart3 className="h-4.5 w-4.5 text-emerald-500" />
              Production Use Cases
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Proven applications and architectural pipelines deployed for clients.</p>
          </div>

          {data.id === "ai-infrastructure" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Platform & Inference Operations", items: data.useCases.slice(0, 15) },
                { title: "Energy Optimization", items: data.useCases.slice(15, 17), prefix: "Energy Optimization: " },
                { title: "I/O Optimization", items: data.useCases.slice(17, 19), prefix: "I/O Optimization: " },
                { title: "Memory Optimization", items: data.useCases.slice(19, 20), prefix: "Memory Optimization: " },
              ].map((section, sidx) => (
                <div key={sidx} className="p-5 border border-border bg-surface/15 rounded-2xl space-y-4 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-accent font-display border-b border-border/40 pb-2">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.items.map((uc, i) => {
                      const cleanUc = section.prefix ? uc.replace(section.prefix, "") : uc;
                      return (
                        <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                          <span className="text-emerald-500 font-bold shrink-0 mt-0.5">•</span>
                          <span>{cleanUc}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.useCases.map((uc, i) => {
                const parts = uc.split(":");
                const hasLabel = parts.length > 1 && parts[0].length < 60;
                const title = hasLabel ? parts[0] : "";
                const body = hasLabel ? parts.slice(1).join(":") : uc;

                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-5 rounded-2xl border border-border bg-surface/15 hover:bg-surface-elevated/45 hover:border-emerald-500/20 transition-all duration-200 shadow-sm"
                  >
                    <span className="text-emerald-500 text-base font-bold shrink-0 mt-0.5">•</span>
                    <div className="text-xs md:text-sm leading-relaxed text-muted-foreground">
                      {hasLabel ? (
                        <>
                          <strong className="text-foreground font-semibold font-display block mb-1">{title}</strong>
                          {body}
                        </>
                      ) : (
                        uc
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

/* ─── Main Offerings Page Component ───────────────────────────── */

function OfferingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Professional Service Portfolio & Industry Solutions – 2026"
        title={
          <>
            Full-Stack AI Engineering & <br />
            Industry <span className="text-accent">Solutions</span>
          </>
        }
        description="Comprehensive engineering offerings and tailored vertical solutions built for extreme efficiency, reliability, and Zero-Trust safety."
      />

      {/* Grouped sticky category navigation */}
      <div className="sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border/40 py-4">
        <div className="mx-auto max-w-7xl px-6">
          
          {/* Engineering Pillars Row */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 w-full sm:w-auto sm:mr-3">
              Engineering Pillars:
            </span>
            {offeringCategories.map((cat) => (
              <SectionLink
                key={cat.id}
                href={`/offerings#${cat.id}`}
                className="px-3.5 py-1.5 rounded-full border border-border/60 hover:border-primary/45 bg-surface/20 hover:bg-surface/50 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all duration-200"
              >
                {cat.title.replace(/Category \d+: /, "")}
              </SectionLink>
            ))}
          </div>

        </div>
      </div>

      <div className="bg-background">
        
        {/* PART 1: Engineering Pillars & Offerings */}
        <div className="bg-surface/10 py-16 border-b border-border/40">
          <div className="mx-auto max-w-7xl px-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-accent mb-4">
              Part 01
            </span>
            <h2 className="text-2xl md:text-4.5xl font-extrabold tracking-tight text-foreground font-display">
              Core Technical Offerings & Engineering Pillars
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-3xl leading-relaxed">
              Deep tech professional services focused on optimization. Built on the pillars of Performance, Security, Scalability, Reliability, and Cost-Efficiency.
            </p>
          </div>
        </div>

        <div>
          {offeringCategories.map((cat, catIndex) => (
            <div key={cat.id} id={cat.id} className="border-b border-border/30 last:border-0 scroll-mt-32">
              <div className="bg-surface/20 py-12 border-b border-border/40">
                <div className="mx-auto max-w-7xl px-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-accent mb-3">
                    Pillar 0{catIndex + 1}
                  </span>
                  <h2 className="text-xl md:text-2.5xl font-bold tracking-tight text-foreground font-display">
                    {cat.title.replace(/Category \d+: /, "")}
                  </h2>
                  <p className="mt-2 text-xs md:text-sm text-muted-foreground max-w-3xl leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
              <DetailedOfferingSection data={cat} />
            </div>
          ))}
        </div>

        {/* Redirect Banner to Industries Page */}
        <div className="bg-surface/40 py-20 border-t border-border/40 text-center">
          <div className="mx-auto max-w-4xl px-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-accent mb-4">
              Looking for Industry-Specific AI?
            </span>
            <h2 className="text-3xl md:text-4.5xl font-extrabold tracking-tight text-gradient font-display leading-[1.2]">
              Domain-Specific Enterprise AI Solutions
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              We deploy sovereign, secure, and compliant AI workloads tuned for specialized industries, including finance, manufacturing, healthcare, and energy.
            </p>
            <Link
              to="/industries"
              className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Explore Industry Solutions →
            </Link>
          </div>
        </div>

      </div>

      <div className="py-24 bg-surface/20 border-b border-border/40 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-4">
            Implementation & Deployment Approach
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            All offerings and industry solutions can be engaged modularly or as integrated full-stack programs. We deploy under Zero Trust architectures on private cloud, sovereign facilities, or hybrid infrastructure.
            Contact our engineering team to design your custom roadmap.
          </p>
        </div>
      </div>

      <CTA />
    </>
  );
}
