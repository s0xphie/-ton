import React from "react";
import { Terminal, Trash2, Play, Check } from "lucide-react";
import { ExecutionResult } from "../types";
import WatermelonHeart from "./WatermelonHeart";

interface HeartTerminalProps {
  result: ExecutionResult | null;
  onClear: () => void;
  onRunAgain: () => void;
  isRunning: boolean;
}

export default function HeartTerminal({
  result,
  onClear,
  onRunAgain,
  isRunning,
}: HeartTerminalProps) {
  return (
    <div className="rounded-xl border-2 border-emerald-600/50 bg-black overflow-hidden shadow-2xl flex flex-col h-[550px]">
      {/* Terminal Bar */}
      <div className="p-3 bg-neutral-900 border-b border-emerald-600/30 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <WatermelonHeart size={18} />
          <span className="font-bold text-white">Qalb Terminal (قلب)</span>
          {result && (
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                result.success
                  ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
                  : "bg-red-600/30 text-red-300 border border-red-500/40"
              }`}
            >
              {result.success ? "SUCCESS" : "ERROR"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRunAgain}
            disabled={isRunning}
            className="p-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer"
            title="Run"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
          </button>
          <button
            onClick={onClear}
            className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-gray-400 hover:text-white transition cursor-pointer"
            title="Clear"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Output Console Body */}
      <div className="p-4 flex-1 overflow-y-auto font-mono text-xs leading-relaxed bg-black text-gray-100 selection:bg-red-600/40">
        {isRunning ? (
          <div className="flex items-center justify-center h-full gap-2 text-emerald-400 animate-pulse">
            <WatermelonHeart size={24} className="animate-spin" />
            <span>Executing Heart S-expressions...</span>
          </div>
        ) : !result ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-600 space-y-2">
            <Terminal className="w-8 h-8 text-neutral-800" />
            <p>Click Run to execute Heart code</p>
          </div>
        ) : (
          <div className="space-y-1">
            {result.logs.map((log, idx) => (
              <div key={idx} className="flex gap-2 text-emerald-400 hover:bg-neutral-900/60 py-0.5 px-1 rounded">
                <span className="text-red-500 font-bold shrink-0">›</span>
                <span className="whitespace-pre-wrap break-all">{log}</span>
              </div>
            ))}

            {result.error && (
              <div className="mt-4 p-3 rounded-lg bg-red-950/40 border border-red-600/50 text-red-400 font-bold text-xs">
                ❌ {result.error}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
