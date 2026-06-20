import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Info, CheckCircle, Flame } from "lucide-react";
import { OptimizationOffering } from "@/data/optimization-offerings";

interface OptimizationMatrixProps {
  title: string;
  description: string;
  offerings: OptimizationOffering[];
  accentColor?: string; // e.g. "primary", "accent", "emerald-500"
}

export function OptimizationMatrix({
  title,
  description,
  offerings,
  accentColor = "primary",
}: OptimizationMatrixProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = offerings.filter(
    (o) =>
      o.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.solutionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.solutionDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.outcome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper to extract numerical benchmarks or highlight metrics
  const highlightMetrics = (text: string) => {
    // Regex matches percentages (e.g. 40%, +15%), multipliers (e.g. 2x, 3x), times (e.g. <500ms, sub-50ms), and 100%
    const regex = /(\b[+-]?\d+(?:\.\d+)?%|\b\d+x\b|\b[<>]?\d+ms\b|\b\d+\s*direct\s*cost\s*savings\b)/gi;
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) => {
          if (regex.test(part)) {
            return (
              <span
                key={i}
                className="inline-block px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary font-bold font-mono text-xs"
              >
                {part}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </>
    );
  };

  return (
    <section className="py-20 border-b border-border/40 bg-background relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-accent/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Title Area */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3.5xl font-extrabold tracking-tight text-gradient font-display mb-3">
              {title}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search specifications or metrics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface/30 border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 rounded-xl pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200"
            />
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-hidden rounded-xl border border-border/40 bg-surface/10 backdrop-blur-sm shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface/50 border-b border-border/50 font-mono text-xs uppercase tracking-wider font-bold text-muted-foreground">
                <th className="p-4 w-[50px] text-center">#</th>
                <th className="p-4 w-[28%] border-l border-border/20">The Bottleneck / Problem</th>
                <th className="p-4 w-[42%] border-l border-border/20">Solution Offering</th>
                <th className="p-4 w-[28%] border-l border-border/20">Performance Outcome & Benchmarks</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filtered.map((item, idx) => (
                  <motion.tr
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, delay: Math.min(idx * 0.02, 0.25) }}
                    className="border-b border-border/20 last:border-b-0 hover:bg-surface/35 transition-colors duration-150 group"
                  >
                    <td className="p-4 text-center font-mono text-xs font-bold text-muted-foreground/60 group-hover:text-primary transition-colors">
                      {String(item.id).padStart(2, "0")}
                    </td>
                    <td className="p-4 font-semibold text-foreground text-sm border-l border-border/20 group-hover:text-foreground transition-colors leading-relaxed">
                      {item.problem}
                    </td>
                    <td className="p-4 border-l border-border/20">
                      <div className="space-y-1">
                        <div className="font-bold text-primary text-sm flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 text-accent shrink-0" />
                          {item.solutionTitle}
                        </div>
                        <p className="text-muted-foreground text-xs leading-relaxed">
                          {item.solutionDesc}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-xs md:text-sm font-medium text-foreground border-l border-border/20 bg-primary/[0.005] leading-relaxed">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <div>{highlightMetrics(item.outcome)}</div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-16 text-center text-sm text-muted-foreground">
                    <Info className="w-6 h-6 mx-auto mb-2 opacity-50" />
                    No optimizations match your search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Grid/Card View */}
        <div className="lg:hidden space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: Math.min(idx * 0.02, 0.25) }}
                className="premium-card p-5 bg-card border border-border/50 rounded-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3 text-[10px] font-mono font-bold text-muted-foreground/40 bg-surface/20 rounded-bl-xl border-l border-b border-border/20">
                  #{String(item.id).padStart(2, "0")}
                </div>

                <div className="space-y-4">
                  {/* Problem */}
                  <div>
                    <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase block mb-1">
                      Problem
                    </span>
                    <h4 className="text-sm font-bold text-foreground leading-snug">
                      {item.problem}
                    </h4>
                  </div>

                  {/* Solution */}
                  <div className="border-t border-border/20 pt-3">
                    <span className="text-[10px] font-mono font-bold text-primary uppercase block mb-1">
                      Optimization Offering
                    </span>
                    <div className="font-extrabold text-foreground text-sm flex items-center gap-1.5 mb-1">
                      <Flame className="w-3.5 h-3.5 text-accent shrink-0" />
                      {item.solutionTitle}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.solutionDesc}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className="border-t border-border/20 pt-3 bg-primary/[0.01] rounded-b-xl">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase block mb-1">
                      Expected Benchmark
                    </span>
                    <div className="flex items-start gap-2 text-xs font-semibold text-foreground leading-relaxed">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>{highlightMetrics(item.outcome)}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="p-10 text-center text-xs text-muted-foreground border border-dashed border-border/30 rounded-xl">
              <Info className="w-5 h-5 mx-auto mb-2 opacity-50" />
              No optimizations match your search query.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
