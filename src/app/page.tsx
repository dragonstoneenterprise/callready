"use client";

import { useState, useRef } from "react";
import { Upload, FileText, Download, Loader2, CheckCircle, Users, BarChart3, Sparkles, Calendar } from "lucide-react";

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

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [earningsData, setEarningsData] = useState<EarningsData | null>(null);
  const [scripts, setScripts] = useState<ScriptSection[]>([]);
  const [activeTab, setActiveTab] = useState<"intake" | "metrics" | "script">("intake");
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
                Earnings Pipeline
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
            ].map((step, i) => (
              <div key={step.key} className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (step.key === "metrics" && earningsData) setActiveTab("metrics");
                    if (step.key === "script" && scripts.length > 0) setActiveTab("script");
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === step.key
                      ? "bg-emerald-600/10 text-emerald-400 border border-emerald-600/20"
                      : earningsData && (step.key === "metrics" || (step.key === "script" && scripts.length > 0))
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

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-zinc-100 mb-4">Approval Chain</h3>
              <div className="flex items-center gap-4">
                {["CEO", "CFO", "GC"].map((role, i) => (
                  <div key={role} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm text-zinc-400">
                      {role[0]}
                    </div>
                    <span className="text-sm text-zinc-500">{role}</span>
                    {i < 2 && <div className="w-8 h-px bg-zinc-700" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-zinc-500">
          <div className="flex items-center gap-4">
            <span>SEC/Reg FD Compliant</span>
            <span>•</span>
            <span>SOC2 Ready</span>
            <span>•</span>
            <span>Full Audit Trail</span>
          </div>
          <p>© 2026 Earnings Pipeline</p>
        </div>
      </footer>
    </div>
  );
}