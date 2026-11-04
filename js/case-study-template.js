// ============ CASE-STUDY TEMPLATE ============
// Renders case-study.html?id=<id> from js/data.js.
// Add to a study in data.js to fill the page:
//   role, client, timeline, tools, highlights: [], sections: [{ title, body, points: [] }]
// Anything missing shows a tidy "coming soon" placeholder instead of an empty gap.
(function () {
  const D = window.SITE_DATA;
  const root = document.getElementById("tplRoot");
  if (!D || !root) return;

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const studies = D.studies.filter((s) => s.published);
  const id = new URLSearchParams(location.search).get("id");
  const i = studies.findIndex((s) => s.id === id);

  if (i < 0) {
    document.title = "Case study not found - Smruti Ranjan";
    root.innerHTML = `
      <section class="card tpl-hero">
        <span class="page-eyebrow">Case study</span>
        <h1>That case study isn't here.</h1>
        <p class="lead">The link may be old. Here is everything that is published:</p>
        <div class="tpl-tags">${studies.map((s) => `<a class="chip" href="${s.href}">${esc(s.title)}</a>`).join("")}</div>
      </section>`;
    return;
  }

  const s = studies[i];
  const prev = studies[(i - 1 + studies.length) % studies.length];
  const next = studies[(i + 1) % studies.length];
  const soon = s.status === "soon";

  document.title = `${s.title} - Case study - Smruti Ranjan`;
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute("content", s.summary);

  const DEFAULTS = ["Overview", "The problem", "Process", "Solution", "Outcome"];
  const sections = s.sections && s.sections.length ? s.sections : null;

  const sectionHtml = sections
    ? sections
        .map(
          (sec, n) => `
      <section class="card tpl-section reveal" id="s${n + 1}">
        <h2><span>${String(n + 1).padStart(2, "0")}</span>${esc(sec.title)}</h2>
        ${(Array.isArray(sec.body) ? sec.body : [sec.body || ""]).filter(Boolean).map((p) => `<p>${esc(p)}</p>`).join("")}
        ${sec.points && sec.points.length ? `<ul class="tpl-points">${sec.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
      </section>`
        )
        .join("")
    : DEFAULTS.map(
        (t, n) => `
      <section class="card tpl-section tpl-placeholder reveal" id="s${n + 1}">
        <h2><span>${String(n + 1).padStart(2, "0")}</span>${t}</h2>
        <p class="soon"><i class="fa-regular fa-clock" aria-hidden="true"></i> Details for this section are coming soon.</p>
      </section>`
      ).join("");

  const gallery = `
      <section class="card tpl-section reveal" id="screens">
        <h2><span>★</span>Screens &amp; visuals</h2>
        <div class="tpl-gallery">
          ${[1, 2, 3].map((n) => `<div class="tpl-shot"><span>Screen ${n} · coming soon</span></div>`).join("")}
        </div>
      </section>`;

  const meta = [["Role", s.role], ["Client / team", s.client], ["Timeline", s.timeline], ["Tools", s.tools]].filter((m) => m[1]);
  const highlights = (s.highlights || []).length
    ? `<section class="card tpl-section reveal"><h2><span>◆</span>Highlights</h2><ul class="tpl-points">${s.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></section>`
    : "";

  root.innerHTML = `
    <section class="card tpl-hero reveal">
      <span class="page-eyebrow">${esc(s.category)}</span>
      <h1>${esc(s.title)}</h1>
      <p class="lead">${esc(s.summary)}</p>
      <div class="tpl-tags">
        <span class="work-tag">${esc(s.tag)}</span>
        ${soon ? '<span class="work-tag">Full case study coming soon</span>' : ""}
      </div>
      <div class="tpl-cover"><div class="work-visual ${D.vclass(s.visual)}">${D.mock(s.visual)}</div></div>
    </section>

    <div class="tpl-layout">
      <div class="tpl-content">${highlights}${sectionHtml}${gallery}</div>
      <aside class="card tpl-aside reveal" aria-label="Project details">
        <h3>At a glance</h3>
        <dl>
          <div><dt>Category</dt><dd>${esc(s.category)}</dd></div>
          ${meta.map((m) => `<div><dt>${m[0]}</dt><dd>${esc(m[1])}</dd></div>`).join("")}
          ${meta.length ? "" : '<div><dt>Details</dt><dd>Coming soon</dd></div>'}
        </dl>
        <a class="btn btn-solid btn-lg" href="contact.html"><i class="fa-solid fa-envelope" aria-hidden="true"></i> Discuss a project</a>
        <a class="btn btn-outline btn-lg" href="Smruti_Ranjan_Pati_Resume.pdf" download><i class="fa-solid fa-download" aria-hidden="true"></i> Download resume</a>
      </aside>
    </div>

    <nav class="tpl-pager" aria-label="More case studies">
      ${
        studies.length > 1
          ? `<a href="${prev.href}"><small>← Previous</small><strong>${esc(prev.title)}</strong></a>
             <a class="next" href="${next.href}"><small>Next →</small><strong>${esc(next.title)}</strong></a>`
          : `<a class="only" href="work.html"><small>Back</small><strong>All work</strong></a>`
      }
    </nav>`;
  if (window.srReveal) window.srReveal(root);
})();
