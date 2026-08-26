# Kalia Architects Portfolio

A premium, production-ready, single-page architecture studio portfolio website built from scratch. Inspired by contemporary architectural magazines, it features asymmetric grids, thin borders, generous whitespace, and a high-aesthetic mountain/Himalayan identity.

## Tech Stack
- **Structure:** Semantic HTML5
- **Style:** Vanilla CSS3 (Custom Variables, Flexbox, CSS Grid, Clamp fluid typography)
- **Animations:** Vanilla JS + GSAP (GreenSock Animation Platform) + GSAP ScrollTrigger
- **Responsive:** Optimized for devices from 320px mobile to 1920px large desktops

## Structure
```
/
├── index.html       # Single-page template with semantic layouts
├── css/
│   └── style.css    # Premium CSS design system, typography, and modal layouts
├── js/
│   └── main.js      # Interactive cursor, loader, GSAP animations, and project lightbox
├── assets/
│   ├── images/      # Project asset storage
│   ├── logo/        # Custom vector markers
│   └── icons/       # Action shapes
└── README.md
```

## Creative Concept & Styling
- **Minimalist Design:** Warm off-white backgrounds, slate stonewash accents, and charcoal typography.
- **Editorial Typography:** Inter (sans-serif) for clean functional labels, paired with Cormorant Garamond (serif) for display headlines.
- **Architectural Motion:** Slow, intentional transitions. Includes hero entrances, mask clip-path reveals on scroll (simulating blueprints emerging), custom pointer cursors with project zoom features, and parallax scroll alignment.
- **Responsive Adaptability:** Clean mobile composition with full-screen hamburger menu overlays, optimized touch states, and full `prefers-reduced-motion` accessibility support.

## Getting Started
To view the site locally, simply open `index.html` in any web browser, or launch a local development server:
```bash
# Using Python
python -m http.server 8000

# Using Node (npx)
npx browser-sync start --server --files "css/*.css, js/*.js, *.html"
```
Navigate to `http://localhost:8000` or the browser-sync URL.
