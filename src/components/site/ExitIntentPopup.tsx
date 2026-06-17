import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, ArrowRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ANALYTICS_CONFIG } from "@/lib/analytics/index";

const SESSION_KEY = "tg_exit_popup_shown";

async function sendExitLead(contact: string, type: "email" | "phone") {
  const payload = [{
    type: "LeadForms",
    timestamp: new Date().toISOString(),
    payload: {
      SubmittedAt: new Date().toISOString(),
      FullName: "",
      Company: "",
      WorkEmail: type === "email" ? contact : "",
      Phone: type === "phone" ? contact : "",
      Country: "",
      Industry: "",
      ProjectBudget: "",
      ProjectDescription: "Exit intent popup lead",
      PageURL: window.location.href,
      Referrer: document.referrer || "Direct",
      UTMSource: new URLSearchParams(window.location.search).get("utm_source") || "",
      UTMMedium: new URLSearchParams(window.location.search).get("utm_medium") || "",
      UTMCampaign: new URLSearchParams(window.location.search).get("utm_campaign") || "",
      SessionID: sessionStorage.getItem("tg_session_id") || "",
      VisitorID: localStorage.getItem("tg_visitor_id") || "",
      DeviceType: /mobile/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
      Browser: navigator.userAgent.includes("Chrome") ? "Chrome" : "Other",
      LeadScore: sessionStorage.getItem("tg_lead_score") || "0",
      IntentScore: sessionStorage.getItem("tg_intent_score") || "0",
      Status: "Exit Intent Lead",
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

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [contact, setContact] = useState("");
  const [contactType, setContactType] = useState<"email" | "phone">("email");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const hasShown = useRef(false);

  const triggerPopup = () => {
    if (hasShown.current) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    hasShown.current = true;
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(true);
  };

  useEffect(() => {
    // Trigger 1: Mouse leaves window upward (towards browser tabs/address bar)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) triggerPopup();
    };

    // Trigger 2: Tab visibility change (user switches to another tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") triggerPopup();
    };

    // Small delay before attaching — avoid triggering on page load
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }, 5000); // Wait 5 seconds after page load

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const validate = () => {
    if (!contact.trim()) return "Please enter your contact";
    if (contactType === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact))
      return "Please enter a valid email";
    if (contactType === "phone" && !/^[+\d\s\-()]{7,15}$/.test(contact))
      return "Please enter a valid phone number";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setSubmitting(true);
    await sendExitLead(contact, contactType);
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setVisible(false), 2500);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm"
            onClick={() => setVisible(false)}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="relative w-full max-w-md pointer-events-auto">
              {/* Card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a14] shadow-[0_0_80px_-10px_rgba(99,102,241,0.4)]">

                {/* Top glow bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

                {/* Background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                {/* Close */}
                <button
                  onClick={() => setVisible(false)}
                  className="absolute top-4 right-4 z-10 text-white/40 hover:text-white/80 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="relative p-8">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6"
                    >
                      <div className="mx-auto w-14 h-14 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4">
                        <Zap className="h-7 w-7 text-indigo-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">We'll be in touch!</h3>
                      <p className="mt-2 text-sm text-white/50">
                        A TrustGrid.AI engineer will contact you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      {/* Badge */}
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-indigo-400 mb-5">
                        <Zap className="h-3 w-3" />
                        Before you go
                      </div>

                      <h2 className="text-2xl font-bold text-white leading-tight">
                        Talk to an AI expert
                        <span className="text-indigo-400"> — for free</span>
                      </h2>
                      <p className="mt-3 text-sm text-white/50 leading-relaxed">
                        Leave your email or phone number and a TrustGrid.AI principal engineer will personally reach out within 24 hours.
                      </p>

                      {/* Toggle */}
                      <div className="mt-6 flex rounded-lg bg-white/5 border border-white/10 p-1 gap-1">
                        <button
                          type="button"
                          onClick={() => { setContactType("email"); setContact(""); setError(""); }}
                          className={`flex-1 flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-all ${
                            contactType === "email"
                              ? "bg-indigo-600 text-white shadow"
                              : "text-white/40 hover:text-white/70"
                          }`}
                        >
                          <Mail className="h-3 w-3" /> Email
                        </button>
                        <button
                          type="button"
                          onClick={() => { setContactType("phone"); setContact(""); setError(""); }}
                          className={`flex-1 flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-all ${
                            contactType === "phone"
                              ? "bg-indigo-600 text-white shadow"
                              : "text-white/40 hover:text-white/70"
                          }`}
                        >
                          <Phone className="h-3 w-3" /> Phone
                        </button>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                        <div>
                          <Input
                            type={contactType === "email" ? "email" : "tel"}
                            value={contact}
                            onChange={(e) => { setContact(e.target.value); setError(""); }}
                            placeholder={
                              contactType === "email"
                                ? "your@company.com"
                                : "+1 555 000 0000"
                            }
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-indigo-500 h-11"
                            autoFocus
                          />
                          {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
                        </div>

                        <Button
                          type="submit"
                          disabled={submitting}
                          className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold group"
                        >
                          {submitting ? "Sending..." : "Get a Free Consultation"}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Button>
                      </form>

                      <p className="mt-4 text-center text-[10px] text-white/25">
                        No spam. No commitment. Covered by mutual NDA.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
