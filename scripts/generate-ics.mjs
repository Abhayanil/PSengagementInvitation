// Writes public/<icsPath> from src/eventDetails.js so the calendar file never drifts from the card.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { EVENT, buildICS } from '../src/eventDetails.js';

const out = fileURLToPath(new URL(`../public${EVENT.icsPath}`, import.meta.url));
writeFileSync(out, buildICS());
console.log(`Wrote ${out}`);
