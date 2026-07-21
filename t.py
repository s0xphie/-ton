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
