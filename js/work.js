// ============ WORK / FEATURED CASE STUDIES ============
// #featuredWork -> first 3 published studies (home page)
// #workList     -> all published studies with category chips (work page)
// Each card is a plain link: it opens the study's own page straight away.
(function () {
  const D = window.SITE_DATA;
  if (!D) return;
  const studies = D.studies.filter((s) => s.published);

  const featured = document.getElementById("featuredWork");
  const list = document.getElementById("workList");
  const chipsEl = document.getElementById("workFilters");

  function card(s, i) {
    const soon = s.status === "soon";
    return `
      <a class="work-tile" href="${s.href}" aria-label="Open case study: ${s.title}">
        <div class="work-visual ${D.vclass(s.visual)}">
          <span class="work-num">${String(i + 1).padStart(2, "0")}</span>
          ${D.mock(s.visual)}
          ${soon ? '<span class="work-badge">Details coming soon</span>' : ""}
        </div>
        <div class="work-info">
          <span class="work-tag">${s.tag}</span>
          ${soon ? '<span class="work-soon">Details coming soon</span>' : ""}
          <h3>${s.title}</h3>
          <p>${s.summary}</p>
          <span class="work-more">${soon ? "Open page" : "View case study"} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
        </div>
      </a>`;
  }

  function draw(target, items) {
    target.innerHTML = items.length
      ? items.map(card).join("")
      : '<p class="empty-state">No case studies in this category yet.</p>';
  }

  if (featured) draw(featured, studies.slice(0, 3));

  if (list) {
    const cats = [...new Set(studies.map((s) => s.category))];
    let active = "All";

    function chips() {
      if (!chipsEl) return;
      if (cats.length < 2) { chipsEl.hidden = true; return; } // nothing to filter yet
      chipsEl.innerHTML = ["All", ...cats]
        .map((c) => `<button type="button" class="chip ${c === active ? "active" : ""}" data-c="${c}">${c}</button>`)
        .join("");
      chipsEl.querySelectorAll(".chip").forEach((b) =>
        b.addEventListener("click", () => {
          active = b.dataset.c;
          chips();
          draw(list, active === "All" ? studies : studies.filter((s) => s.category === active));
        })
      );
    }
    chips();
    draw(list, studies);
  }
})();