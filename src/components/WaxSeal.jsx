import React from 'react';
import { motion } from 'framer-motion';

export default function WaxSeal({ isOpen, isOpening, onOpen }) {
  return (
    <div className="relative flex flex-col items-center justify-center select-none pointer-events-auto">
      {/* Interactive Wax Seal Button */}
      <motion.button
        type="button"
        onClick={onOpen}
        disabled={isOpen || isOpening}
        aria-label="Tap to open invitation envelope"
        className="group relative cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-gold/60 rounded-full transition-transform active:scale-95"
        initial={{ scale: 1, opacity: 1 }}
        animate={
          isOpening
            ? {
                scale: 1.15,
                opacity: 0,
                transition: { duration: 0.35, ease: 'easeOut' },
              }
            : {
                scale: [1, 1.035, 1],
                transition: {
                  repeat: Infinity,
                  duration: 2.8,
                  ease: 'easeInOut',
                },
              }
        }
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        {/* Soft Ambient Shadow */}
        <div className="absolute inset-0 rounded-full blur-md bg-[#58411a]/40 transform translate-y-2 pointer-events-none" />

        {/* Realistic Antique Gold Organic Wax Seal SVG */}
        <svg
          viewBox="0 0 160 160"
          className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-xl relative z-10 overflow-visible"
        >
          <defs>
            {/* Outer Wax Radial Gradient */}
            <radialGradient id="waxOuterGrad" cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#E6CF92" />
              <stop offset="25%" stopColor="#D4AF60" />
              <stop offset="55%" stopColor="#B38A3A" />
              <stop offset="85%" stopColor="#8C6622" />
              <stop offset="100%" stopColor="#5D4112" />
            </radialGradient>

            {/* Inner Recessed Bevel Gradient */}
            <radialGradient id="waxInnerGrad" cx="42%" cy="38%" r="58%">
              <stop offset="0%" stopColor="#DDBB72" />
              <stop offset="40%" stopColor="#BD9242" />
              <stop offset="75%" stopColor="#966F2A" />
              <stop offset="100%" stopColor="#6C4D19" />
            </radialGradient>

            {/* Debossed Text Highlight / Shading */}
            <linearGradient id="textDeboss" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#523910" />
              <stop offset="40%" stopColor="#6B4D1A" />
              <stop offset="80%" stopColor="#A88237" />
              <stop offset="100%" stopColor="#F5E4B5" />
            </linearGradient>

            {/* Metallic Sheen Angle Filter */}
            <filter id="waxInnerBevel" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#ffffff" floodOpacity="0.45" />
              <feDropShadow dx="0" dy="-1.5" stdDeviation="1.5" floodColor="#38240a" floodOpacity="0.65" />
            </filter>

            {/* Shimmer linear gradient */}
            <linearGradient id="sealShimmer" x1="-100%" y1="-100%" x2="200%" y2="200%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="45%" stopColor="rgba(255,255,255,0.0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="55%" stopColor="rgba(255,255,255,0.0)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Organic Wax Outer Base Contour (Irregular Molten Edges) */}
          <path
            d="M 80,10 
               C 98,11 113,16 128,28 
               C 142,40 152,56 150,75 
               C 148,93 142,109 130,123 
               C 117,138 98,148 80,149 
               C 60,150 43,141 30,128 
               C 16,114 10,96 11,78 
               C 12,60 21,43 35,30 
               C 49,17 64,9 80,10 Z"
            fill="url(#waxOuterGrad)"
            stroke="#4A340E"
            strokeWidth="0.8"
          />

          {/* Secondary Organic Molten Wax Droplets & Splatters for Realism */}
          <path
            d="M 28,34 C 23,28 14,35 18,44 C 21,50 31,45 28,34 Z"
            fill="url(#waxOuterGrad)"
            opacity="0.85"
          />
          <path
            d="M 126,24 C 133,18 142,26 138,34 C 134,40 123,32 126,24 Z"
            fill="url(#waxOuterGrad)"
            opacity="0.8"
          />
          <path
            d="M 132,125 C 139,132 129,141 122,136 C 117,132 124,121 132,125 Z"
            fill="url(#waxOuterGrad)"
            opacity="0.85"
          />
          <path
            d="M 26,118 C 18,124 22,136 31,132 C 37,129 33,115 26,118 Z"
            fill="url(#waxOuterGrad)"
            opacity="0.85"
          />

          {/* Inner Raised Ring Ridge */}
          <circle
            cx="80"
            cy="80"
            r="53"
            fill="none"
            stroke="#5A3F15"
            strokeWidth="2.5"
            opacity="0.75"
          />
          <circle
            cx="79.5"
            cy="79.5"
            r="52"
            fill="none"
            stroke="#FDE8B5"
            strokeWidth="1.2"
            opacity="0.6"
          />

          {/* Recessed Wax Center Floor */}
          <circle
            cx="80"
            cy="80"
            r="50"
            fill="url(#waxInnerGrad)"
            stroke="#4A330F"
            strokeWidth="1.2"
          />

          {/* Beaded Pearls / Fine Dots Border inside the rim */}
          <circle
            cx="80"
            cy="80"
            r="44"
            fill="none"
            stroke="#634516"
            strokeWidth="1"
            strokeDasharray="2 4"
            opacity="0.5"
          />

          {/* Debossed Monogram: "P & S" in Serif Calligraphic Script */}
          <g filter="url(#waxInnerBevel)">
            {/* Soft highlight underneath deboss */}
            <text
              x="80"
              y="87"
              textAnchor="middle"
              className="font-cormorant font-semibold select-none"
              fontSize="34"
              letterSpacing="2.5"
              fill="#F9E8B8"
              opacity="0.75"
              transform="translate(0, 0.8)"
            >
              P &amp; S
            </text>

            {/* Deep recessed shadow of monogram */}
            <text
              x="80"
              y="87"
              textAnchor="middle"
              className="font-cormorant font-semibold select-none"
              fontSize="34"
              letterSpacing="2.5"
              fill="url(#textDeboss)"
            >
              P &amp; S
            </text>
          </g>

          {/* Delicate Top Highlight Arc for Wax Gloss */}
          <path
            d="M 45,55 C 55,42 75,36 100,40"
            fill="none"
            stroke="#FFF4D0"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.45"
          />
        </svg>

        {/* Pulsing Light Aura on Hover */}
        <div className="absolute inset-0 rounded-full bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none" />
      </motion.button>

      {/* Helper label below seal: "Tap the seal to open" */}
      {!isOpen && !isOpening && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{
            opacity: [0.65, 0.95, 0.65],
            y: [0, 2, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.4,
            ease: 'easeInOut',
          }}
          className="mt-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0]/80 backdrop-blur-sm border border-gold/30 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
          <span className="text-[11px] sm:text-xs font-cormorant font-medium uppercase tracking-[0.2em] text-[#5A4522]">
            Tap the seal to open
          </span>
        </motion.div>
      )}
    </div>
  );
}
