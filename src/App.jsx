import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { RotateCcw, Volume2, VolumeX } from 'lucide-react';
import StationeryStage from './components/StationeryStage';
import OpenedCard from './components/OpenedCard';
import { createAmbientTheme } from './audio/ambientTheme';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const stageWrapRef = useRef(null);
  const stageTopBeforeOpen = useRef(null);

  // Pick up the envelope's resting position before the open layout kicks in,
  // then glide it upward instead of snapping.
  const handleOpen = () => {
    stageTopBeforeOpen.current = stageWrapRef.current?.getBoundingClientRect().top ?? null;
    setIsOpen(true);
  };

  useLayoutEffect(() => {
    const el = stageWrapRef.current;
    if (!isOpen || !el || stageTopBeforeOpen.current == null) return;

    const from = stageTopBeforeOpen.current;
    const to = el.getBoundingClientRect().top;
    const delta = from - to;

    if (Math.abs(delta) < 2) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      el.style.transition = 'none';
      el.style.transform = 'none';
      return;
    }

    el.style.transition = 'none';
    el.style.transform = `translateY(${delta}px)`;
    void el.offsetHeight; // flush the starting position

    requestAnimationFrame(() => {
      el.style.transition = 'transform 800ms cubic-bezier(0.25, 0.8, 0.25, 1)';
      el.style.transform = 'translateY(0)';
    });
  }, [isOpen]);

  useEffect(() => () => audioRef.current?.dispose(), []);

  const startAudio = () => {
    try {
      if (!audioRef.current) audioRef.current = createAmbientTheme();
      audioRef.current.play();
      setIsMuted(false);
    } catch {
      /* audio is a nicety, never a blocker */
    }
  };

  const toggleAudio = () => {
    try {
      if (!audioRef.current) {
        audioRef.current = createAmbientTheme();
        audioRef.current.play();
        setIsMuted(false);
        return;
      }
      setIsMuted(audioRef.current.toggle());
    } catch {
      /* ignore */
    }
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsOpen(false);
  };

  return (
    <main
      className={`relative w-full overflow-x-hidden select-none transition-colors duration-700 ease-[cubic-bezier(0.2,0,0,1)] ${
        isOpen ? 'min-h-[100dvh] bg-sage-mint-paper' : 'h-[100dvh] bg-ivory-card overflow-hidden'
      }`}
    >
      {/* ===== OPENED ENVELOPE FULL-VIEWPORT BACKGROUND (fixed behind everything) ===== */}
      <svg
        className={`fixed inset-0 w-full h-full pointer-events-none select-none transition-opacity duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
          isOpen ? 'opacity-100 delay-500' : 'opacity-0'
        }`}
        viewBox="0 0 390 844"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ zIndex: 0 }}
      >
        <defs>
          <filter id="cotton-grain-opened" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="4" seed="12" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.055 0" in="noise" result="softNoise" />
          </filter>
          <linearGradient id="opened-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C2CFC5" />
            <stop offset="50%" stopColor="#CBD8CE" />
            <stop offset="100%" stopColor="#BCC9BF" />
          </linearGradient>
          <linearGradient id="opened-pocket-grad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#D4E0D7" />
            <stop offset="55%" stopColor="#CBD8CE" />
            <stop offset="100%" stopColor="#BFCBC1" />
          </linearGradient>
          <filter id="opened-pocket-shadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="-8" stdDeviation="12" floodColor="#1E1B16" floodOpacity="0.16" />
          </filter>
        </defs>
        <rect x="0" y="0" width="390" height="844" fill="url(#opened-bg-grad)" />
        <path d="M 0,0 L 195,112 L 390,0 Z" fill="#D6E2D9" />
        <path d="M 12,0 L 195,104 L 378,0" fill="none" stroke="#C5A059" strokeWidth="1" strokeOpacity="0.35" />
        <polygon points="0,0 195,450 0,844" fill="#C4D1C7" fillOpacity="0.55" />
        <polygon points="390,0 195,450 390,844" fill="#BFCBC1" fillOpacity="0.55" />
        <path d="M 0,680 L 180,582 Q 195,574 210,582 L 390,680 L 390,844 L 0,844 Z" fill="url(#opened-pocket-grad)" filter="url(#opened-pocket-shadow)" />
        <path d="M 0,680 L 180,582 Q 195,574 210,582 L 390,680" fill="none" stroke="#E7F4EA" strokeWidth="1.2" strokeOpacity="0.55" />
        <rect x="0" y="0" width="390" height="844" filter="url(#cotton-grain-opened)" />
      </svg>

      {/* ===== CONTENT COLUMN — single flow, z-10 above background ===== */}
      <div
        className={`relative flex flex-col items-center px-4 transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] ${
          isOpen ? 'pt-4 pb-10 gap-0' : 'h-[100dvh] justify-center gap-5 pb-0'
        }`}
        style={{ zIndex: 10 }}
      >
        {/* Editorial Header — removed from layout once open */}
        {!isOpen && (
          <header className="flex flex-col items-center text-center gap-1">
            <span className="font-label text-label-sm uppercase text-warm-taupe tracking-widest">
              THE ENGAGEMENT OF
            </span>
            <h1 className="font-script text-script-lg text-antique-gold-script">
              Pratistha &amp; Sandeep
            </h1>
          </header>
        )}

        {/* ===== SINGLE Envelope Widget instance ===== */}
        <div ref={stageWrapRef} className="stage-lift w-full max-w-sm will-change-transform">
          <StationeryStage isOpen={isOpen} onOpen={handleOpen} onStartAudio={startAudio} />
        </div>

        {/* Footer prompt — removed from layout once open */}
        {!isOpen && (
          <span
            id="seal-prompt-label"
            className="font-label text-label-sm uppercase text-charcoal-gold tracking-widest text-center"
          >
            TAP SEAL TO OPEN
          </span>
        )}

        {/* ===== Invitation Card — mounts only once open so it never displaces the closed state ===== */}
        {isOpen && (
          <div className="card-rise w-full max-w-sm">
            <OpenedCard />
          </div>
        )}
      </div>

      {/* Audio toggle — appears once the invitation is open */}
      {isOpen && (
        <button
          id="audio-toggle-btn"
          type="button"
          onClick={toggleAudio}
          aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
          aria-pressed={isMuted}
          title={isMuted ? 'Unmute music' : 'Mute music'}
          className="audio-fade fixed top-4 left-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-antique-gold/60 bg-ivory-card/90 text-charcoal-gold shadow-sm backdrop-blur-sm transition-transform duration-150 ease-out hover:bg-light-surface-variant active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-antique-gold cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-[18px] h-[18px]" aria-hidden="true" />
          ) : (
            <Volume2 className="w-[18px] h-[18px]" aria-hidden="true" />
          )}
        </button>
      )}

      {/* Replay button — subtle, fixed to the corner once opened */}
      {isOpen && (
        <button
          id="replay-unfold-btn"
          type="button"
          onClick={handleReplay}
          aria-label="Replay the envelope opening"
          title="Replay opening"
          className="replay-fade fixed top-4 right-4 z-50 inline-flex items-center gap-1.5 rounded-full border border-antique-gold/60 bg-ivory-card/90 px-3 py-2 text-charcoal-gold font-label text-label-sm uppercase tracking-wider shadow-sm backdrop-blur-sm transition-transform duration-150 ease-out hover:bg-light-surface-variant active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-antique-gold cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Replay</span>
        </button>
      )}
    </main>
  );
}
