// ============ HOME: SKILLS AT A GLANCE ============
// Four cards (one per skill group) built from js/data.js, so counts and names
// always match the Skills page. Edit FEATURED below to change which skills show.
(function () {
  const D = window.SITE_DATA;
  const root = document.getElementById("skillGlance");
  if (!D || !root) return;

  const ICON = { design: "fa-pen-ruler", tools: "fa-toolbox", frontend: "fa-code", process: "fa-diagram-project" };
  const FEATURED = {
    design: ["Prototyping", "Design Systems", "Accessibility (WCAG)", "UX Research"],
    tools: ["Figma", "Adobe XD", "Framer", "Miro"],
    frontend: ["HTML5", "CSS3 / Tailwind", "JavaScript (ES6+)", "React.js"],
    process: ["Data Visualization", "Dashboard Design", "Agile Sprints", "Design-to-Code Handoff"],
  };

  root.innerHTML = D.groups
    .map((g) => {
      const all = D.skills.filter((s) => s.group === g.key);
      const picked = (FEATURED[g.key] || []).map((n) => all.find((s) => s.name === n)).filter(Boolean);
      const shown = (picked.length ? picked : all).slice(0, 4);
      return `
      <a class="glance-card" href="skills.html#${g.key}" aria-label="${g.label}: ${all.length} skills">
        <div class="glance-top">
          <span class="glance-ico"><i class="fa-solid ${ICON[g.key] || "fa-layer-group"}" aria-hidden="true"></i></span>
          <div class="glance-title"><h3>${g.label}</h3><span>${all.length} skills</span></div>
        </div>
        <ul class="glance-list">
          ${shown.map((s) => `<li><i class="${s.icon}" aria-hidden="true"></i>${s.name}</li>`).join("")}
        </ul>
        <span class="glance-go">View all <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
      </a>`;
    })
    .join("");
})();
