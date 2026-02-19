"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Search, ShieldCheck, Zap, PenTool, Terminal, Loader2, Download } from "lucide-react";
import jsPDF from "jspdf";

const AGENTS = [
  { id: "strategist", label: "Strategist", icon: Zap, color: "text-blue-400" },
  { id: "scout", label: "Scout", icon: Search, color: "text-yellow-400" },
  { id: "fact_checker", label: "Fact-Checker", icon: ShieldCheck, color: "text-red-400" },
  { id: "writer", label: "Writer", icon: PenTool, color: "text-green-400" },
];

export default function Home() {
  const [topic, setTopic] = useState("");
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [report, setReport] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const startResearch = () => {
    if (!topic) return;
    setLoading(true); setReport(""); setLogs([">> INITIALIZING_CORE_LINK..."]);
    const eventSource = new EventSource(`http://localhost:8000/research?topic=${encodeURIComponent(topic)}`);

    eventSource.onmessage = (e) => {
      if (e.data === "[DONE]") { setLoading(false); eventSource.close(); return; }
      const parsed = JSON.parse(e.data);
      if (parsed.node) {
        setActiveNode(parsed.node);
        setLogs(p => [...p, `>> AGENT_${parsed.node.toUpperCase()}: TASK_RESOLVED`]);
      }
      if (parsed.report) setReport(parsed.report);
    };
    eventSource.onerror = () => { setLoading(false); eventSource.close(); };
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = 210;
    const margin = 20;

    // 1. HEADER BOX
    doc.setFillColor(15, 23, 42); 
    doc.rect(0, 0, pageWidth, 45, 'F');
    
    // 2. TITLE
    doc.setTextColor(34, 211, 238); 
    doc.setFont("courier", "bold"); 
    doc.setFontSize(20);
    doc.text("SOVEREIGN ARCHIVE // INTEL", margin, 22);

    // 3. TARGET (THE FIX: WRAPPING TEXT)
    doc.setFontSize(9); 
    doc.setTextColor(100, 116, 139);
    const targetText = `TARGET: ${topic.toUpperCase()}`;
    const wrappedTarget = doc.splitTextToSize(targetText, pageWidth - (margin * 2));
    doc.text(wrappedTarget, margin, 32);

    // 4. CONTENT (DYNAMIC STARTING POINT)
    // We calculate how many lines the target took to avoid overlap
    const targetHeight = (wrappedTarget.length * 5); 
    const contentStartY = 35 + targetHeight;

    const cleanBody = report.replace(/[#*]/g, '');
    doc.setTextColor(30, 41, 59); 
    doc.setFont("helvetica", "normal"); 
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(cleanBody, pageWidth - (margin * 2));
    
    doc.text(lines, margin, contentStartY);
    
    doc.save(`Sovereign_Intel_${topic.replace(/\s+/g, '_')}.pdf`);
    setLogs(p => [...p, ">> PDF_ENGINE: EXPORT_SUCCESSFUL"]);
  };

  return (
    <div className="min-h-screen bg-black text-slate-300 p-8 font-mono">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-4 gap-8">
        <div className="space-y-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
            <h2 className="text-cyan-500 font-bold mb-4 flex items-center gap-2 text-sm">
              <Terminal size={16} /> CMD_CENTER
            </h2>
            <input 
              className="w-full bg-black border border-slate-700 p-3 rounded-lg text-xs mb-4 outline-none focus:border-cyan-500 transition-all"
              placeholder="Enter target objective..."
              value={topic} onChange={(e) => setTopic(e.target.value)}
            />
            <button onClick={startResearch} disabled={loading} className="w-full bg-cyan-600 py-3 rounded-lg font-bold text-white hover:bg-cyan-500 transition-all flex justify-center items-center gap-2">
              {loading ? <Loader2 className="animate-spin text-white" /> : "EXECUTE_SCAN"}
            </button>
            {report && (
              <button onClick={downloadPDF} className="w-full mt-3 border border-slate-700 py-2 rounded-lg text-[10px] text-slate-500 hover:bg-slate-800 transition-all flex justify-center items-center gap-2">
                <Download size={14} /> DOWNLOAD_AESTHETIC_PDF
              </button>
            )}
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
            <h3 className="text-[10px] text-slate-600 mb-6 tracking-widest uppercase italic">Neural_Node_Status</h3>
            <div className="space-y-4">
              {AGENTS.map(a => (
                <div key={a.id} className={`flex items-center gap-3 text-xs ${activeNode === a.id ? a.color : "text-slate-700"}`}>
                  <motion.div 
                    animate={activeNode === a.id ? { scale: [1, 1.4, 1], opacity: [1, 0.5, 1] } : {}} 
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-2 h-2 rounded-full bg-current shadow-[0_0_8px_currentColor]" 
                  />
                  <a.icon size={14} /> <span>{a.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl h-[600px] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center text-[10px] text-slate-500 font-bold">
              <span className="flex items-center gap-2 uppercase tracking-tighter">
                <div className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse" />
                Live_Intelligence_Feed.md
              </span>
              <span className="text-cyan-900 uppercase">{loading ? "Decrypting..." : "Link_Secure"}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-12 prose prose-invert prose-cyan max-w-none scrollbar-thin scrollbar-thumb-slate-800">
              <ReactMarkdown>{report}</ReactMarkdown>
            </div>
          </div>
          <div className="bg-black/50 border border-slate-800 p-4 h-32 overflow-y-auto rounded-xl text-[10px] text-cyan-900 font-mono italic shadow-inner">
             {logs.map((l, i) => <div key={i} className="mb-1"><span className="text-slate-800">[{new Date().toLocaleTimeString()}]</span> {l}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}