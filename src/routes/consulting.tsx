import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ConsultingForm } from "@/components/site/ConsultingForm";
import { Mail, Phone, Globe2 } from "lucide-react";

export const Route = createFileRoute("/consulting")({
  head: () => ({
    meta: [
      { title: "Enterprise AI Consulting Strategy Session — TrustGrid.AI" },
      { name: "description", content: "Schedule an AI engineering and capability consulting strategy session with TrustGrid.AI principal architects." },
      { property: "og:title", content: "Enterprise AI Consulting Strategy Session — TrustGrid.AI" },
      { property: "og:description", content: "Schedule a strategy session with TrustGrid.AI principal engineering architects." },
      { property: "og:url", content: "/consulting" },
    ],
    links: [{ rel: "canonical", href: "/consulting" }],
  }),
  component: ConsultingPage,
});

function ConsultingPage() {
  return (
    <>
      <PageHero
        eyebrow="Consulting"
        title="Schedule a custom AI consulting session"
        description="Connect with our principal systems engineers for a detailed architecture review. We analyze compute topologies, model execution parameters, and pipeline bottlenecks to streamline your AI operations."
      />
      <section className="mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-[1fr_400px] gap-12">
        <ConsultingForm />
        <aside className="space-y-8">
          <div className="rounded-xl border border-border/60 bg-surface/30 p-6">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Strategy Alignment</h3>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              Every session is conducted under a mutual non-disclosure agreement (NDA) and is designed to provide actionable, systems-level optimization recommendations.
            </p>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3"><Globe2 className="h-4 w-4 text-accent" /> Custom optimization audit</div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" />
                <a href="mailto:connect@trustgrid.ai" className="hover:text-foreground transition-colors">connect@trustgrid.ai</a>
              </div>
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-accent" /> 24-hour response SLA</div>
            </div>
          </div>
          <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-6">
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">Expertise Profile</h3>
            <p className="mt-3 text-sm text-foreground/90 leading-relaxed">
              Led by veteran systems architects with track records across Exascale supercomputing, custom Triton/CUDA kernel compilation, and Zero-Trust AI governance.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
