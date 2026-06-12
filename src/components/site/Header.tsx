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
  { label: "Manufacturing & Industrial", href: "/offerings#manufacturing-industrial" },
  { label: "Technology & Electronics", href: "/offerings#telecommunications-network" },
  { label: "Infrastructure & Construction", href: "/offerings#infrastructure-construction" },
  { label: "Energy & Utilities", href: "/offerings#energy-utilities-sustainability" },
  { label: "Financial Services", href: "/offerings#banking-financial-services" },
  { label: "Healthcare & Life Sciences", href: "/offerings#healthcare-life-sciences" },
  { label: "Consumer & Retail", href: "/offerings#retail-e-commerce" },
  { label: "Media & Services", href: "/offerings#education-learning-platforms" },
];

const industrySegments = [
  {
    title: "Manufacturing & Industrial",
    items: [
      { label: "Automobiles", icon: Car, href: "/offerings#manufacturing-industrial" },
      { label: "Auto Components", icon: Wrench, href: "/offerings#manufacturing-industrial" },
      { label: "Engineering & Capital Goods", icon: Settings, href: "/offerings#manufacturing-industrial" },
      { label: "Defence Manufacturing", icon: Shield, href: "/offerings#manufacturing-industrial" },
      { label: "MSME", icon: Home, href: "/offerings#manufacturing-industrial" },
    ]
  },
  {
    title: "Technology & Electronics",
    items: [
      { label: "IT & BPM", icon: Laptop, href: "/offerings#telecommunications-network" },
      { label: "Electronics & Semiconductor", icon: Cpu, href: "/offerings#telecommunications-network" },
      { label: "Telecommunications", icon: Phone, href: "/offerings#telecommunications-network" },
      { label: "Science & Technology", icon: FlaskConical, href: "/offerings#telecommunications-network" },
      { label: "Electric Vehicles", icon: Zap, href: "/offerings#telecommunications-network" },
    ]
  },
  {
    title: "Infrastructure & Construction",
    items: [
      { label: "Cement", icon: Layers, href: "/offerings#infrastructure-construction" },
      { label: "Steel", icon: Hammer, href: "/offerings#infrastructure-construction" },
      { label: "Infrastructure", icon: Building2, href: "/offerings#infrastructure-construction" },
      { label: "Real Estate", icon: Home, href: "/offerings#infrastructure-construction" },
      { label: "Roads & Highways", icon: Milestone, href: "/offerings#infrastructure-construction" },
    ]
  },
  {
    title: "Energy & Utilities",
    items: [
      { label: "Oil & Gas", icon: Droplet, href: "/offerings#energy-utilities-sustainability" },
      { label: "Power", icon: Zap, href: "/offerings#energy-utilities-sustainability" },
      { label: "Renewable Energy", icon: Sun, href: "/offerings#energy-utilities-sustainability" },
      { label: "Ports", icon: Anchor, href: "/offerings#energy-utilities-sustainability" },
      { label: "Railways", icon: Train, href: "/offerings#energy-utilities-sustainability" },
    ]
  },
  {
    title: "Financial Services",
    items: [
      { label: "Banking", icon: Landmark, href: "/offerings#banking-financial-services" },
      { label: "Financial Services", icon: Coins, href: "/offerings#banking-financial-services" },
      { label: "Insurance", icon: FileText, href: "/offerings#banking-financial-services" },
      { label: "E-Commerce", icon: ShoppingBag, href: "/offerings#banking-financial-services" },
      { label: "Gems & Jewellery", icon: Gem, href: "/offerings#banking-financial-services" },
    ]
  },
  {
    title: "Healthcare & Life Sciences",
    items: [
      { label: "Pharmaceuticals", icon: Pill, href: "/offerings#healthcare-life-sciences" },
      { label: "Healthcare", icon: HeartPulse, href: "/offerings#healthcare-life-sciences" },
      { label: "Medical Devices", icon: Stethoscope, href: "/offerings#healthcare-life-sciences" },
      { label: "Biotechnology", icon: Dna, href: "/offerings#healthcare-life-sciences" },
      { label: "Ayush", icon: Leaf, href: "/offerings#healthcare-life-sciences" },
    ]
  },
  {
    title: "Consumer & Retail",
    items: [
      { label: "FMCG", icon: Package, href: "/offerings#retail-e-commerce" },
      { label: "Retail", icon: Store, href: "/offerings#retail-e-commerce" },
      { label: "Consumer Durables", icon: Tv, href: "/offerings#retail-e-commerce" },
      { label: "Textiles", icon: Scissors, href: "/offerings#retail-e-commerce" },
      { label: "Food Processing", icon: Utensils, href: "/offerings#retail-e-commerce" },
    ]
  },
  {
    title: "Media & Services",
    items: [
      { label: "Media & Entertainment", icon: Film, href: "/offerings#education-learning-platforms" },
      { label: "Tourism & Hospitality", icon: Compass, href: "/offerings#education-learning-platforms" },
      { label: "Aviation", icon: Plane, href: "/offerings#education-learning-platforms" },
      { label: "Education & Training", icon: GraduationCap, href: "/offerings#education-learning-platforms" },
      { label: "Agriculture & Allied", icon: Sprout, href: "/offerings#education-learning-platforms" },
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
      <div className="flex items-center gap-2 border-l-2 border-primary pl-2 mb-4">
        <h4 className="text-xs font-bold text-foreground tracking-wide uppercase">
          Core Navigation
        </h4>
      </div>
      <hr className="border-border/30 mb-5" />
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
            <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans">
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
      <div className="border-b border-border/40 pb-5 mb-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
        {coreOfferingsItems.map((item) => (
          <SectionLink
            key={item.href}
            href={item.href}
            className="flex items-center gap-1.5 text-xs font-bold text-accent hover:text-primary transition-colors duration-200 group/pill"
          >
            <span className="text-primary group-hover/pill:translate-x-0.5 transition-transform">→</span>
            <span>{item.label}</span>
          </SectionLink>
        ))}
      </div>
      
      <div className="grid grid-cols-4 gap-x-8 gap-y-10">
        {industrySegments.map((segment) => (
          <div key={segment.title}>
            <div className="flex items-center gap-2 border-l-2 border-primary pl-2 mb-4">
              <h4 className="text-xs font-bold text-foreground tracking-wide uppercase">
                {segment.title}
              </h4>
            </div>
            <hr className="border-border/30 mb-4" />
            
            <div className="space-y-3">
              {segment.items.map((item) => (
                <SectionLink
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <item.icon className="h-4 w-4 text-muted-foreground/60 group-hover/item:text-primary transition-colors shrink-0" />
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans">
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
    <div className="nav-dropdown w-[640px]">
      <div className="flex items-center gap-2 border-l-2 border-primary pl-2 mb-4">
        <h4 className="text-xs font-bold text-foreground tracking-wide uppercase">
          Enterprise Solutions
        </h4>
      </div>
      <hr className="border-border/30 mb-5" />
      <div className="grid grid-cols-2 gap-x-10 gap-y-4.5">
        {solutionsItems.map((item) => (
          <SectionLink
            key={item.href + item.label}
            href={item.href}
            className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
          >
            <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">
              →
            </span>
            <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans">
              {item.label}
            </span>
          </SectionLink>
        ))}
      </div>
    </div>
  );
}

function CapabilitiesDropdown() {
  return (
    <div className="nav-dropdown w-[640px]">
      <div className="flex items-center gap-2 border-l-2 border-primary pl-2 mb-4">
        <h4 className="text-xs font-bold text-foreground tracking-wide uppercase">
          Engineering Capabilities
        </h4>
      </div>
      <hr className="border-border/30 mb-5" />
      <div className="grid grid-cols-2 gap-x-10 gap-y-4.5">
        {capabilitiesItems.map((item) => (
          <SectionLink
            key={item.label}
            href={item.href}
            className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
          >
            <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">
              →
            </span>
            <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans">
              {item.label}
            </span>
          </SectionLink>
        ))}
      </div>
    </div>
  );
}

function UseCasesDropdown() {
  return (
    <div className="nav-dropdown w-[1120px] max-w-[95vw]">
      <div className="grid grid-cols-4 gap-x-8 gap-y-10">
        
        {/* Column 1: Core Engineering Architectures */}
        <div>
          <div className="flex items-center gap-2 border-l-2 border-primary pl-2 mb-4">
            <h4 className="text-xs font-bold text-foreground tracking-wide uppercase">
              Core Engineering Architectures
            </h4>
          </div>
          <hr className="border-border/30 mb-4" />
          
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2 pl-1">
                Infrastructure & Scaling
              </p>
              <div className="space-y-2">
                <SectionLink
                  href="/use-cases#sovereign-ai"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans">
                    Sovereign AI Initiatives
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#global-saas"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans">
                    Global SaaS Platforms
                  </span>
                </SectionLink>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2 pl-1">
                Low-Latency Compute
              </p>
              <div className="space-y-2">
                <SectionLink
                  href="/use-cases#high-frequency-trading"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans">
                    High-Frequency Trading
                  </span>
                </SectionLink>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2 pl-1">
                Enterprise Automation
              </p>
              <div className="space-y-2">
                <SectionLink
                  href="/use-cases#autonomous-operations"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans">
                    Autonomous Operations
                  </span>
                </SectionLink>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2 pl-1">
                Security & HIPAA Compliance
              </p>
              <div className="space-y-2">
                <SectionLink
                  href="/use-cases#regulated-ai-security"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans">
                    Regulated AI Security
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#secure-medical-llmops"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans">
                    Secure Medical LLMOps
                  </span>
                </SectionLink>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2 pl-1">
                Trusted AI & Compliance (AIRE)
              </p>
              <div className="space-y-2">
                <SectionLink
                  href="/use-cases#high-risk-genai-rag"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans">
                    High-Risk GenAI & RAG
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#credit-scoring-lending"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans font-sans">
                    Credit Scoring & Lending
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#healthcare-clinical-ai"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans font-sans">
                    Healthcare Clinical AI
                  </span>
                </SectionLink>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Cybersecurity & Threat Defense Matrix - Pen Testing & BAS */}
        <div>
          <div className="flex items-center gap-2 border-l-2 border-primary pl-2 mb-4">
            <h4 className="text-xs font-bold text-foreground tracking-wide uppercase font-display">
              Cybersecurity & Threat Defense Matrix
            </h4>
          </div>
          <hr className="border-border/30 mb-4" />
          
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2 pl-1">
                AI-Driven Penetration Testing
              </p>
              <div className="space-y-2">
                <SectionLink
                  href="/use-cases#uc-61"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans">
                    Automated Attack Surface Mapping
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-62"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans">
                    Intelligent Exploit Generation
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-63"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans">
                    Dynamic Payload Obfuscation
                  </span>
                </SectionLink>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2 pl-1">
                AI Breach & Attack Simulation (BAS)
              </p>
              <div className="space-y-2">
                <SectionLink
                  href="/use-cases#uc-68"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans">
                    Continuous Purple Teaming
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-69"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans">
                    LLM-Specific Attack Simulation
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-70"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans font-sans font-sans">
                    Lateral Movement Emulation
                  </span>
                </SectionLink>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Cybersecurity & Threat Defense Matrix - Managed Threat Defense */}
        <div>
          <div className="flex items-center gap-2 border-l-2 border-primary pl-2 mb-4">
            <h4 className="text-xs font-bold text-foreground tracking-wide uppercase font-display">
              Cybersecurity & Threat Defense Matrix
            </h4>
          </div>
          <hr className="border-border/30 mb-4" />
          
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2 pl-1">
                AI-Driven Managed Threat Defense (MDR)
              </p>
              <div className="space-y-2">
                <SectionLink
                  href="/use-cases#uc-64"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans font-sans font-sans">
                    Line-Rate Network Anomaly Detection
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-65"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans font-sans font-sans">
                    Zero-Day Threat Intel Extraction
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-66"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans font-sans font-sans">
                    Automated SOAR Playbook Execution
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-67"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans font-sans font-sans">
                    Multi-Modal Phishing Defense
                  </span>
                </SectionLink>
              </div>
            </div>
          </div>
        </div>

        {/* Column 4: Cybersecurity & Threat Defense Matrix - Industry Focus */}
        <div>
          <div className="flex items-center gap-2 border-l-2 border-primary pl-2 mb-4">
            <h4 className="text-xs font-bold text-foreground tracking-wide uppercase font-display">
              Cybersecurity & Threat Defense Matrix
            </h4>
          </div>
          <hr className="border-border/30 mb-4" />
          
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2 pl-1">
                AI Cybersecurity for Various Industries
              </p>
              <div className="space-y-2">
                <SectionLink
                  href="/use-cases#uc-71"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans font-sans">
                    Finance: Voice Deepfake Detection
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-72"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans font-sans">
                    Healthcare: PHI Leak Prevention
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-73"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans font-sans">
                    Manufacturing: ICS Ransomware Defense
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-74"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans font-sans">
                    Government: Air-Gapped Threat Hunt
                  </span>
                </SectionLink>
                <SectionLink
                  href="/use-cases#uc-75"
                  className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
                >
                  <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">→</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans font-sans">
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
    <div className="nav-dropdown w-[640px]">
      <div className="flex items-center gap-2 border-l-2 border-primary pl-2 mb-4">
        <h4 className="text-xs font-bold text-foreground tracking-wide uppercase">
          TRUSTGRID Platform
        </h4>
      </div>
      <hr className="border-border/30 mb-5" />
      <div className="grid grid-cols-2 gap-x-10 gap-y-4.5">
        {platformItems.map((item) => (
          <SectionLink
            key={item.label}
            href={item.href}
            className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-primary/[0.03] group/item transition-all"
          >
            <span className="text-accent font-semibold transition-transform duration-200 group-hover/item:translate-x-0.5 shrink-0">
              →
            </span>
            <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans">
              {item.label}
            </span>
          </SectionLink>
        ))}
      </div>
    </div>
  );
}

function AboutDropdown() {
  return (
    <div className="nav-dropdown w-[640px]">
      <div className="flex items-center gap-2 border-l-2 border-primary pl-2 mb-4">
        <h4 className="text-xs font-bold text-foreground tracking-wide uppercase">
          Company Information
        </h4>
      </div>
      <hr className="border-border/30 mb-5" />
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
            <span className="text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors leading-tight font-sans">
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
        className="text-sm font-bold text-foreground transition-colors hover:text-primary px-3 py-1.5 rounded-md whitespace-nowrap"
        activeProps={{ className: "text-foreground bg-surface/50 px-3 py-1.5 rounded-md font-bold" }}
      >
        {label}
      </Link>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={to}
        className="flex items-center gap-1 text-sm font-bold text-foreground transition-colors hover:text-primary px-3 py-1.5 rounded-md whitespace-nowrap"
        activeProps={{ className: "text-foreground bg-surface/50 px-3 py-1.5 rounded-md flex items-center gap-1 font-bold" }}
      >
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180 text-accent" : ""}`}
        />
      </Link>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 z-[200]">
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
          background: oklch(1.0 0 0 / 0.98);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid var(--color-border);
          border-radius: 0.75rem;
          box-shadow: 0 16px 36px -12px oklch(0.12 0.015 250 / 0.08), 0 0 0 1px oklch(0.45 0.18 260 / 0.05);
          padding: 2rem;
        }
        @keyframes dropdown-in {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-dropdown {
          animation: dropdown-in 0.18s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/75 backdrop-blur-xl">
        <div className="w-full flex h-16 items-center justify-between px-6 md:px-8">

          {/* Brand */}
          <Link to="/" className="flex items-center group mr-6 shrink-0">
            <span className="font-display text-xl font-semibold tracking-tight">
              TRUSTGRID<span className="text-accent">.AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            <NavItem label="Home" to="/">
              <HomeDropdown />
            </NavItem>
            <NavItem label="Offerings" to="/offerings">
              <OfferingsDropdown />
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
            <Link to="/contact" className="hidden lg:block">
              <Button size="default" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm">
                Book Strategy Session
              </Button>
            </Link>

            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border/40 bg-background max-h-[88vh] overflow-y-auto">
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
                      className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </SectionLink>
                  ))}
                </div>
              </MobileAccordion>

              <MobileAccordion title="Offerings" to="/offerings" onClose={() => setMobileOpen(false)}>
                <div className="space-y-3 py-1">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 pl-1">Engineering Pillars</p>
                    {coreOfferingsItems.map((item) => (
                      <SectionLink
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-1.5 pl-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                      >
                        {item.label}
                      </SectionLink>
                    ))}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 pl-1">Industry Solutions</p>
                    {industryOfferingsItems.map((item) => (
                      <SectionLink
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-1.5 pl-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </SectionLink>
                    ))}
                  </div>
                </div>
              </MobileAccordion>

              <MobileAccordion title="Solutions" to="/solutions" onClose={() => setMobileOpen(false)}>
                <div className="space-y-1 py-1">
                  {solutionsItems.map((item) => (
                    <SectionLink
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </SectionLink>
                  ))}
                </div>
              </MobileAccordion>

              <MobileAccordion title="Capabilities" to="/capabilities" onClose={() => setMobileOpen(false)}>
                <div className="space-y-1 py-1">
                  {capabilitiesItems.map((item) => (
                    <SectionLink
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </SectionLink>
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
                      className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </SectionLink>
                  ))}
                </div>
              </MobileAccordion>

              <MobileAccordion title="Platform" to="/platform" onClose={() => setMobileOpen(false)}>
                <div className="space-y-1 py-1">
                  {platformItems.map((item) => (
                    <SectionLink
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </SectionLink>
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
                      className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
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
