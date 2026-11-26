import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WaxSeal from './WaxSeal';
import InvitationCard from './InvitationCard';
import FloralCluster from './FloralCluster';

export default function EnvelopeScene() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [flapZIndex, setFlapZIndex] = useState(25);
  const [cardZIndex, setCardZIndex] = useState(10);

  const handleOpen = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);

    // 1. Wax seal fades out over ~300ms
    // 2. Flap rotates open (0.8s)
    // When flap passes 90 degrees (~380ms), move flap behind the card
    setTimeout(() => {
      setFlapZIndex(5);
      setCardZIndex(25); // Bring card to front so action buttons are freely clickable
    }, 380);

    // Complete transition to open state
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
    }, 850);
  };

  const handleReplay = () => {
    if (isOpening) return;
    // Slide card down into pocket, then fold flap down and restore wax seal
    setIsOpen(false);
    setIsOpening(true);

    // Move card behind pocket flaps
    setTimeout(() => {
      setCardZIndex(10);
    }, 200);

    // Fold flap back over pocket
    setTimeout(() => {
      setFlapZIndex(25);
    }, 400);

    setTimeout(() => {
      setIsOpening(false);
    }, 900);
  };

  return (
    <div className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-[#B4C6B6]">
      {/* SVG Texture Filter Definition for Paper Noise */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <filter id="envelopeNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.2  0 0 0 0 0.2  0 0 0 0 0.2  0 0 0 0.05 0"
          />
        </filter>
      </svg>

      {/* Atmospheric Ambient Glow & Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#AEC3B1]/40 via-transparent to-[#9DB4A1]/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_0%,rgba(60,80,65,0.15)_100%)] pointer-events-none" />

      {/* Envelope Main Wrapper - Mobile-first full viewport, cleanly centered on desktop */}
      <div className="relative w-full max-w-[430px] h-[100dvh] sm:h-[95dvh] sm:max-h-[740px] flex items-center justify-center p-2 sm:p-4">
        
        {/* Envelope 3D Container */}
        <div
          className="relative w-full h-full sm:rounded-3xl shadow-2xl flex flex-col justify-between"
          style={{
            perspective: '1400px',
            backgroundColor: '#C8D6CA',
          }}
        >
          {/* Paper Noise Overlay for authentic tactile texture */}
          <div
            className="absolute inset-0 pointer-events-none z-30 sm:rounded-3xl"
            style={{
              filter: 'url(#envelopeNoise)',
              mixBlendMode: 'overlay',
              opacity: 0.85,
            }}
          />

          {/* Envelope Inner Wall / Background Liner (Behind everything) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#B0C2B3] via-[#BDCDC0] to-[#AABBAE] z-0 overflow-hidden sm:rounded-3xl">
            {/* Subtle luxury geometric/botanical watermark on inner lining */}
            <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#FAF6F0_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-white/20 pointer-events-none" />
          </div>

          {/* ------------------------------------------------------------- */}
          {/* TOP FLAP (3D Hinge at top edge) */}
          {/* ------------------------------------------------------------- */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[48%] origin-top pointer-events-none"
            style={{
              transformStyle: 'preserve-3d',
              zIndex: flapZIndex,
            }}
            initial={false}
            animate={{
              rotateX: isOpen || isOpening ? 180 : 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.38, 0.0, 0.22, 1],
            }}
          >
            {/* Flap Front Face (Visible when closed) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-auto"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              {/* Triangular Flap Body pointing down to center */}
              <svg
                viewBox="0 0 400 240"
                preserveAspectRatio="none"
                className="w-full h-full drop-shadow-[0_10px_16px_rgba(40,55,44,0.24)]"
              >
                <defs>
                  <linearGradient id="topFlapGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#D5E2D7" />
                    <stop offset="65%" stopColor="#C8D6CA" />
                    <stop offset="100%" stopColor="#B6C7B8" />
                  </linearGradient>
                </defs>

                {/* Triangular Flap Body */}
                <polygon
                  points="0,0 400,0 200,240"
                  fill="url(#topFlapGrad)"
                />

                {/* Soft Drop Shadow edge line */}
                <line
                  x1="0"
                  y1="0"
                  x2="200"
                  y2="240"
                  stroke="#A7BBA9"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                />
                <line
                  x1="400"
                  y1="0"
                  x2="200"
                  y2="240"
                  stroke="#A7BBA9"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                />

                {/* Subtle double gold/cream hairline trim along triangular edges */}
                <polyline
                  points="4,3 200,237 396,3"
                  fill="none"
                  stroke="#FAF6F0"
                  strokeWidth="1.2"
                  strokeOpacity="0.8"
                />
                <polyline
                  points="14,3 200,224 386,3"
                  fill="none"
                  stroke="#C5A059"
                  strokeWidth="0.8"
                  strokeOpacity="0.5"
                  strokeDasharray="4 3"
                />
              </svg>

              {/* Delicate Text Above the Seal on Top Flap */}
              <div className="absolute top-[26%] sm:top-[28%] left-0 right-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
                <span className="font-cormorant italic text-xs sm:text-[13px] tracking-[0.24em] text-[#4A5D4D] font-medium drop-shadow-sm uppercase">
                  The Beginning of Our Forever
                </span>
                <span className="w-12 h-[0.5px] bg-[#9E7B3C]/50 mt-1" />
              </div>

              {/* Botanical Floral Cluster peeking near bottom-right edge of the flap */}
              <div className="absolute bottom-[-18px] right-2 sm:right-6 w-32 sm:w-36 h-28 pointer-events-none transform translate-y-3">
                <FloralCluster />
              </div>

              {/* Interactive Tactile 3D Gold Wax Seal Centered over Flap Apex */}
              <div className="absolute bottom-[-48px] sm:bottom-[-54px] left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
                <WaxSeal
                  isOpen={isOpen}
                  isOpening={isOpening}
                  onOpen={handleOpen}
                />
              </div>
            </div>

            {/* Flap Back Face (Visible when opened 180 degrees upwards) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateX(180deg)',
              }}
            >
              {/* Back of Flap (Opened State Liner) */}
              <svg
                viewBox="0 0 400 240"
                preserveAspectRatio="none"
                className="w-full h-full drop-shadow-md"
              >
                <defs>
                  <linearGradient id="innerFlapGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#C2D3C4" />
                    <stop offset="100%" stopColor="#A4B7A7" />
                  </linearGradient>
                </defs>
                <polygon points="0,0 400,0 200,240" fill="url(#innerFlapGrad)" />
                <polyline
                  points="6,3 200,234 394,3"
                  fill="none"
                  stroke="#C5A059"
                  strokeWidth="1"
                  strokeOpacity="0.45"
                />
              </svg>
            </div>
          </motion.div>

          {/* ------------------------------------------------------------- */}
          {/* INVITATION CARD (Slides smoothly out from envelope pocket) */}
          {/* ------------------------------------------------------------- */}
          <div
            className="absolute inset-0 flex items-center justify-center p-3 sm:p-4 pointer-events-none"
            style={{ zIndex: cardZIndex }}
          >
            <motion.div
              className="w-full flex items-center justify-center pointer-events-auto"
              initial={{ y: 140, scale: 0.92, opacity: 0 }}
              animate={
                isOpen || (isOpening && flapZIndex === 5)
                  ? {
                      y: 0,
                      scale: 1,
                      opacity: 1,
                      transition: {
                        duration: 0.9,
                        delay: 0.12,
                        type: 'spring',
                        damping: 24,
                        stiffness: 170,
                      },
                    }
                  : {
                      y: 140,
                      scale: 0.92,
                      opacity: 0,
                      transition: { duration: 0.45, ease: 'easeInOut' },
                    }
              }
            >
              <InvitationCard
                onReplay={handleReplay}
                isVisible={isOpen}
              />
            </motion.div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* ENVELOPE FRONT POCKET (Side & Bottom Folds) */}
          {/* ------------------------------------------------------------- */}
          <div
            className={`absolute inset-0 pointer-events-none transition-all duration-700 sm:rounded-3xl overflow-hidden ${
              isOpen ? 'z-[6] opacity-35' : 'z-[18] opacity-100'
            }`}
          >
            {/* Left Diagonal Pocket Flap */}
            <svg
              viewBox="0 0 200 400"
              preserveAspectRatio="none"
              className="absolute left-0 bottom-0 w-[50%] h-[60%] drop-shadow-[3px_0_8px_rgba(40,55,44,0.16)]"
            >
              <polygon points="0,0 200,200 0,400" fill="#BFCEBF" />
              <line x1="0" y1="0" x2="200" y2="200" stroke="#FAF6F0" strokeWidth="0.8" strokeOpacity="0.6" />
            </svg>

            {/* Right Diagonal Pocket Flap */}
            <svg
              viewBox="0 0 200 400"
              preserveAspectRatio="none"
              className="absolute right-0 bottom-0 w-[50%] h-[60%] drop-shadow-[-3px_0_8px_rgba(40,55,44,0.16)]"
            >
              <polygon points="200,0 0,200 200,400" fill="#BDCDBE" />
              <line x1="200" y1="0" x2="0" y2="200" stroke="#FAF6F0" strokeWidth="0.8" strokeOpacity="0.6" />
            </svg>

            {/* Bottom Trapezoid / Triangular Pocket Seam */}
            <svg
              viewBox="0 0 400 240"
              preserveAspectRatio="none"
              className="absolute bottom-0 left-0 right-0 w-full h-[38%] drop-shadow-[0_-8px_16px_rgba(40,55,44,0.2)]"
            >
              <defs>
                <linearGradient id="bottomPocketGrad" x1="50%" y1="100%" x2="50%" y2="0%">
                  <stop offset="0%" stopColor="#C4D3C6" />
                  <stop offset="60%" stopColor="#B7C7B9" />
                  <stop offset="100%" stopColor="#A8B9AA" />
                </linearGradient>
              </defs>
              <polygon points="0,240 400,240 200,40" fill="url(#bottomPocketGrad)" />
              <polyline
                points="2,238 200,43 398,238"
                fill="none"
                stroke="#FAF6F0"
                strokeWidth="1"
                strokeOpacity="0.7"
              />
              <polyline
                points="12,238 200,56 388,238"
                fill="none"
                stroke="#C5A059"
                strokeWidth="0.75"
                strokeOpacity="0.35"
                strokeDasharray="4 3"
              />
            </svg>
          </div>

        </div>
      </div>
    </div>
  );
}
