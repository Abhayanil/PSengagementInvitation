import React from 'react';

/** Hand-poured antique-gold wax seal with a debossed P&S monogram. */
export default function WaxSeal({ className = '', idPrefix = 'seal' }) {
  const body = `${idPrefix}-body`;
  const rim = `${idPrefix}-rim`;
  const sheen = `${idPrefix}-sheen`;
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={body} cx="36%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#EBCB85" />
          <stop offset="38%" stopColor="#C9A35C" />
          <stop offset="78%" stopColor="#A07E3E" />
          <stop offset="100%" stopColor="#6E521A" />
        </radialGradient>
        <linearGradient id={rim} x1="20%" y1="10%" x2="80%" y2="95%">
          <stop offset="0%" stopColor="#F6DDA6" />
          <stop offset="50%" stopColor="#B8934F" />
          <stop offset="100%" stopColor="#5E4413" />
        </linearGradient>
        <radialGradient id={sheen} cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#B48F4C" />
          <stop offset="100%" stopColor="#C8A35E" />
        </radialGradient>
      </defs>

      {/* Irregular poured edge */}
      <path
        d="M61 4c8 0 13 4 20 5 8 1 14 5 19 11 5 6 4 12 8 18 4 7 9 12 8 21-1 8-6 12-7 19-2 8 0 14-6 20-6 6-12 5-19 9-7 4-12 9-21 9-9 0-14-6-21-8-8-3-14-2-20-8s-6-12-9-19c-3-7-9-11-9-20 0-8 5-13 6-20 2-8 0-14 6-20s13-5 20-9c8-4 12-8 21-8Z"
        fill={`url(#${body})`}
      />
      {/* Stamped die face */}
      <circle cx="60" cy="61" r="39" fill={`url(#${sheen})`} />
      <circle cx="60" cy="61" r="39" fill="none" stroke={`url(#${rim})`} strokeWidth="4" />
      <circle cx="60" cy="61" r="33.5" fill="none" stroke="#6E521A" strokeOpacity="0.45" strokeWidth="0.8" />
      <circle cx="60" cy="61" r="32.5" fill="none" stroke="#F3D9A0" strokeOpacity="0.35" strokeWidth="0.6" />

      {/* Debossed monogram: dark lower edge + light upper edge */}
      <g fontFamily="'Cormorant Garamond', Georgia, serif" fontStyle="italic" textAnchor="middle">
        <text x="60" y="72" fontSize="34" fontWeight="500" fill="#F4DCA4" opacity="0.55" transform="translate(0 0.9)">
          P<tspan fontSize="22" dx="1" dy="-2">&amp;</tspan><tspan dx="1" dy="2">S</tspan>
        </text>
        <text x="60" y="72" fontSize="34" fontWeight="500" fill="#5A400F" opacity="0.9">
          P<tspan fontSize="22" dx="1" dy="-2">&amp;</tspan><tspan dx="1" dy="2">S</tspan>
        </text>
      </g>
    </svg>
  );
}
