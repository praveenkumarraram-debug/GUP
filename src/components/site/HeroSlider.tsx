import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Zap,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SlideItem {
  attn: string;
  problem: string;
  outcome: string;
  cta: string;
  bgImage: string;
}

export interface SliderData {
  optimizedFor: string;
  slides: SlideItem[];
}

const slidersData: Record<string, SliderData> = {
  home: {
    optimizedFor: "AI Revenue Acceleration, Sales Velocity, Pipeline Growth, Revenue Operations",
    slides: [
      {
        attn: "CTOs & VPs of AI",
        problem: "You're bleeding compute budgets on AI infrastructure that wasn't built for modern scale or power demands.",
        outcome: "We transform experimental AI clusters into hyper-optimized engines, slashing infrastructure costs by 20–30% while boosting total AI output and ROI.",
        cta: "Book an Architecture Audit",
        bgImage: "/images/gpu_cluster_1_1781677642098.png",
      },
      {
        attn: "Head of ML Infrastructure",
        problem: "Your multi-million-dollar GPUs sit idle, choked by network and memory bottlenecks killing throughput.",
        outcome: "We unlock maximum FLOPS/Watt across your cluster, delivering a 2x–3x surge in training throughput on existing hardware—zero new CapEx.",
        cta: "Get My GPU Utilization Report",
        bgImage: "/images/slide_gpu_infra_bg.png",
      },
      {
        attn: "VP of Product & AI",
        problem: "Your LLMs ace demos but hallucinate, lag, or crash under real user load—destroying trust and revenue.",
        outcome: "We engineer production-grade RAG and Agent architectures achieving 99.9% uptime and cutting hallucination rates by 40–60%.",
        cta: "Scale My LLM Infrastructure",
        bgImage: "/images/slide_llm_bg.png",
      },
      {
        attn: "CISOs",
        problem: "Your AI models are a wide-open attack surface for adversarial and prompt-injection threats.",
        outcome: "We build a zero-trust AI perimeter that neutralizes 95%+ of adversarial inputs before they reach your model.",
        cta: "Schedule an AI Red Team Assessment",
        bgImage: "/images/slide_security_bg.png",
      },
      {
        attn: "Cloud Architects",
        problem: "Your data scientists wait on I/O bottlenecks and energy constraints instead of training models.",
        outcome: "We solve the holy trinity—Energy, I/O, and Memory—accelerating data pipelines by 10x and eliminating compute waste.",
        cta: "Optimize My AI Stack Now",
        bgImage: "/images/gpu_cluster_2_1781677654723.png",
      },
      {
        attn: "SRE Leads",
        problem: "Unpredictable AI behavior and silent model drift trigger cascade failures in production.",
        outcome: "We engineer self-healing AI pipelines guaranteeing 99.999% availability and auto-remediating failures in under 5 minutes.",
        cta: "Build Resilient AI Systems",
        bgImage: "/images/hero_infrastructure.png",
      },
      {
        attn: "Data Center Executives",
        problem: "Your GW-scale AI clusters threaten grid stability and fail strict ESG mandates.",
        outcome: "We design sustainable, carbon-aware AI campuses lowering PUE from 1.5 to sub-1.15 and saving 15–25% on energy costs.",
        cta: "Get an Energy Optimization Plan",
        bgImage: "/images/slide_gpu_infra_bg.png",
      },
      {
        attn: "Enterprise Leaders",
        problem: "AI vendors sell hype and black boxes—not deterministic, reliable results you can bank on.",
        outcome: "You get measurable, physics-backed AI performance delivering a 5x–10x ROI on infrastructure investment within 12 months.",
        cta: "Talk to a Principal Architect",
        bgImage: "/images/slide_enterprise_bg.png",
      },
    ],
  },
  gpu: {
    optimizedFor: "GPU Utilization, HPC Fabric, CUDA Kernels, AI Infrastructure ROI, GPUaaS",
    slides: [
      {
        attn: "CFOs & CTOs",
        problem: "You're paying premium GPU cycles that go completely unused—burning cash every hour.",
        outcome: "We maximize your GPU ROI by squeezing every last FLOP from your silicon, increasing effective FLOPS-per-dollar by 40–60%.",
        cta: "Maximize My GPU ROI",
        bgImage: "/images/gpu_cluster_1_1781677642098.png",
      },
      {
        attn: "HPC Architects",
        problem: "Network chatter and latency stall your 100,000+ GPU super-cluster builds.",
        outcome: "We deliver microsecond-latency HPC fabrics cutting inter-node communication overhead by 50–70% for true GPU Super Scaling.",
        cta: "Design My HPC Fabric",
        bgImage: "/images/slide_gpu_infra_bg.png",
      },
      {
        attn: "ML Engineers",
        problem: "Your massive models starve because memory bandwidth can't feed the compute beast.",
        outcome: "We re-architect tensor pipelines to feed data at maximum speed, boosting memory-bound workload speeds by 30–50%.",
        cta: "Get a Free Memory Audit",
        bgImage: "/images/gpu_cluster_2_1781677654723.png",
      },
      {
        attn: "Product Managers",
        problem: "Unacceptable inference latency is killing your real-time AI UX and user retention.",
        outcome: "We slash latency via advanced quantization and kernel tuning, reducing time-to-first-token by 40–60%.",
        cta: "Accelerate My Inference Engine",
        bgImage: "/images/ai_processor_node_1781677682371.png",
      },
      {
        attn: "Platform Engineers",
        problem: "You waste compute isolating single, low-utilization workloads on dedicated GPUs.",
        outcome: "We enable safe, high-density GPU multi-tenancy, boosting cluster utilization from 30% to 80%+ with zero noisy-neighbor risk.",
        cta: "Enable GPU Multi-Tenancy",
        bgImage: "/images/gpu_server_rack_1781677667839.png",
      },
      {
        attn: "AI Researchers",
        problem: "Off-the-shelf software fails to run your proprietary mathematical operations efficiently.",
        outcome: "We write custom CUDA and Triton kernels engineered for your math, accelerating specific ops by 5x–10x over baseline.",
        cta: "Discuss Custom Kernel Development",
        bgImage: "/images/gpu_cluster_1_1781677642098.png",
      },
      {
        attn: "Data Center Ops",
        problem: "Thermal throttling silently destroys training throughput without triggering a single alert.",
        outcome: "We implement intelligent power-capping eliminating 95% of thermal throttling events, sustaining peak frequency 24/7.",
        cta: "Prevent Thermal Throttling",
        bgImage: "/images/slide_gpu_infra_bg.png",
      },
      {
        attn: "Systems Architects",
        problem: "Your model parallelism fails because peer-to-peer memory access is misconfigured.",
        outcome: "We optimize NVLink and P2P interconnects achieving 90%+ scaling efficiency across your entire cluster.",
        cta: "Optimize My Interconnects",
        bgImage: "/images/gpu_cluster_2_1781677654723.png",
      },
    ],
  },
  llm: {
    optimizedFor: "RAG Architecture, AI Agents, LLM Production, Token Cost Reduction, Multi-Modal AI",
    slides: [
      {
        attn: "AI Product Leads",
        problem: "Your RAG systems retrieve garbage context, causing LLM failures in high-stakes production environments.",
        outcome: "We build high-fidelity RAG pipelines boosting retrieval precision by 30–50%, ensuring accurate, grounded, trustworthy answers.",
        cta: "Architect My RAG System",
        bgImage: "/images/slide_llm_bg.png",
      },
      {
        attn: "Innovation Teams",
        problem: "Your chatbots answer questions but can't take action or use tools—they're conversational dead-ends.",
        outcome: "We build autonomous, tool-calling AI agents resolving 80%+ of complex tasks without human intervention.",
        cta: "Build My AI Agents",
        bgImage: "/images/slide_agent_bg.png",
      },
      {
        attn: "Finance & AI Ops",
        problem: "Out-of-control API and token costs are bleeding your AI budget dry every month.",
        outcome: "We slash cost-per-token by 40–60% via semantic caching and intelligent small-model routing.",
        cta: "Reduce My Token Costs",
        bgImage: "/images/generative_ai.png",
      },
      {
        attn: "ML Teams",
        problem: "Full-parameter training is prohibitively expensive and slow for your domain-specific needs.",
        outcome: "We adapt foundational models with advanced LoRA/PEFT, cutting training compute costs by 80–90% with zero accuracy loss.",
        cta: "Explore Efficient Fine-Tuning",
        bgImage: "/images/slide_llm_bg.png",
      },
      {
        attn: "Compliance Officers",
        problem: "Your LLMs generate false or hallucinated information in regulated environments—legal and reputational suicide.",
        outcome: "We implement architecture-level guardrails reducing hallucination rates in high-stakes queries by 60–80%.",
        cta: "Stop AI Hallucinations",
        bgImage: "/images/slide_security_bg.png",
      },
      {
        attn: "Tech Strategists",
        problem: "Rigid, text-only models limit your product's market capabilities and user experience.",
        outcome: "We integrate seamless multi-modal routing processing text, audio, and vision with <100ms overhead.",
        cta: "Integrate Multi-Modal AI",
        bgImage: "/images/agentic_ai.png",
      },
      {
        attn: "NLP Engineers",
        problem: "You hit hard limits on how much context your models can actually process and utilize effectively.",
        outcome: "We engineer efficient extended context increasing effective utilization by 2x–4x without exponential memory drain.",
        cta: "Optimize My Context Windows",
        bgImage: "/images/slide_llm_bg.png",
      },
      {
        attn: "Software Engineers",
        problem: "Unpredictable, unstructured LLM outputs constantly break your downstream application APIs.",
        outcome: "We enforce strict JSON/XML schemas achieving 100% schema compliance, eliminating API-breaking errors forever.",
        cta: "Engineer Structured Outputs",
        bgImage: "/images/generative_ai.png",
      },
    ],
  },
  security: {
    optimizedFor: "AI Security, Adversarial Defense, LLM Firewall, Confidential Computing, Zero-Trust AI",
    slides: [
      {
        attn: "CISOs",
        problem: "Your AI models act as a wide-open, unprotected attack surface for sophisticated bad actors.",
        outcome: "We deploy a comprehensive adversarial defense strategy reducing your exploitable AI attack surface by 90%+.",
        cta: "Schedule an AI Threat Model",
        bgImage: "/images/slide_security_bg.png",
      },
      {
        attn: "Security Architects",
        problem: "Malicious users easily manipulate your customer-facing bots through prompt injection attacks.",
        outcome: "We deploy impenetrable LLM firewalls blocking 99% of injection attempts in real-time with <5ms latency overhead.",
        cta: "Deploy LLM Firewalls",
        bgImage: "/images/slide_security_bg.png",
      },
      {
        attn: "Privacy Officers",
        problem: "Sensitive raw data is exposed in plain text during the AI inference process—GDPR/HIPAA nightmare.",
        outcome: "We process data in fully encrypted memory (TEEs) ensuring 100% data privacy during inference with <10% performance hit.",
        cta: "Explore Confidential Computing",
        bgImage: "/images/slide_security_bg.png",
      },
      {
        attn: "IP Counsel & CTOs",
        problem: "Competitors or attackers are stealing or reverse-engineering your proprietary, million-dollar models.",
        outcome: "We protect your AI IP with cryptographic watermarking guaranteeing 99.9% extraction accuracy for legal proof of ownership.",
        cta: "Secure My Model IP",
        bgImage: "/images/slide_security_bg.png",
      },
      {
        attn: "DevSecOps",
        problem: "Hidden malware and backdoors lurk in your third-party HuggingFace and open-source models.",
        outcome: "We scan and clear your AI supply chain 10x faster, eliminating 99% of known dependency risks pre-deployment.",
        cta: "Audit My AI Dependencies",
        bgImage: "/images/slide_security_bg.png",
      },
      {
        attn: "Legal & Compliance",
        problem: "You risk massive regulatory fines if adversaries reconstruct private data from your model outputs.",
        outcome: "We implement mathematical differential privacy ensuring zero-exposure compliance with HIPAA/GDPR data extraction laws.",
        cta: "Implement Differential Privacy",
        bgImage: "/images/slide_security_bg.png",
      },
      {
        attn: "Network Security",
        problem: "You extend blind trust to ML API endpoints without proper authorization or encryption.",
        outcome: "We build a zero-trust AI architecture authenticating and encrypting 100% of inference traffic end-to-end.",
        cta: "Build a Zero-Trust AI API",
        bgImage: "/images/slide_security_bg.png",
      },
      {
        attn: "Risk Managers",
        problem: "You deploy neural networks with unknown adversarial vulnerabilities into production—playing Russian roulette.",
        outcome: "We proactively red-team your models identifying and patching 85%+ of hidden vulnerabilities before they go live.",
        cta: "Hire an AI Red Team",
        bgImage: "/images/slide_security_bg.png",
      },
    ],
  },
  infrastructure: {
    optimizedFor: "LLMOps, MLOps, GPU-Direct Storage, K8s for AI, Vector DB, AI FinOps",
    slides: [
      {
        attn: "VP of Engineering",
        problem: "Your legacy MLOps stacks crumble under the weight, speed, and scale of LLM workloads.",
        outcome: "We build modern LLMOps pipelines cutting model deployment cycles from weeks to hours with 99% automation.",
        cta: "Modernize My AI Pipeline",
        bgImage: "/images/hero_infrastructure.png",
      },
      {
        attn: "Data Center Executives",
        problem: "Your GW-scale AI compute growth outpaces power grid capacity and sustainability targets.",
        outcome: "We implement carbon-aware scheduling and DVFS tuning reducing campus power draw by 15–30% without compute loss.",
        cta: "Optimize My Energy Footprint",
        bgImage: "/images/slide_gpu_infra_bg.png",
      },
      {
        attn: "Storage Engineers",
        problem: "Slow storage I/O starves your multi-billion-parameter models during training checkpoints.",
        outcome: "We bypass legacy file systems with GPU-Direct Storage, accelerating checkpointing and data loading by 5x–10x.",
        cta: "Accelerate My Data I/O",
        bgImage: "/images/ai_infra.png",
      },
      {
        attn: "Infrastructure Leads",
        problem: "Clunky model partitioning destroys inference speed and wastes precious memory resources.",
        outcome: "We tune unified memory architectures reducing memory fragmentation by 40–60%, fitting larger batches on fewer GPUs.",
        cta: "Optimize GPU Memory Now",
        bgImage: "/images/gpu_cluster_1_1781677642098.png",
      },
      {
        attn: "Platform Ops",
        problem: "Standard Kubernetes fails to orchestrate distributed AI training and GPU scheduling effectively.",
        outcome: "We deploy AI-native K8s operators (KubeRay/TorchElastic) achieving 95%+ cluster utilization during massive training runs.",
        cta: "Deploy K8s for AI",
        bgImage: "/images/hero_infrastructure.png",
      },
      {
        attn: "Data Architects",
        problem: "Your vector databases choke, lag, and timeout under enterprise RAG traffic loads.",
        outcome: "We architect hyper-available vector infrastructure capable of sub-millisecond (<5ms) retrieval at 10,000+ QPS.",
        cta: "Scale My Vector DB",
        bgImage: "/images/long_memory.png",
      },
      {
        attn: "Systems Architects",
        problem: "Tightly coupled AI systems cause massive cascade failures when one node drops.",
        outcome: "We design event-driven microservices isolating failures instantly, preventing 99% of cascade crashes.",
        cta: "Design Event-Driven AI",
        bgImage: "/images/ai_infra.png",
      },
      {
        attn: "Finance & Cloud Ops",
        problem: "You waste millions on idle, unoptimized, un-terminated cloud GPU instances every quarter.",
        outcome: "We implement serverless GPU provisioning and auto-scaling eliminating 30–50% of cloud GPU waste, saving millions annually.",
        cta: "Run an AI FinOps Audit",
        bgImage: "/images/slide_enterprise_bg.png",
      },
    ],
  },
  reliability: {
    optimizedFor: "LLM Observability, Model Drift Detection, Self-Healing Pipelines, AI Chaos Engineering, XAI",
    slides: [
      {
        attn: "SRE Leads",
        problem: "You operate AI in production completely blind, unable to trace why it makes bad decisions.",
        outcome: "We implement total LLM observability with token-level tracing, cutting root-cause debug time by 80%.",
        cta: "Implement LLM Observability",
        bgImage: "/images/hero_infrastructure.png",
      },
      {
        attn: "ML Ops Managers",
        problem: "Silent model drift degrades accuracy, costing customer trust before anyone notices the bleed.",
        outcome: "We deploy real-time statistical detection catching data drift 24–48 hours before it impacts business metrics.",
        cta: "Deploy Drift Detection",
        bgImage: "/images/slide_llm_bg.png",
      },
      {
        attn: "DevOps Directors",
        problem: "Your team manually firefights degrading AI accuracy instead of shipping new features.",
        outcome: "We build automated, self-healing CI/CD pipelines reducing model degradation recovery time from days to <15 minutes.",
        cta: "Build Self-Healing Pipelines",
        bgImage: "/images/ai_infra.png",
      },
      {
        attn: "Resilience Engineers",
        problem: "You live in fear of multi-node AI systems breaking unpredictably under high load.",
        outcome: "We run proactive AI chaos engineering proving your system survives 95%+ of simulated node and network failures.",
        cta: "Engineer AI Chaos Resilience",
        bgImage: "/images/slide_gpu_infra_bg.png",
      },
      {
        attn: "Business Stakeholders",
        problem: "Vague AI performance guarantees create massive, unquantified business risk.",
        outcome: "We enforce strict, measurable AI SLAs backed by automated circuit breakers, keeping error rates below 0.01%.",
        cta: "Define AI SLAs/SLOs",
        bgImage: "/images/slide_enterprise_bg.png",
      },
      {
        attn: "QA Directors",
        problem: "Unseen edge cases in your AI cause catastrophic, public-facing production failures.",
        outcome: "We safely stress-test your AI discovering 5x more edge-case failures than traditional testing methods.",
        cta: "Stress Test My AI",
        bgImage: "/images/hero_infrastructure.png",
      },
      {
        attn: "Data Governance",
        problem: "Upstream data poisoning silently corrupts your models without triggering a single alarm.",
        outcome: "We deploy impenetrable validation frameworks blocking 99.9% of poisoned or anomalous data before training begins.",
        cta: "Secure My Data Quality",
        bgImage: "/images/long_memory.png",
      },
      {
        attn: "Compliance & Legal",
        problem: '"Black box" AI models block your regulatory approval and internal audits.',
        outcome: "We implement Explainable AI (XAI) generating automated, audit-ready reports for 100% of AI decisions.",
        cta: "Implement XAI Frameworks",
        bgImage: "/images/slide_security_bg.png",
      },
    ],
  },
};

const SLIDE_DURATION = 2000;

export function HeroSlider({
  type,
}: {
  type: "home" | "gpu" | "llm" | "security" | "infrastructure" | "reliability";
}) {
  const data = slidersData[type];
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  const clearAll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  }, []);

  const startCycle = useCallback(() => {
    clearAll();
    setProgress(0);
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (50 / SLIDE_DURATION) * 100, 100));
    }, 50);
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % data.slides.length);
      setProgress(0);
    }, SLIDE_DURATION);
  }, [clearAll, data.slides.length]);

  useEffect(() => {
    if (isPlaying) {
      startCycle();
    } else {
      clearAll();
      setProgress(0);
    }
    return clearAll;
  }, [isPlaying, startCycle, clearAll]);

  const goTo = (idx: number) => {
    setIndex(idx);
    setIsPlaying(false);
    setProgress(0);
  };

  const prev = () => goTo((index - 1 + data.slides.length) % data.slides.length);
  const next = () => goTo((index + 1) % data.slides.length);

  const slide = data.slides[index];

  return (
    <section className="w-full bg-white border-b border-border/30">

      {/* ── Slide card — PPT 16:9 proportioned, fixed height ── */}
      <div className="relative w-full h-[420px] md:h-[500px] overflow-hidden bg-slate-50">

        {/* Background image — no zoom, no animation, contain within bounds */}
        <img
          key={index}
          src={slide.bgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.50 }}
          draggable={false}
        />

        {/* Subtle white overlay for readability */}
        <div className="absolute inset-0 bg-white/40" />

        {/* Controls removed as requested */}

        {/* Slide content — no motion, no AnimatePresence */}
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-14 lg:px-20 py-10 max-w-6xl mx-auto">

          {/* ATTN + Role */}
          <div className="mb-5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 mb-3">
              <Zap className="h-2.5 w-2.5 text-primary" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary">ATTN</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 font-display leading-tight tracking-tight">
              {slide.attn}
            </h2>
          </div>

          {/* Problem + Outcome panels */}
          <div className="grid md:grid-cols-2 gap-3 md:gap-4 mb-5">

            {/* Problem */}
            <div className="p-4 md:p-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-3.5 w-3.5 text-red-500 shrink-0" />
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-red-500 font-mono">The Problem</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {slide.problem}
              </p>
            </div>

            {/* Outcome */}
            <div className="p-4 md:p-5">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-600 font-mono">The Outcome</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-semibold">
                {slide.outcome}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div>
            <Link
              to="/contact"
              search={{ subject: `Consultation for ${slide.attn}`, cta: slide.cta }}
            >
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white font-semibold text-xs rounded-lg shadow-sm px-5 py-2 flex items-center gap-1.5 transition-colors"
              >
                {slide.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Role tabs + dot indicators — below the card ── */}
      <div className="w-full bg-white border-t border-border/20 px-6 md:px-14 lg:px-20 py-3 max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4 flex-wrap">

          {/* Role pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {data.slides.map((s, idx) => (
              <button
                key={s.attn}
                onClick={() => goTo(idx)}
                className={`px-3 py-1 rounded-full border text-[10px] font-semibold transition-colors ${
                  idx === index
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600"
                }`}
              >
                {s.attn.split(" & ")[0].split(" / ")[0]}
              </button>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-1.5">
            {data.slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`rounded-full transition-all duration-200 ${
                  idx === index
                    ? "w-6 h-1.5 bg-primary"
                    : "w-1.5 h-1.5 bg-slate-200 hover:bg-slate-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
