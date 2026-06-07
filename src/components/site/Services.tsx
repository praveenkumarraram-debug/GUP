import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Cpu, Zap, Bot, Network, Brain, Sparkles, Shield, ArrowUpRight,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const services = [
  {
    icon: Cpu,
    title: "AI Infrastructure Engineering",
    to: "/ai-infrastructure-engineering",
    desc: "Design and optimize AI-native infrastructure across cloud, hybrid and on-prem environments.",
    tags: ["Kubernetes", "MLOps", "LLMOps", "AgentOps", "FinOps"],
  },
  {
    icon: Zap,
    title: "GPU Data Center & Performance",
    to: "/gpu-performance-engineering",
    desc: "Maximize AI infrastructure performance through advanced GPU fabric and kernel optimization.",
    tags: ["CUDA", "Blackwell", "InfiniBand", "RoCEv2", "TensorRT"],
    accent: true,
  },
  {
    icon: Bot,
    title: "Agentic AI & Autonomous Systems",
    to: "/agentic-ai-development",
    desc: "Build autonomous AI agents capable of planning, reasoning, tool use, and gating.",
    tags: ["LangGraph", "Multi-Agent", "MCP", "Action Gating"],
  },
  {
    icon: Network,
    title: "Multi-Agent Orchestration",
    to: "/multi-agent-systems",
    desc: "Coordinate fleets of specialized agents to deliver complex business outcomes.",
    tags: ["LangGraph", "CrewAI", "AutoGen", "Routing"],
  },
  {
    icon: Brain,
    title: "Long-Memory AI Systems",
    to: "/long-memory-ai-systems",
    desc: "Enable AI systems to retain knowledge across years instead of conversations.",
    tags: ["Vector DB", "Knowledge Graphs", "RAG", "Semantic Search"],
  },
  {
    icon: Sparkles,
    title: "Generative AI Platforms",
    to: "/services",
    desc: "Enterprise-grade GenAI for text, code, image, video and business automation.",
    tags: ["GPT", "Claude", "Llama", "Mistral", "Gemini"],
  },
  {
    icon: Shield,
    title: "AI Security & Cyber Dom",
    to: "/ai-security",
    desc: "Secure AI deployment through Cyber Dom guardrails and dynamic script sandboxing.",
    tags: ["Cyber Dom", "Bash Sandbox", "Zero Trust", "FedRAMP"],
  },
  {
    icon: Cpu,
    title: "LLMOps & LLM Engineering",
    to: "/llmops-services",
    desc: "Operate the full LLM lifecycle — from custom fine-tuning and evaluation to serving.",
    tags: ["Fine-Tuning", "vLLM", "Evaluation", "Guardrails"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative border-b border-border/40 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="Capabilities"
          title="Full-Spectrum AI Engineering"
          description="From GPU kernels to autonomous enterprise operations — one engineering partner for every layer of your AI stack."
        />

        <div className="mt-14 grid gap-px bg-border/30 border border-border/40 rounded-xl overflow-hidden md:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              className={`group relative bg-background p-6 hover:bg-surface/60 transition-all ${s.accent ? "bg-surface/40" : ""}`}
            >
              <Link to={s.to} className="block">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 grid place-items-center text-accent">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground leading-snug">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.tags.slice(0, 4).map((t) => (
                    <span key={t} className="rounded-md bg-surface/80 border border-border/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
