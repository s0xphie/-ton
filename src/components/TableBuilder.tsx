import React, { useState } from "react";
import { Table, Plus, Trash2, Code2, Sparkles, RefreshCw, FileSpreadsheet, Check } from "lucide-react";
import { buildQalbTableCode } from "../utils/qalbInterpreter";

interface TableBuilderProps {
  onCodeGenerated: (code: string) => void;
  lang: 'ar' | 'en';
}

export default function TableBuilder({ onCodeGenerated, lang }: TableBuilderProps) {
  const isAr = lang === 'ar';

  const [tableTitle, setTableTitle] = useState("جدول بيانات الأداء والتصنيف 2026");
  const [headers, setHeaders] = useState([
    { id: "col1", labelAr: "المعرف", labelEn: "ID" },
    { id: "col2", labelAr: "اسم العنصر", labelEn: "Item Name" },
    { id: "col3", labelAr: "التصنيف", labelEn: "Category" },
    { id: "col4", labelAr: "درجة الأهمية", labelEn: "Rating" }
  ]);

  const [rows, setRows] = useState<Record<string, any>[]>([
    { col1: "ITEM-01", col2: "محرك ترجمة JIT", col3: "نواة المحرك", col4: "ممتاز (5/5)" },
    { col1: "ITEM-02", col2: "ذاكرة WASM", col3: "الأمان", col4: "حرج (5/5)" },
    { col1: "ITEM-03", col2: "مجمع القمامة GC", col3: "إدارة الذاكرة", col4: "متوسط (3/5)" },
    { col1: "ITEM-04", col2: "محلل الأوامر", col3: "الواجهة", col4: "جيد (4/5)" }
  ]);

  const [generatedMsg, setGeneratedMsg] = useState(false);

  const handleAddHeader = () => {
    const newId = `col${headers.length + 1}`;
    setHeaders([...headers, { id: newId, labelAr: `عمود ${headers.length + 1}`, labelEn: `Col ${headers.length + 1}` }]);
    setRows(rows.map(r => ({ ...r, [newId]: "-" })));
  };

  const handleRemoveHeader = (id: string) => {
    if (headers.length <= 1) return;
    setHeaders(headers.filter(h => h.id !== id));
    setRows(rows.map(r => {
      const copy = { ...r };
      delete copy[id];
      return copy;
    }));
  };

  const handleAddRow = () => {
    const newRow: Record<string, any> = {};
    headers.forEach((h, idx) => {
      newRow[h.id] = idx === 0 ? `ITEM-0${rows.length + 1}` : `عنصر جديد ${rows.length + 1}`;
    });
    setRows([...rows, newRow]);
  };

  const handleRemoveRow = (index: number) => {
    if (rows.length <= 1) return;
    setRows(rows.filter((_, idx) => idx !== index));
  };

  const handleCellChange = (rowIdx: number, colId: string, value: string) => {
    const updated = [...rows];
    updated[rowIdx][colId] = value;
    setRows(updated);
  };

  const handleHeaderChange = (colId: string, val: string) => {
    setHeaders(headers.map(h => h.id === colId ? { ...h, labelAr: val, labelEn: val } : h));
  };

  const handleGenerate = () => {
    const code = buildQalbTableCode(tableTitle, headers, rows);
    onCodeGenerated(code);
    setGeneratedMsg(true);
    setTimeout(() => setGeneratedMsg(false), 2500);
  };

  return (
    <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <FileSpreadsheet className="w-5 h-5" />
            </span>
            <h3 className="font-display font-bold text-lg text-white">
              {isAr ? "مُنشئ الجداول والبيانات بلغة قلب (Visual Table Builder)" : "Visual Heart Table Builder"}
            </h3>
          </div>
          <p className="text-xs text-gray-400">
            {isAr
              ? "صمّم الجدول والصفوف تفاعلياً، ثم انقر لتحويله مباشرة إلى كود برمجي تنفيذي بلغة قلب (Qalb Esolang)."
              : "Design headers and rows interactively, then generate executable Heart esolang code."}
          </p>
        </div>

        <button
          onClick={handleGenerate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-semibold text-xs transition duration-200 shadow-lg shadow-rose-900/30 cursor-pointer"
          id="generate-qalb-table-btn"
        >
          {generatedMsg ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>{isAr ? "تم توليد الكود!" : "Code Generated!"}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? "توليد كود قلب للجدول" : "Generate Heart Code"}</span>
            </>
          )}
        </button>
      </div>

      {/* Table Title Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-300">
          {isAr ? "عنوان الجدول (Table Title):" : "Table Title:"}
        </label>
        <input
          type="text"
          value={tableTitle}
          onChange={(e) => setTableTitle(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-rose-500/60 font-medium"
        />
      </div>

      {/* Editable Table Grid */}
      <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950">
        <table className="w-full text-xs text-left text-gray-200">
          <thead className="bg-neutral-900 text-gray-300 font-mono border-b border-neutral-800">
            <tr>
              {headers.map((h) => (
                <th key={h.id} className="p-3 border-r border-neutral-800/60 min-w-[140px]">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={h.labelAr}
                      onChange={(e) => handleHeaderChange(h.id, e.target.value)}
                      className="w-full bg-neutral-950 px-2 py-1 rounded border border-neutral-800 text-rose-300 font-bold focus:outline-none focus:border-rose-500 text-xs"
                    />
                    {headers.length > 1 && (
                      <button
                        onClick={() => handleRemoveHeader(h.id)}
                        className="text-gray-500 hover:text-rose-400 p-1 cursor-pointer"
                        title="حذف العمود"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
              <th className="p-3 text-center w-16">
                <button
                  onClick={handleAddHeader}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-rose-300 transition cursor-pointer"
                  title="إضافة عمود جديد"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="border-b border-neutral-800/50 hover:bg-neutral-900/40 transition">
                {headers.map((h) => (
                  <td key={h.id} className="p-2 border-r border-neutral-800/40">
                    <input
                      type="text"
                      value={row[h.id] ?? ''}
                      onChange={(e) => handleCellChange(rIdx, h.id, e.target.value)}
                      className="w-full bg-transparent px-2 py-1 rounded border border-transparent hover:border-neutral-800 focus:border-rose-500/50 focus:bg-neutral-900 text-gray-200 focus:outline-none"
                    />
                  </td>
                ))}
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleRemoveRow(rIdx)}
                    disabled={rows.length <= 1}
                    className="text-neutral-600 hover:text-rose-400 p-1 transition disabled:opacity-30 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Actions */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{rows.length} {isAr ? "صفوف بيانات" : "rows"} | {headers.length} {isAr ? "أعمدة" : "columns"}</span>

        <button
          onClick={handleAddRow}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-gray-200 border border-neutral-700 transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-rose-400" />
          <span>{isAr ? "إضافة صف جديد" : "Add Row"}</span>
        </button>
      </div>
    </div>
  );
}
