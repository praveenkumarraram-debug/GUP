import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { PartnershipForm } from "@/components/site/PartnershipForm";
import { Mail, Phone, Handshake } from "lucide-react";

export const Route = createFileRoute("/partnership")({
  head: () => ({
    meta: [
      { title: "Partner Network & Ecosystem — TrustGrid.AI" },
      { name: "description", content: "Join the TrustGrid.AI Partner Network. Collaborate on technology integrations, system engineering, and enterprise sales channels." },
      { property: "og:title", content: "Partner Network & Ecosystem — TrustGrid.AI" },
      { property: "og:description", content: "Join the TrustGrid.AI Partner Network to collaborate on technology integrations and system engineering." },
      { property: "og:url", content: "/partnership" },
    ],
    links: [{ rel: "canonical", href: "/partnership" }],
  }),
  component: PartnershipPage,
});

function PartnershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnership"
        title="Join the TrustGrid.AI Partner Network"
        description="Collaborate with our ecosystem to accelerate enterprise AI infrastructure deployments. We partner with technology vendors, system integrators, and academic institutions worldwide."
      />
      <section className="mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-[1fr_400px] gap-12">
        <PartnershipForm />
        <aside className="space-y-8">
          <div className="rounded-xl border border-border/60 bg-surface/30 p-6">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Partner Ecosystem</h3>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              We provide technology partners and system integrators with training resources, hardware sandbox allocations, and co-selling opportunities.
            </p>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3"><Handshake className="h-4 w-4 text-accent" /> Co-development channels</div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" />
                <a href="mailto:connect@trustgrid.ai" className="hover:text-foreground transition-colors">connect@trustgrid.ai</a>
              </div>
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-accent" /> Technical enablement support</div>
            </div>
          </div>
          <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-6">
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">Why Partner With Us?</h3>
            <p className="mt-3 text-sm text-foreground/90 leading-relaxed">
              Get access to our advanced GPU virtualization stacks, self-healing clustering tech, and LLM FinOps frameworks to offer your customers cutting-edge AI acceleration.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
