/**
 * Soundscape for the invitation.
 *
 *  - Music: a public-domain recording of Satie's Gymnopédie No. 1
 *    (Robin Alciatore / Musopen, via Wikimedia Commons). Routed through a
 *    Web Audio gain node, because iOS ignores HTMLMediaElement.volume and we
 *    need smooth fades that follow the story (hush → swell → settle).
 *  - Foley: wax press, wax crack, paper flap rustle and card slide, all
 *    synthesized from filtered noise so there are no extra assets to load.
 *
 * Every method is defensive: if audio is unavailable or blocked, the page
 * simply stays silent.
 */

const MUSIC_SRC = '/audio/gymnopedie-no1.mp3';
const SILENT = 0.0001;

const LEVELS = {
  hush: 0.14, // music under the seal / flap moment
  full: 0.62, // music once the letter is out
  sfx: 0.9,
};

export function createSoundscape() {
  let ctx = null;
  let master = null;
  let musicGain = null;
  let sfxBus = null;
  let noise = null;
  let muted = false;
  let started = false;

  // iOS 16.4+: treat this as media playback so the ring/silent switch
  // doesn't mute the music (Web Audio is "ambient" by default).
  try {
    if (typeof navigator !== 'undefined' && navigator.audioSession) {
      navigator.audioSession.type = 'playback';
    }
  } catch {
    /* unsupported */
  }

  // Start fetching the track immediately so it is ready by the time of the tap.
  const music = typeof Audio !== 'undefined' ? new Audio() : null;
  if (music) {
    music.src = MUSIC_SRC;
    music.loop = true;
    music.preload = 'auto';
    music.crossOrigin = 'anonymous';
    music.setAttribute('playsinline', '');
  }

  function ensureContext() {
    if (ctx) return ctx;
    const Ctor = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
    if (!Ctor) return null;
    try {
      ctx = new Ctor();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 1;
      master.connect(ctx.destination);

      musicGain = ctx.createGain();
      musicGain.gain.value = SILENT;
      musicGain.connect(master);
      if (music) ctx.createMediaElementSource(music).connect(musicGain);

      // Foley bus: a dry path plus a short, soft room so paper sounds feel
      // like they happen in a quiet space rather than inside the speaker.
      sfxBus = ctx.createGain();
      sfxBus.gain.value = LEVELS.sfx;
      const reverb = ctx.createConvolver();
      reverb.buffer = makeImpulse(ctx, 0.9, 3.2);
      const wet = ctx.createGain();
      wet.gain.value = 0.22;
      sfxBus.connect(master);
      sfxBus.connect(reverb);
      reverb.connect(wet);
      wet.connect(master);

      noise = makeNoise(ctx, 2.5);
    } catch {
      ctx = null;
    }
    return ctx;
  }

  /** Must be called inside a user gesture (the seal tap or the sound button). */
  function unlock() {
    started = true;
    const c = ensureContext();
    try {
      if (c && c.state === 'suspended') c.resume();
    } catch {
      /* ignore */
    }
    try {
      const p = music?.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    } catch {
      /* ignore */
    }
  }

  function rampMusic(target, seconds) {
    if (!ctx || !musicGain) return;
    try {
      const now = ctx.currentTime;
      const g = musicGain.gain;
      g.cancelScheduledValues(now);
      g.setValueAtTime(Math.max(g.value, SILENT), now);
      // An exponential curve sounds like a natural swell to the ear.
      g.exponentialRampToValueAtTime(Math.max(target, SILENT), now + seconds);
    } catch {
      /* ignore */
    }
  }

  // ---------------------------------------------------------------- foley --

  function noiseVoice({ at = 0, dur, filters, envelope, gain = 1 }) {
    if (!ctx || !noise) return;
    try {
      const t = ctx.currentTime + at;
      const src = ctx.createBufferSource();
      src.buffer = noise;
      src.loop = true;
      // Random start so repeated sounds are never identical.
      const offset = Math.random() * (noise.duration - 0.1);

      let node = src;
      filters.forEach((f) => {
        const biquad = ctx.createBiquadFilter();
        biquad.type = f.type;
        biquad.Q.value = f.Q ?? 0.7;
        if (typeof f.freq === 'number') biquad.frequency.setValueAtTime(f.freq, t);
        else f.freq(biquad.frequency, t, dur);
        node.connect(biquad);
        node = biquad;
      });

      const amp = ctx.createGain();
      amp.gain.setValueAtTime(SILENT, t);
      envelope(amp.gain, t, dur, gain);
      node.connect(amp);
      amp.connect(sfxBus);

      src.start(t, offset);
      src.stop(t + dur + 0.1);
    } catch {
      /* a single failed voice never breaks the page */
    }
  }

  function thump({ at = 0, from = 150, to = 55, dur = 0.16, gain = 0.35 }) {
    if (!ctx) return;
    try {
      const t = ctx.currentTime + at;
      const osc = ctx.createOscillator();
      const amp = ctx.createGain();
      osc.frequency.setValueAtTime(from, t);
      osc.frequency.exponentialRampToValueAtTime(to, t + dur);
      amp.gain.setValueAtTime(SILENT, t);
      amp.gain.linearRampToValueAtTime(gain, t + 0.006);
      amp.gain.exponentialRampToValueAtTime(SILENT, t + dur);
      osc.connect(amp);
      amp.connect(sfxBus);
      osc.start(t);
      osc.stop(t + dur + 0.05);
    } catch {
      /* ignore */
    }
  }

  const sharp = (g, t, dur, peak) => {
    g.linearRampToValueAtTime(peak, t + 0.002);
    g.exponentialRampToValueAtTime(SILENT, t + dur);
  };

  /** Finger pressing into soft wax. */
  function press() {
    thump({ from: 120, to: 50, dur: 0.14, gain: 0.28 });
    noiseVoice({
      dur: 0.05,
      filters: [{ type: 'lowpass', freq: 1400 }],
      envelope: sharp,
      gain: 0.12,
    });
  }

  /** The seal snapping: a few dry, brittle crackles and a low knock. */
  function crack() {
    thump({ from: 180, to: 60, dur: 0.12, gain: 0.3 });
    [
      { at: 0, freq: 3200, dur: 0.035, gain: 0.55 },
      { at: 0.028, freq: 4600, dur: 0.022, gain: 0.32 },
      { at: 0.07, freq: 2400, dur: 0.045, gain: 0.38 },
      { at: 0.13, freq: 3800, dur: 0.02, gain: 0.16 },
    ].forEach((c) =>
      noiseVoice({
        at: c.at,
        dur: c.dur,
        filters: [{ type: 'bandpass', freq: c.freq, Q: 1.4 }],
        envelope: sharp,
        gain: c.gain,
      })
    );
  }

  /** Stiff paper flap peeling open: crinkly, band-limited, slowly brightening. */
  function rustle(dur = 1.5) {
    noiseVoice({
      dur,
      filters: [
        { type: 'highpass', freq: 500 },
        {
          type: 'bandpass',
          Q: 0.9,
          freq: (p, t, d) => {
            p.setValueAtTime(900, t);
            p.linearRampToValueAtTime(2600, t + d * 0.45);
            p.linearRampToValueAtTime(1500, t + d);
          },
        },
      ],
      envelope: (g, t, d, peak) => {
        // Crinkle: many tiny random amplitude steps over a smooth arc.
        const steps = Math.floor(d / 0.028);
        for (let i = 0; i <= steps; i += 1) {
          const p = i / steps;
          const arc = Math.sin(Math.PI * Math.min(1, p * 1.15)) ** 1.4;
          const grain = 0.45 + Math.random() * 0.55;
          g.linearRampToValueAtTime(Math.max(SILENT, peak * arc * grain), t + p * d);
        }
        g.linearRampToValueAtTime(SILENT, t + d + 0.05);
      },
      gain: 0.16,
    });
  }

  /** Card sliding against the envelope lining: soft, smooth friction. */
  function slide(dur = 2) {
    noiseVoice({
      dur,
      filters: [
        { type: 'highpass', freq: 260 },
        {
          type: 'lowpass',
          Q: 0.5,
          freq: (p, t, d) => {
            p.setValueAtTime(900, t);
            p.linearRampToValueAtTime(2200, t + d * 0.6);
            p.linearRampToValueAtTime(1200, t + d);
          },
        },
      ],
      envelope: (g, t, d, peak) => {
        const steps = Math.floor(d / 0.05);
        for (let i = 0; i <= steps; i += 1) {
          const p = i / steps;
          const arc = Math.sin(Math.PI * p) ** 0.8;
          const wobble = 0.85 + Math.random() * 0.15;
          g.linearRampToValueAtTime(Math.max(SILENT, peak * arc * wobble), t + p * d);
        }
      },
      gain: 0.1,
    });
  }

  /** Card landing / unfolding: a soft paper tap. */
  function settle() {
    thump({ from: 110, to: 70, dur: 0.12, gain: 0.12 });
    noiseVoice({
      dur: 0.25,
      filters: [{ type: 'bandpass', freq: 1300, Q: 0.8 }],
      envelope: (g, t, d, peak) => {
        g.linearRampToValueAtTime(peak, t + 0.01);
        g.exponentialRampToValueAtTime(SILENT, t + d);
      },
      gain: 0.12,
    });
  }

  // ------------------------------------------------------------- controls --

  function setMuted(value) {
    muted = value;
    if (!ctx || !master) return;
    try {
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(value ? 0 : 1, now + (value ? 0.35 : 0.8));
    } catch {
      /* ignore */
    }
  }

  function dispose() {
    try {
      music?.pause();
      ctx?.close();
    } catch {
      /* ignore */
    }
    ctx = null;
  }

  return {
    unlock,
    hush: (s = 2) => rampMusic(LEVELS.hush, s),
    swell: (s = 4) => rampMusic(LEVELS.full, s),
    press,
    crack,
    rustle,
    slide,
    settle,
    setMuted,
    isMuted: () => muted,
    hasStarted: () => started,
    dispose,
  };
}

function makeNoise(ctx, seconds) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  // Slightly pinked noise: paper sounds less hissy than pure white noise.
  let last = 0;
  for (let i = 0; i < len; i += 1) {
    const white = Math.random() * 2 - 1;
    last = 0.97 * last + 0.03 * white;
    data[i] = white * 0.6 + last * 3;
  }
  return buf;
}

function makeImpulse(ctx, seconds, decay) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch += 1) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i += 1) {
      d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** decay;
    }
  }
  return buf;
}
