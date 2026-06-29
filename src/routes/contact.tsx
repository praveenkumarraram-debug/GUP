import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { Mail, Phone, Globe2, Cpu, Handshake, Coins } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Enterprise Consultation — TrustGrid.AI" },
      { name: "description", content: "Schedule a strategy session with TrustGrid.AI principal engineers. Tailored capability assessment within 48 hours." },
      { property: "og:title", content: "Enterprise Consultation — TrustGrid.AI" },
      { property: "og:description", content: "Schedule a strategy session with TrustGrid.AI principal engineers." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Schedule an enterprise consultation"
        description="Speak with a TrustGrid.AI principal engineer about your AI roadmap. Most enterprise engagements begin with a tailored 48-hour capability assessment."
      />
      
      {/* Specialized Form Selectors */}
      <section className="mx-auto max-w-7xl px-6 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-accent/80 block mb-2">
            Looking for a specialized request?
          </span>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display">
            Select a specialized form below for faster routing
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Consulting Card */}
          <Link
            to="/consulting"
            className="premium-card p-6 flex flex-col justify-between hover:border-blue-500/40 hover:shadow-[0_12px_30px_-10px_rgba(59,130,246,0.1)] transition-all duration-300 rounded-xl bg-surface/30 group"
          >
            <div>
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-colors mb-4">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2 flex items-center gap-1.5">
                Consulting Form
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                Request a dedicated capability strategy session, code performance audit, or custom hardware optimization session.
              </p>
            </div>
            <span className="text-xs font-semibold text-accent group-hover:text-foreground flex items-center gap-1 mt-auto">
              Schedule consulting &rarr;
            </span>
          </Link>

          {/* Partnership Card */}
          <Link
            to="/partnership"
            className="premium-card p-6 flex flex-col justify-between hover:border-violet-500/40 hover:shadow-[0_12px_30px_-10px_rgba(139,92,246,0.1)] transition-all duration-300 rounded-xl bg-surface/30 group"
          >
            <div>
              <div className="h-10 w-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:text-violet-300 transition-colors mb-4">
                <Handshake className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2 flex items-center gap-1.5">
                Partnership Form
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                Connect with our ecosystem team to discuss system integration services, technology vendor alignment, or co-selling.
              </p>
            </div>
            <span className="text-xs font-semibold text-accent group-hover:text-foreground flex items-center gap-1 mt-auto">
              Apply for partnership &rarr;
            </span>
          </Link>

          {/* Sales Card */}
          <Link
            to="/sales-enquiry"
            className="premium-card p-6 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-[0_12px_30px_-10px_rgba(16,185,129,0.1)] transition-all duration-300 rounded-xl bg-surface/30 group"
          >
            <div>
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:text-emerald-300 transition-colors mb-4">
                <Coins className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2 flex items-center gap-1.5">
                Sales Enquiry Form
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                Inquire about volume software licenses for GPU-phi, custom node sizing quotes, and enterprise SLAs.
              </p>
            </div>
            <span className="text-xs font-semibold text-accent group-hover:text-foreground flex items-center gap-1 mt-auto">
              Contact Sales &rarr;
            </span>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-[1fr_400px] gap-12 border-t border-border/20 mt-10">
        <div className="space-y-4">
          <div className="mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">General Enquiries</span>
            <h2 className="text-lg font-bold text-foreground font-display mt-1">General Contact Request</h2>
          </div>
          <ContactForm />
        </div>
        <aside className="space-y-8 mt-14">
          <div className="rounded-xl border border-border/60 bg-surface/30 p-6">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Global Coverage</h3>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3"><Globe2 className="h-4 w-4 text-accent" /> 5 delivery centers worldwide</div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" />
                <a href="mailto:connect@trustgrid.ai" className="hover:text-foreground transition-colors">connect@trustgrid.ai</a>
              </div>
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-accent" /> 24/7 enterprise support</div>
            </div>
          </div>
          <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-6">
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">For CTOs & CIOs</h3>
            <p className="mt-3 text-sm text-foreground/90 leading-relaxed">
              Engagements led by principal engineers with experience deploying production AI at Fortune 500 scale.
              All consultations are covered by a mutual NDA.
            </p>
          </div>
        </aside>
      </section>

      {/* Office Locations */}
      <section className="border-t border-border/40 bg-surface/10 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.15] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="max-w-3xl mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background px-3 py-1 text-[10px] uppercase tracking-widest font-semibold text-accent mb-4">
              Global Presence
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gradient font-display">
              Our Global Offices
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              With offices spanning across multiple continents, our principal engineers provide 24/7 global support and collaboration.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* US Office */}
            <div className="premium-card p-6 bg-card flex flex-col justify-between h-full relative overflow-hidden group border border-border/80 hover:border-blue-500/35 hover:shadow-[0_12px_30px_-10px_rgba(59,130,246,0.12)] transition-all duration-300 rounded-xl">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-40" />
              <div>
                <h3 className="text-base font-bold text-foreground tracking-tight mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  US Office
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
                  501 E Kennedy Blvd Suite 1400{"\n"}
                  Tampa, FL 33602, United States
                </p>
              </div>
              <div className="border-t border-border/45 pt-4 space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2.5">
                  <Mail className="h-3.5 w-3.5 text-accent" />
                  <a href="mailto:connect@trustgrid.ai" className="hover:text-primary transition-colors">connect@trustgrid.ai</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-3.5 w-3.5 text-accent" />
                  <a href="tel:+919513288612" className="hover:text-primary transition-colors">+91 9513288612</a>
                </div>
              </div>
            </div>

            {/* Singapore Office */}
            <div className="premium-card p-6 bg-card flex flex-col justify-between h-full relative overflow-hidden group border border-border/80 hover:border-violet-500/35 hover:shadow-[0_12px_30px_-10px_rgba(139,92,246,0.12)] transition-all duration-300 rounded-xl">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-40" />
              <div>
                <h3 className="text-base font-bold text-foreground tracking-tight mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-violet-500" />
                  Singapore Office
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
                  5 Temasek Boulevard, 17th Floor{"\n"}
                  Singapore 038985
                </p>
              </div>
              <div className="border-t border-border/45 pt-4 space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2.5">
                  <Mail className="h-3.5 w-3.5 text-accent" />
                  <a href="mailto:connect@trustgrid.ai" className="hover:text-primary transition-colors">connect@trustgrid.ai</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-3.5 w-3.5 text-accent" />
                  <a href="tel:+6560505235" className="hover:text-primary transition-colors">+65 6050 5235</a>
                </div>
              </div>
            </div>

            {/* India Office (Registered) */}
            <div className="premium-card p-6 bg-card flex flex-col justify-between h-full relative overflow-hidden group border border-border/80 hover:border-emerald-500/35 hover:shadow-[0_12px_30px_-10px_rgba(16,185,129,0.12)] transition-all duration-300 rounded-xl">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-40" />
              <div>
                <h3 className="text-base font-bold text-foreground tracking-tight mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  India Office
                </h3>
                <p className="text-xs font-bold text-foreground/80 mb-2 leading-relaxed">
                  TRUSTGRID.AI INNNOVATION PVT LTD
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6 whitespace-pre-line text-pretty">
                  Suite : 32 , 235, BINNAMANGALA,{"\n"}
                  2nd Floor, 13th Cross Road,{"\n"}
                  Indira Nagar 2nd Stage, Hoysala Nagar,{"\n"}
                  Bengaluru – 560038 , India
                </p>
              </div>
              <div className="border-t border-border/45 pt-4 space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2.5">
                  <Mail className="h-3.5 w-3.5 text-accent" />
                  <a href="mailto:connect@trustgrid.ai" className="hover:text-primary transition-colors">connect@trustgrid.ai</a>
                </div>
              </div>
            </div>

            {/* Mumbai Office */}
            <div className="premium-card p-6 bg-card flex flex-col justify-between h-full relative overflow-hidden group border border-border/80 hover:border-rose-500/35 hover:shadow-[0_12px_30px_-10px_rgba(244,63,94,0.12)] transition-all duration-300 rounded-xl">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-40" />
              <div>
                <h3 className="text-base font-bold text-foreground tracking-tight mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  Mumbai Office
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
                  WeWork, Raheja Platinum,{"\n"}
                  Road, off Andheri - Kurla Road,{"\n"}
                  Sag Baug, Marol, Andheri East,{"\n"}
                  Mumbai, Maharashtra 400059
                </p>
              </div>
              <div className="border-t border-border/45 pt-4 space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2.5">
                  <Mail className="h-3.5 w-3.5 text-accent" />
                  <a href="mailto:cs@trustgrid.in" className="hover:text-primary transition-colors">cs@trustgrid.in</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-3.5 w-3.5 text-accent" />
                  <a href="tel:+919513088612" className="hover:text-primary transition-colors">+91 9513088612</a>
                </div>
              </div>
            </div>

            {/* Bangalore Office */}
            <div className="premium-card p-6 bg-card flex flex-col justify-between h-full relative overflow-hidden group border border-border/80 hover:border-cyan-500/35 hover:shadow-[0_12px_30px_-10px_rgba(6,182,212,0.12)] transition-all duration-300 rounded-xl">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-40" />
              <div>
                <h3 className="text-base font-bold text-foreground tracking-tight mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-500" />
                  Bangalore Office
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
                  WeWork, 13th floor, Tin Factory,{"\n"}
                  Salarpuria Magnificia, 78, Old Madras Rd,{"\n"}
                  next to KR Puram, Mahadevapura,{"\n"}
                  Bengaluru, Karnataka 560016
                </p>
              </div>
              <div className="border-t border-border/45 pt-4 space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2.5">
                  <Mail className="h-3.5 w-3.5 text-accent" />
                  <a href="mailto:cs@trustgrid.in" className="hover:text-primary transition-colors">cs@trustgrid.in</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-3.5 w-3.5 text-accent" />
                  <a href="tel:+919513088612" className="hover:text-primary transition-colors">+91 9513088612</a>
                </div>
              </div>
            </div>

            {/* General Contact */}
            <div className="premium-card p-6 bg-card flex flex-col justify-between h-full relative overflow-hidden group border border-border/80 hover:border-amber-500/35 hover:shadow-[0_12px_30px_-10px_rgba(245,158,11,0.12)] transition-all duration-300 rounded-xl">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-40" />
              <div>
                <h3 className="text-base font-bold text-foreground tracking-tight mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  General Contact
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  For corporate inquiries, partner integrations, and primary assistance:
                </p>
              </div>
              <div className="border-t border-border/45 pt-4 space-y-3.5 text-xs text-muted-foreground">
                <div className="flex items-start gap-2.5">
                  <Mail className="h-3.5 w-3.5 text-accent mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono text-muted-foreground/60 uppercase block leading-none mb-1">Email Us</span>
                    <a href="mailto:connect@trustgrid.ai" className="hover:text-primary transition-colors font-semibold">connect@trustgrid.ai</a>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="h-3.5 w-3.5 text-accent mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono text-muted-foreground/60 uppercase block leading-none mb-1">Call Us</span>
                    <div className="flex flex-col gap-1 font-semibold">
                      <a href="tel:+919513288612" className="hover:text-primary transition-colors">+91 9513288612</a>
                      <a href="tel:+6560505235" className="hover:text-primary transition-colors">+65 6050 5235</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
