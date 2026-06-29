import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SalesEnquiryForm } from "@/components/site/SalesEnquiryForm";
import { Mail, Phone, BarChart } from "lucide-react";

export const Route = createFileRoute("/sales-enquiry")({
  head: () => ({
    meta: [
      { title: "Contact Enterprise Sales — TrustGrid.AI" },
      { name: "description", content: "Contact TrustGrid.AI enterprise sales. Inquire about licensing, platform capabilities, compute sizing, and engagement quotes." },
      { property: "og:title", content: "Contact Enterprise Sales — TrustGrid.AI" },
      { property: "og:description", content: "Contact TrustGrid.AI sales for custom licensing, compute pricing, and service quotes." },
      { property: "og:url", content: "/sales-enquiry" },
    ],
    links: [{ rel: "canonical", href: "/sales-enquiry" }],
  }),
  component: SalesEnquiryPage,
});

function SalesEnquiryPage() {
  return (
    <>
      <PageHero
        eyebrow="Sales"
        title="Contact our enterprise sales team"
        description="Let's align on scaling requirements for your workloads. Speak to us about custom licenses for GPU-phi Orchestration, self-healing clustering software, and custom HPC support contracts."
      />
      <section className="mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-[1fr_400px] gap-12">
        <SalesEnquiryForm />
        <aside className="space-y-8">
          <div className="rounded-xl border border-border/60 bg-surface/30 p-6">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Purchase & Licensing</h3>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              We offer standard enterprise service agreements (SLA), developer support terms, volume node licensing discounts, and customized proof-of-concepts.
            </p>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3"><BarChart className="h-4 w-4 text-accent" /> Custom volume tier quotes</div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" />
                <a href="mailto:cs@trustgrid.in" className="hover:text-foreground transition-colors">cs@trustgrid.in</a>
              </div>
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-accent" /> SLA-backed callback support</div>
            </div>
          </div>
          <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-6">
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">Deployment Flexibility</h3>
            <p className="mt-3 text-sm text-foreground/90 leading-relaxed">
              All TrustGrid.AI software solutions support secure on-premises deployments, virtual private clouds (VPC), air-gapped secure installations, and fully managed SaaS options.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
