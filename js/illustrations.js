// ============ ILLUSTRATIONS ============
// Inline SVG artwork. Colours come from the theme (see ".art" rules in css/pages.css),
// so they follow dark / light mode and the green accent automatically.
// Use on a page:  <div data-art="hero"></div>   (components.js drops the SVG in)
// Available: hero, cta, work, skills, about, career, contact
window.SRArt = {
  // ---- big hero composition: dashboard window + component cards + cursor ----
  hero: `
<svg class="art" viewBox="0 0 460 330" role="img" aria-label="Illustration of a dashboard design surrounded by UI components" xmlns="http://www.w3.org/2000/svg">
  <g class="a-dots">${Array.from({ length: 35 }, (_, i) => `<circle cx="${20 + (i % 7) * 12}" cy="${250 + Math.floor(i / 7) * 12}" r="1.6"/>`).join("")}</g>
  <circle class="a-soft" cx="380" cy="70" r="46"/>
  <circle class="a-ring" cx="380" cy="70" r="62"/>

  <g class="float f1">
    <rect class="a-glass" x="46" y="34" width="290" height="196" rx="22"/>
    <circle class="a-d1" cx="72" cy="58" r="5"/><circle class="a-d2" cx="90" cy="58" r="5"/><circle class="a-d3" cx="108" cy="58" r="5"/>
    <rect class="a-line-fill" x="72" y="82" width="86" height="8" rx="4"/>
    <rect class="a-faintfill" x="72" y="98" width="130" height="6" rx="3"/>
    <rect class="a-green" x="76" y="170" width="20" height="38" rx="6" opacity=".35"/>
    <rect class="a-green" x="106" y="148" width="20" height="60" rx="6" opacity=".55"/>
    <rect class="a-green" x="136" y="160" width="20" height="48" rx="6" opacity=".4"/>
    <rect class="a-green" x="166" y="124" width="20" height="84" rx="6"/>
    <rect class="a-green" x="196" y="154" width="20" height="54" rx="6" opacity=".5"/>
    <rect class="a-green" x="226" y="138" width="20" height="70" rx="6" opacity=".7"/>
    <polyline class="a-trend" points="258,196 280,170 300,178 322,134" />
    <circle class="a-green" cx="322" cy="134" r="5"/>
    <rect class="a-soft" x="262" y="76" width="52" height="30" rx="10"/>
    <rect class="a-green" x="270" y="86" width="22" height="6" rx="3"/>
  </g>

  <g class="float f2">
    <rect class="a-glass" x="262" y="150" width="170" height="110" rx="20"/>
    <circle class="a-green" cx="292" cy="182" r="14"/>
    <path class="a-check" d="M285 182l5 5 9-10"/>
    <rect class="a-line-fill" x="316" y="174" width="82" height="7" rx="3.5"/>
    <rect class="a-faintfill" x="316" y="189" width="56" height="6" rx="3"/>
    <rect class="a-btn" x="280" y="214" width="116" height="30" rx="15"/>
    <text class="a-btn-t" x="338" y="233" text-anchor="middle">View my work</text>
  </g>

  <g class="float f3">
    <rect class="a-glass" x="22" y="192" width="118" height="74" rx="18"/>
    <circle class="a-green" cx="48" cy="216" r="10"/><circle class="a-c2" cx="74" cy="216" r="10"/><circle class="a-c3" cx="100" cy="216" r="10"/>
    <rect class="a-toggle" x="44" y="238" width="44" height="18" rx="9"/><circle class="a-knob" cx="79" cy="247" r="7"/>
  </g>

  <path class="a-cursor" d="M372 224l0 40 11-10 8 18 9-4-8-18 15-1z"/>
</svg>`,

  // ---- wide CTA band illustration ----
  cta: `
<svg class="art" viewBox="0 0 300 200" role="img" aria-label="Illustration of stacked design layers with a cursor" xmlns="http://www.w3.org/2000/svg">
  <g class="float f1"><rect class="a-glass" x="40" y="26" width="170" height="108" rx="18"/><rect class="a-faintfill" x="58" y="46" width="70" height="8" rx="4"/><rect class="a-soft" x="58" y="66" width="134" height="50" rx="10"/></g>
  <g class="float f2"><rect class="a-glass" x="86" y="70" width="170" height="108" rx="18"/><circle class="a-green" cx="116" cy="102" r="14"/><rect class="a-line-fill" x="140" y="94" width="84" height="7" rx="3.5"/><rect class="a-faintfill" x="140" y="108" width="56" height="6" rx="3"/><rect class="a-btn" x="108" y="136" width="96" height="26" rx="13"/></g>
  <path class="a-cursor" d="M196 150l0 34 9-8 7 15 8-3-7-15 13-1z"/>
  <g class="a-spark"><path d="M262 40l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/><path d="M30 150l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/></g>
</svg>`,

  // ---- small page-header illustrations ----
  work: `
<svg class="art" viewBox="0 0 260 180" role="img" aria-label="Illustration of project frames" xmlns="http://www.w3.org/2000/svg">
  <g class="float f1"><rect class="a-glass" x="20" y="22" width="112" height="76" rx="14"/><rect class="a-soft" x="32" y="48" width="88" height="38" rx="8"/><rect class="a-line-fill" x="32" y="34" width="44" height="6" rx="3"/></g>
  <g class="float f2"><rect class="a-glass" x="104" y="68" width="136" height="92" rx="16"/><rect class="a-green" x="120" y="108" width="14" height="38" rx="5" opacity=".5"/><rect class="a-green" x="142" y="92" width="14" height="54" rx="5"/><rect class="a-green" x="164" y="120" width="14" height="26" rx="5" opacity=".4"/><circle class="a-green" cx="212" cy="96" r="9"/><path class="a-check" d="M207 96l4 4 7-8"/></g>
  <path class="a-cursor" d="M196 128l0 28 8-7 6 12 6-3-6-12 11-1z"/>
</svg>`,
  skills: `
<svg class="art" viewBox="0 0 260 180" role="img" aria-label="Illustration of design layers and a pen" xmlns="http://www.w3.org/2000/svg">
  <g class="float f1"><rect class="a-glass" x="40" y="96" width="130" height="50" rx="14" transform="rotate(-8 105 121)"/></g>
  <g class="float f2"><rect class="a-glass" x="52" y="62" width="130" height="50" rx="14" transform="rotate(-8 117 87)"/></g>
  <g class="float f3"><rect class="a-soft" x="64" y="28" width="130" height="50" rx="14" transform="rotate(-8 129 53)"/><circle class="a-green" cx="96" cy="50" r="9"/></g>
  <g class="float f2"><path class="a-green" d="M200 40l22 22-48 48-26 4 4-26z"/><path class="a-pen" d="M196 46l22 22"/></g>
  <circle class="a-c2" cx="214" cy="132" r="10"/><circle class="a-green" cx="236" cy="146" r="7"/><circle class="a-c3" cx="196" cy="150" r="6"/>
</svg>`,
  about: `
<svg class="art" viewBox="0 0 260 180" role="img" aria-label="Illustration of a designer with a speech bubble" xmlns="http://www.w3.org/2000/svg">
  <g class="float f1"><circle class="a-soft" cx="104" cy="92" r="64"/><circle class="a-glass" cx="104" cy="68" r="26"/><path class="a-glass" d="M58 160c0-30 20-48 46-48s46 18 46 48z"/></g>
  <g class="float f2"><rect class="a-glass" x="150" y="26" width="92" height="52" rx="16"/><path class="a-glassfill" d="M166 78l-4 16 20-16z"/><rect class="a-green" x="164" y="42" width="48" height="7" rx="3.5"/><rect class="a-faintfill" x="164" y="56" width="32" height="6" rx="3"/></g>
  <g class="a-spark"><path d="M222 120l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></g>
</svg>`,
  career: `
<svg class="art" viewBox="0 0 260 180" role="img" aria-label="Illustration of a career path with steps" xmlns="http://www.w3.org/2000/svg">
  <g class="float f1"><rect class="a-glass" x="22" y="118" width="64" height="42" rx="12"/><rect class="a-glass" x="86" y="90" width="64" height="70" rx="12"/><rect class="a-soft" x="150" y="58" width="64" height="102" rx="12"/></g>
  <circle class="a-green" cx="54" cy="104" r="7"/><circle class="a-green" cx="118" cy="76" r="7"/><circle class="a-green" cx="182" cy="44" r="7"/>
  <path class="a-dash" d="M54 104L118 76L182 44"/>
  <g class="float f2"><path class="a-flag" d="M182 44V12"/><path class="a-green" d="M182 12l30 9-30 9z"/></g>
</svg>`,
  contact: `
<svg class="art" viewBox="0 0 260 180" role="img" aria-label="Illustration of an envelope and paper plane" xmlns="http://www.w3.org/2000/svg">
  <g class="float f1"><rect class="a-glass" x="40" y="70" width="140" height="92" rx="16"/><path class="a-line" d="M44 78l66 46 66-46"/></g>
  <g class="float f2"><path class="a-green" d="M236 24L150 58l30 12 10 28 14-22z"/><path class="a-plane" d="M180 70l56-46"/></g>
  <path class="a-dash" d="M60 40c20-24 52-26 76-10"/>
  <circle class="a-soft" cx="206" cy="132" r="26"/>
</svg>`,
};
