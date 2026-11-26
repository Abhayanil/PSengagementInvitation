import React from 'react';

/**
 * Botanical Floral Cluster tucked near the envelope flap
 * Features: White roses, sage leaves, dusty onion-pink (#D8A1A8) blossoms, and gold foil sprigs.
 */
export default function FloralCluster({ className = '' }) {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 180 140"
        className="w-full h-full drop-shadow-md overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dusty Onion Pink Petal Gradient */}
          <linearGradient id="onionPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0D5D8" />
            <stop offset="50%" stopColor="#D8A1A8" />
            <stop offset="100%" stopColor="#B37882" />
          </linearGradient>

          {/* White Rose Gradient */}
          <linearGradient id="whiteRoseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F9F6F0" />
            <stop offset="100%" stopColor="#E2DCCE" />
          </linearGradient>

          {/* Sage Leaves Gradient */}
          <linearGradient id="sageLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D6E2D8" />
            <stop offset="50%" stopColor="#A3B8A6" />
            <stop offset="100%" stopColor="#7B937F" />
          </linearGradient>

          {/* Gold Sprig Gradient */}
          <linearGradient id="goldSprigGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3E5C2" />
            <stop offset="50%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#96722C" />
          </linearGradient>

          <filter id="softFlowerShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#3B4B3D" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* --- Background Foliage: Sage Eucalyptus Leaves --- */}
        <g id="sage-foliage">
          {/* Leaf 1 */}
          <path
            d="M 50,110 C 25,85 20,55 35,38 C 50,22 80,35 75,70 Z"
            fill="url(#sageLeafGrad)"
            opacity="0.9"
          />
          <path d="M 45,95 Q 46,60 40,43" stroke="#68806C" strokeWidth="1" strokeLinecap="round" />

          {/* Leaf 2 */}
          <path
            d="M 90,115 C 105,80 135,65 145,80 C 152,95 130,120 100,125 Z"
            fill="url(#sageLeafGrad)"
            opacity="0.85"
          />
          <path d="M 95,115 Q 120,95 140,84" stroke="#68806C" strokeWidth="1" strokeLinecap="round" />

          {/* Leaf 3 */}
          <path
            d="M 120,105 C 145,90 168,75 162,55 C 155,38 135,55 115,85 Z"
            fill="url(#sageLeafGrad)"
            opacity="0.8"
          />
        </g>

        {/* --- Gold Sprigs with Berries --- */}
        <g id="gold-sprigs" stroke="url(#goldSprigGrad)" strokeWidth="1.2">
          <path d="M 70,100 Q 95,50 120,30" strokeLinecap="round" />
          <circle cx="120" cy="30" r="3.5" fill="url(#goldSprigGrad)" stroke="none" />
          <circle cx="106" cy="42" r="2.8" fill="url(#goldSprigGrad)" stroke="none" />
          <circle cx="92" cy="58" r="2.8" fill="url(#goldSprigGrad)" stroke="none" />
          <circle cx="80" cy="74" r="2.2" fill="url(#goldSprigGrad)" stroke="none" />

          <path d="M 60,110 Q 30,75 18,65" strokeLinecap="round" />
          <circle cx="18" cy="65" r="3" fill="url(#goldSprigGrad)" stroke="none" />
          <circle cx="28" cy="78" r="2.4" fill="url(#goldSprigGrad)" stroke="none" />
        </g>

        {/* --- Dusty Onion Pink Blossom 1 (Left) --- */}
        <g id="onion-blossom-1" filter="url(#softFlowerShadow)">
          {/* Petals */}
          <ellipse cx="50" cy="95" rx="14" ry="10" transform="rotate(-30 50 95)" fill="url(#onionPetalGrad)" />
          <ellipse cx="65" cy="85" rx="13" ry="9" transform="rotate(20 65 85)" fill="url(#onionPetalGrad)" />
          <ellipse cx="72" cy="102" rx="12" ry="9" transform="rotate(70 72 102)" fill="url(#onionPetalGrad)" />
          <ellipse cx="48" cy="110" rx="13" ry="9" transform="rotate(-70 48 110)" fill="url(#onionPetalGrad)" />
          <ellipse cx="58" cy="115" rx="12" ry="9" transform="rotate(10 58 115)" fill="url(#onionPetalGrad)" />
          
          {/* Core */}
          <circle cx="60" cy="100" r="6" fill="#A8636E" />
          <circle cx="60" cy="100" r="3" fill="#D49942" />
        </g>

        {/* --- Main Elegant White Rose (Center) --- */}
        <g id="white-rose" filter="url(#softFlowerShadow)">
          {/* Outer Layer */}
          <path
            d="M 75,70 C 60,55 90,40 105,52 C 120,62 110,85 95,85 C 80,85 75,78 75,70 Z"
            fill="url(#whiteRoseGrad)"
            stroke="#D6CEBE"
            strokeWidth="0.6"
          />
          <path
            d="M 90,85 C 108,86 122,72 120,60 C 118,50 105,48 95,54 Z"
            fill="url(#whiteRoseGrad)"
            stroke="#D6CEBE"
            strokeWidth="0.6"
          />
          <path
            d="M 70,68 C 65,82 78,96 92,94 C 82,90 74,78 70,68 Z"
            fill="url(#whiteRoseGrad)"
            stroke="#D6CEBE"
            strokeWidth="0.6"
          />
          {/* Inner Swirl */}
          <path
            d="M 85,62 C 82,58 92,54 98,58 C 104,64 98,72 90,70 C 86,68 85,64 85,62 Z"
            fill="#FAF6EE"
            stroke="#CFC6B3"
            strokeWidth="0.7"
          />
          <path
            d="M 89,64 C 91,61 95,62 94,66 C 93,68 90,67 89,64 Z"
            fill="#EADBCE"
          />
        </g>

        {/* --- Dusty Onion Pink Blossom 2 (Right/Lower) --- */}
        <g id="onion-blossom-2" filter="url(#softFlowerShadow)">
          <ellipse cx="115" cy="98" rx="12" ry="8" transform="rotate(-20 115 98)" fill="url(#onionPetalGrad)" />
          <ellipse cx="128" cy="105" rx="11" ry="8" transform="rotate(40 128 105)" fill="url(#onionPetalGrad)" />
          <ellipse cx="112" cy="116" rx="12" ry="8" transform="rotate(85 112 116)" fill="url(#onionPetalGrad)" />
          <ellipse cx="100" cy="108" rx="11" ry="7" transform="rotate(-60 100 108)" fill="url(#onionPetalGrad)" />
          {/* Core */}
          <circle cx="114" cy="106" r="4.5" fill="#A8636E" />
          <circle cx="114" cy="106" r="2.2" fill="#D49942" />
        </g>
      </svg>
    </div>
  );
}
