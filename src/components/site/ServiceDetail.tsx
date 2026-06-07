import { motion } from "framer-motion";
import { Check, CheckCircle2, ChevronRight, BarChart3, Target, Zap } from "lucide-react";
import { PageHero } from "./PageHero";
import { CTA } from "./CTA";

export interface OfferingDetail {
  title: string;
  subtitle?: string;
  description: string;
  keySituations: string[];
  keyStatistics: string[];
  offeringValue: string;
  expectedOutcomes: string[];
}

export interface ServiceDetailProps {
  eyebrow: string;
  title: string;
  description: string;
  capabilities: { title: string; desc: string }[];
  stack: string[];
  outcomes?: { value: string; label: string }[];
  detailedOfferings?: OfferingDetail[];
}

export function ServiceDetail({
  eyebrow,
  title,
  description,
  capabilities,
  stack,
  outcomes,
  detailedOfferings,
}: ServiceDetailProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />

      {outcomes && (
        <section className="border-b border-border/40 bg-surface/20">
          <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {outcomes.map((o) => (
              <div key={o.label}>
                <div className="text-3xl md:text-4xl font-semibold text-gradient-primary font-display">{o.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{o.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section id="capabilities" className="border-b border-border/40 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-2xl md:text-3xl font-semibold text-gradient">Capabilities</h2>
          <div className="mt-10 grid gap-px bg-border/30 border border-border/40 rounded-xl overflow-hidden md:grid-cols-2">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-background p-6"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 shrink-0 rounded-md bg-primary/15 grid place-items-center">
                    <Check className="h-3 w-3 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{c.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {detailedOfferings && detailedOfferings.length > 0 && (
        <section id="offerings" className="border-b border-border/40 bg-surface/5 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <h2 className="text-2xl md:text-3xl font-semibold text-gradient mb-4">Detailed Service Packages & Engagement Models</h2>
            <p className="text-muted-foreground text-sm max-w-2xl mb-12">
              Explore our specific engagement models, target situations, key performance statistics, and expected business outcomes for this service domain.
            </p>
            <div className="space-y-20">
              {detailedOfferings.map((offering, index) => (
                <div key={index} className="pt-16 first:pt-0 border-t border-border/20 first:border-t-0">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                  >
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-2">
                      {offering.title}
                    </h3>
                    {offering.subtitle && (
                      <p className="text-accent font-medium text-sm md:text-base">{offering.subtitle}</p>
                    )}
                  </motion.div>

                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column */}
                    <div className="space-y-8">
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                      >
                        <h4 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          Description
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {offering.description}
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                      >
                        <h4 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4 text-accent" />
                          Key Situations & Triggers
                        </h4>
                        <ul className="space-y-2">
                          {offering.keySituations.map((sit, i) => (
                            <li key={i} className="flex gap-2 text-muted-foreground text-sm leading-relaxed">
                              <div className="h-1.5 w-1.5 rounded-full bg-accent shrink-0 mt-2" />
                              <span>{sit}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                      >
                        <h4 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Zap className="h-4 w-4 text-emerald-500" />
                          Offering Value & Benefits
                        </h4>
                        <p className="text-sm text-muted-foreground border-l-2 border-emerald-500/50 pl-4 py-2 italic bg-emerald-500/5 rounded-r-lg leading-relaxed">
                          {offering.offeringValue}
                        </p>
                      </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-xl border border-border/60 bg-surface/30 p-6 md:p-8"
                      >
                        <h4 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-primary" />
                          Key Statistics & Outcomes
                        </h4>
                        <ul className="space-y-3">
                          {offering.keyStatistics.map((stat, i) => (
                            <li key={i} className="flex gap-2 text-foreground text-sm font-medium leading-relaxed">
                              <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                              <span>{stat}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                      >
                        <h4 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent" />
                          Expected Deliverables
                        </h4>
                        <ul className="space-y-2">
                          {offering.expectedOutcomes.map((out, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                              <span className="text-muted-foreground text-sm leading-relaxed">{out}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="tech-stack" className="border-b border-border/40 bg-surface/10 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-2xl md:text-3xl font-semibold text-gradient">Technology stack</h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {stack.map((t) => (
              <span key={t} className="rounded-md border border-border/60 bg-surface/40 px-3 py-1.5 text-sm text-foreground/90">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
