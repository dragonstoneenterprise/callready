"use client";

import { useState, useRef } from "react";
import { Upload, FileText, Download, Loader2, CheckCircle, BarChart3, Sparkles, Clock, UserCheck, Shield, Zap, ArrowRight, ChevronRight } from "lucide-react";

interface EarningsData {
  revenue?: string;
  margin?: string;
  eps?: string;
  guidance?: string;
  growth?: string;
}

interface ScriptSection {
  speaker: string;
  title: string;
  content: string;
}

interface Reviewer {
  id: string;
  name: string;
  email: string;
  role: "CEO" | "CFO" | "GC" | "IR" | "COO";
  status: "pending" | "approved" | "rejected";
  timestamp?: string;
}

export default function Home() {
  const [earningsData, setEarningsData] = useState<EarningsData | null>(null);
  const [scripts, setScripts] = useState<ScriptSection[]>([]);
  const [activeTab, setActiveTab] = useState<"intake" | "metrics" | "script" | "approval">("intake");
  const [reviewers, setReviewers] = useState<Reviewer[]>([
    { id: "1", name: "", email: "", role: "CEO", status: "pending" },
    { id: "2", name: "", email: "", role: "CFO", status: "pending" },
    { id: "3", name: "", email: "", role: "GC", status: "pending" },
  ]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Reviewer["role"]>("IR");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateScripts = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    const data = {
      revenue: "$842M",
      margin: "23.1%",
      eps: "$2.14",
      guidance: "Q4: $860-880M",
      growth: "14% YoY"
    };
    setEarningsData(data);
    const generatedScripts: ScriptSection[] = [
      {
        speaker: "CEO",
        title: "Opening Remarks",
        content: `Good afternoon, everyone, and thank you for joining us. Before we walk through the quarter's results, I want to frame what you'll hear today around a single theme: disciplined growth.

Revenue grew ${data.growth} to ${data.revenue}, beating consensus. But the real story is margin: ${data.margin}, up 180 basis points from last quarter.

This wasn't cost-cutting. This was cost intelligence — every dollar invested with purpose.`
      },
      {
        speaker: "CFO",
        title: "Financial Overview",
        content: `Thank you. Revenue for Q3 came in at ${data.revenue}, representing ${data.growth} and a beat against consensus of $831 million.

Operating margin expanded to ${data.margin}, reflecting the cost discipline we committed to last quarter. EPS came in at ${data.eps}, above our guidance range.

Looking ahead to Q4, we expect revenue of ${data.guidance}.`
      }
    ];
    setScripts(generatedScripts);
    setIsGenerating(false);
    setActiveTab("script");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold">CallReady</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-zinc-400 hover:text-white transition-colors text-sm">Features</a>
            <a href="#pricing" className="text-zinc-400 hover:text-white transition-colors text-sm">Pricing</a>
            <a href="https://calendly.com" className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors">
              Book Demo
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Earnings Call Preparation
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Prepare Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Earnings Call</span> in Minutes
          </h1>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Transform quarterly financials into board-ready scripts with multi-user approval. 
            Used by pre-IPO and public companies preparing for their next earnings call.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={generateScripts}
              disabled={isGenerating}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center gap-2"
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
              {isGenerating ? "Generating..." : "Try Demo"}
            </button>
            <a href="#features" className="px-8 py-4 border border-zinc-700 rounded-xl text-zinc-300 hover:bg-zinc-800 transition-colors flex items-center gap-2">
              Learn More
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-zinc-800/50 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-emerald-400">2hrs</p>
              <p className="text-zinc-500 mt-1">vs 2 weeks</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-400">85%</p>
              <p className="text-zinc-500 mt-1">Time saved</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-400">100%</p>
              <p className="text-zinc-500 mt-1">Audit ready</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need for Earnings Season</h2>
            <p className="text-zinc-400">From intake to approval, we've got you covered</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: "2hr Preparation", desc: "Generate complete scripts in hours, not weeks" },
              { icon: UserCheck, title: "Multi-User Approval", desc: "CEO, CFO, Legal review workflow with timestamps" },
              { icon: Shield, title: "SEC Compliant", desc: "Full audit trail for regulatory requirements" },
              { icon: BarChart3, title: "Strategy Brief", desc: "AI-generated narrative and competitive intel" },
              { icon: FileText, title: "Speaker Scripts", desc: "CEO and CFO scripts with proper attribution" },
              { icon: Download, title: "Export Ready", desc: "Professional PDF export with all approvals" }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-emerald-500/30 transition-colors group">
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/10 transition-colors">
                  <feature.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-zinc-400">Choose the plan that fits your company stage</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
              <h3 className="text-lg font-semibold text-zinc-400">Pre-IPO</h3>
              <p className="text-4xl font-bold mt-4 mb-6">$49<span className="text-lg text-zinc-500 font-normal">/mo</span></p>
              <ul className="space-y-3 text-zinc-400 text-sm mb-8">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Script generation</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Basic approval workflow</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Email support</li>
              </ul>
              <button className="w-full py-3 border border-zinc-700 rounded-xl hover:bg-zinc-800 transition-colors">Get Started</button>
            </div>
            <div className="p-8 bg-gradient-to-b from-emerald-500/10 to-transparent border border-emerald-500/30 rounded-2xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-black text-xs font-semibold rounded-full">Most Popular</div>
              <h3 className="text-lg font-semibold text-emerald-400">Small Public</h3>
              <p className="text-4xl font-bold mt-4 mb-6">$297<span className="text-lg text-zinc-500 font-normal">/mo</span></p>
              <ul className="space-y-3 text-zinc-400 text-sm mb-8">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Everything in Pre-IPO</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Multi-user approval</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Full audit trail</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Priority support</li>
              </ul>
              <button className="w-full py-3 bg-emerald-500 text-black font-semibold rounded-xl hover:bg-emerald-400 transition-colors">Get Started</button>
            </div>
            <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
              <h3 className="text-lg font-semibold text-zinc-400">Enterprise</h3>
              <p className="text-4xl font-bold mt-4 mb-6">$497<span className="text-lg text-zinc-500 font-normal">/mo</span></p>
              <ul className="space-y-3 text-zinc-400 text-sm mb-8">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Everything in Small Public</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> API access</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Custom integrations</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Dedicated support</li>
              </ul>
              <button className="w-full py-3 border border-zinc-700 rounded-xl hover:bg-zinc-800 transition-colors">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-zinc-500 text-sm">
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-400" /> SOC2 Ready</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> SEC/Reg FD Compliant</span>
            <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-emerald-400" /> Full Audit Trail</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-400" /> Data Never Used for Training</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between text-zinc-500 text-sm">
          <p>© 2026 CallReady. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
