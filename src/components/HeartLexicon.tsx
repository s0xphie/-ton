import React from "react";
import { BookOpen, ExternalLink, Code2, PlusCircle, HelpCircle } from "lucide-react";
import { QALB_KEYWORDS_DICT } from "../utils/qalbInterpreter";

interface HeartLexiconProps {
  onInsertKeyword: (example: string) => void;
  lang: 'ar' | 'en';
}

export default function HeartLexicon({ onInsertKeyword, lang }: HeartLexiconProps) {
  const isAr = lang === 'ar';

  return (
    <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-rose-400" />
            <h3 className="font-display font-bold text-lg text-white">
              {isAr ? "دليل لغة قلب (Heart Esolang Syntax Reference)" : "Heart (قلب) Syntax Lexicon"}
            </h3>
          </div>
          <p className="text-xs text-gray-400">
            {isAr
              ? "قاموس لغة قلب المصممة من قبل رمزي ناصر (Ramsey Nasser) عام 2012. انقر على أي عنصر لإدراجه في المحرر."
              : "Lexicon map for Qalb esolang by Ramsey Nasser (2012). Click any snippet to insert into the editor."}
          </p>
        </div>

        <a
          href="https://esolangs.org/wiki/%D9%82%D9%84%D8%A8"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-xs text-gray-300 hover:text-white transition cursor-pointer shrink-0"
        >
          <span>Esolangs Wiki Page</span>
          <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
        </a>
      </div>

      {/* Keywords Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {QALB_KEYWORDS_DICT.map((item) => (
          <div
            key={item.ar}
            onClick={() => onInsertKeyword(item.example)}
            className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-rose-500/50 hover:bg-neutral-900/60 transition group cursor-pointer space-y-2 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-base text-rose-300" dir="rtl">
                {item.ar}
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                Scheme: {item.scheme}
              </span>
            </div>

            <p className="text-xs text-gray-400">
              {isAr ? item.descAr : item.descEn}
            </p>

            <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-[11px] font-mono text-emerald-400/90">
              <span className="truncate">{item.example}</span>
              <PlusCircle className="w-3.5 h-3.5 text-gray-500 group-hover:text-rose-400 shrink-0 ml-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
