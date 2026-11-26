import React, { useState } from 'react';
import StationeryStage from './components/StationeryStage';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleReplay = () => {
    setIsOpen(false);
  };

  return (
    <main
      className="relative min-h-screen min-h-[884px] w-full overflow-x-hidden bg-ivory-card flex flex-col items-center justify-center gap-gutter-lg sm:gap-gutter-xl px-gutter-md sm:px-gutter-lg py-8 sm:py-section select-none text-charcoal-gold"
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

      {/* 3D Interactive Stationery Envelope & Card Stage */}
      <div className={`w-full max-w-sm transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] ${isOpen ? 'pt-16 sm:pt-20' : 'pt-2'}`}>
        <StationeryStage isOpen={isOpen} onOpen={handleOpen} />
      </div>

      {/* Footer Prompt or Replay Button */}
      <footer className="z-20 mt-2 sm:mt-4">
        {!isOpen ? (
          <span
            id="seal-prompt-label"
            data-design-text-token="label-sm"
            className="font-label text-label-sm uppercase text-charcoal-gold tracking-widest text-center"
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
            className="action-pill px-gutter-lg py-gutter-sm rounded-full bg-ivory-card border border-antique-gold/60 text-charcoal-gold font-label text-label-sm uppercase tracking-widest transition-transform duration-seal-press ease-seal-press hover:bg-light-surface-variant active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-antique-gold cursor-pointer"
          >
            <span data-design-text-token="label-sm">REPLAY UNFOLD</span>
          </button>
        )}
      </footer>
    </main>
  );
}
