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
