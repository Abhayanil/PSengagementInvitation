/**
 * Single source of truth for the event. Edit here, then run `npm run ics`
 * (also runs automatically before `npm run build`) to refresh the calendar
 * file in public/.
 *
 * TODO: add the confirmed venue address + exact Google Maps link.
 */
export const EVENT = {
  title: 'Engagement: Pratistha Sharma & Sandeep Sadasivam',
  description:
    'Join us in celebrating the engagement of Pratistha Sharma and Sandeep Sadasivam with love and laughter.',
  venueName: '7 Sprinkles Cafe',
  venueAddress: '', // e.g. '12 MG Road, Indiranagar, Bengaluru' — shown under the venue name when set
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=7+Sprinkles+Cafe',
  // 10:00 AM – 3:00 PM IST (UTC+05:30) on Sunday 27 December 2026
  startUTC: '20261227T043000Z',
  endUTC: '20261227T093000Z',
  icsPath: '/pratistha-sandeep-engagement.ics',
};

export const eventLocation = () =>
  [EVENT.venueName, EVENT.venueAddress].filter(Boolean).join(', ');

export const googleCalendarUrl = () => {
  const q = new URLSearchParams({
    action: 'TEMPLATE',
    text: EVENT.title,
    dates: `${EVENT.startUTC}/${EVENT.endUTC}`,
    details: EVENT.description,
    location: eventLocation(),
  });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
};

export function buildICS() {
  const esc = (s) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Pratistha & Sandeep//Engagement Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:engagement-pratistha-sandeep-20261227@invitation',
    'DTSTAMP:20261101T000000Z',
    `DTSTART:${EVENT.startUTC}`,
    `DTEND:${EVENT.endUTC}`,
    `SUMMARY:${esc(EVENT.title)}`,
    `DESCRIPTION:${esc(EVENT.description)}`,
    `LOCATION:${esc(eventLocation())}`,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Engagement of Pratistha & Sandeep tomorrow at 10:00 AM',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}
