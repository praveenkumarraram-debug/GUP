import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Cpu,
  Bot,
  Brain,
  Shield,
  LayoutGrid,
  Layers,
  Zap,
  Globe,
  BarChart3,
  Server,
  FileText,
  Users,
  Phone,
  BookOpen,
  Car,
  Wrench,
  Settings,
  Home,
  Laptop,
  FlaskConical,
  Hammer,
  Building2,
  Milestone,
  Droplet,
  Sun,
  Anchor,
  Train,
  Landmark,
  Coins,
  ShoppingBag,
  Gem,
  Pill,
  HeartPulse,
  Stethoscope,
  Dna,
  Leaf,
  Package,
  Store,
  Tv,
  Scissors,
  Utensils,
  Film,
  Compass,
  Plane,
  GraduationCap,
  Sprout,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Mega-Menu Data ─────────────────────────────────────────── */

const homeItems = [
  { label: "Overview", href: "/" },
  { label: "Key Metrics & ROI", href: "/#metrics" },
  { label: "Enterprise Challenges", href: "/#challenges" },
  { label: "Engineering Approach", href: "/#approach" },
  { label: "Core Services", href: "/#services" },
  { label: "Client Case Studies", href: "/#case-studies" },
  { label: "Industries We Serve", href: "/#industries" },
  { label: "Technical Ecosystem", href: "/#tech-ecosystem" },
  { label: "Why Choose Us", href: "/#why-trustgrid" },
  { label: "Engagement Journey", href: "/#engagement-journey" },
  { label: "Insights & Thought Leadership", href: "/#insights" },
  { label: "Book Strategy Session", href: "/contact" },
];

const coreOfferingsItems = [
  { label: "GPU Optimization", href: "/offerings#gpu-optimization" },
  { label: "LLM Optimization", href: "/offerings#llm-optimization" },
  { label: "AI Trust & Reliability Engineering", href: "/offerings#ai-trust-reliability" },
  { label: "AI Cybersecurity", href: "/offerings#ai-cybersecurity" },
  { label: "AI Infrastructure Engineering", href: "/offerings#ai-infrastructure" },
  { label: "Energy Optimization", href: "/offerings#energy-optimization-hyperscale" },
];

const industryOfferingsItems = [
  { label: "Manufacturing & Industrial", href: "/industries#manufacturing-industrial" },
  { label: "Technology & Electronics", href: "/industries#telecommunications-network" },
  { label: "Infrastructure & Construction", href: "/industries#infrastructure-construction" },
  { label: "Energy & Utilities", href: "/industries#energy-utilities-sustainability" },
  { label: "Financial Services", href: "/industries#banking-financial-services" },
  { label: "Healthcare & Life Sciences", href: "/industries#healthcare-life-sciences" },
  { label: "Consumer & Retail", href: "/industries#retail-e-commerce" },
  { label: "Media & Services", href: "/industries#education-learning-platforms" },
];

const industrySegments = [
  {
    title: "Manufacturing & Industrial",
    description: "Optimize factory operations, supply chains, and manufacturing intelligence.",
    cta: { text: "Want to deploy AI in your factory?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Automobiles", icon: Car, href: "/industries#manufacturing-industrial", subtext: "Autonomous driving and vehicle diagnostics" },
      { label: "Auto Components", icon: Wrench, href: "/industries#manufacturing-industrial", subtext: "Predictive maintenance and quality control" },
      { label: "Engineering & Capital Goods", icon: Settings, href: "/industries#manufacturing-industrial", subtext: "Robotics and factory floor automation" },
      { label: "Defence Manufacturing", icon: Shield, href: "/industries#manufacturing-industrial", subtext: "Secure systems and ruggedized hardware" },
      { label: "MSME", icon: Home, href: "/industries#manufacturing-industrial", subtext: "Affordable digital transformation solutions" },
    ],
  },
  {
    title: "Technology & Electronics",
    description: "Accelerate software engineering and hardware optimization.",
    cta: { text: "Looking for custom chip design AI?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "IT & BPM", icon: Laptop, href: "/industries#telecommunications-network", subtext: "Automated workflows and code assistance" },
      { label: "Electronics & Semiconductor", icon: Cpu, href: "/industries#telecommunications-network", subtext: "EDA tool acceleration and chip design" },
      { label: "Telecommunications", icon: Phone, href: "/industries#telecommunications-network", subtext: "Network traffic routing and 5G optimization" },
      { label: "Science & Technology", icon: FlaskConical, href: "/industries#telecommunications-network", subtext: "Scientific computing and laboratory automation" },
      { label: "Electric Vehicles", icon: Zap, href: "/industries#telecommunications-network", subtext: "Battery management and charging optimization" },
    ],
  },
  {
    title: "Infrastructure & Construction",
    description: "AI-driven materials optimization and project planning.",
    cta: { text: "Need smart infrastructure solutions?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Cement", icon: Layers, href: "/industries#infrastructure-construction", subtext: "Chemical mix optimization and kiln control" },
      { label: "Steel", icon: Hammer, href: "/industries#infrastructure-construction", subtext: "Blast furnace optimization and quality scanning" },
      { label: "Infrastructure", icon: Building2, href: "/industries#infrastructure-construction", subtext: "Structural health monitoring and smart grids" },
      { label: "Real Estate", icon: Home, href: "/industries#infrastructure-construction", subtext: "Energy efficiency and property intelligence" },
      { label: "Roads & Highways", icon: Milestone, href: "/industries#infrastructure-construction", subtext: "Traffic flow modeling and surface inspections" },
    ],
  },
  {
    title: "Energy & Utilities",
    description: "Manage renewable grids, oil & gas reserves, and power distribution.",
    cta: { text: "Ready for smart grid integration?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Oil & Gas", icon: Droplet, href: "/industries#energy-utilities-sustainability", subtext: "Seismic analysis and reservoir simulation" },
      { label: "Power", icon: Zap, href: "/industries#energy-utilities-sustainability", subtext: "Load forecasting and grid stabilization" },
      { label: "Renewable Energy", icon: Sun, href: "/industries#energy-utilities-sustainability", subtext: "Solar and wind output predictability" },
      { label: "Ports", icon: Anchor, href: "/industries#energy-utilities-sustainability", subtext: "Logistics routing and cargo handling" },
      { label: "Railways", icon: Train, href: "/industries#energy-utilities-sustainability", subtext: "Track inspections and fleet scheduling" },
    ],
  },
  {
    title: "Financial Services",
    description: "Algorithmic trading, fraud detection, and risk modeling.",
    cta: { text: "Want to secure your transactions?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Banking", icon: Landmark, href: "/industries#banking-financial-services", subtext: "Credit scoring and conversational banking" },
      { label: "Financial Services", icon: Coins, href: "/industries#banking-financial-services", subtext: "Portfolio optimization and risk analysis" },
      { label: "Insurance", icon: FileText, href: "/industries#banking-financial-services", subtext: "Claims processing and underwriting automation" },
      { label: "E-Commerce", icon: ShoppingBag, href: "/industries#banking-financial-services", subtext: "Recommendation engines and dynamic pricing" },
      { label: "Gems & Jewellery", icon: Gem, href: "/industries#banking-financial-services", subtext: "Authentication and supply chain tracking" },
    ],
  },
  {
    title: "Healthcare & Life Sciences",
    description: "Accelerate drug discovery, clinical diagnostics, and medical research.",
    cta: { text: "Looking for drug discovery solutions?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Pharmaceuticals", icon: Pill, href: "/industries#healthcare-life-sciences", subtext: "Molecular modeling and clinical trial analysis" },
      { label: "Healthcare", icon: HeartPulse, href: "/industries#healthcare-life-sciences", subtext: "Patient monitoring and diagnostic assistance" },
      { label: "Medical Devices", icon: Stethoscope, href: "/industries#healthcare-life-sciences", subtext: "Embedded software and sensor calibration" },
      { label: "Biotechnology", icon: Dna, href: "/industries#healthcare-life-sciences", subtext: "Genomic sequencing and protein folding" },
      { label: "Ayush", icon: Leaf, href: "/industries#healthcare-life-sciences", subtext: "Natural product research and analysis" },
    ],
  },
  {
    title: "Consumer & Retail",
    description: "Personalize shopping experiences and optimize inventory.",
    cta: { text: "Need supply chain intelligence?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "FMCG", icon: Package, href: "/industries#retail-e-commerce", subtext: "Demand forecasting and packaging design" },
      { label: "Retail", icon: Store, href: "/industries#retail-e-commerce", subtext: "Smart checkout and store layout optimization" },
      { label: "Consumer Durables", icon: Tv, href: "/industries#retail-e-commerce", subtext: "IoT device intelligence and support" },
      { label: "Textiles", icon: Scissors, href: "/industries#retail-e-commerce", subtext: "Pattern generation and defect detection" },
      { label: "Food Processing", icon: Utensils, href: "/industries#retail-e-commerce", subtext: "Sortation automation and shelf-life tracking" },
    ],
  },
  {
    title: "Media & Services",
    description: "Automate content generation, translation, and training systems.",
    cta: { text: "Want to build custom training platforms?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Media & Entertainment", icon: Film, href: "/industries#education-learning-platforms", subtext: "Video compression and automated editing" },
      { label: "Tourism & Hospitality", icon: Compass, href: "/industries#education-learning-platforms", subtext: "Dynamic itinerary planning and booking bots" },
      { label: "Aviation", icon: Plane, href: "/industries#education-learning-platforms", subtext: "Flight path optimization and crew scheduling" },
      { label: "Education & Training", icon: GraduationCap, href: "/industries#education-learning-platforms", subtext: "Personalized learning pathways" },
      { label: "Agriculture & Allied", icon: Sprout, href: "/industries#education-learning-platforms", subtext: "Crop yield prediction and soil analysis" },
    ],
  },
];

const solutionsItems = [
  { label: "GPU Optimization", href: "/solutions#gpu-optimization" },
  { label: "LLM Optimization", href: "/solutions#llm-optimization" },
  { label: "AI Trust & Reliability Engineering", href: "/solutions#ai-trust-reliability" },
  { label: "AI Cybersecurity", href: "/solutions#ai-cybersecurity" },
  { label: "AI Infrastructure Engineering", href: "/solutions#ai-infrastructure" },
];

const capabilitiesItems = [
  { label: "GPU Optimization", href: "/capabilities#gpu-optimization" },
  { label: "LLM Optimization", href: "/capabilities#llm-optimization" },
  { label: "AI Trust & Reliability Engineering", href: "/capabilities#ai-trust-reliability" },
  { label: "AI Cybersecurity", href: "/capabilities#ai-cybersecurity" },
  { label: "AI Infrastructure Engineering", href: "/capabilities#ai-infrastructure" },
  { label: "All Capabilities", href: "/capabilities" },
];

const useCasesItems = [
  { label: "GPU Optimization Use Cases", href: "/use-cases#gpu-optimization" },
  { label: "LLM Optimization Use Cases", href: "/use-cases#llm-optimization" },
  { label: "AI Trust & Reliability Use Cases", href: "/use-cases#ai-trust-reliability" },
  { label: "AI Cybersecurity Use Cases", href: "/use-cases#ai-cybersecurity" },
  { label: "AI Infrastructure Use Cases", href: "/use-cases#ai-infrastructure" },
];

const platformItems = [
  { label: "GPU-phi Orchestration", href: "/platform#gpu-phi-cloud-neutral-orchestration" },
  { label: "GPU FinOps Dashboard", href: "/platform#gpu-finops-dashboard" },
  { label: "Self-Healing Clusters", href: "/platform#self-healing-clusters" },
];

const aboutItems = [
  { label: "About TrustGrid.AI", href: "/about" },
  { label: "Leadership & Teams", href: "/about#teams" },
  { label: "Global Presence", href: "/about#presence" },
  { label: "Case Studies", href: "/about#case-studies" },
  { label: "Insights & Blog", href: "/about#insights" },
  { label: "Contact Us", href: "/contact" },
  { label: "Consulting Session", href: "/consulting" },
  { label: "Partner Program", href: "/partnership" },
  { label: "Sales Enquiry", href: "/sales-enquiry" },
];

const offeringsCategories = [
  {
    title: "GPU Optimization",
    href: "/offerings#gpu-optimization",
    description: "Maximize compute efficiency and throughput for intensive AI workloads.",
    cta: { text: "Need help optimizing your GPU clusters?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "GPU Super Scaling", href: "/offerings#gpu-optimization", subtext: "High-performance multi-GPU scaling and scheduling" },
      { label: "Low Latency HPC Networking", href: "/offerings#gpu-optimization", subtext: "InfiniBand and RoCE fabric optimization" },
      { label: "Memory Bandwidth Optimization", href: "/offerings#gpu-optimization", subtext: "vGPU partitioning and memory mapping" },
      { label: "Inference Latency Reduction", href: "/offerings#gpu-optimization", subtext: "Custom CUDA kernels and Triton acceleration" },
    ],
  },
  {
    title: "LLM Optimization",
    href: "/offerings#llm-optimization",
    description: "Fine-tune and optimize large language models for production deployment.",
    cta: { text: "Looking to deploy custom LLMs?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "PEFT/LoRA Fine-Tuning", href: "/offerings#llm-optimization", subtext: "Parameter-efficient model adaptation" },
      { label: "Advanced RAG Pipelines", href: "/offerings#llm-optimization", subtext: "Context-aware semantic search architectures" },
      { label: "Autonomous Agent Frameworks", href: "/offerings#llm-optimization", subtext: "Multi-agent systems and state management" },
      { label: "Cost-Per-Token Optimization", href: "/offerings#llm-optimization", subtext: "Quantization and caching strategies" },
    ],
  },
  {
    title: "AI Trust & Reliability",
    href: "/offerings#ai-trust-reliability",
    description: "Ensure model robustness, safety, and continuous performance.",
    cta: { text: "Need to audit your AI models?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Model Drift Detection", href: "/offerings#ai-trust-reliability", subtext: "Real-time accuracy and distribution monitoring" },
      { label: "LLM Observability Stack", href: "/offerings#ai-trust-reliability", subtext: "Traces, evaluations, and prompt logging" },
      { label: "AI Red-Teaming & Stress Tests", href: "/offerings#ai-trust-reliability", subtext: "Vulnerability and bias testing" },
      { label: "Automated CI/CD Retraining", href: "/offerings#ai-trust-reliability", subtext: "Continuous learning pipelines" },
    ],
  },
  {
    title: "AI Cybersecurity",
    href: "/offerings#ai-cybersecurity",
    description: "Protect your AI assets, models, and data from adversarial threats.",
    cta: { text: "Need help securing your systems?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Adversarial Robustness Testing", href: "/offerings#ai-cybersecurity", subtext: "Evasion and poisoning defense audits" },
      { label: "Confidential GPU Inference", href: "/offerings#ai-cybersecurity", subtext: "TEE and hardware-based model protection" },
      { label: "Prompt Injection Defenses", href: "/offerings#ai-cybersecurity", subtext: "Active guardrails and input filtering" },
      { label: "Supply Chain Scanning", href: "/offerings#ai-cybersecurity", subtext: "Dependency and model weight verification" },
    ],
  },
  {
    title: "AI Infrastructure",
    href: "/offerings#ai-infrastructure",
    description: "Design and deploy highly scalable, resilient MLOps environments.",
    cta: { text: "Ready to scale your AI infra?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "MLOps/LLMOps Architecture", href: "/offerings#ai-infrastructure", subtext: "End-to-end training and inference pipelines" },
      { label: "Highly Available Vector DBs", href: "/offerings#ai-infrastructure", subtext: "Distributed vector index hosting" },
      { label: "Kubernetes Orchestration", href: "/offerings#ai-infrastructure", subtext: "Dynamic GPU slicing and auto-scaling" },
      { label: "Energy & Storage Optimization", href: "/offerings#ai-infrastructure", subtext: "Green computing and data tiering" },
    ],
  },
  {
    title: "Energy Optimization",
    href: "/offerings#energy-optimization-hyperscale",
    description: "Reduce power consumption and environmental impact of AI workloads.",
    cta: { text: "Want to reduce your AI carbon footprint?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "GW-Scale Power Strategy", href: "/offerings#energy-optimization-hyperscale", subtext: "Power purchasing and grid integration" },
      { label: "AI Thermal Cooling Transition", href: "/offerings#energy-optimization-hyperscale", subtext: "Liquid cooling and heat management" },
      { label: "GPU & Fabric Energy Audit", href: "/offerings#energy-optimization-hyperscale", subtext: "Efficiency benchmarking and analysis" },
      { label: "Next-Gen Power & Microgrids", href: "/offerings#energy-optimization-hyperscale", subtext: "On-site clean energy generation" },
    ],
  },
];

const solutionsCategories = [
  {
    title: "GPU Optimization",
    href: "/solutions#gpu-optimization",
    description: "Tailored enterprise solutions for maximizing hardware efficiency.",
    cta: { text: "Need GPU scaling solutions?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Super Scaling", href: "/solutions#gpu-optimization", subtext: "Enterprise-grade multi-node scaling" },
      { label: "Low-Latency HPC Networking", href: "/solutions#gpu-optimization", subtext: "High-speed network fabric tuning" },
      { label: "Memory Optimization", href: "/solutions#gpu-optimization", subtext: "VRAM footprint and bandwidth tuning" },
      { label: "Inference Speed Reduction", href: "/solutions#gpu-optimization", subtext: "Fast inference response times" },
      { label: "Multi-Tenant GPU Management", href: "/solutions#gpu-optimization", subtext: "Shared cluster resource allocation" },
    ],
  },
  {
    title: "LLM Optimization",
    href: "/solutions#llm-optimization",
    description: "Deploy large language models at scale with optimized cost and latency.",
    cta: { text: "Want to optimize your LLM costs?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "RAG Pipeline Architecture", href: "/solutions#llm-optimization", subtext: "Enterprise search and retrieval" },
      { label: "Fine-Tuning (PEFT / LoRA)", href: "/solutions#llm-optimization", subtext: "Domain-specific model adaptations" },
      { label: "Autonomous Agent Frameworks", href: "/solutions#llm-optimization", subtext: "Multi-agent task orchestration" },
      { label: "Multi-Modal Model Integration", href: "/solutions#llm-optimization", subtext: "Vision and audio model pipelines" },
      { label: "Token Cost Optimization", href: "/solutions#llm-optimization", subtext: "Caching and context compression" },
    ],
  },
  {
    title: "AI Trust & Reliability",
    href: "/solutions#ai-trust-reliability",
    description: "Maintain model integrity, compliance, and operational reliability.",
    cta: { text: "Ready to implement AI guardrails?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Model Drift Detection", href: "/solutions#ai-trust-reliability", subtext: "Continuous data distribution monitoring" },
      { label: "LLM Observability Stack", href: "/solutions#ai-trust-reliability", subtext: "Deep tracing and evaluation dashboards" },
      { label: "Red-Teaming & Stress Testing", href: "/solutions#ai-trust-reliability", subtext: "Automated vulnerability scanning" },
      { label: "Automated Retraining Pipelines", href: "/solutions#ai-trust-reliability", subtext: "Trigger-based continuous learning" },
      { label: "SLA / SLO Enforcement", href: "/solutions#ai-trust-reliability", subtext: "Performance guarantee monitoring" },
    ],
  },
  {
    title: "AI Cybersecurity",
    href: "/solutions#ai-cybersecurity",
    description: "Robust cybersecurity designed specifically for AI models and infrastructure.",
    cta: { text: "Need help securing your AI assets?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Robustness Testing", href: "/solutions#ai-cybersecurity", subtext: "Adversarial attack resistance checks" },
      { label: "Confidential Computing", href: "/solutions#ai-cybersecurity", subtext: "Secure enclaves for model execution" },
      { label: "Prompt Injection Defense", href: "/solutions#ai-cybersecurity", subtext: "Input validation and safety layers" },
      { label: "Supply Chain Scanning", href: "/solutions#ai-cybersecurity", subtext: "Third-party model vulnerability audits" },
      { label: "Data & Model Defense", href: "/solutions#ai-cybersecurity", subtext: "Intellectual property protection" },
    ],
  },
  {
    title: "AI Infrastructure",
    href: "/solutions#ai-infrastructure",
    description: "Robust MLOps and infrastructure designed for enterprise AI workloads.",
    cta: { text: "Ready to scale your MLOps?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "MLOps / LLMOps Architecture", href: "/solutions#ai-infrastructure", subtext: "Integrated lifecycle management" },
      { label: "Vector Database Deployment", href: "/solutions#ai-infrastructure", subtext: "Scalable vector index architectures" },
      { label: "Kubernetes Orchestration", href: "/solutions#ai-infrastructure", subtext: "Automated GPU cluster management" },
      { label: "Microservices Design", href: "/solutions#ai-infrastructure", subtext: "Modular AI application scaling" },
      { label: "Storage Optimization", href: "/solutions#ai-infrastructure", subtext: "High-throughput data storage tiers" },
    ],
  },
  {
    title: "Energy Optimization",
    href: "/solutions#energy-optimization",
    description: "Optimize energy consumption and carbon footprint for large-scale AI.",
    cta: { text: "Looking for green AI solutions?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "GW-Scale Power & Capacity", href: "/solutions#energy-optimization", subtext: "Megawatt-scale power planning" },
      { label: "AI Thermal Cooling Transition", href: "/solutions#energy-optimization", subtext: "Liquid cooling integration" },
      { label: "GPU & Network Energy Audit", href: "/solutions#energy-optimization", subtext: "Efficiency audits and reporting" },
      { label: "Sustainable AI & ESG Compliance", href: "/solutions#energy-optimization", subtext: "Carbon accounting and compliance" },
      { label: "AI-Driven Facility Operations", href: "/solutions#energy-optimization", subtext: "Smart cooling and power routing" },
      { label: "Waste Heat Recovery & Monetization", href: "/solutions#energy-optimization", subtext: "Recycling thermal energy" },
      { label: "Next-Gen Power & Microgrid Design", href: "/solutions#energy-optimization", subtext: "On-site solar, wind, and battery systems" },
    ],
  },
];

const capabilitiesCategories = [
  {
    title: "GPU Optimization",
    href: "/capabilities#gpu-optimization",
    description: "Deep engineering capabilities in GPU performance tuning.",
    cta: { text: "Need custom CUDA engineering?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "GPU Super-Scaling & Orchestration", href: "/capabilities#gpu-optimization", subtext: "Multi-node scaling architectures" },
      { label: "HPC Network Fabric Engineering", href: "/capabilities#gpu-optimization", subtext: "InfiniBand and RoCE optimization" },
      { label: "Real-Time Inference Acceleration", href: "/capabilities#gpu-optimization", subtext: "High-throughput model serving" },
      { label: "Custom CUDA/Triton Kernel Dev", href: "/capabilities#gpu-optimization", subtext: "Low-level hardware programming" },
      { label: "Energy-Efficient GPU Scheduling", href: "/capabilities#gpu-optimization", subtext: "Power-aware workload routing" },
    ],
  },
  {
    title: "LLM Optimization",
    href: "/capabilities#llm-optimization",
    description: "Advanced capabilities in model adaptation and retrieval engineering.",
    cta: { text: "Want to build custom LLM agents?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Domain LLM Adaptation & Alignment", href: "/capabilities#llm-optimization", subtext: "RLHF, DPO, and fine-tuning" },
      { label: "Agentic Workflow & State Design", href: "/capabilities#llm-optimization", subtext: "Complex multi-step decision loops" },
      { label: "Semantic Search & Retrieval Eng.", href: "/capabilities#llm-optimization", subtext: "High-precision RAG architectures" },
      { label: "Advanced Prompt Engineering", href: "/capabilities#llm-optimization", subtext: "Few-shot and chain-of-thought design" },
      { label: "LLM Evaluation & Benchmarking", href: "/capabilities#llm-optimization", subtext: "Automated quality and safety metrics" },
    ],
  },
  {
    title: "AI Trust & Reliability",
    href: "/capabilities#ai-trust-reliability",
    description: "Ensuring safety, observability, and compliance in AI deployments.",
    cta: { text: "Need to secure your AI pipeline?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Drift & Outlier Analysis", href: "/capabilities#ai-trust-reliability", subtext: "Statistical input and output tracking" },
      { label: "Adversarial Prompt Stress Testing", href: "/capabilities#ai-trust-reliability", subtext: "Red-teaming model safety bounds" },
      { label: "Deep Traceability & Lineage Tracking", href: "/capabilities#ai-trust-reliability", subtext: "Data to model version control" },
      { label: "Automated ML Pipeline Orchestration", href: "/capabilities#ai-trust-reliability", subtext: "Robust MLOps workflow automation" },
      { label: "Chaos Engineering for Distributed AI", href: "/capabilities#ai-trust-reliability", subtext: "Fault-tolerance testing at scale" },
    ],
  },
  {
    title: "AI Cybersecurity",
    href: "/capabilities#ai-cybersecurity",
    description: "Advanced cybersecurity capabilities for secure AI environments.",
    cta: { text: "Need AI pentesting?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Penetration Testing for Neural Nets", href: "/capabilities#ai-cybersecurity", subtext: "Adversarial vulnerability assessments" },
      { label: "Zero-Trust Architecture for ML APIs", href: "/capabilities#ai-cybersecurity", subtext: "Secure API gateway configurations" },
      { label: "TEE / Hardware-Backed Secure Setup", href: "/capabilities#ai-cybersecurity", subtext: "Confidential computing implementations" },
      { label: "Differential Privacy Implementation", href: "/capabilities#ai-cybersecurity", subtext: "Privacy-preserving model training" },
      { label: "Regulatory Compliance Mapping", href: "/capabilities#ai-cybersecurity", subtext: "SOC 2, ISO 27001, and NIST alignment" },
    ],
  },
  {
    title: "AI Infrastructure",
    href: "/capabilities#ai-infrastructure",
    description: "Cloud-native infrastructure and cost-control engineering.",
    cta: { text: "Want to optimize your cloud costs?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Cloud-Native AI Containerization", href: "/capabilities#ai-infrastructure", subtext: "Docker, Kubernetes, and Helm setups" },
      { label: "GPU Cluster Provisioning Automation", href: "/capabilities#ai-infrastructure", subtext: "Infrastructure as Code (Terraform)" },
      { label: "High-Throughput Data Ingestion", href: "/capabilities#ai-infrastructure", subtext: "Real-time feature store pipelines" },
      { label: "Infrastructure FinOps Cost Control", href: "/capabilities#ai-infrastructure", subtext: "GPU allocation and waste reduction" },
      { label: "Real-Time Streaming Data Integration", href: "/capabilities#ai-infrastructure", subtext: "Kafka and Flink data pipelines" },
    ],
  },
];

const useCasesCategories = [
  {
    title: "GPU Optimization",
    href: "/use-cases#gpu-optimization",
    description: "Real-world applications of GPU performance engineering.",
    cta: { text: "Want to scale your training?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Distributed Model Pre-training", href: "/use-cases#gpu-optimization", subtext: "Scaling LLMs across thousands of GPUs" },
      { label: "Ultra-low Latency HPC Simulations", href: "/use-cases#gpu-optimization", subtext: "Scientific and financial modeling" },
      { label: "LLM Pre-training Acceleration", href: "/use-cases#gpu-optimization", subtext: "Throughput optimization and cost reduction" },
      { label: "Real-time Video & CV Pipelines", href: "/use-cases#gpu-optimization", subtext: "Multi-stream computer vision serving" },
      { label: "High-frequency Trading Execution", href: "/use-cases#gpu-optimization", subtext: "Sub-millisecond decision processing" },
    ],
  },
  {
    title: "LLM Optimization",
    href: "/use-cases#llm-optimization",
    description: "Production use cases for optimized language models.",
    cta: { text: "Need enterprise search solutions?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Enterprise Knowledge Base Search", href: "/use-cases#llm-optimization", subtext: "Contextual search across unstructured data" },
      { label: "Automated Code Gen & Review", href: "/use-cases#llm-optimization", subtext: "Domain-adapted coding assistants" },
      { label: "Intelligent Document Processing (IDP)", href: "/use-cases#llm-optimization", subtext: "Information extraction from complex PDFs" },
      { label: "Customer Support Ticket Resolution", href: "/use-cases#llm-optimization", subtext: "Agentic email and chat automation" },
      { label: "Complex Data Text-to-SQL Routing", href: "/use-cases#llm-optimization", subtext: "Natural language database querying" },
    ],
  },
  {
    title: "AI Trust & Reliability",
    href: "/use-cases#ai-trust-reliability",
    description: "Operationalizing trust and safety in critical domains.",
    cta: { text: "Want to secure your chatbot?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Fraud Drift Prevention", href: "/use-cases#ai-trust-reliability", subtext: "Adapting detection models to changing fraud patterns" },
      { label: "Healthcare Diagnostic AI Assurance", href: "/use-cases#ai-trust-reliability", subtext: "Verifying medical imaging model reliability" },
      { label: "Chatbot Toxicity & Safety Guardrails", href: "/use-cases#ai-trust-reliability", subtext: "Real-time moderation and safety filtering" },
      { label: "Trading Stability Monitoring", href: "/use-cases#ai-trust-reliability", subtext: "Preventing rogue trading agent behaviors" },
      { label: "Sensor Drift Correction", href: "/use-cases#ai-trust-reliability", subtext: "Calibrating industrial IoT models automatically" },
    ],
  },
  {
    title: "AI Cybersecurity",
    href: "/use-cases#ai-cybersecurity",
    description: "Securing AI systems in hostile environments.",
    cta: { text: "Worried about model theft?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Chatbot Prompt Injection Defenses", href: "/use-cases#ai-cybersecurity", subtext: "Blocking jailbreak and system-prompt leak attempts" },
      { label: "LLM Weights Theft Protection", href: "/use-cases#ai-cybersecurity", subtext: "Securing model parameters in untrusted clouds" },
      { label: "Patient Data Reconstruction Defense", href: "/use-cases#ai-cybersecurity", subtext: "Preventing membership inference attacks" },
      { label: "Biometric System Adversarial Hardening", href: "/use-cases#ai-cybersecurity", subtext: "Defending facial recognition from spoofing" },
      { label: "Third-party ML Dependency Audits", href: "/use-cases#ai-cybersecurity", subtext: "Scanning open-source packages and weights" },
    ],
  },
  {
    title: "AI Infrastructure",
    href: "/use-cases#ai-infrastructure",
    description: "Optimizing the underlying stack for extreme scale.",
    cta: { text: "Ready to build carbon-aware AI?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Carbon-Aware Energy Optimization", href: "/use-cases#ai-infrastructure", subtext: "Scheduling training based on green grid availability" },
      { label: "GPU Direct Storage I/O Optimization", href: "/use-cases#ai-infrastructure", subtext: "Bypassing CPU for ultra-fast data loading" },
      { label: "Unified Memory (UMA) Optimization", href: "/use-cases#ai-infrastructure", subtext: "Efficiently running models larger than GPU memory" },
      { label: "Enterprise ML Platform Engineering", href: "/use-cases#ai-infrastructure", subtext: "Building shared internal developer platforms" },
      { label: "Failover Multi-Inference Routing", href: "/use-cases#ai-infrastructure", subtext: "Automated routing across redundant GPU clusters" },
    ],
  },
];

const platformCategories = [
  {
    title: "GPU-phi Orchestration",
    href: "/platform#gpu-phi-cloud-neutral-orchestration",
    description: "Cloud-neutral GPU orchestration and resource scheduling.",
    cta: { text: "Want to try GPU-phi Orchestration?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Multi-Cluster Management", href: "/platform#gpu-phi-cloud-neutral-orchestration", subtext: "Orchestrate workloads across multiple clouds" },
      { label: "Topology-Aware Scheduling", href: "/platform#gpu-phi-cloud-neutral-orchestration", subtext: "Optimize placement based on NVLink topology" },
      { label: "MIG & vGPU Partitioning", href: "/platform#gpu-phi-cloud-neutral-orchestration", subtext: "Slice physical GPUs for multi-tenant efficiency" },
      { label: "Preemptible GPU Arbitrage", href: "/platform#gpu-phi-cloud-neutral-orchestration", subtext: "Automatically swap workloads to cheaper spot instances" },
    ],
  },
  {
    title: "GPU FinOps Dashboard",
    href: "/platform#gpu-finops-dashboard",
    description: "Granular cost allocation and resource efficiency metrics.",
    cta: { text: "Want to analyze your GPU spending?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Granular Cost Allocation", href: "/platform#gpu-finops-dashboard", subtext: "Track cost down to individual teams and models" },
      { label: "Idle Detection & Alerting", href: "/platform#gpu-finops-dashboard", subtext: "Instantly alert when reserved GPUs are unutilized" },
      { label: "Spot Arbitrage Scheduling", href: "/platform#gpu-finops-dashboard", subtext: "Arbitrage between spot market rates in real-time" },
      { label: "Budget Limits & showback", href: "/platform#gpu-finops-dashboard", subtext: "Enforce department budgets and showback reporting" },
    ],
  },
  {
    title: "Self-Healing Clusters",
    href: "/platform#self-healing-clusters",
    description: "Predictive monitoring and automated cluster recovery.",
    cta: { text: "Ready for zero-downtime AI training?", buttonText: "Contact Us", href: "/contact" },
    items: [
      { label: "Predictive Node Failure Analysis", href: "/platform#self-healing-clusters", subtext: "Identify hardware degradation before nodes crash" },
      { label: "Automated Checkpoint-and-Resume", href: "/platform#self-healing-clusters", subtext: "Instantly resume training on healthy nodes" },
      { label: "Fast Node Isolation (Fencing)", href: "/platform#self-healing-clusters", subtext: "Quarantine faulty nodes from the active fabric" },
      { label: "Memory & GPU Diagnostic Sweeps", href: "/platform#self-healing-clusters", subtext: "Continuous background hardware health verification" },
    ],
  },
];

const featuredOfferings = [
  {
    icon: Cpu,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    label: "GPU Optimization",
    href: "/gpu-performance-engineering",
  },
  {
    icon: Bot,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    label: "LLM Optimization & AI Agents",
    href: "/agentic-ai-development",
  },
  {
    icon: Shield,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    label: "AI Cybersecurity",
    href: "/ai-security",
  },
  {
    icon: Layers,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    label: "AI Infrastructure Engineering",
    href: "/ai-infrastructure-engineering",
  },
];

/* ─── Hash-aware navigation helper ──────────────────────────── */

/**
 * SectionLink navigates to an href that may contain a #hash anchor.
 * On same-page clicks it smooth-scrolls; on cross-page it navigates
 * then retries scrolling until the element appears in the DOM.
 */
export function SectionLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.();

    const hashIdx = href.indexOf("#");
    const path = hashIdx >= 0 ? href.slice(0, hashIdx) : href;
    const hash = hashIdx >= 0 ? href.slice(hashIdx + 1) : "";
    const targetPath = path || "/";

    const scrollToHash = () => {
      if (!hash) return;
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (attempts < 15) {
          attempts++;
          setTimeout(tryScroll, 100);
        }
      };
      tryScroll();
    };

    // Same page – just scroll
    if (window.location.pathname === targetPath || (!path && window.location.pathname === "/")) {
      scrollToHash();
      if (hash) {
        window.history.replaceState(null, "", `#${hash}`);
        window.dispatchEvent(new Event("hashchange"));
      }
      return;
    }

    // Cross-page: push to history, dispatch popstate so TanStack Router picks it up
    const fullUrl = hash ? `${targetPath}#${hash}` : targetPath;
    window.history.pushState(null, "", fullUrl);
    window.dispatchEvent(new PopStateEvent("popstate"));
    setTimeout(scrollToHash, 150);
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}

/* ─── Dropdown Components ────────────────────────────────────── */

function getCategoryIcon(title: string) {
  switch (title) {
    case "Manufacturing & Industrial":
      return Hammer;
    case "Technology & Electronics":
      return Laptop;
    case "Infrastructure & Construction":
      return Building2;
    case "Energy & Utilities":
      return Zap;
    case "Financial Services":
      return Landmark;
    case "Healthcare & Life Sciences":
      return HeartPulse;
    case "Consumer & Retail":
      return ShoppingBag;
    case "Media & Services":
      return Tv;
    case "GPU Optimization":
      return Cpu;
    case "LLM Optimization":
      return Brain;
    case "AI Trust & Reliability":
      return Bot;
    case "AI Cybersecurity":
      return Shield;
    case "AI Infrastructure":
      return Server;
    case "Energy Optimization":
      return Zap;
    case "GPU-phi Orchestration":
      return Layers;
    case "GPU FinOps Dashboard":
      return BarChart3;
    case "Self-Healing Clusters":
      return Settings;
    default:
      return LayoutGrid;
  }
}

function getSubcategoryIcon(label: string) {
  const text = label.toLowerCase();
  if (text.includes("consulting"))
    return Cpu;
  if (text.includes("partner"))
    return Users;
  if (text.includes("sales") || text.includes("enquiry"))
    return Coins;
  if (text.includes("contact"))
    return Phone;

  if (
    text.includes("gpu") ||
    text.includes("cuda") ||
    text.includes("hardware") ||
    text.includes("triton")
  )
    return Cpu;
  if (
    text.includes("network") ||
    text.includes("fabric") ||
    text.includes("latency") ||
    text.includes("bandwidth") ||
    text.includes("routing")
  )
    return Globe;
  if (
    text.includes("storage") ||
    text.includes("memory") ||
    text.includes("database") ||
    text.includes("ingestion")
  )
    return Server;
  if (
    text.includes("llm") ||
    text.includes("model") ||
    text.includes("prompt") ||
    text.includes("agent") ||
    text.includes("rag") ||
    text.includes("semantic") ||
    text.includes("translation") ||
    text.includes("knowledge")
  )
    return Brain;
  if (
    text.includes("security") ||
    text.includes("defense") ||
    text.includes("injection") ||
    text.includes("penetration") ||
    text.includes("privacy") ||
    text.includes("trust") ||
    text.includes("theft") ||
    text.includes("fraud") ||
    text.includes("vulnerability") ||
    text.includes("adversarial") ||
    text.includes("drift") ||
    text.includes("traceability")
  )
    return Shield;
  if (
    text.includes("energy") ||
    text.includes("power") ||
    text.includes("cooling") ||
    text.includes("thermal") ||
    text.includes("carbon") ||
    text.includes("heat")
  )
    return Zap;
  if (
    text.includes("cloud") ||
    text.includes("kubernetes") ||
    text.includes("cluster") ||
    text.includes("orchestration") ||
    text.includes("container") ||
    text.includes("multi-cluster") ||
    text.includes("microservice")
  )
    return Layers;
  if (
    text.includes("cost") ||
    text.includes("finops") ||
    text.includes("budget") ||
    text.includes("arbitrage") ||
    text.includes("trading")
  )
    return Coins;
  if (
    text.includes("code") ||
    text.includes("pipeline") ||
    text.includes("ci/cd") ||
    text.includes("testing") ||
    text.includes("review") ||
    text.includes("architecture")
  )
    return LayoutGrid;
  if (
    text.includes("data") ||
    text.includes("analytic") ||
    text.includes("diagnostic") ||
    text.includes("metric") ||
    text.includes("observability") ||
    text.includes("evaluate") ||
    text.includes("dashboard")
  )
    return BarChart3;
  if (
    text.includes("automat") ||
    text.includes("autonomy") ||
    text.includes("self-healing") ||
    text.includes("failover") ||
    text.includes("resume") ||
    text.includes("fencing")
  )
    return Settings;
  if (text.includes("healthcare") || text.includes("patient") || text.includes("biometric"))
    return HeartPulse;

  return ChevronRight;
}

interface MenuItem {
  label: string;
  href: string;
  subtext?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface MenuCategory {
  title: string;
  href: string;
  description?: string;
  items: MenuItem[];
  cta?: {
    text: string;
    buttonText: string;
    href: string;
  };
}

function TabbedMegaMenu({
  mainTitle,
  mainDescription,
  categories,
}: {
  mainTitle: string;
  mainDescription: string;
  categories: MenuCategory[];
}) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const activeCategory = categories[activeTabIdx] || categories[0];

  return (
    <div className="nav-dropdown w-[980px] max-w-[95vw] p-0 overflow-hidden flex flex-row border border-border/40 bg-surface/95 backdrop-blur-xl rounded-2xl shadow-2xl">
      {/* Left Pane (Sidebar) */}
      <div className="w-[32%] bg-muted/10 border-r border-border/30 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-foreground mb-1 font-display">{mainTitle}</h3>
          <p className="text-xs text-muted-foreground/80 leading-relaxed mb-6">{mainDescription}</p>
          
          <div className="space-y-1">
            {categories.map((cat, idx) => (
              <button
                key={cat.title}
                onMouseEnter={() => setActiveTabIdx(idx)}
                onClick={() => setActiveTabIdx(idx)}
                className={`w-full flex items-center justify-between text-left py-2.5 px-3.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                  activeTabIdx === idx
                    ? "bg-card border border-border/60 text-blue-400 shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                }`}
              >
                <span>{cat.title}</span>
                {activeTabIdx === idx && (
                  <ChevronRight className="h-4 w-4 text-blue-400 animate-in fade-in slide-in-from-left-1 duration-150" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Pane (Content) */}
      <div className="w-[68%] p-6 flex flex-col justify-between min-h-[380px] bg-card/5">
        <div>
          {/* Header */}
          <div className="text-[10px] font-extrabold tracking-widest text-muted-foreground uppercase mb-3">
            {activeCategory.title}
          </div>
          <hr className="border-border/20 mb-5" />

          {/* Grid of items */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {activeCategory.items.map((item) => (
              <SectionLink
                key={item.label}
                href={item.href}
                className="group/item flex items-start justify-between p-3 rounded-xl border border-transparent hover:border-border/45 hover:bg-muted/20 transition-all duration-200"
              >
                <div className="flex-1 pr-2">
                  <div className="text-xs font-bold text-foreground group-hover/item:text-blue-400 transition-colors mb-0.5">
                    {item.label}
                  </div>
                  {item.subtext && (
                    <div className="text-[11px] text-muted-foreground/85 leading-relaxed">
                      {item.subtext}
                    </div>
                  )}
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover/item:text-blue-400 group-hover/item:translate-x-1 transition-all duration-200 shrink-0 mt-0.5" />
              </SectionLink>
            ))}
          </div>
        </div>

        {/* Footer Banner */}
        {activeCategory.cta && (
          <div className="mt-6 p-4 rounded-xl bg-muted/20 border border-border/30 flex items-center justify-between">
            <span className="text-xs text-muted-foreground/90 font-medium">
              {activeCategory.cta.text}
            </span>
            <SectionLink href={activeCategory.cta.href}>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/10 cursor-pointer px-4 py-2 rounded-lg transition-all"
              >
                {activeCategory.cta.buttonText}
              </Button>
            </SectionLink>
          </div>
        )}
      </div>
    </div>
  );
}

function HomeDropdown() {
  return (
    <div className="nav-dropdown w-[680px]">
      <div className="grid grid-cols-2 gap-x-12 gap-y-3">
        {homeItems.map((item) => (
          <SectionLink
            key={item.href + item.label}
            href={item.href}
            className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-blue-50/50 group/item transition-all border border-transparent hover:border-blue-100/20"
          >
            {(() => {
              const Icon = getSubcategoryIcon(item.label);
              return (
                <Icon className="h-4 w-4 text-muted-foreground group-hover/item:text-blue-500 transition-all duration-200 group-hover/item:translate-x-1 shrink-0" />
              );
            })()}
            <span className="text-[13px] font-semibold text-foreground/90 group-hover/item:text-blue-600 transition-colors leading-normal tracking-wide">
              {item.label}
            </span>
          </SectionLink>
        ))}
      </div>
    </div>
  );
}

function OfferingsDropdown() {
  return (
    <TabbedMegaMenu
      mainTitle="Offerings"
      mainDescription="Explore our comprehensive suite of AI and GPU performance optimization services."
      categories={offeringsCategories}
    />
  );
}

function IndustriesDropdown() {
  return (
    <TabbedMegaMenu
      mainTitle="Industries"
      mainDescription="Tailored AI and optimization solutions for key vertical segments."
      categories={industrySegments}
    />
  );
}

function SolutionsDropdown() {
  return (
    <TabbedMegaMenu
      mainTitle="Solutions"
      mainDescription="Deploy large-scale AI applications with optimized cost, latency, and security."
      categories={solutionsCategories}
    />
  );
}

function CapabilitiesDropdown() {
  return (
    <TabbedMegaMenu
      mainTitle="Capabilities"
      mainDescription="Our deep engineering capabilities across the entire AI and GPU stack."
      categories={capabilitiesCategories}
    />
  );
}

function UseCasesDropdown() {
  return (
    <TabbedMegaMenu
      mainTitle="Use Cases"
      mainDescription="Real-world case studies and applications of our AI optimization technology."
      categories={useCasesCategories}
    />
  );
}

function PlatformDropdown() {
  return (
    <TabbedMegaMenu
      mainTitle="Platform"
      mainDescription="Enterprise-grade software platforms for GPU orchestration and monitoring."
      categories={platformCategories}
    />
  );
}

function AboutDropdown() {
  return (
    <div className="nav-dropdown w-[280px]">
      <div className="flex flex-col gap-y-1.5">
        {aboutItems.map((item) => (
          <SectionLink
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-blue-50/50 group/item transition-all border border-transparent hover:border-blue-100/20"
          >
            {(() => {
              const Icon = getSubcategoryIcon(item.label);
              return (
                <Icon className="h-4 w-4 text-muted-foreground group-hover/item:text-blue-500 transition-all duration-200 group-hover/item:translate-x-1 shrink-0" />
              );
            })()}
            <span className="text-[13px] font-semibold text-foreground/90 group-hover/item:text-blue-600 transition-colors leading-normal tracking-wide">
              {item.label}
            </span>
          </SectionLink>
        ))}
      </div>
    </div>
  );
}

/* ─── NavItem with Dropdown ──────────────────────────────────── */

type NavItemProps = {
  label: string;
  to: string;
  icon?: React.ElementType;
  children?: React.ReactNode;
};

function NavItem({ label, to, icon: Icon, children }: NavItemProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 300);
  };

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  if (!children) {
    return (
      <Link
        to={to}
        className="flex items-center gap-1.5 text-sm font-bold text-foreground transition-colors hover:text-blue-600 px-3.5 py-2 rounded-md whitespace-nowrap"
        activeProps={{ className: "text-blue-500" }}
      >
        {Icon && <Icon className="h-4 w-4" />}
        {label}
      </Link>
    );
  }

  return (
    <div ref={ref} className="" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link
        to={to}
        className="flex items-center gap-1.5 text-sm font-bold text-foreground transition-colors hover:text-blue-600 px-3.5 py-2 rounded-md whitespace-nowrap"
        activeProps={{ className: "text-blue-500" }}
      >
        {Icon && <Icon className="h-4 w-4" />}
        {label}
      </Link>

      {open && (
        <div
          className="absolute top-full left-0 right-0 pt-6 z-[200] animate-dropdown"
          onClick={() => setOpen(false)}
        >
          <div className="flex justify-center w-full">{children}</div>
        </div>
      )}
    </div>
  );
}

/* ─── Mobile Accordion Section ───────────────────────────────── */

type MobileAccordionProps = {
  title: string;
  to: string;
  children: React.ReactNode;
  onClose: () => void;
};

function MobileAccordion({ title, to, children, onClose }: MobileAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/30 last:border-0">
      <button
        className="w-full flex items-center justify-between py-3.5 text-sm font-bold text-foreground hover:text-blue-600 transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-3 pl-2">
          <Link
            to={to}
            onClick={onClose}
            className="block py-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View all →
          </Link>
          {children}
        </div>
      )}
    </div>
  );
}

/* ─── Main Header ─────────────────────────────────────────────── */

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Global dropdown styles */}
      <style>{`
        .nav-dropdown {
          background: var(--color-surface);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--color-border);
          border-radius: 1rem;
          box-shadow: var(--shadow-elevated);
          padding: 2rem 2.25rem;
          letter-spacing: 0.01em;
        }
        @keyframes dropdown-in {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-dropdown {
          animation: dropdown-in 0.18s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b border-border/20 bg-background/20 backdrop-blur-xl">
        <div className="max-w-screen-2xl mx-auto w-full flex h-16 items-center justify-between px-6 md:px-8 xl:px-12">
          {/* Brand */}
          <Link to="/" className="flex items-center group mr-6 shrink-0">
            <img
              src="/logo.png"
              alt="TrustGrid.AI Logo"
              className="h-9 w-auto object-contain brightness-[2.8] contrast-[1.15] saturate-[1.3] transition-all duration-300 group-hover:brightness-[3.2]"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-5">
            <NavItem label="Home" to="/" icon={Home}>
              <HomeDropdown />
            </NavItem>
            <NavItem label="Offerings" to="/offerings" icon={Package}>
              <OfferingsDropdown />
            </NavItem>
            <NavItem label="Industries" to="/industries" icon={Building2}>
              <IndustriesDropdown />
            </NavItem>
            <NavItem label="Solutions" to="/solutions" icon={Settings}>
              <SolutionsDropdown />
            </NavItem>
            <NavItem label="Capabilities" to="/capabilities" icon={Wrench}>
              <CapabilitiesDropdown />
            </NavItem>
            <NavItem label="Use Cases" to="/use-cases" icon={FileText}>
              <UseCasesDropdown />
            </NavItem>
            <NavItem label="Platform" to="/platform" icon={Server}>
              <PlatformDropdown />
            </NavItem>
            <NavItem label="About Us" to="/about" icon={Users}>
              <AboutDropdown />
            </NavItem>
          </nav>

          {/* Action + Hamburger */}
          <div className="flex items-center gap-3">
            <Link to="/contact" className="hidden xl:block">
              <Button
                size="default"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                Book Strategy Session
              </Button>
            </Link>

            <button
              className="xl:hidden p-2 text-foreground"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="xl:hidden border-t border-border/40 bg-background max-h-[88vh] overflow-y-auto">
            <div className="px-5 py-4">
              {/* Featured strip */}
              <div className="mb-4 p-3 rounded-xl bg-surface/40 border border-border/40">
                <p className="text-[10px] font-semibold tracking-widest text-muted-foreground mb-2">
                  Key Offerings
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {featuredOfferings.map((item) => (
                    <SectionLink
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-surface/60 transition-colors"
                    >
                      <div className={`p-1.5 rounded-md ${item.bg}`}>
                        <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
                      </div>
                      <span className="text-xs font-medium text-foreground leading-tight">
                        {item.label}
                      </span>
                    </SectionLink>
                  ))}
                </div>
              </div>

              <MobileAccordion title="Home" to="/" onClose={() => setMobileOpen(false)}>
                <div className="space-y-1 py-1">
                  {homeItems.map((item) => (
                    <SectionLink
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1.5 text-xs font-semibold text-foreground/90 hover:text-blue-600 transition-colors"
                    >
                      {item.label}
                    </SectionLink>
                  ))}
                </div>
              </MobileAccordion>

              <MobileAccordion
                title="Offerings"
                to="/offerings"
                onClose={() => setMobileOpen(false)}
              >
                <div className="space-y-3.5 py-2">
                  {offeringsCategories.map((cat) => (
                    <div key={cat.title} className="space-y-1">
                      <SectionLink
                        href={cat.href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-[10px] font-bold tracking-wider text-blue-600 pl-1"
                      >
                        {cat.title}
                      </SectionLink>
                      <div className="pl-2.5 border-l border-border/40 space-y-1">
                        {cat.items.map((item) => (
                          <SectionLink
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1 text-xs font-semibold text-foreground/90 hover:text-blue-600 transition-colors"
                          >
                            {item.label}
                          </SectionLink>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </MobileAccordion>

              <MobileAccordion
                title="Industries"
                to="/industries"
                onClose={() => setMobileOpen(false)}
              >
                <div className="space-y-1 py-1">
                  {industryOfferingsItems.map((item) => (
                    <SectionLink
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1.5 text-xs font-semibold text-foreground/90 hover:text-blue-600 transition-colors"
                    >
                      {item.label}
                    </SectionLink>
                  ))}
                </div>
              </MobileAccordion>

              <MobileAccordion
                title="Solutions"
                to="/solutions"
                onClose={() => setMobileOpen(false)}
              >
                <div className="space-y-3.5 py-2">
                  {solutionsCategories.map((cat) => (
                    <div key={cat.title} className="space-y-1">
                      <SectionLink
                        href={cat.href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-[10px] font-bold tracking-wider text-blue-600 pl-1"
                      >
                        {cat.title}
                      </SectionLink>
                      <div className="pl-2.5 border-l border-border/40 space-y-1">
                        {cat.items.map((item) => (
                          <SectionLink
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1 text-xs font-semibold text-foreground/90 hover:text-blue-600 transition-colors"
                          >
                            {item.label}
                          </SectionLink>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </MobileAccordion>

              <MobileAccordion
                title="Capabilities"
                to="/capabilities"
                onClose={() => setMobileOpen(false)}
              >
                <div className="space-y-3.5 py-2">
                  {capabilitiesCategories.map((cat) => (
                    <div key={cat.title} className="space-y-1">
                      <SectionLink
                        href={cat.href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-[10px] font-bold tracking-wider text-blue-600 pl-1"
                      >
                        {cat.title}
                      </SectionLink>
                      <div className="pl-2.5 border-l border-border/40 space-y-1">
                        {cat.items.map((item) => (
                          <SectionLink
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1 text-xs font-semibold text-foreground/90 hover:text-blue-600 transition-colors"
                          >
                            {item.label}
                          </SectionLink>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </MobileAccordion>

              <MobileAccordion
                title="Use Cases"
                to="/use-cases"
                onClose={() => setMobileOpen(false)}
              >
                <div className="space-y-1 py-1">
                  {useCasesItems.map((item) => (
                    <SectionLink
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1.5 text-xs font-semibold text-foreground/90 hover:text-blue-600 transition-colors"
                    >
                      {item.label}
                    </SectionLink>
                  ))}
                </div>
              </MobileAccordion>

              <MobileAccordion title="Platform" to="/platform" onClose={() => setMobileOpen(false)}>
                <div className="space-y-3.5 py-2">
                  {platformCategories.map((cat) => (
                    <div key={cat.title} className="space-y-1">
                      <SectionLink
                        href={cat.href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-[10px] font-bold tracking-wider text-blue-600 pl-1"
                      >
                        {cat.title}
                      </SectionLink>
                      <div className="pl-2.5 border-l border-border/40 space-y-1">
                        {cat.items.map((item) => (
                          <SectionLink
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1 text-xs font-semibold text-foreground/90 hover:text-blue-600 transition-colors"
                          >
                            {item.label}
                          </SectionLink>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </MobileAccordion>

              <MobileAccordion title="About Us" to="/about" onClose={() => setMobileOpen(false)}>
                <div className="space-y-1 py-1">
                  {aboutItems.map((item) => (
                    <SectionLink
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1.5 text-xs font-semibold text-foreground/90 hover:text-blue-600 transition-colors"
                    >
                      {item.label}
                    </SectionLink>
                  ))}
                </div>
              </MobileAccordion>

              <Link to="/contact" onClick={() => setMobileOpen(false)} className="block mt-5">
                <Button
                  size="default"
                  className="w-full bg-primary text-primary-foreground text-sm"
                >
                  Book Strategy Session
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
