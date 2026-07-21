import React, { useState } from "react";
import { Copy, Download, Check, Sliders, RefreshCw, Terminal, Sparkles } from "lucide-react";
import { generateModifiedCSV } from "../utils/mutonEngine";
import WatermelonHeart from "./WatermelonHeart";

export default function ModifiedCSVViewer() {
  const [customDelimiter, setCustomDelimiter] = useState(" الكولاتز ☻'♥'٥ ");
  const [copied, setCopied] = useState(false);

  const csvContent = generateModifiedCSV(customDelimiter);
  const lines = csvContent.trim().split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(csvContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([csvContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `muton_delimited.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Delimiter Input Control Bar */}
      <div className="p-4 rounded-xl bg-neutral-900 border border-emerald-600/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <WatermelonHeart size={24} />
          <span className="text-xs font-bold text-white font-mono">Delimiter:</span>
          <input
            type="text"
            value={customDelimiter}
            onChange={(e) => setCustomDelimiter(e.target.value)}
            className="bg-black border border-emerald-500/50 px-3 py-1.5 rounded-lg text-xs font-mono text-emerald-400 focus:outline-none focus:border-red-500 text-center w-full sm:w-64"
            dir="auto"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setCustomDelimiter(" الكولاتز ☻'♥'٥ ")}
            className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[11px] text-gray-300 transition cursor-pointer"
          >
            Reset Default
          </button>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Main Terminal Output */}
      <div className="rounded-xl border-2 border-emerald-600/50 bg-black overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="p-3 bg-neutral-900 border-b border-emerald-600/30 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-white" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="font-bold text-white ml-2">muton_output_terminal.csv</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-bold">
            {lines.length} lines
          </span>
        </div>

        {/* Terminal Body */}
        <div className="p-4 overflow-x-auto max-h-[620px] overflow-y-auto font-mono text-xs leading-relaxed bg-black text-white selection:bg-red-600/40">
          <pre className="whitespace-pre">
            {lines.map((line, idx) => (
              <div
                key={idx}
                className={`hover:bg-neutral-900/80 transition ${
                  idx === 0
                    ? "text-red-400 font-bold border-b border-neutral-800 pb-1 mb-1 bg-neutral-900/50"
                    : "text-gray-200"
                }`}
              >
                <span className="inline-block w-8 text-emerald-600 select-none text-[10px] text-right pr-2">
                  {idx + 1}
                </span>
                <span>{line}</span>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}
