"use client";

export default function AwardBadge({ className = "", style = {} }) {
  return (
    <div 
      className={`award-badge-container ${className}`} 
      style={style}
      aria-label="#1 IMAGES FOR BUSINESS award"
    >
      <svg 
        viewBox="0 0 460 100" 
        className="award-wreath-svg"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top 5 Stars */}
        <g className="award-stars" fill="#0f172a">
          {[-2, -1, 0, 1, 2].map((offset) => {
            const cx = 230 + offset * 14;
            const cy = 16;
            return (
              <path
                key={offset}
                d={`M ${cx} ${cy - 5.5} 
                    L ${cx + 1.6} ${cy - 1.8} 
                    L ${cx + 5.5} ${cy - 1.8} 
                    L ${cx + 2.4} ${cy + 0.6} 
                    L ${cx + 3.6} ${cy + 4.5} 
                    L ${cx} ${cy + 2.0} 
                    L ${cx - 3.6} ${cy + 4.5} 
                    L ${cx - 2.4} ${cy + 0.6} 
                    L ${cx - 5.5} ${cy - 1.8} 
                    L ${cx - 1.6} ${cy - 1.8} Z`}
              />
            );
          })}
        </g>

        {/* Left Laurel Branch */}
        <g className="wreath-branch left-branch" fill="#0f172a">
          {/* Main Stem */}
          <path 
            d="M 96 74 C 70 66, 52 46, 58 20" 
            stroke="#0f172a" 
            strokeWidth="2.2" 
            strokeLinecap="round"
          />
          {/* Leaf Pairs */}
          {/* Base Pair */}
          <path d="M 94 72 C 86 75, 76 77, 71 72 C 77 67, 87 68, 94 72 Z" />
          <path d="M 90 66 C 82 63, 76 56, 79 51 C 84 55, 87 62, 90 66 Z" />
          {/* Lower Middle Pair */}
          <path d="M 80 58 C 70 60, 60 59, 55 52 C 63 50, 73 53, 80 58 Z" />
          <path d="M 72 50 C 64 45, 59 35, 64 30 C 68 36, 71 45, 72 50 Z" />
          {/* Upper Middle Pair */}
          <path d="M 64 42 C 54 42, 44 37, 41 29 C 49 29, 59 34, 64 42 Z" />
          <path d="M 59 32 C 54 24, 51 14, 57 10 C 60 18, 60 27, 59 32 Z" />
          {/* Top Pair & Tip */}
          <path d="M 56 22 C 49 17, 46 7, 52 2 C 57 8, 57 17, 56 22 Z" />
          <path d="M 59 16 C 63 10, 69 5, 75 5 C 73 11, 67 15, 59 16 Z" />
        </g>

        {/* Center Main Text */}
        <text 
          x="230" 
          y="52" 
          textAnchor="middle" 
          dominantBaseline="central"
          className="award-badge-text-full"
        >
          <tspan fill="#8b5cf6" className="award-num" fontWeight="800">#1 </tspan>
          <tspan fill="#0f172a" className="award-text" fontWeight="800" letterSpacing="0.05em">IMAGES FOR BUSINESS</tspan>
        </text>

        {/* Bottom Decorative Divider Line */}
        <g className="award-divider">
          {/* Left Rule */}
          <line x1="145" y1="78" x2="216" y2="78" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" />
          {/* Center Dot */}
          <circle cx="230" cy="78" r="3.2" fill="#0f172a" />
          {/* Right Rule */}
          <line x1="244" y1="78" x2="315" y2="78" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Right Laurel Branch */}
        <g className="wreath-branch right-branch" fill="#0f172a">
          {/* Main Stem */}
          <path 
            d="M 364 74 C 390 66, 408 46, 402 20" 
            stroke="#0f172a" 
            strokeWidth="2.2" 
            strokeLinecap="round"
          />
          {/* Leaf Pairs */}
          {/* Base Pair */}
          <path d="M 366 72 C 374 75, 384 77, 389 72 C 383 67, 373 68, 366 72 Z" />
          <path d="M 370 66 C 378 63, 384 56, 381 51 C 376 55, 373 62, 370 66 Z" />
          {/* Lower Middle Pair */}
          <path d="M 380 58 C 390 60, 400 59, 405 52 C 397 50, 387 53, 380 58 Z" />
          <path d="M 388 50 C 396 45, 401 35, 396 30 C 392 36, 389 45, 388 50 Z" />
          {/* Upper Middle Pair */}
          <path d="M 396 42 C 406 42, 416 37, 419 29 C 411 29, 401 34, 396 42 Z" />
          <path d="M 401 32 C 406 24, 409 14, 403 10 C 400 18, 400 27, 401 32 Z" />
          {/* Top Pair & Tip */}
          <path d="M 404 22 C 411 17, 414 7, 408 2 C 403 8, 403 17, 404 22 Z" />
          <path d="M 401 16 C 397 10, 391 5, 385 5 C 387 11, 393 15, 401 16 Z" />
        </g>
      </svg>
    </div>
  );
}
