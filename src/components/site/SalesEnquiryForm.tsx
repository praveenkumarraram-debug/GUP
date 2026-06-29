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
  jobTitle: z.string().trim().min(2, "Required").max(150),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(30).optional(),
  productOfInterest: z.enum([
    "GPU-phi Orchestration",
    "GPU FinOps Dashboard",
    "Self-Healing Clusters",
    "GPU Super Scaling",
    "LLM/RAG Optimization",
    "AI Cybersecurity"
  ], { message: "Please select a product or service" }),
  companySize: z.enum([
    "1-50",
    "51-200",
    "201-1000",
    "1000+"
  ], { message: "Please select your company size" }),
  gpuCount: z.enum([
    "None / Not Applicable",
    "1-8 GPUs",
    "8-32 GPUs",
    "32-128 GPUs",
    "128+ GPUs"
  ]).optional(),
  enquiryDetails: z.string().trim().min(20, "Tell us more details about your enquiry (min. 20 chars)").max(2000),
});

type FormData = z.infer<typeof schema>;

async function sendLeadToSheet(data: FormData) {
  const payload = [{
    type: "SalesEnquiryForm",
    timestamp: new Date().toISOString(),
    payload: {
      SubmittedAt: new Date().toISOString(),
      FullName: data.name,
      Company: data.company,
      JobTitle: data.jobTitle,
      WorkEmail: data.email,
      Phone: data.phone || "",
      ProductOfInterest: data.productOfInterest,
      CompanySize: data.companySize,
      GPUCount: data.gpuCount || "None / Not Applicable",
      ProjectDescription: data.enquiryDetails,
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
      Status: "New Sales Enquiry",
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

export function SalesEnquiryForm() {
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
        <h3 className="mt-4 text-2xl font-semibold text-gradient">Enquiry Submitted</h3>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          Your enquiry has been routed to our enterprise accounts division. An executive will prepare sizing guidelines and get back to you within 12 hours.
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
          <Input {...register("name")} className="bg-background border-border" placeholder="Marcus Vance" />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <Input {...register("company")} className="bg-background border-border" placeholder="Synthetix AI" />
        </Field>
        <Field label="Job Title" error={errors.jobTitle?.message}>
          <Input {...register("jobTitle")} className="bg-background border-border" placeholder="Director of Infrastructure" />
        </Field>
        <Field label="Work Email" error={errors.email?.message}>
          <Input {...register("email")} type="email" className="bg-background border-border" placeholder="marcus@synthetix.ai" />
        </Field>

        <Field label="Phone" error={errors.phone?.message}>
          <Input {...register("phone")} className="bg-background border-border" placeholder="+1 555 222 3333" />
        </Field>

        <Field label="Product of Interest" error={errors.productOfInterest?.message}>
          <select
            {...register("productOfInterest")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            <option value="" className="bg-surface text-muted-foreground">Select a product/service...</option>
            <option value="GPU-phi Orchestration" className="bg-surface text-foreground">GPU-phi Cloud Neutral Orchestration</option>
            <option value="GPU FinOps Dashboard" className="bg-surface text-foreground">GPU FinOps & Cost Dashboard</option>
            <option value="Self-Healing Clusters" className="bg-surface text-foreground">Self-Healing GPU Clusters</option>
            <option value="GPU Super Scaling" className="bg-surface text-foreground">GPU Super Scaling Services</option>
            <option value="LLM/RAG Optimization" className="bg-surface text-foreground">LLM/RAG Optimization Stack</option>
            <option value="AI Cybersecurity" className="bg-surface text-foreground">AI Lifecycle Cybersecurity</option>
          </select>
        </Field>

        <Field label="Company Size" error={errors.companySize?.message}>
          <select
            {...register("companySize")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            <option value="" className="bg-surface text-muted-foreground">Select company size...</option>
            <option value="1-50" className="bg-surface text-foreground">1 - 50 employees</option>
            <option value="51-200" className="bg-surface text-foreground">51 - 200 employees</option>
            <option value="201-1000" className="bg-surface text-foreground">201 - 1000 employees</option>
            <option value="1000+" className="bg-surface text-foreground">1000+ employees</option>
          </select>
        </Field>

        <Field label="Expected GPU Node Count" error={errors.gpuCount?.message}>
          <select
            {...register("gpuCount")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            <option value="None / Not Applicable" className="bg-surface text-foreground">None / Not Applicable</option>
            <option value="1-8 GPUs" className="bg-surface text-foreground">1 - 8 GPUs</option>
            <option value="8-32 GPUs" className="bg-surface text-foreground">8 - 32 GPUs</option>
            <option value="32-128 GPUs" className="bg-surface text-foreground">32 - 128 GPUs</option>
            <option value="128+ GPUs" className="bg-surface text-foreground">128+ GPUs</option>
          </select>
        </Field>
      </div>

      <Field label="Enquiry Details" error={errors.enquiryDetails?.message}>
        <Textarea
          {...register("enquiryDetails")}
          className="bg-background border-border min-h-32"
          placeholder="Please details your purchase requirements, technical criteria, timeline to acquire, or other details relevant to our sales engineering team."
        />
      </Field>

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium glow-primary group w-full md:w-auto"
      >
        {submitting ? "Sending Enquiry..." : "Submit Sales Enquiry"}
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
