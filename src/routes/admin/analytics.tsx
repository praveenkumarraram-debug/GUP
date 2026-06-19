import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  RefreshCw,
  Users,
  Layers,
  FileText,
  AlertTriangle,
  TrendingUp,
  Monitor,
  CheckCircle,
  Calendar,
  Search,
  ArrowLeft,
  Activity,
  UserCheck,
  Mail,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ANALYTICS_CONFIG } from "@/lib/analytics/index";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";

export const Route = createFileRoute("/admin/analytics")({
  component: AdminAnalyticsDashboard,
});

interface LeadRow {
  Timestamp: string;
  SubmittedAt: string;
  FullName: string;
  Company: string;
  WorkEmail: string;
  Phone: string;
  Country: string;
  Industry: string;
  ProjectBudget: string;
  ProjectDescription: string;
  PageURL: string;
  Referrer: string;
  UTMSource: string;
  UTMMedium: string;
  UTMCampaign: string;
  LeadScore: string;
  IntentScore: string;
  Status: string;
}

interface ErrorRow {
  Timestamp: string;
  PageURL: string;
  ErrorType: string;
  ErrorMessage: string;
  StackTrace: string;
  SourceFile: string;
}

interface VisitorRow {
  Timestamp: string;
  DeviceType: string;
  Browser: string;
  Country: string;
  OS: string;
}

interface PageViewRow {
  Timestamp: string;
  PageURL: string;
  PageTitle: string;
}

interface PerformanceRow {
  Timestamp: string;
  PageLoadTime: string;
  DOMLoadTime: string;
  LCP: string;
  CLS: string;
  INP: string;
  TTFB: string;
}

interface DashboardData {
  stats: Record<string, { rows: number }>;
  recentLeads: LeadRow[];
  recentErrors: ErrorRow[];
  recentPageViews: PageViewRow[];
  recentVisitors: VisitorRow[];
  recentPerformance: PerformanceRow[];
}

const COLORS = ["#4f46e5", "#818cf8", "#a5b4fc", "#c7d2fe", "#e0e7ff"];

function AdminAnalyticsDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState<DashboardData | null>(null);

  const [leadSearch, setLeadSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<LeadRow | null>(null);

  // Check authentication status in localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("tg_admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Fetch dashboard stats from Google Apps Script
  const fetchDashboardData = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await fetch(
        `${ANALYTICS_CONFIG.ENDPOINT}?action=dashboard`
      );
      if (!response.ok) {
        throw new Error(`Failed with HTTP ${response.status}`);
      }
      const json = await response.json();
      if (json.error) {
        throw new Error(json.error);
      }
      setData(json);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to fetch analytics statistics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "trustgrid2026") {
      localStorage.setItem("tg_admin_auth", "true");
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid passcode. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("tg_admin_auth");
    setIsAuthenticated(false);
    setData(null);
    setPasscode("");
  };

  // ─── Chart Calculations ─────────────────────────────────────
  
  // PageViews Over Time
  const pageViewsChartData = useMemo(() => {
    if (!data?.recentPageViews) return [];
    
    // Group page views by hour or relative days
    const counts: Record<string, number> = {};
    data.recentPageViews.slice(0, 100).reverse().forEach((pv) => {
      try {
        const d = new Date(pv.Timestamp);
        // Format as Short Date + Hour
        const label = d.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        }) + " " + d.getHours() + ":00";
        counts[label] = (counts[label] || 0) + 1;
      } catch {
        // Fallback for raw formats
      }
    });

    return Object.entries(counts).map(([time, count]) => ({
      time,
      "Page Views": count,
    }));
  }, [data]);

  // Device Type distribution
  const deviceChartData = useMemo(() => {
    if (!data?.recentVisitors) return [];
    const deviceCounts: Record<string, number> = {};
    data.recentVisitors.forEach((v) => {
      const type = v.DeviceType || "Desktop";
      deviceCounts[type] = (deviceCounts[type] || 0) + 1;
    });
    return Object.entries(deviceCounts).map(([name, value]) => ({ name, value }));
  }, [data]);

  // Browser distribution
  const browserChartData = useMemo(() => {
    if (!data?.recentVisitors) return [];
    const browserCounts: Record<string, number> = {};
    data.recentVisitors.forEach((v) => {
      const b = v.Browser || "Other";
      browserCounts[b] = (browserCounts[b] || 0) + 1;
    });
    return Object.entries(browserCounts).map(([name, value]) => ({ name, value }));
  }, [data]);

  // Core Web Vitals Performance
  const avgPerformance = useMemo(() => {
    if (!data?.recentPerformance || data.recentPerformance.length === 0) {
      return { load: 0, dom: 0, lcp: 0, ttfb: 0 };
    }
    let loadSum = 0, domSum = 0, lcpSum = 0, ttfbSum = 0;
    let validCount = 0;

    data.recentPerformance.forEach((perf) => {
      const load = parseFloat(perf.PageLoadTime);
      const dom = parseFloat(perf.DOMLoadTime);
      const lcp = parseFloat(perf.LCP);
      const ttfb = parseFloat(perf.TTFB);

      if (!isNaN(load)) {
        loadSum += load;
        domSum += isNaN(dom) ? 0 : dom;
        lcpSum += isNaN(lcp) ? 0 : lcp;
        ttfbSum += isNaN(ttfb) ? 0 : ttfb;
        validCount++;
      }
    });

    return {
      load: validCount > 0 ? Math.round(loadSum / validCount) : 0,
      dom: validCount > 0 ? Math.round(domSum / validCount) : 0,
      lcp: validCount > 0 ? Math.round(lcpSum / validCount) : 0,
      ttfb: validCount > 0 ? Math.round(ttfbSum / validCount) : 0,
    };
  }, [data]);

  // Filter leads by search term
  const filteredLeads = useMemo(() => {
    if (!data?.recentLeads) return [];
    return data.recentLeads.filter((lead) => {
      const term = leadSearch.toLowerCase();
      return (
        lead.FullName?.toLowerCase().includes(term) ||
        lead.Company?.toLowerCase().includes(term) ||
        lead.WorkEmail?.toLowerCase().includes(term) ||
        lead.ProjectDescription?.toLowerCase().includes(term)
      );
    });
  }, [data, leadSearch]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-2xl border border-border/80 bg-card p-8 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-accent" />
          <div className="text-center space-y-2 mb-6">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Lock className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold font-display text-foreground">Admin Access</h2>
            <p className="text-sm text-muted-foreground">
              Please enter the passcode to view the TrustGrid.AI Analytics Panel.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter Passcode"
                value={passcode}
                onChange={(e) => { setPasscode(e.target.value); setLoginError(""); }}
                className="h-11 bg-background border-border text-center text-lg tracking-widest focus-visible:ring-primary"
                autoFocus
              />
              {loginError && <p className="mt-2 text-xs text-destructive font-semibold text-center">{loginError}</p>}
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              Verify Passcode
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to site homepage
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafe] text-foreground p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ─── HEADER ─── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5" /> Console v4.0 (Live)
            </span>
            <h1 className="text-3xl font-bold font-display text-gradient">
              Analytics Control Center
            </h1>
            <p className="text-sm text-muted-foreground">
              Real-time site behavior, user engagements, and lead pipeline tracking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={fetchDashboardData}
              disabled={loading}
              variant="outline"
              className="h-10 border-border bg-white text-muted-foreground hover:text-foreground flex items-center gap-1.5 shadow-sm"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>

            <Button
              onClick={handleLogout}
              variant="destructive"
              className="h-10 font-semibold cursor-pointer shadow-sm"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* ─── ERROR STATE ─── */}
        {errorMsg && (
          <div className="p-5 bg-destructive/10 border border-destructive/30 rounded-xl flex gap-3 text-destructive">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold">Fetch Error</h4>
              <p className="text-sm mt-1 leading-relaxed">{errorMsg}</p>
              <p className="text-xs mt-2 text-destructive/75">
                Note: Check if your deployed Apps Script URL is correct and public permissions are active.
              </p>
            </div>
          </div>
        )}

        {/* ─── OVERVIEW METRICS GRID ─── */}
        {loading && !data ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <RefreshCw className="h-12 w-12 text-primary animate-spin" />
            <p className="text-muted-foreground font-semibold text-sm">Querying Google Sheets database...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  label: "Total Visitors",
                  val: data?.stats?.Visitors?.rows ?? 0,
                  icon: Users,
                  color: "border-indigo-500/20 bg-indigo-500/5 text-indigo-600",
                },
                {
                  label: "Total Page Views",
                  val: data?.stats?.PageViews?.rows ?? 0,
                  icon: Layers,
                  color: "border-violet-500/20 bg-violet-500/5 text-violet-600",
                },
                {
                  label: "Conversions & Leads",
                  val: data?.stats?.LeadForms?.rows ?? 0,
                  icon: UserCheck,
                  color: "border-emerald-500/20 bg-emerald-500/5 text-emerald-600",
                },
                {
                  label: "Logged Errors",
                  val: data?.stats?.Errors?.rows ?? 0,
                  icon: AlertTriangle,
                  color: "border-rose-500/20 bg-rose-500/5 text-rose-600",
                },
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className={`p-6 border rounded-xl shadow-sm bg-white flex items-center justify-between transition-all`}
                  >
                    <div className="space-y-1.5">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                        {card.label}
                      </span>
                      <span className="text-3xl font-extrabold font-display text-foreground leading-none">
                        {loading ? "..." : card.val}
                      </span>
                    </div>
                    <div className={`p-3 rounded-lg border ${card.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ─── CHARTS SECTION ─── */}
            {data && (
              <div className="grid lg:grid-cols-3 gap-6">
                
                {/* Line Chart: Views Trend */}
                <div className="lg:col-span-2 p-6 rounded-xl border border-border bg-white shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-2">
                    <div>
                      <h3 className="text-base font-bold text-foreground font-display flex items-center gap-1.5">
                        <TrendingUp className="h-4 w-4 text-primary" /> Page Views Trend (Hourly)
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Real-time visitor request distribution.</p>
                    </div>
                  </div>
                  <div className="h-72 w-full">
                    {pageViewsChartData.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                        Not enough pageview data in sheet.
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={pageViewsChartData}>
                          <defs>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} />
                          <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                          <ChartTooltip />
                          <Area
                            type="monotone"
                            dataKey="Page Views"
                            stroke="#4f46e5"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorPv)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>

                {/* Device Type & Browser distribution */}
                <div className="p-6 rounded-xl border border-border bg-white shadow-sm flex flex-col justify-between">
                  <div className="space-y-1 pb-4">
                    <h3 className="text-base font-bold text-foreground font-display flex items-center gap-1.5">
                      <Monitor className="h-4 w-4 text-primary" /> Device & Browser
                    </h3>
                    <p className="text-xs text-muted-foreground">Operating systems & device classes.</p>
                  </div>

                  <div className="h-56 w-full flex items-center justify-center gap-4">
                    {deviceChartData.length === 0 ? (
                      <div className="text-sm text-muted-foreground">No visitor records found.</div>
                    ) : (
                      <>
                        <div className="w-1/2 h-full relative">
                          <span className="text-[10px] text-center text-muted-foreground font-semibold block absolute bottom-0 left-0 right-0">Device Types</span>
                          <ResponsiveContainer width="100%" height="90%">
                            <PieChart>
                              <Pie
                                data={deviceChartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={35}
                                outerRadius={50}
                                paddingAngle={3}
                                dataKey="value"
                              >
                                {deviceChartData.map((entry, idx) => (
                                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                ))}
                              </Pie>
                              <ChartTooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="w-1/2 h-full relative">
                          <span className="text-[10px] text-center text-muted-foreground font-semibold block absolute bottom-0 left-0 right-0">Browsers</span>
                          <ResponsiveContainer width="100%" height="90%">
                            <PieChart>
                              <Pie
                                data={browserChartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={35}
                                outerRadius={50}
                                paddingAngle={3}
                                dataKey="value"
                              >
                                {browserChartData.map((entry, idx) => (
                                  <Cell key={`cell-${idx}`} fill={COLORS[(idx + 2) % COLORS.length]} />
                                ))}
                              </Pie>
                              <ChartTooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] text-muted-foreground mt-4 pt-3 border-t border-border">
                    <div>
                      <strong>Devices:</strong>{" "}
                      {deviceChartData.map((d) => `${d.name} (${d.value})`).join(", ")}
                    </div>
                    <div>
                      <strong>Browsers:</strong>{" "}
                      {browserChartData.map((b) => `${b.name} (${b.value})`).join(", ")}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ─── ROW 2: LEADS PANEL & WEB VITALS ─── */}
            {data && (
              <div className="grid lg:grid-cols-3 gap-6">
                
                {/* ─── LEAD PIPELINE (LEFT 2 COLS) ─── */}
                <div className="lg:col-span-2 p-6 rounded-xl border border-border bg-white shadow-sm space-y-5 flex flex-col">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <h3 className="text-base font-bold text-foreground font-display flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" /> Lead Submissions
                      </h3>
                      <p className="text-xs text-muted-foreground">Bookings and contact forms fetched from sheet.</p>
                    </div>

                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/60" />
                      <Input
                        type="text"
                        placeholder="Search leads..."
                        value={leadSearch}
                        onChange={(e) => setLeadSearch(e.target.value)}
                        className="pl-9 h-9 text-xs bg-background border-border"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto border border-border/80 rounded-lg">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#fcfdfe] border-b border-border/80 text-muted-foreground font-semibold">
                        <tr>
                          <th className="p-3">Date</th>
                          <th className="p-3">Name</th>
                          <th className="p-3">Company</th>
                          <th className="p-3">Contact Details</th>
                          <th className="p-3">Budget</th>
                          <th className="p-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {filteredLeads.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-6 text-center text-muted-foreground font-medium">
                              No submissions matching query.
                            </td>
                          </tr>
                        ) : (
                          filteredLeads.map((lead, idx) => {
                            const date = new Date(lead.Timestamp).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            });
                            return (
                              <tr key={idx} className="hover:bg-primary/[0.01] transition-colors">
                                <td className="p-3 font-mono text-[10px] text-muted-foreground">{date}</td>
                                <td className="p-3 font-semibold text-foreground">{lead.FullName || "Exit intent lead"}</td>
                                <td className="p-3 text-muted-foreground">{lead.Company || "—"}</td>
                                <td className="p-3 space-y-0.5">
                                  {lead.WorkEmail && (
                                    <div className="flex items-center gap-1 font-semibold text-foreground">
                                      <Mail className="h-3 w-3 text-muted-foreground/60" /> {lead.WorkEmail}
                                    </div>
                                  )}
                                  {lead.Phone && (
                                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                      <Phone className="h-3 w-3 text-muted-foreground/60" /> {lead.Phone}
                                    </div>
                                  )}
                                </td>
                                <td className="p-3">
                                  {lead.ProjectBudget ? (
                                    <span className="inline-flex items-center gap-1 rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 font-bold text-emerald-700">
                                      {lead.ProjectBudget}
                                    </span>
                                  ) : (
                                    <span className="text-muted-foreground/45">—</span>
                                  )}
                                </td>
                                <td className="p-3 text-right">
                                  <Button
                                    size="sm"
                                    onClick={() => setSelectedLead(lead)}
                                    className="h-7 px-3 bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary-foreground font-semibold border-none cursor-pointer"
                                  >
                                    View
                                  </Button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ─── WEB VITALS & SYS LOGS (RIGHT 1 COL) ─── */}
                <div className="p-6 rounded-xl border border-border bg-white shadow-sm space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-foreground font-display flex items-center gap-1.5">
                        <CheckCircle className="h-4 w-4 text-emerald-500" /> Core Web Vitals
                      </h3>
                      <p className="text-xs text-muted-foreground">Average page load speeds in milliseconds.</p>
                    </div>

                    <div className="space-y-4.5">
                      {[
                        { label: "Page Load Time", value: `${avgPerformance.load}ms`, detail: "Browser window load event" },
                        { label: "DOM Interactive", value: `${avgPerformance.dom}ms`, detail: "Document completely parsed" },
                        { label: "LCP (Largest Paint)", value: `${avgPerformance.lcp}ms`, detail: "Main content rendered" },
                        { label: "TTFB (Latency)", value: `${avgPerformance.ttfb}ms`, detail: "Time to first server byte" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-surface p-3 border border-border/75 rounded-lg">
                          <div>
                            <span className="text-xs font-semibold text-foreground block">{item.label}</span>
                            <span className="text-[10px] text-muted-foreground leading-none">{item.detail}</span>
                          </div>
                          <span className="font-mono text-sm font-bold text-primary">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 text-[10px] text-muted-foreground space-y-1 font-mono leading-relaxed bg-surface/50 p-2.5 rounded-lg border">
                    <div>🖥️ Engine Endpoint:</div>
                    <div className="truncate text-primary font-semibold select-all">
                      {ANALYTICS_CONFIG.ENDPOINT}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ─── SYSTEM ERRORS TABLE ─── */}
            {data && data.recentErrors && data.recentErrors.length > 0 && (
              <div className="p-6 rounded-xl border border-border bg-white shadow-sm space-y-4">
                <div className="space-y-1 pb-1">
                  <h3 className="text-base font-bold text-foreground font-display flex items-center gap-1.5 text-rose-600">
                    <AlertTriangle className="h-4.5 w-4.5 text-rose-500 animate-bounce" /> Javascript Client Errors
                  </h3>
                  <p className="text-xs text-muted-foreground">Exceptions collected in real-time from active visitor browsers.</p>
                </div>

                <div className="overflow-x-auto border border-border/80 rounded-lg">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#fcfdfe] border-b border-border/80 text-muted-foreground font-semibold">
                      <tr>
                        <th className="p-3">Timestamp</th>
                        <th className="p-3">Page</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Message</th>
                        <th className="p-3">File / Source</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {data.recentErrors.map((err, idx) => {
                        const date = new Date(err.Timestamp).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                        return (
                          <tr key={idx} className="hover:bg-rose-500/[0.01]">
                            <td className="p-3 font-mono text-[10px] text-muted-foreground">{date}</td>
                            <td className="p-3 text-muted-foreground truncate max-w-44" title={err.PageURL}>
                              {err.PageURL.replace(window.location.origin, "") || "/"}
                            </td>
                            <td className="p-3">
                              <span className="inline-flex rounded bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                                {err.ErrorType || "Uncaught"}
                              </span>
                            </td>
                            <td className="p-3 font-medium text-foreground max-w-xs truncate" title={err.ErrorMessage}>
                              {err.ErrorMessage}
                            </td>
                            <td className="p-3 text-[10px] text-muted-foreground truncate max-w-xs" title={err.SourceFile}>
                              {err.SourceFile}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </>
        )}

      </div>

      {/* ─── LEAD VIEW DIALOG MODAL ─── */}
      <AnimatePresence>
        {selectedLead && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm"
              onClick={() => setSelectedLead(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-xl border border-border shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
                <div className="p-5 border-b border-border/80 flex items-center justify-between">
                  <h4 className="font-bold text-lg font-display text-gradient">Lead Detail Card</h4>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-surface"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="p-6 space-y-4.5 overflow-y-auto max-h-[70vh]">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">Submit Date</span>
                      <span className="text-xs text-foreground font-mono">
                        {new Date(selectedLead.Timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">Action / Channel</span>
                      <span className="text-xs font-semibold text-primary block">
                        {selectedLead.Status || "Exit Intent"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">Full Name</span>
                      <span className="text-sm font-bold text-foreground">
                        {selectedLead.FullName || "Anonymous Lead"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">Company</span>
                      <span className="text-sm font-semibold text-foreground">
                        {selectedLead.Company || "Not specified"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-border/40 pt-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">Email</span>
                      <span className="text-xs font-semibold text-foreground select-all">
                        {selectedLead.WorkEmail || "Not specified"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">Phone</span>
                      <span className="text-xs font-semibold text-foreground select-all">
                        {selectedLead.Phone || "Not specified"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 border-t border-border/40 pt-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">Country</span>
                      <span className="text-xs font-medium text-foreground">{selectedLead.Country || "—"}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">Industry</span>
                      <span className="text-xs font-medium text-foreground">{selectedLead.Industry || "—"}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">Budget</span>
                      <span className="text-xs font-bold text-emerald-700">{selectedLead.ProjectBudget || "—"}</span>
                    </div>
                  </div>

                  <div className="border-t border-border/40 pt-3">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block">Referrer</span>
                    <span className="text-xs text-muted-foreground truncate block" title={selectedLead.Referrer}>
                      {selectedLead.Referrer}
                    </span>
                  </div>

                  <div className="border-t border-border/40 pt-3">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block">Page URL</span>
                    <span className="text-xs text-muted-foreground truncate block" title={selectedLead.PageURL}>
                      {selectedLead.PageURL}
                    </span>
                  </div>

                  <div className="border-t border-border/40 pt-3">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block">Project / Exit Request</span>
                    <p className="text-xs bg-surface border border-border/80 p-3.5 rounded-lg text-foreground leading-relaxed whitespace-pre-line text-pretty select-all font-sans">
                      {selectedLead.ProjectDescription || "No custom message entered."}
                    </p>
                  </div>
                </div>

                <div className="p-4 border-t border-border/80 bg-surface/50 text-right">
                  <Button
                    onClick={() => setSelectedLead(null)}
                    className="h-9 px-4 bg-primary text-primary-foreground font-semibold"
                  >
                    Close Card
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function X({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
