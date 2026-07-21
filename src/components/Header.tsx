import React from "react";
import WatermelonHeart from "./WatermelonHeart";
import { Play, Copy, Download, FileText, Code2, Terminal, Table, Check } from "lucide-react";

interface HeaderProps {
  activeTab: 'delimited_csv' | 'qalb_editor' | 'muton_table' | 'cmd_trace';
  setActiveTab: (t: 'delimited_csv' | 'qalb_editor' | 'muton_table' | 'cmd_trace') => void;
  onRun: () => void;
  onCopy: () => void;
  onDownload: () => void;
  copied: boolean;
}

export default function Header({
  activeTab,
  setActiveTab,
  onRun,
  onCopy,
  onDownload,
  copied,
}: HeaderProps) {
  return (
    <header className="p-4 sm:p-6 rounded-2xl bg-black border-2 border-emerald-600/40 shadow-2xl relative overflow-hidden">
      {/* Palestine Flag Top Stripe Banner */}
      <div className="absolute top-0 left-0 right-0 h-1.5 flex">
        <div className="flex-1 bg-black" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-emerald-600" />
        <div className="w-8 bg-red-600" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mt-1">
        {/* Logo & Watermelon Heart */}
        <div className="flex items-center gap-3">
          <div className="relative p-1 rounded-xl bg-neutral-900 border border-emerald-500/30">
            <WatermelonHeart size={40} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-xl text-white tracking-wide">
                الموتون ☻'♥'٥
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-red-600/20 text-red-400 border border-red-500/30">
                🍉 Palestine Flag Theme
              </span>
            </div>
            <p className="text-xs text-emerald-400 font-mono">
              الكولاتز ☻'♥'٥ • Muton Unified Table
            </p>
          </div>
        </div>

        {/* View Switcher Buttons (Icon + minimal label) */}
        <div className="flex items-center gap-1.5 bg-neutral-900 p-1.5 rounded-xl border border-neutral-800">
          <button
            onClick={() => setActiveTab('delimited_csv')}
            title="Delimited CSV"
            className={`p-2.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
              activeTab === 'delimited_csv'
                ? "bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-900/40"
                : "text-gray-400 hover:text-white hover:bg-neutral-800"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>CSV</span>
          </button>

          <button
            onClick={() => setActiveTab('qalb_editor')}
            title="Heart (قلب) Esolang Code"
            className={`p-2.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
              activeTab === 'qalb_editor'
                ? "bg-red-600 text-white font-bold shadow-lg shadow-red-900/40"
                : "text-gray-400 hover:text-white hover:bg-neutral-800"
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Qalb</span>
          </button>

          <button
            onClick={() => setActiveTab('cmd_trace')}
            title="CMD Trace"
            className={`p-2.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
              activeTab === 'cmd_trace'
                ? "bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-900/40"
                : "text-gray-400 hover:text-white hover:bg-neutral-800"
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>CMD</span>
          </button>

          <button
            onClick={() => setActiveTab('muton_table')}
            title="Grid Matrix"
            className={`p-2.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
              activeTab === 'muton_table'
                ? "bg-red-600 text-white font-bold shadow-lg shadow-red-900/40"
                : "text-gray-400 hover:text-white hover:bg-neutral-800"
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Grid</span>
          </button>
        </div>

        {/* Action Buttons: Run / Copy / Download */}
        <div className="flex items-center gap-2">
          {activeTab === 'qalb_editor' && (
            <button
              onClick={onRun}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/40 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Run</span>
            </button>
          )}

          <button
            onClick={onCopy}
            className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-gray-200 border border-neutral-700 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-red-400" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>

          <button
            onClick={onDownload}
            className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs shadow-lg shadow-red-900/40 transition cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>
    </header>
  );
}
