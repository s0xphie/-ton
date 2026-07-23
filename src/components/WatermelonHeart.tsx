import React, { useMemo } from "react";

interface WatermelonHeartProps {
  className?: string;
  size?: number;
}

export default function WatermelonHeart({ className = "", size = 32 }: WatermelonHeartProps) {
  // Random dithering pattern (safe: raw SVG string)
  const ditherPattern = useMemo(() => {
    let rects = "";
    const cell = 2;

    for (let y = 0; y < 4; y += cell) {
      for (let x = 0; x < 4; x += cell) {
        const isBlack = Math.random() > 0.5;
        const fill = isBlack ? "#000000" : "#ffffff";
        const opacity = isBlack ? 0.18 : 0.12;

        rects += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${fill}" fill-opacity="${opacity}" />`;
      }
    }
    return rects;
  }, []);

  const seeds = useMemo(() => {
  const baseSeeds = [
    { x: 32, y: 28 },
    { x: 68, y: 28 },
    { x: 42, y: 42 },
    { x: 58, y: 42 },
    { x: 50, y: 56 },
    { x: 33, y: 50 },
    { x: 67, y: 50 },
  ];

  return baseSeeds.map((s, i) => {
    // jitter
    let jitterX = (Math.random() - 0.5) * 4;
    let jitterY = (Math.random() - 0.5) * 4;

    // enforce bounds so seeds stay inside red flesh
    const minX = 28, maxX = 72;
    const minY = 20, maxY = 70;

    let finalX = Math.min(maxX, Math.max(minX, s.x + jitterX));
    let finalY = Math.min(maxY, Math.max(minY, s.y + jitterY));

    const scale = 0.9 + Math.random() * 0.3;
    const rotate = (Math.random() - 0.5) * 20;

    const path = `M ${finalX},${finalY} 
      C ${finalX - 2},${finalY - 4} ${finalX},${finalY - 7} ${finalX + 1},${finalY - 7} 
      C ${finalX + 2},${finalY - 7} ${finalX + 4},${finalY - 4} ${finalX + 2},${finalY} Z`;

    return (
      <path
        key={i}
        d={path}
        fill="#000"
        transform={`
          scale(${scale})
          rotate(${rotate}, ${finalX}, ${finalY})
        `}
      />
    );
  });
}, []);

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
          dangerouslySetInnerHTML={{ __html: ditherPattern }}
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

        {/* Randomized seeds */}
        {seeds}

        <path
          d="M 50,88 C 20,65 5,45 5,28 C 5,14 16,5 30,5 C 40,5 47,11 50,17 C 53,11 60,5 70,5 C 84,5 95,14 95,28 C 95,45 80,65 50,88 Z"
          fill="url(#bayerDither)"
        />
      </g>
    </svg>
  );
}
