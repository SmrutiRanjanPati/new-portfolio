// ============ SHARED COMPONENTS (header, footer, tab bar, search) ============
// One file controls the header and footer of EVERY page.
//
// Use on a page:
//   <body data-page="home|work|skills|about|career|contact">
//     <div data-component="header"></div>
//     <main> ... <div data-component="footer"></div> </main>
//   <script src="data.js" defer></script>
//   <script src="components.js" defer></script>
//
// Placeholders are optional: if a page has none, the header goes at the top of
// <body> and the footer at the end of <main>. Old-style case-study pages (with
// their own <header class="topnav"> / <footer class="site-footer">) are upgraded
// automatically: the old ones are swapped for these.
(function () {
  const D = window.SITE_DATA || { studies: [], skills: [], groups: [] };
  const published = D.studies.filter((s) => s.published);

  // ---------- config: edit links / labels here ----------
  const PAGES = [
    { key: "home", href: "index.html", label: "Home", icon: "fa-house" },
    { key: "work", href: "work.html", label: "Work", icon: "fa-folder-open" },
    { key: "skills", href: "skills.html", label: "Skills", icon: "fa-layer-group" },
    { key: "about", href: "about.html", label: "About", icon: "fa-user" },
    { key: "career", href: "career.html", label: "Career", icon: "fa-briefcase" },
    { key: "contact", href: "contact.html", label: "Contact", icon: "fa-envelope" },
  ];
  const TABS = ["home", "work", "skills", "career", "contact"];
  const SITE = {
    brand: "Smruti Ranjan",
    mark: "SR",
    tagline: "Designing interfaces for problems that start as spreadsheets.",
    resume: "Smruti_Ranjan_Pati_Resume.pdf",
    email: "smrutirtg@gmail.com",
    linkedin: "https://www.linkedin.com/in/smruti-ranjan007",
    github: "https://github.com/SmrutiRanjanPati",
    gaId: "G-1DMZH038V6",
  };

  // ---------- which page are we on? ----------
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  let page = document.body.dataset.page;
  if (!page) {
    const hit = PAGES.find((p) => p.href === file);
    if (hit) page = hit.key;
    else if (D.studies.some((s) => s.href === file)) page = "work"; // case-study pages live under Work
    else page = "";
  }

  // ---------- make sure pages.css is present (needed for these components) ----------
  if (!document.querySelector('link[href$="pages.css"]')) {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "css/pages.css";
    document.head.appendChild(l);
  }

  // ---------- smooth page changes ----------
  // Page content fades/slides out, the next page fades/slides in. Header and tab bar stay put.
  const calmMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let leaving = false;
  window.srNavigate = function (href) {
    if (leaving) return;
    if (calmMotion) { window.location.href = href; return; }
    leaving = true;
    if (window.__saveCursor) window.__saveCursor();
    document.documentElement.classList.add("page-leaving");
    setTimeout(() => { window.location.href = href; }, 170);
  };
  // coming back with the browser's Back button: undo the "leaving" state
  window.addEventListener("pageshow", (e) => {
    leaving = false;
    document.documentElement.classList.remove("page-leaving");
  });
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
    const href = a.getAttribute("href");
    if (!href || /^(mailto:|tel:|javascript:)/i.test(href)) return;
    let u;
    try { u = new URL(a.href, location.href); } catch (_) { return; }
    if (u.origin !== location.origin && location.protocol !== "file:") return; // external
    if (location.protocol === "file:" && u.protocol !== "file:") return;
    if (/\.(pdf|zip|png|jpe?g|webp|svg)$/i.test(u.pathname)) return;
    if (u.pathname === location.pathname && u.search === location.search) return; // same page / #anchor
    e.preventDefault();
    window.srNavigate(a.href);
  });

  // ---------- analytics (skipped if the page already set up gtag) ----------
  if (typeof window.gtag !== "function") {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", SITE.gaId);
    const ga = document.createElement("script");
    ga.async = true;
    ga.src = "https://www.googletagmanager.com/gtag/js?id=" + SITE.gaId;
    document.head.appendChild(ga);
  }

  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || "");
  const kbd = isMac ? "⌘K" : "Ctrl K";

  // ---------- components (each returns an HTML string) ----------
  const Header = () => `
    <header class="topnav" id="topnav">
      <div class="topnav-inner">
        <a href="index.html" class="brand" aria-label="${SITE.brand}, home">
          <span class="brand-mark">${SITE.mark}</span>
          <span class="brand-name">${SITE.brand}</span>
        </a>
        <nav class="nav-links" id="navLinks" aria-label="Primary">
          ${PAGES.map((p) => `<a href="${p.href}" class="${p.key === page ? "active" : ""}" ${p.key === page ? 'aria-current="page"' : ""}>${p.label}</a>`).join("")}
        </nav>
        <div class="nav-cta">
          <button class="nav-search" id="paletteBtn" type="button" aria-label="Search the site">
            <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            <span class="nav-search-label">Search</span>
            <kbd>${kbd}</kbd>
          </button>
          <button class="theme-toggle" id="themeToggle" type="button" aria-label="Toggle dark / light mode">
            <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/></svg>
            <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/></svg>
          </button>
          <a class="btn btn-solid magnetic" href="${SITE.resume}" target="_blank" rel="noopener">Resume</a>
        </div>
      </div>
    </header>`;

  const TabBar = () => `
    <nav class="tabbar" aria-label="Mobile">
      <span class="tab-indicator" aria-hidden="true"></span>
      ${TABS.map((k) => {
        const p = PAGES.find((x) => x.key === k);
        return `<a href="${p.href}" draggable="false" class="tab-item ${k === page ? "active" : ""}"><i class="fa-solid ${p.icon}" aria-hidden="true"></i><span>${p.label}</span></a>`;
      }).join("")}
    </nav>`;

  // original footer (unchanged from the first version of the site)
  const Footer = () => `
    <footer class="site-footer" id="connect">
      <div class="footer-inner">
        <div>
          <span class="brand-mark">${SITE.mark}</span>
          <p class="footer-tag">${SITE.tagline}</p>
        </div>
        <div class="footer-actions">
          <a class="btn btn-solid magnetic" href="mailto:${SITE.email}">Email me</a>
          <a class="btn btn-outline magnetic" href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
          <a class="btn btn-outline magnetic" href="${SITE.github}" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
      <p class="footer-copy">© <span id="year"></span> Smruti Ranjan Pati. Designed, developed, and continuously refined with attention to every detail.</p>
    </footer>`;

  const Palette = () => `
    <div class="palette" id="palette" hidden>
      <div class="palette-box" role="dialog" aria-modal="true" aria-label="Search the site">
        <input class="palette-input" id="paletteInput" type="text" placeholder="Search pages, case studies, skills…" autocomplete="off" spellcheck="false" />
        <ul class="palette-list" id="paletteList" role="listbox"></ul>
        <div class="palette-foot"><span>↑↓ to move</span><span>Enter to open</span><span>Esc to close</span></div>
      </div>
    </div>`;

  // ---------- mount ----------
  // remove any old hand-written header / footer / cursor / tab bar (case-study pages)
  document.querySelectorAll("body > header.topnav, .cursor-dot, .cursor-ring, .tabbar, footer.site-footer").forEach((el) => el.remove());

  const hSlot = document.querySelector('[data-component="header"]');
  if (hSlot) hSlot.outerHTML = Header();
  else document.body.insertAdjacentHTML("afterbegin", Header());

  document.body.insertAdjacentHTML("beforeend", TabBar() + Palette());

  const fSlot = document.querySelector('[data-component="footer"]');
  if (fSlot) fSlot.outerHTML = Footer();
  else (document.querySelector("main") || document.body).insertAdjacentHTML("beforeend", Footer());

  // old case-study pages link back to the single-page "#work" section
  document.querySelectorAll('a[href="index.html#work"]').forEach((a) => a.setAttribute("href", "work.html"));

  // ---------- theme toggle ----------
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeToggle");
  function setTheme(t) {
    if (t === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    try { localStorage.setItem("sr-theme", t); } catch (e) {}
    const m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", t === "light" ? "#E8EDFB" : "#05060B");
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      setTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
      themeBtn.classList.add("spin");
      setTimeout(() => themeBtn.classList.remove("spin"), 350);
    });
  }
  window.addEventListener("storage", (e) => { if (e.key === "sr-theme") setTheme(e.newValue === "light" ? "light" : "dark"); });

  // ---------- quick search (Ctrl/Cmd + K) ----------
  const items = [
    ...PAGES.map((p) => ({ label: p.label, hint: "Page", href: p.href })),
    ...published.map((s) => ({ label: s.title, hint: "Case study", href: s.href })),
    ...D.skills.map((s) => ({
      label: s.name,
      hint: "Skill · " + (D.groups.find((g) => g.key === s.group) || {}).label,
      href: "about.html?q=" + encodeURIComponent(s.name),
    })),
  ];
  const pal = document.getElementById("palette");
  const input = document.getElementById("paletteInput");
  const list = document.getElementById("paletteList");
  let shown = [];
  let sel = 0;

  function render() {
    const q = input.value.trim().toLowerCase();
    shown = items.filter((i) => !q || i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q)).slice(0, 8);
    sel = Math.min(sel, Math.max(0, shown.length - 1));
    list.innerHTML = shown.length
      ? shown.map((i, n) => `<li role="option" aria-selected="${n === sel}" class="${n === sel ? "sel" : ""}" data-i="${n}"><span>${i.label}</span><em>${i.hint}</em></li>`).join("")
      : `<li class="palette-empty">No matches</li>`;
  }
  const open = () => { pal.hidden = false; input.value = ""; sel = 0; render(); input.focus(); };
  const close = () => { pal.hidden = true; };
  const go = (n) => { if (shown[n]) window.srNavigate(shown[n].href); };

  document.getElementById("paletteBtn").addEventListener("click", open);
  pal.addEventListener("click", (e) => { if (e.target === pal) close(); });
  list.addEventListener("click", (e) => { const li = e.target.closest("li[data-i]"); if (li) go(+li.dataset.i); });
  input.addEventListener("input", () => { sel = 0; render(); });
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); pal.hidden ? open() : close(); return; }
    if (pal.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") { e.preventDefault(); sel = Math.min(shown.length - 1, sel + 1); render(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); sel = Math.max(0, sel - 1); render(); }
    else if (e.key === "Enter") go(sel);
  });
})();

// ---------- page basics: footer year, scroll reveal, counters, nav scroll state ----------
(function () {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // blocks marked .reveal fade in as they scroll into view (style.css hides them until .in)
  const show = (el) => el.classList.add("in");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } }),
      { threshold: 0.05 }
    );
    // pages that build content with JS call window.srReveal(container) afterwards
    window.srReveal = (scope) => (scope || document).querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    window.srReveal();

    // stat counters count up when visible
    const co = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      co.unobserve(e.target);
      const el = e.target, target = parseInt(el.dataset.target, 10) || 0, t0 = performance.now();
      (function tick(now) {
        const p = Math.min((now - t0) / 1100, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }), { threshold: 0.5 });
    document.querySelectorAll(".stat-num").forEach((el) => co.observe(el));
  }
  setTimeout(() => document.querySelectorAll(".reveal:not(.in)").forEach(show), 1500); // never leave content hidden

  const nav = document.getElementById("topnav");
  if (nav) window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 20), { passive: true });
})();

// ---------- hover effect: glass spotlight that follows the pointer ----------
// No 3D rotation (that blurs text). Cards stay perfectly sharp: a soft light
// follows the cursor across the glass, the edge glows, and the card lifts a few pixels.
(function () {
  if (!window.matchMedia("(hover: hover)").matches) return;
  const FX = ".card, .work-tile, .glance-card, .skill-card, .explore-card, .contact-card, .ach-item, .cta-band";

  function bind(root) {
    root.querySelectorAll(FX).forEach((el) => {
      if (el.__fx) return;
      el.__fx = true;
      el.classList.add("fx");
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", Math.round(e.clientX - r.left) + "px");
        el.style.setProperty("--my", Math.round(e.clientY - r.top) + "px");
      });
    });
    // buttons lean toward the pointer (rounded to whole pixels so text stays sharp)
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll(".magnetic").forEach((btn) => {
        if (btn.__mag) return;
        btn.__mag = true;
        btn.addEventListener("pointermove", (e) => {
          const r = btn.getBoundingClientRect();
          btn.style.translate = `${Math.round((e.clientX - r.left - r.width / 2) * 0.18)}px ${Math.round((e.clientY - r.top - r.height / 2) * 0.25)}px`;
        });
        btn.addEventListener("pointerleave", () => { btn.style.translate = ""; });
      });
    }
  }
  bind(document);
  let t;
  new MutationObserver(() => { clearTimeout(t); t = setTimeout(() => bind(document), 60); }).observe(document.body, { childList: true, subtree: true });
})();

// ---------- mobile tab bar: sliding glass lens you can drag ----------
// Tap a tab to open it, or press and slide the glass lens across the bar;
// the tab it stops on opens when you let go.
(function () {
  const bar = document.querySelector(".tabbar");
  if (!bar) return;
  const ind = bar.querySelector(".tab-indicator");
  const tabs = [...bar.querySelectorAll(".tab-item")];
  let x = 0; // current lens x (px, inside the bar)
  let dragging = false, pressed = false, moved = false, justDragged = false;
  let startX = 0, grabOffset = 0, peekEl = null;

  const active = () => bar.querySelector(".tab-item.active");
  const bounds = () => {
    const first = tabs[0], last = tabs[tabs.length - 1];
    return { min: first.offsetLeft, max: last.offsetLeft + last.offsetWidth - (active() || first).offsetWidth };
  };
  function setX(v, size) {
    x = v;
    ind.style.translate = `${v}px ${(size || tabs[0]).offsetTop}px`;
  }
  function place() {
    const a = active();
    if (!a || !bar.offsetWidth) { ind.style.opacity = 0; return; }
    // no slide-in animation: the lens simply appears under the current tab
    ind.classList.add("no-anim");
    ind.style.opacity = 1;
    ind.style.width = a.offsetWidth + "px";
    ind.style.height = a.offsetHeight + "px";
    setX(a.offsetLeft, a);
    void ind.offsetWidth; // flush styles while transitions are off
    requestAnimationFrame(() => requestAnimationFrame(() => ind.classList.remove("no-anim")));
  }
  function tabAt(centerX) {
    return tabs.reduce((best, t) => {
      const d = Math.abs(t.offsetLeft + t.offsetWidth / 2 - centerX);
      return !best || d < best.d ? { t, d } : best;
    }, null).t;
  }
  function peek(t) {
    if (peekEl === t) return;
    if (peekEl) peekEl.classList.remove("peek");
    peekEl = t;
    if (t) { t.classList.add("peek"); if (navigator.vibrate) navigator.vibrate(6); }
  }

  bar.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pressed = true; moved = false; dragging = false;
    startX = e.clientX;
    const w = (active() || tabs[0]).offsetWidth;
    const rect = bar.getBoundingClientRect();
    // lens follows the finger from where it currently is
    grabOffset = e.clientX - rect.left - (x + w / 2);
  });

  bar.addEventListener("pointermove", (e) => {
    if (!pressed) return;
    if (!dragging) {
      if (Math.abs(e.clientX - startX) < 6) return;
      dragging = true; moved = true;
      try { bar.setPointerCapture(e.pointerId); } catch (_) {}
      ind.classList.add("dragging");
      bar.classList.add("is-dragging");
    }
    const rect = bar.getBoundingClientRect();
    const w = (active() || tabs[0]).offsetWidth;
    const { min, max } = bounds();
    const nx = Math.max(min, Math.min(max, e.clientX - rect.left - grabOffset - w / 2));
    setX(nx);
    peek(tabAt(nx + w / 2));
    e.preventDefault();
  });

  function end(e) {
    if (!pressed) return;
    pressed = false;
    if (!dragging) return; // plain tap: the link's own click handles it
    dragging = false;
    justDragged = true;
    setTimeout(() => { justDragged = false; }, 60);
    ind.classList.remove("dragging");
    bar.classList.remove("is-dragging");
    const w = (active() || tabs[0]).offsetWidth;
    const target = tabAt(x + w / 2);
    if (peekEl) { peekEl.classList.remove("peek"); peekEl = null; }
    // snap the lens onto the chosen tab, then open it
    ind.style.width = target.offsetWidth + "px";
    setX(target.offsetLeft, target);
    if (e && e.type === "pointercancel") { place(); return; }
    if (target !== active() && target.getAttribute("href")) {
      tabs.forEach((t) => t.classList.toggle("active", t === target));
      setTimeout(() => window.srNavigate(target.getAttribute("href")), 110);
    }
  }
  bar.addEventListener("dragstart", (e) => e.preventDefault());
  bar.addEventListener("pointerup", end);
  bar.addEventListener("pointercancel", end);
  // a drag must not also fire a click on whichever tab is under the finger
  bar.addEventListener("click", (e) => { if (justDragged || moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);

  // tapping a tab: slide the lens there first, then go
  tabs.forEach((t) => t.addEventListener("click", (e) => {
    if (t.classList.contains("active")) return;
    e.preventDefault();
    tabs.forEach((x2) => x2.classList.toggle("active", x2 === t));
    ind.style.width = t.offsetWidth + "px";
    setX(t.offsetLeft, t);
    setTimeout(() => window.srNavigate(t.getAttribute("href")), 90);
  }));

  place();
  window.addEventListener("resize", place);
  window.addEventListener("load", place);
  window.addEventListener("pageshow", place);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
})();

// ---------- illustrations: <div data-art="hero"> ----------
function mountArt() {
  if (!window.SRArt) return;
  document.querySelectorAll("[data-art]").forEach((el) => {
    if (el.__art) return;
    el.__art = true;
    el.innerHTML = window.SRArt[el.dataset.art] || "";
  });
}
mountArt();

// ---------- call-to-action band (above the footer) + floating resume dock ----------
(function () {
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const resume = "Smruti_Ranjan_Pati_Resume.pdf";
  const skip = document.body.dataset.cta === "off";

  if (!skip && !document.querySelector(".cta-band")) {
    const footer = document.querySelector("footer.site-footer");
    if (footer) {
      footer.insertAdjacentHTML("beforebegin", `
      <section class="cta-band reveal" aria-label="Next steps">
        <div class="cta-copy">
          <span class="page-eyebrow">Let's work together</span>
          <h2>See the work. Then let's talk.</h2>
          <p>Browse the case studies, or grab my resume and get in touch.</p>
          <div class="cta-actions">
            <a class="btn btn-solid btn-lg magnetic" href="work.html">View my work <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
            <a class="btn btn-outline btn-lg magnetic" href="${resume}" download><i class="fa-solid fa-download" aria-hidden="true"></i> Download resume</a>
          </div>
        </div>
        <div class="cta-art" data-art="cta" aria-hidden="true"></div>
      </section>`);
      mountArt();
      document.querySelectorAll(".cta-band.reveal:not(.in)").forEach((el) => {
        if ("IntersectionObserver" in window) {
          const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }), { threshold: 0.1 });
          io.observe(el);
        } else el.classList.add("in");
        setTimeout(() => el.classList.add("in"), 2500);
      });
    }
  }

  // floating dock (desktop): appears after scrolling, keeps "work" + "resume" one click away
  if (file !== "contact.html" && !document.querySelector(".cta-dock")) {
    document.body.insertAdjacentHTML("beforeend", `
      <div class="cta-dock" aria-label="Quick actions">
        <a href="work.html"><i class="fa-solid fa-folder-open" aria-hidden="true"></i> View work</a>
        <a class="primary" href="${resume}" download><i class="fa-solid fa-download" aria-hidden="true"></i> Resume</a>
      </div>`);
    const dock = document.querySelector(".cta-dock");
    const onScroll = () => dock.classList.toggle("show", window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();

// ---------- water cursor ----------
// A glassy water droplet with a liquid tail. Ripples spread across the "surface"
// as you move, it swells over clickable things, settles with gentle ripples when
// you stop, and splashes on click. Mouse only; touch screens skip it.
(function () {
  if (window.__waterCursor) return;
  if (window.matchMedia("(hover: none)").matches) return;
  window.__waterCursor = true;
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches; // droplet only, no ripples/splash

  const st = document.createElement("style");
  st.textContent =
    "html.water-cursor .cursor-dot,html.water-cursor .cursor-ring{display:none!important}" +
    "#waterCursor{position:fixed;left:0;top:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483000}";
  document.head.appendChild(st);
  document.documentElement.classList.add("water-cursor");

  const canvas = document.createElement("canvas");
  canvas.id = "waterCursor";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  let W = 0, H = 0;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  const light = () => document.documentElement.getAttribute("data-theme") === "light";
  const tone = () => (light() ? "11,107,54" : "76,212,147");

  const N = 22;
  const pts = Array.from({ length: N }, () => ({ x: -200, y: -200 }));
  const mouse = { x: -200, y: -200 };
  let seen = false, alpha = 0, targetAlpha = 0;
  let r = 12, targetR = 12, pressed = false, raf = 0, lastMove = 0, hue = 0;
  let lastRipple = { x: 0, y: 0 }, idleTimers = [];
  // keep the droplet alive across page changes: remember where it was
  const KEY = "sr-cursor";
  let lastSave = 0;
  function save() {
    try { sessionStorage.setItem(KEY, JSON.stringify({ x: mouse.x, y: mouse.y, t: Date.now() })); } catch (e) {}
  }
  window.__saveCursor = save;
  window.addEventListener("pagehide", save);
  const ripples = [], drops = [];
  const HOVER = "a,button,[role='link'],[role='button'],.work-tile,.pill,.skill-card,.explore-card,.contact-card,.glance-card,.chip,input,select,textarea,summary,label";

  function ripple(x, y, max, strong, delay) {
    if (calm) return;
    const add = () => {
      ripples.push({ x, y, r: 3, max, a: strong ? 0.6 : 0.34, w: strong ? 2.2 : 1.5 });
      if (ripples.length > 28) ripples.shift();
      wake();
    };
    delay ? setTimeout(add, delay) : add();
  }
  function splash(x, y) {
    if (calm) return;
    for (let i = 0; i < 12; i++) {
      const ang = (Math.PI * 2 * i) / 12 + Math.random() * 0.4;
      const sp = 1.8 + Math.random() * 3.6;
      drops.push({ x, y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 1.4, r: 1.4 + Math.random() * 2.8, a: 0.9, g: 0.17 });
    }
  }
  function wake() { if (!raf) raf = requestAnimationFrame(frame); }

  function settle() { // gentle ripples when the pointer stops moving
    idleTimers.forEach(clearTimeout);
    idleTimers = [
      setTimeout(() => ripple(mouse.x, mouse.y, 34, false), 450),
      setTimeout(() => ripple(mouse.x, mouse.y, 48, false), 1000),
    ];
  }

  window.addEventListener("pointermove", (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return;
    mouse.x = e.clientX; mouse.y = e.clientY;
    if (!seen) {
      seen = true;
      pts.forEach((p) => { p.x = mouse.x; p.y = mouse.y; });
      lastRipple = { x: mouse.x, y: mouse.y };
    }
    targetAlpha = 1;
    lastMove = performance.now();
    if (lastMove - lastSave > 120) { lastSave = lastMove; save(); }
    const dx = mouse.x - lastRipple.x, dy = mouse.y - lastRipple.y;
    if (dx * dx + dy * dy > 120 * 120) { ripple(mouse.x, mouse.y, 46, false); lastRipple = { x: mouse.x, y: mouse.y }; }
    const over = e.target && e.target.closest && e.target.closest(HOVER);
    const want = pressed ? 9 : over ? 21 : 12;
    if (over && targetR !== 21 && !pressed) ripple(mouse.x, mouse.y, 58, false);
    targetR = want;
    settle();
    wake();
  }, { passive: true });

  window.addEventListener("pointerdown", (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return;
    pressed = true; targetR = 8;
    ripple(e.clientX, e.clientY, 96, true);
    ripple(e.clientX, e.clientY, 70, false, 120);
    ripple(e.clientX, e.clientY, 44, false, 240);
    splash(e.clientX, e.clientY);
    wake();
  });
  window.addEventListener("pointerup", () => { pressed = false; targetR = 14; wake(); });
  document.addEventListener("mouseleave", () => { targetAlpha = 0; wake(); });
  document.addEventListener("mouseenter", () => { if (seen) { targetAlpha = 1; wake(); } });

  // restore after a page change so the cursor never "disappears" while navigating
  try {
    const s = JSON.parse(sessionStorage.getItem(KEY) || "null");
    if (s && Date.now() - s.t < 10000) {
      mouse.x = s.x; mouse.y = s.y;
      pts.forEach((p) => { p.x = s.x; p.y = s.y; });
      lastRipple = { x: s.x, y: s.y };
      seen = true; alpha = 1; targetAlpha = 1;
      wake();
    }
  } catch (e) {}

  function drawTail(c, speed) {
    const L = [], R = [];
    for (let i = 0; i < N; i++) {
      const p = pts[i], pr = pts[Math.max(0, i - 1)], nx = pts[Math.min(N - 1, i + 1)];
      let tx = nx.x - pr.x, ty = nx.y - pr.y;
      const len = Math.hypot(tx, ty) || 1; tx /= len; ty /= len;
      const t = i / (N - 1);
      const w = r * (0.9 + Math.min(speed, 40) / 160) * Math.pow(1 - t, 1.5);
      L.push({ x: p.x - ty * w, y: p.y + tx * w });
      R.push({ x: p.x + ty * w, y: p.y - tx * w });
    }
    ctx.beginPath();
    ctx.moveTo(L[0].x, L[0].y);
    for (let i = 1; i < N - 1; i++) ctx.quadraticCurveTo(L[i].x, L[i].y, (L[i].x + L[i + 1].x) / 2, (L[i].y + L[i + 1].y) / 2);
    ctx.lineTo(L[N - 1].x, L[N - 1].y);
    ctx.lineTo(R[N - 1].x, R[N - 1].y);
    for (let i = N - 2; i > 0; i--) ctx.quadraticCurveTo(R[i].x, R[i].y, (R[i].x + R[i - 1].x) / 2, (R[i].y + R[i - 1].y) / 2);
    ctx.lineTo(R[0].x, R[0].y);
    ctx.closePath();
    const g = ctx.createLinearGradient(pts[0].x, pts[0].y, pts[N - 1].x, pts[N - 1].y);
    g.addColorStop(0, `rgba(${c},${0.46 * alpha})`);
    g.addColorStop(0.6, `rgba(${c},${0.16 * alpha})`);
    g.addColorStop(1, `rgba(${c},0)`);
    ctx.fillStyle = g;
    ctx.fill();
  }

  function drawDrop(c) {
    const x = pts[0].x, y = pts[0].y;
    // soft halo
    let g = ctx.createRadialGradient(x, y, r * 0.5, x, y, r * 3);
    g.addColorStop(0, `rgba(${c},${0.2 * alpha})`);
    g.addColorStop(1, `rgba(${c},0)`);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 3, 0, 6.283); ctx.fill();
    // glass body: clear in the middle, denser toward the edge
    g = ctx.createRadialGradient(x - r * 0.25, y - r * 0.3, r * 0.05, x, y, r);
    g.addColorStop(0, `rgba(255,255,255,${0.5 * alpha})`);
    g.addColorStop(0.5, `rgba(${c},${0.22 * alpha})`);
    g.addColorStop(0.88, `rgba(${c},${0.55 * alpha})`);
    g.addColorStop(1, `rgba(${c},${0.8 * alpha})`);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
    // iridescent rim (mint -> teal -> lime), like light bending through water
    const rim = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
    rim.addColorStop(0, `rgba(170,255,210,${0.95 * alpha})`);
    rim.addColorStop(0.5, `rgba(120,225,185,${0.7 * alpha})`);
    rim.addColorStop(1, `rgba(215,255,150,${0.85 * alpha})`);
    ctx.lineWidth = 1.4; ctx.strokeStyle = rim;
    ctx.beginPath(); ctx.arc(x, y, r - 0.7, 0, 6.283); ctx.stroke();
    // caustic: bright crescent on the lower edge
    ctx.lineWidth = 1.6; ctx.strokeStyle = `rgba(255,255,255,${0.5 * alpha})`;
    ctx.beginPath(); ctx.arc(x, y, r * 0.72, 0.35 * Math.PI, 0.8 * Math.PI); ctx.stroke();
    // specular highlights
    ctx.fillStyle = `rgba(255,255,255,${0.95 * alpha})`;
    ctx.beginPath(); ctx.ellipse(x - r * 0.34, y - r * 0.4, r * 0.3, r * 0.17, -0.65, 0, 6.283); ctx.fill();
    ctx.fillStyle = `rgba(255,255,255,${0.7 * alpha})`;
    ctx.beginPath(); ctx.arc(x + r * 0.38, y + r * 0.36, r * 0.09, 0, 6.283); ctx.fill();
  }

  function frame() {
    raf = 0;
    ctx.clearRect(0, 0, W, H);
    const c = tone();
    alpha += (targetAlpha - alpha) * 0.14;
    r += (targetR - r) * 0.2;

    const before = { x: pts[0].x, y: pts[0].y };
    pts[0].x += (mouse.x - pts[0].x) * 0.4;
    pts[0].y += (mouse.y - pts[0].y) * 0.4;
    for (let i = 1; i < N; i++) {
      pts[i].x += (pts[i - 1].x - pts[i].x) * 0.4;
      pts[i].y += (pts[i - 1].y - pts[i].y) * 0.4;
    }
    const vx = pts[0].x - before.x, vy = pts[0].y - before.y;
    const speed = Math.hypot(vx, vy);

    // little droplets shake loose when moving fast
    if (!calm && speed > 11 && Math.random() < 0.35) {
      drops.push({ x: pts[0].x, y: pts[0].y, vx: -vx * 0.12 + (Math.random() - 0.5) * 1.6, vy: -vy * 0.12 + (Math.random() - 0.5) * 1.6, r: 1.2 + Math.random() * 1.8, a: 0.75, g: 0.06 });
    }

    // ripples drawn as ellipses so they read like rings on a water surface
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.r += (rp.max - rp.r) * 0.07 + 0.55;
      const k = rp.r / rp.max;
      if (k >= 0.99) { ripples.splice(i, 1); continue; }
      const f = (1 - k) * rp.a;
      ctx.save();
      ctx.translate(rp.x, rp.y); ctx.scale(1, 0.66);
      const fill = ctx.createRadialGradient(0, 0, rp.r * 0.6, 0, 0, rp.r);
      fill.addColorStop(0, `rgba(${c},0)`);
      fill.addColorStop(1, `rgba(${c},${f * 0.22})`);
      ctx.fillStyle = fill; ctx.beginPath(); ctx.arc(0, 0, rp.r, 0, 6.283); ctx.fill();
      ctx.lineWidth = rp.w * (1 - k * 0.5); ctx.strokeStyle = `rgba(${c},${f})`;
      ctx.beginPath(); ctx.arc(0, 0, rp.r, 0, 6.283); ctx.stroke();
      ctx.lineWidth = 1; ctx.strokeStyle = `rgba(255,255,255,${f * 0.7})`;
      ctx.beginPath(); ctx.arc(0, 0, Math.max(0, rp.r - 3.5), 0, 6.283); ctx.stroke();
      ctx.restore();
    }

    for (let i = drops.length - 1; i >= 0; i--) {
      const d = drops[i];
      d.x += d.vx; d.y += d.vy; d.vy += d.g; d.vx *= 0.985; d.a -= 0.026;
      if (d.a <= 0) { drops.splice(i, 1); continue; }
      const dr = d.r * (0.55 + d.a * 0.45);
      ctx.fillStyle = `rgba(${c},${d.a * 0.8})`;
      ctx.beginPath(); ctx.arc(d.x, d.y, dr, 0, 6.283); ctx.fill();
      ctx.fillStyle = `rgba(255,255,255,${d.a * 0.8})`;
      ctx.beginPath(); ctx.arc(d.x - dr * 0.3, d.y - dr * 0.3, dr * 0.32, 0, 6.283); ctx.fill();
    }

    if (alpha > 0.01) { drawTail(c, speed); drawDrop(c); }

    const busy = Math.abs(mouse.x - pts[0].x) > 0.2 || Math.abs(mouse.y - pts[0].y) > 0.2 ||
      Math.abs(targetAlpha - alpha) > 0.01 || Math.abs(targetR - r) > 0.1 ||
      ripples.length || drops.length || performance.now() - lastMove < 150;
    if (busy) raf = requestAnimationFrame(frame);
  }
})();
