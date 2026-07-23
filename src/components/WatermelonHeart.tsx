import React, { useMemo } from "react";

interface WatermelonHeartProps {
  className?: string;
  size?: number;
  seed?: string; // optional external deterministic seed
}

// 53‑symbol alphabet
const BASE53 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopq";

// Convert timestamp → base53
function timestampToBase53() {
  const now = Date.now(); // ms precision
  let n = now;
  let out = "";
  while (n > 0) {
    out += BASE53[n % 53];
    n = Math.floor(n / 53);
  }
  return out;
}

// Base53 PRNG
function makeBase53PRNG(seed: string) {
  let state = 0;
  for (let i = 0; i < seed.length; i++) {
    const idx = BASE53.indexOf(seed[i]);
    const v = idx >= 0 ? idx : seed.charCodeAt(i) % 53;
    state = (state * 53 + v) >>> 0;
  }
  if (state === 0) state = 0x1234567;

  return {
    nextFloat() {
      state = (state * 1103515245 + 12345) & 0x7fffffff;
      return state / 0x7fffffff;
    },
    range(min: number, max: number) {
      return min + (max - min) * this.nextFloat();
    }
  };
}

export default function WatermelonHeart({
  className = "",
  size = 32,
  seed: externalSeed,
}: WatermelonHeartProps) {

  // ✔ Timestamp-based deterministic seed (generated once per mount)
  const seed = useMemo(
    () => externalSeed ?? timestampToBase53(),
    [externalSeed]
  );

  const { seeds, dither } = useMemo(() => {
    const rng = makeBase53PRNG(seed);

    // Base seed positions inside the red flesh
    const baseSeeds = [
      { x: 32, y: 28 },
      { x: 68, y: 28 },
      { x: 42, y: 42 },
      { x: 58, y: 42 },
      { x: 50, y: 56 },
      { x: 33, y: 50 },
      { x: 67, y: 50 },
    ];

    const minX = 28, maxX = 72;
    const minY = 20, maxY = 70;

    const seeds = baseSeeds.map((s, i) => {
      const jx = rng.range(-2, 2);
      const jy = rng.range(-2, 2);

      const x = Math.min(maxX, Math.max(minX, s.x + jx));
      const y = Math.min(maxY, Math.max(minY, s.y + jy));

      const scale = rng.range(0.9, 1.2);
      const rot = rng.range(-10, 10);

      const path = `M ${x},${y}
        C ${x - 2},${y - 4} ${x},${y - 7} ${x + 1},${y - 7}
        C ${x + 2},${y - 7} ${x + 4},${y - 4} ${x + 2},${y} Z`;

      return {
        x,
        y,
        jsx: (
          <path
            key={i}
            d={path}
            fill="#000"
            transform={`
              scale(${scale})
              rotate(${rot}, ${x}, ${y})
            `}
          />
        ),
      };
    });

    // Microtonal dithering tied to seed positions
    let rects = "";
    const cell = 2;

    for (let y = 0; y < 4; y += cell) {
      for (let x = 0; x < 4; x += cell) {
        const cx = x + cell / 2;
        const cy = y + cell / 2;

        // Convert pattern coords → SVG coords
        const px = (cx / 4) * 100;
        const py = (cy / 4) * 100;

        let minDist = Infinity;
        for (const s of seeds) {
          const dx = px - s.x;
          const dy = py - s.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < minDist) minDist = d;
        }

        // Microtonal 4‑level pitch class mapping
        const level = Math.min(3, Math.floor(minDist / 10));
        const baseOpacity = [0.22, 0.18, 0.14, 0.10][level];
        const mod = rng.range(-0.03, 0.03);
        const opacity = Math.max(0, baseOpacity + mod);

        const black = level % 2 === 0;
        const fill = black ? "#000000" : "#ffffff";

        rects += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${fill}" fill-opacity="${opacity}" />`;
      }
    }

    return { seeds, dither: rects };
  }, [seed]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="الله أكبر"
    >
      <defs>
        <filter id="quantize24" x="0%" y="0%" width="100%" height="100%">
          <feComponentTransfer>
            <feFuncR type="discrete" tableValues="0 0.33 0.66 1.0" />
            <feFuncG type="discrete" tableValues="0 0.5 1.0" />
            <feFuncB type="discrete" tableValues="0 1.0" />
          </feComponentTransfer>
        </filter>

        <pattern
          id="bayerDither"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
          dangerouslySetInnerHTML={{ __html: dither }}
        />

        <radialGradient id="watermelonPulp" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FF3B5C" />
          <stop offset="70%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#BE123C" />
        </radialGradient>

        <linearGradient id="watermelonRind" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="50%" stopColor="#047857" />
          <stop offset="100%" stopColor="#064E3B" />
        </linearGradient>

        <linearGradient id="innerRind" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="100%" stopColor="#D1FAE5" />
        </linearGradient>
      </defs>

      <g filter="url(#quantize24)">
        <path
          d="M 50,88 C 20,65 5,45 5,28 C 5,14 16,5 30,5 C 40,5 47,11 50,17 C 53,11 60,5 70,5 C 84,5 95,14 95,28 C 95,45 80,65 50,88 Z"
          fill="url(#watermelonRind)"
        />

        <path
          d="M 50,83 C 23,62 10,43 10,28 C 10,17 19,9 30,9 C 39,9 45,14 50,20 C 55,14 61,9 70,9 C 81,9 90,17 90,28 C 90,43 77,62 50,83 Z"
          fill="url(#innerRind)"
        />

        <path
          d="M 50,78 C 26,58 14,41 14,28 C 14,19 21,12 30,12 C 38,12 44,16 50,22 C 56,16 62,12 70,12 C 79,12 86,19 86,28 C 86,41 74,58 50,78 Z"
          fill="url(#watermelonPulp)"
        />

        {seeds.map(s => s.jsx)}

        <path
          d="M 50,88 C 20,65 5,45 5,28 C 5,14 16,5 30,5 C 40,5 47,11 50,17 C 53,11 60,5 70,5 C 84,5 95,14 95,28 C 95,45 80,65 50,88 Z"
          fill="url(#bayerDither)"
        />
      </g>
    </svg>
  );
}
