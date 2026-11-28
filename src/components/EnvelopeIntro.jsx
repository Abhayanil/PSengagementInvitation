import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';
import WaxSeal from './WaxSeal';

/**
 * The closed envelope and the whole opening choreography (~7.5s):
 *
 *   0.0s  seal pressed (wax thump)                header + prompt fade away
 *   0.2s  seal cracks in two and falls (crackle)  envelope settles lower
 *   1.1s  flap peels open slowly (paper rustle)   gold lining is revealed
 *   3.2s  pause — anticipation
 *   3.5s  letter slides up out of the pocket      piano swells
 *   5.9s  envelope sinks away, letter glides up into place
 *   7.2s  letter unfolds into the full invitation
 *
 * Tapping anywhere while it plays skips straight to the invitation.
 */

const touchDevice =
  typeof window !== 'undefined' && window.matchMedia?.('(hover: none) and (pointer: coarse)').matches;

const EASE = {
  press: [0.3, 0, 0.2, 1],
  fall: [0.45, 0, 0.8, 0.5],
  flapUp: [0.42, 0, 0.7, 0.9],
  flapDown: [0.15, 0.35, 0.25, 1],
  rise: [0.33, 0, 0.12, 1],
  glide: [0.65, 0, 0.3, 1],
  sink: [0.55, 0, 0.85, 0.25],
};

export default function EnvelopeIntro({ soundRef, cardRef, onReveal, onDone }) {
  const [phase, setPhase] = useState('idle'); // idle | opening
  const refs = {
    overlay: useRef(null),
    bg: useRef(null),
    header: useRef(null),
    prompt: useRef(null),
    skip: useRef(null),
    float: useRef(null),
    lift: useRef(null),
    back: useRef(null),
    flap: useRef(null),
    letter: useRef(null),
    front: useRef(null),
    floral: useRef(null),
    seal: useRef(null),
    halfL: useRef(null),
    halfR: useRef(null),
  };

  const skipping = useRef(false);
  const live = useRef(new Set());
  const states = useRef(new WeakMap());
  const wakers = useRef(new Set());

  useEffect(
    () => () => {
      live.current.forEach((a) => a.stop?.());
    },
    []
  );

  // Keyboard users can skip too.
  useEffect(() => {
    if (phase !== 'opening') return undefined;
    const onKey = (e) => {
      if (['Escape', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        skip();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  /*
   * Tween helper. Framer Motion's animate(element) silently makes transforms
   * instant when the phone has "reduce motion" on, which killed the whole
   * opening on many phones. Animating a plain 0→1 number has no such rule,
   * so we drive the element styles ourselves from its progress.
   */
  const stateOf = (el) => {
    let st = states.current.get(el);
    if (!st) {
      const o = parseFloat(getComputedStyle(el).opacity);
      st = { x: 0, y: 0, rotate: 0, rotateX: 0, scale: 1, opacity: Number.isNaN(o) ? 1 : o, clipBottom: null };
      states.current.set(el, st);
    }
    return st;
  };
  const paint = (el, st) => {
    el.style.transform = `translate3d(${st.x}px, ${st.y}px, 0) rotate(${st.rotate}deg) rotateX(${st.rotateX}deg) scale(${st.scale})`;
    el.style.opacity = String(st.opacity);
    if (st.clipBottom != null) el.style.clipPath = `inset(0px 0px ${st.clipBottom}px 0px round 6px)`;
  };

  const A = (el, target, options = {}) => {
    if (!el) return Promise.resolve();
    const st = stateOf(el);
    const from = {};
    const to = {};
    Object.entries(target).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        [from[k], to[k]] = v;
      } else {
        from[k] = st[k] ?? 0;
        to[k] = v;
      }
    });
    const step = (t) => {
      Object.keys(to).forEach((k) => {
        st[k] = from[k] + (to[k] - from[k]) * t;
      });
      paint(el, st);
    };
    if (skipping.current) {
      step(1);
      return Promise.resolve();
    }
    step(0);
    const { duration = 0.3, delay = 0, ease = 'easeInOut' } = options;
    const controls = animate(0, 1, { duration, delay, ease, onUpdate: step });
    live.current.add(controls);
    return Promise.resolve(controls).then(() => {
      live.current.delete(controls);
      step(1);
    });
  };

  const wait = (ms) =>
    skipping.current
      ? Promise.resolve()
      : new Promise((resolve) => {
          const done = () => {
            clearTimeout(id);
            wakers.current.delete(done);
            resolve();
          };
          const id = setTimeout(done, ms);
          wakers.current.add(done);
        });

  const sfx = (fn) => {
    if (!skipping.current) fn();
  };

  const skip = () => {
    if (skipping.current) return;
    skipping.current = true;
    live.current.forEach((a) => a.complete?.());
    wakers.current.forEach((w) => w());
    soundRef.current?.swell(1.5);
  };

  const open = async () => {
    if (phase !== 'idle') return;
    setPhase('opening');
    const sound = soundRef.current;
    sound?.unlock();

    const r = Object.fromEntries(Object.entries(refs).map(([k, v]) => [k, v.current]));
    // Note: the opening plays even with "reduce motion" on — it only starts when the
    // guest taps, can be skipped any time, and is the heart of the invitation.
    // Ambient looping motion (float, seal halo) stays off for those users via CSS.

    r.float?.classList.remove('idle-float');
    sound?.hush(2.5);

    // 1 — press the seal
    sfx(() => sound?.press());
    A(r.header, { opacity: 0, y: -14 }, { duration: 0.7, ease: 'easeOut' });
    A(r.prompt, { opacity: 0, y: 8 }, { duration: 0.5, ease: 'easeOut' });
    await A(r.seal, { scale: 0.9 }, { duration: 0.2, ease: EASE.press });
    await wait(60);

    // 2 — the seal cracks and falls away
    sfx(() => sound?.crack());
    r.seal.style.opacity = '0';
    r.halfL.style.opacity = '1';
    r.halfR.style.opacity = '1';
    A(r.halfL, { x: -26, y: 120, rotate: -42, opacity: 0 }, { duration: 1.0, ease: EASE.fall });
    A(r.halfR, { x: 22, y: 136, rotate: 34, opacity: 0 }, { duration: 1.1, ease: EASE.fall });
    A(r.lift, { y: liftFor(r.lift) }, { duration: 2.4, ease: [0.4, 0, 0.2, 1] });
    A(r.skip, { opacity: 1 }, { duration: 0.8, delay: 1.2 });
    await wait(650);

    // 3 — the flap peels open: slow to unstick, then swings over
    sfx(() => sound?.rustle(1.75));
    await A(r.flap, { rotateX: 92 }, { duration: 0.95, ease: EASE.flapUp });
    r.flap.style.zIndex = '0';
    await A(r.flap, { rotateX: 180 }, { duration: 0.95, ease: EASE.flapDown });

    // 4 — a breath of anticipation
    await wait(380);

    // 5 — the letter slides out of the pocket
    const riseY = -(r.letter.offsetTop + r.letter.offsetHeight * 0.74);
    sound?.swell(5);
    sfx(() => sound?.slide(2.3));
    await A(r.letter, { y: riseY }, { duration: 2.4, ease: EASE.rise });
    await wait(450);

    // 6 — envelope sinks away, letter glides to where the card lives
    const card = cardRef.current;
    const from = r.letter.getBoundingClientRect();
    const to = card.getBoundingClientRect();
    const scale = to.width / from.width;
    const sinkBy = window.innerHeight * 0.9;

    A(r.skip, { opacity: 0 }, { duration: 0.3 });
    A(r.bg, { opacity: 0 }, { duration: 1.4, ease: 'easeInOut' });
    [r.back, r.front, r.floral].forEach((el) =>
      A(el, { y: sinkBy, opacity: 0.0 }, { duration: 1.25, ease: EASE.sink })
    );
    A(r.flap, { y: sinkBy, opacity: 0 }, { duration: 1.2, ease: EASE.sink });
    await A(
      r.letter,
      { x: to.left - from.left, y: riseY + (to.top - from.top), scale },
      { duration: 1.35, ease: EASE.glide }
    );

    // 7 — the letter unfolds into the full invitation
    sfx(() => sound?.settle());
    const letterH = from.height * scale;
    const hidden = Math.max(0, to.height - letterH);
    card.style.clipPath = `inset(0px 0px ${hidden}px 0px round 6px)`;
    stateOf(card).clipBottom = hidden;
    onReveal?.();
    A(r.letter, { opacity: 0 }, { duration: 0.5, ease: 'easeOut' });
    await Promise.all([
      A(card, { opacity: [0, 1] }, { duration: 0.5, ease: 'easeOut' }),
      A(card, { clipBottom: [hidden, 0] }, { duration: 1.5, ease: EASE.glide, delay: 0.15 }),
    ]);
    card.style.clipPath = '';
    card.style.transform = '';
    onDone?.();
  };

  return (
    <div
      ref={refs.overlay}
      className="fixed inset-0 z-30 flex flex-col items-center justify-center overflow-hidden px-6"
      onPointerDown={phase === 'opening' ? skip : undefined}
    >
      <div ref={refs.bg} className="intro-paper absolute inset-0" aria-hidden="true" />

      {/* Header */}
      <header ref={refs.header} className="relative z-10 mb-10 flex flex-col items-center text-center">
        <p className="label text-[#6E655F]">The engagement of</p>
        <h1 className="mt-3 flex flex-col items-center font-script font-normal leading-[0.82] text-[#8F6D31]">
          <span className="text-[clamp(54px,16vw,66px)]">Pratistha</span>
          <span className="my-0.5 text-[clamp(34px,10vw,42px)] text-[#9A7A3E]" aria-label="and">&amp;</span>
          <span className="text-[clamp(54px,16vw,66px)]">Sandeep</span>
        </h1>
      </header>

      {/* Envelope */}
      <div ref={refs.lift} className="relative z-10 w-[min(84vw,348px)]">
        <div ref={refs.float} className="idle-float">
          <button
            type="button"
            onClick={open}
            disabled={phase !== 'idle'}
            aria-label="Open the invitation"
            className="group relative block w-full cursor-pointer rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#8F6D31] focus-visible:ring-offset-8 focus-visible:ring-offset-[#FAF6F0] disabled:cursor-default"
          >
            <Envelope refs={refs} opening={phase !== 'idle'} />
          </button>
        </div>
      </div>

      {/* Prompt */}
      <div ref={refs.prompt} className="relative z-10 mt-10 flex flex-col items-center gap-2 text-center">
        <p className="breathe font-serif text-[19px] italic text-[#4E4639]">Tap the seal to open</p>
        <p className="label text-[11px] text-[#5E5650]">Best with sound on</p>
      </div>

      {/* Skip hint */}
      <p
        ref={refs.skip}
        className="label pointer-events-none absolute bottom-[max(24px,env(safe-area-inset-bottom))] z-10 text-[11px] text-[#5E5650]"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        {touchDevice ? 'Tap anywhere to skip' : 'Click or press Esc to skip'}
      </p>
    </div>
  );
}

/** How far the envelope settles downward so the rising letter has room above it. */
function liftFor(el) {
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  const desiredTop = window.innerHeight * 0.5 - rect.height * 0.05;
  return Math.max(0, Math.min(140, desiredTop - rect.top));
}

/* ------------------------------------------------------------------------ */

function Envelope({ refs, opening }) {
  return (
    <div className="relative aspect-[10/7] w-full" style={{ perspective: '1100px' }}>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="env-inside" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#97A89C" />
            <stop offset="55%" stopColor="#B3C2B7" />
            <stop offset="100%" stopColor="#C2CFC5" />
          </linearGradient>
          <linearGradient id="env-left" x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0%" stopColor="#C3D0C6" />
            <stop offset="100%" stopColor="#CFDBD2" />
          </linearGradient>
          <linearGradient id="env-right" x1="1" y1="0" x2="0" y2="0.4">
            <stop offset="0%" stopColor="#BAC8BD" />
            <stop offset="100%" stopColor="#C8D5CB" />
          </linearGradient>
          <linearGradient id="env-bottom" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#C6D3C9" />
            <stop offset="100%" stopColor="#D5E1D8" />
          </linearGradient>
          <linearGradient id="env-flap" x1="0.3" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor="#D3DFD6" />
            <stop offset="100%" stopColor="#C5D2C8" />
          </linearGradient>
          <linearGradient id="env-liner" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E8CF97" />
            <stop offset="45%" stopColor="#CBA765" />
            <stop offset="100%" stopColor="#A8843F" />
          </linearGradient>
          <pattern id="env-liner-pattern" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="10" stroke="#FFF4D6" strokeOpacity="0.28" strokeWidth="1" />
          </pattern>
          <filter id="env-fold-shadow" x="-10%" y="-20%" width="120%" height="140%">
            <feDropShadow dx="0" dy="-1.5" stdDeviation="2.2" floodColor="#2F3D33" floodOpacity="0.16" />
          </filter>
          <filter id="env-flap-shadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor="#2F3D33" floodOpacity="0.22" />
          </filter>
          <filter id="env-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="4" />
            <feColorMatrix values="0 0 0 0 0.2  0 0 0 0 0.24  0 0 0 0 0.21  0 0 0 0.09 0" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* Inside of the envelope (only seen through the opening) */}
      <div ref={refs.back} className="envelope-shadow absolute inset-0 rounded-[3px]" style={{ zIndex: 1 }} aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 340 238" preserveAspectRatio="none">
        <rect width="340" height="238" rx="3" fill="url(#env-inside)" />
        <rect width="340" height="238" rx="3" fill="#fff" filter="url(#env-grain)" />
      </svg>
      </div>

      {/* The letter, tucked inside */}
      <div
        ref={refs.letter}
        className="card-paper letter-shadow absolute left-[5%] top-[5%] h-[88%] w-[90%] rounded-[4px]"
        style={{ zIndex: 2, transformOrigin: '0 0', willChange: 'transform, opacity' }}
        aria-hidden="true"
      >
        <div className="absolute inset-[7px] rounded-[2px] border border-[#C5A059]/50" />
        <div className="absolute inset-[10px] rounded-[1px] border border-[#C5A059]/20" />
        <div className="absolute inset-x-0 top-[9%] flex flex-col items-center px-5 text-center">
          <span className="label text-[9px] text-[#5E5650]">You’re invited</span>
          <span className="mt-1.5 font-serif text-[14px] italic leading-none text-[#4E4639]">to our</span>
          <span className="mt-0.5 font-script text-[clamp(30px,9.4vw,38px)] leading-[1.05] text-[#8F6D31]">
            Engagement Ceremony
          </span>
          <span className="mt-1 h-px w-10 bg-[#C5A059]/60" />
          <span className="mt-2 font-serif text-[13px] italic leading-none text-[#4E4639]">with love,</span>
          <span className="mt-0.5 font-script text-[28px] leading-[1.1] text-[#8F6D31]">
            P <span className="text-[#9A7A3E]">&amp;</span> S
          </span>
        </div>
      </div>

      {/* Front folds (left, right, bottom) — the pocket */}
      <div ref={refs.front} className="absolute inset-0" style={{ zIndex: 3 }} aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 340 238" preserveAspectRatio="none">
        <path d="M0 0 L163 124 Q170 130 163 136 L0 238 Z" fill="url(#env-left)" />
        <path d="M340 0 L177 124 Q170 130 177 136 L340 238 Z" fill="url(#env-right)" />
        <path d="M0 238 L160 120 Q170 112 180 120 L340 238 Z" fill="url(#env-bottom)" filter="url(#env-fold-shadow)" />
        <path d="M2 236 L160 120 Q170 112 180 120 L338 236" fill="none" stroke="#EEF7F0" strokeOpacity="0.7" strokeWidth="0.8" />
        <path d="M0 0 L163 124 Q170 130 163 136 L0 238 Z M340 0 L177 124 Q170 130 177 136 L340 238 Z M0 238 L160 120 Q170 112 180 120 L340 238 Z" fill="#fff" filter="url(#env-grain)" />
      </svg>
      </div>

      {/* Top flap: hinged at the top edge, outside face + gold-lined inside face */}
      <div
        ref={refs.flap}
        className="absolute left-0 top-0 h-[63%] w-full"
        style={{ zIndex: 4, transformOrigin: '50% 0%', transformStyle: 'preserve-3d', willChange: 'transform' }}
        aria-hidden="true"
      >
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 340 150" preserveAspectRatio="none" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
          <path d="M0 0 H340 L183 139 Q170 150 157 139 Z" fill="url(#env-flap)" filter="url(#env-flap-shadow)" />
          <path d="M1 1 L157 139 Q170 150 183 139 L339 1" fill="none" stroke="#EEF7F0" strokeOpacity="0.75" strokeWidth="0.8" />
          <path d="M0 0 H340 L183 139 Q170 150 157 139 Z" fill="#fff" filter="url(#env-grain)" />
        </svg>
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 340 150"
          preserveAspectRatio="none"
          style={{ transform: 'rotateX(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <g transform="translate(0 150) scale(1 -1)">
            <path d="M0 0 H340 L183 139 Q170 150 157 139 Z" fill="#C8D5CB" />
            <path d="M14 0 H326 L181 128 Q170 137 159 128 Z" fill="url(#env-liner)" />
            <path d="M14 0 H326 L181 128 Q170 137 159 128 Z" fill="url(#env-liner-pattern)" />
            <path d="M14 0 L159 128 Q170 137 181 128 L326 0" fill="none" stroke="#8F6D31" strokeOpacity="0.35" strokeWidth="0.8" />
          </g>
        </svg>
      </div>

      {/* Botanical spray tucked on the pocket */}
      <img
        ref={refs.floral}
        src="/stitch-floral.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-7 -right-7 w-[40%] -rotate-12 select-none"
        style={{ zIndex: 6 }}
        draggable="false"
      />

      {/* Wax seal at the flap tip (+ two halves for the crack) */}
      <div className="absolute left-1/2 top-[61%] h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 7 }}>
        {!opening && <span className="seal-halo absolute inset-0 rounded-full border border-[#C5A059]/70" aria-hidden="true" />}
        <div ref={refs.seal} className="seal-shadow absolute inset-0">
          <WaxSeal idPrefix="seal-whole" className="h-full w-full" />
        </div>
        <div ref={refs.halfL} className="seal-shadow absolute inset-0" style={{ opacity: 0 }} aria-hidden="true">
          <div className="h-full w-full" style={{ clipPath: 'polygon(0 0, 53% 0, 47% 18%, 56% 37%, 45% 55%, 54% 74%, 48% 100%, 0 100%)' }}>
            <WaxSeal idPrefix="seal-l" className="h-full w-full" />
          </div>
        </div>
        <div ref={refs.halfR} className="seal-shadow absolute inset-0" style={{ opacity: 0 }} aria-hidden="true">
          <div className="h-full w-full" style={{ clipPath: 'polygon(53% 0, 100% 0, 100% 100%, 48% 100%, 54% 74%, 45% 55%, 56% 37%, 47% 18%)' }}>
            <WaxSeal idPrefix="seal-r" className="h-full w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}