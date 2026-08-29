"use client";

export default function AwardBadge({ className = "", style = {} }) {
  return (
    <div className={`award-badge-container ${className}`} style={{ position: 'relative', width: '100%', maxWidth: '380px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto', ...style }}>
      {/* Background original image for the detailed laurel wreaths */}
      <img src="/award-badge.png" alt="Award Badge" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain', zIndex: 0 }} />
      
      {/* Mask over the old text and stars */}
      <div style={{ position: 'absolute', width: '235px', height: '70px', background: 'var(--bg-secondary)', zIndex: 1, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '4px' }}></div>
      
      {/* Overlay with new SVG for stars and text */}
      <svg viewBox="0 0 460 100" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 2 }}>
        {/* Top 5 Stars */}
        <g className="award-stars" fill="#0f172a">
          {[-2, -1, 0, 1, 2].map((offset) => {
            const cx = 230 + offset * 18;
            const cy = 24;
            return (
              <path
                key={offset}
                d={`M ${cx} ${cy - 5.5} L ${cx + 1.6} ${cy - 1.8} L ${cx + 5.5} ${cy - 1.8} L ${cx + 2.4} ${cy + 0.6} L ${cx + 3.6} ${cy + 4.5} L ${cx} ${cy + 2.0} L ${cx - 3.6} ${cy + 4.5} L ${cx - 2.4} ${cy + 0.6} L ${cx - 5.5} ${cy - 1.8} L ${cx - 1.6} ${cy - 1.8} Z`}
              />
            );
          })}
        </g>
        
        {/* Center Main Text */}
        <text x="230" y="56" textAnchor="middle" dominantBaseline="central" className="award-badge-text-full">
          <tspan fill="#8b5cf6" className="award-num" fontWeight="800"># </tspan>
          <tspan fill="#0f172a" className="award-text" fontWeight="800" letterSpacing="0.01em" fontSize="0.95em">featured Project this month</tspan>
        </text>

        {/* Bottom Decorative Divider Line */}
        <g className="award-divider">
          <line x1="125" y1="84" x2="216" y2="84" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="230" cy="84" r="3.2" fill="#0f172a" />
          <line x1="244" y1="84" x2="335" y2="84" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
