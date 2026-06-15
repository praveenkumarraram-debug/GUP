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
  { label: "LLM Optimization & AI Agents", href: "/offerings#llm-optimization-agents" },
  { label: "AI Cybersecurity", href: "/offerings#ai-cybersecurity" },
  { label: "AI Infrastructure Engineering", href: "/offerings#ai-infrastructure-engineering" },
  { label: "AI Trusted Reliability Engineering (AIRE)", href: "/offerings#ai-trusted-reliability-engineering" },
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
  { label: "GPU & AI HPC Infrastructure", href: "/solutions#gpu-infra" },
  { label: "LLM Optimization & Enterprise Generative AI", href: "/solutions#llm-opt" },
  { label: "AI Agents & Autonomous Systems", href: "/solutions#agentic-ai" },
  { label: "AI Cybersecurity & Governance", href: "/solutions#security-gov" },
  { label: "AI Trusted Reliability Engineering (AIRE)", href: "/solutions#trusted-reliability-engineering" },
];

const capabilitiesItems = [
  { label: "GPU Optimization", href: "/capabilities#gpu-optimization" },
  { label: "Cloud GPU Orchestration", href: "/capabilities#cloud-gpu-optimization" },
  { label: "LLM Optimization", href: "/capabilities#llm-optimization" },
  { label: "AI Infrastructure Automation", href: "/capabilities#ai-optimization" },
  { label: "Data Center Network Automation", href: "/capabilities#data-center-network-automation" },
  { label: "Energy Optimization & ESG", href: "/capabilities#energy-optimization" },
  { label: "AI Security & Cyber Dom", href: "/capabilities#ai-security-cyber-dom-protection-mesh" },
  { label: "Hardened Sandbox Shell & Agent Execution", href: "/capabilities#hardened-sandbox-shell-agent-execution" },
  { label: "Multi-Agent Fleet Orchestration", href: "/capabilities#multi-agent-fleet-orchestration" },
  { label: "AI Trusted Reliability Engineering (AIRE)", href: "/capabilities#ai-trusted-reliability-engineering" },
  { label: "All Capabilities", href: "/capabilities" },
];

const useCasesItems = [
  { label: "Sovereign AI Initiatives", href: "/use-cases#sovereign-ai" },
  { label: "High-Frequency Trading", href: "/use-cases#high-frequency-trading" },
  { label: "Global SaaS Platforms", href: "/use-cases#global-saas" },
  { label: "Autonomous Operations", href: "/use-cases#autonomous-operations" },
  { label: "Regulated AI Security", href: "/use-cases#regulated-ai-security" },
  { label: "Secure Medical LLMOps", href: "/use-cases#secure-medical-llmops" },
  { label: "AI-Driven Penetration Testing", href: "/use-cases#cybersecurity-pen-testing" },
  { label: "Managed Threat Defense (MDR)", href: "/use-cases#cybersecurity-mdr" },
  { label: "Breach & Attack Simulation (BAS)", href: "/use-cases#cybersecurity-bas" },
  { label: "Industry AI Cybersecurity", href: "/use-cases#cybersecurity-industry" },
  { label: "High-Risk Generative AI / RAG Systems", href: "/use-cases#high-risk-genai-rag" },
  { label: "Credit Scoring & Lending AI", href: "/use-cases#credit-scoring-lending" },
  { label: "Healthcare Clinical AI Applications", href: "/use-cases#healthcare-clinical-ai" },
];

const platformItems = [
  { label: "GPU-phi Orchestration", href: "/platform#gpu-phi-cloud-neutral-orchestration" },
  { label: "GPU FinOps Dashboard", href: "/platform#gpu-finops-dashboard" },
  { label: "Self-Healing Clusters", href: "/platform#self-healing-clusters" },
];

const aboutItems = [
  { label: "About TrustGrid.AI", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights & Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const offeringsCategories = [
  {
    title: "GPU Optimization",
    href: "/offerings#gpu-optimization",
    items: [
      { label: "Low-Level Kernel & Whitebox", href: "/offerings#1-1-low-level-kernel-whitebox-optimization" },
      { label: "Applied GPU Acceleration", href: "/offerings#1-2-applied-gpu-acceleration-distributed-workloads" },
      { label: "GPU FinOps & Cost Diagnostics", href: "/offerings#1-3-gpu-finops-cost-performance-diagnostics" },
      { label: "Workload-Specific Packages", href: "/offerings#1-4-workload-specific-optimization-packages" },
    ]
  },
  {
    title: "LLM & AI Agents",
    href: "/offerings#llm-optimization-agents",
    items: [
      { label: "LLM Fine-Tuning & Quantization", href: "/offerings#2-1-production-grade-llm-fine-tuning-quantization" },
      { label: "LLM Evaluation & Guardrails Gateway", href: "/offerings#2-2-enterprise-llm-evaluation-guardrails-gateway" },
      { label: "Multi-Agent Workflow Orchestration", href: "/offerings#2-3-multi-agent-workflow-orchestration-coordination" },
      { label: "Agent Tool Integration & Action Gating", href: "/offerings#2-4-agent-tool-integration-action-gating-human-in-the-loop" },
    ]
  },
  {
    title: "AI Cybersecurity",
    href: "/offerings#ai-cybersecurity",
    items: [
      { label: "Cyber Dom Mesh & Guardrails", href: "/offerings#3-1-cyber-dom-ai-security-guardrails-mesh" },
      { label: "Hardened Sandbox Execution", href: "/offerings#3-2-bash-shell-hardening-secure-sandbox-execution" },
    ]
  },
  {
    title: "AI Infrastructure Engineering",
    href: "/offerings#ai-infrastructure-engineering",
    items: [
      { label: "Mega-Scale DC Fabric Optimization", href: "/offerings#4-1-mega-scale-data-center-network-fabric-optimization" },
      { label: "Enterprise GPU Platform Automation", href: "/offerings#4-2-enterprise-scale-gpu-platform-transformation-automation" },
    ]
  },
  {
    title: "Reliability Engineering (AIRE)",
    href: "/offerings#ai-trusted-reliability-engineering",
    items: [
      { label: "NIST AI Risk & Governance", href: "/offerings#5-1-nist-ai-risk-management-governance-system" },
      { label: "EU AI Act Conformity Assessment", href: "/offerings#5-2-eu-ai-act-conformity-assessment-high-risk-obligations" },
      { label: "ISO 42001 & ISO 23894 AIMS", href: "/offerings#5-3-iso-42001-2023-iso-23894-management-systems-aims" },
      { label: "Adversarial AI Red Teaming", href: "/offerings#5-4-adversarial-ai-red-teaming-model-penetration-testing" },
      { label: "Reliability & Observability Gateway", href: "/offerings#5-5-reliability-architecture-guardrails-real-time-observability" },
    ]
  }
];

const solutionsCategories = [
  {
    title: "GPU & HPC Infrastructure",
    href: "/solutions#gpu-infra",
    items: [
      { label: "Data Center AI Solutions", href: "/solutions#gpu-infra" },
      { label: "HPC Cluster Solutions", href: "/solutions#gpu-infra" },
      { label: "Network Fabric & Automation", href: "/solutions#gpu-infra" },
      { label: "AI Infrastructure Operations", href: "/solutions#gpu-infra" },
    ]
  },
  {
    title: "LLM & Enterprise GenAI",
    href: "/solutions#llm-opt",
    items: [
      { label: "Enterprise Fine-Tuning & Opt", href: "/solutions#llm-opt" },
      { label: "RAG & Knowledge Systems", href: "/solutions#llm-opt" },
      { label: "Long-Memory AI Systems", href: "/solutions#llm-opt" },
    ]
  },
  {
    title: "AI Agents & Autonomous",
    href: "/solutions#agentic-ai",
    items: [
      { label: "Multi-Agent Orchestration", href: "/solutions#agentic-ai" },
      { label: "Agent Architecture & Tooling", href: "/solutions#agentic-ai" },
      { label: "Autonomous Operations", href: "/solutions#agentic-ai" },
    ]
  },
  {
    title: "AI Cybersecurity & Gov",
    href: "/solutions#security-gov",
    items: [
      { label: "AI Infrastructure Security", href: "/solutions#security-gov" },
      { label: "Model & Agent Protection", href: "/solutions#security-gov" },
      { label: "Compliance & Governance", href: "/solutions#security-gov" },
    ]
  },
  {
    title: "Reliability Engineering",
    href: "/solutions#trusted-reliability-engineering",
    items: [
      { label: "NIST Risk & Governance", href: "/solutions#trusted-reliability-engineering" },
      { label: "EU AI Act Conformity", href: "/solutions#trusted-reliability-engineering" },
      { label: "ISO 42001 & ISO 23894 AIMS", href: "/solutions#trusted-reliability-engineering" },
      { label: "Red Teaming & Observability", href: "/solutions#trusted-reliability-engineering" },
    ]
  }
];

const capabilitiesCategories = [
  {
    title: "GPU Performance",
    href: "/capabilities#gpu-optimization",
    items: [
      { label: "GPU Optimization", href: "/capabilities#gpu-optimization" },
      { label: "Cloud GPU Orchestration", href: "/capabilities#cloud-gpu-optimization" },
    ]
  },
  {
    title: "Infrastructure & Networking",
    href: "/capabilities#ai-optimization",
    items: [
      { label: "AI Infrastructure Automation", href: "/capabilities#ai-optimization" },
      { label: "Data Center Network Automation", href: "/capabilities#data-center-network-automation" },
    ]
  },
  {
    title: "LLM & Agents Optimization",
    href: "/capabilities#llm-optimization",
    items: [
      { label: "LLM Optimization", href: "/capabilities#llm-optimization" },
      { label: "Multi-Agent Fleet Orchestration", href: "/capabilities#multi-agent-fleet-orchestration" },
    ]
  },
  {
    title: "AI-Driven Cybersecurity",
    href: "/capabilities#ai-security-cyber-dom-protection-mesh",
    items: [
      { label: "AI Security & Cyber Dom Mesh", href: "/capabilities#ai-security-cyber-dom-protection-mesh" },
      { label: "Hardened Sandbox Execution", href: "/capabilities#hardened-sandbox-shell-agent-execution" },
    ]
  },
  {
    title: "Energy & Reliability (AIRE)",
    href: "/capabilities#energy-optimization",
    items: [
      { label: "Energy Optimization & ESG", href: "/capabilities#energy-optimization" },
      { label: "Reliability Engineering (AIRE)", href: "/capabilities#ai-trusted-reliability-engineering" },
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
            <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">
              →
            </span>
            <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans tracking-wide">
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
    <div className="nav-dropdown w-[1120px] max-w-[95vw]">
      <div className="grid grid-cols-5 gap-x-8 gap-y-6">
        {offeringsCategories.map((cat) => (
          <div key={cat.title} className="flex flex-col">
            <SectionLink
              href={cat.href}
              className="text-xs font-bold text-foreground hover:text-primary transition-colors tracking-wider uppercase mb-3 block border-b border-border/30 pb-2"
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
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">
                    →
                  </span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
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
              className="text-xs font-bold text-foreground hover:text-primary transition-colors tracking-wider uppercase mb-3 block border-b border-border/30 pb-2"
            >
              {segment.title}
            </SectionLink>
            <div className="flex flex-col gap-2.5">
              {segment.items.map((item) => (
                <SectionLink
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <item.icon className="h-3.5 w-3.5 text-muted-foreground/60 group-hover/item:text-primary transition-colors shrink-0" />
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
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
    <div className="nav-dropdown w-[1120px] max-w-[95vw]">
      <div className="grid grid-cols-5 gap-x-8 gap-y-6">
        {solutionsCategories.map((cat) => (
          <div key={cat.title} className="flex flex-col">
            <SectionLink
              href={cat.href}
              className="text-xs font-bold text-foreground hover:text-primary transition-colors tracking-wider uppercase mb-3 block border-b border-border/30 pb-2"
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
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">
                    →
                  </span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
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
    <div className="nav-dropdown w-[1120px] max-w-[95vw]">
      <div className="grid grid-cols-5 gap-x-8 gap-y-6">
        {capabilitiesCategories.map((cat) => (
          <div key={cat.title} className="flex flex-col">
            <SectionLink
              href={cat.href}
              className="text-xs font-bold text-foreground hover:text-primary transition-colors tracking-wider uppercase mb-3 block border-b border-border/30 pb-2"
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
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">
                    →
                  </span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
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
    <div className="nav-dropdown w-[1120px] max-w-[95vw]">
      <div className="grid grid-cols-4 gap-x-8 gap-y-10">
        
        {/* Column 1: Core Architectures */}
        <div className="flex flex-col">
          <SectionLink
            href="/use-cases"
            className="text-xs font-bold text-foreground hover:text-primary transition-colors tracking-wider uppercase mb-3 block border-b border-border/30 pb-2"
          >
            Core Architectures
          </SectionLink>
          
          <div className="space-y-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-accent mb-2 pl-1">
                Infrastructure & Scaling
              </p>
              <div className="space-y-2">
                <SectionLink
                  href="/use-cases#sovereign-ai"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    Sovereign AI Initiatives
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#global-saas"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    Global SaaS Platforms
                  </span>
                </SectionLink>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-accent mb-2 pl-1">
                Low-Latency Compute
              </p>
              <div className="space-y-2">
                <SectionLink
                  href="/use-cases#high-frequency-trading"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    High-Frequency Trading
                  </span>
                </SectionLink>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-accent mb-2 pl-1">
                Enterprise Automation
              </p>
              <div className="space-y-2">
                <SectionLink
                  href="/use-cases#autonomous-operations"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    Autonomous Operations
                  </span>
                </SectionLink>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-accent mb-2 pl-1">
                Security & HIPAA Compliance
              </p>
              <div className="space-y-2">
                <SectionLink
                  href="/use-cases#regulated-ai-security"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    Regulated AI Security
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#secure-medical-llmops"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    Secure Medical LLMOps
                  </span>
                </SectionLink>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-accent mb-2 pl-1">
                Trusted AI & Compliance (AIRE)
              </p>
              <div className="space-y-2">
                <SectionLink
                  href="/use-cases#high-risk-genai-rag"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    High-Risk GenAI & RAG
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#credit-scoring-lending"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    Credit Scoring & Lending
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#healthcare-clinical-ai"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    Healthcare Clinical AI
                  </span>
                </SectionLink>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Pen Testing & BAS */}
        <div className="flex flex-col">
          <SectionLink
            href="/use-cases"
            className="text-xs font-bold text-foreground hover:text-primary transition-colors tracking-wider uppercase mb-3 block border-b border-border/30 pb-2"
          >
            Pen Testing & BAS
          </SectionLink>
          
          <div className="space-y-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-accent mb-2 pl-1">
                AI-Driven Penetration Testing
              </p>
              <div className="space-y-2">
                <SectionLink
                  href="/use-cases#uc-61"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    Automated Attack Surface Mapping
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-62"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    Intelligent Exploit Generation
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-63"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    Dynamic Payload Obfuscation
                  </span>
                </SectionLink>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-accent mb-2 pl-1">
                AI Breach & Attack Simulation (BAS)
              </p>
              <div className="space-y-2">
                <SectionLink
                  href="/use-cases#uc-68"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    Continuous Purple Teaming
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-69"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    LLM-Specific Attack Simulation
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-70"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    Lateral Movement Emulation
                  </span>
                </SectionLink>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Managed Threat Defense */}
        <div className="flex flex-col">
          <SectionLink
            href="/use-cases"
            className="text-xs font-bold text-foreground hover:text-primary transition-colors tracking-wider uppercase mb-3 block border-b border-border/30 pb-2"
          >
            Managed Threat Defense
          </SectionLink>
          
          <div className="space-y-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-accent mb-2 pl-1">
                AI-Driven Managed Threat Defense (MDR)
              </p>
              <div className="space-y-2">
                <SectionLink
                  href="/use-cases#uc-64"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    Line-Rate Network Anomaly Detection
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-65"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    Zero-Day Threat Intel Extraction
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-66"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    Automated SOAR Playbook Execution
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-67"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    Multi-Modal Phishing Defense
                  </span>
                </SectionLink>
              </div>
            </div>
          </div>
        </div>

        {/* Column 4: Industry Cyber Defense */}
        <div className="flex flex-col">
          <SectionLink
            href="/use-cases"
            className="text-xs font-bold text-foreground hover:text-primary transition-colors tracking-wider uppercase mb-3 block border-b border-border/30 pb-2"
          >
            Industry Cyber Defense
          </SectionLink>
          
          <div className="space-y-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-accent mb-2 pl-1">
                AI Cybersecurity for Various Industries
              </p>
              <div className="space-y-2">
                <SectionLink
                  href="/use-cases#uc-71"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    Finance: Voice Deepfake Detection
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-72"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    Healthcare: PHI Leak Prevention
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-73"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    Manufacturing: ICS Ransomware Defense
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-74"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    Government: Air-Gapped Threat Hunt
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-75"
                  className="flex items-center gap-2.5 py-0.5 px-0.5 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
                    Retail: Behavioral Bot Defense
                  </span>
                </SectionLink>
              </div>
            </div>
          </div>
        </div>

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
              className="text-xs font-bold text-foreground hover:text-primary transition-colors tracking-wider uppercase mb-3 block border-b border-border/30 pb-2"
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
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0 text-[10px]">
                    →
                  </span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-snug font-sans tracking-wide">
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
    <div className="nav-dropdown w-[640px]">
      <div className="grid grid-cols-2 gap-x-10 gap-y-4.5">
        {aboutItems.map((item) => (
          <SectionLink
            key={item.label}
            href={item.href}
            className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
          >
            <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">
              →
            </span>
            <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans tracking-wide">
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
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  if (!children) {
    return (
      <Link
        to={to}
        className="text-sm font-medium text-foreground transition-colors hover:text-primary px-3 py-1.5 rounded-md whitespace-nowrap"
        activeProps={{ className: "text-foreground bg-surface/50 px-3 py-1.5 rounded-md font-medium" }}
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
        className="text-sm font-medium text-foreground transition-colors hover:text-primary px-3 py-1.5 rounded-md whitespace-nowrap"
        activeProps={{ className: "text-foreground bg-surface/50 px-3 py-1.5 rounded-md font-medium" }}
      >
        {label}
      </Link>

      {open && (
        <div 
          className="absolute top-full left-1/2 -translate-x-1/2 pt-6 z-[200]"
          onClick={() => setOpen(false)}
        >
          <div className="animate-dropdown">
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
        className="w-full flex items-center justify-between py-3.5 text-sm font-semibold text-foreground"
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-3 pl-2">
          <Link
            to={to}
            onClick={onClose}
            className="block py-2 text-xs font-medium text-accent hover:text-foreground transition-colors"
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
        <div className="w-full flex h-16 items-center justify-between px-6 md:px-8">

          {/* Brand */}
          <Link to="/" className="flex items-center group mr-6 shrink-0">
            <span className="font-display text-xl font-semibold tracking-tight">
              TRUSTGRID<span className="text-accent">.AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-2">
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
              <Button size="default" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm">
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
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Key Offerings</p>
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
                      className="block py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                        className="block text-[10px] font-bold uppercase tracking-wider text-accent pl-1"
                      >
                        {cat.title}
                      </SectionLink>
                      <div className="pl-2.5 border-l border-border/40 space-y-1">
                        {cat.items.map((item) => (
                          <SectionLink
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                      className="block py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                        className="block text-[10px] font-bold uppercase tracking-wider text-accent pl-1"
                      >
                        {cat.title}
                      </SectionLink>
                      <div className="pl-2.5 border-l border-border/40 space-y-1">
                        {cat.items.map((item) => (
                          <SectionLink
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                        className="block text-[10px] font-bold uppercase tracking-wider text-accent pl-1"
                      >
                        {cat.title}
                      </SectionLink>
                      <div className="pl-2.5 border-l border-border/40 space-y-1">
                        {cat.items.map((item) => (
                          <SectionLink
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                      className="block py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                        className="block text-[10px] font-bold uppercase tracking-wider text-accent pl-1"
                      >
                        {cat.title}
                      </SectionLink>
                      <div className="pl-2.5 border-l border-border/40 space-y-1">
                        {cat.items.map((item) => (
                          <SectionLink
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                      className="block py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
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
