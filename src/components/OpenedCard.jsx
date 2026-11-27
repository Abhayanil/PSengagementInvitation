import React, { useState } from 'react';
import { downloadEngagementICS } from '../utils/calendarUtils';

/**
 * 1:1 Port of opened_invitation_card/code.html from the Stitch export
 * Exact layout, typography tokens, double hairline gold border, event details, and action buttons.
 */
export default function OpenedCard({ className = '' }) {
  const [dateSaved, setDateSaved] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleOpenMaps = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=7+Sprinkles+Cafe',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleSaveDate = () => {
    downloadEngagementICS();
    setDateSaved(true);
    setTimeout(() => setDateSaved(false), 3000);
  };

  const reveal = (delay) => ({
    className: 'reveal-item',
    style: { '--reveal-delay': `${delay}ms` },
  });

  return (
    <article
      className={`stationery-card-shadow relative z-20 w-full max-w-sm bg-ivory-card rounded-md border border-antique-gold/55 p-gutter-xs select-text ${className}`}
      aria-label="Engagement Invitation Details"
    >
      {/* Delicate Double Hairline Antique Gold Inner Border */}
      <div className="w-full rounded-sm border border-antique-gold/35 px-gutter-md py-gutter-lg flex flex-col items-center text-center gap-gutter-md">
        
        {/* Eyebrow Header */}
        <header {...reveal(650)}>
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
        <div
          {...reveal(750)}
          className="reveal-item w-44 sm:w-48 aspect-[4/5] rounded-sm border border-antique-gold/25 overflow-hidden bg-ivory-card flex items-center justify-center"
        >
          {!imgError ? (
            <img
              src="/couple.png"
              alt="Watercolor illustration of Pratistha and Sandeep beneath a white-and-sage floral arch"
              className="w-full h-full object-cover object-top select-none"
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
          {...reveal(890)}
          data-component-id="card-couple-names"
          data-component-type="typography"
          data-component-variant="display"
          data-design-text-token="script-lg"
          className="reveal-item font-script text-script-lg text-antique-gold-script leading-tight px-1"
        >
          Pratistha Sharma &amp;<br />Sandeep Sadasivam
        </h1>

        {/* Minimal Gold Divider with Center Diamond */}
        <div
          {...reveal(1030)}
          className="reveal-item flex items-center justify-center gap-gutter-sm w-36 select-none"
          aria-hidden="true"
        >
          <span className="h-px flex-1 bg-antique-gold/50" />
          <span className="w-2 h-2 rotate-45 border border-antique-gold bg-ivory-card" />
          <span className="h-px flex-1 bg-antique-gold/50" />
        </div>

        {/* Italicized Quote */}
        <p
          {...reveal(1170)}
          data-component-id="card-quote"
          data-component-type="typography"
          data-component-variant="body"
          data-design-text-token="body-md"
          className="reveal-item font-display text-body-md italic text-dark-charcoal text-pretty max-w-xs"
        >
          &ldquo;Two hearts, one journey. Join us as we celebrate our engagement with love and laughter.&rdquo;
        </p>

        {/* Event Details Block */}
        <section
          {...reveal(1310)}
          className="reveal-item flex flex-col items-center gap-gutter-xs py-gutter-xs"
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
        <div
          {...reveal(1450)}
          className="reveal-item flex items-center justify-center gap-gutter-sm w-full pt-gutter-xs select-none"
        >
          {/* COMPONENT: button-with-icon */}
          <button
            id="view-location-btn"
            type="button"
            data-component-id="button-with-icon"
            data-component-type="button"
            data-component-variant="with-icon"
            onClick={handleOpenMaps}
            className="action-pill inline-flex items-center gap-gutter-xs px-gutter-sm py-gutter-sm rounded-full border border-antique-gold bg-ivory-card text-dark-charcoal font-label text-label-sm uppercase tracking-wider whitespace-nowrap transition-transform duration-seal-press ease-seal-press hover:bg-light-surface-variant active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-antique-gold cursor-pointer"
          >
            <span className="material-symbols-outlined text-antique-gold-script" aria-hidden="true">
              location_on
            </span>
            <span data-design-text-token="label-sm">View Location</span>
          </button>

          {/* COMPONENT: button-with-icon */}
          <button
            id="save-date-btn"
            type="button"
            data-component-id="button-with-icon"
            data-component-type="button"
            data-component-variant="with-icon"
            onClick={handleSaveDate}
            className="action-pill inline-flex items-center gap-gutter-xs px-gutter-sm py-gutter-sm rounded-full border border-dark-charcoal/40 bg-ivory-card text-dark-charcoal font-label text-label-sm uppercase tracking-wider whitespace-nowrap transition-transform duration-seal-press ease-seal-press hover:bg-light-surface-variant active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-charcoal cursor-pointer"
          >
            <span className="material-symbols-outlined text-dark-charcoal" aria-hidden="true">
              calendar_today
            </span>
            <span data-design-text-token="label-sm">
              {dateSaved ? 'Date Saved' : 'Save the Date'}
            </span>
          </button>
        </div>

      </div>
    </article>
  );
}
