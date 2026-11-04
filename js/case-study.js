// ============ CASE-STUDY PAGES ============
// Only the case-study pages load this file (replaces the old script.js).
// The header, footer, theme toggle, cursor, hover tilt and reveal animations
// all come from components.js, so they are not repeated here.
// Load order on a case-study page: data.js, components.js, case-study.js.
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---- GA4: how long each section stays in view ----
(function sectionEngagementTracker() {
  if (typeof gtag !== "function") return;
  const els = document.querySelectorAll("main section[id], main footer[id]");
  if (!els.length) return;
  const state = new Map();
  els.forEach((el) => state.set(el.id, { since: null, total: 0 }));

  function flush(id, keepalive) {
    const s = state.get(id);
    if (!s || s.since === null) return;
    const ms = performance.now() - s.since;
    s.since = null;
    if (ms < 800) return; // ignore fast scroll-throughs
    s.total += ms;
    gtag("event", "section_engagement", {
      section_id: id,
      view_duration_ms: Math.round(ms),
      total_duration_ms: Math.round(s.total),
      transport_type: keepalive ? "beacon" : undefined,
    });
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        const id = e.target.id;
        if (e.isIntersecting && e.intersectionRatio >= 0.5) {
          const s = state.get(id);
          if (s && s.since === null) s.since = performance.now();
        } else flush(id);
      }),
    { threshold: [0, 0.5, 1] }
  );
  els.forEach((el) => io.observe(el));
  const flushAll = () => state.forEach((_, id) => flush(id, true));
  document.addEventListener("visibilitychange", () => document.hidden && flushAll());
  window.addEventListener("pagehide", flushAll);
})();

// ---- copy link / native share ----
(function shareButtons() {
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (_) {}
      ta.remove();
    }
  }
  document.querySelectorAll(".copy-btn[data-path]").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      await copyText(new URL(btn.dataset.path, location.href).href);
      btn.classList.add("copied");
      setTimeout(() => btn.classList.remove("copied"), 1600);
    });
  });

  // phones: one native Share button instead of the per-app links
  document.querySelectorAll(".cs-share-row").forEach((row) => {
    if (!navigator.share) return;
    const url = row.dataset.shareUrl || location.href;
    const title = row.dataset.shareTitle || document.title;
    const b = document.createElement("button");
    b.type = "button";
    b.className = "share-btn";
    b.innerHTML = '<i class="fa-solid fa-share-nodes" aria-hidden="true"></i><span class="share-btn-label">Share</span>';
    b.addEventListener("click", async () => {
      try { await navigator.share({ title, text: title, url }); } catch (_) {}
    });
    row.querySelectorAll(".share-btn:not(.copy-btn)").forEach((el) => el.remove());
    row.insertBefore(b, row.querySelector(".copy-btn"));
  });
})();

// ---- accordions ----
document.querySelectorAll(".accordion-header").forEach((btn) =>
  btn.addEventListener("click", () => btn.setAttribute("aria-expanded", String(btn.getAttribute("aria-expanded") !== "true")))
);

// ---- case-study tabs ----
document.querySelectorAll(".cs-tabs").forEach((nav) => {
  const wrap = nav.nextElementSibling;
  if (!wrap || !wrap.classList.contains("cs-panel-wrap")) return;
  nav.querySelectorAll(".cs-tab").forEach((btn) =>
    btn.addEventListener("click", () => {
      nav.querySelectorAll(".cs-tab").forEach((b) => b.classList.remove("active"));
      wrap.querySelectorAll(".cs-panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      const panel = document.getElementById(btn.dataset.tab);
      if (panel) panel.classList.add("active");
      wrap.scrollIntoView({ behavior: "auto", block: "nearest" });
    })
  );
});

// ---- "More case studies" carousel (built from data.js, so it never goes stale) ----
(function moreCaseStudies() {
  const section = document.getElementById("moreCaseStudies");
  const D = window.SITE_DATA;
  if (!section || !D) return;
  const others = D.studies.filter((s) => s.published && s.id !== section.dataset.currentId);
  if (!others.length) { section.hidden = true; return; }

  const track = section.querySelector(".more-cs-track");
  const prev = section.querySelector('[data-more-cs="prev"]');
  const next = section.querySelector('[data-more-cs="next"]');
  if (!track) return;

  track.innerHTML = others
    .map(
      (s) => `
    <a class="work-tile more-cs-card" href="${s.href}" aria-label="View case study: ${s.title}">
      <div class="work-visual ${D.vclass(s.visual)}">${D.mock(s.visual)}</div>
      <div class="work-info"><h3>${s.title}</h3><p>${s.summary}</p><span class="work-tag">${s.tag}</span></div>
    </a>`
    )
    .join("");

  const arrows = () => {
    if (!prev || !next) return;
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
  };
  const by = (dir) => {
    const c = track.querySelector(".more-cs-card");
    track.scrollBy({ left: dir * (c ? c.getBoundingClientRect().width + 16 : 240), behavior: prefersReducedMotion ? "auto" : "smooth" });
  };
  if (prev) prev.addEventListener("click", () => by(-1));
  if (next) next.addEventListener("click", () => by(1));
  track.addEventListener("scroll", arrows, { passive: true });
  window.addEventListener("resize", arrows);
  requestAnimationFrame(() => {
    const nav = section.querySelector(".more-cs-nav");
    if (nav && track.scrollWidth <= track.clientWidth + 4) nav.hidden = true; // everything fits
    arrows();
  });
})();

// ---- screens gallery lightbox ----
(function lightbox() {
  const box = document.getElementById("lightbox");
  if (!box) return;
  const visual = box.querySelector(".lightbox-visual");
  const title = box.querySelector(".lightbox-body h4");
  const desc = box.querySelector(".lightbox-body p");
  const closeBtn = box.querySelector(".lightbox-close");

  function open(tile) {
    const label = tile.dataset.label || "Screen";
    title.textContent = label;
    desc.textContent = tile.dataset.desc || "";
    visual.innerHTML = "";
    if (tile.dataset.img) {
      const img = document.createElement("img");
      img.src = tile.dataset.img;
      img.alt = label;
      visual.appendChild(img);
    } else {
      const d = document.createElement("div");
      d.className = "placeholder-label";
      d.textContent = label + " — screen preview coming soon";
      visual.appendChild(d);
    }
    box.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }
  function close() {
    box.hidden = true;
    document.body.style.overflow = "";
  }
  document.querySelectorAll(".gallery-tile").forEach((t) => t.addEventListener("click", () => open(t)));
  closeBtn.addEventListener("click", close);
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !box.hidden) close(); });
})();

// ---- smooth scroll for #anchors (clears the floating nav) ----
document.querySelectorAll('a[href^="#"]').forEach((a) =>
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: "smooth" });
  })
);
