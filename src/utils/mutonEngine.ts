export interface MutonRow {
  d53: number;
  r53: number;
  c53: number;
  d27: number | "";
  r27: number | "";
  c27: number | "";
  var20: string;
  r20: number | "";
  c20: number | "";
  d13: number | "";
  r13: number | "";
  c13: number | "";
  note: string;
}

const VAR20_LIST = [
  "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w"
];

const NOTE_NAMES = [
  "A", "A#", "B", "C", "C#", "D",
  "D#", "E", "F", "F#", "G", "G#",
  "Z" // A half-flat
];

/**
 * Computes the 53-entry Muton unified macroset series matching muton.py / README.py exactly
 */
export function generateMutonSeries(): MutonRow[] {
  const rows: MutonRow[] = [];

  for (let d53 = 0; d53 < 53; d53++) {
    const r53 = Math.pow(2, d53 / 53);
    const c53 = 1200 * (d53 / 53);

    // base27 (0..27)
    let d27: number | "" = "";
    let r27: number | "" = "";
    let c27: number | "" = "";
    if (d53 <= 27) {
      d27 = d53;
      r27 = Math.pow(2, d53 / 27);
      c27 = 1200 * (d53 / 27);
    }

    // base20 (d53 in 9..28 -> idx 1..20)
    let var20 = "";
    let r20: number | "" = "";
    let c20: number | "" = "";
    if (d53 >= 9 && d53 <= 28) {
      const idx20 = d53 - 8; // 1..20
      if (idx20 >= 1 && idx20 <= 20) {
        var20 = VAR20_LIST[idx20 - 1];
        r20 = Math.pow(2, idx20 / 20);
        c20 = 1200 * (idx20 / 20);
      }
    }

    // base13 (d53 in 9..21 -> idx13 0..12)
    let d13: number | "" = "";
    let r13: number | "" = "";
    let c13: number | "" = "";
    let note = "";
    if (d53 >= 9 && d53 <= 21) {
      const idx13 = d53 - 9; // 0..12
      if (idx13 >= 0 && idx13 <= 12) {
        d13 = idx13;
        c13 = idx13 <= 11 ? idx13 * 100.0 : 1150.0;
        r13 = Math.pow(2, c13 / 1200.0);
        note = NOTE_NAMES[idx13];
      }
    }

    rows.push({
      d53,
      r53,
      c53,
      d27,
      r27,
      c27,
      var20,
      r20,
      c20,
      d13,
      r13,
      c13,
      note
    });
  }

  return rows;
}

export function toArabicNumerals(str: string | number): string {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(str).replace(/\d/g, d => arabicDigits[parseInt(d, 10)]);
}

/**
 * Executes Collatz sequence for n and outputs Arabic numeral steps, broken into indented lines
 */
export function runArabicCollatz(n: number): string {
  if (n <= 0 || !Number.isInteger(n)) return "";
  const steps: number[] = [];
  let curr = n;
  let safety = 0;
  while (curr !== 1 && safety < 1000) {
    steps.push(curr);
    if (curr % 2 === 0) {
      curr = curr / 2;
    } else {
      curr = 3 * curr + 1;
    }
    safety++;
  }
  steps.push(1);
  return steps.map((s, idx) => `\n${" ".repeat(idx + 2)}(${toArabicNumerals(s)})`).join("");
}

/**
 * Builds a recursively inflated nested parenthesis tree for the Collatz sequence of n with line breaks and indentation
 */
export function buildArabicCollatzTree(n: number, indent = 2, depth = 0): string {
  if (n <= 0 || !Number.isInteger(n) || depth > 30) return `\n${" ".repeat(indent)}(١)`;
  if (n === 1) return `\n${" ".repeat(indent)}(١)`;
  const pad = " ".repeat(indent);
  if (n % 2 === 0) {
    const half = n / 2;
    return `\n${pad}((قسم ${toArabicNumerals(n)} ٢)${buildArabicCollatzTree(half, indent + 2, depth + 1)})`;
  } else {
    const nextVal = 3 * n + 1;
    return `\n${pad}((جمع ١ (ضرب ${toArabicNumerals(n)} ٣))${buildArabicCollatzTree(nextVal, indent + 2, depth + 1)})`;
  }
}

/**
 * Generates the Original Plain Arabic Table (RTL) with Arabic numerals
 */
export function generateOriginalArabicCSV(): string {
  const rows = generateMutonSeries();
  const headersRTL = [
    "نغمة", "سنت١٣", "نسبة١٣", "د١٣",
    "سنت٢٠", "نسبة٢٠", "متغير٢٠",
    "سنت٢٧", "نسبة٢٧", "د٢٧",
    "سنت٥٣", "نسبة٥٣", "د٥٣"
  ];

  const outputLines: string[] = [];
  outputLines.push(headersRTL.join("   "));

  rows.forEach((r) => {
    const rawValuesStandard = [
      typeof r.d53 === 'number' ? toArabicNumerals(r.d53) : "",
      typeof r.r53 === 'number' ? toArabicNumerals(r.r53.toFixed(9)) : "",
      typeof r.c53 === 'number' ? toArabicNumerals(r.c53.toFixed(3)) : "",
      r.d27 !== "" ? toArabicNumerals(r.d27) : "",
      typeof r.r27 === 'number' ? toArabicNumerals(r.r27.toFixed(9)) : "",
      typeof r.c27 === 'number' ? toArabicNumerals(r.c27.toFixed(3)) : "",
      r.var20 !== "" ? toArabicNumerals(r.var20) : "",
      typeof r.r20 === 'number' ? toArabicNumerals(r.r20.toFixed(9)) : "",
      typeof r.c20 === 'number' ? toArabicNumerals(r.c20.toFixed(3)) : "",
      r.d13 !== "" ? toArabicNumerals(r.d13) : "",
      typeof r.r13 === 'number' ? toArabicNumerals(r.r13.toFixed(9)) : "",
      typeof r.c13 === 'number' ? toArabicNumerals(r.c13.toFixed(3)) : "",
      r.note !== "" ? toArabicNumerals(r.note) : ""
    ];

    const rawValuesRTL = [...rawValuesStandard].reverse();
    outputLines.push(rawValuesRTL.map(v => v !== "" ? v : "ـ").join("   "));
  });

  return outputLines.join("\n");
}

/**
 * Custom Delimiter CSV Generator
 * Reflects table right-to-left and inflates non-empty cells with recursive Arabic Collatz trees
 */
export function generateModifiedCSV(_delimiter?: string): string {
  const rows = generateMutonSeries();

  // Reflected headers (Right-to-Left order)
  const headersRTL = [
    "نغمة", "سنت١٣", "نسبة١٣", "د١٣",
    "سنت٢٠", "نسبة٢٠", "متغير٢٠",
    "سنت٢٧", "نسبة٢٧", "د٢٧",
    "سنت٥٣", "نسبة٥٣", "د٥٣"
  ];

  const outputLines: string[] = [];

  // Header row (row index 0)
  headersRTL.forEach((h, colIdx) => {
    if (h !== undefined && h !== null && h !== "") {
      const origColIdx = 12 - colIdx;
      const cellCoord = (0 * 13 + origColIdx + 1) * 11;
      const tree = buildArabicCollatzTree(cellCoord);
      const delim = ` (الكولاتز ${toArabicNumerals(cellCoord)}) ${tree} ☻'♥'`;
      outputLines.push(`${h}${delim}`);
    }
  });

  // Data rows (row index 1..53)
  rows.forEach((r, rowIdx) => {
    // Standard order values
    const rawValuesStandard = [
      typeof r.d53 === 'number' ? toArabicNumerals(r.d53) : "",
      typeof r.r53 === 'number' ? toArabicNumerals(r.r53.toFixed(9)) : "",
      typeof r.c53 === 'number' ? toArabicNumerals(r.c53.toFixed(3)) : "",
      r.d27 !== "" ? toArabicNumerals(r.d27) : "",
      typeof r.r27 === 'number' ? toArabicNumerals(r.r27.toFixed(9)) : "",
      typeof r.c27 === 'number' ? toArabicNumerals(r.c27.toFixed(3)) : "",
      r.var20 !== "" ? toArabicNumerals(r.var20) : "",
      typeof r.r20 === 'number' ? toArabicNumerals(r.r20.toFixed(9)) : "",
      typeof r.c20 === 'number' ? toArabicNumerals(r.c20.toFixed(3)) : "",
      r.d13 !== "" ? toArabicNumerals(r.d13) : "",
      typeof r.r13 === 'number' ? toArabicNumerals(r.r13.toFixed(9)) : "",
      typeof r.c13 === 'number' ? toArabicNumerals(r.c13.toFixed(3)) : "",
      r.note !== "" ? toArabicNumerals(r.note) : ""
    ];

    // Reflected right-to-left values
    const rawValuesRTL = [...rawValuesStandard].reverse();

    rawValuesRTL.forEach((val, colIdx) => {
      const origColIdx = 12 - colIdx;
      const cellCoord = ((rowIdx + 1) * 13 + origColIdx + 1) * 11;
      const tree = buildArabicCollatzTree(cellCoord);
      const delim = ` (الكولاتز ${toArabicNumerals(cellCoord)}) ${tree} ☻'♥'`;
      outputLines.push(`${val}${delim}`);
    });
  });

  return outputLines.join("\n");
}

/**
 * Generates Heart (قلب) Esolang S-expression Code for the Muton Table
 */
export function generateQalbMutonCode(delimiter = " الكولاتز ☻'♥'٥ "): string {
  const rows = generateMutonSeries();

  let code = `;; ====================================================================
;;  جدول بيانات الموتون بلغة قلب (Muton Microtonal Macroset in Qalb Esolang)
;;  53-TET / 27-TET / 20-TET / 13-TET Unified Tuning Matrix
;;  Separator: " الكولاتز ☻'♥'٥ "
;; ====================================================================

(تعريف فاصل-الكولاتز " ${delimiter.trim()} ")

(تعريف عناوين-جدول-الموتون
  (قائمة "d53" "ratio53" "cents53" "d27" "ratio27" "cents27" "var20" "ratio20" "cents20" "d13" "ratio13" "cents13" "note"))

(تعريف بيانات-الموتون
  (قائمة
`;

  rows.forEach((r) => {
    const r27Str = typeof r.r27 === 'number' ? r.r27.toFixed(9) : "";
    const c27Str = typeof r.c27 === 'number' ? r.c27.toFixed(3) : "";
    const r20Str = typeof r.r20 === 'number' ? r.r20.toFixed(9) : "";
    const c20Str = typeof r.c20 === 'number' ? r.c20.toFixed(3) : "";
    const r13Str = typeof r.r13 === 'number' ? r.r13.toFixed(9) : "";
    const c13Str = typeof r.c13 === 'number' ? r.c13.toFixed(3) : "";

    code += `    (قائمة ${r.d53} "${r.r53.toFixed(9)}" "${r.c53.toFixed(3)}" "${r.d27}" "${r27Str}" "${c27Str}" "${r.var20}" "${r20Str}" "${c20Str}" "${r.d13}" "${r13Str}" "${c13Str}" "${r.note}")\n`;
  });

  code += `  )
)

(تعريف طباعة-صف-معدل
  (دالة (صف)
    (إذا (تساوي-قائمة? صف (قائمة))
      ""
      (إذا (تساوي-قائمة? (باقي صف) (قائمة))
        (أول صف)
        (دمج-نصوص (أول صف) فاصل-الكولاتز (طباعة-صف-معدل (باقي صف)))))))

(تعريف قلب
  (دالة ()
    (عرض "=== [ مخرجات جدول الموتون بلغة قلب مع فاصل الكولاتز ☻'♥'٥ ] ===")
    (عرض (طباعة-صف-معدل عناوين-جدول-الموتون))
    (لكل صف في بيانات-الموتون
      (عرض (طباعة-صف-معدل صف)))
    (عرض "==========================================================")
    (عرض (+ "إجمالي صفوف الموتون: " (طول بيانات-الموتون)))))

(قلب)
`;

  return code;
}

/**
 * Generates the command prompt output exactly requested by the user
 */
export function generateCMDOutput(): string {
  return `Microsoft Windows [Version 6.1.7601]
Copyright (c) 2009 Microsoft Corporation.  All rights reserved.

C:\\Users\\Miu\\Desktop\\Desktop\\Esolang\\Esolang-main\\Mmuton>batty
----- batty.bat -----
@echo off
setlocal enabledelayedexpansion

rem --- directory to scan (current directory) ---
set "DIR=%~dp0"

for %%F in ("%DIR%\\*") do (
    if /I not "%%~xF"==".exe" (
        echo ----- %%~nxF -----
        type "%%F"
        echo.
    )
)
----- M.py -----
import math

# Base53 digit -> 53-TET interval ratio and cents
BASE = 53

def m_digit_interval(d):
    """
    d: base53 digit, 0 <= d <= 52
    returns: (ratio, cents)
    ratio = 2^(d/53)
    cents = 1200 * log2(ratio)
    """
    ratio = 2 ** (d / BASE)
    cents = 1200 * (d / BASE)  # since log2(2^(d/53)) = d/53
    return ratio, cents

# Full series for digits 0..52
M_SERIES = [
    {
        "digit": d,
        "ratio": 2 ** (d / BASE),
        "cents": 1200 * (d / BASE),
    }
    for d in range(BASE)
]

# Example: print first few entries
if __name__ == "__main__":
    for entry in M_SERIES[:52]:
        d = entry["digit"]
        r = entry["ratio"]
        c = entry["cents"]
        print(f"d={d:2d} -> ratio={r:.9f}, cents={c:.3f}")

----- mu.py -----
import math

# Base27 digit -> 27-TET interval ratio and cents
BASE = 27

def miu_digit_interval(e):
    """
    e: base27 digit, 0 <= e <= 27
    returns: (ratio, cents)
    ratio = 2^(e/27)
    cents = 1200 * (e/27)
    """
    ratio = 2 ** (e / BASE)
    cents = 1200 * (e / BASE)
    return ratio, cents

# Full series for digits 0..27 (28 values)
MIU_SERIES = [
    {
        "digit": e,
        "ratio": 2 ** (e / BASE),
        "cents": 1200 * (e / BASE),
    }
    for e in range(BASE + 1)
]

# Example: print all entries
if __name__ == "__main__":
    for entry in MIU_SERIES:
        e = entry["digit"]
        r = entry["ratio"]
        c = entry["cents"]
        print(f"e={e:2d} -> ratio={r:.9f}, cents={c:.3f}")

----- muton.py -----
import M
import mu
import t
import o

# Load series from your modules
M_SERIES = M.M_SERIES          # 0..52
MIU_SERIES = mu.MIU_SERIES     # 0..27
BASE20_SERIES = t.BASE20_SERIES  # 19 entries
BASE13_SERIES = o.BASE13_SERIES  # 13 entries

# Convenience: turn lists into dicts keyed by digit
miu_map = {e["digit"]: e for e in MIU_SERIES}
m20_map = {e["digit"]: e for e in BASE20_SERIES}
m13_map = {e["digit"]: e for e in BASE13_SERIES}

# Chromatic note names starting at A, with your half-flat = Z
NOTE_NAMES = [
    "A", "A#", "B", "C", "C#", "D",
    "D#", "E", "F", "F#", "G", "G#",
    "Z"   # A half-flat
]

print("{| class=\\"wikitable\\"")
print("|+ Muton unified macroset table")
print("|-")
print("! d53 !! ratio53 !! cents53 !! d27 !! ratio27 !! cents27 !! var20 !! ratio20 !! cents20 !! d13 !! ratio13 !! cents13 !! note")

for entry in M_SERIES:
    d53 = entry["digit"]
    r53 = entry["ratio"]
    c53 = entry["cents"]

    # base27 row (only 0..27)
    if d53 <= 27:
        miu = miu_map[d53]
        d27 = miu["digit"]
        r27 = miu["ratio"]
        c27 = miu["cents"]
    else:
        d27 = ""
        r27 = ""
        c27 = ""

    # base20 row (only 1..20 mapped to d..w)
    if d53 >= 9 and d53 <= 28:
        idx = d53 - 8  # maps 9→1, 10→2, ..., 28→20
        if idx in m20_map:
            m20 = m20_map[idx]
            var20 = m20["var"]
            r20 = m20["ratio"]
            c20 = m20["cents"]
        else:
            var20 = ""
            r20 = ""
            c20 = ""
    else:
        var20 = ""
        r20 = ""
        c20 = ""

    # base13 row (only 0..12)
    if d53 >= 9 and d53 <= 21:
        idx13 = d53 - 9  # maps 9→0, 10→1, ..., 21→12
        if idx13 in m13_map:
            m13 = m13_map[idx13]
            d13 = m13["digit"]
            r13 = m13["ratio"]
            c13 = m13["cents"]
            note = NOTE_NAMES[idx13]
        else:
            d13 = ""
            r13 = ""
            c13 = ""
            note = ""
    else:
        d13 = ""
        r13 = ""
        c13 = ""
        note = ""

    print("|-")
    print(f"| {d53} || {r53:.9f} || {c53:.3f} || {d27} || {r27} || {c27} || {var20} || {r20} || {c20} || {d13} || {r13} || {c13} || {note}")

print("|}")

----- o.py -----
import math

BASE = 13  # conceptual base, 13 distinct values

def base13_step(d):
    """
    d: base13 digit, 0 <= d <= 12
       0-11: chromatic semitone steps (100 cents each)
       12 : octave minus a half-flat (1150 cents)
    returns: (ratio, cents)
    """
    if not (0 <= d <= 12):
        raise ValueError("d must be in range 0..12")

    if d <= 11:
        cents = d * 100.0
    else:
        # 13th value: half-flat octave (50 cents below 1200)
        cents = 1150.0

    ratio = 2 ** (cents / 1200.0)
    return ratio, cents


# Full series for digits 0..12
BASE13_SERIES = [
    {
        "digit": d,
        "ratio": base13_step(d)[0],
        "cents": base13_step(d)[1],
    }
    for d in range(13)
]

if __name__ == "__main__":
    for entry in BASE13_SERIES:
        d = entry["digit"]
        r = entry["ratio"]
        c = entry["cents"]
        print(f"d={d:2d} -> ratio={r:.9f}, cents={c:.3f}")

----- README.py -----
import M
import mu
import t
import o

# Load series from your modules
M_SERIES = M.M_SERIES          # 0..52
MIU_SERIES = mu.MIU_SERIES     # 0..27
BASE20_SERIES = t.BASE20_SERIES  # 19 entries
BASE13_SERIES = o.BASE13_SERIES  # 13 entries

# Convenience: turn lists into dicts keyed by digit
miu_map = {e["digit"]: e for e in MIU_SERIES}
m20_map = {e["digit"]: e for e in BASE20_SERIES}
m13_map = {e["digit"]: e for e in BASE13_SERIES}

# Chromatic note names starting at A, with your half-flat = Z
NOTE_NAMES = [
    "A", "A#", "B", "C", "C#", "D",
    "D#", "E", "F", "F#", "G", "G#",
    "Z"   # A half-flat
]

# Markdown header
print("| d53 | ratio53 | cents53 | d27 | ratio27 | cents27 | var20 | ratio20 | cents20 | d13 | ratio13 | cents13 | note |")
print("|-----|---------|---------|-----|---------|---------|-------|---------|---------|-----|---------|---------|------|")

for entry in M_SERIES:
    d53 = entry["digit"]
    r53 = entry["ratio"]
    c53 = entry["cents"]

    # base27 row (only 0..27)
    if d53 <= 27:
        miu = miu_map[d53]
        d27 = miu["digit"]
        r27 = miu["ratio"]
        c27 = miu["cents"]
    else:
        d27 = ""
        r27 = ""
        c27 = ""

    # base20 row (only 1..20 mapped to d..w)
    if 9 <= d53 <= 28:
        idx = d53 - 8  # maps 9→1, 10→2, ..., 28→20
        if idx in m20_map:
            m20 = m20_map[idx]
            var20 = m20["var"]
            r20 = m20["ratio"]
            c20 = m20["cents"]
        else:
            var20 = ""
            r20 = ""
            c20 = ""
    else:
        var20 = ""
        r20 = ""
        c20 = ""

    # base13 row (only 0..12)
    if 9 <= d53 <= 21:
        idx13 = d53 - 9  # maps 9→0, 10→1, ..., 21→12
        if idx13 in m13_map:
            m13 = m13_map[idx13]
            d13 = m13["digit"]
            r13 = m13["ratio"]
            c13 = m13["cents"]
            note = NOTE_NAMES[idx13]
        else:
            d13 = ""
            r13 = ""
            c13 = ""
            note = ""
    else:
        d13 = ""
        r13 = ""
        c13 = ""
        note = ""

    print(f"| {d53} | {r53:.9f} | {c53:.3f} | {d27} | {r27} | {c27} | {var20} | {r20} | {c20} | {d13} | {r13} | {c13} | {note} |")

----- t.py -----
import math

# Base20 algebraic generator using variables d-w
BASE = 20

variables = [
    ("d", 1), ("e", 2), ("f", 3), ("g", 4), ("h", 5),
    ("i", 6), ("j", 7), ("k", 8), ("l", 9), ("m", 10),
    ("n", 11), ("o", 12), ("p", 13), ("q", 14), ("r", 15),
    ("s", 16), ("t", 17), ("u", 18), ("v", 19), ("w", 20)
]

BASE20_SERIES = [
    {
        "var": name,
        "digit": value,
        "ratio": 2 ** (value / BASE),
        "cents": 1200 * (value / BASE),
    }
    for name, value in variables
]

if __name__ == "__main__":
    for entry in BASE20_SERIES:
        print(f"{entry['var']} -> ratio={entry['ratio']:.9f}, cents={entry['cents']:.3f}")
`;
}
