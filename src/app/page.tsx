"use client";

import { useState, useRef } from "react";
import { Upload, FileText, Download, Loader2, CheckCircle, Users, BarChart3, Sparkles, Calendar, Mail, Clock, UserCheck, AlertCircle } from "lucide-react";

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
  comments?: string;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      processFile(selectedFile);
    }
  };

  const processFile = async (selectedFile: File) => {
    setIsProcessing(true);
    
    // Simulate processing - in real app, extract text from PDF
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extracted data
    setEarningsData({
      revenue: "$842 million",
      margin: "23.1%",
      eps: "$2.14",
      guidance: "Q4: $860-880M, +12-15% growth",
      growth: "14% year-over-year"
    });
    
    setIsProcessing(false);
    setActiveTab("metrics");
  };

  const generateScripts = async () => {
    if (!earningsData) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const generatedScripts: ScriptSection[] = [
      {
        speaker: "CEO",
        title: "Opening Remarks",
        content: `Good afternoon, everyone, and thank you for joining us. Before we walk through the quarter's results, I want to frame what you'll hear today around a single theme: disciplined growth.

We made deliberate choices this quarter to invest where we see durable returns. At the time, a few of you on this call pushed back. Fair enough. Today's numbers are the answer.

Revenue grew ${earningsData.growth} to ${earningsData.revenue}, beating consensus. But the real story is margin: ${earningsData.margin}, up 180 basis points from last quarter.

This wasn't cost-cutting. This was cost intelligence — every dollar invested with purpose, every initiative measured against clear ROI.

Michael will take you through the details. I want to be clear — our focus on operational excellence is a competitive moat, not a quarterly tactic.`
      },
      {
        speaker: "CFO",
        title: "Financial Overview",
        content: `Thank you, Sarah. Revenue for Q3 came in at ${earningsData.revenue}, representing ${earningsData.growth} and a beat against consensus of $831 million.

More importantly, operating margin expanded to ${earningsData.margin}, reflecting the cost discipline we committed to last quarter. This represents 180 basis points of margin expansion year-over-year.

EPS came in at ${earningsData.eps}, above our guidance range of $2.05-2.10.

Looking ahead to Q4, we expect revenue of ${earningsData.guidance}. We're seeing strong demand signals across our enterprise segment, balanced by continued prudence in our SMB business.

Our balance sheet remains strong with $2.1 billion in cash, providing flexibility for both organic investment and strategic acquisitions.`
      },
      {
        speaker: "CEO",
        title: "Closing Remarks",
        content: `Before we move to Q&A, I want to reiterate our confidence in the long-term trajectory of this business. We've built something durable — a company that grows profitably, innovates consistently, and creates value for all stakeholders.

The team's execution this quarter was exceptional. The discipline you saw in our results is the same discipline that will guide us for years to come.

With that, let's open the line for questions.`
      }
    ];
    
    setScripts(generatedScripts);
    setIsGenerating(false);
    setActiveTab("script");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                CallReady
              </h1>
              <p className="text-xs text-zinc-500">Enterprise Earnings Call Script Generator</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400">6 stages • SEC compliant</span>
            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors">
              Request Demo
            </button>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            {[
              { key: "intake", label: "Intake", icon: Upload },
              { key: "metrics", label: "Strategy", icon: BarChart3 },
              { key: "script", label: "Script", icon: FileText },
              { key: "approval", label: "Approval", icon: UserCheck },
            ].map((step, i) => (
              <div key={step.key} className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (step.key === "metrics" && earningsData) setActiveTab("metrics");
                    if (step.key === "script" && scripts.length > 0) setActiveTab("script");
                    if (step.key === "approval" && scripts.length > 0) setActiveTab("approval");
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === step.key
                      ? "bg-emerald-600/10 text-emerald-400 border border-emerald-600/20"
                      : earningsData && (step.key === "metrics" || (step.key === "script" && scripts.length > 0) || (step.key === "approval" && scripts.length > 0))
                      ? "text-zinc-400 hover:text-zinc-200"
                      : "text-zinc-600 cursor-not-allowed"
                  }`}
                >
                  <step.icon className="w-4 h-4" />
                  {step.label}
                </button>
                {i < 2 && <div className="w-8 h-px bg-zinc-700" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Intake Stage */}
        {activeTab === "intake" && (
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="mb-8">
              <div className="w-20 h-20 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-10 h-10 text-zinc-400" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-100 mb-2">Upload Quarterly Materials</h2>
              <p className="text-zinc-400">Drop your 10-Q, 10-K, or earnings transcript to get started</p>
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-zinc-700 rounded-2xl p-12 hover:border-emerald-600/50 hover:bg-zinc-900/50 transition-all cursor-pointer"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              {isProcessing ? (
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                  <p className="text-zinc-400">Processing {file?.name}...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <p className="text-zinc-300">Drag & drop or click to browse</p>
                  <p className="text-sm text-zinc-500">PDF only • Max 50MB</p>
                </div>
              )}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 text-left">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                <FileText className="w-5 h-5 text-zinc-400 mb-2" />
                <p className="text-sm font-medium text-zinc-200">10-Q / 10-K</p>
                <p className="text-xs text-zinc-500">Financial statements</p>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                <FileText className="w-5 h-5 text-zinc-400 mb-2" />
                <p className="text-sm font-medium text-zinc-200">Prior Transcript</p>
                <p className="text-xs text-zinc-500">Last quarter's call</p>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                <FileText className="w-5 h-5 text-zinc-400 mb-2" />
                <p className="text-sm font-medium text-zinc-200">Guidance Memo</p>
                <p className="text-xs text-zinc-500">Management outlook</p>
              </div>
            </div>
          </div>
        )}

        {/* Metrics/Strategy Stage */}
        {activeTab === "metrics" && earningsData && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-zinc-100">Key Metrics Extracted</h2>
                <p className="text-zinc-400">Review before generating script</p>
              </div>
              <button
                onClick={generateScripts}
                disabled={isGenerating}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Scripts...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Scripts
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Revenue", value: earningsData.revenue, change: "+14% YoY" },
                { label: "Operating Margin", value: earningsData.margin, change: "+180 bps" },
                { label: "EPS", value: earningsData.eps, change: "Above guidance" },
                { label: "Q4 Guidance", value: earningsData.guidance, change: "Range set" },
              ].map((metric) => (
                <div key={metric.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                  <p className="text-sm text-zinc-400 mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold text-zinc-100">{metric.value}</p>
                  <p className="text-sm text-emerald-400 mt-2">{metric.change}</p>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-zinc-100 mb-4">Strategy Brief Preview</h3>
              <div className="space-y-3 text-sm text-zinc-300">
                <p><span className="text-emerald-400">Narrative:</span> Lead with margin expansion story — strongest data point vs. consensus</p>
                <p><span className="text-emerald-400">Risk:</span> Monitor guidance language — analysts showing caution signals</p>
                <p><span className="text-emerald-400">Competitive:</span> Key competitor announced restructuring — differentiation opportunity</p>
              </div>
            </div>
          </div>
        )}

        {/* Script Stage */}
        {activeTab === "script" && scripts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-zinc-100">Generated Script</h2>
                <p className="text-zinc-400">Speaker-attributed, audit-ready</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-colors">
                  <FileText className="w-4 h-4" />
                  Export .docx
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Export .pdf
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {scripts.map((script, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                  <div className="bg-zinc-800/50 px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 bg-emerald-600/20 text-emerald-400 text-xs font-medium rounded">
                        {script.speaker}
                      </span>
                      <span className="font-medium text-zinc-200">{script.title}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(script.content)}
                      className="text-xs text-zinc-400 hover:text-zinc-200"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="p-6">
                    <p className="text-zinc-300 whitespace-pre-wrap leading-relaxed">{script.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Multi-User Approval Workflow */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-emerald-400" />
                    Multi-User Approval
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1">Each stakeholder reviews and approves their section</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-zinc-400">
                    {reviewers.filter(r => r.status === "approved").length}/{reviewers.length} Approved
                  </span>
                  {reviewers.every(r => r.status === "approved") && (
                    <span className="px-2 py-1 bg-emerald-600/20 text-emerald-400 rounded text-xs font-medium">
                      Ready to Export
                    </span>
                  )}
                </div>
              </div>

              {/* Reviewer List */}
              <div className="space-y-3 mb-6">
                {reviewers.map((reviewer) => (
                  <div key={reviewer.id} className="flex items-center justify-between bg-zinc-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        reviewer.status === "approved" 
                          ? "bg-emerald-600/20 text-emerald-400 border border-emerald-600/30"
                          : reviewer.status === "rejected"
                          ? "bg-red-600/20 text-red-400 border border-red-600/30"
                          : "bg-zinc-700 text-zinc-400 border border-zinc-600"
                      }`}>
                        {reviewer.status === "approved" ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : reviewer.status === "rejected" ? (
                          <AlertCircle className="w-5 h-5" />
                        ) : (
                          reviewer.role[0]
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-zinc-200">{reviewer.role}</p>
                        {reviewer.email && (
                          <p className="text-xs text-zinc-500">{reviewer.email}</p>
                        )}
                        {reviewer.timestamp && (
                          <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" />
                            {new Date(reviewer.timestamp).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {reviewer.status === "pending" ? (
                        <>
                          <button
                            onClick={() => {
                              setReviewers(prev => prev.map(r => 
                                r.id === reviewer.id 
                                  ? { ...r, status: "approved", timestamp: new Date().toISOString() }
                                  : r
                              ));
                            }}
                            className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 text-sm rounded-lg transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              setReviewers(prev => prev.map(r => 
                                r.id === reviewer.id 
                                  ? { ...r, status: "rejected", timestamp: new Date().toISOString() }
                                  : r
                              ));
                            }}
                            className="px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-zinc-400 text-sm rounded-lg transition-colors"
                          >
                            Request Changes
                          </button>
                        </>
                      ) : (
                        <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                          reviewer.status === "approved"
                            ? "bg-emerald-600/20 text-emerald-400"
                            : "bg-red-600/20 text-red-400"
                        }`}>
                          {reviewer.status === "approved" ? "Approved" : "Changes Requested"}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Invite New Reviewer */}
              <div className="border-t border-zinc-800 pt-4">
                <p className="text-sm text-zinc-400 mb-3">Invite additional reviewer</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="reviewer@company.com"
                    className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50"
                  />
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as Reviewer["role"])}
                    className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50"
                  >
                    <option value="CEO">CEO</option>
                    <option value="CFO">CFO</option>
                    <option value="COO">COO</option>
                    <option value="GC">General Counsel</option>
                    <option value="IR">IR Lead</option>
                  </select>
                  <button
                    onClick={() => {
                      if (inviteEmail) {
                        setReviewers(prev => [...prev, {
                          id: Date.now().toString(),
                          name: "",
                          email: inviteEmail,
                          role: inviteRole,
                          status: "pending"
                        }]);
                        setInviteEmail("");
                      }
                    }}
                    className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 rounded-lg transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Approval Tab */}
        {activeTab === "approval" && scripts.length > 0 && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-100 mb-2">Multi-User Approval</h2>
              <p className="text-zinc-400">Review and approve the earnings call script</p>
            </div>

            {/* Script Preview */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-h-64 overflow-y-auto">
              <h3 className="text-sm font-medium text-zinc-400 mb-4">Script Preview</h3>
              {scripts.map((script, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <p className="text-xs text-emerald-400 mb-1">{script.speaker} — {script.title}</p>
                  <p className="text-sm text-zinc-300 line-clamp-3">{script.content}</p>
                </div>
              ))}
            </div>

            {/* Approval Workflow - Already included in script section */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-emerald-400" />
                    Approval Status
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1">
                    {reviewers.filter(r => r.status === "approved").length} of {reviewers.length} approved
                  </p>
                </div>
                {reviewers.every(r => r.status === "approved") && (
                  <span className="px-3 py-1.5 bg-emerald-600/20 text-emerald-400 rounded-lg text-sm font-medium">
                    ✓ Ready to Export
                  </span>
                )}
              </div>

              {/* Approval List */}
              <div className="space-y-3">
                {reviewers.map((reviewer) => (
                  <div key={reviewer.id} className="flex items-center justify-between bg-zinc-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        reviewer.status === "approved" 
                          ? "bg-emerald-600/20 text-emerald-400 border border-emerald-600/30"
                          : "bg-zinc-700 text-zinc-400 border border-zinc-600"
                      }`}>
                        {reviewer.status === "approved" ? <CheckCircle className="w-5 h-5" /> : reviewer.role[0]}
                      </div>
                      <div>
                        <p className="font-medium text-zinc-200">{reviewer.role}</p>
                        {reviewer.email && <p className="text-xs text-zinc-500">{reviewer.email}</p>}
                        {reviewer.timestamp && (
                          <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" />
                            Approved {new Date(reviewer.timestamp).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      reviewer.status === "approved"
                        ? "bg-emerald-600/20 text-emerald-400"
                        : "bg-zinc-700 text-zinc-400"
                    }`}>
                      {reviewer.status === "approved" ? "Approved" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Actions */}
            {reviewers.every(r => r.status === "approved") && (
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-colors">
                  <FileText className="w-5 h-5" />
                  Export .docx
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
                  <Download className="w-5 h-5" />
                  Export PDF
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-16 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Security & Compliance Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 rounded-lg">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-xs text-emerald-400 font-medium">SOC2 Ready</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 rounded-lg">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xs text-blue-400 font-medium">SEC/Reg FD Compliant</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 rounded-lg">
              <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span className="text-xs text-violet-400 font-medium">Full Audit Trail</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 rounded-lg">
              <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              <span className="text-xs text-amber-400 font-medium">Data Never Used for Training</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 rounded-lg">
              <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-xs text-cyan-400 font-medium">Enterprise Encryption</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 rounded-lg">
              <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="text-xs text-rose-400 font-medium">No Data Retention</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-zinc-500 pt-6 border-t border-zinc-800">
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-zinc-300 transition-colors">Data Processing Agreement</a>
            </div>
            <p>© 2026 CallReady. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}