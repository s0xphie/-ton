import React, { useState } from "react";
import { Terminal, Copy, Check, Download, Search } from "lucide-react";
import { generateCMDOutput } from "../utils/mutonEngine";
import WatermelonHeart from "./WatermelonHeart";

export default function CMDTerminalView() {
  const cmdOutput = generateCMDOutput();
  const lines = cmdOutput.split('\n');

  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(cmdOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([cmdOutput], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `batty_execution_trace.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Control Bar */}
      <div className="p-3 bg-neutral-900 border border-emerald-600/40 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter trace lines (e.g., muton.py, M_SERIES)..."
            className="w-full bg-black border border-neutral-800 pl-9 pr-4 py-1.5 rounded-lg text-xs text-white focus:outline-none focus:border-red-500"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy Trace"}</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save .txt</span>
          </button>
        </div>
      </div>

      {/* Terminal View */}
      <div className="rounded-xl border-2 border-emerald-600/50 bg-black overflow-hidden shadow-2xl">
        <div className="p-3 bg-neutral-900 border-b border-emerald-600/30 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <WatermelonHeart size={18} />
            <span className="font-bold text-white">cmd.exe - batty.bat execution trace</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-bold">{lines.length} lines</span>
        </div>

        <div className="p-4 overflow-x-auto max-h-[620px] font-mono text-xs text-gray-200 leading-relaxed selection:bg-red-600/40 bg-black">
          {lines.map((line, idx) => {
            if (searchTerm && !line.toLowerCase().includes(searchTerm.toLowerCase())) {
              return null;
            }
            const isBanner = line.startsWith("-----") && line.endsWith("-----");
            return (
              <div
                key={idx}
                className={`hover:bg-neutral-900/80 transition ${
                  isBanner ? "text-red-400 font-bold py-1 bg-red-950/20 my-1" : ""
                }`}
              >
                <span className="inline-block w-8 text-emerald-600 select-none text-[10px] text-right pr-2">
                  {idx + 1}
                </span>
                <span>{line}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
