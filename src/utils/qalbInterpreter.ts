import { ExecutionResult } from "../types";

export const QALB_KEYWORDS_DICT = [
  { ar: "تعريف", en: "define", scheme: "define", category: "control", descAr: "ربط متغیر أو دالة باسم جديد", descEn: "Variable or function definition", example: '(تعريف س 10)' },
  { ar: "دالة", en: "function", scheme: "lambda", category: "control", descAr: "إنشاء دالة مجهولة الاسم (لامدا)", descEn: "Lambda function creation", example: '(دالة (س) (* س س))' },
  { ar: "قلب", en: "main / qalb", scheme: "main", category: "control", descAr: "نقطة الدخول الرئيسية للبرنامج", descEn: "Main entry point block", example: '(تعريف قلب (دالة () (عرض "مرحبا")))' },
  { ar: "إذا", en: "if", scheme: "if", category: "control", descAr: "تعبير شرطي (إذا شرط صح خطأ)", descEn: "Conditional expression", example: '(إذا (> س 0) "موجب" "سالب")' },
  { ar: "عرض", en: "print", scheme: "display", category: "io", descAr: "طباعة نص أو قيمة في الشاشة", descEn: "Print or display output to console", example: '(عرض "مرحبا بالجميع")' },
  { ar: "قائمة", en: "list", scheme: "list", category: "data", descAr: "إنشاء قائمة من العناصر", descEn: "Construct a list", example: '(قائمة 1 2 3 4)' },
  { ar: "أول", en: "head / car", scheme: "car", category: "data", descAr: "الحصول على العنصر الأول في القائمة", descEn: "Get first element of list", example: '(أول (قائمة 10 20))' },
  { ar: "باقي", en: "tail / cdr", scheme: "cdr", category: "data", descAr: "الحصول على باقي القائمة بعد العنصر الأول", descEn: "Get tail of list", example: '(باقي (قائمة 10 20 30))' },
  { ar: "لكل", en: "for-each", scheme: "for-each", category: "control", descAr: "التكرار على جميع عناصر القائمة", descEn: "Iterate through each item in list", example: '(لكل عنصر في (قائمة 1 2) (عرض عنصر))' },
  { ar: "طول", en: "length", scheme: "length", category: "data", descAr: "حساب عدد عناصر القائمة", descEn: "Get list length", example: '(طول (قائمة 1 2 3))' },
  { ar: "صحيح", en: "true", scheme: "#t", category: "control", descAr: "القيمة المنطقية صحيح", descEn: "Boolean true", example: 'صحيح' },
  { ar: "خطأ", en: "false", scheme: "#f", category: "control", descAr: "القيمة المنطقية خطأ", descEn: "Boolean false", example: 'خطأ' },
  { ar: "رسم-جدول", en: "render-table", scheme: "draw-table", category: "io", descAr: "تنسيق مصفوفة ثنائية إلى جدول نصي جميل", descEn: "Render 2D list into formatted ASCII table", example: '(رسم-جدول عناوين-الجدول صفوف-الجدول)' },
  { ar: "دمج-نصوص", en: "concat", scheme: "string-append", category: "io", descAr: "دمج عدة نصوص معاً", descEn: "Concatenate text strings", example: '(دمج-نصوص "مرحبا " "بكم")' }
];

function escapeString(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

/**
 * Generates valid Heart (قلب) code from structured table data
 */
export function buildQalbTableCode(
  title: string,
  headers: { id: string; labelAr: string; labelEn: string }[],
  rows: Record<string, any>[]
): string {
  const timestamp = new Date().toISOString().split('T')[0];

  let code = `;; ====================================================================
;;  جدول بيانات مُنشأ بلغة قلب (Heart Esolang Table Output Generator)
;;  Generated: ${timestamp} | Rows: ${rows.length}
;;  Language: Qalb (قلب) by Ramsey Nasser (2012)
;; ====================================================================

;; تعريف عنوان الجدول
(تعريف عنوان-الجدول "${escapeString(title)}")

;; تعريف عناوين الأعمدة
(تعريف عناوين-الأعمدة
  (قائمة ${headers.map(h => `"${escapeString(h.labelAr || h.labelEn)}"`).join(' ')})
)

;; تعريف مصفوفة بيانات الصفوف
(تعريف صفوف-البيانات
  (قائمة
`;

  rows.forEach((row) => {
    const rowVals = headers.map(h => {
      const val = row[h.id];
      if (typeof val === 'number') return val.toString();
      return `"${escapeString(String(val ?? ''))}"`;
    }).join(' ');

    code += `    (قائمة ${rowVals})\n`;
  });

  code += `  )
)

;; دالة تحويل العناصر إلى نص منظم للجدول
(تعريف تنسيق-صف
  (دالة (صف)
    (إذا (تساوي-قائمة? صف (قائمة))
      ""
      (دمج-نصوص "│ " (أول صف) " \t" (تنسيق-صف (باقي صف))))))

;; --------------------------------------------------------------------
;;  البرنامج الرئيسي (Heart / قلب Entry Point)
;; --------------------------------------------------------------------
(تعريف قلب
  (دالة ()
    (عرض "==========================================================")
    (عرض (+ "  📊 " عنوان-الجدول))
    (عرض "==========================================================")
    
    ;; رسم وتفريغ الجدول باستخدام الأداة البرمجية
    (رسم-جدول عناوين-الأعمدة صفوف-البيانات)
    
    (عرض "----------------------------------------------------------")
    (عرض (+ "إجمالي صفوف الجدول: " (طول صفوف-البيانات)))
    (عرض "==========================================================")
    (عرض "تم تنفيذ برنامج لغة قلب (Qalb Esolang) بنجاح!")))

;; تشغيل نقطة الدخول
(قلب)
`;

  return code;
}

/**
 * Tokenizer for Heart (قلب) Scheme expressions
 */
function tokenize(code: string): string[] {
  // Remove single line comments starting with ;
  const lines = code.split('\n');
  const cleanedLines = lines.map(line => {
    const commentIdx = line.indexOf(';');
    return commentIdx >= 0 ? line.slice(0, commentIdx) : line;
  });
  const cleaned = cleanedLines.join('\n');

  const tokens: string[] = [];
  let i = 0;

  while (i < cleaned.length) {
    const char = cleaned[i];

    if (/\s/.test(char)) {
      i++;
      continue;
    }

    if (char === '(' || char === ')') {
      tokens.push(char);
      i++;
      continue;
    }

    if (char === '"') {
      let str = '"';
      i++;
      while (i < cleaned.length) {
        if (cleaned[i] === '\\' && i + 1 < cleaned.length) {
          if (cleaned[i + 1] === 'n') str += '\n';
          else str += cleaned[i + 1];
          i += 2;
        } else if (cleaned[i] === '"') {
          str += '"';
          i++;
          break;
        } else {
          str += cleaned[i];
          i++;
        }
      }
      tokens.push(str);
      continue;
    }

    let start = i;
    while (i < cleaned.length && !/\s|\(|\)|"/.test(cleaned[i])) {
      i++;
    }
    tokens.push(cleaned.slice(start, i));
  }

  return tokens;
}

/**
 * Interpreter for Heart (قلب) esolang code
 */
export function executeQalbCode(code: string): ExecutionResult {
  const startTime = performance.now();
  const logs: string[] = [];

  try {
    const tokens = tokenize(code);
    let tokenIdx = 0;

    function parse(): any {
      if (tokenIdx >= tokens.length) return null;
      const tok = tokens[tokenIdx++];

      if (tok === '(') {
        const list: any[] = [];
        while (tokenIdx < tokens.length && tokens[tokenIdx] !== ')') {
          list.push(parse());
        }
        if (tokenIdx < tokens.length && tokens[tokenIdx] === ')') {
          tokenIdx++;
        }
        return list;
      } else if (tok === ')') {
        return null;
      } else if (tok.startsWith('"') && tok.endsWith('"')) {
        return tok.slice(1, -1);
      } else if (!isNaN(Number(tok))) {
        return Number(tok);
      } else {
        return { type: 'sym', name: tok };
      }
    }

    const ast: any[] = [];
    while (tokenIdx < tokens.length) {
      const expr = parse();
      if (expr !== null) ast.push(expr);
    }

    // Global Environment
    const env: Record<string, any> = {
      'عرض': (...args: any[]) => {
        const text = args.map(formatVal).join(' ');
        logs.push(text);
        return text;
      },
      'دمج-نصوص': (...args: any[]) => args.map(formatVal).join(''),
      '+': (...args: any[]) => {
        if (args.every(a => typeof a === 'number')) {
          return args.reduce((s, n) => s + n, 0);
        }
        return args.map(formatVal).join('');
      },
      '-': (...args: number[]) => args.length === 1 ? -args[0] : args.reduce((a, b) => a - b),
      '*': (...args: number[]) => args.reduce((a, b) => a * b, 1),
      '/': (...args: number[]) => args.reduce((a, b) => a / b),
      '=': (a: any, b: any) => a === b,
      '>': (a: number, b: number) => a > b,
      '<': (a: number, b: number) => a < b,
      'طول': (list: any[]) => Array.isArray(list) ? list.length : 0,
      'أول': (list: any[]) => Array.isArray(list) && list.length > 0 ? list[0] : null,
      'باقي': (list: any[]) => Array.isArray(list) ? list.slice(1) : [],
      'قائمة': (...args: any[]) => args,
      'ربط-قائمة': (l1: any[], l2: any[]) => (Array.isArray(l1) ? l1 : [l1]).concat(Array.isArray(l2) ? l2 : [l2]),
      'تساوي-قائمة?': (l: any[]) => Array.isArray(l) && l.length === 0,
      'صحيح': true,
      'خطأ': false,
      'رسم-جدول': (headers: any[], rows: any[][]) => {
        if (!Array.isArray(headers) || !Array.isArray(rows)) return;
        
        const colWidths: number[] = headers.map(h => String(h).length);
        rows.forEach(r => {
          if (Array.isArray(r)) {
            r.forEach((cell, cIdx) => {
              const str = String(cell);
              if (cIdx < colWidths.length) {
                colWidths[cIdx] = Math.max(colWidths[cIdx], str.length);
              }
            });
          }
        });

        // Top border
        const topBorder = "┌" + colWidths.map(w => "─".repeat(w + 2)).join("┬") + "┐";
        logs.push(topBorder);

        // Header row
        const headerRow = "│" + headers.map((h, i) => ` ${String(h).padEnd(colWidths[i])} `).join("│") + "│";
        logs.push(headerRow);

        // Separator
        const sepBorder = "├" + colWidths.map(w => "─".repeat(w + 2)).join("┼") + "┤";
        logs.push(sepBorder);

        // Rows
        rows.forEach(r => {
          if (Array.isArray(r)) {
            const rowStr = "│" + r.map((cell, i) => ` ${String(cell).padEnd(colWidths[i] || 10)} `).join("│") + "│";
            logs.push(rowStr);
          }
        });

        // Bottom border
        const bottomBorder = "└" + colWidths.map(w => "─".repeat(w + 2)).join("┴") + "┘";
        logs.push(bottomBorder);
      }
    };

    function evalExpr(expr: any, localEnv: Record<string, any>): any {
      if (expr === null || expr === undefined) return null;
      if (typeof expr === 'number' || typeof expr === 'boolean' || typeof expr === 'string') {
        return expr;
      }

      if (expr && expr.type === 'sym') {
        const name = expr.name;
        if (name in localEnv) return localEnv[name];
        return name;
      }

      if (Array.isArray(expr)) {
        if (expr.length === 0) return [];

        const head = expr[0];
        const opName = head && head.type === 'sym' ? head.name : null;

        if (opName === 'تعريف') {
          const varSym = expr[1];
          const name = varSym?.name || varSym;
          const val = evalExpr(expr[2], localEnv);
          localEnv[name] = val;
          return val;
        }

        if (opName === 'دالة') {
          const params = (expr[1] || []).map((p: any) => p.name || p);
          const bodyExprs = expr.slice(2);

          return (...args: any[]) => {
            const fnEnv = { ...localEnv };
            params.forEach((paramName: string, idx: number) => {
              fnEnv[paramName] = args[idx];
            });
            let res = null;
            for (const bodyExpr of bodyExprs) {
              res = evalExpr(bodyExpr, fnEnv);
            }
            return res;
          };
        }

        if (opName === 'إذا') {
          const cond = evalExpr(expr[1], localEnv);
          if (cond) {
            return evalExpr(expr[2], localEnv);
          } else if (expr.length > 3) {
            return evalExpr(expr[3], localEnv);
          }
          return null;
        }

        if (opName === 'لكل') {
          // (لكل عنصر في قائمة (جسم))
          const varName = expr[1]?.name || expr[1];
          const listVal = evalExpr(expr[3], localEnv);
          const bodyExpr = expr[4];

          if (Array.isArray(listVal)) {
            for (const item of listVal) {
              const iterEnv = { ...localEnv, [varName]: item };
              evalExpr(bodyExpr, iterEnv);
            }
          }
          return null;
        }

        const fn = evalExpr(head, localEnv);
        if (typeof fn === 'function') {
          const args = expr.slice(1).map(a => evalExpr(a, localEnv));
          return fn(...args);
        }

        return expr.map(a => evalExpr(a, localEnv));
      }

      return expr;
    }

    // Evaluate top level statements
    for (const statement of ast) {
      evalExpr(statement, env);
    }

    // If 'قلب' was defined as a function, execute it
    if (env['قلب'] && typeof env['قلب'] === 'function') {
      env['قلب']();
    }

    const durationMs = Math.round(performance.now() - startTime);
    return {
      logs,
      durationMs,
      success: true
    };
  } catch (err: any) {
    const durationMs = Math.round(performance.now() - startTime);
    return {
      logs,
      durationMs,
      success: false,
      error: err.message || "حدث خطأ أثناء تقييم الكود البرمجي بلغة قلب"
    };
  }
}

function formatVal(val: any): string {
  if (val === null || val === undefined) return "";
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return val.toString();
  if (typeof val === 'boolean') return val ? "صحيح" : "خطأ";
  if (Array.isArray(val)) {
    return `(${val.map(formatVal).join(' ')})`;
  }
  return String(val);
}
