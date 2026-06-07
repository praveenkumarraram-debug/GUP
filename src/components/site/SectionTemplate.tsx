import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";

export interface SectionData {
  title: string;
  description: string;
  introduction: string;
  capabilities: string[];
  useCases: string[];
  solutions: string[];
  outcomes: string[];
  metrics: { label: string; value: string }[];
}

/** Convert a title to a URL-safe id: "GPU Optimization" → "gpu-optimization" */
function toId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function SectionTemplate({ data }: { data: SectionData }) {
  return (
    <div id={toId(data.title)} className="py-20 border-b border-border/40 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-semibold tracking-tight text-gradient mb-6"
            >
              {data.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-muted-foreground mb-8"
            >
              {data.introduction}
            </motion.p>

            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  Enterprise Capabilities
                </h3>
                <ul className="space-y-3">
                  {data.capabilities.map((cap, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  Proven Solutions
                </h3>
                <ul className="space-y-3">
                  {data.solutions.map((sol, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              {data.metrics.map((metric, i) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={i}
                  className="rounded-2xl border border-border/60 bg-surface/40 p-6 flex flex-col items-center justify-center text-center backdrop-blur-sm"
                >
                  <div className="text-3xl md:text-4xl font-semibold text-accent mb-2">{metric.value}</div>
                  <div className="text-sm font-medium text-muted-foreground">{metric.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border/60 bg-background/50 p-8"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">Strategic Use Cases</h3>
              <ul className="space-y-4 mb-8">
                {data.useCases.map((uc, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-muted-foreground">{uc}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-4">Business Outcomes</h3>
              <ul className="space-y-4">
                {data.outcomes.map((out, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span className="text-muted-foreground">{out}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
