import React from "react";

interface WatermelonHeartProps {
  className?: string;
  size?: number;
}

export default function WatermelonHeart({ className = "", size = 32 }: WatermelonHeartProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="allahku akbar"
    >
      <defs>
        {/* 24-Color Quantization Posterize Filter (4 Red x 3 Green x 2 Blue = 24 total palette colors) */}
        <filter id="quantize24" x="0%" y="0%" width="100%" height="100%">
          <feComponentTransfer>
            <feFuncR type="discrete" tableValues="0 0.33 0.66 1.0" />
            <feFuncG type="discrete" tableValues="0 0.5 1.0" />
            <feFuncB type="discrete" tableValues="0 1.0" />
          </feComponentTransfer>
        </filter>

        {/* 2x2 Dither Matrix Pattern Overlay */}
        <pattern id="bayerDither" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="2" height="2" fill="#000000" fillOpacity="0.18" />
          <rect x="2" y="2" width="2" height="2" fill="#000000" fillOpacity="0.18" />
          <rect x="2" y="0" width="2" height="2" fill="#ffffff" fillOpacity="0.12" />
          <rect x="0" y="2" width="2" height="2" fill="#ffffff" fillOpacity="0.12" />
        </pattern>

        {/* Watermelon pulp gradient */}
        <radialGradient id="watermelonPulp" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FF3B5C" />
          <stop offset="70%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#BE123C" />
        </radialGradient>

        {/* Outer green rind gradient */}
        <linearGradient id="watermelonRind" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="50%" stopColor="#047857" />
          <stop offset="100%" stopColor="#064E3B" />
        </linearGradient>

        {/* White inner rind layer */}
        <linearGradient id="innerRind" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="100%" stopColor="#D1FAE5" />
        </linearGradient>
      </defs>

      <g filter="url(#quantize24)">
        {/* 1. Outer Green Rind (Heart Outline) */}
        <path
          d="M 50,88 C 20,65 5,45 5,28 C 5,14 16,5 30,5 C 40,5 47,11 50,17 C 53,11 60,5 70,5 C 84,5 95,14 95,28 C 95,45 80,65 50,88 Z"
          fill="url(#watermelonRind)"
        />

        {/* 2. White Inner Rind Layer */}
        <path
          d="M 50,83 C 23,62 10,43 10,28 C 10,17 19,9 30,9 C 39,9 45,14 50,20 C 55,14 61,9 70,9 C 81,9 90,17 90,28 C 90,43 77,62 50,83 Z"
          fill="url(#innerRind)"
        />

        {/* 3. Red Watermelon Flesh */}
        <path
          d="M 50,78 C 26,58 14,41 14,28 C 14,19 21,12 30,12 C 38,12 44,16 50,22 C 56,16 62,12 70,12 C 79,12 86,19 86,28 C 86,41 74,58 50,78 Z"
          fill="url(#watermelonPulp)"
        />

        {/* 4. Watermelon Black Seeds */}
        <path d="M 32,28 C 30,24 32,21 33,21 C 34,21 36,24 34,28 Z" fill="#000000" />
        <path d="M 68,28 C 66,24 68,21 69,21 C 70,21 72,24 70,28 Z" fill="#000000" />
        <path d="M 42,42 C 40,38 42,35 43,35 C 44,35 46,38 44,42 Z" fill="#000000" />
        <path d="M 58,42 C 56,38 58,35 59,35 C 60,35 62,38 60,42 Z" fill="#000000" />
        <path d="M 50,56 C 48,52 50,49 51,49 C 52,49 54,52 52,56 Z" fill="#000000" />
        <path d="M 33,50 C 31,46 33,43 34,43 C 35,43 37,46 35,50 Z" fill="#000000" />
        <path d="M 67,50 C 65,46 67,43 68,43 C 69,43 71,46 69,50 Z" fill="#000000" />

        {/* 5. Dither Matrix Texture Overlay */}
        <path
          d="M 50,88 C 20,65 5,45 5,28 C 5,14 16,5 30,5 C 40,5 47,11 50,17 C 53,11 60,5 70,5 C 84,5 95,14 95,28 C 95,45 80,65 50,88 Z"
          fill="url(#bayerDither)"
        />
      </g>
    </svg>
  );
}

