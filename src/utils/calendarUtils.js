/**
 * Utility to generate and download a standard RFC 5545 iCalendar (.ics) file
 * Event: Engagement of Pratistha Sharma & Sandeep Sadasivam
 * Date: Sunday, 27th December 2026
 * Time: 10:00 AM – 3:00 PM IST (UTC+05:30)
 * Venue: 7 Sprinkles Cafe
 */

export function downloadEngagementICS() {
  // 10:00 AM IST on 2026-12-27 = 04:30 AM UTC on 2026-12-27
  // 03:00 PM IST on 2026-12-27 = 09:30 AM UTC on 2026-12-27
  const startUTC = '20261227T043000Z';
  const endUTC = '20261227T093000Z';
  const nowUTC = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const uid = `engagement-pratistha-sandeep-20261227@celebration.app`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Pratistha & Sandeep//Engagement Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${nowUTC}`,
    `DTSTART:${startUTC}`,
    `DTEND:${endUTC}`,
    'SUMMARY:Engagement: Pratistha Sharma & Sandeep Sadasivam',
    'DESCRIPTION:Join us in celebrating the engagement of Pratistha Sharma and Sandeep Sadasivam with love and laughter.\\n\\nDate: Sunday, 27th December 2026\\nTime: 10:00 AM – 3:00 PM IST\\nVenue: 7 Sprinkles Cafe',
    'LOCATION:7 Sprinkles Cafe',
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Engagement: Pratistha & Sandeep tomorrow at 10:00 AM',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'pratistha-sandeep-engagement.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
