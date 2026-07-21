// Heart Esolang Data definitions
export interface QalbDataItem {
  id: string;
  nameAr: string;
  nameEn: string;
  category: string;
  rating: number;
}

export const SAMPLE_QALB_DATA: QalbDataItem[] = [
  { id: "ITEM-01", nameAr: "محرك JIT", nameEn: "JIT Engine", category: "V8 Kernel", rating: 5 },
  { id: "ITEM-02", nameAr: "ذاكرة WASM", nameEn: "WASM Memory", category: "Security", rating: 5 },
  { id: "ITEM-03", nameAr: "مجمع القمامة", nameEn: "Garbage Collector", category: "Memory", rating: 3 }
];
