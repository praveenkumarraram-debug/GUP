import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, FileText, BookOpen } from "lucide-react";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50/50 py-24 border-t border-border/40">
      {/* Background grids/glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,82,255,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,82,255,0.008)_1px,transparent_1px)] bg-[size:4rem_4rem] z-0 pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[700px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6 z-10 text-center">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 max-w-3xl mx-auto leading-[1.12]">
          Ready to{" "}
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
            Transform
          </span>{" "}
          Your Business?
        </h2>

        {/* Description */}
        <p className="mt-6 text-base sm:text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed font-sans font-medium">
          Whether you're embarking on a comprehensive digital transformation, solving a specific business challenge, or exploring emerging technologies, we're here to help you succeed.
        </p>

        {/* Eyebrow */}
        <div className="mt-14 mb-8 text-[11px] font-extrabold tracking-[0.25em] text-blue-600 uppercase">
          Get Started Today
        </div>

        {/* Three Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14">
          {/* Card 1: Free Consultation */}
          <div className="premium-card flex flex-col items-center justify-between p-8 text-center">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-5">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Free Consultation
              </h3>
              <p className="text-xs text-slate-500 font-sans mb-6 font-medium">
                Schedule a call with our experts
              </p>
            </div>
            <Link to="/contact" search={{ subject: "Strategy Session: Free Consultation" }} className="w-full">
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-sm hover:shadow-md transition-all cursor-pointer">
                Book Now
              </button>
            </Link>
          </div>

          {/* Card 2: Request Demo */}
          <div className="premium-card flex flex-col items-center justify-between p-8 text-center">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500 mb-5">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Request Demo
              </h3>
              <p className="text-xs text-slate-500 font-sans mb-6 font-medium">
                See our platforms in action
              </p>
            </div>
            <Link to="/contact" search={{ subject: "Request Demo: System Walkthrough" }} className="w-full">
              <button className="w-full py-3 border border-slate-300 hover:border-slate-400 bg-transparent text-slate-700 hover:bg-slate-100/50 font-bold rounded-xl text-xs transition-all cursor-pointer">
                Request
              </button>
            </Link>
          </div>

          {/* Card 3: Case Studies */}
          <div className="premium-card flex flex-col items-center justify-between p-8 text-center">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-5">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Case Studies
              </h3>
              <p className="text-xs text-slate-500 font-sans mb-6 font-medium">
                Download industry insights
              </p>
            </div>
            <Link to="/about" className="w-full">
              <button className="w-full py-3 border border-slate-300 hover:border-slate-400 bg-transparent text-slate-700 hover:bg-slate-100/50 font-bold rounded-xl text-xs transition-all cursor-pointer">
                Download
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom Giant Button */}
        <div className="flex justify-center">
          <Link to="/contact">
            <button className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:scale-[1.02] text-white font-bold rounded-2xl text-sm shadow-lg shadow-blue-500/20 transition-all duration-300 cursor-pointer bg-[length:200%_200%] animate-gradient-flow">
              Start Your Transformation Journey
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
