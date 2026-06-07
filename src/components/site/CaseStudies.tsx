import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const cases = [
  {
    tag: "GPU Optimization",
    title: "Unlocking 12x performance on H100 clusters",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    challenge: "Fortune 100 financial services firm running underutilized H100 infrastructure with $40M+ annual GPU spend.",
    results: [
      { v: "3–15x", k: "Performance gain" },
      { v: "40–75%", k: "Cost reduction" },
      { v: "< 6mo", k: "Time to ROI" },
    ],
  },
  {
    tag: "Agentic AI",
    title: "Autonomous operations across 12 business units",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    challenge: "Global manufacturer with manual workflow bottlenecks across procurement, support and compliance.",
    results: [
      { v: "70–90%", k: "Workflows automated" },
      { v: "24/7", k: "Agent fleet operating" },
      { v: "8 wks", k: "From pilot to prod" },
    ],
  },
  {
    tag: "AI Infrastructure",
    title: "10x faster AI deployment for a government agency",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    challenge: "National-scale agency with 9-month AI deployment cycles and fragmented MLOps tooling.",
    results: [
      { v: "10x", k: "Faster delivery" },
      { v: "Zero", k: "Security incidents" },
      { v: "100%", k: "Audit coverage" },
    ],
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="relative border-b border-border/40 bg-surface/10 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="Proof"
          title="Engineered outcomes, measured in production"
          description="A selection of the production AI systems we've engineered for global enterprises and governments."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cases.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-xl border border-border/60 bg-background overflow-hidden hover:border-primary/40 transition-all"
            >
              {/* Card Image Header */}
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/40">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 z-20 text-[10px] uppercase tracking-widest text-accent font-mono bg-background/80 backdrop-blur px-2.5 py-1 rounded-md border border-border/60">
                  {c.tag}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground leading-snug group-hover:text-accent transition-colors">
                    {c.title}
                  </h3>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {c.challenge}
                </p>
                <div className="mt-6 grid grid-cols-3 gap-2 pt-6 border-t border-border/60">
                  {c.results.map((r) => (
                    <div key={r.k}>
                      <div className="text-lg font-semibold text-gradient-primary font-display">
                        {r.v}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                        {r.k}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
