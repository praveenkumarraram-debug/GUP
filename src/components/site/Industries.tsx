import { motion } from "framer-motion";
import {
  Landmark, HeartPulse, Factory, ShoppingBag, Zap, Laptop, Building2, Film
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const keyIndustries = [
  {
    icon: Factory,
    name: "Manufacturing & Industrial",
    desc: "Optimize production, predictive maintenance, computer vision QA, and supply chain intelligence.",
    roles: ["Automobiles", "Auto Components", "Engineering", "Defence", "MSME"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Laptop,
    name: "Technology & Electronics",
    desc: "Automation systems, IT/ITES orchestration, semiconductor design acceleration, and electric vehicle telemetry.",
    roles: ["IT & BPM", "Semiconductors", "Telecom", "Science & Tech", "EVs"],
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Building2,
    name: "Infrastructure & Construction",
    desc: "Intelligent project management, construction safety monitoring, and predictive infrastructure maintenance.",
    roles: ["Cement", "Steel", "Infrastructure", "Real Estate", "Highways"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Zap,
    name: "Energy & Utilities",
    desc: "Deploy grid analytics, renewable forecasting, asset maintenance, and carbon intelligence.",
    roles: ["Oil & Gas", "Power", "Renewables", "Ports", "Railways"],
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Landmark,
    name: "Financial Services",
    desc: "Deploy secure AI infrastructure for risk assessment, fraud detection, and automated loan processing.",
    roles: ["Banking", "Financial Services", "Insurance", "E-Commerce", "Gems"],
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: HeartPulse,
    name: "Healthcare & Life Sciences",
    desc: "Compliant and scalable AI platforms for medical imaging, clinical data, and drug discovery.",
    roles: ["Pharma", "Healthcare", "Devices", "Biotech", "Ayush"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: ShoppingBag,
    name: "Consumer & Retail",
    desc: "Empower businesses with recommendation engines, customer support agents, and demand forecasting.",
    roles: ["FMCG", "Retail", "Durables", "Textiles", "Food"],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Film,
    name: "Media & Services",
    desc: "Personalized training platforms, media content generation/moderation, and aviation logistics.",
    roles: ["Media & Ent.", "Tourism", "Aviation", "Education", "Agri & Allied"],
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
  },
];

export function Industries() {
  return (
    <section id="industries" className="relative border-b border-border/40 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="Industries"
          title="Engineering AI for Regulated, Mission-Critical Industries"
          description="8 strategic verticals served. Our AI engineering capabilities are designed to address the unique challenges of complex, regulated, and high-stakes enterprise environments."
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
                  <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-accent transition-colors">
                    {it.name}
                  </h3>
                  <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed">
                    {it.desc}
                  </p>
                  
                  {/* Focus Roles/Segments */}
                  <div className="mt-3.5 flex flex-wrap gap-1">
                    {it.roles.map((role) => (
                      <span
                        key={role}
                        className="text-[9px] font-semibold bg-primary/5 border border-primary/10 text-accent px-1.5 py-0.5 rounded"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
