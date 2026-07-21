export interface TableColumn {
  id: string;
  nameAr: string;
  nameEn: string;
  type: 'text' | 'number' | 'badge';
}

export interface TableRow {
  id: string;
  [key: string]: any;
}

export interface HeartPreset {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: 'table' | 'algorithm' | 'art' | 'basic';
  code: string;
}

export interface QalbKeyword {
  ar: string;
  en: string;
  scheme: string;
  category: 'control' | 'data' | 'io' | 'math';
  descAr: string;
  descEn: string;
  example: string;
}

export interface ExecutionResult {
  logs: string[];
  durationMs: number;
  success: boolean;
  error?: string;
}
