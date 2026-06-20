import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const layers = [
  {
    name: "Reflex Layer",
    time: "< 1 μs",
    desc: "Hardware-level inference. CUDA kernels, tensor cores, RDMA fabric.",
    gradient: "from-blue-600 to-indigo-600",
    bgGlow: "rgba(59,130,246,0.06)",
    badgeStyle: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    glowColor: "group-hover:border-blue-500/80",
  },
  {
    name: "Perception Layer",
    time: "1 μs – 100 ms",
    desc: "Real-time signal interpretation. Vision, speech, sensor fusion.",
    gradient: "from-cyan-500 to-blue-600",
    bgGlow: "rgba(6,182,212,0.06)",
    badgeStyle: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    glowColor: "group-hover:border-cyan-500/80",
  },
  {
    name: "Interaction Layer",
    time: "100 ms – 1 s",
    desc: "Conversational AI, copilots, low-latency agent responses.",
    gradient: "from-sky-500 to-indigo-500",
    bgGlow: "rgba(14,165,233,0.06)",
    badgeStyle: "text-sky-400 bg-sky-500/10 border-sky-500/30",
    glowColor: "group-hover:border-sky-500/80",
  },
  {
    name: "Operation Layer",
    time: "1 s – 5 min",
    desc: "Agentic workflows. Tool-using agents execute multi-step tasks.",
    gradient: "from-indigo-600 to-violet-600",
    bgGlow: "rgba(79,70,229,0.06)",
    badgeStyle: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    glowColor: "group-hover:border-indigo-500/80",
  },
  {
    name: "Analysis Layer",
    time: "5 min – 1 hr",
    desc: "Long-context analysis. Research agents, deep reasoning, planning.",
    gradient: "from-violet-600 to-fuchsia-600",
    bgGlow: "rgba(139,92,246,0.06)",
    badgeStyle: "text-violet-400 bg-violet-500/10 border-violet-500/30",
    glowColor: "group-hover:border-violet-500/80",
  },
  {
    name: "Strategy Layer",
    time: "1 hr – Days",
    desc: "Autonomous enterprise operations. Self-improving agent fleets.",
    gradient: "from-fuchsia-600 to-pink-600",
    bgGlow: "rgba(217,70,239,0.06)",
    badgeStyle: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/30",
    glowColor: "group-hover:border-fuchsia-500/80",
  },
];

export function Landscape() {
  return (
    <section className="relative border-b border-border/30 bg-surface/10">
      <div className="absolute inset-0 bg-grid opacity-[0.15] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 py-24 relative z-10">
        <SectionHeading
          eyebrow="The AI Engineering Landscape"
          title="We engineer across the full temporal spectrum"
          description="From microsecond kernel optimization to multi-day autonomous strategy — one partner, every layer."
        />

        <div className="mt-16 relative">
          {/* Horizontal Track Line guides (desktop only) */}
          <div className="absolute left-8 right-8 top-5 h-0.5 bg-slate-200/65 hidden lg:block" />
          <div className="absolute left-8 right-8 top-5 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 via-indigo-500 to-fuchsia-500 bg-[length:200%_auto] animate-gradient-flow hidden lg:block opacity-65" />

          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6 relative z-10">
            {layers.map((l, i) => (
              <motion.div
                key={l.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col items-stretch group"
              >
                {/* Node counter */}
                <div className="mb-8 flex items-center justify-center lg:justify-start">
                  <div className="h-10 w-10 rounded-full bg-card border border-border/80 shadow-sm flex items-center justify-center text-xs font-mono font-bold text-muted-foreground transition-all duration-500 relative z-20 group-hover:border-transparent group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]">
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${l.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[-1]`}
                    />
                    0{i + 1}
                  </div>
                </div>

                {/* Vertical Connection Line (desktop only) */}
                <div className="hidden lg:flex lg:justify-start w-10 h-8 -mt-8 mb-4">
                  <div
                    className={`w-0.5 h-full ml-[19px] border-l border-dashed border-border/80 transition-colors duration-300 ${l.glowColor}`}
                  />
                </div>

                {/* Layer Card */}
                <div className="premium-card p-5 h-full relative overflow-hidden flex flex-col justify-between">
                  {/* Top indicator bar matching the gradient */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${l.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  {/* Layer-specific hover radial glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at top, ${l.bgGlow}, transparent 70%)`,
                    }}
                  />

                  <div className="relative z-10">
                    <span
                      className={`text-[10.5px] font-mono font-bold uppercase tracking-wider border px-2.5 py-1 rounded-md shadow-sm ${l.badgeStyle}`}
                    >
                      {l.time}
                    </span>
                    <h3 className="mt-4 text-sm font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                      {l.name}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{l.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
