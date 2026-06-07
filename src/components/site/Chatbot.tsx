import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RefreshCw,
  Bot,
  User,
  Terminal,
  ChevronRight,
  Paperclip,
  FileText,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  links?: { label: string; to: string }[];
  suggestions?: string[];
  isStreaming?: boolean;
}

interface ResponseEntry {
  keywords: string[];
  response: string;
  suggestions: string[];
  links?: { label: string; to: string }[];
}

const RESPONSE_DATABASE: ResponseEntry[] = [
  {
    keywords: ["gpu", "cuda", "kernel", "tuning", "hardware", "performance", "throughput", "concurrency", "optimization"],
    response: "At TrustGrid.AI, we optimize GPU workloads at the lowest layers. We empower enterprises to achieve peak hardware efficiency, delivering up to **3-15x performance gains** and **40-75% cost reduction** through:\n\n* **White-Box Optimization**: Transparent custom CUDA kernels, advanced CUDA stream concurrency, and TensorRT graph fusion.\n* **Black-Box Optimization**: Autonomous workload profiling, tuning, and cluster orchestration.\n\nWould you like to read about our GPU Optimization capabilities?",
    suggestions: ["What about cloud GPUs?", "LLM Optimization", "Book strategy session"],
    links: [
      { label: "View Capabilities", to: "/capabilities" },
      { label: "GPU Offerings", to: "/offerings" },
    ],
  },
  {
    keywords: ["gpu-phi", "phi", "cloud", "ray", "kubernetes", "k8s", "orchestration", "multi-cloud", "scheduler", "platform"],
    response: "**GPU-phi** is our proprietary, cloud-neutral multi-cluster orchestration platform. It transforms fragmented multi-cloud deployments into a unified AI factory.\n\nKey features include:\n* **Automated cost-aware scheduling** and instance selection policies.\n* **Advanced GPU autoscaling** integrated with Kubernetes and Ray.\n* **Cross-region workload mobility** with zero lock-in.\n* **Multi-tenant resource isolation** and strict priority queuing.\n\nIt typically reduces infrastructure spend by **50%+** with zero downtime.",
    suggestions: ["How do we integrate?", "Energy Optimization", "Contact an Engineer"],
    links: [
      { label: "Explore GPU-phi Platform", to: "/platform" },
      { label: "Solutions Overview", to: "/solutions" },
    ],
  },
  {
    keywords: ["llm", "quantization", "lora", "qlora", "fine-tune", "finetuning", "rag", "transformer", "token", "inference"],
    response: "We specialize in custom Large Language Model (LLM) Optimization to drastically compress memory footprint and accelerate inference speeds. Typically, we deliver:\n\n* **80% reduction** in cost per token.\n* **70% faster** inference latency.\n* **60% smaller** memory footprint using advanced INT8/FP16/AWQ quantization.\n* **PEFT/LoRA/QLoRA** deployment setups optimized for on-premise foundation models.\n* **High-performance RAG pipeline** acceleration and context-window memory management.",
    suggestions: ["GPU Optimization", "AI Security", "Book strategy session"],
    links: [
      { label: "LLM Solutions", to: "/solutions" },
      { label: "Services Portfolio", to: "/offerings" },
    ],
  },
  {
    keywords: ["network", "infiniband", "rdma", "nvlink", "latency", "fabric", "topology", "congestion", "data center"],
    response: "For massive AI cluster scaling, networking is often the bottleneck. TrustGrid.AI designs and optimizes high-performance fabrics to deliver **sub-microsecond network latency** at multi-megawatt scale.\n\nWe provide:\n* **RDMA over InfiniBand** network architecture design.\n* **NVLink topology optimization** to maximize multi-node GPU communications.\n* **AI-driven routing controllers** and traffic management layers to prevent packet loss.\n* **Adaptive network reflex layers** that make fabrics self-healing.",
    suggestions: ["Energy Efficiency", "GPU-phi Platform", "Book strategy session"],
    links: [{ label: "Core Capabilities", to: "/capabilities" }],
  },
  {
    keywords: ["energy", "esg", "sustainability", "power", "carbon", "green", "liquid", "cooling", "thermal"],
    response: "Scaling AI shouldn't conflict with green initiatives. TrustGrid.AI drives sustainable AI engineering to help enterprises cut datacenter power consumption by **30%** and meet strict ESG compliance guidelines:\n\n* **Energy-Aware Scheduling**: Algorithmic workload time-shifting to run intensive jobs during off-peak power grid hours.\n* **Dynamic Power Capping**: Power profiling and advanced thermal mapping.\n* **Liquid Cooling**: Complete integration with liquid-cooled infrastructure.\n* **ESG Compliance Suites**: Real-time carbon footprint metrics and audit-ready reporting.",
    suggestions: ["GPU-phi Platform", "What's the cost?", "Contact Us"],
    links: [{ label: "About TrustGrid", to: "/about" }],
  },
  {
    keywords: ["security", "safety", "governance", "audit", "secure", "protection", "compliance", "vulnerability", "leak"],
    response: "Enterprise AI demands airtight security. We integrate advanced security frameworks across the infrastructure stack:\n\n* **Model Guardrails**: Automated input/output validation, prompt injection prevention, and PII protection.\n* **Secure Infrastructure**: Zero-Trust network segmentation and secure multi-tenant isolation.\n* **Regulatory Compliance**: Building systems ready for SOC2, HIPAA, and EU AI Act auditing.\n\nAll of our engineering deployments undergo comprehensive internal security reviews.",
    suggestions: ["LLM Optimization", "Book strategy session", "Capabilities"],
    links: [{ label: "Browse Services", to: "/offerings" }],
  },
  {
    keywords: ["price", "cost", "billing", "fee", "free", "hire", "consult", "strategy", "engagement", "nda", "rate"],
    response: "Every enterprise collaboration with TrustGrid.AI begins with a tailored **48-hour capability assessment** led by our Principal Engineers.\n\n* All consultations are conducted under a mutual Non-Disclosure Agreement (NDA).\n* We focus on creating clear ROI-driven outcomes (lowering GPU waste, accelerating model deployments).\n* Direct contact is available via email at **enterprise@trustgrid.ai** or through our Booking page.\n\nWould you like to schedule a strategy session now?",
    suggestions: ["Book strategy session", "What services do you offer?", "About the company"],
    links: [{ label: "Go to Contact", to: "/contact" }],
  },
  {
    keywords: ["about", "who", "team", "company", "location", "headquarter", "headquarters", "office", "delivery"],
    response: "TrustGrid.AI is a Full-Spectrum AI Engineering Company. We serve Fortune 500 organizations, government institutions, and high-performance labs across 20+ regulated industries.\n\n* **5 Global Delivery Centers**: Continuous follow-the-sun engineering support.\n* **Principal-Led Teams**: We assign senior engineers with actual scale experience to every engagement.\n* **Audit-Ready Systems**: Every line of code and network configuration is documented and hardened.",
    suggestions: ["View Capabilities", "Book strategy session", "How do you optimize LLMs?"],
    links: [{ label: "About Us", to: "/about" }],
  },
  {
    keywords: ["contact", "email", "phone", "support", "address", "reach", "talk", "sales"],
    response: "You can reach the TrustGrid.AI team in several ways:\n\n* **Direct Email**: [enterprise@trustgrid.ai](mailto:enterprise@trustgrid.ai)\n* **Global Support**: 24/7 client-accessible emergency channels.\n* **Consultation Request**: Complete our interactive form on the Contact page, and a principal engineer will review it within 48 hours.",
    suggestions: ["Book consultation now", "What is GPU-phi?", "GPU optimization"],
    links: [{ label: "Contact Form", to: "/contact" }],
  },
];

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  sender: "bot",
  text: "Hello! I am the **GridOS Architect**, your interactive guide to TrustGrid.AI.\n\nI can answer technical questions about GPU low-level optimizations, our GPU-phi platform, high-throughput network configurations, AI security, or help you book an enterprise consultation.\n\nWhat are you engineering today?",
  suggestions: ["GPU performance tuning", "What is GPU-phi?", "Accelerating LLMs", "Book strategy session"],
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, streamingText]);

  // Handle typing simulation
  const simulateBotResponse = (targetText: string, links?: { label: string; to: string }[], suggestions?: string[]) => {
    setIsTyping(true);

    // Simulate "thinking" time
    setTimeout(() => {
      setIsTyping(false);
      const newMsgId = Math.random().toString(36).substring(7);
      setStreamingMessageId(newMsgId);
      setStreamingText("");

      let index = 0;
      const interval = setInterval(() => {
        if (index < targetText.length) {
          setStreamingText((prev) => prev + targetText.charAt(index));
          index++;
        } else {
          clearInterval(interval);
          // Add finalized message to history
          setMessages((prev) => [
            ...prev,
            {
              id: newMsgId,
              sender: "bot",
              text: targetText,
              links,
              suggestions,
            },
          ]);
          setStreamingMessageId(null);
          setStreamingText("");
        }
      }, 8); // Fast, streaming effect
    }, 600);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAttachedFile(file);
    // Reset so the same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = (text: string) => {
    const hasFile = !!attachedFile;
    if (!text.trim() && !hasFile) return;
    if (isTyping || streamingMessageId) return;

    // Build display text
    const displayText = hasFile
      ? text.trim()
        ? `${text.trim()} [📎 ${attachedFile!.name}]`
        : `[📎 ${attachedFile!.name}]`
      : text;

    // Add user message
    const userMsgId = Math.random().toString(36).substring(7);
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, sender: "user", text: displayText },
    ]);
    setInputValue("");
    setAttachedFile(null);

    // If only a file was sent with no text, trigger a dedicated file response
    if (hasFile && !text.trim()) {
      simulateBotResponse(
        `I've received your file **${attachedFile!.name}**. Our engineering team can analyse it as part of your consultation.\n\nFor a formal review, share it via our secure contact form or email **enterprise@trustgrid.ai** — a Principal Engineer will respond within 48 hours.`,
        [{ label: "Open Contact Form", to: "/contact" }],
        ["Book strategy session", "GPU optimization", "LLM Engineering"]
      );
      return;
    }

    // If file attached with text, prepend a short ack before normal routing
    if (hasFile) {
      simulateBotResponse(
        `File **${attachedFile!.name}** noted. Routing your query now…`,
        undefined,
        undefined
      );
      // Small delay then route the text query as normal
      setTimeout(() => {
        const cleanInput = text.toLowerCase().trim();
        for (const entry of RESPONSE_DATABASE) {
          if (entry.keywords.some((kw) => cleanInput.includes(kw))) {
            simulateBotResponse(entry.response, entry.links, entry.suggestions);
            return;
          }
        }
        simulateBotResponse(
          "I can assist with specialized inquiries regarding:\n\n* **GPU Optimization** (kernel tuning, CUDA stream concurrency)\n* **GPU-phi Platform** (multi-cloud Ray/K8s orchestrator)\n* **LLM Engineering** (quantization, PEFT/LoRA models)\n* **Sub-microsecond Fabrics** (InfiniBand/RDMA networks)\n* **Sustainability** (energy-aware workload time-shifting)\n\nCould you specify which of these domains you'd like to explore?",
          [{ label: "Browse Offerings", to: "/offerings" }, { label: "Contact Us", to: "/contact" }],
          ["GPU performance tuning", "What is GPU-phi?", "Accelerating LLMs", "Book strategy session"]
        );
      }, 900);
      return;
    }

    // Search response database
    const cleanInput = text.toLowerCase().trim();
    let matched = false;

    for (const entry of RESPONSE_DATABASE) {
      if (entry.keywords.some((kw) => cleanInput.includes(kw))) {
        simulateBotResponse(entry.response, entry.links, entry.suggestions);
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Fallback response
      const fallbackText =
        "I can assist with specialized inquiries regarding:\n\n* **GPU Optimization** (kernel tuning, CUDA stream concurrency)\n* **GPU-phi Platform** (multi-cloud Ray/K8s orchestrator)\n* **LLM Engineering** (quantization, PEFT/LoRA models)\n* **Sub-microsecond Fabrics** (InfiniBand/RDMA networks)\n* **Sustainability** (energy-aware workload time-shifting)\n\nCould you specify which of these domains you'd like to explore?";
      simulateBotResponse(
        fallbackText,
        [
          { label: "Browse Offerings", to: "/offerings" },
          { label: "Contact Us", to: "/contact" },
        ],
        ["GPU performance tuning", "What is GPU-phi?", "Accelerating LLMs", "Book strategy session"]
      );
    }
  };

  const handleReset = () => {
    if (isTyping || streamingMessageId) return;
    setMessages([WELCOME_MESSAGE]);
    setStreamingText("");
    setStreamingMessageId(null);
  };

  // Helper to convert simple markdown (bold, bullets, links) to HTML nodes safely
  const formatMessageText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      let content: React.ReactNode = line;

      // Handle bullet lists
      const isBullet = line.trim().startsWith("* ") || line.trim().startsWith("- ");
      let cleanLine = line;
      if (isBullet) {
        cleanLine = line.trim().substring(2);
      }

      // Handle Bold text: **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(cleanLine)) !== null) {
        if (match.index > lastIndex) {
          parts.push(cleanLine.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={match.index} className="font-semibold text-accent">
            {match[1]}
          </strong>
        );
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < cleanLine.length) {
        parts.push(cleanLine.substring(lastIndex));
      }

      content = parts.length > 0 ? parts : cleanLine;

      if (isBullet) {
        return (
          <li key={lineIdx} className="ml-4 list-disc pl-1 text-sm text-foreground/90 leading-relaxed mb-1.5">
            {content}
          </li>
        );
      }

      return (
        <p key={lineIdx} className="text-sm text-foreground/90 leading-relaxed mb-2 min-h-[1rem]">
          {content}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 flex h-[580px] w-[380px] flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface/85 shadow-2xl backdrop-blur-md glow-primary md:w-[420px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/40 bg-muted/30 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                    <Terminal className="h-5 w-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-surface bg-green-500 animate-pulse-glow" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold tracking-tight text-foreground">
                    GridOS Architect
                  </h3>
                  <p className="text-xs text-muted-foreground leading-tight">
                    AI Engineering Assistant
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
                  aria-label="Close Chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Message Box */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-accent/20 bg-accent/5 text-accent">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div className="space-y-2 max-w-[82%]">
                    <div
                      className={`rounded-xl px-4 py-3 border shadow-sm ${
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground border-primary/20 rounded-tr-none"
                          : "bg-surface border-border/60 rounded-tl-none text-foreground"
                      }`}
                    >
                      {formatMessageText(msg.text)}

                      {/* Display links if any */}
                      {msg.links && msg.links.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-border/20">
                          {msg.links.map((link, idx) => (
                            <Link
                              key={idx}
                              to={link.to}
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                            >
                              {link.label}
                              <ChevronRight className="h-3 w-3" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {msg.sender === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/5 text-primary">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Streaming Text Message */}
              {streamingMessageId && (
                <div className="flex gap-3 justify-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-accent/20 bg-accent/5 text-accent">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="max-w-[82%] rounded-xl px-4 py-3 border border-border/60 bg-surface rounded-tl-none">
                    {formatMessageText(streamingText)}
                    <span className="inline-block h-3 w-1.5 bg-accent animate-pulse ml-0.5" />
                  </div>
                </div>
              )}

              {/* Typing dots */}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-accent/20 bg-accent/5 text-accent">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-xl px-4 py-3 border border-border/40 bg-surface rounded-tl-none">
                    <div className="flex items-center gap-1.5 py-1">
                      <div className="h-2 w-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="h-2 w-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="h-2 w-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <div className="px-5 py-2">
              <div className="flex flex-wrap gap-1.5 justify-start max-h-[85px] overflow-y-auto scrollbar-none">
                {/* Find last bot suggestions */}
                {(() => {
                  const lastBotMsg = [...messages]
                    .reverse()
                    .find((m) => m.sender === "bot" && m.suggestions && m.suggestions.length > 0);

                  const currentSuggestions = lastBotMsg?.suggestions || WELCOME_MESSAGE.suggestions;

                  // Hide suggestions if bot is currently generating responses
                  if (isTyping || streamingMessageId) return null;

                  return currentSuggestions?.map((sugg, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(sugg)}
                      className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-muted/10 px-3 py-1 text-xs text-muted-foreground hover:bg-muted/30 hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Sparkles className="h-3 w-3 text-accent/80" />
                      {sugg}
                    </button>
                  ));
                })()}
              </div>
            </div>

            {/* Footer Form Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="border-t border-border/40 bg-muted/10 px-4 py-3"
            >
              {/* Attached file preview chip */}
              {attachedFile && (
                <div className="mb-2 flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/5 px-3 py-1.5">
                  <FileText className="h-3.5 w-3.5 shrink-0 text-accent" />
                  <span className="flex-1 truncate text-xs text-foreground/90 font-medium">{attachedFile.name}</span>
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {attachedFile.size > 1024 * 1024
                      ? `${(attachedFile.size / 1024 / 1024).toFixed(1)} MB`
                      : `${(attachedFile.size / 1024).toFixed(0)} KB`}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAttachedFile(null)}
                    className="ml-1 rounded p-0.5 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Remove attachment"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}

              <div className="relative flex items-center gap-2">
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  id="chatbot-file-upload"
                  className="sr-only"
                  accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.xls,.png,.jpg,.jpeg,.md"
                  onChange={handleFileChange}
                  disabled={isTyping || !!streamingMessageId}
                />

                {/* Paperclip upload button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isTyping || !!streamingMessageId}
                  className="shrink-0 rounded-lg border border-border/60 bg-surface/50 p-2 text-muted-foreground hover:border-accent/40 hover:text-accent transition-all disabled:opacity-40 cursor-pointer"
                  title="Attach a file (PDF, DOCX, CSV, image…)"
                  aria-label="Attach file"
                >
                  <Paperclip className="h-4 w-4" />
                </button>

                {/* Text input */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={
                      isTyping || streamingMessageId
                        ? "GridOS is executing response..."
                        : "Query model core parameters..."
                    }
                    disabled={isTyping || !!streamingMessageId}
                    className="w-full rounded-xl border border-border/60 bg-surface/50 py-2.5 pl-4 pr-10 text-sm text-foreground placeholder-muted-foreground/60 shadow-inner focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40 disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={(!inputValue.trim() && !attachedFile) || isTyping || !!streamingMessageId}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-primary p-1.5 text-primary-foreground transition-all hover:bg-primary/90 disabled:bg-muted/30 disabled:text-muted-foreground cursor-pointer"
                    aria-label="Send message"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Accepted formats hint */}
              <p className="mt-1.5 text-center text-[10px] text-muted-foreground/50">
                Attach PDF, DOCX, CSV, TXT, or images
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl glow-primary border border-primary/30 cursor-pointer relative"
        aria-label="Toggle chatbot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare className="h-6 w-6" />
              {/* Pulsing notification badge */}
              <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-primary bg-accent animate-pulse-glow" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
