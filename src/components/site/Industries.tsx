import { motion } from "framer-motion";
import {
  Landmark, HeartPulse, Factory, Shield, Swords, ShoppingBag, Zap,
  Lightbulb, Radio, Truck, Plane, Building2, GraduationCap, FileBadge, Pill,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const keyIndustries = [
  {
    icon: Landmark,
    name: "Financial Services",
    desc: "Fraud detection, risk analytics, compliance automation, intelligent operations.",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    desc: "Clinical intelligence, patient engagement, operational optimization, AI-assisted diagnostics.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Factory,
    name: "Manufacturing",
    desc: "Predictive maintenance, quality inspection, industrial automation, supply chain optimization.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Shield,
    name: "Government",
    desc: "Digital transformation, citizen services, intelligence systems, secure AI operations.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Radio,
    name: "Telecommunications",
    desc: "Network optimization, customer experience, operational automation, predictive analytics.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Zap,
    name: "Energy & Utilities",
    desc: "Asset monitoring, predictive forecasting, infrastructure intelligence, operational resilience.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: ShoppingBag,
    name: "Retail & Commerce",
    desc: "Personalization, demand forecasting, inventory intelligence, customer engagement.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Truck,
    name: "Logistics & Transportation",
    desc: "Route optimization, fleet intelligence, supply chain orchestration, predictive planning.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
  },
];

const otherIndustries = [
  { icon: Swords, name: "Defense" },
  { icon: Lightbulb, name: "Utilities" },
  { icon: Plane, name: "Transportation" },
  { icon: Building2, name: "Smart Cities" },
  { icon: GraduationCap, name: "Education" },
  { icon: FileBadge, name: "Insurance" },
  { icon: Pill, name: "Pharmaceuticals" },
];

export function Industries() {
  return (
    <section id="industries" className="relative border-b border-border/40 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="Industries"
          title="Engineering AI for Regulated, Mission-Critical Industries"
          description="20+ verticals served. Our AI engineering capabilities are designed to address the unique challenges of complex, regulated, and high-stakes enterprise environments."
        />

        {/* Primary key industries with full descriptions & premium images */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {keyIndustries.map((it, i) => (
            <motion.div
              key={it.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative rounded-xl border border-border/60 bg-surface/20 hover:border-primary/40 hover:bg-surface/40 transition-all overflow-hidden flex flex-col justify-between"
            >
              {/* Card Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/60">
                <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent z-10" />
                <img
                  src={it.image}
                  alt={`${it.name} AI integration`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 z-20 h-8 w-8 rounded-lg bg-background/80 backdrop-blur border border-border/60 grid place-items-center text-accent">
                  <it.icon className="h-4 w-4" />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-accent transition-colors">
                    {it.name}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {it.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary other industries grid to preserve all existing data */}
        <div className="mt-12 pt-10 border-t border-border/30">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 mb-6">
            Additional Enterprise Verticals Served
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {otherIndustries.map((it, i) => (
              <motion.div
                key={it.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="group flex items-center gap-3 rounded-lg border border-border/60 bg-surface/10 p-3 hover:border-primary/40 hover:bg-surface/30 transition-all"
              >
                <div className="h-7 w-7 rounded-md bg-primary/10 border border-primary/20 grid place-items-center text-accent group-hover:scale-110 transition-transform">
                  <it.icon className="h-3.5 w-3.5" />
                </div>
                <div className="text-xs font-medium text-foreground">{it.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
