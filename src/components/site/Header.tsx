import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Cpu, Bot, Brain, Shield, LayoutGrid, Layers, Zap, Globe, BarChart3, Server, FileText, Users, Phone, BookOpen, Car, Wrench, Settings, Home, Laptop, FlaskConical, Hammer, Building2, Milestone, Droplet, Sun, Anchor, Train, Landmark, Coins, ShoppingBag, Gem, Pill, HeartPulse, Stethoscope, Dna, Leaf, Package, Store, Tv, Scissors, Utensils, Film, Compass, Plane, GraduationCap, Sprout } from "lucide-react";
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
    items: [
      { label: "Automobiles", icon: Car, href: "/industries#manufacturing-industrial" },
      { label: "Auto Components", icon: Wrench, href: "/industries#manufacturing-industrial" },
      { label: "Engineering & Capital Goods", icon: Settings, href: "/industries#manufacturing-industrial" },
      { label: "Defence Manufacturing", icon: Shield, href: "/industries#manufacturing-industrial" },
      { label: "MSME", icon: Home, href: "/industries#manufacturing-industrial" },
    ]
  },
  {
    title: "Technology & Electronics",
    items: [
      { label: "IT & BPM", icon: Laptop, href: "/industries#telecommunications-network" },
      { label: "Electronics & Semiconductor", icon: Cpu, href: "/industries#telecommunications-network" },
      { label: "Telecommunications", icon: Phone, href: "/industries#telecommunications-network" },
      { label: "Science & Technology", icon: FlaskConical, href: "/industries#telecommunications-network" },
      { label: "Electric Vehicles", icon: Zap, href: "/industries#telecommunications-network" },
    ]
  },
  {
    title: "Infrastructure & Construction",
    items: [
      { label: "Cement", icon: Layers, href: "/industries#infrastructure-construction" },
      { label: "Steel", icon: Hammer, href: "/industries#infrastructure-construction" },
      { label: "Infrastructure", icon: Building2, href: "/industries#infrastructure-construction" },
      { label: "Real Estate", icon: Home, href: "/industries#infrastructure-construction" },
      { label: "Roads & Highways", icon: Milestone, href: "/industries#infrastructure-construction" },
    ]
  },
  {
    title: "Energy & Utilities",
    items: [
      { label: "Oil & Gas", icon: Droplet, href: "/industries#energy-utilities-sustainability" },
      { label: "Power", icon: Zap, href: "/industries#energy-utilities-sustainability" },
      { label: "Renewable Energy", icon: Sun, href: "/industries#energy-utilities-sustainability" },
      { label: "Ports", icon: Anchor, href: "/industries#energy-utilities-sustainability" },
      { label: "Railways", icon: Train, href: "/industries#energy-utilities-sustainability" },
    ]
  },
  {
    title: "Financial Services",
    items: [
      { label: "Banking", icon: Landmark, href: "/industries#banking-financial-services" },
      { label: "Financial Services", icon: Coins, href: "/industries#banking-financial-services" },
      { label: "Insurance", icon: FileText, href: "/industries#banking-financial-services" },
      { label: "E-Commerce", icon: ShoppingBag, href: "/industries#banking-financial-services" },
      { label: "Gems & Jewellery", icon: Gem, href: "/industries#banking-financial-services" },
    ]
  },
  {
    title: "Healthcare & Life Sciences",
    items: [
      { label: "Pharmaceuticals", icon: Pill, href: "/industries#healthcare-life-sciences" },
      { label: "Healthcare", icon: HeartPulse, href: "/industries#healthcare-life-sciences" },
      { label: "Medical Devices", icon: Stethoscope, href: "/industries#healthcare-life-sciences" },
      { label: "Biotechnology", icon: Dna, href: "/industries#healthcare-life-sciences" },
      { label: "Ayush", icon: Leaf, href: "/industries#healthcare-life-sciences" },
    ]
  },
  {
    title: "Consumer & Retail",
    items: [
      { label: "FMCG", icon: Package, href: "/industries#retail-e-commerce" },
      { label: "Retail", icon: Store, href: "/industries#retail-e-commerce" },
      { label: "Consumer Durables", icon: Tv, href: "/industries#retail-e-commerce" },
      { label: "Textiles", icon: Scissors, href: "/industries#retail-e-commerce" },
      { label: "Food Processing", icon: Utensils, href: "/industries#retail-e-commerce" },
    ]
  },
  {
    title: "Media & Services",
    items: [
      { label: "Media & Entertainment", icon: Film, href: "/industries#education-learning-platforms" },
      { label: "Tourism & Hospitality", icon: Compass, href: "/industries#education-learning-platforms" },
      { label: "Aviation", icon: Plane, href: "/industries#education-learning-platforms" },
      { label: "Education & Training", icon: GraduationCap, href: "/industries#education-learning-platforms" },
      { label: "Agriculture & Allied", icon: Sprout, href: "/industries#education-learning-platforms" },
    ]
  }
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
  { label: "Contact Us", href: "/about#contact" },
];

const offeringsCategories = [
  {
    title: "GPU Optimization",
    href: "/offerings#gpu-optimization",
    items: [
      { label: "GPU Super Scaling", href: "/offerings#gpu-optimization" },
      { label: "Low Latency HPC Networking", href: "/offerings#gpu-optimization" },
      { label: "Memory Bandwidth Optimization", href: "/offerings#gpu-optimization" },
      { label: "Inference Latency Reduction", href: "/offerings#gpu-optimization" }
    ]
  },
  {
    title: "LLM Optimization",
    href: "/offerings#llm-optimization",
    items: [
      { label: "PEFT/LoRA Fine-Tuning", href: "/offerings#llm-optimization" },
      { label: "Advanced RAG Pipelines", href: "/offerings#llm-optimization" },
      { label: "Autonomous Agent Frameworks", href: "/offerings#llm-optimization" },
      { label: "Cost-Per-Token Optimization", href: "/offerings#llm-optimization" }
    ]
  },
  {
    title: "AI Trust & Reliability",
    href: "/offerings#ai-trust-reliability",
    items: [
      { label: "Continuous Model Drift Detection", href: "/offerings#ai-trust-reliability" },
      { label: "End-to-End LLM Observability Stack", href: "/offerings#ai-trust-reliability" },
      { label: "AI Red-Teaming & Adversarial Tests", href: "/offerings#ai-trust-reliability" },
      { label: "Automated CI/CD Retraining", href: "/offerings#ai-trust-reliability" }
    ]
  },
  {
    title: "AI Cybersecurity",
    href: "/offerings#ai-cybersecurity",
    items: [
      { label: "Adversarial Robustness Testing", href: "/offerings#ai-cybersecurity" },
      { label: "Confidential Computing for Inference", href: "/offerings#ai-cybersecurity" },
      { label: "Prompt Injection Defense Mechanisms", href: "/offerings#ai-cybersecurity" },
      { label: "Supply Chain Vulnerability Scanning", href: "/offerings#ai-cybersecurity" }
    ]
  },
  {
    title: "AI Infrastructure",
    href: "/offerings#ai-infrastructure",
    items: [
      { label: "MLOps/LLMOps Pipeline Architecture", href: "/offerings#ai-infrastructure" },
      { label: "Highly Available Vector Databases", href: "/offerings#ai-infrastructure" },
      { label: "Kubernetes Workload Orchestration", href: "/offerings#ai-infrastructure" },
      { label: "Energy & Storage Optimization", href: "/offerings#ai-infrastructure" }
    ]
  },
  {
    title: "Energy Optimization",
    href: "/offerings#energy-optimization-hyperscale",
    items: [
      { label: "GW-Scale Power Strategy", href: "/offerings#energy-optimization-hyperscale" },
      { label: "AI Thermal Cooling Transition", href: "/offerings#energy-optimization-hyperscale" },
      { label: "GPU & Fabric Energy Audit", href: "/offerings#energy-optimization-hyperscale" },
      { label: "Next-Gen Power & Microgrid", href: "/offerings#energy-optimization-hyperscale" }
    ]
  }
];

const solutionsCategories = [
  {
    title: "GPU Optimization",
    href: "/solutions#gpu-optimization",
    items: [
      { label: "Super Scaling", href: "/solutions#gpu-optimization" },
      { label: "Low-Latency HPC Networking", href: "/solutions#gpu-optimization" },
      { label: "Memory Optimization", href: "/solutions#gpu-optimization" },
      { label: "Inference Speed Reduction", href: "/solutions#gpu-optimization" },
      { label: "Multi-Tenant GPU Management", href: "/solutions#gpu-optimization" }
    ]
  },
  {
    title: "LLM Optimization",
    href: "/solutions#llm-optimization",
    items: [
      { label: "RAG Pipeline Architecture", href: "/solutions#llm-optimization" },
      { label: "Fine-Tuning (PEFT / LoRA)", href: "/solutions#llm-optimization" },
      { label: "Autonomous Agent Frameworks", href: "/solutions#llm-optimization" },
      { label: "Multi-Modal Model Integration", href: "/solutions#llm-optimization" },
      { label: "Token Cost Optimization", href: "/solutions#llm-optimization" }
    ]
  },
  {
    title: "AI Trust & Reliability",
    href: "/solutions#ai-trust-reliability",
    items: [
      { label: "Model Drift Detection", href: "/solutions#ai-trust-reliability" },
      { label: "LLM Observability Stack", href: "/solutions#ai-trust-reliability" },
      { label: "Red-Teaming & Stress Testing", href: "/solutions#ai-trust-reliability" },
      { label: "Automated Retraining Pipelines", href: "/solutions#ai-trust-reliability" },
      { label: "SLA / SLO Enforcement", href: "/solutions#ai-trust-reliability" }
    ]
  },
  {
    title: "AI Cybersecurity",
    href: "/solutions#ai-cybersecurity",
    items: [
      { label: "Robustness Testing", href: "/solutions#ai-cybersecurity" },
      { label: "Confidential Computing", href: "/solutions#ai-cybersecurity" },
      { label: "Prompt Injection Defense", href: "/solutions#ai-cybersecurity" },
      { label: "Supply Chain Scanning", href: "/solutions#ai-cybersecurity" },
      { label: "Data & Model Defense", href: "/solutions#ai-cybersecurity" }
    ]
  },
  {
    title: "AI Infrastructure",
    href: "/solutions#ai-infrastructure",
    items: [
      { label: "MLOps / LLMOps Architecture", href: "/solutions#ai-infrastructure" },
      { label: "Vector Database Deployment", href: "/solutions#ai-infrastructure" },
      { label: "Kubernetes Orchestration", href: "/solutions#ai-infrastructure" },
      { label: "Microservices Design", href: "/solutions#ai-infrastructure" },
      { label: "Storage Optimization", href: "/solutions#ai-infrastructure" }
    ]
  },
  {
    title: "Energy Optimization",
    href: "/solutions#energy-optimization",
    items: [
      { label: "GW-Scale Power & Capacity Strategy", href: "/solutions#energy-optimization" },
      { label: "AI Thermal Cooling Transition", href: "/solutions#energy-optimization" },
      { label: "GPU & Network Fabric Energy Audit", href: "/solutions#energy-optimization" },
      { label: "Sustainable AI & ESG Compliance", href: "/solutions#energy-optimization" },
      { label: "AI-Driven Facility Operations", href: "/solutions#energy-optimization" },
      { label: "Waste Heat Recovery & Monetization", href: "/solutions#energy-optimization" },
      { label: "Next-Gen Power Architecture & Microgrid Design", href: "/solutions#energy-optimization" }
    ]
  }
];

const capabilitiesCategories = [
  {
    title: "GPU Optimization",
    href: "/capabilities#gpu-optimization",
    items: [
      { label: "GPU Super-Scaling & Orchestration", href: "/capabilities#gpu-optimization" },
      { label: "Ultra-Low Latency HPC Network Fabric", href: "/capabilities#gpu-optimization" },
      { label: "Real-Time Inference Acceleration", href: "/capabilities#gpu-optimization" },
      { label: "Custom CUDA/Triton Kernel Dev", href: "/capabilities#gpu-optimization" },
      { label: "Energy-Efficient GPU Scheduling", href: "/capabilities#gpu-optimization" }
    ]
  },
  {
    title: "LLM Optimization",
    href: "/capabilities#llm-optimization",
    items: [
      { label: "Domain-Specific LLM Adaptation & Alignment", href: "/capabilities#llm-optimization" },
      { label: "Agentic Workflow & State Machine Design", href: "/capabilities#llm-optimization" },
      { label: "Semantic Search & Retrieval Engineering", href: "/capabilities#llm-optimization" },
      { label: "Advanced Prompt Engineering", href: "/capabilities#llm-optimization" },
      { label: "LLM Evaluation & Benchmarking", href: "/capabilities#llm-optimization" }
    ]
  },
  {
    title: "AI Trust & Reliability",
    href: "/capabilities#ai-trust-reliability",
    items: [
      { label: "Statistical Drift & Outlier Analysis", href: "/capabilities#ai-trust-reliability" },
      { label: "Adversarial Prompt Resilience Testing", href: "/capabilities#ai-trust-reliability" },
      { label: "Deep Traceability & Lineage Tracking", href: "/capabilities#ai-trust-reliability" },
      { label: "Automated ML Pipeline Orchestration", href: "/capabilities#ai-trust-reliability" },
      { label: "Chaos Engineering for Distributed AI", href: "/capabilities#ai-trust-reliability" }
    ]
  },
  {
    title: "AI Cybersecurity",
    href: "/capabilities#ai-cybersecurity",
    items: [
      { label: "Penetration Testing for Neural Nets", href: "/capabilities#ai-cybersecurity" },
      { label: "Zero-Trust Architecture for ML APIs", href: "/capabilities#ai-cybersecurity" },
      { label: "TEE / Hardware-Backed Secure Setup", href: "/capabilities#ai-cybersecurity" },
      { label: "Differential Privacy Implementation", href: "/capabilities#ai-cybersecurity" },
      { label: "Regulatory Compliance Mapping", href: "/capabilities#ai-cybersecurity" }
    ]
  },
  {
    title: "AI Infrastructure",
    href: "/capabilities#ai-infrastructure",
    items: [
      { label: "Cloud-Native AI Containerization", href: "/capabilities#ai-infrastructure" },
      { label: "GPU Cluster Provisioning Automation", href: "/capabilities#ai-infrastructure" },
      { label: "High-Throughput Data Ingestion", href: "/capabilities#ai-infrastructure" },
      { label: "Infrastructure Cost Optimization (FinOps)", href: "/capabilities#ai-infrastructure" },
      { label: "Real-Time Streaming Data Integration", href: "/capabilities#ai-infrastructure" }
    ]
  }
];

const useCasesCategories = [
  {
    title: "GPU Optimization",
    href: "/use-cases#gpu-optimization",
    items: [
      { label: "Globally Distributed Model Pre-training", href: "/use-cases#gpu-optimization" },
      { label: "Ultra-low Latency HPC Simulations", href: "/use-cases#gpu-optimization" },
      { label: "Large-scale LLM Pre-training Acceleration", href: "/use-cases#gpu-optimization" },
      { label: "Real-time Video Analytics & CV Pipelines", href: "/use-cases#gpu-optimization" },
      { label: "High-frequency Trading Execution", href: "/use-cases#gpu-optimization" }
    ]
  },
  {
    title: "LLM Optimization",
    href: "/use-cases#llm-optimization",
    items: [
      { label: "Enterprise Knowledge Base Search", href: "/use-cases#llm-optimization" },
      { label: "Automated Code Generation & Review", href: "/use-cases#llm-optimization" },
      { label: "Intelligent Document Processing (IDP)", href: "/use-cases#llm-optimization" },
      { label: "Customer Support Ticket Resolution", href: "/use-cases#llm-optimization" },
      { label: "Complex Data Translation (Text-to-SQL)", href: "/use-cases#llm-optimization" }
    ]
  },
  {
    title: "AI Trust & Reliability",
    href: "/use-cases#ai-trust-reliability",
    items: [
      { label: "Fraud Detection Model Drift Prevention", href: "/use-cases#ai-trust-reliability" },
      { label: "Healthcare Diagnostic AI Accuracy Assurance", href: "/use-cases#ai-trust-reliability" },
      { label: "Chatbot Toxicity & Safety Guardrails", href: "/use-cases#ai-trust-reliability" },
      { label: "Trading Algorithm Stability Monitoring", href: "/use-cases#ai-trust-reliability" },
      { label: "Manufacturing Sensor Drift Correction", href: "/use-cases#ai-trust-reliability" }
    ]
  },
  {
    title: "AI Cybersecurity",
    href: "/use-cases#ai-cybersecurity",
    items: [
      { label: "Customer Chatbot Prompt Injection Defenses", href: "/use-cases#ai-cybersecurity" },
      { label: "Proprietary LLM Weights Theft Protection", href: "/use-cases#ai-cybersecurity" },
      { label: "Healthcare Patient Data Reconstruction", href: "/use-cases#ai-cybersecurity" },
      { label: "Biometric System Adversarial Hardening", href: "/use-cases#ai-cybersecurity" },
      { label: "Third-party ML Dependency Audits", href: "/use-cases#ai-cybersecurity" }
    ]
  },
  {
    title: "AI Infrastructure",
    href: "/use-cases#ai-infrastructure",
    items: [
      { label: "Carbon-Aware Data Center Energy Optimization", href: "/use-cases#ai-infrastructure" },
      { label: "GPU Direct Storage (GDS) I/O Optimization", href: "/use-cases#ai-infrastructure" },
      { label: "Unified Memory (UMA) Memory Optimization", href: "/use-cases#ai-infrastructure" },
      { label: "Enterprise ML Platform Engineering", href: "/use-cases#ai-infrastructure" },
      { label: "Automated Failover Multi-Million Inference Routing", href: "/use-cases#ai-infrastructure" }
    ]
  }
];

const platformCategories = [
  {
    title: "GPU-phi Orchestration",
    href: "/platform#gpu-phi-cloud-neutral-orchestration",
    items: [
      { label: "Multi-Cluster Management", href: "/platform#gpu-phi-cloud-neutral-orchestration" },
      { label: "Topology-Aware Scheduling", href: "/platform#gpu-phi-cloud-neutral-orchestration" },
      { label: "MIG & vGPU Partitioning", href: "/platform#gpu-phi-cloud-neutral-orchestration" },
      { label: "Preemptible GPU Arbitrage", href: "/platform#gpu-phi-cloud-neutral-orchestration" },
    ]
  },
  {
    title: "GPU FinOps Dashboard",
    href: "/platform#gpu-finops-dashboard",
    items: [
      { label: "Granular Cost Allocation", href: "/platform#gpu-finops-dashboard" },
      { label: "Idle Detection & Alerting", href: "/platform#gpu-finops-dashboard" },
      { label: "Spot Arbitrage Scheduling", href: "/platform#gpu-finops-dashboard" },
      { label: "Budget Limits & showback", href: "/platform#gpu-finops-dashboard" },
    ]
  },
  {
    title: "Self-Healing Clusters",
    href: "/platform#self-healing-clusters",
    items: [
      { label: "Predictive Node Failure Analysis", href: "/platform#self-healing-clusters" },
      { label: "Automated Checkpoint-and-Resume", href: "/platform#self-healing-clusters" },
      { label: "Fast Node Isolation (Fencing)", href: "/platform#self-healing-clusters" },
      { label: "Memory & GPU Diagnostic Sweeps", href: "/platform#self-healing-clusters" },
    ]
  }
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

function HomeDropdown() {
  return (
    <div className="nav-dropdown w-[640px]">
      <div className="grid grid-cols-2 gap-x-10 gap-y-4.5">
        {homeItems.map((item) => (
          <SectionLink
            key={item.href + item.label}
            href={item.href}
            className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
          >
            <span className="text-blue-500 font-bold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">
              →
            </span>
            <span className="text-xs font-semibold text-slate-700 group-hover/item:text-blue-600 transition-colors leading-tight font-sans tracking-wide">
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
    <div className="nav-dropdown w-[1380px] max-w-[95vw]">
      <div className="grid grid-cols-6 gap-x-6 gap-y-6">
        {offeringsCategories.map((cat) => (
          <div key={cat.title} className="flex flex-col">
            <SectionLink
              href={cat.href}
              className="text-xs font-extrabold text-slate-900 hover:text-blue-600 transition-colors tracking-wider mb-3 block border-b border-border/30 pb-2"
            >
              {cat.title}
            </SectionLink>
            <div className="flex flex-col gap-2.5">
              {cat.items.map((item) => (
                <SectionLink
                  key={item.href + item.label}
                  href={item.href}
                  className="flex items-start gap-2 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-blue-500 font-bold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px] mt-0.5">
                    →
                  </span>
                  <span className="text-xs font-semibold text-slate-700 group-hover/item:text-blue-600 transition-colors leading-snug font-sans tracking-wide">
                    {item.label}
                  </span>
                </SectionLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IndustriesDropdown() {
  return (
    <div className="nav-dropdown w-[1120px] max-w-[95vw]">
      <div className="grid grid-cols-4 gap-x-8 gap-y-10">
        {industrySegments.map((segment) => (
          <div key={segment.title} className="flex flex-col">
            <SectionLink
              href="/industries"
              className="text-xs font-extrabold text-slate-900 hover:text-blue-600 transition-colors tracking-wider mb-3 block border-b border-border/30 pb-2"
            >
              {segment.title}
            </SectionLink>
            <div className="flex flex-col gap-2.5">
              {segment.items.map((item) => (
                <SectionLink
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <item.icon className="h-3.5 w-3.5 text-slate-500 group-hover/item:text-blue-600 transition-colors shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-700 group-hover/item:text-blue-600 transition-colors leading-snug font-sans tracking-wide">
                    {item.label}
                  </span>
                </SectionLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SolutionsDropdown() {
  return (
    <div className="nav-dropdown w-[1380px] max-w-[95vw]">
      <div className="grid grid-cols-6 gap-x-6 gap-y-6">
        {solutionsCategories.map((cat) => (
          <div key={cat.title} className="flex flex-col">
            <SectionLink
              href={cat.href}
              className="text-xs font-extrabold text-slate-900 hover:text-blue-600 transition-colors tracking-wider mb-3 block border-b border-border/30 pb-2"
            >
              {cat.title}
            </SectionLink>
            <div className="flex flex-col gap-2.5">
              {cat.items.map((item) => (
                <SectionLink
                  key={item.href + item.label}
                  href={item.href}
                  className="flex items-start gap-2 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-blue-500 font-bold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px] mt-0.5">
                    →
                  </span>
                  <span className="text-xs font-semibold text-slate-700 group-hover/item:text-blue-600 transition-colors leading-snug font-sans tracking-wide">
                    {item.label}
                  </span>
                </SectionLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CapabilitiesDropdown() {
  return (
    <div className="nav-dropdown w-[1200px] max-w-[95vw]">
      <div className="grid grid-cols-5 gap-x-6 gap-y-6">
        {capabilitiesCategories.map((cat) => (
          <div key={cat.title} className="flex flex-col">
            <SectionLink
              href={cat.href}
              className="text-xs font-extrabold text-slate-900 hover:text-blue-600 transition-colors tracking-wider mb-3 block border-b border-border/30 pb-2"
            >
              {cat.title}
            </SectionLink>
            <div className="flex flex-col gap-2.5">
              {cat.items.map((item) => (
                <SectionLink
                  key={item.href + item.label}
                  href={item.href}
                  className="flex items-start gap-2 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-blue-500 font-bold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px] mt-0.5">
                    →
                  </span>
                  <span className="text-xs font-semibold text-slate-700 group-hover/item:text-blue-600 transition-colors leading-snug font-sans tracking-wide">
                    {item.label}
                  </span>
                </SectionLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UseCasesDropdown() {
  return (
    <div className="nav-dropdown w-[1200px] max-w-[95vw]">
      <div className="grid grid-cols-5 gap-x-6 gap-y-6">
        {useCasesCategories.map((cat) => (
          <div key={cat.title} className="flex flex-col">
            <SectionLink
              href={cat.href}
              className="text-xs font-extrabold text-slate-900 hover:text-blue-600 transition-colors tracking-wider mb-3 block border-b border-border/30 pb-2"
            >
              {cat.title}
            </SectionLink>
            <div className="flex flex-col gap-2.5">
              {cat.items.map((item) => (
                <SectionLink
                  key={item.href + item.label}
                  href={item.href}
                  className="flex items-center gap-2 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-blue-500 font-bold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">
                    →
                  </span>
                  <span className="text-xs font-semibold text-slate-700 group-hover/item:text-blue-600 transition-colors leading-snug font-sans tracking-wide">
                    {item.label}
                  </span>
                </SectionLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlatformDropdown() {
  return (
    <div className="nav-dropdown w-[900px] max-w-[95vw]">
      <div className="grid grid-cols-3 gap-x-8 gap-y-6">
        {platformCategories.map((cat) => (
          <div key={cat.title} className="flex flex-col">
            <SectionLink
              href={cat.href}
              className="text-xs font-extrabold text-slate-900 hover:text-blue-600 transition-colors tracking-wider mb-3 block border-b border-border/30 pb-2"
            >
              {cat.title}
            </SectionLink>
            <div className="flex flex-col gap-2.5">
              {cat.items.map((item) => (
                <SectionLink
                  key={item.href + item.label}
                  href={item.href}
                  className="flex items-center gap-2 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-blue-500 font-bold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">
                    →
                  </span>
                  <span className="text-xs font-semibold text-slate-700 group-hover/item:text-blue-600 transition-colors leading-snug font-sans tracking-wide">
                    {item.label}
                  </span>
                </SectionLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutDropdown() {
  return (
    <div className="nav-dropdown w-[260px]">
      <div className="flex flex-col gap-y-3.5">
        {aboutItems.map((item) => (
          <SectionLink
            key={item.label}
            href={item.href}
            className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
          >
            <span className="text-blue-500 font-bold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">
              →
            </span>
            <span className="text-xs font-semibold text-slate-700 group-hover/item:text-blue-600 transition-colors leading-tight font-sans tracking-wide">
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
  children?: React.ReactNode;
};

function NavItem({ label, to, children }: NavItemProps) {
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

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  if (!children) {
    return (
      <Link
        to={to}
        className="text-sm font-bold text-slate-800 transition-colors hover:text-blue-600 px-3.5 py-2 rounded-md whitespace-nowrap"
        activeProps={{ className: "text-blue-600 bg-blue-50/50 px-3.5 py-2 rounded-md font-bold" }}
      >
        {label}
      </Link>
    );
  }

  return (
    <div
      ref={ref}
      className=""
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={to}
        className="text-sm font-bold text-slate-800 transition-colors hover:text-blue-600 px-3.5 py-2 rounded-md whitespace-nowrap"
        activeProps={{ className: "text-blue-600 bg-blue-50/50 px-3.5 py-2 rounded-md font-bold" }}
      >
        {label}
      </Link>

      {open && (
        <div 
          className="absolute top-full left-1/2 -translate-x-1/2 pt-6 z-[200]"
          onClick={() => setOpen(false)}
        >
          <div>
            {children}
          </div>
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
        className="w-full flex items-center justify-between py-3.5 text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
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
          background: oklch(1.0 0 0 / 0.995);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid var(--color-border);
          border-radius: 0px;
          box-shadow: 0 16px 36px -12px oklch(0.12 0.015 250 / 0.04), 0 0 0 1px oklch(0.45 0.18 260 / 0.02);
          padding: 2rem;
          letter-spacing: 0.025em;
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
        <div className="max-w-screen-2xl mx-auto w-full flex h-14 items-center justify-between px-6 md:px-8 xl:px-12">

          {/* Brand */}
          <Link to="/" className="flex items-center group mr-6 shrink-0">
            <img src="/logo.png" alt="TrustGrid.AI Logo" className="h-8 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-5">
            <NavItem label="Home" to="/">
              <HomeDropdown />
            </NavItem>
            <NavItem label="Offerings" to="/offerings">
              <OfferingsDropdown />
            </NavItem>
            <NavItem label="Industries" to="/industries">
              <IndustriesDropdown />
            </NavItem>
            <NavItem label="Solutions" to="/solutions">
              <SolutionsDropdown />
            </NavItem>
            <NavItem label="Capabilities" to="/capabilities">
              <CapabilitiesDropdown />
            </NavItem>
            <NavItem label="Use Cases" to="/use-cases">
              <UseCasesDropdown />
            </NavItem>
            <NavItem label="Platform" to="/platform">
              <PlatformDropdown />
            </NavItem>
            <NavItem label="About Us" to="/about">
              <AboutDropdown />
            </NavItem>
          </nav>

          {/* Action + Hamburger */}
          <div className="flex items-center gap-3">
            <Link to="/contact" className="hidden xl:block">
              <Button size="default" className="bg-black hover:bg-black/90 text-white font-medium text-sm border border-white/10 shadow-sm">
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
                <p className="text-[10px] font-semibold tracking-widest text-muted-foreground mb-2">Key Offerings</p>
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
                      <span className="text-xs font-medium text-foreground leading-tight">{item.label}</span>
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
                      className="block py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                    >
                      {item.label}
                    </SectionLink>
                  ))}
                </div>
              </MobileAccordion>

              <MobileAccordion title="Offerings" to="/offerings" onClose={() => setMobileOpen(false)}>
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
                            className="block py-1 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                          >
                            {item.label}
                          </SectionLink>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </MobileAccordion>

              <MobileAccordion title="Industries" to="/industries" onClose={() => setMobileOpen(false)}>
                <div className="space-y-1 py-1">
                  {industryOfferingsItems.map((item) => (
                    <SectionLink
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                    >
                      {item.label}
                    </SectionLink>
                  ))}
                </div>
              </MobileAccordion>

              <MobileAccordion title="Solutions" to="/solutions" onClose={() => setMobileOpen(false)}>
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
                            className="block py-1 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                          >
                            {item.label}
                          </SectionLink>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </MobileAccordion>

              <MobileAccordion title="Capabilities" to="/capabilities" onClose={() => setMobileOpen(false)}>
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
                            className="block py-1 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                          >
                            {item.label}
                          </SectionLink>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </MobileAccordion>

              <MobileAccordion title="Use Cases" to="/use-cases" onClose={() => setMobileOpen(false)}>
                <div className="space-y-1 py-1">
                  {useCasesItems.map((item) => (
                    <SectionLink
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
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
                            className="block py-1 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
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
                      className="block py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                    >
                      {item.label}
                    </SectionLink>
                  ))}
                </div>
              </MobileAccordion>

              <Link to="/contact" onClick={() => setMobileOpen(false)} className="block mt-5">
                <Button size="default" className="w-full bg-primary text-primary-foreground text-sm">
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
