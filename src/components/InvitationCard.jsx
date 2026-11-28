import React, { forwardRef, useState } from 'react';
import { CalendarPlus, MapPin } from 'lucide-react';
import { EVENT, googleCalendarUrl } from '../eventDetails';
import coupleArtwork from '../Actual Couple.webp';

const isAndroid = typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent);

/** Staggered reveal index for each block, top to bottom. */
const r = (i) => ({ className: 'reveal', style: { '--i': i } });

const InvitationCard = forwardRef(function InvitationCard({ revealed, hidden, startVisible, instant }, ref) {
  const [opening, setOpening] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Android → Google Calendar; iPhone/desktop → .ics (iOS opens it straight in Calendar).
  const primaryCal = isAndroid
    ? { href: googleCalendarUrl(), target: '_blank', rel: 'noopener noreferrer' }
    : { href: EVENT.icsPath };
  const altCal = isAndroid
    ? { href: EVENT.icsPath, label: 'Use another calendar app' }
    : { href: googleCalendarUrl(), target: '_blank', rel: 'noopener noreferrer', label: 'Use Google Calendar instead' };

  const onCalendar = () => {
    setOpening(true);
    window.setTimeout(() => setOpening(false), 4000);
  };

  return (
    <div className={`relative mx-auto w-[min(92vw,400px)] ${revealed ? 'is-revealed' : ''} ${instant ? 'reveal-instant' : ''}`} aria-hidden={hidden || undefined} inert={hidden ? '' : undefined}>
      <article
        ref={ref}
        className="card-paper card-shadow relative rounded-[6px]"
        style={{ opacity: startVisible ? 1 : 0 }}
        aria-label="Engagement invitation"
      >
        {/* Double hairline gold frame */}
        <div className="pointer-events-none absolute inset-[9px] rounded-[3px] border border-[#C5A059]/55" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-[13px] rounded-[2px] border border-[#C5A059]/20" aria-hidden="true" />

        <div className="relative flex flex-col items-center px-7 pb-11 pt-12 text-center">
          <p {...r(0)} className="label reveal text-[#6E655F]">
            Together with their families
          </p>

          {/* Arched portrait */}
          <div {...r(1)} className="reveal mt-7 w-[64%]">
            <div className="rounded-t-full border border-[#C5A059]/60 p-[5px]">
              <div className="aspect-[382/500] overflow-hidden rounded-t-full bg-[#F2EBDF]">
                {!imgError ? (
                  <img
                    src={coupleArtwork}
                    alt="Watercolor illustration of Pratistha and Sandeep beneath a white-and-sage floral arch"
                    width="896"
                    height="1200"
                    className="h-full w-full object-cover object-top"
                    onError={() => setImgError(true)}
                    draggable="false"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center font-serif text-4xl italic text-[#8F6D31]">P &amp; S</div>
                )}
              </div>
            </div>
          </div>

          {/* Names */}
          <h1 className="mt-8 flex flex-col items-center">
            <span {...r(2)} className="reveal font-script text-[64px] font-normal leading-[0.9] text-[#8F6D31]">
              Pratistha
            </span>
            <span {...r(3)} className="label reveal mt-2.5 text-[12px] text-[#5E5650]">
              Sharma
            </span>
            <span {...r(4)} className="reveal font-script my-0.5 text-[40px] leading-none text-[#9A7A3E]" aria-label="and">
              &amp;
            </span>
            <span {...r(5)} className="reveal font-script text-[64px] font-normal leading-[0.9] text-[#8F6D31]">
              Sandeep
            </span>
            <span {...r(6)} className="label reveal mt-2.5 text-[12px] text-[#5E5650]">
              Sadhasivam
            </span>
          </h1>

          <Ornament {...r(7)} />

          <p {...r(8)} className="reveal max-w-[17em] font-serif text-[19px] italic leading-[1.45] text-[#3D3833] [text-wrap:balance]">
            Two hearts, one journey. Join us as we celebrate our engagement with love and laughter.
          </p>

          {/* Date */}
          <div {...r(9)} className="reveal mt-9 flex flex-col items-center">
            <p className="label text-[12px] text-[#5E5650]">Sunday</p>
            <div className="mt-3 flex items-center gap-4">
              <span className="label w-[100px] border-y border-[#C5A059]/55 py-[7px] text-[12px] text-[#2C2A29]">December</span>
              <span className="font-serif text-[64px] font-medium leading-[0.85] text-[#2C2A29] [font-variant-numeric:lining-nums]">27</span>
              <span className="label w-[100px] border-y border-[#C5A059]/55 py-[7px] text-[12px] text-[#2C2A29]">2026</span>
            </div>
            <p className="mt-4 font-serif text-[22px] font-medium leading-none text-[#2C2A29] [font-variant-numeric:lining-nums]">10:00 am – 3:00 pm</p>
          </div>

          {/* Venue */}
          <div {...r(10)} className="reveal mt-7">
            <p className="label text-[12px] text-[#5E5650]">Venue</p>
            <p className="mt-1.5 font-serif text-[26px] leading-tight text-[#2C2A29] [font-variant-numeric:lining-nums]">{EVENT.venueName}</p>
            {EVENT.venueAddress && (
              <p className="mx-auto mt-1 max-w-[16em] font-serif text-[17px] leading-snug text-[#5E5650]">{EVENT.venueAddress}</p>
            )}
          </div>

          {/* Actions */}
          <div {...r(11)} className="reveal mt-8 flex w-full flex-col gap-3">
            <a
              {...primaryCal}
              onClick={onCalendar}
              className="pill label inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#8F6D31] text-[12px] text-[#FFFAF0] shadow-[0_6px_16px_-8px_rgba(80,58,20,0.7)] hover:bg-[#7E5F28] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F6D31]"
            >
              <CalendarPlus className="h-4 w-4" aria-hidden="true" />
              <span>Save the date</span>
            </a>
            <a
              href={EVENT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pill label inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full border border-[#C5A059] text-[12px] text-[#2C2A29] hover:bg-[#F2EADB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F6D31]"
            >
              <MapPin className="h-4 w-4 text-[#8F6D31]" aria-hidden="true" />
              <span>View location</span>
            </a>
            <p className="min-h-[1.5em] font-serif text-[16px] italic text-[#5E5650]" aria-live="polite">
              {opening ? (
                'Opening your calendar…'
              ) : (
                <a
                  href={altCal.href}
                  target={altCal.target}
                  rel={altCal.rel}
                  onClick={onCalendar}
                  className="underline decoration-[#C5A059] underline-offset-4"
                >
                  {altCal.label}
                </a>
              )}
            </p>
          </div>

          <p {...r(12)} className="reveal mt-8 font-serif text-[18px] italic text-[#5E5650]">
            We can’t wait to celebrate with you
          </p>
        </div>
      </article>

      {/* Botanical sprays — outside the article so the unfold clip never crops them */}
      <img
        src="/stitch-floral.webp"
        alt=""
        aria-hidden="true"
        draggable="false"
        className="reveal pointer-events-none absolute -right-9 -top-12 w-[33%] rotate-[8deg] select-none"
        style={{ '--i': 3 }}
      />
      <img
        src="/stitch-floral.webp"
        alt=""
        aria-hidden="true"
        draggable="false"
        className="reveal pointer-events-none absolute -bottom-9 -left-8 w-[34%] rotate-[188deg] select-none"
        style={{ '--i': 12 }}
      />
    </div>
  );
});

function Ornament({ className = '', style }) {
  return (
    <svg viewBox="0 0 160 16" className={`my-7 w-40 ${className}`} style={style} aria-hidden="true">
      <line x1="0" y1="8" x2="64" y2="8" stroke="#C5A059" strokeOpacity="0.7" strokeWidth="0.8" />
      <line x1="96" y1="8" x2="160" y2="8" stroke="#C5A059" strokeOpacity="0.7" strokeWidth="0.8" />
      <path d="M80 2 L86 8 L80 14 L74 8 Z" fill="none" stroke="#9A7A3E" strokeWidth="0.9" />
      <circle cx="68" cy="8" r="1.3" fill="#C5A059" />
      <circle cx="92" cy="8" r="1.3" fill="#C5A059" />
    </svg>
  );
}

export default InvitationCard;
