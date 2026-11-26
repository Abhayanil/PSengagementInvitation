---
name: "P & S Engagement — Stationery Design System"
description: "Tactile South Asian luxury wedding stationery design system with muted sage-mint cotton paper, antique gold foil, and dusty onion-pink botanical accents."
---

## Overview

The **P & S Engagement** design system translates tactile South Asian luxury wedding stationery into an editorial mobile experience. Built around a serene, natural-light aesthetic, it pairs muted pastel sage-mint cotton paper with burnished antique gold wax seals, delicate serif calligraphy, and soft watercolor botanicals. Every surface feels physical—layered paper folds, soft ambient shadows, and debossed metallic details—while maintaining editorial minimalism and generous breathing room.

## Colors

The palette is anchored by the user-specified stationery materials: **Sage-Mint Paper** (`#CBD8CE`) for the cotton envelope stock, **Antique Gold** (`#C5A059`) for the wax seal and foil-stamped calligraphy, and **Onion-Pink** (`#D8A1A8`) for dusty botanical blossoms, complemented by **Charcoal-Gold** (`#4E4639`) for legible, high-contrast serif prompts.

- **Sage-Mint Paper (`sage-mint-paper`):** Primary physical envelope material.
- **Antique Gold (`antique-gold`):** Wax seal body, metallic rim, and decorative calligraphy accents.
- **Onion-Pink (`onion-pink`):** Soft dusty rose watercolor floral accents.
- **Charcoal-Gold (`charcoal-gold`):** High-contrast warm dark ink for tracked uppercase prompts and legible copy on sage-mint paper.

```yaml
colors:
  sage-mint-paper: "#CBD8CE"
  antique-gold: "#C5A059"
  onion-pink: "#D8A1A8"
  charcoal-gold: "#4E4639"
  ivory-card: "#FAF6F0"
  warm-taupe: "#6E655F"
  antique-gold-script: "#9E7B3C"
  dark-charcoal: "#2C2A29"
  sage-fold-shadow: "#A2AEA5"
  sage-fold-highlight: "#E7F4EA"
  gold-highlight: "#E9C176"
  gold-shadow: "#775A19"
  light:
    primary: "#775A19"
    on-primary: "#FFFFFF"
    primary-container: "#C5A059"
    on-primary-container: "#4E3700"
    secondary: "#556159"
    on-secondary: "#FFFFFF"
    secondary-container: "#D6E3D9"
    on-secondary-container: "#59655D"
    tertiary: "#7F5258"
    on-tertiary: "#FFFFFF"
    tertiary-container: "#CD979E"
    on-tertiary-container: "#572F36"
    error: "#BA1A1A"
    on-error: "#FFFFFF"
    error-container: "#FFDAD6"
    on-error-container: "#93000A"
    background: "#FFF8F3"
    on-background: "#1E1B16"
    surface: "#FFF8F3"
    on-surface: "#1E1B16"
    surface-variant: "#EEE1CF"
    on-surface-variant: "#4E4639"
    outline: "#7F7667"
    outline-variant: "#D1C5B4"
  dark:
    primary: "#E9C176"
    on-primary: "#412D00"
    primary-container: "#C5A059"
    on-primary-container: "#4E3700"
    secondary: "#BDCAC0"
    on-secondary: "#28332C"
    secondary-container: "#404C44"
    on-secondary-container: "#AFBCB2"
    tertiary: "#F1B8BF"
    on-tertiary: "#4A252B"
    tertiary-container: "#CD979E"
    on-tertiary-container: "#572F36"
    error: "#FFB4AB"
    on-error: "#690005"
    error-container: "#93000A"
    on-error-container: "#FFDAD6"
    background: "#16130E"
    on-background: "#E9E1D8"
    surface: "#16130E"
    on-surface: "#E9E1D8"
    surface-variant: "#4E4639"
    on-surface-variant: "#D1C5B4"
    outline: "#9A8F80"
    outline-variant: "#4E4639"
```

## Typography

**Libre Baskerville** serves as the signature editorial serif for calligraphic headings, debossed monograms, and tracked uppercase stationery prompts. **Varela Round** supports clean functional body copy, while **Spline Sans Mono** is reserved for structured metadata or dates when needed.

```yaml
typography:
  display-lg:
    fontFamily: "Libre Baskerville"
    fontSize: 36px
    fontWeight: 400
    lineHeight: 44px
    letterSpacing: 0.25px
  display-lg-mobile:
    fontFamily: "Libre Baskerville"
    fontSize: 28px
    fontWeight: 400
    lineHeight: 36px
    letterSpacing: 0.25px
  script-lg:
    fontFamily: "Great Vibes"
    fontSize: 32px
    fontWeight: 400
    lineHeight: 40px
    letterSpacing: 0px
  script-md:
    fontFamily: "Great Vibes"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 32px
    letterSpacing: 0px
  headline-lg:
    fontFamily: "Libre Baskerville"
    fontSize: 32px
    fontWeight: 400
    lineHeight: 40px
    letterSpacing: 0px
  headline-md:
    fontFamily: "Libre Baskerville"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 32px
    letterSpacing: 0.25px
  title-lg:
    fontFamily: "Libre Baskerville"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 28px
    letterSpacing: 0.5px
  body-md:
    fontFamily: "Varela Round"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 22px
    letterSpacing: 0px
  label-lg:
    fontFamily: "Libre Baskerville"
    fontSize: 13px
    fontWeight: 700
    lineHeight: 18px
    letterSpacing: 2.5px
  label-sm:
    fontFamily: "Libre Baskerville"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 3px
  mono-sm:
    fontFamily: "Spline Sans Mono"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 0.5px
```

## Layout & Spacing

The mobile stationery canvas uses a full-bleed `390x844` viewport (`min-h-screen`) with zero chrome or navigation bars. Safe margins and a strict `8px` spacing scale keep calligraphic flap text, the centerpiece wax seal, and footer prompts balanced with generous negative space.

```yaml
spacing:
  gutter-xs: 4px
  gutter-sm: 8px
  gutter-md: 16px
  gutter-lg: 24px
  gutter-xl: 32px
  section: 48px
  page-margin: 24px
```

## Elevation & Depth

Depth is conveyed through **soft natural lighting and layered paper shadows** rather than harsh borders. Envelope flaps cast diffused, warm-neutral inner drop shadows (`rgba(30, 27, 22, 0.14)`) onto the underlying pocket, while the antique gold wax seal uses a combination of raised metallic rim highlights and a soft contact shadow to sit physically proud of the paper seam.

## Shapes

Stationery planes rely on crisp architectural diagonal folds (`0px` corners on full-bleed paper edges) contrasted with the organic, hand-stamped circular silhouette of the wax seal (`9999px` base radius with subtle organic edge variation).

```yaml
rounded:
  none: 0px
  sm: 4px
  DEFAULT: 8px
  md: 12px
  lg: 16px
  full: 9999px
```

## Motion & Micro-interaction

Motion is unhurried, tactile, and physical. Pressing the wax seal yields a subtle downward press (`120ms` ease-out) before initiating any envelope unsealing transition, honoring `prefers-reduced-motion` and animating only `transform` and `opacity`.

```yaml
motion:
  seal-press:
    duration: 120ms
    delay: 0ms
    timingFunction: ease-out
  flap-open:
    duration: 450ms
    delay: 0ms
    timingFunction: cubic-bezier(0.2, 0, 0, 1)
```

## Voice & Content Strategy

- **Tone of voice:** Poetic, understated, and ceremonial—warm without being ornate or verbose.
- **Capitalisation:** Title case italic serif for poetic phrases (*"The Beginning of Our Forever"*), and tracked uppercase serif for quiet interactive prompts (`TAP SEAL TO OPEN`).
- **Restraint:** No emojis, no badges, and no modern UI jargon; every word belongs on physical wedding stationery.

## Components

Component implementations live as individual HTML sticker sheet files in
`components/`. Each file contains the canonical, styled HTML components with
`<!-- COMPONENT: name -->` comment markers. Read each file before use.

- **Button** → `@components/button.html` — `button-primary`, `button-icon`, `button-with-icon`
- **Typography** → `@components/typography.html` — `typography-display`, `typography-body`, `typography-label`
