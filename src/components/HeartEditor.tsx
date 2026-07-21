import React from "react";
import { Play, Code2 } from "lucide-react";
import WatermelonHeart from "./WatermelonHeart";

interface HeartEditorProps {
  code: string;
  setCode: (c: string) => void;
  onRun: () => void;
  isRunning: boolean;
}

export default function HeartEditor({
  code,
  setCode,
  onRun,
  isRunning,
}: HeartEditorProps) {
  return (
    <div className="rounded-xl border-2 border-red-600/50 bg-black overflow-hidden shadow-2xl flex flex-col h-[550px]">
      {/* Editor Header Bar */}
      <div className="p-3 bg-neutral-900 border-b border-red-600/30 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <WatermelonHeart size={18} />
          <span className="font-bold text-white">Heart Editor (محرر قلب)</span>
        </div>

        <button
          onClick={onRun}
          disabled={isRunning}
          className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition cursor-pointer flex items-center gap-1.5"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Run</span>
        </button>
      </div>

      {/* Textarea */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full flex-1 p-4 bg-black text-emerald-300 font-mono text-xs leading-relaxed focus:outline-none resize-none selection:bg-red-600/40"
        spellCheck={false}
        dir="auto"
      />
    </div>
  );
}
