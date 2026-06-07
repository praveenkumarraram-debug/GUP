import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Cpu, Bot, Brain, Shield, LayoutGrid, Layers, Zap, Globe, BarChart3, Server, FileText, Users, Phone, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Mega-Menu Data ─────────────────────────────────────────── */

const offeringsMenu = {
  featured: [
    {
      icon: Cpu,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      label: "GPU Performance Engineering",
      desc: "3–15x speedups on H100 & Blackwell clusters",
      to: "/gpu-performance-engineering",
    },
    {
      icon: Bot,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      label: "AI Agents & Multi-Agent Systems",
      desc: "Autonomous agent fleets with 92-96% task success",
      to: "/agentic-ai-development",
    },
    {
      icon: Brain,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      label: "LLM / RAG Optimization",
      desc: "50-80% token cost savings, 4-8x throughput gains",
      to: "/llmops-services",
    },
    {
      icon: Shield,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      label: "NextGen AI Cybersecurity",
      desc: "Cyber Dom mesh — 99.9% jailbreak block rate",
      to: "/ai-security",
      href: "/ai-security",
    },
  ],
  sections: [
    {
      title: "GPU & Infrastructure",
      items: [
        { label: "GPU Performance Engineering", href: "/gpu-performance-engineering#capabilities" },
        { label: "GPU Data Center Design", href: "/gpu-performance-engineering#offerings" },
        { label: "AI Infrastructure Engineering", href: "/ai-infrastructure-engineering" },
        { label: "GPU-phi Cloud Platform", href: "/platform#gpu-phi-cloud-neutral-orchestration" },
      ],
    },
    {
      title: "AI Agents",
      items: [
        { label: "Agentic AI Development", href: "/agentic-ai-development#capabilities" },
        { label: "Multi-Agent Orchestration", href: "/agentic-ai-development#offerings" },
        { label: "Multi-Agent Systems", href: "/multi-agent-systems" },
        { label: "Long-Memory AI Systems", href: "/long-memory-ai-systems" },
        { label: "AgentOps Services", href: "/agentops-services" },
      ],
    },
    {
      title: "LLM / RAG Optimization",
      items: [
        { label: "LLMOps & LLM Engineering", href: "/llmops-services#capabilities" },
        { label: "Fine-Tuning & Quantization", href: "/llmops-services#offerings" },
        { label: "RAG Pipeline Acceleration", href: "/capabilities#llm-optimization" },
        { label: "Guardrails Gateway", href: "/llmops-services#offerings" },
      ],
    },
    {
      title: "Cybersecurity",
      items: [
        { label: "AI Security & Cyber Dom", href: "/ai-security#capabilities" },
        { label: "Cyber Dom Guardrails Mesh", href: "/ai-security#offerings" },
        { label: "Bash Sandbox Execution", href: "/ai-security#offerings" },
        { label: "Zero-Trust AI Governance", href: "/ai-security#tech-stack" },
      ],
    },
  ],
};

const solutionsMenu = {
  items: [
    { icon: Server, label: "GPU Data Center Architecture", desc: "Mega-scale fabric & cluster design", href: "/solutions#mega-scale-gpu-data-center-private-gpu-cloud-architecture" },
    { icon: Brain, label: "LLM Engineering & Finetuning", desc: "Production LLM systems at enterprise scale", href: "/solutions#production-grade-llm-engineering-finetuning-systems" },
    { icon: Shield, label: "Cyber Dom AI Security Mesh", desc: "Zero-Trust protection for AI workloads", href: "/solutions#cyber-dom-ai-security-mesh-sandbox-execution" },
    { icon: Bot, label: "Autonomous Agentic Workflows", desc: "Multi-agent business orchestration", href: "/solutions#autonomous-agentic-workflows-multi-agent-orchestration" },
  ],
};

const capabilitiesMenu = {
  items: [
    { icon: Cpu, label: "GPU Optimization", desc: "3-15x performance, 40-75% cost reduction", href: "/capabilities#gpu-optimization" },
    { icon: Globe, label: "Cloud GPU Orchestration", desc: "Cloud-neutral multi-cluster management", href: "/capabilities#cloud-gpu-optimization" },
    { icon: Brain, label: "LLM Optimization", desc: "70% faster inference, -80% cost per token", href: "/capabilities#llm-optimization" },
    { icon: Zap, label: "AI Infrastructure Automation", desc: "Heterogeneous cluster orchestration", href: "/capabilities#ai-optimization" },
    { icon: BarChart3, label: "Data Center Network Automation", desc: "<1μs latency, 99.9% uptime", href: "/capabilities#data-center-network-automation" },
    { icon: Layers, label: "Energy Optimization & ESG", desc: "-30% power, 100% ESG compliance", href: "/capabilities#energy-optimization" },
    { icon: Shield, label: "AI Security & Cyber Dom", desc: "99.9% jailbreak block, 0% sandbox escape", href: "/capabilities#ai-security-cyber-dom-protection-mesh" },
    { icon: Bot, label: "Multi-Agent Fleet Orchestration", desc: "92-96% task success rate", href: "/capabilities#multi-agent-fleet-orchestration" },
  ],
};

const useCasesMenu = {
  items: [
    { label: "Sovereign AI Initiatives", desc: "National-scale AI supercomputing projects", href: "/use-cases" },
    { label: "High-Frequency Trading", desc: "Sub-microsecond latency HFT infrastructure", href: "/use-cases" },
    { label: "Global SaaS Platforms", desc: "Real-time LLM with FinOps cost control", href: "/use-cases" },
    { label: "Autonomous Operations", desc: "Enterprise procurement & workflow agents", href: "/use-cases" },
    { label: "Regulated AI Security", desc: "Zero-Trust for defense & government AI", href: "/use-cases" },
    { label: "Secure Medical LLMOps", desc: "Private hospital H100 model deployment", href: "/use-cases" },
  ],
};

const platformMenu = {
  items: [
    { icon: LayoutGrid, label: "GPU-phi Orchestration", desc: "Cloud-neutral autonomous AI infrastructure", href: "/platform#gpu-phi-cloud-neutral-orchestration" },
    { icon: BarChart3, label: "GPU FinOps Dashboard", desc: "Unit economics, cost visibility & savings", href: "/platform#gpu-phi-cloud-neutral-orchestration" },
    { icon: Zap, label: "Self-Healing Clusters", desc: "DCGM telemetry, automated failovers", href: "/platform#gpu-phi-cloud-neutral-orchestration" },
  ],
};

const aboutMenu = {
  items: [
    { icon: Users, label: "About TrustGrid.AI", desc: "Full-Spectrum AI Engineering Company", href: "/about" },
    { icon: FileText, label: "Case Studies", desc: "Proven enterprise outcomes at scale", href: "/case-studies" },
    { icon: BookOpen, label: "Insights & Blog", desc: "AI engineering research & perspectives", href: "/blog" },
    { icon: Phone, label: "Contact Us", desc: "Book a strategy session", href: "/contact" },
  ],
};

/* ─── Hash-aware navigation helper ──────────────────────────── */

/**
 * SectionLink navigates to an href that may contain a #hash anchor.
 * On same-page clicks it smooth-scrolls; on cross-page it navigates
 * then retries scrolling until the element appears in the DOM.
 */
function SectionLink({
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
      if (hash) window.history.replaceState(null, "", `#${hash}`);
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

function OfferingsDropdown() {
  return (
    <div className="nav-dropdown w-[860px]">
      {/* Featured Cards */}
      <div className="p-5 border-b border-border/40">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-1">
          Core Offerings
        </p>
        <div className="grid grid-cols-2 gap-2">
          {offeringsMenu.featured.map((item) => (
            <Link
              key={item.to + item.label}
              to={item.to}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface/60 transition-all group border border-transparent hover:border-border/40"
            >
              <div className={`p-2 rounded-lg ${item.bg} shrink-0 mt-0.5`}>
                <item.icon className={`h-4 w-4 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors leading-tight">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Section columns */}
      <div className="grid grid-cols-4 gap-0 p-5">
        {offeringsMenu.sections.map((section) => (
          <div key={section.title}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2.5 px-1">
              {section.title}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.to + item.label}>
                  <Link
                    to={item.to}
                    className="block px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-surface/50 rounded-lg transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* CTA strip */}
      <div className="px-5 py-3.5 border-t border-border/40 bg-surface/20 rounded-b-2xl flex items-center justify-between">
        <p className="text-xs text-muted-foreground">12 specialised service offerings</p>
        <Link to="/offerings" className="text-xs text-accent hover:text-foreground font-medium transition-colors">
          View all offerings →
        </Link>
      </div>
    </div>
  );
}

function SolutionsDropdown() {
  return (
    <div className="nav-dropdown w-[520px]">
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-1">
          Engineered Solutions
        </p>
        <div className="grid grid-cols-1 gap-2">
          {solutionsMenu.items.map((item) => (
            <Link
              key={item.to + item.label}
              to={item.to}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface/60 transition-all group border border-transparent hover:border-border/40"
            >
              <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-5 py-3.5 border-t border-border/40 bg-surface/20 rounded-b-2xl flex justify-end">
        <Link to="/solutions" className="text-xs text-accent hover:text-foreground font-medium transition-colors">
          Explore all solutions →
        </Link>
      </div>
    </div>
  );
}

function CapabilitiesDropdown() {
  return (
    <div className="nav-dropdown w-[640px]">
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-1">
          Core Competencies
        </p>
        <div className="grid grid-cols-2 gap-2">
          {capabilitiesMenu.items.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface/60 transition-all group border border-transparent hover:border-border/40"
            >
              <div className="p-2 rounded-lg bg-accent/10 shrink-0">
                <item.icon className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground group-hover:text-accent transition-colors leading-tight">
                  {item.label}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-5 py-3.5 border-t border-border/40 bg-surface/20 rounded-b-2xl flex justify-end">
        <Link to="/capabilities" className="text-xs text-accent hover:text-foreground font-medium transition-colors">
          View all capabilities →
        </Link>
      </div>
    </div>
  );
}

function UseCasesDropdown() {
  return (
    <div className="nav-dropdown w-[520px]">
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-1">
          Enterprise Use Cases
        </p>
        <div className="grid grid-cols-2 gap-2">
          {useCasesMenu.items.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="block p-3 rounded-xl hover:bg-surface/60 transition-all group border border-transparent hover:border-border/40"
            >
              <p className="text-xs font-semibold text-foreground group-hover:text-accent transition-colors leading-tight">
                {item.label}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-5 py-3.5 border-t border-border/40 bg-surface/20 rounded-b-2xl flex justify-end">
        <Link to="/use-cases" className="text-xs text-accent hover:text-foreground font-medium transition-colors">
          See all use cases →
        </Link>
      </div>
    </div>
  );
}

function PlatformDropdown() {
  return (
    <div className="nav-dropdown w-[420px]">
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-1">
          GPU-phi Platform
        </p>
        <div className="space-y-2">
          {platformMenu.items.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface/60 transition-all group border border-transparent hover:border-border/40"
            >
              <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-5 py-3.5 border-t border-border/40 bg-surface/20 rounded-b-2xl flex justify-end">
        <Link to="/platform" className="text-xs text-accent hover:text-foreground font-medium transition-colors">
          Explore platform →
        </Link>
      </div>
    </div>
  );
}

function AboutDropdown() {
  return (
    <div className="nav-dropdown w-[400px]">
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-1">
          Company
        </p>
        <div className="space-y-2">
          {aboutMenu.items.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface/60 transition-all group border border-transparent hover:border-border/40"
            >
              <div className="p-2 rounded-lg bg-surface-elevated/60 shrink-0">
                <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
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
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground px-2 py-1 rounded-md whitespace-nowrap"
        activeProps={{ className: "text-foreground bg-surface/40 px-2 py-1 rounded-md" }}
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
        className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground px-2 py-1 rounded-md whitespace-nowrap"
        activeProps={{ className: "text-foreground bg-surface/40 px-2 py-1 rounded-md flex items-center gap-1" }}
      >
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180 text-accent" : ""}`}
        />
      </Link>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[200]">
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
          background: oklch(0.16 0.02 255 / 0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid oklch(0.3 0.03 255 / 0.4);
          border-radius: 1rem;
          box-shadow: 0 24px 60px -12px oklch(0 0 0 / 0.7), 0 0 0 1px oklch(0.58 0.22 264 / 0.08);
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
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          {/* Brand */}
          <Link to="/" className="flex items-center group mr-6 shrink-0">
            <span className="font-display text-xl font-semibold tracking-tight">
              TRUSTGRID<span className="text-accent">.AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavItem label="Home" to="/" />
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
                  {offeringsMenu.featured.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-surface/60 transition-colors"
                    >
                      <div className={`p-1.5 rounded-md ${item.bg}`}>
                        <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
                      </div>
                      <span className="text-xs font-medium text-foreground leading-tight">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <MobileAccordion title="Offerings" to="/offerings" onClose={() => setMobileOpen(false)}>
                {offeringsMenu.sections.map((section) => (
                  <div key={section.title} className="mb-3">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 mt-2">{section.title}</p>
                    {section.items.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </MobileAccordion>

              <MobileAccordion title="Solutions" to="/solutions" onClose={() => setMobileOpen(false)}>
                {solutionsMenu.items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </MobileAccordion>

              <MobileAccordion title="Capabilities" to="/capabilities" onClose={() => setMobileOpen(false)}>
                {capabilitiesMenu.items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </MobileAccordion>

              <MobileAccordion title="Use Cases" to="/use-cases" onClose={() => setMobileOpen(false)}>
                {useCasesMenu.items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </MobileAccordion>

              <MobileAccordion title="Platform" to="/platform" onClose={() => setMobileOpen(false)}>
                {platformMenu.items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </MobileAccordion>

              <MobileAccordion title="About Us" to="/about" onClose={() => setMobileOpen(false)}>
                {aboutMenu.items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
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
