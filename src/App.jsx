import React, { useState } from 'react';
import { downloadEngagementICS } from './utils/calendarUtils';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const [dateSaved, setDateSaved] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleSealClick = () => {
    if (isOpen) return;
    setIsPressing(true);
    setTimeout(() => {
      setIsPressing(false);
      setIsOpen(true);
    }, 150);
  };

  const handleReplay = () => {
    setIsOpen(false);
    setDateSaved(false);
  };

  const handleLocationClick = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=7+Sprinkles+Cafe',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleSaveDateClick = () => {
    downloadEngagementICS();
    setDateSaved(true);
    setTimeout(() => setDateSaved(false), 3000);
  };

  return (
    <main
      className="envelope-stage relative min-h-screen min-h-[884px] w-full overflow-hidden bg-ivory-card flex flex-col items-center justify-center gap-gutter-lg sm:gap-gutter-xl px-gutter-md sm:px-gutter-lg py-gutter-lg sm:py-section select-none text-charcoal-gold"
      data-stitch-vh="min-h-[884px]===min-h-screen"
    >
      {/* Editorial Header Above Envelope */}
      <header className="flex flex-col items-center text-center gap-gutter-xs z-10">
        <span
          data-design-text-token="label-sm"
          className="font-label text-label-sm uppercase text-warm-taupe tracking-widest"
        >
          THE ENGAGEMENT OF
        </span>
        <h1
          data-design-text-token="script-lg"
          className="font-script text-script-lg text-antique-gold-script"
        >
          Pratistha &amp; Sandeep
        </h1>
      </header>

      {/* Main Interactive Stationery Envelope Stage */}
      <section
        className="relative w-full max-w-sm"
        aria-label="Interactive Engagement Envelope"
      >
        {/* ========================================================================= */}
        {/* CLOSED ENVELOPE VIEW (Active when !isOpen) */}
        {/* ========================================================================= */}
        <div
          className={`relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-sage-mint-paper envelope-drop-shadow transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] ${
            isOpen ? 'opacity-0 scale-95 pointer-events-none absolute inset-0' : 'opacity-100 scale-100 z-10'
          }`}
        >
          {/* Envelope Paper Folds & Cotton Grain Texture SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none select-none"
            viewBox="0 0 360 270"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
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
            </defs>

            {/* Envelope Base & Side Flaps */}
            <rect x="0" y="0" width="360" height="270" fill="url(#env-base-grad)" />
            <polygon points="0,0 180,152 0,270" fill="#C4D1C7" />
            <polygon points="360,0 180,152 360,270" fill="#BFCBC1" />

            {/* Bottom Pocket Flap */}
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

            {/* Top Triangular Flap */}
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

            {/* Cotton Grain Overlay */}
            <rect x="0" y="0" width="360" height="270" filter="url(#cotton-grain-clean)" />
          </svg>

          {/* Upper Triangular Flap Calligraphy */}
          <div className="relative z-10 w-full pt-gutter-lg px-gutter-xl flex justify-center text-center">
            <p
              data-design-text-token="body-md"
              className="font-display text-body-md italic text-dark-on-primary leading-snug max-w-[200px]"
            >
              The Beginning of Our Forever
            </p>
          </div>

          {/* Centerpiece Antique Gold Wax Seal at Flap Tip */}
          <div className="absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 z-30">
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
                <defs>
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

          {/* Watercolor Floral Cluster at lower-right corner */}
          <div
            className="absolute -right-5 -bottom-6 z-20 w-36 h-36 -rotate-12 pointer-events-none select-none drop-shadow-sm"
            aria-hidden="true"
          >
            <img
              src="/stitch-floral.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* OPEN ENVELOPE & EMERGING INVITATION CARD VIEW (Active when isOpen) */}
        {/* ========================================================================= */}
        <div
          className={`relative w-full pt-10 sm:pt-14 transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] ${
            isOpen ? 'opacity-100 z-20' : 'opacity-0 scale-95 pointer-events-none absolute inset-0'
          }`}
        >
          {/* Open Top Flap with Antique Gold Foil Liner */}
          <div
            id="top-flap-layer"
            className={`unfold-flap relative z-10 w-full ${
              isOpen ? 'is-open' : 'is-closed'
            }`}
          >
            <svg
              className="w-full h-36 block"
              viewBox="0 0 360 144"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="gold-liner-grad" x1="15%" y1="0%" x2="85%" y2="100%">
                  <stop offset="0%" stopColor="#E9C176" />
                  <stop offset="50%" stopColor="#C5A059" />
                  <stop offset="100%" stopColor="#9E7B3C" />
                </linearGradient>
              </defs>
              {/* Outer sage-mint flap border */}
              <path
                d="M 0,144 L 166,12 Q 180,2 194,12 L 360,144 Z"
                fill="#CBD8CE"
              />
              {/* Warm antique gold foil interior liner */}
              <path
                d="M 18,144 L 170,22 Q 180,14 190,22 L 342,144 Z"
                fill="url(#gold-liner-grad)"
              />
            </svg>
          </div>

          {/* Emerging Ivory Cotton Invitation Card */}
          <article
            id="invitation-card"
            className={`emerging-card relative z-30 mx-auto w-[92%] sm:w-[88%] -mt-36 -mb-6 bg-ivory-card rounded-md border border-antique-gold/55 p-gutter-xs stationery-card-shadow ${
              isOpen ? 'is-revealed' : 'is-tucked'
            }`}
            aria-label="Engagement Invitation Details"
          >
            {/* Delicate Double Hairline Antique Gold Inner Border */}
            <div className="w-full rounded-sm border border-antique-gold/35 px-gutter-sm sm:px-gutter-md py-gutter-md sm:py-gutter-lg flex flex-col items-center text-center gap-gutter-sm sm:gap-gutter-md">
              {/* Eyebrow Header */}
              <header>
                <span
                  data-component-id="card-eyebrow"
                  data-component-type="typography"
                  data-component-variant="label"
                  data-design-text-token="label-sm"
                  className="font-label text-label-sm uppercase text-warm-taupe tracking-widest"
                >
                  ENGAGEMENT CELEBRATION
                </span>
              </header>

              {/* Center Illustration Frame (4:5 portrait) */}
              <div className="w-40 sm:w-44 aspect-[4/5] rounded-sm border border-antique-gold/25 overflow-hidden bg-ivory-card flex items-center justify-center shadow-inner">
                {!imgError ? (
                  <img
                    src="/couple-illustration.png"
                    alt="Watercolor illustration of Pratistha and Sandeep beneath a floral arch"
                    className="w-full h-full object-cover object-top"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-b from-[#F2E8DC] to-[#FAF6F0]">
                    <span className="font-script text-2xl text-antique-gold-script">
                      Pratistha &amp; Sandeep
                    </span>
                    <span className="font-label text-[10px] uppercase text-warm-taupe tracking-widest mt-1">
                      Forever &amp; Always
                    </span>
                  </div>
                )}
              </div>

              {/* Couple Names in Flowing Antique Gold Script Calligraphy */}
              <h1
                data-component-id="card-couple-names"
                data-component-type="typography"
                data-component-variant="display"
                data-design-text-token="script-lg"
                className="font-script text-script-lg text-antique-gold-script leading-tight px-1"
              >
                Pratistha Sharma &amp;<br />Sandeep Sadasivam
              </h1>

              {/* Minimal Gold Divider with Center Diamond */}
              <div
                className="flex items-center justify-center gap-gutter-sm w-36 my-0.5"
                aria-hidden="true"
              >
                <span className="h-px flex-1 bg-antique-gold/50" />
                <span className="w-2 h-2 rotate-45 border border-antique-gold bg-ivory-card" />
                <span className="h-px flex-1 bg-antique-gold/50" />
              </div>

              {/* Italicized Quote */}
              <p
                data-component-id="card-quote"
                data-component-type="typography"
                data-component-variant="body"
                data-design-text-token="body-md"
                className="font-display text-body-md italic text-dark-charcoal text-pretty max-w-xs px-2"
              >
                &ldquo;Two hearts, one journey. Join us as we celebrate our engagement with love and laughter.&rdquo;
              </p>

              {/* Event Details Block */}
              <section
                className="flex flex-col items-center gap-gutter-xs py-gutter-xs w-full"
                aria-label="Event Date, Venue, and Time"
              >
                <span
                  data-design-text-token="label-lg"
                  className="font-label text-label-lg uppercase text-dark-charcoal tracking-wider"
                >
                  SUNDAY, 27TH DECEMBER 2026
                </span>
                <span
                  data-design-text-token="label-sm"
                  className="font-label text-label-sm uppercase text-dark-charcoal tracking-widest"
                >
                  7 SPRINKLES CAFE
                </span>
                <span
                  data-design-text-token="label-sm"
                  className="font-label text-label-sm uppercase text-warm-taupe tracking-wider tabular-nums"
                >
                  10:00 AM – 3:00 PM
                </span>
              </section>

              {/* Action Row: View Location & Save the Date */}
              <div className="flex items-center justify-center gap-gutter-sm w-full pt-gutter-xs">
                {/* View Location Button */}
                <button
                  id="view-location-btn"
                  type="button"
                  data-component-id="button-with-icon"
                  data-component-type="button"
                  data-component-variant="with-icon"
                  onClick={handleLocationClick}
                  className="action-pill inline-flex items-center gap-gutter-xs px-gutter-sm py-gutter-sm rounded-full border border-antique-gold bg-ivory-card text-dark-charcoal font-label text-label-sm uppercase tracking-wider whitespace-nowrap transition-transform duration-seal-press ease-seal-press hover:bg-light-surface-variant active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-antique-gold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-antique-gold-script" aria-hidden="true">
                    location_on
                  </span>
                  <span data-design-text-token="label-sm">View Location</span>
                </button>

                {/* Save the Date Button */}
                <button
                  id="save-date-btn"
                  type="button"
                  data-component-id="button-with-icon"
                  data-component-type="button"
                  data-component-variant="with-icon"
                  onClick={handleSaveDateClick}
                  className="action-pill inline-flex items-center gap-gutter-xs px-gutter-sm py-gutter-sm rounded-full border border-dark-charcoal/40 bg-ivory-card text-dark-charcoal font-label text-label-sm uppercase tracking-wider whitespace-nowrap transition-transform duration-seal-press ease-seal-press hover:bg-light-surface-variant active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-charcoal cursor-pointer"
                >
                  <span className="material-symbols-outlined text-dark-charcoal" aria-hidden="true">
                    calendar_today
                  </span>
                  <span data-design-text-token="label-sm">
                    {dateSaved ? 'Date Saved!' : 'Save the Date'}
                  </span>
                </button>
              </div>
            </div>
          </article>

          {/* Front Sage-Mint Envelope Pocket Framing the Lower Part */}
          <div className="relative z-20 w-full aspect-[16/10] rounded-b-sm overflow-hidden bg-sage-mint-paper envelope-drop-shadow -mt-10 sm:-mt-12 pointer-events-none">
            <svg
              className="w-full h-full block"
              viewBox="0 0 360 225"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="unfold-pocket-grad" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#D4E0D7" />
                  <stop offset="55%" stopColor="#CBD8CE" />
                  <stop offset="100%" stopColor="#C1CFC4" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="360" height="225" fill="#BFCBC1" />
              <polygon points="0,0 180,108 0,225" fill="#C7D4CA" />
              <polygon points="360,0 180,108 360,225" fill="#C2CFC5" />
              <path
                d="M 0,225 L 166,92 Q 180,82 194,92 L 360,225 Z"
                fill="url(#unfold-pocket-grad)"
              />
              <path
                d="M 0,225 L 166,92 Q 180,82 194,92 L 360,225"
                fill="none"
                stroke="#E7F4EA"
                strokeWidth="1"
                strokeOpacity="0.55"
              />
            </svg>

            {/* Watercolor Floral Cluster at lower-right corner */}
            <div
              className="absolute -right-5 -bottom-6 z-40 w-36 h-36 -rotate-12 pointer-events-none select-none drop-shadow-sm"
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
      </section>

      {/* Footer Controls: Prompt or Replay Button */}
      <footer className="z-20 mt-1">
        {!isOpen ? (
          <span
            id="seal-prompt-label"
            data-design-text-token="label-sm"
            className="font-label text-label-sm uppercase text-charcoal-gold tracking-widest text-center animate-pulse"
          >
            TAP SEAL TO OPEN
          </span>
        ) : (
          <button
            id="replay-unfold-btn"
            type="button"
            data-component-id="button-primary"
            data-component-type="button"
            data-component-variant="primary"
            onClick={handleReplay}
            className="px-gutter-lg py-gutter-sm rounded-full bg-ivory-card border border-antique-gold/60 text-charcoal-gold font-label text-label-sm uppercase tracking-widest transition-transform duration-seal-press ease-seal-press hover:bg-light-surface-variant active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-antique-gold cursor-pointer"
          >
            <span data-design-text-token="label-sm">REPLAY UNFOLD</span>
          </button>
        )}
      </footer>
    </main>
  );
}
