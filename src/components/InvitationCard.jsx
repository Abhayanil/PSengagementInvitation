import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, RotateCcw, Heart, Sparkles } from 'lucide-react';
import { downloadEngagementICS } from '../utils/calendarUtils';

export default function InvitationCard({ onReplay, isVisible }) {
  const [imgError, setImgError] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleSaveDate = () => {
    downloadEngagementICS();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleOpenMaps = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=7+Sprinkles+Cafe',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="relative w-full max-w-[390px] mx-auto bg-[#FAF6F0] rounded-2xl shadow-card-elevated border-[1.5px] border-[#C5A059]/40 p-4 sm:p-5 select-text overflow-hidden">
      {/* Delicate Double Hairline Inner Border */}
      <div className="absolute inset-1.5 sm:inset-2.5 rounded-xl border border-[#C5A059]/35 pointer-events-none" />
      <div className="absolute inset-2 sm:inset-3 rounded-[10px] border border-[#C5A059]/20 pointer-events-none" />

      {/* Elegant Corner Botanical Accents */}
      <svg
        className="absolute top-2 left-2 w-6 h-6 text-[#9E7B3C]/40 pointer-events-none"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M3 3h8M3 3v8M3 3l9 9" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
      <svg
        className="absolute top-2 right-2 w-6 h-6 text-[#9E7B3C]/40 pointer-events-none rotate-90"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M3 3h8M3 3v8M3 3l9 9" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
      <svg
        className="absolute bottom-2 left-2 w-6 h-6 text-[#9E7B3C]/40 pointer-events-none -rotate-90"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M3 3h8M3 3v8M3 3l9 9" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
      <svg
        className="absolute bottom-2 right-2 w-6 h-6 text-[#9E7B3C]/40 pointer-events-none rotate-180"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M3 3h8M3 3v8M3 3l9 9" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>

      {/* Replay Button in corner */}
      <button
        onClick={onReplay}
        type="button"
        title="Fold envelope back"
        aria-label="Replay envelope opening animation"
        className="absolute top-3.5 right-3.5 z-30 p-1.5 rounded-full text-[#9E7B3C] hover:text-[#7A5B20] hover:bg-[#C8D6CA]/20 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>

      {/* Main Content Container */}
      <div className="flex flex-col items-center text-center relative z-10 px-1 py-0.5">
        
        {/* 1. Top Header: Tracked uppercase serif */}
        <div className="flex items-center gap-2 mb-1.5 mt-0.5">
          <span className="h-[0.5px] w-5 sm:w-8 bg-[#C5A059]/60" />
          <h2 className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-cormorant font-semibold text-[#8C6D34]">
            Engagement Celebration
          </h2>
          <span className="h-[0.5px] w-5 sm:w-8 bg-[#C5A059]/60" />
        </div>

        {/* 2. Couple Illustration Frame */}
        <div className="relative w-full max-w-[210px] sm:max-w-[230px] aspect-[4/4.8] max-h-[30vh] sm:max-h-[33vh] rounded-t-full rounded-b-xl overflow-hidden border-[1.5px] border-[#C5A059]/45 shadow-sm my-1 bg-gradient-to-b from-[#F4EDE2] to-[#FAF6F0] flex items-center justify-center">
          {!imgError ? (
            <img
              src="/couple-illustration.png"
              alt="Pratistha & Sandeep Illustration"
              className="w-full h-full object-cover object-center transition-opacity duration-700"
              onError={() => setImgError(true)}
              loading="eager"
            />
          ) : (
            /* Fallback romantic couple art */
            <div className="w-full h-full flex flex-col items-center justify-center p-3 relative overflow-hidden bg-gradient-to-b from-[#EFE6D8] via-[#FAF6F0] to-[#E8DFD1]">
              <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:12px_12px] opacity-25" />
              
              {/* Couple Silhouette SVG */}
              <svg viewBox="0 0 160 180" className="w-28 h-28 relative z-10 drop-shadow-sm">
                <defs>
                  <linearGradient id="coupleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C5A059" />
                    <stop offset="50%" stopColor="#D8A1A8" />
                    <stop offset="100%" stopColor="#9E7B3C" />
                  </linearGradient>
                </defs>
                {/* Arch outline */}
                <path
                  d="M 30,170 V 70 A 50,50 0 0,1 130,70 V 170"
                  fill="none"
                  stroke="#C5A059"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  opacity="0.6"
                />
                {/* Male figure silhouette */}
                <path
                  d="M 68,60 C 68,52 74,46 82,46 C 90,46 96,52 96,60 C 96,67 90,73 82,73 C 74,73 68,67 68,60 Z"
                  fill="#7A6546"
                />
                <path
                  d="M 62,82 C 72,75 92,75 102,82 C 108,86 112,98 110,135 L 54,135 C 52,98 56,86 62,82 Z"
                  fill="#68563B"
                />
                {/* Female figure silhouette leaning close */}
                <path
                  d="M 52,65 C 52,58 57,53 64,53 C 71,53 76,58 76,65 C 76,71 71,76 64,76 C 57,76 52,71 52,65 Z"
                  fill="#8F5E68"
                />
                <path
                  d="M 40,86 C 48,78 64,80 72,86 C 76,92 78,110 75,135 L 35,135 C 32,110 36,92 40,86 Z"
                  fill="#B27B84"
                />
                {/* Romantic floral heart accent */}
                <circle cx="80" cy="35" r="4" fill="#D8A1A8" opacity="0.8" />
                <path
                  d="M 80,44 C 77,41 73,42 73,45 C 73,48 80,53 80,53 C 80,53 87,48 87,45 C 87,42 83,41 80,44 Z"
                  fill="#D8A1A8"
                />
              </svg>
              <span className="text-[10px] tracking-wider font-cormorant italic text-[#8C6D34] mt-1 relative z-10">
                Forever &amp; Always
              </span>
            </div>
          )}

          {/* Inner Arch Hairline Highlight */}
          <div className="absolute inset-1 rounded-t-full rounded-b-lg border border-[#FAF6F0]/60 pointer-events-none" />
        </div>

        {/* 3. Couple Names in Flowing Antique Gold Calligraphy */}
        <div className="my-1 sm:my-1.5 flex flex-col items-center">
          <h1 className="font-script text-2xl sm:text-[27px] leading-tight text-[#9E7B3C] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] px-1">
            Pratistha Sharma
          </h1>
          <span className="font-cormorant italic text-xs sm:text-sm text-[#D8A1A8] font-semibold my-[-4px]">
            &amp;
          </span>
          <h1 className="font-script text-2xl sm:text-[27px] leading-tight text-[#9E7B3C] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] px-1">
            Sandeep Sadasivam
          </h1>
        </div>

        {/* 4. Divider & Quote */}
        <div className="flex items-center gap-2 w-full max-w-[240px] my-1">
          <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent to-[#C5A059]/60" />
          <div className="w-1.5 h-1.5 rotate-45 border border-[#C5A059] bg-[#FAF6F0]" />
          <div className="h-[0.5px] flex-1 bg-gradient-to-l from-transparent to-[#C5A059]/60" />
        </div>

        <p className="font-cormorant italic text-xs sm:text-[13px] leading-relaxed text-charcoal-muted max-w-[270px] sm:max-w-[300px] px-2 mb-2">
          &ldquo;Two hearts, one journey. Join us as we celebrate our engagement with love and laughter.&rdquo;
        </p>

        {/* 5. Event Details Card Section */}
        <div className="w-full bg-[#F5ECE1]/70 rounded-xl p-2.5 sm:p-3 border border-[#C5A059]/25 flex flex-col gap-1.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
          {/* Date */}
          <div className="flex items-center justify-center gap-2 text-charcoal">
            <Calendar className="w-3.5 h-3.5 text-[#9E7B3C] shrink-0" />
            <span className="font-cormorant font-bold text-xs sm:text-[13px] tracking-[0.08em] uppercase text-[#2C2A29]">
              Sunday, 27th December 2026
            </span>
          </div>

          {/* Time & Venue Row */}
          <div className="flex items-center justify-center divide-x divide-[#C5A059]/30 text-[11px] sm:text-xs font-cormorant text-charcoal-muted pt-0.5 border-t border-[#C5A059]/15">
            <div className="flex items-center justify-center gap-1.5 px-2.5">
              <span className="font-semibold text-charcoal tracking-wide">
                10:00 AM – 3:00 PM
              </span>
            </div>
            <div className="flex items-center justify-center gap-1.5 px-2.5">
              <MapPin className="w-3 h-3 text-[#9E7B3C] shrink-0" />
              <span className="font-bold text-charcoal tracking-wider uppercase">
                7 Sprinkles Cafe
              </span>
            </div>
          </div>
        </div>

        {/* 6. Action Buttons Row */}
        <div className="grid grid-cols-2 gap-2 w-full mt-2.5 pt-1 border-t border-[#C5A059]/20">
          {/* Location Button */}
          <button
            type="button"
            onClick={handleOpenMaps}
            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-[#FAF6F0] hover:bg-[#F3ECE0] active:scale-[0.98] border border-[#C5A059]/50 text-[#7A5B20] text-[11px] sm:text-xs font-cormorant font-bold uppercase tracking-wider shadow-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
          >
            <MapPin className="w-3.5 h-3.5 text-[#9E7B3C]" />
            <span>View Map</span>
          </button>

          {/* Save the Date Button */}
          <button
            type="button"
            onClick={handleSaveDate}
            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-gradient-to-r from-[#C5A059] to-[#9E7B3C] hover:from-[#B38E4A] hover:to-[#8C6B2F] active:scale-[0.98] text-[#FAF6F0] text-[11px] sm:text-xs font-cormorant font-bold uppercase tracking-wider shadow-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
          >
            {downloadSuccess ? (
              <>
                <Heart className="w-3.5 h-3.5 fill-current text-white animate-bounce" />
                <span>Date Saved!</span>
              </>
            ) : (
              <>
                <Calendar className="w-3.5 h-3.5 text-[#FAF6F0]" />
                <span>Save Date</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
