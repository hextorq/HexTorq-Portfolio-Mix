# HexTorq Portfolio Mix

This is a static Vite controller for switching between four deployed HexTorq portfolio templates while keeping the same logical page route.

## How It Works

- The mix site owns the shared navigation: `/`, `/about/`, `/services/`, `/products/`, `/projects/`, `/process/`, `/contact/`.
- Each template can live on its own production URL.
- When the user switches templates, the mix app keeps the current route and loads the same route on the next template.
- Each template has its own section hash map, so `/contact/` can open `#contact` in templates 1, 2 and 4, but `#cta` in template 3.

## Configure Template URLs

The four HexTorq portfolio deployments are already configured:

```txt
https://portfolio-1.hextorq.tech
https://portfolio-2.hextorq.tech
https://portfolio-3.hextorq.tech
https://portfolio-4.hextorq.tech
```

To override them, set the deployed origins in an environment variable:

```bash
VITE_TEMPLATE_URLS=https://site-1.com,https://site-2.com,https://site-3.com,https://site-4.com
```

Or paste the same comma-separated list into the Template Sources panel in the browser.

## Build

```bash
npm install
npm run build
```

The build writes static HTML, CSS and JS into `dist/`, with prerendered route folders for all shared routes.
