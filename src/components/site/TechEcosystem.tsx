import { motion } from "framer-motion";
import { Cloud, Bot, Server, Cpu } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const layers = [
  {
    name: "AI Platforms Layer",
    icon: Bot,
    items: ["OpenAI", "Anthropic", "Google Gemini", "Llama", "Mistral"],
    accent: "text-blue-400",
    bg: "bg-blue-500/5 border-blue-500/20 group-hover:border-blue-500/40",
  },
  {
    name: "Cloud Layer",
    icon: Cloud,
    items: ["AWS", "Azure", "Google Cloud"],
    accent: "text-cyan-400",
    bg: "bg-cyan-500/5 border-cyan-500/20 group-hover:border-cyan-500/40",
  },
  {
    name: "Infrastructure & Operations Layer",
    icon: Server,
    items: ["Kubernetes", "Docker", "Ray", "Kubeflow", "MLflow"],
    accent: "text-indigo-400",
    bg: "bg-indigo-500/5 border-indigo-500/20 group-hover:border-indigo-500/40",
  },
  {
    name: "GPU & Performance Layer",
    icon: Cpu,
    items: ["NVIDIA", "CUDA", "TensorRT", "NCCL", "Triton"],
    accent: "text-accent",
    bg: "bg-accent/5 border-accent/20 group-hover:border-accent/40",
  },
];

export function TechEcosystem() {
  return (
    <section id="tech-ecosystem" className="relative border-b border-border/40 bg-surface/10 overflow-hidden scroll-mt-20">
      {/* Background glowing gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 h-[250px] w-[250px] rounded-full bg-accent/5 blur-[80px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="Technology"
          title="Built on Industry-Leading Technologies"
          description="We leverage proven technologies while maintaining platform flexibility and vendor neutrality. Our stacks are engineered to operate seamlessly across all layers."
        />

        <div className="mt-16 relative">
          {/* SVG Animated Connections (desktop only) */}
          <div className="absolute inset-0 z-0 hidden lg:block pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Flow Line 1: GPU to Infra */}
              <path
                d="M 300,180 Q 400,280 300,380"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="1.5"
                strokeOpacity="0.15"
                strokeDasharray="4 8"
                className="animate-[dash_20s_linear_infinite]"
              />
              {/* Flow Line 2: Infra to Cloud */}
              <path
                d="M 600,380 Q 500,480 600,580"
                fill="none"
                stroke="oklch(0.74 0.16 252)"
                strokeWidth="1.5"
                strokeOpacity="0.15"
                strokeDasharray="4 8"
                className="animate-[dash_25s_linear_infinite_reverse]"
              />
              {/* Flow Line 3: Cloud to AI */}
              <path
                d="M 900,580 Q 1000,420 900,180"
                fill="none"
                stroke="oklch(0.58 0.22 264)"
                strokeWidth="1.5"
                strokeOpacity="0.15"
                strokeDasharray="4 8"
                className="animate-[dash_30s_linear_infinite]"
              />
            </svg>
          </div>

          {/* Technology Layer Stack Layout */}
          <div className="relative z-10 space-y-8 max-w-5xl mx-auto">
            {layers.map((l, i) => (
              <motion.div
                key={l.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group grid md:grid-cols-[220px_1fr] items-center gap-6 rounded-xl border border-border/40 bg-background/60 p-6 md:p-8 backdrop-blur-sm transition-all hover:bg-background/80"
              >
                {/* Layer Heading */}
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg bg-surface border border-border grid place-items-center ${l.accent}`}>
                    <l.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground tracking-tight">
                      {l.name}
                    </h3>
                  </div>
                </div>

                {/* Tech Badges List */}
                <div className="flex flex-wrap gap-2.5">
                  {l.items.map((item, ii) => (
                    <motion.span
                      key={item}
                      whileHover={{ scale: 1.05 }}
                      className={`rounded-lg border px-4 py-2 text-xs font-semibold text-foreground/90 transition-all cursor-default ${l.bg}`}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CSS Keyframes for SVG Dash Animation inline style to support dynamic styles */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes dash {
            to {
              stroke-dashoffset: -1000;
            }
          }
        `}} />
      </div>
    </section>
  );
}
