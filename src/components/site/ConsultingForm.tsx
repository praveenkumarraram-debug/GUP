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
  consultingArea: z.enum([
    "GPU Optimization",
    "LLM / Agentic Systems",
    "AI Infrastructure",
    "AI Cybersecurity",
    "General AI Strategy"
  ], { message: "Please select an area" }),
  timeline: z.enum([
    "Immediate",
    "1-3 Months",
    "3-6 Months",
    "Planning / Discovery"
  ], { message: "Please select a timeline" }),
  budget: z.enum([
    "< $50k",
    "$50k - $200k",
    "$200k - $500k",
    "$500k+"
  ], { message: "Please select a budget range" }),
  technicalStack: z.string().trim().min(20, "Tell us a bit more about your tech stack (min. 20 chars)").max(2000),
});

type FormData = z.infer<typeof schema>;

async function sendLeadToSheet(data: FormData) {
  const payload = [{
    type: "ConsultingForm",
    timestamp: new Date().toISOString(),
    payload: {
      SubmittedAt: new Date().toISOString(),
      FullName: data.name,
      Company: data.company,
      WorkEmail: data.email,
      Phone: data.phone || "",
      ConsultingArea: data.consultingArea,
      Timeline: data.timeline,
      ProjectBudget: data.budget,
      ProjectDescription: data.technicalStack,
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
      Status: "New Consulting Lead",
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

export function ConsultingForm() {
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
        <h3 className="mt-4 text-2xl font-semibold text-gradient">Session Requested</h3>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          An enterprise AI consulting architect from TrustGrid.AI will review your technical stack details and contact you within one business day to align on a strategy agenda.
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
          <Input {...register("name")} className="bg-background border-border" placeholder="Alex Rivera" />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <Input {...register("company")} className="bg-background border-border" placeholder="NeuralTech Systems" />
        </Field>
        <Field label="Work Email" error={errors.email?.message}>
          <Input {...register("email")} type="email" className="bg-background border-border" placeholder="alex@neuraltech.com" />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <Input {...register("phone")} className="bg-background border-border" placeholder="+1 555 123 4567" />
        </Field>

        <Field label="Consulting Focus Area" error={errors.consultingArea?.message}>
          <select
            {...register("consultingArea")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            <option value="" className="bg-surface text-muted-foreground">Select focus area...</option>
            <option value="GPU Optimization" className="bg-surface text-foreground">GPU Optimization & Orchestration</option>
            <option value="LLM / Agentic Systems" className="bg-surface text-foreground">LLM / Agentic Systems Engineering</option>
            <option value="AI Infrastructure" className="bg-surface text-foreground">AI Infrastructure & FinOps</option>
            <option value="AI Cybersecurity" className="bg-surface text-foreground">AI Cybersecurity & Trust</option>
            <option value="General AI Strategy" className="bg-surface text-foreground">General AI Strategy & Advisory</option>
          </select>
        </Field>

        <Field label="Project Timeline" error={errors.timeline?.message}>
          <select
            {...register("timeline")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            <option value="" className="bg-surface text-muted-foreground">Select timeline...</option>
            <option value="Immediate" className="bg-surface text-foreground">Immediate (&lt; 1 month)</option>
            <option value="1-3 Months" className="bg-surface text-foreground">1 to 3 Months</option>
            <option value="3-6 Months" className="bg-surface text-foreground">3 to 6 Months</option>
            <option value="Planning / Discovery" className="bg-surface text-foreground">Planning & Discovery Stage</option>
          </select>
        </Field>
      </div>

      <Field label="Estimated Budget Range" error={errors.budget?.message}>
        <select
          {...register("budget")}
          className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          <option value="" className="bg-surface text-muted-foreground">Select estimated budget...</option>
          <option value="< $50k" className="bg-surface text-foreground">&lt; $50k</option>
          <option value="$50k - $200k" className="bg-surface text-foreground">$50k - $200k</option>
          <option value="$200k - $500k" className="bg-surface text-foreground">$200k - $500k</option>
          <option value="$500k+" className="bg-surface text-foreground">$500k+ (Enterprise Tier)</option>
        </select>
      </Field>

      <Field label="Technical Stack & Current Challenges" error={errors.technicalStack?.message}>
        <Textarea
          {...register("technicalStack")}
          className="bg-background border-border min-h-32"
          placeholder="Please describe your current compute infrastructure, models in use, latency requirements, and the primary bottlenecks you want to address."
        />
      </Field>

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium glow-primary group w-full md:w-auto"
      >
        {submitting ? "Scheduling..." : "Request Consulting Session"}
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
