# TritonDFT — Marketing Site

Live at **https://tritondft.com**

The product landing page for [TritonDFT](https://chat.tritondft.com), a multi-agent LLM framework that automates Density Functional Theory end-to-end.

## Stack

- Pure HTML / CSS / JS (no framework, no build step)
- Three.js (via ESM import map, no bundler) for the hero 3D crystal
- Inter + Instrument Serif + JetBrains Mono (Google Fonts)
- Deployed to GitHub Pages directly from `main`

## Local dev

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Files

| File | Purpose |
|---|---|
| `index.html` | Sections: hero / transformation / how / proof / watch / final CTA |
| `styles.css` | Design tokens, dark theme, layout |
| `crystal.js` | Three.js scene — Si diamond-cubic lattice, parallax + demo response |
| `demo.js` | Interactive hero prompt: typing → agent log + crystal sync |
| `script.js` | Scroll reveals + animated counters + smooth scroll |
| `assets/` | Figures (intro4, overview3, radar, etc.) + demo video |
| `CNAME` | `tritondft.com` |

## Branches

- `main` — current marketing site
- `legacy/v1-paper-site` — previous paper-style landing page (Royal blue + amber theme)

## Related repos

- [TritonDFT](https://github.com/yil384/TritonDFT) — research code (private)
- [TritonDFT-frontend](https://github.com/yil384/TritonDFT-frontend) — chat app at https://chat.tritondft.com
