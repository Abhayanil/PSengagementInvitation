import React, { useState } from 'react';
import OpenedCard from './OpenedCard';

/**
 * StationeryStage: Persistent 3D Interactive Envelope Rig
 * Connects Stitch's closed_envelope/code.html, envelope_unfolding/code.html,
 * and opened_invitation_card/code.html using Emil Kowalski's Design Engineering framework.
 */
export default function StationeryStage({ isOpen, onOpen }) {
  const [isPressing, setIsPressing] = useState(false);
  const [sealFading, setSealFading] = useState(false);

  const handleSealClick = (e) => {
    e.stopPropagation();
    if (isOpen || isPressing) return;

    // 1. Tactile press feedback (120ms var(--ease-out))
    setIsPressing(true);

    setTimeout(() => {
      setIsPressing(false);
      setSealFading(true);

      // 2. Trigger envelope 3D unseal sequence
      setTimeout(() => {
        onOpen();
        setSealFading(false);
      }, 160);
    }, 120);
  };

  return (
    <div className="relative w-full max-w-sm flex flex-col items-center select-none">
      
      {/* 3D Envelope Container with 1200px perspective */}
      <div
        className="envelope-stage relative w-full aspect-[4/3] rounded-sm bg-sage-mint-paper envelope-drop-shadow"
        style={{ perspective: '1200px' }}
      >
        {/* ========================================================================= */}
        {/* SVG DEFS FOR GRAIN, SHADOWS, GRADIENTS (Exact from Stitch) */}
        {/* ========================================================================= */}
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <filter id="cotton-grain-clean" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
                numOctaves="4"
                seed="12"
                result="noise"
              />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.055 0"
                in="noise"
                result="softNoise"
              />
            </filter>

            <filter id="flap-shadow-clean" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow
                dx="0"
                dy="6"
                stdDeviation="7"
                floodColor="#1E1B16"
                floodOpacity="0.16"
              />
            </filter>

            <filter id="pocket-shadow-clean" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow
                dx="0"
                dy="-3"
                stdDeviation="5"
                floodColor="#1E1B16"
                floodOpacity="0.08"
              />
            </filter>

            <linearGradient id="env-base-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4E0D7" />
              <stop offset="55%" stopColor="#CBD8CE" />
              <stop offset="100%" stopColor="#C1CFC4" />
            </linearGradient>

            <linearGradient id="env-flap-grad" x1="25%" y1="0%" x2="75%" y2="100%">
              <stop offset="0%" stopColor="#D7E3DA" />
              <stop offset="65%" stopColor="#CBD8CE" />
              <stop offset="100%" stopColor="#C2D0C5" />
            </linearGradient>

            <linearGradient id="gold-liner-grad" x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#E9C176" />
              <stop offset="50%" stopColor="#C5A059" />
              <stop offset="100%" stopColor="#9E7B3C" />
            </linearGradient>

            <radialGradient id="wax-body-clean" cx="38%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#E9C176" />
              <stop offset="45%" stopColor="#C5A059" />
              <stop offset="82%" stopColor="#AF8B47" />
              <stop offset="100%" stopColor="#775A19" />
            </radialGradient>

            <linearGradient id="wax-rim-clean" x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor="#FFDEA5" />
              <stop offset="50%" stopColor="#C5A059" />
              <stop offset="100%" stopColor="#5D4201" />
            </linearGradient>
          </defs>
        </svg>

        {/* ========================================================================= */}
        {/* 1. ENVELOPE INTERIOR / BASE LINER (Layer 0) */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-sm">
          <svg
            className="w-full h-full block pointer-events-none"
            viewBox="0 0 360 270"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <rect x="0" y="0" width="360" height="270" fill="url(#env-base-grad)" />
            {/* Side Folds */}
            <polygon points="0,0 180,152 0,270" fill="#C4D1C7" />
            <polygon points="360,0 180,152 360,270" fill="#BFCBC1" />
            {/* Cotton grain */}
            <rect x="0" y="0" width="360" height="270" filter="url(#cotton-grain-clean)" />
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* 2. TOP FLAP 3D HINGE RIG (Layer 15 closed / Layer 5 opened) */}
        {/* Transform-origin is top center (y=0). Rotates rotateX(0deg) -> rotateX(180deg) */}
        {/* ========================================================================= */}
        <div
          className={`absolute top-0 left-0 w-full h-[58%] pointer-events-none transition-all duration-[600ms] ease-[cubic-bezier(0.2,0,0,1)] ${
            isOpen ? 'z-5' : 'z-25'
          }`}
          style={{
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
          }}
        >
          {/* --- FACE 1: Closed Flap (Front / Outside, visible when rotateX(0deg)) --- */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-auto"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <svg
              className="w-full h-full block"
              viewBox="0 0 360 160"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Triangular Flap Body */}
              <path
                d="M -4,-4 L 364,-4 L 194,148 Q 180,160 166,148 Z"
                fill="url(#env-flap-grad)"
                filter="url(#flap-shadow-clean)"
              />
              <path
                d="M 0,0 L 166,148 Q 180,160 194,148 L 360,0"
                fill="none"
                stroke="#E7F4EA"
                strokeWidth="1"
                strokeOpacity="0.55"
              />
              <rect x="0" y="0" width="360" height="160" filter="url(#cotton-grain-clean)" />
            </svg>

            {/* Flap Calligraphy Text */}
            <div className="absolute top-6 left-0 right-0 flex justify-center text-center px-4 pointer-events-none">
              <p
                data-design-text-token="body-md"
                className="font-display text-body-md italic text-dark-on-primary leading-snug max-w-[200px]"
              >
                The Beginning of Our Forever
              </p>
            </div>

            {/* Tactile Antique Gold Wax Seal (Positioned at Flap Apex) */}
            <div
              className={`absolute left-1/2 bottom-[-18px] -translate-x-1/2 z-30 transition-all duration-300 ease-out ${
                sealFading || isOpen ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'
              }`}
            >
              <button
                id="wax-seal-trigger"
                type="button"
                data-component-id="button-icon"
                data-component-type="button"
                data-component-variant="icon"
                aria-label="Tap seal to open engagement invitation"
                onClick={handleSealClick}
                className={`seal-interactive relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-seal-press ease-seal-press hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-shadow ${
                  isPressing ? 'scale-95' : 'active:scale-95'
                }`}
              >
                <svg
                  className="w-full h-full wax-seal-shadow pointer-events-none"
                  viewBox="0 0 120 120"
                  aria-hidden="true"
                >
                  <path
                    d="M60,5 C69,4 78,8 86,11 C94,14 103,19 108,28 C113,37 115,47 116,57 C117,67 113,77 109,86 C105,95 97,104 88,109 C79,114 69,115 59,116 C49,117 39,113 30,108 C21,103 14,96 9,87 C4,78 4,67 4,57 C4,47 7,37 12,28 C17,19 25,13 34,9 C43,5 51,6 60,5 Z"
                    fill="url(#wax-body-clean)"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="41"
                    fill="#CBA65E"
                    stroke="url(#wax-rim-clean)"
                    strokeWidth="4.5"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="37"
                    fill="none"
                    stroke="#775A19"
                    strokeWidth="1"
                    strokeOpacity="0.55"
                  />
                </svg>
                <span
                  data-design-text-token="label-lg"
                  className="absolute inset-0 flex items-center justify-center font-title text-label-lg text-dark-on-primary wax-deboss-text select-none"
                >
                  P&amp;S
                </span>
              </button>
            </div>
          </div>

          {/* --- FACE 2: Opened Flap (Back / Inside, visible when rotateX(180deg)) --- */}
          {/* Shows the Antique Gold Foil Interior Liner from envelope_unfolding */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateX(180deg)',
            }}
          >
            <svg
              className="w-full h-full block"
              viewBox="0 0 360 160"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Outer sage-mint flap border pointing upward */}
              <path
                d="M 0,0 L 166,148 Q 180,160 194,148 L 360,0 Z"
                fill="#CBD8CE"
              />
              {/* Warm antique gold foil interior liner */}
              <path
                d="M 16,0 L 170,136 Q 180,146 190,136 L 344,0 Z"
                fill="url(#gold-liner-grad)"
              />
              <polyline
                points="16,0 170,136 190,136 344,0"
                fill="none"
                stroke="#C5A059"
                strokeWidth="1"
                strokeOpacity="0.4"
              />
            </svg>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. HERO INVITATION CARD (Layer 20 - Slides Upward out of Pocket) */}
        {/* Staged slide: translateY(120px) scale(0.94) -> translateY(-40px) scale(1) */}
        {/* ========================================================================= */}
        <div
          className={`absolute left-0 right-0 z-20 flex justify-center px-2 transition-all duration-[650ms] ease-[cubic-bezier(0.2,0,0,1)] ${
            isOpen
              ? 'opacity-100 pointer-events-auto transform -translate-y-28 sm:-translate-y-32 scale-100'
              : 'opacity-0 pointer-events-none transform translate-y-16 scale-95'
          }`}
          style={{
            transitionDelay: isOpen ? '160ms' : '0ms',
          }}
        >
          <OpenedCard />
        </div>

        {/* ========================================================================= */}
        {/* 4. ENVELOPE FRONT POCKET (Layer 25 - Frames the lower part of the Card) */}
        {/* ========================================================================= */}
        <div
          className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 overflow-hidden rounded-sm ${
            isOpen ? 'z-25 opacity-70' : 'z-20 opacity-100'
          }`}
        >
          <svg
            className="w-full h-full block"
            viewBox="0 0 360 270"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Bottom Pocket Seam */}
            <path
              d="M 0,270 L 166,138 Q 180,128 194,138 L 360,270 Z"
              fill="#CFDDD2"
              filter="url(#pocket-shadow-clean)"
            />
            <path
              d="M 0,270 L 166,138 Q 180,128 194,138 L 360,270"
              fill="none"
              stroke="#E7F4EA"
              strokeWidth="1"
              strokeOpacity="0.55"
            />
            <rect x="0" y="0" width="360" height="270" filter="url(#cotton-grain-clean)" />
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* 5. WATERCOLOR FLORAL CLUSTER (Layer 30 - Corner Botanical Accent) */}
        {/* ========================================================================= */}
        <div
          className="absolute -right-5 -bottom-6 z-30 w-36 h-36 -rotate-12 pointer-events-none select-none drop-shadow-sm"
          aria-hidden="true"
        >
          <img
            src="/stitch-floral.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

      </div>
    </div>
  );
}
