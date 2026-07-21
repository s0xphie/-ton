import React, { useState } from "react";
import { Volume2, Copy, Check, Table, Music, Search } from "lucide-react";
import { generateMutonSeries } from "../utils/mutonEngine";
import WatermelonHeart from "./WatermelonHeart";

export default function MutonTableView() {
  const rows = generateMutonSeries();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFrequency, setActiveFrequency] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const playTone = (cents: number, baseFreq = 220) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const freq = baseFreq * Math.pow(2, cents / 1200);
      setActiveFrequency(Math.round(freq));

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.25);

      setTimeout(() => {
        setActiveFrequency(null);
      }, 1250);
    } catch (e) {
      console.error(e);
    }
  };

  const filteredRows = rows.filter(r => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      r.d53.toString().includes(term) ||
      r.var20.toLowerCase().includes(term) ||
      r.note.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-4">
      {/* Search & Audio Status Bar */}
      <div className="p-3 bg-neutral-900 border border-emerald-600/40 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search digit or note (e.g., A, d53=12)..."
            className="w-full bg-black border border-neutral-800 pl-9 pr-4 py-1.5 rounded-lg text-xs text-white focus:outline-none focus:border-red-500"
          />
        </div>

        {activeFrequency && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600/20 border border-red-500/40 text-red-300 text-xs font-mono animate-pulse shrink-0">
            <WatermelonHeart size={16} />
            <span>Pitch: {activeFrequency} Hz</span>
          </div>
        )}
      </div>

      {/* Grid Table */}
      <div className="overflow-x-auto rounded-xl border-2 border-emerald-600/50 bg-black shadow-2xl">
        <table className="w-full text-xs text-left font-mono text-gray-200">
          <thead className="bg-neutral-900 text-red-400 border-b border-emerald-600/30">
            <tr>
              <th className="p-2.5 border-r border-neutral-800 text-center">🔊</th>
              <th className="p-2.5 border-r border-neutral-800 text-emerald-400">d53</th>
              <th className="p-2.5 border-r border-neutral-800">ratio53</th>
              <th className="p-2.5 border-r border-neutral-800 text-emerald-400">cents53</th>
              <th className="p-2.5 border-r border-neutral-800 text-red-400">d27</th>
              <th className="p-2.5 border-r border-neutral-800">ratio27</th>
              <th className="p-2.5 border-r border-neutral-800 text-red-400">cents27</th>
              <th className="p-2.5 border-r border-neutral-800 text-emerald-400">var20</th>
              <th className="p-2.5 border-r border-neutral-800">ratio20</th>
              <th className="p-2.5 border-r border-neutral-800 text-emerald-400">cents20</th>
              <th className="p-2.5 border-r border-neutral-800 text-red-400">d13</th>
              <th className="p-2.5 border-r border-neutral-800">ratio13</th>
              <th className="p-2.5 border-r border-neutral-800 text-red-400">cents13</th>
              <th className="p-2.5 text-white font-bold">note</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((r) => (
              <tr key={r.d53} className="border-b border-neutral-900 hover:bg-neutral-900/80 transition">
                <td className="p-2 border-r border-neutral-900 text-center">
                  <button
                    onClick={() => playTone(r.c53)}
                    className="p-1 rounded bg-neutral-900 hover:bg-emerald-600/20 text-emerald-400 border border-neutral-800 transition cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </td>
                <td className="p-2 border-r border-neutral-900 font-bold text-white">{r.d53}</td>
                <td className="p-2 border-r border-neutral-900 text-neutral-400">{r.r53.toFixed(9)}</td>
                <td className="p-2 border-r border-neutral-900 text-emerald-400 font-semibold">{r.c53.toFixed(3)}</td>

                <td className="p-2 border-r border-neutral-900 text-red-400">{r.d27}</td>
                <td className="p-2 border-r border-neutral-900 text-neutral-400">
                  {typeof r.r27 === 'number' ? r.r27.toFixed(9) : ""}
                </td>
                <td className="p-2 border-r border-neutral-900 text-red-400">
                  {typeof r.c27 === 'number' ? r.c27.toFixed(3) : ""}
                </td>

                <td className="p-2 border-r border-neutral-900 text-emerald-400 font-bold">{r.var20}</td>
                <td className="p-2 border-r border-neutral-900 text-neutral-400">
                  {typeof r.r20 === 'number' ? r.r20.toFixed(9) : ""}
                </td>
                <td className="p-2 border-r border-neutral-900 text-emerald-400">
                  {typeof r.c20 === 'number' ? r.c20.toFixed(3) : ""}
                </td>

                <td className="p-2 border-r border-neutral-900 text-red-400">{r.d13}</td>
                <td className="p-2 border-r border-neutral-900 text-neutral-400">
                  {typeof r.r13 === 'number' ? r.r13.toFixed(9) : ""}
                </td>
                <td className="p-2 border-r border-neutral-900 text-red-400">
                  {typeof r.c13 === 'number' ? r.c13.toFixed(3) : ""}
                </td>
                <td className="p-2 font-bold text-white">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
