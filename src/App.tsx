import React, { useState, useEffect, useRef } from "react";
import WatermelonHeart from "./components/WatermelonHeart";
import { generateModifiedCSV, generateOriginalArabicCSV, toArabicNumerals } from "./utils/mutonEngine";

export default function App() {
  const [lines, setLines] = useState<string[]>([]);
  const [isPrinting, setIsPrinting] = useState(false);
  const [mode, setMode] = useState<'collatzed' | 'original'>('collatzed');
  const [saved, setSaved] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<any>(null);

  const line1 = "قلب";
  const line2 = "مرحبا يا عالم!";
  const line3Formatted = `(حدد الكولاتز (لامـدا(ن)
    (قــــــــــول ن)
    (إذا (يساوي؟ ١ ن)
                 ( ن)
                 ((حدد نــــصف (قسم ن ٢))
                  (إذا (يساوي؟ نـصف 
                         (أرض  نـصف))   
                    (الكولاتــز نـصف)
                    (الكولاتــز (جمع ١ 
                               (ضرب ن ٣))))))))`;

  const getFullContent = (targetMode: 'collatzed' | 'original') => {
    const csvBody = targetMode === 'collatzed' ? generateModifiedCSV() : generateOriginalArabicCSV();
    return `${line1}\n${line2}\n${line3Formatted}\n${csvBody}`;
  };

  const startStreaming = (targetMode: 'collatzed' | 'original' = mode) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setLines([]);
    setIsPrinting(true);

    const fullContent = getFullContent(targetMode);
    const allLines = fullContent.trim().split("\n");
    let currentIdx = 0;

    intervalRef.current = setInterval(() => {
      if (currentIdx < allLines.length) {
        const nextBatch = allLines.slice(currentIdx, currentIdx + 4);
        setLines(prev => [...prev, ...nextBatch]);
        currentIdx += 4;
      } else {
        clearInterval(intervalRef.current);
        setIsPrinting(false);
      }
    }, 10);
  };

  useEffect(() => {
    startStreaming('collatzed');
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const handleHeartClick = () => {
    const nextMode = mode === 'collatzed' ? 'original' : 'collatzed';
    setMode(nextMode);
    startStreaming(nextMode);
  };

  const handleSaveFile = () => {
    const textToSave = getFullContent(mode);
    const blob = new Blob([textToSave], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "شجرة.قلب";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="w-screen h-screen bg-black text-[#86efac] font-mono p-0 m-0 overflow-hidden relative flex flex-col items-center justify-center selection:bg-red-600 selection:text-white">
      {/* Top Left Arabic Sun Symbol Save File Button (#FFFFC0 / rgb(255, 255, 192)) */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
        <button
          onClick={handleSaveFile}
          className="cursor-pointer p-1 bg-transparent border-0 outline-none select-none flex items-center gap-1.5 hover:scale-110 active:scale-95 transition-transform"
          title="حفظ الملف شجرة.قلب"
          aria-label="Save file as شجرة.قلب"
        >
          {/* 255 255 192 (#FFFFC0) Arabic Sun Symbol SVG */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFC0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_8px_rgba(255,255,192,0.6)]"
          >
            <circle cx="12" cy="12" r="4" fill="#FFFFC0" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
          {saved && (
            <span className="text-[10px] font-sans text-[#FFFFC0] bg-neutral-900/90 border border-[#FFFFC0]/30 px-2 py-0.5 rounded shadow">
              تم حفظ شجرة.قلب!
            </span>
          )}
        </button>
      </div>

      {/* Directly Centered Watermelon Heart Hovering Over Everything - No Borders */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-auto">
        <button
          onClick={handleHeartClick}
          className="cursor-pointer p-0 bg-transparent border-0 outline-none select-none block hover:scale-110 active:scale-90 transition-transform duration-200"
          title="allahku akbar"
          aria-label="allahku akbar"
        >
          <WatermelonHeart size={72} />
        </button>
      </div>

      {/* Flex Div Container holding the compressed / scaled-down console output scaled to 333.33333% */}
      <div className="flex-1 w-full h-full flex flex-col items-center justify-center p-2 overflow-hidden">
        <div
          ref={containerRef}
          className="w-full h-full overflow-y-auto whitespace-pre leading-tight font-mono text-[#86efac] p-2 select-text text-right flex flex-col justify-start [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          dir="rtl"
          style={{
            fontSize: "3.2px",
            lineHeight: "1.15",
            zoom: "333.33333%",
          }}
        >
          {lines.map((line, idx) => (
            <div key={idx} className="flex items-baseline m-0 p-0 hover:bg-neutral-900/80">
              <span className="text-red-500/80 select-none w-5 text-left pl-0.5 pr-0.5 shrink-0 font-bold text-[3px] font-mono leading-none">
                {toArabicNumerals(idx + 1)}
              </span>
              <span className="text-[#86efac] font-medium leading-tight">
                {line}
              </span>
            </div>
          ))}

          {isPrinting && (
            <span className="inline-block w-1 h-2 bg-[#86efac] ml-1 align-baseline animate-pulse" />
          )}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}


