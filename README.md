# Smruti Ranjan Pati - Portfolio

Static site (HTML / CSS / vanilla JS) for GitHub Pages. "Liquid Glass" design, dark-green accent, light + dark mode.

## Structure
```
index.html  work.html  skills.html  about.html  career.html  contact.html
case-study.html        <- ONE template for every case study (?id=...)
404.html               <- terminal-style not-found page
customer-care-portal.html (+ other hand-built case studies)
css/   style.css (tokens, base, cards)  pages.css (all page styles)  404.css
js/    data.js          single source of truth (case studies + skills)
       components.js    header, footer, tab bar, theme, cursor, transitions, CTA
       illustrations.js inline SVG artwork  (<div data-art="hero">)
       work.js  skills.js  home.js
       case-study-template.js  renders case-study.html
       case-study.js    only for hand-built case-study pages
       not-found.js     404 page
assets/  2151604604.webp (banner), favicon.ico, images
Smruti_Ranjan_Pati_Resume.pdf
```

## Add a case study (no new HTML needed)
1. Open `js/data.js`, copy a block in `studies`, give it a new `id`.
2. Set `href: "case-study.html?id=<id>"`, fill `title`, `summary`, `role`, `client`, `timeline`, `tools`, `highlights`, `sections`.
3. `published: true` shows it on Home, Work and the footer. Leave `status: "soon"` for a placeholder page.

Page URL: `case-study.html?id=<id>`. Unknown ids show a friendly not-found state.

## Upgrade a hand-built case-study page
In its `<head>` use `css/style.css` and `css/pages.css`; at the bottom replace the `script.js` tag with
`js/data.js`, `js/components.js`, `js/case-study.js`.

## 404 on GitHub Pages
`404.html` must sit in the repo root. It sets a `<base>` so links work from any depth (`/Smruti-ranjan/` on github.io).
If your repo name differs, edit it in the small script at the top of `404.html`.

## Theme
Change the accent in `css/style.css` (`--violet` fill, `--cyan`/`--forest` text and icons).
