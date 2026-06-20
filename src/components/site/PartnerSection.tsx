import { motion } from "framer-motion";
import { ArrowRight, ShieldAlert, Sparkles, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function PartnerSection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden border-b border-border/40">
      {/* Dynamic background blur elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-primary/20 bg-surface/15 backdrop-blur-md p-8 md:p-12 overflow-hidden shadow-2xl group hover:border-primary/45 transition-all duration-500"
        >
          {/* Subtle top light sweep */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="grid md:grid-cols-[1fr_240px] gap-8 md:gap-12 items-center">
            {/* Core copy */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-[10px] uppercase tracking-widest font-bold text-accent">
                <Sparkles className="w-3.5 h-3.5 text-accent shrink-0" />
                Strategic Collaboration
              </div>

              <h2 className="text-2xl md:text-3.5xl font-black tracking-tight text-foreground font-display leading-[1.15]">
                Why Partner with <span className="text-gradient font-black">GUP-Coral</span>?
              </h2>

              <p className="text-sm md:text-base text-muted-foreground/90 leading-relaxed max-w-2xl font-sans">
                <strong className="text-foreground font-semibold">TRUSTGRID.AI</strong> bridges the gap between AI research and enterprise production. By focusing on benchmark-driven LLM optimization, high-precision RAG performance, and resilient agentic AI orchestration, we transform your enterprise AI infrastructure into a high-velocity, cost-efficient engine.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                  <span className="text-xs font-semibold text-foreground/80">Benchmark-Driven Optimization</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
                  <span className="text-xs font-semibold text-foreground/80">High-Precision RAG</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-xs font-semibold text-foreground/80">Resilient Orchestration</span>
                </div>
              </div>
            </div>

            {/* CTA box */}
            <div className="flex flex-col items-stretch justify-center h-full border-t md:border-t-0 md:border-l border-border/25 pt-6 md:pt-0 md:pl-8">
              <p className="text-xs text-muted-foreground leading-relaxed mb-4 text-center md:text-left font-medium">
                Ready to optimize your AI stack? Contact our engineering team to schedule an infrastructure audit.
              </p>

              <Link
                to="/contact"
                className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-xs tracking-wider uppercase px-5 py-3.5 transition-all duration-300 shadow-md shadow-primary/10 hover:shadow-primary/20"
              >
                Schedule Audit
                <ArrowRight className="w-4 h-4 text-primary-foreground group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
