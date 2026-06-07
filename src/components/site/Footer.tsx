import { Link } from "@tanstack/react-router";
import { Cpu, Bot, Brain, Shield, Mail, MapPin, ExternalLink } from "lucide-react";

/* ─── Featured Offerings (highlight row) ───────────────────── */
const featuredOfferings = [
  {
    icon: Cpu,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    label: "GPU Performance Engineering",
    to: "/gpu-performance-engineering",
  },
  {
    icon: Bot,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    label: "AI Agents & Multi-Agent Systems",
    to: "/agentic-ai-development",
  },
  {
    icon: Brain,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    label: "LLM / RAG Optimization",
    to: "/llmops-services",
  },
  {
    icon: Shield,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    label: "NextGen AI Cybersecurity",
    to: "/ai-security",
  },
];

/* ─── Footer Link Columns ───────────────────────────────────── */
const footerCols = [
  {
    title: "GPU & Infrastructure",
    links: [
      { to: "/gpu-performance-engineering", label: "GPU Performance Engineering" },
      { to: "/ai-infrastructure-engineering", label: "AI Infrastructure Engineering" },
      { to: "/platform", label: "GPU-phi Cloud Platform" },
      { to: "/capabilities", label: "GPU Optimization" },
      { to: "/capabilities", label: "Cloud GPU Orchestration" },
      { to: "/capabilities", label: "Data Center Networking" },
      { to: "/capabilities", label: "Energy Optimization & ESG" },
    ],
  },
  {
    title: "AI Agents",
    links: [
      { to: "/agentic-ai-development", label: "Agentic AI Development" },
      { to: "/multi-agent-systems", label: "Multi-Agent Systems" },
      { to: "/long-memory-ai-systems", label: "Long-Memory AI Systems" },
      { to: "/agentops-services", label: "AgentOps Services" },
      { to: "/capabilities", label: "Agent Fleet Orchestration" },
      { to: "/solutions", label: "Autonomous Workflows" },
    ],
  },
  {
    title: "LLM / RAG & Security",
    links: [
      { to: "/llmops-services", label: "LLMOps & LLM Engineering" },
      { to: "/llmops-services", label: "Fine-Tuning & Quantization" },
      { to: "/llmops-services", label: "Guardrails Gateway" },
      { to: "/ai-security", label: "AI Security & Cyber Dom" },
      { to: "/ai-security", label: "Zero-Trust AI Governance" },
      { to: "/ai-security", label: "Secure Sandbox Execution" },
    ],
  },
  {
    title: "Solutions & Use Cases",
    links: [
      { to: "/solutions", label: "GPU Data Center Architecture" },
      { to: "/solutions", label: "Enterprise LLM Systems" },
      { to: "/solutions", label: "Cyber Dom Security Mesh" },
      { to: "/use-cases", label: "Sovereign AI Initiatives" },
      { to: "/use-cases", label: "High-Frequency Trading" },
      { to: "/use-cases", label: "Regulated AI Security" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About TrustGrid.AI" },
      { to: "/case-studies", label: "Case Studies" },
      { to: "/blog", label: "Insights & Blog" },
      { to: "/contact", label: "Contact Us" },
      { to: "/offerings", label: "All Offerings" },
      { to: "/capabilities", label: "All Capabilities" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-surface/20">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10">

        {/* Featured Offerings Strip */}
        <div className="mb-14 pb-10 border-b border-border/30">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-5">
            Core Offerings
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {featuredOfferings.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-border/40 hover:border-primary/40 bg-surface/20 hover:bg-surface/50 transition-all group"
              >
                <div className={`p-2 rounded-lg ${item.bg} shrink-0`}>
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
                  {item.label}
                </span>
                <ExternalLink className="h-3 w-3 text-muted-foreground/40 group-hover:text-accent ml-auto shrink-0 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Main link grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 mb-14">
          {/* Brand column */}
          <div className="lg:col-span-1 sm:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <span className="font-display text-base font-semibold">
                TRUSTGRID<span className="text-accent">.AI</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Full-Spectrum AI Engineering. From GPU kernels to autonomous enterprises — engineered for extreme efficiency, reliability, and Zero-Trust safety.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-accent/60" />
                5 Global Delivery Centers
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="h-3.5 w-3.5 shrink-0 text-accent/60" />
                24/7 Enterprise Support
              </div>
            </div>
          </div>

          {/* Hidden spacer on lg */}
          <div className="hidden lg:block" />

          {/* Link columns — span 3 on lg */}
          <div className="sm:col-span-2 lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerCols.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-3.5">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors leading-snug"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} TrustGrid.AI — Engineering AI systems that scale.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-xs text-muted-foreground">
              GPU · AI Agents · LLM/RAG · Cybersecurity
            </p>
            <Link to="/contact" className="text-xs text-accent hover:text-foreground transition-colors font-medium">
              Book a Session →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
