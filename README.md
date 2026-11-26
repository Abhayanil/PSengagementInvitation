# Engagement Celebration — Interactive Digital Invitation

A mobile-first, interactive engagement invitation web app featuring a 3D opening envelope, realistic antique gold wax seal, and elegant framed celebration card for **Pratistha Sharma & Sandeep Sadasivam**.

## ✨ Features & Visual Design

- **3D Animated Envelope Flap**: Realistic 3D rotation (`rotateX(180deg)`) along the top hinge with realistic perspective and depth.
- **Tactile Antique Gold Wax Seal**: Organic molten edges, debossed monogram initials **"P & S"**, realistic rim bevel, ambient shadows, and gentle pulsing glow with helper text: *"Tap the seal to open"*.
- **Floral Accents**: Dusty onion pink (`#D8A1A8`) blossoms, white roses, eucalyptus sage leaves, and gold foil sprigs tucked into the corner of the envelope flap.
- **Single Framed Ivory Card**:
  - Arched frame displaying the couple illustration with romantic SVG fallback art.
  - Flowing calligraphy for the couple's names (*Alex Brush* / *Cormorant Garamond*).
  - Delicate gold diamond divider and romantic quote.
  - Event details: **Sunday, 27th December 2026**, **10:00 AM – 3:00 PM**, **7 Sprinkles Cafe**.
  - **Google Maps** one-tap venue directions.
  - **Save the Date** downloading a compliant RFC 5545 `.ics` calendar invitation in IST.
  - **Replay button** to seamlessly fold the envelope back and replay the reveal.
- **Mobile-First & 60fps GPU Accelerated**: Optimized for iPhone and Android touch viewports (`100dvh`), centered on desktop displays.

## 🛠️ Tech Stack

- **React 18** (Vite)
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React**

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for static production deployment
npm run build
```
