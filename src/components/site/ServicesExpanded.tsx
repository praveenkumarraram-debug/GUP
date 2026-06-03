import { motion } from "framer-motion";
import {
  Cpu, Zap, Bot, Brain, Sparkles, Shield,
  ArrowRight,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";

interface ServiceDetail {
  icon: typeof Cpu;
  title: string;
  subtitle: string;
  intro: string;
  capabilities: string[];
  outcome: string;
  image: string;
  impact?: { value: string; label: string }[];
}

const services: ServiceDetail[] = [
  {
    icon: Cpu,
    title: "AI Infrastructure Engineering",
    subtitle: "Build the Foundation for Enterprise AI",
    intro:
      "Modern AI initiatives require infrastructure designed specifically for high-performance AI workloads. We architect and optimize AI-native environments across cloud, hybrid, and on-prem deployments.",
    capabilities: [
      "AI Cloud Architecture",
      "Kubernetes Platforms",
      "Distributed Training Infrastructure",
      "GPU Cluster Management",
      "AI FinOps Optimization",
      "High Availability Design",
      "AI Networking & Storage",
    ],
    outcome:
      "Reduce infrastructure costs while increasing scalability, reliability, and deployment velocity.",
    image: "/images/ai_infra.png",
  },
  {
    icon: Zap,
    title: "GPU Performance Engineering",
    subtitle: "Transform GPU Investments into Competitive Advantage",
    intro:
      "Most organizations achieve only a fraction of available GPU performance. Our engineering teams identify bottlenecks, optimize workloads, and maximize throughput across AI infrastructure.",
    capabilities: [
      "CUDA Optimization",
      "TensorRT Acceleration",
      "Quantization Strategies",
      "NCCL Optimization",
      "Multi-GPU Scaling",
      "H100 & MI300 Optimization",
      "Performance Benchmarking",
    ],
    outcome:
      "Unlock maximum GPU performance and dramatically reduce infrastructure costs.",
    image: "/images/gpu_performance.png",
    impact: [
      { value: "3–15x", label: "Performance Improvement" },
      { value: "40–75%", label: "Cost Reduction" },
      { value: "Faster", label: "Training Cycles" },
      { value: "Higher", label: "Infrastructure Utilization" },
    ],
  },
  {
    icon: Bot,
    title: "Agentic AI & Autonomous Systems",
    subtitle: "Move Beyond Chatbots",
    intro:
      "We design intelligent autonomous systems capable of reasoning, planning, memory retention, and task execution.",
    capabilities: [
      "Single-Agent Systems",
      "Multi-Agent Orchestration",
      "Agent Memory Architectures",
      "Tool Integration Frameworks",
      "Human-in-the-Loop Controls",
      "Autonomous Workflow Execution",
      "Agent Governance",
    ],
    outcome:
      "Enable end-to-end automation of complex enterprise processes while maintaining control and accountability.",
    image: "/images/agentic_ai.png",
  },
  {
    icon: Brain,
    title: "Long-Memory AI Systems",
    subtitle: "AI That Learns Beyond the Context Window",
    intro:
      "Traditional AI forgets. We build systems that retain institutional knowledge across months and years.",
    capabilities: [
      "Retrieval-Augmented Generation",
      "Vector Databases",
      "Knowledge Graphs",
      "Memory Architectures",
      "Semantic Search",
      "Persistent Knowledge Stores",
    ],
    outcome:
      "Create AI systems that continuously learn and evolve alongside your organization.",
    image: "/images/long_memory.png",
  },
  {
    icon: Sparkles,
    title: "Enterprise Generative AI",
    subtitle: "Production-Ready Generative AI Solutions",
    intro:
      "Transform enterprise knowledge into actionable intelligence using advanced generative AI systems.",
    capabilities: [
      "Enterprise RAG",
      "AI Assistants",
      "Knowledge Management",
      "Code Generation",
      "Content Automation",
      "Conversational AI",
    ],
    outcome:
      "Improve productivity, decision-making, and information accessibility across the enterprise.",
    image: "/images/generative_ai.png",
  },
  {
    icon: Shield,
    title: "AI Security & Governance",
    subtitle: "Secure AI at Scale",
    intro:
      "Enterprise AI requires governance, observability, and security built into every layer.",
    capabilities: [
      "Zero Trust AI Architecture",
      "AI Governance Frameworks",
      "Identity & Access Management",
      "Compliance Monitoring",
      "Confidential Computing",
      "Audit & Observability",
    ],
    outcome:
      "Deploy AI confidently within regulated and mission-critical environments.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
  },
];

export function ServicesExpanded() {
  return (
    <section className="relative border-b border-border/40 bg-surface/10">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="Deep Dive"
          title="Engineering AI Capabilities That Deliver Outcomes"
          description="Each of our service domains is purpose-built to solve critical enterprise AI challenges and deliver measurable business results."
        />

        <div className="mt-16 space-y-12">
          {services.map((s, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative rounded-xl border border-border/60 bg-background overflow-hidden hover:border-primary/30 transition-all"
              >
                {/* Accent top bar */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 p-6 md:p-8 items-stretch">
                  {/* Left Column (Text content) - alternated on desktop */}
                  <div className={`flex flex-col justify-between min-w-0 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div>
                      {/* Header */}
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 shrink-0 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center text-accent group-hover:scale-110 transition-transform">
                          <s.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground">
                            {s.title}
                          </h3>
                          <p className="mt-1 text-sm text-accent font-medium">
                            {s.subtitle}
                          </p>
                        </div>
                      </div>

                      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                        {s.intro}
                      </p>

                      {/* Capabilities */}
                      <div className="mt-6">
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-3">
                          Capabilities
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {s.capabilities.map((cap) => (
                            <span
                              key={cap}
                              className="rounded-md border border-border/60 bg-surface/40 px-2.5 py-1 text-xs text-foreground/85"
                            >
                              {cap}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border/40">
                      {/* Outcome / Impact */}
                      {s.impact ? (
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-accent font-semibold mb-3">
                            Quantified Business Impact
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            {s.impact.map((m) => (
                              <div key={m.label}>
                                <div className="text-2xl font-bold text-gradient-primary font-display">
                                  {m.value}
                                </div>
                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                                  {m.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
                        Business Outcome
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                        {s.outcome}
                      </p>
                    </div>
                  </div>

                  {/* Right Column (Visual Image) - alternated on desktop */}
                  <div className={`flex items-center min-w-0 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="relative rounded-lg overflow-hidden border border-border/40 aspect-[4/3] w-full bg-surface/10">
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent z-10 pointer-events-none" />
                      <img
                        src={s.image}
                        alt={`${s.title} visual representation`}
                        loading="lazy"
                        className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
