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
