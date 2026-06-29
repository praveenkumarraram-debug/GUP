import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ANALYTICS_CONFIG } from "@/lib/analytics/index";

const schema = z.object({
  name: z.string().trim().min(2, "Required").max(100),
  company: z.string().trim().min(2, "Required").max(150),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(30).optional(),
  partnerType: z.enum([
    "Technology Partner",
    "System Integrator",
    "Referral / Affiliate",
    "Academic / Research",
    "Other"
  ], { message: "Please select partnership type" }),
  website: z.string().trim().min(4, "Required").max(255),
  collaborationScope: z.string().trim().min(30, "Please describe the scope in more detail (min. 30 chars)").max(2000),
});

type FormData = z.infer<typeof schema>;

async function sendLeadToSheet(data: FormData) {
  const payload = [{
    type: "PartnershipForm",
    timestamp: new Date().toISOString(),
    payload: {
      SubmittedAt: new Date().toISOString(),
      FullName: data.name,
      Company: data.company,
      WorkEmail: data.email,
      Phone: data.phone || "",
      PartnerType: data.partnerType,
      CompanyWebsite: data.website,
      ProjectDescription: data.collaborationScope,
      PageURL: window.location.href,
      Referrer: document.referrer || "Direct",
      UTMSource: new URLSearchParams(window.location.search).get("utm_source") || "",
      UTMMedium: new URLSearchParams(window.location.search).get("utm_medium") || "",
      UTMCampaign: new URLSearchParams(window.location.search).get("utm_campaign") || "",
      SessionID: sessionStorage.getItem("tg_session_id") || "",
      VisitorID: localStorage.getItem("tg_visitor_id") || "",
      DeviceType: /mobile/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
      Browser: navigator.userAgent.includes("Chrome") ? "Chrome" : navigator.userAgent.includes("Firefox") ? "Firefox" : "Other",
      LeadScore: sessionStorage.getItem("tg_lead_score") || "0",
      IntentScore: sessionStorage.getItem("tg_intent_score") || "0",
      Status: "New Partner Request",
    },
  }];

  try {
    await fetch(ANALYTICS_CONFIG.ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      redirect: "follow",
      body: JSON.stringify(payload),
    });
  } catch {
    const encoded = encodeURIComponent(JSON.stringify(payload));
    const img = new Image();
    img.src = `${ANALYTICS_CONFIG.ENDPOINT}?data=${encoded}`;
  }
}

export function PartnershipForm() {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await sendLeadToSheet(data);
    } catch {
      // Don't block user if analytics fails
    }
    setSubmitting(false);
    setDone(true);
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border border-primary/30 bg-surface/40 p-10 text-center"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
        <h3 className="mt-4 text-2xl font-semibold text-gradient">Application Received</h3>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          Thank you for applying to the TrustGrid.AI Partner Network. A member of our ecosystem team will review your proposal and contact you within two business days.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border border-border/60 bg-surface/40 backdrop-blur p-6 md:p-10 space-y-5"
    >
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Full Name" error={errors.name?.message}>
          <Input {...register("name")} className="bg-background border-border" placeholder="Sarah Jenkins" />
        </Field>
        <Field label="Company / Organization" error={errors.company?.message}>
          <Input {...register("company")} className="bg-background border-border" placeholder="Apex Integration Group" />
        </Field>
        <Field label="Work Email" error={errors.email?.message}>
          <Input {...register("email")} type="email" className="bg-background border-border" placeholder="sjenkins@apex.com" />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <Input {...register("phone")} className="bg-background border-border" placeholder="+1 555 987 6543" />
        </Field>

        <Field label="Partnership Type" error={errors.partnerType?.message}>
          <select
            {...register("partnerType")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            <option value="" className="bg-surface text-muted-foreground">Select partnership type...</option>
            <option value="Technology Partner" className="bg-surface text-foreground">Technology / Software Vendor</option>
            <option value="System Integrator" className="bg-surface text-foreground">System Integrator & Consultative Partner</option>
            <option value="Referral / Affiliate" className="bg-surface text-foreground">Referral or Affiliate Partner</option>
            <option value="Academic / Research" className="bg-surface text-foreground">Academic / Research Institution</option>
            <option value="Other" className="bg-surface text-foreground">Other / Custom Relationship</option>
          </select>
        </Field>

        <Field label="Company Website" error={errors.website?.message}>
          <Input {...register("website")} className="bg-background border-border" placeholder="https://apexintegration.com" />
        </Field>
      </div>

      <Field label="Proposed Scope of Collaboration" error={errors.collaborationScope?.message}>
        <Textarea
          {...register("collaborationScope")}
          className="bg-background border-border min-h-32"
          placeholder="Please describe how your organization wants to align with TrustGrid.AI. Mention any current customer demands, mutual integration opportunities, or co-selling plans."
        />
      </Field>

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium glow-primary group w-full md:w-auto"
      >
        {submitting ? "Submitting Request..." : "Apply for Partnership"}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5 animate-fade-in-up">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
