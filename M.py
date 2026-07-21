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
