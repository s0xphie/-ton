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
