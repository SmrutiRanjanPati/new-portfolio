// ============ SKILLS PAGE ============
// Category tabs + live search.
// Deep links: skills.html#tools   skills.html?q=figma
(function () {
  const D = window.SITE_DATA;
  const grid = document.getElementById("skillGrid");
  if (!D || !grid) return;

  const tabsEl = document.getElementById("skillTabs");
  const search = document.getElementById("skillSearch");
  const count = document.getElementById("skillCount");
  const groupLabel = Object.fromEntries(D.groups.map((g) => [g.key, g.label]));

  const params = new URLSearchParams(window.location.search);
  let group = window.location.hash.replace("#", "");
  if (group !== "all" && !groupLabel[group]) group = "all";
  let query = params.get("q") || "";
  if (search) search.value = query;

  function cardHtml(s) {
    return `
      <article class="skill-card">
        <div class="skill-icon"><i class="${s.icon}" aria-hidden="true"></i></div>
        <div class="skill-body">
          <div class="skill-top">
            <h3>${s.name}</h3>
            ${s.level ? `<span class="skill-level">${s.level}</span>` : ""}
          </div>
          <p>${s.desc}</p>
        </div>
      </article>`;
  }

  function renderTabs() {
    const all = [{ key: "all", label: "All" }, ...D.groups];
    tabsEl.innerHTML = all
      .map((g) => {
        const n = g.key === "all" ? D.skills.length : D.skills.filter((s) => s.group === g.key).length;
        return `<button type="button" role="tab" class="chip ${g.key === group ? "active" : ""}" aria-selected="${g.key === group}" data-g="${g.key}">${g.label} <span class="chip-n">${n}</span></button>`;
      })
      .join("");
    tabsEl.querySelectorAll(".chip").forEach((b) =>
      b.addEventListener("click", () => {
        group = b.dataset.g;
        history.replaceState(null, "", group === "all" ? location.pathname + location.search : "#" + group);
        renderTabs();
        renderGrid();
      })
    );
  }

  function renderGrid() {
    const q = query.trim().toLowerCase();
    const items = D.skills.filter(
      (s) =>
        (group === "all" || s.group === group) &&
        (!q || s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q) || (groupLabel[s.group] || "").toLowerCase().includes(q))
    );
    grid.innerHTML = items.length ? items.map(cardHtml).join("") : '<p class="empty-state">No skills match that search.</p>';
    if (count) count.textContent = items.length + (items.length === 1 ? " skill" : " skills");
    if (window.bindTilt) window.bindTilt(grid); // same hover tilt as the original
    if (window.bindMagnetic) window.bindMagnetic(grid);
  }

  if (search)
    search.addEventListener("input", () => {
      query = search.value;
      renderGrid();
    });
  window.addEventListener("hashchange", () => {
    const h = window.location.hash.replace("#", "");
    if (h === "all" || groupLabel[h]) {
      group = h;
      renderTabs();
      renderGrid();
    }
  });

  renderTabs();
  renderGrid();
})();
