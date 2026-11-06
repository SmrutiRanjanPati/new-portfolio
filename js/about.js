// ============ ABOUT PAGE: CERTIFICATIONS + EDUCATION ============
// Both lists are built from js/data.js (certifications, education), so adding a
// certificate means adding one line there. Newest first, filter chips by issuer
// (shown once there is more than one issuer), and a "Show all" button after LIMIT.
(function () {
  const D = window.SITE_DATA;
  if (!D) return;

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const initials = (s) => String(s).split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fmt = (d) => {
    const [y, m] = String(d || "").split("-");
    return m && MONTHS[+m - 1] ? MONTHS[+m - 1] + " " + y : y || "";
  };

  // ---------- certifications ----------
  const grid = document.getElementById("certGrid");
  if (grid) {
    const LIMIT = 6; // how many show before "Show all"
    const certs = [...(D.certifications || [])].sort((a, b) => String(b.date).localeCompare(String(a.date)));
    const issuers = [...new Set(certs.map((c) => c.issuer))];
    const chipsEl = document.getElementById("certFilters");
    const moreBtn = document.getElementById("certMore");
    const countEl = document.getElementById("certCount");
    let issuer = "All";
    let expanded = false;

    function card(c) {
      const logo = c.logo
        ? `<img class="exp-logo" src="${esc(c.logo)}" alt="" width="50" height="50" loading="lazy" decoding="async" />`
        : `<div class="exp-logo" aria-hidden="true">${esc(initials(c.issuer))}</div>`;
      const link = c.url
        ? `<a class="cert-link" href="${esc(c.url)}" target="_blank" rel="noopener">View credential <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>`
        : "";
      return `
        <article class="cert-card">
          ${logo}
          <div class="cert-body">
            <h3>${esc(c.title)}</h3>
            <p>${esc(c.issuer)}</p>
            <span class="exp-date">Issued ${esc(fmt(c.date))}</span>
            ${link}
          </div>
        </article>`;
    }

    function draw() {
      const list = issuer === "All" ? certs : certs.filter((c) => c.issuer === issuer);
      const shown = expanded ? list : list.slice(0, LIMIT);
      grid.innerHTML = shown.length ? shown.map(card).join("") : '<p class="empty-state">No certifications yet.</p>';
      if (countEl) countEl.textContent = certs.length + (certs.length === 1 ? " certification" : " certifications");
      if (moreBtn) {
        const extra = list.length - LIMIT;
        moreBtn.hidden = extra <= 0;
        moreBtn.textContent = expanded ? "Show fewer" : "Show all " + list.length;
        moreBtn.setAttribute("aria-expanded", String(expanded));
      }
    }

    function chips() {
      if (!chipsEl) return;
      if (issuers.length < 2) { chipsEl.hidden = true; return; }
      chipsEl.hidden = false;
      chipsEl.innerHTML = ["All", ...issuers]
        .map((n) => {
          const count = n === "All" ? certs.length : certs.filter((c) => c.issuer === n).length;
          return `<button type="button" role="tab" class="chip ${n === issuer ? "active" : ""}" aria-selected="${n === issuer}" data-i="${esc(n)}">${esc(n)} <span class="chip-n">${count}</span></button>`;
        })
        .join("");
      chipsEl.querySelectorAll(".chip").forEach((b) =>
        b.addEventListener("click", () => {
          issuer = b.dataset.i;
          expanded = false;
          chips();
          draw();
        })
      );
    }

    if (moreBtn) moreBtn.addEventListener("click", () => { expanded = !expanded; draw(); });
    chips();
    draw();
  }

  // ---------- education ----------
  const edu = document.getElementById("eduList");
  if (edu) {
    edu.innerHTML = (D.education || [])
      .map(
        (e) => `
        <article class="edu-card">
          <div class="exp-logo" aria-hidden="true">${esc(e.short)}</div>
          <div class="cert-body">
            <h3>${esc(e.degree)}</h3>
            <p>${esc(e.school)}</p>
            <span class="exp-date">${esc(e.years)}</span>
          </div>
        </article>`
      )
      .join("");
  }
})();
