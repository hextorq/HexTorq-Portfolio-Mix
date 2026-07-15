# HexTorq Portfolio Mix

Production controller website for switching between the four deployed HexTorq portfolio templates.

Repository: https://github.com/hextorq/HexTorq-Portfolio-Mix

## Website Overview

HexTorq Portfolio Mix is a Vite static site that loads the four individual HexTorq portfolio websites as full-screen templates. It defaults to Portfolio 4, preloads the other templates in the background, and gives visitors a very small UI switch button to randomly change the visual design.

The goal is to make one public website feel like multiple premium portfolio experiences while keeping the same route and content area.

## Connected Portfolio URLs

- Portfolio 1: https://portfolio-1.hextorq.tech/
- Portfolio 2: https://portfolio-2.hextorq.tech/
- Portfolio 3: https://portfolio-3.hextorq.tech/
- Portfolio 4: https://portfolio-4.hextorq.tech/

Portfolio 4 is the default first-loaded template.

## Route Behavior

The mix website keeps the shared route when switching designs:

- `/`
- `/about/`
- `/services/`
- `/products/`
- `/projects/`
- `/process/`
- `/contact/`

For example, if a visitor is viewing `/contact/` and switches UI, the next template opens its contact section instead of returning to the home page.

## UI Behavior

- Full-screen website experience with no visible admin panel.
- Tiny `UI` switch button for changing the active template.
- Portfolio 4 loads first for the fastest initial view.
- The remaining templates preload in hidden iframes after the default site starts.
- Switching after preload is a visibility change instead of a full cold load.

## Static Build And SEO

The project uses Vite with a prerender step. Running the build generates static HTML route folders in `dist/`, so deployed pages can be served directly as HTML, CSS, and JavaScript.

```bash
npm install
npm run build
```

The generated output includes prerendered pages for all shared routes.

## Configuration

The production template URLs are defined in `src/templates.js`.

To override them during deployment, set:

```bash
VITE_TEMPLATE_URLS=https://site-1.com,https://site-2.com,https://site-3.com,https://site-4.com
```

## Deployment Notes

The four individual portfolio sites must allow iframe embedding and cross-origin asset loading from HexTorq domains. Their `vercel.json` files include the required headers for this mix website.
