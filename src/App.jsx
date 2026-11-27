import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RotateCcw, Volume2, VolumeX } from 'lucide-react';
import EnvelopeIntro from './components/EnvelopeIntro';
import InvitationCard from './components/InvitationCard';
import { createSoundscape } from './audio/soundscape';

const SEEN_KEY = 'ps-engagement-opened';
const hasSeenIntro = () => {
  try {
    return window.localStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
};
const markSeen = () => {
  try {
    window.localStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* private mode etc. — the intro just plays again next time */
  }
};

export default function App() {
  // Returning guests go straight to the invitation; Replay is still there.
  const [returning] = useState(hasSeenIntro);
  const [phase, setPhase] = useState(returning ? 'open' : 'closed'); // closed | open
  const [revealed, setRevealed] = useState(returning);
  // Browsers only allow sound after a tap, so returning guests start with music off.
  const [muted, setMuted] = useState(returning);
  const [introKey, setIntroKey] = useState(0);
  const [instant, setInstant] = useState(returning); // no slow stagger for returning guests
  const [nearTop, setNearTop] = useState(true);
  const soundRef = useRef(null);
  const cardRef = useRef(null);
  const mutedRef = useRef(returning);

  // Sound engine (preloads the piano track straight away).
  useEffect(() => {
    const s = createSoundscape();
    s.setMuted(mutedRef.current);
    soundRef.current = s;
    return () => s.dispose();
  }, []);

  // Fade the music out while the tab/phone is in the background.
  useEffect(() => {
    const onVis = () => soundRef.current?.setMuted(document.hidden || mutedRef.current);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Replay only shows near the top so it never sits over the card text.
  useEffect(() => {
    const onScroll = () => setNearTop(window.scrollY < 120);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // No scrolling while the envelope is on screen.
  useEffect(() => {
    document.body.classList.toggle('is-locked', phase !== 'open');
  }, [phase]);

  const toggleSound = () => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    const s = soundRef.current;
    s?.setMuted(next);
    // First tap on the sound button (returning guests): start the music now.
    if (!next && s && !s.hasStarted()) {
      s.unlock();
      s.swell(2.5);
    }
  };

  const replay = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const card = cardRef.current;
    if (card) {
      card.style.opacity = '0';
      card.style.clipPath = '';
    }
    setRevealed(false);
    setInstant(false);
    soundRef.current?.hush(1.5);
    setIntroKey((k) => k + 1);
    setPhase('closed');
  };

  const onReveal = useCallback(() => setRevealed(true), []);
  const onDone = useCallback(() => {
    markSeen();
    setPhase('open');
  }, []);

  const isOpen = phase === 'open';

  return (
    <main className="relative min-h-[100dvh] w-full overflow-x-hidden">
      <div className="page-paper fixed inset-0 -z-10" aria-hidden="true" />
      <div className="relative px-4 pb-20 pt-[calc(72px+env(safe-area-inset-top))]">
        <InvitationCard ref={cardRef} revealed={revealed} hidden={!isOpen} startVisible={returning} instant={instant} />
        {isOpen && (
          <p className="label fade-in-late mt-14 text-center text-[11px] text-[#3F4A42]">
            Pratistha &amp; Sandeep · 27.12.2026
          </p>
        )}
      </div>

      {!isOpen && (
        <EnvelopeIntro
          key={introKey}
          soundRef={soundRef}
          cardRef={cardRef}
          onReveal={onReveal}
          onDone={onDone}
        />
      )}

      {/* Corner controls */}
      <div className="fixed right-3 top-[calc(12px+env(safe-area-inset-top))] z-50 flex items-center gap-2">
        {isOpen && nearTop && (
          <button
            type="button"
            onClick={replay}
            aria-label="Replay the envelope opening"
            className="label fade-in-late inline-flex h-11 items-center justify-center gap-2 rounded-full px-4 text-[11px] border border-[#C5A059]/45 bg-[#FAF6F0]/75 text-[#4E4639] backdrop-blur-md transition active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F6D31]"
          >
            <RotateCcw className="h-[15px] w-[15px]" aria-hidden="true" />
            <span>Replay</span>
          </button>
        )}
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? 'Play music' : 'Mute music'}
          aria-pressed={!muted}
          title={muted ? 'Sound off' : 'Sound on'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#C5A059]/45 bg-[#FAF6F0]/75 text-[#4E4639] backdrop-blur-md transition active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F6D31]"
        >
          {muted ? <VolumeX className="h-[17px] w-[17px]" aria-hidden="true" /> : <Volume2 className="h-[17px] w-[17px]" aria-hidden="true" />}
        </button>
      </div>
    </main>
  );
}
