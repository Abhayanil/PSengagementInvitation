/**
 * A gentle, generative ambient score built entirely with the Web Audio API.
 *
 * There is no external audio asset — every voice is synthesized with soft
 * sine/triangle oscillators, slow attacks and long releases, then rolled off
 * with a low-pass filter so nothing feels harsh. The progression is a warm
 * Cmaj7 → Am7 → Fmaj7 → G loop with a sparse arpeggio and a low pad.
 *
 * All methods are defensive: if audio is unsupported or playback is blocked
 * by the browser's autoplay policy, they simply stay silent instead of
 * throwing or logging errors.
 */

const CHORDS = [
  { root: 130.81, notes: [261.63, 329.63, 392.0, 493.88] }, // Cmaj7
  { root: 110.0, notes: [220.0, 261.63, 329.63, 392.0] }, // Am7
  { root: 87.31, notes: [174.61, 220.0, 261.63, 329.63] }, // Fmaj7
  { root: 98.0, notes: [196.0, 246.94, 293.66, 392.0] }, // G
];

const CHORD_SECONDS = 4;
const ARP_OFFSETS = [0, 0.85, 1.7, 2.55];
const TARGET_VOLUME = 0.42;
const SILENT = 0.0001;

export function createAmbientTheme() {
  let ctx = null;
  let master = null;
  let timer = null;
  let running = false;
  let muted = false;
  let nextChordTime = 0;
  let chordIndex = 0;

  const isSupported = () =>
    typeof window !== 'undefined' &&
    Boolean(window.AudioContext || window.webkitAudioContext);

  function ensureContext() {
    if (ctx || !isSupported()) return ctx;
    try {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      ctx = new AudioCtor();
      master = ctx.createGain();
      master.gain.value = 0;

      const softener = ctx.createBiquadFilter();
      softener.type = 'lowpass';
      softener.frequency.value = 2400;
      softener.Q.value = 0.3;

      master.connect(softener);
      softener.connect(ctx.destination);
    } catch {
      ctx = null;
      master = null;
    }
    return ctx;
  }

  function voice({
    freq,
    at,
    dur,
    peak,
    type = 'sine',
    attack = 0.05,
    release = 1.2,
    detune = 0,
  }) {
    if (!ctx || !master) return;
    try {
      const start = Math.max(at, ctx.currentTime);
      const end = start + Math.max(dur, attack) + release;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, start);
      if (detune) osc.detune.setValueAtTime(detune, start);

      gain.gain.setValueAtTime(SILENT, start);
      gain.gain.linearRampToValueAtTime(peak, start + attack);
      gain.gain.exponentialRampToValueAtTime(SILENT, end);

      osc.connect(gain);
      gain.connect(master);
      osc.start(start);
      osc.stop(end + 0.05);
    } catch {
      /* A single failed voice should never break the soundscape. */
    }
  }

  function scheduleChord(at, index) {
    const chord = CHORDS[index % CHORDS.length];

    // Warm sustained pad, quietly detuned for width.
    chord.notes.forEach((freq, i) => {
      voice({
        freq: freq / 2,
        at,
        dur: 3.2,
        peak: 0.022,
        attack: 1.1,
        release: 2.4,
        detune: i % 2 ? 3 : -3,
      });
    });

    // Soft low root.
    voice({
      freq: chord.root / 2,
      at,
      dur: 2.6,
      peak: 0.032,
      attack: 0.5,
      release: 1.8,
    });

    // Sparse, plucked arpeggio.
    ARP_OFFSETS.forEach((offset, step) => {
      const note = chord.notes[(step + 1) % chord.notes.length];
      voice({
        freq: note,
        at: at + offset,
        dur: 0.8,
        peak: 0.05,
        attack: 0.02,
        release: 1.8,
        type: 'triangle',
      });
      if (step === 2) {
        voice({
          freq: note * 2,
          at: at + offset,
          dur: 0.6,
          peak: 0.016,
          attack: 0.03,
          release: 1.4,
        });
      }
    });
  }

  function scheduler() {
    if (!ctx) return;
    try {
      while (nextChordTime < ctx.currentTime + 1.2) {
        scheduleChord(nextChordTime, chordIndex);
        chordIndex += 1;
        nextChordTime += CHORD_SECONDS;
      }
    } catch {
      /* keep the page resilient no matter what */
    }
  }

  function startScheduler() {
    if (running || !ctx) return;
    running = true;
    nextChordTime = ctx.currentTime + 0.15;
    scheduler();
    timer = window.setInterval(scheduler, 500);
  }

  async function play() {
    const context = ensureContext();
    if (!context) return false;

    try {
      if (context.state === 'suspended') await context.resume();
    } catch {
      // Autoplay was blocked: remain silent rather than erroring.
    }

    startScheduler();
    muted = false;

    try {
      const now = context.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(Math.max(master.gain.value, SILENT), now);
      master.gain.linearRampToValueAtTime(TARGET_VOLUME, now + 1.5);
    } catch {
      /* ignore */
    }
    return true;
  }

  function setMuted(value) {
    muted = value;
    if (!ctx || !master) return;
    try {
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(Math.max(master.gain.value, SILENT), now);
      master.gain.linearRampToValueAtTime(
        value ? SILENT : TARGET_VOLUME,
        now + (value ? 0.4 : 1.0)
      );
    } catch {
      /* ignore */
    }
  }

  function toggle() {
    const next = !muted;
    setMuted(next);
    if (!next) {
      play().catch(() => {});
    }
    return next;
  }

  function dispose() {
    if (timer) clearInterval(timer);
    timer = null;
    running = false;
    try {
      ctx?.close();
    } catch {
      /* ignore */
    }
    ctx = null;
    master = null;
  }

  return {
    play,
    setMuted,
    toggle,
    dispose,
    isMuted: () => muted,
    isSupported,
  };
}
