import { Link } from "@tanstack/react-router";
import { Cpu, Bot, Brain, Shield, Mail, MapPin, ExternalLink, Globe, Phone } from "lucide-react";
import { SectionLink } from "./Header";

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
    title: "GPU Optimization",
    links: [
      { href: "/gpu-performance-engineering", label: "GPU Performance Engineering" },
      { href: "/capabilities#gpu-optimization", label: "GPU Optimization" },
      { href: "/solutions#gpu-optimization", label: "GPU Performance Solutions" },
      { href: "/offerings", label: "All Offerings" },
    ],
  },
  {
    title: "LLM Optimization",
    links: [
      { href: "/llmops-services", label: "LLMOps & LLM Engineering" },
      { href: "/capabilities#llm-optimization", label: "LLM Optimization" },
      { href: "/agentic-ai-development", label: "Agentic AI Development" },
      { href: "/multi-agent-systems", label: "Multi-Agent Systems" },
      { href: "/long-memory-ai-systems", label: "Long-Memory AI Systems" },
      { href: "/agentops-services", label: "AgentOps Services" },
    ],
  },
  {
    title: "AI Trust & Reliability",
    links: [
      { href: "/capabilities#ai-trust-reliability", label: "Trust & Reliability" },
      { href: "/solutions#ai-trust-reliability", label: "Model Drift Detection" },
      { href: "/solutions#ai-trust-reliability", label: "LLM Observability Stack" },
      { href: "/solutions#ai-trust-reliability", label: "Automated Retraining" },
    ],
  },
  {
    title: "AI Cybersecurity",
    links: [
      { href: "/ai-security", label: "AI Security & Cyber Dom" },
      { href: "/capabilities#ai-cybersecurity", label: "Zero-Trust AI Governance" },
      { href: "/solutions#ai-cybersecurity", label: "Prompt Injection Defenses" },
      { href: "/solutions#ai-cybersecurity", label: "Confidential Computing" },
    ],
  },
  {
    title: "AI Infrastructure",
    links: [
      { href: "/ai-infrastructure-engineering", label: "AI Infrastructure Engineering" },
      { href: "/capabilities#ai-infrastructure", label: "Cloud GPU Orchestration" },
      { href: "/platform", label: "GPU-phi Cloud Platform" },
      { href: "/offerings#energy-optimization-hyperscale", label: "Energy Optimization & ESG" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About TrustGrid.AI" },
      { href: "/about#teams", label: "Leadership & Teams" },
      { href: "/about#presence", label: "Global Presence" },
      { href: "/about#case-studies", label: "Case Studies" },
      { href: "/about#insights", label: "Insights & Blog" },
      { href: "/contact", label: "Contact Us" },
      { href: "/consulting", label: "Consulting Session" },
      { href: "/partnership", label: "Partner Program" },
      { href: "/sales-enquiry", label: "Sales Enquiry" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="site-footer" className="border-t border-border/40 bg-surface/20">
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
        <div className="grid gap-10 lg:grid-cols-12 mb-14">
          {/* Brand column */}
          <div className="lg:col-span-3 sm:col-span-4 flex flex-col justify-between">
            <div>
              <Link to="/" className="flex items-center mb-4 group">
                <img
                  src="/logo.png"
                  alt="TrustGrid.AI Logo"
                  className="h-16 w-auto object-contain brightness-[2.8] contrast-[1.15] saturate-[1.3] transition-all duration-300 group-hover:brightness-[3.2]"
                />
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Full-Spectrum AI Engineering — GPU kernels to autonomous enterprises, built for
                reliability and Zero-Trust safety.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-accent/60" />5 Global Operations
                Offices
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="h-3.5 w-3.5 shrink-0 text-accent/60" />
                connect@trustgrid.ai
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="sm:col-span-8 lg:col-span-9 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerCols.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-3.5">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <SectionLink
                        href={l.href}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors leading-snug"
                      >
                        {l.label}
                      </SectionLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          id="site-footer-bottom"
          className="pt-8 border-t border-border/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} TrustGrid.AI. All rights reserved.</span>
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/security" className="hover:text-foreground transition-colors">
              Security
            </Link>
            <Link to="/copyright" className="hover:text-foreground transition-colors">
              Copyright & Trademarks
            </Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors">
              Cookies
            </Link>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-0.5"
            >
              Sitemap <ExternalLink className="h-3 w-3 shrink-0 opacity-60" />
            </a>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-xs text-muted-foreground hidden sm:block">
              GPU · AI Agents · LLM/RAG · Cybersecurity
            </p>
            <Link
              to="/contact"
              className="text-xs text-accent hover:text-foreground transition-colors font-medium"
            >
              Book a Session →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
